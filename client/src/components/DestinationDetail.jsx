import { formatRupiah } from '../api/api';

const DestinationDetail = ({ destination }) => {
  if (!destination) return null;

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

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg key={i} className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="halfGradient">
                <stop offset="50%" stopColor="currentColor"/>
                <stop offset="50%" stopColor="#E2E8F0"/>
              </linearGradient>
            </defs>
            <path fill="url(#halfGradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-5 h-5 text-gray-200 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <section className="px-4 py-10 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-10 accent-bar rounded-full"></div>
        <h2 className="font-heading text-2xl font-bold text-charcoal dark:text-white transition-colors">Tentang Tempat Ini</h2>
      </div>

      {/* Detail Card */}
      <div className="modern-card p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-charcoal dark:text-white mb-3 transition-colors">
              {destination.Place_Name}
            </h3>
            <span className={`inline-block text-sm px-3 py-1.5 rounded-full text-white font-medium ${getCategoryBadgeClass(destination.Category)}`}>
              {destination.Category}
            </span>
          </div>
          
          {/* Price */}
          <div className="text-right">
            <div className="text-sm text-warmgray dark:text-warmgray-light mb-1 font-medium">Harga Tiket</div>
            <div className={`text-2xl font-heading font-bold ${destination.Price === 0 ? 'text-tropical-green' : 'gradient-text'}`}>
              {formatRupiah(destination.Price)}
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-6 pb-6 border-b border-primary-50 dark:border-gray-700">
          <div className="flex">{renderStars(destination.Rating)}</div>
          <span className="text-lg font-bold text-charcoal dark:text-white">{destination.Rating}</span>
          <span className="text-warmgray dark:text-warmgray-light">/ 5.0</span>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h4 className="font-heading text-lg font-bold text-charcoal dark:text-white mb-3 transition-colors">Deskripsi</h4>
          <p className="text-warmgray dark:text-warmgray-light leading-relaxed">
            {destination.Description || 'Deskripsi tidak tersedia.'}
          </p>
        </div>

        {/* Location Info */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-primary-50 dark:border-gray-700">
          <div className="flex items-center gap-2 text-warmgray dark:text-warmgray-light">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-900/50 dark:to-secondary-800/50 flex items-center justify-center">
              <svg className="w-4 h-4 text-secondary-600 dark:text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="font-medium">{destination.City}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationDetail;
