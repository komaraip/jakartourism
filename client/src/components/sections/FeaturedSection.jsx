import DestinationCard from '../DestinationCard';

const FeaturedSection = ({ destinations, onCardClick }) => {
  // Get top 8 destinations by rating for horizontal scroll
  const featuredDestinations = destinations
    .sort((a, b) => b.Rating - a.Rating)
    .slice(0, 8);

  return (
    <section id="featured" className="bg-surface-50">
      {/* Divider */}
      <div className="brutal-divider" />
      
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="brutal-label mb-4">
                POPULAR // POPULER
              </div>
              <h2 className="text-brutal-headline text-4xl md:text-5xl lg:text-6xl text-black mb-3">
                TRENDING NOW //
              </h2>
              <p className="font-mono text-lg text-black max-w-xl">
                TOP-RATED DESTINATIONS THAT YOU NEED TO VISIT
              </p>
            </div>

            <button 
              onClick={() => document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' })}
              className="brutal-btn brutal-btn-white"
            >
              VIEW ALL
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Horizontal Scroll Container */}
          {featuredDestinations.length > 0 ? (
            <div className="horizontal-scroll pb-4">
              {featuredDestinations.map((dest, index) => (
                <div 
                  key={dest.Place_Id}
                  className="flex-shrink-0 w-[300px] sm:w-[340px]"
                  style={{ 
                    opacity: 0,
                    animation: `fadeIn 0.5s ease forwards`,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <DestinationCard 
                    destination={dest} 
                    onClick={onCardClick}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="spinner-brutal mx-auto mb-4"></div>
              <p className="font-mono text-black">LOADING_DESTINATIONS...</p>
            </div>
          )}

          {/* Scroll Hint */}
          <div className="flex items-center justify-center gap-2 mt-6 font-mono text-sm text-black opacity-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            SCROLL TO EXPLORE
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
