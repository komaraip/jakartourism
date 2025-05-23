# Jakarta Tourism Recommendation Website

Jakartourism is a website developed based on my research, "Application of Collaborative Filtering Method to Recommend Tourist Destinations in Jakarta City." Designed for travelers, it offers personalized recommendations for the top ten attractions in Jakarta by analyzing user ratings and preferences. Each suggestion comes with detailed descriptions, helping visitors easily navigate the city’s vibrant cultural and recreational offerings.

- Website Link : <a href="https://project.komaraip.com/jakartourism/">Here</a><br>
- Research Publication Link : <a href="https://doi.org/10.1109/ICISS62896.2024.10751604">Here</a>

## Features

- Browse Jakarta tourism spots by categories
- Search for specific destinations
- View detailed information about each place including price, rating, and description
- Get personalized recommendations based on your selected places
- Interactive map showing the location of each destination
- Robust image loading with fallbacks for reliable user experience

## Technologies Used

- **Backend**: Flask, Python, scikit-learn, Pandas
- **Frontend**: HTML, CSS, JavaScript, Bootstrap 5
- **Map**: Leaflet.js
- **UI Components**: Font Awesome, Bootstrap

## Setup Instructions

### Prerequisites

- Python 3.7+
- pip (Python package installer)
- XAMPP or any other PHP development environment

### Installation

1. Clone the repository to your XAMPP htdocs folder or preferred location:

```
git clone https://github.com/komaraip/jakartourism.git
cd jakartourism
```

2. Install the required Python packages:

```
pip install -r requirements.txt
```

### Running the Application

1. Start the Flask application with run directly with Python:

```
python app.py
```

2. Open a web browser and navigate to:

```
http://localhost:5000/
```

## Dataset

The application uses the following datasets:
- `tourism_with_id.csv`: Contains information about tourism places in Jakarta
- `tourism_rating.csv`: Contains user ratings for different places
- `user.csv`: Contains user information

## How It Works

The recommendation system uses TF-IDF (Term Frequency-Inverse Document Frequency) and cosine similarity to find similar tourism spots based on their categories. The system calculates the similarity between places and suggests destinations that are most similar to the one selected by the user.

## Image Loading Implementation

The website now uses local example images for improved performance and reliability:

1. **Standardized Local Images**: All destinations use the same local image (`example_img.jpg`) for consistency
2. **Simplified Loading**: Using local images eliminates network dependency for faster page loads
3. **Error-Free Display**: No more failed image loads or missing destination photos
4. **Enhanced Performance**: Reduced network requests improve the overall application speed
5. **Offline Capability**: Local images work even without internet connection
6. **Consistent UI**: Uniform appearance across all tourism destinations
7. **Reduced Bandwidth**: Users consume less data when browsing the site

## Troubleshooting

If you encounter any issues with the application, try these steps:

1. **Check local files**: Ensure `example_img.jpg` exists in the `static/img/` directory
2. **Clear browser cache**: Sometimes cached JavaScript or CSS can cause display issues
3. **Check console errors**: Open your browser's developer tools and look for any JavaScript errors
4. **Verify Flask server**: Make sure the Flask server is running properly
5. **Check file permissions**: Ensure all files have proper read permissions

## Future Improvements

- Implement user authentication for personalized recommendations
- Add more filters (price range, rating, etc.)
- Include more detailed information about each place
- Add reviews and comments section
- Implement collaborative filtering for better recommendations
- Add offline image caching for better performance

## License

This project is licensed under the MIT License - see the LICENSE file for details.
