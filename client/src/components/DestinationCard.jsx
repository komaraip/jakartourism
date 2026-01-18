import { formatRupiah } from '../api/api';

const DestinationCard = ({ destination, onClick }) => {
  const getCategoryBadgeClass = (category) => {
    const categoryMap = {
      'Budaya': 'badge-budaya',
      'Taman Hiburan': 'badge-taman-hiburan',
      'Bahari': 'badge-bahari',
      'Cagar Alam': 'badge-cagar-alam',
      'Pusat Perbelanjaan': 'badge-pusat-perbelanjaan',
      'Tempat Ibadah': 'badge-tempat-ibadah',
    };
    return categoryMap[category] || 'badge-default';
  };

  return (
    <div 
      onClick={() => onClick && onClick(destination.Place_Name)}
      className="modern-card p-5 hover-lift cursor-pointer group"
    >
      {/* Category Badge */}
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs px-2.5 py-1 rounded-full text-white font-medium ${getCategoryBadgeClass(destination.Category)}`}>
          {destination.Category}
        </span>
        
        {/* Similarity Score (if available) */}
        {destination.Similarity_Score !== undefined && (
          <span className="text-xs font-semibold text-secondary-600 bg-secondary-50 px-2.5 py-1 rounded-full">
            {Math.round(destination.Similarity_Score * 100)}% mirip
          </span>
        )}
      </div>

      {/* Place Name */}
      <h3 className="font-heading text-lg font-bold text-charcoal mb-3 line-clamp-2 group-hover:text-primary-500 transition-colors duration-200">
        {destination.Place_Name}
      </h3>

      {/* Description Preview */}
      {destination.Description && (
        <p className="text-sm text-warmgray mb-4 line-clamp-2 leading-relaxed">
          {destination.Description}
        </p>
      )}

      {/* Footer - Rating & Price */}
      <div className="flex items-center justify-between pt-3 border-t border-primary-50">
        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-semibold text-charcoal">{destination.Rating}</span>
        </div>

        {/* Price */}
        <div className={`text-sm font-bold ${destination.Price === 0 ? 'text-tropical-green' : 'text-primary-500'}`}>
          {formatRupiah(destination.Price)}
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
