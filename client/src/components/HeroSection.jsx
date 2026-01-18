const HeroSection = () => {
  const scrollToSearch = () => {
    const element = document.getElementById('search');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16 overflow-hidden bg-white">
      {/* Background Decorations - Tropical Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] blob-pink rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] blob-cyan rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/3 w-80 h-80 blob-yellow rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 blob-green rounded-full blur-3xl"></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full bg-white/80 backdrop-blur-sm border border-primary-100 shadow-soft">
          <span className="w-2.5 h-2.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Ibu Kota Indonesia</span>
        </div>

        {/* Title */}
        <h1 className="font-heading text-5xl md:text-6xl lg:text-8xl font-extrabold mb-6 leading-tight">
          <span className="text-charcoal">Jelajahi</span>
          <br />
          <span className="gradient-text">Pesona Jakarta</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-warmgray mb-12 max-w-2xl mx-auto leading-relaxed">
          Temukan keindahan budaya, kuliner lezat, dan destinasi wisata menakjubkan 
          di kota metropolitan terbesar di Indonesia.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={scrollToSearch}
            className="px-8 py-4 btn-tropical text-white font-heading font-bold text-lg rounded-2xl flex items-center gap-2"
          >
            Jelajahi Sekarang
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white hover:bg-surface-100 text-charcoal font-heading font-bold text-lg rounded-2xl border-2 border-gray-100 hover:border-primary-200 transition-all duration-300"
          >
            Pelajari Lebih Lanjut
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-heading font-bold gradient-text">85+</div>
            <div className="text-sm text-warmgray font-medium mt-1">Destinasi Wisata</div>
          </div>
          <div className="w-px h-12 bg-gradient-to-b from-primary-200 to-secondary-200 hidden sm:block"></div>
          <div className="text-center">
            <div className="text-4xl font-heading font-bold gradient-text-ocean">6</div>
            <div className="text-sm text-warmgray font-medium mt-1">Kategori</div>
          </div>
          <div className="w-px h-12 bg-gradient-to-b from-secondary-200 to-tropical-green hidden sm:block"></div>
          <div className="text-center">
            <div className="text-4xl font-heading font-bold gradient-text-sunset">10M+</div>
            <div className="text-sm text-warmgray font-medium mt-1">Wisatawan/Tahun</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-8 h-12 rounded-full border-2 border-primary-300 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
