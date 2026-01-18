import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import CategoriesSection from './components/sections/CategoriesSection';
import FeaturedSection from './components/sections/FeaturedSection';
import WhyVisitSection from './components/sections/WhyVisitSection';
import SearchSection from './components/sections/SearchSection';
import Footer from './components/Footer';
import { getDestinations, getRecommendations, getDetail } from './api/api';

function App() {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoadingDestinations, setIsLoadingDestinations] = useState(true);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [error, setError] = useState(null);

  // Load destinations on mount
  useEffect(() => {
    const loadDestinations = async () => {
      try {
        setIsLoadingDestinations(true);
        const data = await getDestinations();
        setDestinations(data.destinations);
        setError(null);
      } catch (err) {
        setError('Gagal memuat data destinasi. Pastikan server backend berjalan.');
        console.error(err);
      } finally {
        setIsLoadingDestinations(false);
      }
    };

    loadDestinations();
  }, []);

  // Handle destination selection
  const handleSelectDestination = async (placeName) => {
    try {
      setIsLoadingRecommendations(true);
      setError(null);

      // Fetch destination detail
      const detail = await getDetail(placeName);
      setSelectedDestination(detail);

      // Fetch recommendations
      const recData = await getRecommendations(placeName);
      setRecommendations(recData.recommendations);

      // Scroll to results
      setTimeout(() => {
        const resultsSection = document.getElementById('search-results');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (err) {
      setError('Gagal memuat rekomendasi. Silakan coba lagi.');
      console.error(err);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Categories Section */}
      <CategoriesSection />

      {/* Featured Destinations */}
      <FeaturedSection 
        destinations={destinations} 
        onCardClick={handleSelectDestination}
      />

      {/* Why Visit Section */}
      <WhyVisitSection />

      {/* Search Section */}
      <SearchSection
        destinations={destinations}
        selectedDestination={selectedDestination}
        recommendations={recommendations}
        isLoadingDestinations={isLoadingDestinations}
        isLoadingRecommendations={isLoadingRecommendations}
        onSelectDestination={handleSelectDestination}
      />

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md">
          <div className="modern-card bg-red-50 border-red-100 p-4 flex items-center gap-3 shadow-soft-lg">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-red-700 font-medium text-sm">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-red-400 hover:text-red-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
