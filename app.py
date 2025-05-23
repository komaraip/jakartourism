from flask import Flask, render_template, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os
from dotenv import load_dotenv

# Load environment variables from .env file if it exists
load_dotenv()

# Set base directory for all file operations
base_dir = os.path.abspath(os.path.dirname(__file__))

# Define static folder explicitly
static_folder = os.path.join(base_dir, 'static')
template_folder = os.path.join(base_dir, 'templates')

app = Flask(__name__, 
            static_folder=static_folder, 
            static_url_path='/static',
            template_folder=template_folder)
application = app

# Configure based on environment variables
app.config['DEBUG'] = os.environ.get('DEBUG', 'False').lower() in ['true', '1', 't']
app.config['ENV'] = os.environ.get('FLASK_ENV', 'production')
app.secret_key = os.environ.get('SECRET_KEY', 'jakartourism-default-secret-key')

# Static file configuration
if app.config['ENV'] == 'production':
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 31536000  # Cache for 1 year in production
else:
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0  # Disable caching during development

print(f"Flask app initialized with static folder: {static_folder}")
print(f"Static URL path: {app.static_url_path}")
print(f"Running in {app.config['ENV']} mode")

# Add route for debugging static paths
@app.route('/static_debug')
def static_debug():
    return jsonify({
        'static_folder': static_folder,
        'static_url_path': app.static_url_path,
        'example_img_path': os.path.join(static_folder, 'img', 'example_img.jpg'),
        'example_img_exists': os.path.exists(os.path.join(static_folder, 'img', 'example_img.jpg')),
        'base_dir': base_dir
    })

# Load data
# For production, use absolute paths or environment variables for file locations
destination_rating = pd.read_csv(os.path.join(base_dir, 'tourism_rating.csv'))
destination = pd.read_csv(os.path.join(base_dir, 'tourism_with_id.csv'))
user = pd.read_csv(os.path.join(base_dir, 'user.csv'))

# Preprocessing - Filter for Jakarta only
destination = destination[destination['City'] == 'Jakarta']
destination = destination.drop(destination.columns[[11, 12]], axis=1, errors='ignore')
destination = destination.drop(destination.columns[[7]], axis=1, errors='ignore')
destination_rating = pd.merge(destination_rating, destination[['Place_Id']], how='right', on='Place_Id')
user = pd.merge(user, destination_rating[['User_Id']], how='right', on='User_Id').drop_duplicates().sort_values('User_Id')

# Data validation and cleaning function
def validate_and_clean_data(df):
    """Clean and validate data to prevent frontend issues"""
    # Make sure all string columns are actual strings, not None/NaN
    for col in ['Place_Name', 'Category', 'Description']:
        if col in df.columns:
            # Replace None/NaN with empty strings
            df[col] = df[col].fillna('')
            # Make sure all strings are properly encoded/decoded
            df[col] = df[col].astype(str)
            
    # Ensure numerical values are proper
    for col in ['Rating', 'Price']:
        if col in df.columns:
            # Replace None/NaN with 0
            df[col] = df[col].fillna(0)
            # Ensure it's a proper number
            df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)
    
    # Ensure coordinates are numerical
    for col in ['Lat', 'Long']:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce')
    
    return df

# Apply validation
destination = validate_and_clean_data(destination)

# Create TF-IDF matrix
tf = TfidfVectorizer()
tfidf_matrix = tf.fit_transform(destination['Category'])

# Compute cosine similarity
cosine_sim = cosine_similarity(tfidf_matrix)
cosine_sim_df = pd.DataFrame(cosine_sim, index=destination.Place_Name, columns=destination.Place_Name)

# Function to get recommendations
def destination_recommendations(place_name, similarity_data=cosine_sim_df, items=destination[['Place_Name', 'Category', 'Rating', 'Price', 'Description', 'Lat', 'Long']], k=6):
    try:
        index = similarity_data.loc[:, place_name].to_numpy().argpartition(range(-1, -k, -1))
        closest = similarity_data.columns[index[-1:-(k+2):-1]]
        closest = closest.drop(place_name, errors='ignore')
        return pd.DataFrame(closest).merge(items).head(k)
    except Exception as e:
        print(f"Error generating recommendations for '{place_name}': {e}")
        # Return a subset of random places as fallback
        return items.sample(min(k, len(items)))

# Routes
@app.route('/')
def index():
    # Get unique categories and ensure there are no null values
    categories = destination['Category'].dropna().unique().tolist()
    
    # Clean up data before sending to template
    places_data = destination[['Place_Id', 'Place_Name', 'Category', 'Rating', 'Price', 'Description', 'Lat', 'Long']]
    
    # Fill NaN values with appropriate defaults
    places_data = places_data.fillna({
        'Place_Name': 'Unknown Location',
        'Category': 'Uncategorized',
        'Rating': 0,
        'Price': 0,
        'Description': 'No description available'
    })
    
    # Convert to records format for template
    places = places_data.to_dict(orient='records')
    
    return render_template('index.html', categories=categories, places=places)

@app.route('/get_recommendations', methods=['POST'])
def get_recommendations():
    place_name = request.json.get('place_name')
    
    if place_name not in destination['Place_Name'].values:
        print(f"Place not found: '{place_name}'")
        print(f"Available places: {', '.join(destination['Place_Name'].values[:5])}...")
        return jsonify({'error': 'Place not found', 'message': 'The requested place could not be found in our database'}), 404
    
    try:
        # Get recommendations    
        recommendations = destination_recommendations(place_name)
        
        # Clean NaN values before returning
        recommendations = recommendations.fillna({
            'Place_Name': 'Unknown Location',
            'Category': 'Uncategorized',
            'Rating': 0,
            'Price': 0,
            'Description': 'No description available'
        })
        
        recommendations_dict = recommendations.to_dict(orient='records')
        print(f"Generated {len(recommendations_dict)} recommendations for '{place_name}'")
        return jsonify(recommendations_dict)
    except Exception as e:
        print(f"Error generating recommendations: {str(e)}")
        # Return some fallback recommendations
        fallback = destination.sample(min(6, len(destination)))[['Place_Id', 'Place_Name', 'Category', 'Rating', 'Price', 'Description']]
        return jsonify(fallback.to_dict(orient='records'))

@app.route('/get_places_by_category', methods=['POST'])
def get_places_by_category():
    category = request.json.get('category')
    
    if category == 'All':
        filtered_places = destination[['Place_Id', 'Place_Name', 'Category', 'Rating', 'Price', 'Description', 'Lat', 'Long']]
    else:
        filtered_places = destination[destination['Category'] == category][['Place_Id', 'Place_Name', 'Category', 'Rating', 'Price', 'Description', 'Lat', 'Long']]
    
    return jsonify(filtered_places.to_dict(orient='records'))

@app.route('/get_place_details/<place_id>')
def get_place_details(place_id):
    place = destination[destination['Place_Id'] == int(place_id)].to_dict(orient='records')
    if not place:
        return jsonify({'error': 'Place not found'}), 404
    return jsonify(place[0])

if __name__ == '__main__':
    # Use production settings when deployed
    if os.environ.get('FLASK_ENV') == 'production':
        app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
    else:
        app.run(debug=True)
