import DestinationCard from '../DestinationCard';

const FeaturedSection = ({ destinations, onCardClick }) => {
  // Get top 4 destinations by rating
  const featuredDestinations = destinations
    .sort((a, b) => b.Rating - a.Rating)
    .slice(0, 4);

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
                POPULAR //
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
              EXPLORE ALL
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* 4-Card Grid */}
          {featuredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredDestinations.map((dest, index) => (
                <div 
                  key={dest.Place_Id}
                  style={{ 
                    opacity: 0,
                    animation: `fadeIn 0.5s ease forwards`,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <DestinationCard 
                    destination={dest} 
                    onClick={onCardClick}
                    compact={true}
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
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
