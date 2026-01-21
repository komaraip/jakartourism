import { Link } from 'react-router-dom';
import DestinationCard from '../DestinationCard';

const reasons = [
  {
    id: 1,
    title: 'RICH CULTURE',
    description: 'Experience authentic Betawi heritage and historic museums.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'LEGENDARY FOOD',
    description: 'Taste iconic street food from Soto Betawi to Kerak Telor.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'URBAN JUNGLE',
    description: 'Modern MRT, LRT, and TransJakarta meet raw urban energy.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  }
];

const ExploreSection = ({ destinations, onCardClick }) => {
  // Get top 4 destinations by rating
  const featuredDestinations = destinations
    .sort((a, b) => b.Rating - a.Rating)
    .slice(0, 4);

  return (
    <section id="explore" className="bg-surface-50">
      {/* Divider */}
      <div className="brutal-divider" />
      
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="brutal-label mx-auto mb-6">
              EXPLORE //
            </div>
            <h2 className="text-brutal-headline text-4xl md:text-5xl lg:text-6xl text-black mb-4">
              DISCOVER
              <br />
              JAKARTA.
            </h2>
            <p className="font-mono text-lg text-black max-w-2xl mx-auto">
              WHY VISIT THE CAPITAL AND WHERE TO GO
            </p>
          </div>

          {/* Highlights - Compact 3-Column Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-16">
            {reasons.map((reason, index) => (
              <div 
                key={reason.id}
                className="brutal-card brutal-card-yellow p-6 flex items-start gap-4 cursor-pointer group"
                style={{ 
                  opacity: 0,
                  animation: `fadeIn 0.5s ease forwards`,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Icon */}
                <div className="w-14 h-14 flex-shrink-0 border-3 border-black bg-white flex items-center justify-center group-hover:bg-brutal-blue group-hover:text-white transition-colors">
                  {reason.icon}
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-heading font-black text-lg text-black mb-1">
                    {reason.title}
                  </h3>
                  <p className="font-mono text-sm text-black leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Destinations Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <h3 className="font-heading font-black text-2xl md:text-3xl text-black">
                TRENDING NOW //
              </h3>
              <p className="font-mono text-black">
                TOP-RATED DESTINATIONS
              </p>
            </div>

            <Link 
              to="/search"
              className="brutal-btn brutal-btn-white"
            >
              EXPLORE ALL
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
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
                    animationDelay: `${(index + 3) * 0.1}s`
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

export default ExploreSection;
