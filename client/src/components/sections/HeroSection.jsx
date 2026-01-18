const HeroSection = () => {
  const scrollToSearch = () => {
    const element = document.getElementById('search');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 bg-surface-50">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Label */}
        <div className="brutal-label mb-8">
          JAKARTA TOURISM RECOMMENDATION SYSTEM
        </div>

        {/* Main Headline */}
        <h1 className="text-brutal-headline text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-black mb-6">
          JAKARTA
          <br />
          <span className="text-brutal-blue">UNFILTERED.</span>
        </h1>

        {/* Subtext */}
        <p className="font-mono text-lg md:text-xl text-black mb-12 max-w-2xl mx-auto">
          THE DEFINITIVE GUIDE TO THE CONCRETE JUNGLE.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={scrollToSearch}
            className="brutal-btn brutal-btn-orange text-lg px-8 py-4"
          >
            GET RECOMMENDATIONS
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="brutal-btn brutal-btn-white text-lg px-8 py-4"
          >
            LEARN MORE
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-16">
          <div className="brutal-card p-6 text-center min-w-[140px]">
            <div className="text-4xl font-black text-black font-heading">85+</div>
            <div className="font-mono text-xs text-black mt-1">DESTINATIONS</div>
          </div>
          <div className="brutal-card p-6 text-center min-w-[140px]">
            <div className="text-4xl font-black text-brutal-blue font-heading">6</div>
            <div className="font-mono text-xs text-black mt-1">CATEGORIES</div>
          </div>
          <div className="brutal-card p-6 text-center min-w-[140px]">
            <div className="text-4xl font-black text-brutal-orange font-heading">10M+</div>
            <div className="font-mono text-xs text-black mt-1">TOURISTS/YEAR</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-black">SCROLL</span>
          <div className="w-6 h-10 border-3 border-black flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-black animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
