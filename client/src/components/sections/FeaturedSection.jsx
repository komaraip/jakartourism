import DestinationCard from '../DestinationCard';

const FeaturedSection = ({ destinations, onCardClick }) => {
  // Get top 6 destinations by rating
  const featuredDestinations = destinations
    .sort((a, b) => b.Rating - a.Rating)
    .slice(0, 6);

  return (
    <section id="featured" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-10 accent-bar rounded-full"></div>
              <span className="text-sm font-semibold text-primary-500 uppercase tracking-wider">Populer</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-3">
              Destinasi Favorit
            </h2>
            <p className="text-warmgray text-lg max-w-xl">
              Destinasi wisata dengan rating tertinggi yang wajib Anda kunjungi di Jakarta
            </p>
          </div>

          <button 
            onClick={() => document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-6 py-3 bg-surface-100 hover:bg-surface-200 text-charcoal font-semibold rounded-xl transition-colors"
          >
            Lihat Semua
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Destinations Grid */}
        {featuredDestinations.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDestinations.map((dest, index) => (
              <div 
                key={dest.Place_Id}
                className="opacity-0"
                style={{ 
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
            <div className="spinner mx-auto mb-4"></div>
            <p className="text-warmgray">Memuat destinasi...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedSection;
