import { formatRupiah } from '../api/api';

const DestinationCard = ({ destination, onClick }) => {
  return (
    <div 
      onClick={() => onClick && onClick(destination.Place_Name)}
      className="brutal-card p-5 cursor-pointer group"
    >
      {/* Header - Category & Similarity */}
      <div className="flex items-start justify-between mb-4">
        <span className="badge-brutal">
          {destination.Category}
        </span>
        
        {/* Similarity Score (if available) */}
        {destination.Similarity_Score !== undefined && (
          <span className="badge-brutal-blue">
            {Math.round(destination.Similarity_Score * 100)}% MATCH
          </span>
        )}
      </div>

      {/* Place Name */}
      <h3 className="font-heading font-black text-xl text-black mb-3 line-clamp-2 group-hover:text-brutal-blue transition-colors uppercase">
        {destination.Place_Name}
      </h3>

      {/* Description Preview */}
      {destination.Description && (
        <p className="text-sm text-black mb-4 line-clamp-3 leading-relaxed opacity-80">
          {destination.Description}
        </p>
      )}

      {/* Footer - Rating & Price */}
      <div className="flex items-center justify-between pt-4 border-t-2 border-black">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brutal-yellow border-2 border-black flex items-center justify-center">
            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span className="font-mono font-bold text-black">{destination.Rating}</span>
        </div>

        {/* Price */}
        <div className={`font-mono font-bold text-lg ${destination.Price === 0 ? 'text-brutal-blue' : 'text-brutal-orange'}`}>
          {destination.Price === 0 ? 'FREE' : formatRupiah(destination.Price)}
        </div>
      </div>

      {/* Hover Arrow */}
      <div className="flex items-center justify-end mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="font-mono text-xs text-black mr-2">VIEW DETAILS</span>
        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  );
};

export default DestinationCard;
