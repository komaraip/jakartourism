const HeroSection = () => {
  const scrollToSearch = () => {
    const element = document.getElementById('search');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-3 xs:px-4 sm:px-6 pt-20 sm:pt-20 pb-16 sm:pb-16 bg-surface-50 overflow-hidden">
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
      <div className="relative z-10 text-center max-w-5xl mx-auto w-full">
        {/* Label - Even smaller on tiny screens */}
        <div className="brutal-label mb-4 xs:mb-6 sm:mb-8 text-[8px] xs:text-[10px] sm:text-xs px-1.5 xs:px-2 py-0.5 xs:py-1">
          JAKARTA RECOMMENDATION TOURISM SYSTEM
        </div>

        {/* Main Headline - Very small on tiny screens */}
        <h1 className="text-brutal-headline text-[3rem] xs:text-[3.25rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-black mb-3 xs:mb-4 sm:mb-6 leading-[0.85]">
          JAKARTA
          <br />
          <span className="text-brutal-blue text-[2.5rem] xs:text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">UNFILTERED.</span>
        </h1>

        {/* Subtext - Smaller on tiny screens */}
        <p className="font-mono text-[11px] xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-black mb-6 xs:mb-8 sm:mb-12 max-w-2xl mx-auto px-1">
          THE DEFINITIVE GUIDE TO THE CONCRETE JUNGLE.
        </p>

        {/* CTA Buttons - Smaller on tiny screens */}
        <div className="flex flex-col items-center justify-center gap-2 xs:gap-3 sm:gap-4 px-1">
          <button 
            onClick={scrollToSearch}
            className="brutal-btn brutal-btn-orange text-[11px] xs:text-xs sm:text-sm md:text-base lg:text-lg px-4 xs:px-5 sm:px-6 md:px-8 py-2.5 xs:py-3 sm:py-4 w-full sm:w-auto"
          >
            GET RECOMMENDATIONS
            <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="brutal-btn brutal-btn-white text-[11px] xs:text-xs sm:text-sm md:text-base lg:text-lg px-4 xs:px-5 sm:px-6 md:px-8 py-2.5 xs:py-3 sm:py-4 w-full sm:w-auto"
          >
            LEARN MORE
          </button>
        </div>

        {/* Stats - Even smaller on tiny screens */}
        <div className="flex flex-row justify-center gap-1.5 xs:gap-2 sm:gap-4 md:gap-6 lg:gap-12 mt-8 xs:mt-10 sm:mt-16">
          <div className="brutal-card p-2 xs:p-3 sm:p-4 md:p-6 text-center flex-1 max-w-[90px] xs:max-w-[100px] sm:max-w-[140px]">
            <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-black font-heading">80+</div>
            <div className="font-mono text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs text-black mt-0.5 xs:mt-1">PLACES</div>
          </div>
          <div className="brutal-card p-2 xs:p-3 sm:p-4 md:p-6 text-center flex-1 max-w-[90px] xs:max-w-[100px] sm:max-w-[140px]">
            <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-brutal-blue font-heading">6</div>
            <div className="font-mono text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs text-black mt-0.5 xs:mt-1">CATEGORIES</div>
          </div>
          <div className="brutal-card p-2 xs:p-3 sm:p-4 md:p-6 text-center flex-1 max-w-[90px] xs:max-w-[100px] sm:max-w-[140px]">
            <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-brutal-orange font-heading">10M+</div>
            <div className="font-mono text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs text-black mt-0.5 xs:mt-1">VISITS</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
