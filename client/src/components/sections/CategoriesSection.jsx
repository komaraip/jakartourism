const categories = [
  { id: 'budaya', name: 'BUDAYA', count: 25 },
  { id: 'bahari', name: 'BAHARI', count: 12 },
  { id: 'taman-hiburan', name: 'TAMAN HIBURAN', count: 18 },
  { id: 'cagar-alam', name: 'CAGAR ALAM', count: 10 },
  { id: 'pusat-perbelanjaan', name: 'SHOPPING', count: 15 },
  { id: 'tempat-ibadah', name: 'IBADAH', count: 8 },
  { id: 'kuliner', name: 'KULINER', count: 30 },
  { id: 'museum', name: 'MUSEUM', count: 14 },
  { id: 'taman', name: 'TAMAN', count: 12 },
  { id: 'nightlife', name: 'NIGHTLIFE', count: 8 },
  { id: 'olahraga', name: 'SPORTS', count: 6 },
  { id: 'seni', name: 'SENI', count: 10 },
];

const CategoriesSection = () => {
  return (
    <section id="categories" className="py-20 px-4 bg-surface-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="brutal-label mx-auto mb-6">
            FILTER // KATEGORI
          </div>
          <h2 className="text-brutal-headline text-4xl md:text-5xl lg:text-6xl text-black mb-4">
            EXPLORE BY
            <br />
            CATEGORY
          </h2>
          <p className="font-mono text-lg text-black max-w-2xl mx-auto">
            FIND WHAT YOU'RE LOOKING FOR
          </p>
        </div>

        {/* Category Pills Cloud */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {categories.map((category, index) => (
            <button
              key={category.id}
              className="brutal-pill group"
              style={{ 
                opacity: 0,
                animation: `fadeIn 0.3s ease forwards`,
                animationDelay: `${index * 0.05}s`
              }}
            >
              <span>{category.name}</span>
              <span className="ml-2 px-2 py-0.5 text-xs bg-brutal-yellow border border-black group-hover:bg-white transition-colors">
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Hint Text */}
        <div className="text-center mt-12 font-mono text-sm text-black opacity-50">
          CLICK A CATEGORY TO FILTER DESTINATIONS
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
