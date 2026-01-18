import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-tropical">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl accent-bar flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="font-heading font-bold text-xl gradient-text">Wisata Jakarta</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-warmgray hover:text-primary-500 font-medium transition-colors"
            >
              Beranda
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-warmgray hover:text-primary-500 font-medium transition-colors"
            >
              Tentang
            </button>
            <button 
              onClick={() => scrollToSection('categories')}
              className="text-warmgray hover:text-primary-500 font-medium transition-colors"
            >
              Kategori
            </button>
            <button 
              onClick={() => scrollToSection('featured')}
              className="text-warmgray hover:text-primary-500 font-medium transition-colors"
            >
              Destinasi
            </button>
            <button 
              onClick={() => scrollToSection('search')}
              className="px-5 py-2.5 btn-tropical text-white font-semibold rounded-xl"
            >
              Cari Wisata
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-charcoal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-100">
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-left px-4 py-2 text-warmgray hover:text-primary-500 hover:bg-primary-50 rounded-lg font-medium transition-colors"
              >
                Beranda
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left px-4 py-2 text-warmgray hover:text-primary-500 hover:bg-primary-50 rounded-lg font-medium transition-colors"
              >
                Tentang
              </button>
              <button 
                onClick={() => scrollToSection('categories')}
                className="text-left px-4 py-2 text-warmgray hover:text-primary-500 hover:bg-primary-50 rounded-lg font-medium transition-colors"
              >
                Kategori
              </button>
              <button 
                onClick={() => scrollToSection('featured')}
                className="text-left px-4 py-2 text-warmgray hover:text-primary-500 hover:bg-primary-50 rounded-lg font-medium transition-colors"
              >
                Destinasi
              </button>
              <button 
                onClick={() => scrollToSection('search')}
                className="mx-4 py-2.5 btn-tropical text-white font-semibold rounded-xl"
              >
                Cari Wisata
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
