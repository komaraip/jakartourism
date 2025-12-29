import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import SearchBar from './components/SearchBar';
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
        const detailSection = document.getElementById('detail-section');
        if (detailSection) {
          detailSection.scrollIntoView({ behavior: 'smooth' });
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
    <div className="min-h-screen">
      {/* Hero Section with Search */}
      <HeroSection>
        <SearchBar
          destinations={destinations}
          onSelect={handleSelectDestination}
          isLoading={isLoadingDestinations}
        />
      </HeroSection>

      {/* Error Message */}
      {error && (
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
            <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* Results Section */}
      <div id="detail-section">
        {/* Loading State */}
        {isLoadingRecommendations && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="spinner mx-auto mb-4"></div>
              <p className="text-gray-400">Memuat data...</p>
            </div>
          </div>
        )}

        {/* Destination Detail */}
        {!isLoadingRecommendations && selectedDestination && (
          <DestinationDetail destination={selectedDestination} />
        )}

        {/* Recommendations */}
        {!isLoadingRecommendations && recommendations.length > 0 && (
          <RecommendationList 
            recommendations={recommendations} 
            onCardClick={handleSelectDestination}
            isLoading={false}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 mt-8 border-t border-white/5">
        <p className="text-gray-500 text-sm">
          Sistem Rekomendasi Wisata Jakarta © 2024
        </p>
        <p className="text-gray-600 text-xs mt-1">
          Menggunakan Content-Based Filtering dengan TF-IDF dan Cosine Similarity
        </p>
      </footer>
    </div>
  );
}

export default App;
