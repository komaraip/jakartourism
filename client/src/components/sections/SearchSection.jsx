import SearchBar from '../SearchBar';
import DestinationDetail from '../DestinationDetail';
import RecommendationList from '../RecommendationList';

const SearchSection = ({ 
  destinations, 
  selectedDestination, 
  recommendations, 
  isLoadingDestinations,
  isLoadingRecommendations,
  onSelectDestination 
}) => {
  return (
    <section id="search" className="py-20 px-4 bg-white dark:bg-dark-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-1.5 accent-bar rounded-full"></div>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal dark:text-white mb-4 transition-colors">
            Temukan Destinasi Wisata
          </h2>
          <p className="text-warmgray dark:text-warmgray-light text-lg max-w-2xl mx-auto mb-8">
            Cari destinasi wisata favorit Anda dan temukan rekomendasi tempat serupa 
            menggunakan teknologi AI
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <SearchBar
              destinations={destinations}
              onSelect={onSelectDestination}
              isLoading={isLoadingDestinations}
            />
          </div>
        </div>

        {/* Results Area */}
        <div id="search-results" className="mt-8">
          {/* Loading State */}
          {isLoadingRecommendations && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="spinner mx-auto mb-4"></div>
                <p className="text-warmgray dark:text-warmgray-light font-medium">Memuat data...</p>
              </div>
            </div>
          )}

          {/* Destination Detail */}
          {!isLoadingRecommendations && selectedDestination && (
            <div className="bg-surface-50 dark:bg-dark-50 rounded-3xl p-4 md:p-8 mt-8 transition-colors">
              <DestinationDetail destination={selectedDestination} />
            </div>
          )}

          {/* Recommendations */}
          {!isLoadingRecommendations && recommendations.length > 0 && (
            <div className="mt-8">
              <RecommendationList 
                recommendations={recommendations} 
                onCardClick={onSelectDestination}
                isLoading={false}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
