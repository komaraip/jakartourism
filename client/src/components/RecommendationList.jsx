import DestinationCard from './DestinationCard';

const RecommendationList = ({ recommendations, onCardClick, isLoading }) => {
  if (isLoading) {
    return (
      <section className="px-4 py-10 max-w-6xl mx-auto">
        <div className="brutal-label mb-6">
          SIMILAR_RECOMMENDATIONS
        </div>
        
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="spinner-brutal mx-auto mb-4"></div>
            <p className="font-mono text-black">SEARCHING_DATABASE...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <section className="px-4 py-10 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="brutal-label mb-4">
        SIMILAR_RECOMMENDATIONS
      </div>
      
      <h2 className="text-brutal-headline text-2xl md:text-3xl text-black mb-4">
        YOU MIGHT ALSO LIKE //
      </h2>

      {/* Description */}
      <p className="font-mono text-black mb-8 max-w-2xl opacity-80">
        FOUND <span className="font-bold text-brutal-blue">{recommendations.length}</span> SIMILAR DESTINATIONS BASED ON CATEGORY MATCH.
      </p>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {recommendations.map((dest, index) => (
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
    </section>
  );
};

export default RecommendationList;
