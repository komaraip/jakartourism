const Footer = () => {
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
            <a href="#about" className="text-black hover:underline underline-offset-4 decoration-2">
              ABOUT
            </a>
            <a href="#why-visit" className="text-black hover:underline underline-offset-4 decoration-2">
              WHY_US
            </a>
            <a href="#featured" className="text-black hover:underline underline-offset-4 decoration-2">
              FEATURED
            </a>
            <a href="#categories" className="text-black hover:underline underline-offset-4 decoration-2">
              CATEGORIES
            </a>
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
              © 2026 JAKARTOURISM // MADE BY <span className="font-bold underline">KOMARAIP</span>
            </p>
            <p className="text-black">
              JAKARTA_TOURISM_RECOMMENDATION_SYSTEM_V2.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
