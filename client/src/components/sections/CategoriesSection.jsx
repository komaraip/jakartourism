const categories = [
  {
    id: 'budaya',
    name: 'Budaya',
    description: 'Museum, situs bersejarah, dan warisan budaya',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
    color: 'primary',
    count: 25
  },
  {
    id: 'bahari',
    name: 'Bahari',
    description: 'Pantai, pulau, dan wisata air',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    color: 'secondary',
    count: 12
  },
  {
    id: 'taman-hiburan',
    name: 'Taman Hiburan',
    description: 'Taman bermain dan rekreasi keluarga',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'green',
    count: 18
  },
  {
    id: 'cagar-alam',
    name: 'Cagar Alam',
    description: 'Taman, hutan kota, dan ruang hijau',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    color: 'emerald',
    count: 10
  },
  {
    id: 'pusat-perbelanjaan',
    name: 'Pusat Perbelanjaan',
    description: 'Mall, pasar tradisional, dan pusat belanja',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    color: 'accent',
    count: 15
  },
  {
    id: 'tempat-ibadah',
    name: 'Tempat Ibadah',
    description: 'Masjid, gereja, dan tempat ibadah bersejarah',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: 'purple',
    count: 8
  }
];

const colorClasses = {
  primary: {
    bg: 'bg-primary-50',
    text: 'text-primary-500',
    hover: 'hover:bg-primary-100',
    border: 'group-hover:border-primary-200'
  },
  secondary: {
    bg: 'bg-secondary-50',
    text: 'text-secondary-500',
    hover: 'hover:bg-secondary-100',
    border: 'group-hover:border-secondary-200'
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-500',
    hover: 'hover:bg-green-100',
    border: 'group-hover:border-green-200'
  },
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-500',
    hover: 'hover:bg-emerald-100',
    border: 'group-hover:border-emerald-200'
  },
  accent: {
    bg: 'bg-amber-50',
    text: 'text-amber-500',
    hover: 'hover:bg-amber-100',
    border: 'group-hover:border-amber-200'
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-500',
    hover: 'hover:bg-purple-100',
    border: 'group-hover:border-purple-200'
  }
};

const CategoriesSection = () => {
  return (
    <section id="categories" className="py-20 px-4 bg-surface-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-1.5 accent-bar rounded-full"></div>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Jelajahi Berdasarkan Kategori
          </h2>
          <p className="text-warmgray text-lg max-w-2xl mx-auto">
            Temukan destinasi wisata Jakarta berdasarkan minat dan preferensi Anda
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const colors = colorClasses[category.color];
            return (
              <div
                key={category.id}
                className={`group modern-card p-6 cursor-pointer transition-all duration-300 hover-lift ${colors.border}`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${colors.bg} ${colors.text} flex items-center justify-center flex-shrink-0 transition-colors ${colors.hover}`}>
                    {category.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-heading font-bold text-lg text-charcoal group-hover:text-primary-500 transition-colors">
                        {category.name}
                      </h3>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                        {category.count}
                      </span>
                    </div>
                    <p className="text-warmgray text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
