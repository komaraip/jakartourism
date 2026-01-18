const reasons = [
  {
    id: 1,
    title: 'Kekayaan Budaya',
    description: 'Nikmati warisan budaya Betawi yang autentik, museum bersejarah, dan seni pertunjukan tradisional yang masih lestari.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
      </svg>
    ),
    color: 'primary'
  },
  {
    id: 2,
    title: 'Kuliner Legendaris',
    description: 'Cicipi beragam kuliner khas Jakarta dari Soto Betawi, Kerak Telor, hingga street food modern yang menggugah selera.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: 'secondary'
  },
  {
    id: 3,
    title: 'Kota Modern',
    description: 'Jelajahi gedung pencakar langit megah, pusat perbelanjaan kelas dunia, dan hiburan malam yang tak pernah tidur.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: 'accent'
  },
  {
    id: 4,
    title: 'Akses Mudah',
    description: 'Terhubung dengan transportasi publik modern seperti MRT, LRT, dan TransJakarta yang memudahkan perjalanan Anda.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'green'
  }
];

const colorClasses = {
  primary: {
    bg: 'bg-primary-500',
    light: 'bg-primary-50 dark:bg-primary-900/30',
    text: 'text-primary-500'
  },
  secondary: {
    bg: 'bg-secondary-500',
    light: 'bg-secondary-50 dark:bg-secondary-900/30',
    text: 'text-secondary-500'
  },
  accent: {
    bg: 'bg-accent-400',
    light: 'bg-amber-50 dark:bg-amber-900/30',
    text: 'text-amber-500'
  },
  green: {
    bg: 'bg-green-500',
    light: 'bg-green-50 dark:bg-green-900/30',
    text: 'text-green-500'
  }
};

const WhyVisitSection = () => {
  return (
    <section className="py-20 px-4 bg-surface-50 dark:bg-dark-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-1.5 accent-bar rounded-full"></div>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal dark:text-white mb-4 transition-colors">
            Mengapa Harus ke Jakarta?
          </h2>
          <p className="text-warmgray dark:text-warmgray-light text-lg max-w-2xl mx-auto">
            Jakarta menawarkan pengalaman yang tak terlupakan untuk setiap pengunjung
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => {
            const colors = colorClasses[reason.color];
            return (
              <div 
                key={reason.id}
                className="modern-card p-6 text-center hover-lift"
                style={{ 
                  animation: `fadeIn 0.5s ease forwards`,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl ${colors.light} ${colors.text} flex items-center justify-center`}>
                  {reason.icon}
                </div>

                {/* Content */}
                <h3 className="font-heading font-bold text-xl text-charcoal dark:text-white mb-3 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-warmgray dark:text-warmgray-light text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyVisitSection;
