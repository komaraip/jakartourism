import { formatRupiah } from '../api/api';

const DestinationCard = ({ destination, onClick, compact = false }) => {
  // Compact mode for featured section (smaller cards)
  const cardHeight = compact ? 'h-[240px]' : 'h-[290px]';
  const titleHeight = compact ? 'h-[48px]' : 'h-[60px]';
  const descHeight = compact ? 'h-[40px] line-clamp-2' : 'h-[65px] line-clamp-3';
  const titleSize = compact ? 'text-lg' : 'text-xl';

  return (
    <div 
      onClick={() => onClick && onClick(destination.Place_Name)}
      className={`brutal-card p-5 cursor-pointer group ${cardHeight} flex flex-col`}
    >
      {/* Header - Category & Similarity */}
      <div className="flex items-start justify-between mb-3">
        <span className="badge-brutal text-xs">
          {destination.Category}
        </span>
        
        {/* Similarity Score (if available) */}
        {destination.Similarity_Score !== undefined && (
          <span className="badge-brutal-blue text-xs">
            {Math.round(destination.Similarity_Score * 100)}% MATCH
          </span>
        )}
      </div>

      {/* Place Name - Fixed height with line clamp */}
      <h3 className={`font-heading font-black ${titleSize} text-black mb-2 line-clamp-2 group-hover:text-brutal-blue transition-colors uppercase ${titleHeight}`}>
        {destination.Place_Name}
      </h3>

      {/* Description Preview - Fixed height with line clamp and ellipsis */}
      <p className={`text-sm text-black mb-3 leading-relaxed opacity-80 ${descHeight} flex-shrink-0 overflow-hidden`}>
        {destination.Description || 'No description available.'}
      </p>

      {/* Spacer to push footer to bottom */}
      <div className="flex-1" />

      {/* Footer - Rating & Price */}
      <div className="flex items-center justify-between pt-3 border-t-2 border-black">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-brutal-yellow border-2 border-black flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span className="font-mono font-bold text-black text-sm">{destination.Rating}</span>
        </div>

        {/* Price */}
        <div className={`font-mono font-bold ${compact ? 'text-sm' : 'text-lg'} ${destination.Price === 0 ? 'text-brutal-blue' : 'text-brutal-orange'}`}>
          {destination.Price === 0 ? 'FREE' : formatRupiah(destination.Price)}
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
