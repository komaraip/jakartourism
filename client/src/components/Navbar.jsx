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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="font-heading font-black text-2xl tracking-tight text-black">
              JAKARTOURISM
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-black font-semibold hover:underline underline-offset-4 decoration-2 transition-all"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('why-visit')}
              className="text-black font-semibold hover:underline underline-offset-4 decoration-2 transition-all"
            >
              Highlights
            </button>
            <button 
              onClick={() => scrollToSection('featured')}
              className="text-black font-semibold hover:underline underline-offset-4 decoration-2 transition-all"
            >
              Featured
            </button>
            <button 
              onClick={() => scrollToSection('categories')}
              className="text-black font-semibold hover:underline underline-offset-4 decoration-2 transition-all"
            >
              Categories
            </button>
            <button 
              onClick={() => scrollToSection('search')}
              className="brutal-btn brutal-btn-blue"
            >
              START
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 border-2 border-black bg-white hover:bg-brutal-yellow transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t-3 border-black">
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left px-4 py-3 text-black font-semibold border-2 border-black bg-white hover:bg-brutal-yellow transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('why-visit')}
                className="text-left px-4 py-3 text-black font-semibold border-2 border-black bg-white hover:bg-brutal-yellow transition-colors"
              >
                Highlights
              </button>
              <button 
                onClick={() => scrollToSection('featured')}
                className="text-left px-4 py-3 text-black font-semibold border-2 border-black bg-white hover:bg-brutal-yellow transition-colors"
              >
                Featured
              </button>
              <button 
                onClick={() => scrollToSection('categories')}
                className="text-left px-4 py-3 text-black font-semibold border-2 border-black bg-white hover:bg-brutal-yellow transition-colors"
              >
                Categories
              </button>
              <button 
                onClick={() => scrollToSection('search')}
                className="brutal-btn brutal-btn-blue w-full justify-center mt-2"
              >
                START
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
