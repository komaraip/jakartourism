from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os
from urllib.parse import unquote

app = FastAPI(
    title="Sistem Rekomendasi Wisata Jakarta",
    description="API untuk sistem rekomendasi destinasi wisata di Jakarta menggunakan Content-Based Filtering",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for data and model
destination_df = None
cosine_sim_df = None

def load_and_process_data():
    """Load and preprocess the tourism data for Jakarta only"""
    global destination_df, cosine_sim_df
    
    # Get the path to CSV files (same directory as main.py)
    base_path = os.path.dirname(os.path.abspath(__file__))
    
    # Load destination data
    destination = pd.read_csv(os.path.join(base_path, 'tourism_with_id.csv'))
    
    # Filter for Jakarta only
    destination = destination[destination['City'] == 'Jakarta']
    
    # Drop unnamed columns (columns 11 and 12 if they exist)
    columns_to_check = destination.columns.tolist()
    columns_to_drop = []
    
    for col in columns_to_check:
        if 'Unnamed' in str(col):
            columns_to_drop.append(col)
    
    if columns_to_drop:
        destination = destination.drop(columns=columns_to_drop)
    
    # Drop Time_Minutes column (index 7 in original, or by name)
    if 'Time_Minutes' in destination.columns:
        destination = destination.drop(columns=['Time_Minutes'])
    
    # Reset index
    destination = destination.reset_index(drop=True)
    
    # Store processed dataframe
    destination_df = destination
    
    # Create TF-IDF matrix
    tf = TfidfVectorizer()
    tfidf_matrix = tf.fit_transform(destination['Category'])
    
    # Calculate cosine similarity
    cosine_sim = cosine_similarity(tfidf_matrix)
    
    # Create cosine similarity dataframe with place names as index and columns
    cosine_sim_df = pd.DataFrame(
        cosine_sim,
        index=destination['Place_Name'],
        columns=destination['Place_Name']
    )
    
    print(f"Loaded {len(destination)} Jakarta destinations")
    print(f"Categories: {destination['Category'].unique().tolist()}")

@app.on_event("startup")
async def startup_event():
    """Load data and compute similarity matrix on startup"""
    load_and_process_data()

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Selamat datang di API Sistem Rekomendasi Wisata Jakarta",
        "endpoints": {
            "/destinations": "Daftar semua destinasi wisata Jakarta",
            "/recommend/{place_name}": "Rekomendasi 10 destinasi serupa",
            "/detail/{place_name}": "Detail lengkap destinasi"
        }
    }

@app.get("/destinations")
async def get_destinations():
    """Get all Jakarta destinations for the search bar"""
    if destination_df is None:
        raise HTTPException(status_code=500, detail="Data belum dimuat")
    
    destinations = destination_df[['Place_Id', 'Place_Name', 'Category', 'Rating', 'Price']].to_dict('records')
    
    return {
        "total": len(destinations),
        "destinations": destinations
    }

@app.get("/recommend/{place_name}")
async def get_recommendations(place_name: str):
    """Get top 10 similar destinations based on cosine similarity"""
    if destination_df is None or cosine_sim_df is None:
        raise HTTPException(status_code=500, detail="Data belum dimuat")
    
    # Decode URL-encoded place name
    place_name = unquote(place_name)
    
    # Check if place exists
    if place_name not in cosine_sim_df.columns:
        raise HTTPException(
            status_code=404, 
            detail=f"Destinasi '{place_name}' tidak ditemukan"
        )
    
    # Get similarity scores and sort
    similarity_scores = cosine_sim_df[place_name].sort_values(ascending=False)
    
    # Get top 11 (including the place itself) and exclude the first one (the place itself)
    top_similar = similarity_scores.iloc[1:11]
    
    # Get details of recommended places
    recommendations = []
    for name in top_similar.index:
        place_data = destination_df[destination_df['Place_Name'] == name].iloc[0]
        recommendations.append({
            "Place_Id": int(place_data['Place_Id']),
            "Place_Name": place_data['Place_Name'],
            "Category": place_data['Category'],
            "Description": place_data['Description'] if pd.notna(place_data['Description']) else "",
            "Rating": float(place_data['Rating']) if pd.notna(place_data['Rating']) else 0,
            "Price": int(place_data['Price']) if pd.notna(place_data['Price']) else 0,
            "Similarity_Score": float(top_similar[name])
        })
    
    return {
        "query": place_name,
        "total_recommendations": len(recommendations),
        "recommendations": recommendations
    }

@app.get("/detail/{place_name}")
async def get_destination_detail(place_name: str):
    """Get full details of a specific destination"""
    if destination_df is None:
        raise HTTPException(status_code=500, detail="Data belum dimuat")
    
    # Decode URL-encoded place name
    place_name = unquote(place_name)
    
    # Find the place
    place = destination_df[destination_df['Place_Name'] == place_name]
    
    if place.empty:
        raise HTTPException(
            status_code=404, 
            detail=f"Destinasi '{place_name}' tidak ditemukan"
        )
    
    place_data = place.iloc[0]
    
    return {
        "Place_Id": int(place_data['Place_Id']),
        "Place_Name": place_data['Place_Name'],
        "Category": place_data['Category'],
        "City": place_data['City'],
        "Description": place_data['Description'] if pd.notna(place_data['Description']) else "",
        "Rating": float(place_data['Rating']) if pd.notna(place_data['Rating']) else 0,
        "Price": int(place_data['Price']) if pd.notna(place_data['Price']) else 0,
        "Lat": float(place_data['Lat']) if pd.notna(place_data['Lat']) else None,
        "Long": float(place_data['Long']) if pd.notna(place_data['Long']) else None
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
