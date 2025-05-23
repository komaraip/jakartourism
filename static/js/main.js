// Image loading utilities
function preloadImage(url) {
    const img = new Image();
    img.src = url;
}

// Simplified image loading function now that we're using local images
function setupImageLoading() {
    // Add event listeners to all images
    document.addEventListener('load', function(e) {
        // Check if the loaded element is an image
        if (e.target.tagName === 'IMG') {
            e.target.classList.add('img-loaded');
        }
    }, true);
    
    // Pre-mark all initial images as loaded since they're local
    document.querySelectorAll('img').forEach(img => {
        if (img.complete) {
            img.classList.add('img-loaded');
        }
    });
    
    // Set up a mutation observer for dynamically added images
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                for (let i = 0; i < mutation.addedNodes.length; i++) {
                    const node = mutation.addedNodes[i];
                    if (node.nodeType === 1) { // Only process Element nodes
                        const images = node.getElementsByTagName('img');
                        if (images.length) {
                            for (let img of images) {
                                if (img.complete) {
                                    img.classList.add('img-loaded');
                                }
                            }
                        }
                    }
                }
            }
        });
    });
    
    // Start observing the document
    observer.observe(document.body, { childList: true, subtree: true });
}

document.addEventListener('DOMContentLoaded', function() {
    // Global variables
    const placesContainer = document.getElementById('placesContainer');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const placeDetailsModal = new bootstrap.Modal(document.getElementById('placeDetailsModal'));
      // Preload example image with full path adjusted for subdirectory
    preloadImage(`${window.location.pathname.replace(/\/+$/, '')}/static/img/example_img.jpg`);
    
    // Setup advanced image loading functionality
    setupImageLoading();
    
    // Initialize navbar effects if the function exists
    if (window.AppHelpers && window.AppHelpers.initNavbarEffects) {
        window.AppHelpers.initNavbarEffects();
    }
    // Initialize places data from template
    let allPlaces = [];
    
    // Initialize data from window.placesData (will be set in the template)
    if (window.placesData) {
        allPlaces = window.placesData;
    }

    // Function to display places
    function displayPlaces(places) {
        placesContainer.innerHTML = '';
        
        if (places.length === 0) {
            placesContainer.innerHTML = '<div class="col-12 text-center"><p>No destinations found. Try another search.</p></div>';
            return;
        }          places.forEach(place => {
            const placeCard = document.createElement('div');
            placeCard.className = 'col-md-4 mb-4';            // Use local example_img.jpg with path adjusted for subdirectory
            const baseUrl = window.location.pathname.replace(/\/+$/, '');
            const imageUrl = `${baseUrl}/static/img/example_img.jpg`;
              placeCard.innerHTML = `
                <div class="card" data-place-id="${place.Place_Id}" data-place-name="${place.Place_Name}">
                    <div class="card-image-wrapper">
                        <span class="card-category">${place.Category || 'Unknown'}</span>
                        <img src="${imageUrl}" class="card-img-top" alt="${place.Place_Name}" 
                             onerror="this.onerror=null; this.src='${baseUrl}/static/img/example_img.jpg';"
                             loading="lazy">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${place.Place_Name}</h5>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <span class="card-rating">
                                <i class="fas fa-star"></i> ${place.Rating || '0'}
                            </span>
                            <span class="card-price">
                                ${place.Price === 0 ? 'Free' : (place.Price ? 'Rp ' + place.Price.toLocaleString() : 'Price unavailable')}
                            </span>
                        </div>
                        <p class="card-text">${place.Description && place.Description.length > 100 ? place.Description.substring(0, 100) + '...' : (place.Description || 'No description available')}</p>                        <button class="btn btn-primary mt-auto view-details w-100" data-place-id="${place.Place_Id}">
                            <i class="fas fa-info-circle me-1"></i> View Details
                        </button>
                    </div>
                </div>
            `;
            placesContainer.appendChild(placeCard);
        });

        // Add event listeners to new detail buttons
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', handleViewDetails);
        });
    }

    // Filter places by category
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active state
            categoryButtons.forEach(btn => btn.classList.remove('active', 'btn-primary'));
            categoryButtons.forEach(btn => btn.classList.add('btn-outline-primary'));
            button.classList.remove('btn-outline-primary');
            button.classList.add('active', 'btn-primary');
            
            // Filter places
            if (category === 'All') {
                displayPlaces(allPlaces);
            } else {
                const filteredPlaces = allPlaces.filter(place => place.Category === category);
                displayPlaces(filteredPlaces);
            }
        });
    });    // Search functionality
    function searchPlaces() {
        const query = searchInput.value.toLowerCase().trim();
        
        if (query === '') {
            displayPlaces(allPlaces);
            return;
        }
        
        const searchResults = allPlaces.filter(place => {
            // Safely check each property for null values before calling toLowerCase()
            const nameMatch = place.Place_Name && place.Place_Name.toLowerCase().includes(query);
            const descMatch = place.Description && place.Description.toLowerCase().includes(query);
            const catMatch = place.Category && place.Category.toLowerCase().includes(query);
            
            return nameMatch || descMatch || catMatch;
        });
        
        displayPlaces(searchResults);
    }

    searchButton.addEventListener('click', searchPlaces);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchPlaces();
        }
    });

    // Handle view details
    function handleViewDetails(e) {
        const placeId = e.target.getAttribute('data-place-id');
        const placeCard = e.target.closest('.card');
        const placeName = placeCard.getAttribute('data-place-name');
        
        document.getElementById('placeDetailsTitle').textContent = placeName;
        document.getElementById('placeDetails').innerHTML = `
            <div class="loading-spinner">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;
        document.getElementById('recommendations').innerHTML = `
            <div class="loading-spinner">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;
        
        placeDetailsModal.show();
        
        // Get place details
        const place = allPlaces.find(p => p.Place_Id === parseInt(placeId));
        if (place) {
            showPlaceDetails(place);            // Get recommendations via API call to our Flask backend - use correct path construction
            const apiPath = window.location.pathname.replace(/\/+$/, '') + '/get_recommendations';
            fetch(apiPath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({ place_name: placeName }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                showRecommendations(data);
            })            .catch(error => {
                document.getElementById('recommendations').innerHTML = `
                    <div class="alert alert-warning" role="alert">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-exclamation-triangle me-3 fa-2x"></i> 
                            <div>
                                <h5 class="mb-1">Unable to load recommendations</h5>
                                <p class="mb-0">We couldn't find similar places at the moment.</p>
                            </div>
                        </div>
                    </div>
                    <div class="text-center mt-3">
                        <button class="btn btn-primary retry-recommendations" data-place-name="${placeName}">
                            <i class="fas fa-sync-alt me-1"></i> Try Again
                        </button>
                    </div>
                `;
                
                // Add retry functionality
                document.querySelector('.retry-recommendations').addEventListener('click', function() {
                    const placeNameToRetry = this.getAttribute('data-place-name');
                    document.getElementById('recommendations').innerHTML = `
                        <div class="loading-spinner">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    `;
                    
                    // Re-fetch recommendations
                    const apiPath = window.location.pathname.replace(/\/+$/, '') + '/get_recommendations';
                    fetch(apiPath, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ place_name: placeNameToRetry }),
                    })
                    .then(response => response.json())
                    .then(data => {
                        showRecommendations(data);
                    })
                    .catch(err => {
                        document.getElementById('recommendations').innerHTML = '<p>Error loading recommendations. Please try again.</p>';
                        console.error('Error:', err);
                    });
                });
                
                console.error('Error:', error);
            });
        }
    }    function showPlaceDetails(place) {
        let priceDisplay = place.Price === 0 ? 'Free' : (place.Price ? `Rp ${place.Price.toLocaleString()}` : 'Price unavailable');
        // Use local example_img.jpg with path adjusted for subdirectory
        const baseUrl = window.location.pathname.replace(/\/+$/, '');
        const imageUrl = `${baseUrl}/static/img/example_img.jpg`;
        
        let placeDetailsHTML = `
            <div class="place-details-container">
                <div class="place-image-container">
                    <img src="${imageUrl}" class="place-image" alt="${place.Place_Name}" 
                         onerror="this.onerror=null; this.src='${baseUrl}/static/img/example_img.jpg';"
                         loading="lazy">
                </div>
                
                <div class="place-details-content">
                    <div class="place-details-section">
                        <h3 class="mb-4">${place.Place_Name}</h3>
                        
                        <div class="place-attributes mb-3">
                            <div class="place-attribute">
                                <i class="fas fa-tag"></i> ${place.Category || 'Unknown'}
                            </div>
                            <div class="place-attribute">
                                <i class="fas fa-star"></i> ${place.Rating || '0'}/5
                            </div>
                            <div class="place-attribute">
                                <i class="fas fa-money-bill"></i> ${priceDisplay}
                            </div>
                        </div>
                        
                        <div class="place-description">
                            ${place.Description || 'No description available for this attraction.'}
                        </div>
                    </div>
        `;
        
        // Add map if coordinates are available
        if (place.Lat && place.Long) {
            placeDetailsHTML += `
                    <div class="map-container">
                        <div id="map"></div>
                    </div>
                </div>
            </div>`;
            
            document.getElementById('placeDetails').innerHTML = placeDetailsHTML;
            
            // Initialize map with improved styling
            setTimeout(() => {
                const map = L.map('map').setView([place.Lat, place.Long], 15);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
                
                const customIcon = L.divIcon({
                    className: 'custom-map-marker',
                    html: `<i class="fas fa-map-marker-alt"></i>`,
                    iconSize: [30, 42],
                    iconAnchor: [15, 42]
                });
                
                L.marker([place.Lat, place.Long], { icon: customIcon })
                    .addTo(map)
                    .bindPopup(`<strong>${place.Place_Name}</strong>`)
                    .openPopup();
            }, 300);
        } else {
            placeDetailsHTML += `
                </div>
            </div>`;
            document.getElementById('placeDetails').innerHTML = placeDetailsHTML;
        }
    }function showRecommendations(recommendations) {
        if (!recommendations || recommendations.length === 0) {
            document.getElementById('recommendations').innerHTML = '<p>No recommendations found.</p>';
            return;
        }
        
        let recommendationsHTML = `<div class="row">`;        recommendations.forEach(place => {
            let priceDisplay = place.Price === 0 ? 'Free' : (place.Price ? `Rp ${place.Price.toLocaleString()}` : 'Price unavailable');
              // Use local example_img.jpg with path adjusted for subdirectory
            const baseUrl = window.location.pathname.replace(/\/+$/, '');
            const imageUrl = `${baseUrl}/static/img/example_img.jpg`;
              recommendationsHTML += `
                <div class="col-md-4 mb-3">
                    <div class="card recommendation-card" data-place-id="${place.Place_Id}" data-place-name="${place.Place_Name}">
                        <div class="card-image-wrapper">
                            <span class="card-category">${place.Category || 'Unknown'}</span>
                            <img src="${imageUrl}" class="card-img-top" alt="${place.Place_Name}" 
                                 onerror="this.onerror=null; this.src='${baseUrl}/static/img/example_img.jpg';"
                                 loading="lazy">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${place.Place_Name}</h5>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="card-rating">
                                    <i class="fas fa-star"></i> ${place.Rating || '0'}
                                </span>
                                <span class="card-price">${priceDisplay}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        recommendationsHTML += `</div>`;        document.getElementById('recommendations').innerHTML = recommendationsHTML;
        
        // Make recommendation cards clickable
        document.querySelectorAll('.recommendation-card').forEach(card => {
            card.addEventListener('click', function() {
                const placeId = this.getAttribute('data-place-id');
                const placeName = this.getAttribute('data-place-name');
                
                // Find the matching place and show its details
                const recommendedPlace = allPlaces.find(p => p.Place_Id === parseInt(placeId));
                if (recommendedPlace) {
                    document.getElementById('placeDetailsTitle').textContent = placeName;
                    showPlaceDetails(recommendedPlace);
                }
            });
            
            // Add cursor style to show it's clickable
            card.style.cursor = 'pointer';
        });
    }

    // Footer category links
    document.querySelectorAll('#footerCategories a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            
            // Find and click the corresponding category button
            document.querySelector(`.category-btn[data-category="${category}"]`).click();
            
            // Scroll to destinations
            document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Initialize with all places
    displayPlaces(allPlaces);
});
