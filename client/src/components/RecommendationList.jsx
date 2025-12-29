import DestinationCard from './DestinationCard';

const RecommendationList = ({ recommendations, onCardClick, isLoading }) => {
  if (isLoading) {
    return (
      <section className="px-4 py-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-white">Rekomendasi Serupa</h2>
        </div>
        
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="spinner mx-auto mb-4"></div>
            <p className="text-gray-400">Mencari rekomendasi...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <section className="px-4 py-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
        <h2 className="text-2xl font-bold text-white">Rekomendasi Serupa</h2>
      </div>

      {/* Description */}
      <p className="text-gray-400 mb-8">
        Berikut adalah <span className="text-white font-medium">{recommendations.length} destinasi wisata</span> yang 
        mirip berdasarkan kategori yang sama. Klik untuk melihat detail dan rekomendasi lainnya.
      </p>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {recommendations.map((dest, index) => (
          <div 
            key={dest.Place_Id}
            className="opacity-0 animate-fade-in"
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

      {/* Inline CSS for animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default RecommendationList;
