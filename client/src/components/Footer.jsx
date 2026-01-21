import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white">     
      {/* Bottom Footer */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="font-heading font-black text-2xl text-white mb-2">
                JAKARTOURISM
              </div>
              <p className="font-mono text-xs text-white opacity-60 max-w-sm">
                Your complete guide to exploring Jakarta's best destinations with AI-powered recommendations.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12">
              {/* Author */}
              <div className="text-center md:text-left">
                <div className="font-mono text-xs text-white opacity-50 mb-3 uppercase">Author</div>
                <div className="flex flex-col gap-2">
                  <a className="font-mono text-sm text-white hover:text-brutal-yellow transition-colors" href="https://komaraip.com">
                    KOMARAIP
                  </a>
                </div>
              </div>

              {/* Resources */}
              <div className="text-center md:text-left">
                <div className="font-mono text-xs text-white opacity-50 mb-3 uppercase">Resources</div>
                <div className="flex flex-col gap-2">
                  <a className="font-mono text-sm text-white hover:text-brutal-yellow transition-colors" href="https://github.com/komaraip/jakartourism">
                    GitHub
                  </a>
                  <a className="font-mono text-sm text-white hover:text-brutal-yellow transition-colors" href="https://doi.org/10.1109/ICISS62896.2024.10751604">
                    Publication
                  </a>
                </div>
              </div>

              
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white opacity-20 my-6"></div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono text-xs text-white opacity-50">
              © 2026 JAKARTOURISM. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-mono text-xs text-white opacity-50">ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
