import { formatRupiah } from '../api/api';

const DestinationDetail = ({ destination }) => {
  if (!destination) return null;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <div key={i} className="w-6 h-6 bg-brutal-yellow border-2 border-black flex items-center justify-center">
            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        );
      } else {
        stars.push(
          <div key={i} className="w-6 h-6 bg-white border-2 border-black flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        );
      }
    }
    return stars;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="brutal-label mb-4">
        DESTINATION_DETAILS
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
        <div className="flex-1">
          <h3 className="text-brutal-headline text-3xl md:text-4xl text-black mb-4">
            {destination.Place_Name}
          </h3>
          <span className="badge-brutal">
            {destination.Category}
          </span>
        </div>
        
        {/* Price */}
        <div className="brutal-card p-4 text-center min-w-[160px]">
          <div className="font-mono text-xs text-black mb-1">TICKET_PRICE</div>
          <div className={`text-2xl font-heading font-black ${destination.Price === 0 ? 'text-brutal-blue' : 'text-brutal-orange'}`}>
            {destination.Price === 0 ? 'FREE' : formatRupiah(destination.Price)}
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b-3 border-black">
        <div className="flex gap-0.5">{renderStars(destination.Rating)}</div>
        <span className="font-mono font-bold text-xl text-black">{destination.Rating}</span>
        <span className="font-mono text-black opacity-50">/ 5.0</span>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h4 className="font-heading font-black text-lg text-black mb-3 uppercase">Description</h4>
        <p className="text-brutal-body text-black leading-relaxed">
          {destination.Description || 'No description available.'}
        </p>
      </div>

      {/* Location Info */}
      <div className="flex flex-wrap gap-4 pt-4 border-t-3 border-black">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brutal-blue border-2 border-black flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="font-mono font-bold text-black">{destination.City}</span>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
