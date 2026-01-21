import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    // If not on homepage, navigate to homepage first with hash
    if (location.pathname !== '/') {
      navigate('/#' + sectionId);
      return;
    }
    
    // On homepage, scroll to section smoothly
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t-4 border-black">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="font-heading font-black text-2xl tracking-tight text-black">
            JAKARTOURISM
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 font-mono text-sm">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-black hover:underline underline-offset-4 decoration-2"
            >
              HOME
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-black hover:underline underline-offset-4 decoration-2"
            >
              ABOUT
            </button>
            <button 
              onClick={() => scrollToSection('highlights')}
              className="text-black hover:underline underline-offset-4 decoration-2"
            >
              HIGHLIGHTS
            </button>
            <button 
              onClick={() => scrollToSection('featured')}
              className="text-black hover:underline underline-offset-4 decoration-2"
            >
              FEATURED
            </button>
            <button 
              onClick={() => scrollToSection('categories')}
              className="text-black hover:underline underline-offset-4 decoration-2"
            >
              CATEGORIES
            </button>
          </div>

          {/* Status */}
          <div className="brutal-label">
            ONLINE
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-3 border-black">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <p className="text-black">
              © 2026 JAKARTOURISM // MADE BY <a className="font-bold underline" href="https://komaraip.com">KOMARAIP</a>
            </p>
            <p className="flex flex-wrap gap-2 text-black">
              <a className="font-bold underline" href="https://github.com/komaraip/jakartourism">GITHUB</a>
              <a className="font-bold underline" href="https://doi.org/10.1109/ICISS62896.2024.10751604">PUBLICATION</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
