import monasImg from '../../assets/monas.jpeg';
import kotaTuaImg from '../../assets/kota-tua.jpg';
import pulauSeribuImg from '../../assets/pulau-seribu.jpg';
import ancolImg from '../../assets/ancol.jpeg';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 bg-white dark:bg-dark-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-10 accent-bar rounded-full"></div>
              <span className="text-sm font-semibold text-primary-500 uppercase tracking-wider">Tentang Jakarta</span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal dark:text-white mb-6 leading-tight transition-colors">
              Kota Metropolitan dengan 
              <span className="gradient-text"> Sejuta Pesona</span>
            </h2>

            <p className="text-warmgray dark:text-warmgray-light text-lg leading-relaxed mb-6">
              Jakarta, ibu kota Indonesia, adalah pusat pemerintahan, ekonomi, dan budaya yang menawarkan 
              perpaduan unik antara warisan sejarah dan modernitas. Dari gedung pencakar langit yang megah 
              hingga kampung-kampung bersejarah, Jakarta memiliki cerita di setiap sudutnya.
            </p>

            <p className="text-warmgray dark:text-warmgray-light text-lg leading-relaxed mb-8">
              Nikmati kuliner legendaris, jelajahi museum bersejarah, bersantai di taman kota, 
              atau berbelanja di pusat perbelanjaan modern. Jakarta siap menyambut Anda dengan 
              keramahan dan keragamannya.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <span className="font-medium text-charcoal dark:text-white">85+ Destinasi Wisata</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-50 dark:bg-secondary-900/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-medium text-charcoal dark:text-white">Buka Sepanjang Tahun</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
                <span className="font-medium text-charcoal dark:text-white">Budaya Betawi Asli</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-medium text-charcoal dark:text-white">Akses Mudah</span>
              </div>
            </div>
          </div>

          {/* Right Visual - Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Image Cards */}
              <div className="space-y-4">
                <div className="modern-card overflow-hidden aspect-[4/5] group">
                  <img 
                    src={monasImg} 
                    alt="Monas - Monumen Nasional Jakarta" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="modern-card overflow-hidden aspect-square group">
                  <img 
                    src={pulauSeribuImg} 
                    alt="Kepulauan Seribu" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="modern-card overflow-hidden aspect-square group">
                  <img 
                    src={kotaTuaImg} 
                    alt="Kota Tua Jakarta" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="modern-card overflow-hidden aspect-[4/5] group">
                  <img 
                    src={ancolImg} 
                    alt="Taman Impian Jaya Ancol" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
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
