import { useState, useEffect } from 'react';
import SearchSection from '../components/sections/SearchSection';
import Modal from '../components/Modal';
import DestinationDetail from '../components/DestinationDetail';
import { getDestinations, getRecommendations, getDetail } from '../api/api';

const SearchPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoadingDestinations, setIsLoadingDestinations] = useState(true);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [error, setError] = useState(null);
  
  // Modal state for recommendation card clicks
  const [modalDestination, setModalDestination] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  // Load destinations on mount
  useEffect(() => {
    const loadDestinations = async () => {
      try {
        setIsLoadingDestinations(true);
        const data = await getDestinations();
        setDestinations(data.destinations);
        setError(null);
      } catch (err) {
        setError('Failed to load destinations. Make sure the server is running.');
        console.error(err);
      } finally {
        setIsLoadingDestinations(false);
      }
    };

    loadDestinations();
  }, []);

  // Handle initial search - displays inline in SearchSection
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
      setError('Failed to load recommendations. Please try again.');
      console.error(err);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  // Handle recommendation card click - opens modal
  const handleRecommendationClick = async (placeName) => {
    try {
      setIsModalOpen(true);
      setIsLoadingModal(true);
      setError(null);

      // Fetch destination detail for modal
      const detail = await getDetail(placeName);
      setModalDestination(detail);

    } catch (err) {
      setError('Failed to load destination details.');
      console.error(err);
    } finally {
      setIsLoadingModal(false);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalDestination(null);
  };

  return (
    <>
      {/* Search Section */}
      <SearchSection
        destinations={destinations}
        selectedDestination={selectedDestination}
        recommendations={recommendations}
        isLoadingDestinations={isLoadingDestinations}
        isLoadingRecommendations={isLoadingRecommendations}
        onSelectDestination={handleSelectDestination}
        onRecommendationClick={handleRecommendationClick}
      />

      {/* Destination Modal - for recommendation card clicks */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {isLoadingModal ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="spinner-brutal mx-auto mb-4"></div>
              <p className="font-mono text-black">LOADING_DESTINATION...</p>
            </div>
          </div>
        ) : modalDestination ? (
          <DestinationDetail destination={modalDestination} />
        ) : null}
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
    </>
  );
};

export default SearchPage;
