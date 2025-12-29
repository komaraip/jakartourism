const HeroSection = ({ children }) => {
  return (
    <section className="relative min-h-[50vh] flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-sm text-gray-300">Sistem Rekomendasi Berbasis AI</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="gradient-text">Wisata Jakarta</span>
          <br />
          <span className="text-white">Rekomendasi Cerdas</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Temukan destinasi wisata terbaik di Jakarta berdasarkan preferensi Anda. 
          Sistem kami menggunakan <span className="text-blue-400 font-medium">Content-Based Filtering</span> untuk 
          merekomendasikan tempat wisata yang serupa dengan pilihan Anda.
        </p>

        {/* Search Component Slot */}
        <div className="w-full max-w-2xl mx-auto">
          {children}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">85+</div>
            <div className="text-sm text-gray-400">Destinasi Wisata</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">6</div>
            <div className="text-sm text-gray-400">Kategori Wisata</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">AI</div>
            <div className="text-sm text-gray-400">Rekomendasi Cerdas</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
