import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import CategoriesSection from './components/sections/CategoriesSection';
import FeaturedSection from './components/sections/FeaturedSection';
import WhyVisitSection from './components/sections/WhyVisitSection';
import SearchSection from './components/sections/SearchSection';
import Footer from './components/Footer';
import Modal from './components/Modal';
import DestinationDetail from './components/DestinationDetail';
import RecommendationList from './components/RecommendationList';
import { getDestinations, getRecommendations, getDetail } from './api/api';

function App() {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoadingDestinations, setIsLoadingDestinations] = useState(true);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load destinations on mount
  useEffect(() => {
    const loadDestinations = async () => {
      try {
        setIsLoadingDestinations(true);
        const data = await getDestinations();
        setDestinations(data.destinations);
        setError(null);
      } catch (err) {
        setError('Failed to load destinations. Make sure the backend server is running.');
        console.error(err);
      } finally {
        setIsLoadingDestinations(false);
      }
    };

    loadDestinations();
  }, []);

  // Handle destination selection - Opens modal
  const handleSelectDestination = async (placeName) => {
    try {
      setIsLoadingRecommendations(true);
      setError(null);
      setIsModalOpen(true);

      // Fetch destination detail
      const detail = await getDetail(placeName);
      setSelectedDestination(detail);

      // Fetch recommendations
      const recData = await getRecommendations(placeName);
      setRecommendations(recData.recommendations);

    } catch (err) {
      setError('Failed to load recommendations. Please try again.');
      console.error(err);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Why Visit Section */}
      <WhyVisitSection />

      {/* Featured Destinations */}
      <FeaturedSection 
        destinations={destinations} 
        onCardClick={handleSelectDestination}
      />

      {/* Categories Section */}
      <CategoriesSection />

      {/* Search Section */}
      <SearchSection
        destinations={destinations}
        selectedDestination={null}
        recommendations={[]}
        isLoadingDestinations={isLoadingDestinations}
        isLoadingRecommendations={false}
        onSelectDestination={handleSelectDestination}
      />

      {/* Destination Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {isLoadingRecommendations ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="spinner-brutal mx-auto mb-4"></div>
              <p className="font-mono text-black">LOADING_DESTINATION...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Destination Detail */}
            {selectedDestination && (
              <DestinationDetail destination={selectedDestination} />
            )}

            {/* Similar Recommendations */}
            {recommendations.length > 0 && (
              <div className="mt-8 pt-8 border-t-3 border-black">
                <div className="brutal-label mb-4">
                  SIMILAR_DESTINATIONS
                </div>
                <h3 className="text-brutal-headline text-xl md:text-2xl text-black mb-6">
                  YOU MIGHT ALSO LIKE //
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendations.slice(0, 6).map((dest, index) => (
                    <div 
                      key={dest.Place_Id}
                      onClick={() => handleSelectDestination(dest.Place_Name)}
                      className="brutal-card p-4 cursor-pointer"
                      style={{ 
                        opacity: 0,
                        animation: `fadeIn 0.3s ease forwards`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="badge-brutal text-xs">{dest.Category}</span>
                        <span className="font-mono text-xs text-brutal-blue">
                          {Math.round(dest.Similarity_Score * 100)}%
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-sm text-black uppercase line-clamp-2">
                        {dest.Place_Name}
                      </h4>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-mono text-xs text-black">★ {dest.Rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </Modal>

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md">
          <div className="brutal-card bg-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-brutal-orange border-2 border-black flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="font-mono text-sm text-black flex-1">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="w-8 h-8 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
