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
    <section id="search" className="bg-surface-50">
      {/* Divider */}
      <div className="brutal-divider" />
      
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="brutal-label mx-auto mb-6">
              SEARCH // TERMINAL
            </div>
            <h2 className="text-brutal-headline text-4xl md:text-5xl lg:text-6xl text-black mb-4">
              INPUT
              <br />
              PARAMETERS.
            </h2>
            <p className="font-mono text-lg text-black max-w-2xl mx-auto">
              ENTER DESTINATION NAME TO GET AI-POWERED RECOMMENDATIONS
            </p>
          </div>

          {/* Terminal Window */}
          <div className="brutal-window max-w-3xl mx-auto">
            {/* Window Header */}
            <div className="brutal-window-header">
              <div className="brutal-window-dot red"></div>
              <div className="brutal-window-dot yellow"></div>
              <div className="brutal-window-dot green"></div>
              <span className="font-mono text-xs text-black ml-4">JAKARTOURISM_TERMINAL_V2.0</span>
            </div>

            {/* Window Content */}
            <div className="p-6">
              <div className="font-mono text-sm text-black mb-4">
                <span className="text-brutal-blue">root@jkt-recs</span>
                <span className="text-black">:</span>
                <span className="text-brutal-orange">~</span>
                <span className="text-black">$ find_destination</span>
              </div>

              {/* Search Input */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <SearchBar
                    destinations={destinations}
                    onSelect={onSelectDestination}
                    isLoading={isLoadingDestinations}
                  />
                </div>
                <button 
                  onClick={() => {}}
                  className="brutal-btn brutal-btn-blue px-8"
                >
                  GO
                </button>
              </div>

              {/* Hint */}
              <div className="font-mono text-xs text-black mt-4 opacity-50">
                TYPE DESTINATION NAME OR SCROLL TO SELECT_
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div id="search-results" className="mt-12">
            {/* Loading State */}
            {isLoadingRecommendations && (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="spinner-brutal mx-auto mb-4"></div>
                  <p className="font-mono text-black">PROCESSING_REQUEST...</p>
                </div>
              </div>
            )}

            {/* Destination Detail */}
            {!isLoadingRecommendations && selectedDestination && (
              <div className="brutal-card p-6 md:p-8 mt-8">
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
      </div>
    </section>
  );
};

export default SearchSection;
