import monasImg from '../../assets/monas.jpeg';
import kotaTuaImg from '../../assets/kota-tua.jpg';
import pulauSeribuImg from '../../assets/pulau-seribu.jpg';
import ancolImg from '../../assets/ancol.jpeg';

const AboutSection = () => {
  return (
    <section id="about" className="bg-surface-50">
      {/* Thick Divider */}
      <div className="brutal-divider" />
      
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div>
              {/* Section Label */}
              <div className="brutal-label mb-6">
                ABOUT // TENTANG
              </div>

              <h2 className="text-brutal-headline text-4xl md:text-5xl lg:text-6xl text-black mb-8">
                THE CITY THAT
                <br />
                <span className="text-brutal-blue">NEVER SLEEPS.</span>
              </h2>

              <div className="space-y-6 text-brutal-body text-lg text-black">
                <p>
                  Jakarta, Indonesia's capital, is a chaotic symphony of culture, 
                  commerce, and concrete. From towering skyscrapers to historic 
                  kampungs, every corner tells a story.
                </p>
                <p>
                  This is not your typical tourist guide. We cut through the noise 
                  to bring you authentic recommendations powered by AI. No fluff. 
                  No corporate sponsorships. Just raw, unfiltered Jakarta.
                </p>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <div className="brutal-card p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brutal-yellow border-2 border-black flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-black">85+ DESTINATIONS</span>
                </div>
                <div className="brutal-card p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brutal-blue border-2 border-black flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-black">24/7 ACCESS</span>
                </div>
                <div className="brutal-card p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brutal-orange border-2 border-black flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-black">AI-POWERED</span>
                </div>
                <div className="brutal-card p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-black border-2 border-black flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-black">100% FREE</span>
                </div>
              </div>
            </div>

            {/* Right Visual - Image Collage */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Image Cards with Brutalist Style */}
                <div className="space-y-4">
                  <div className="brutal-card overflow-hidden">
                    <div className="aspect-[4/5] relative">
                      <img 
                        src={monasImg} 
                        alt="Monas - Monumen Nasional Jakarta" 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="sticker-label absolute bottom-2 left-2">
                        MONAS
                      </div>
                    </div>
                  </div>
                  <div className="brutal-card overflow-hidden">
                    <div className="aspect-square relative">
                      <img 
                        src={pulauSeribuImg} 
                        alt="Kepulauan Seribu" 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="sticker-label absolute bottom-2 left-2">
                        SERIBU
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="brutal-card overflow-hidden">
                    <div className="aspect-square relative">
                      <img 
                        src={kotaTuaImg} 
                        alt="Kota Tua Jakarta" 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="sticker-label absolute bottom-2 left-2">
                        KOTA TUA
                      </div>
                    </div>
                  </div>
                  <div className="brutal-card overflow-hidden">
                    <div className="aspect-[4/5] relative">
                      <img 
                        src={ancolImg} 
                        alt="Taman Impian Jaya Ancol" 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="sticker-label absolute bottom-2 left-2">
                        ANCOL
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
