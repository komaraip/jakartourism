const reasons = [
  {
    id: 1,
    title: 'RICH CULTURE',
    description: 'Experience authentic Betawi heritage, historic museums, and traditional performances that still thrive in the modern metropolis.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
    hoverColor: 'brutal-card-yellow'
  },
  {
    id: 2,
    title: 'LEGENDARY FOOD',
    description: 'From Soto Betawi to Kerak Telor, taste the legendary street food and culinary treasures that define Jakarta\'s flavor.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    hoverColor: 'brutal-card-yellow'
  },
  {
    id: 3,
    title: 'URBAN JUNGLE',
    description: 'Navigate the concrete jungle with MRT, LRT, and TransJakarta. Modern infrastructure meets raw urban energy.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    hoverColor: 'brutal-card-yellow'
  }
];

const HighlightSection = () => {
  return (
    <section id="why-visit" className="py-20 px-4 bg-surface-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="brutal-label mx-auto mb-6">
            HIGHLIGHTS //
          </div>
          <h2 className="text-brutal-headline text-4xl md:text-5xl lg:text-6xl text-black mb-4">
            WHY JAKARTA?
          </h2>
          <p className="font-mono text-lg text-black max-w-2xl mx-auto">
            THREE REASONS TO EXPLORE THE CAPITAL
          </p>
        </div>

        {/* Bento Grid - 3 Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div 
              key={reason.id}
              className={`brutal-card ${reason.hoverColor} p-8 text-center cursor-pointer group `}
              style={{ 
                opacity: 0,
                animation: `fadeIn 0.5s ease forwards`,
                animationDelay: `${index * 0.15}s`
              }}
            >
              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-6 border-3 border-black bg-white flex items-center justify-center group-hover:bg-[#0057FF] group-hover:text-white transition-colors">
                {reason.icon}
              </div>

              {/* Content */}
              <h3 className="font-heading font-black text-2xl text-black mb-4">
                {reason.title}
              </h3>
              <p className="text-brutal-body text-black leading-relaxed">
                {reason.description}
              </p>

              {/* Number */}
              <div className="mt-6 font-mono text-sm text-black opacity-50">
                0{reason.id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightSection;
