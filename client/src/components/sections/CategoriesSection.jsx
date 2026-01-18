import { useState, useEffect } from 'react';
import { getCategories, getDestinationsByCategory } from '../../api/api';
import Modal from '../Modal';
import DestinationCard from '../DestinationCard';

const CategoriesSection = ({ onDestinationClick }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryDestinations, setCategoryDestinations] = useState([]);
  const [isLoadingDestinations, setIsLoadingDestinations] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const data = await getCategories();
        setCategories(data.categories);
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Handle category card click
  const handleCategoryClick = async (category) => {
    try {
      setSelectedCategory(category);
      setIsModalOpen(true);
      setIsLoadingDestinations(true);
      
      const data = await getDestinationsByCategory(category.name);
      setCategoryDestinations(data.destinations);
    } catch (error) {
      console.error('Failed to load destinations:', error);
    } finally {
      setIsLoadingDestinations(false);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setCategoryDestinations([]);
  };

  // Category icons mapping
  const getCategoryIcon = (categoryName) => {
    const icons = {
      'budaya': (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
      'bahari': (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        </svg>
      ),
      'taman-hiburan': (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      'cagar-alam': (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      'pusat-perbelanjaan': (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      'tempat-ibadah': (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    };
    return icons[categoryName.toLowerCase().replace(" ", "-")] || (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  };

  return (
    <section id="categories" className="py-20 px-4 bg-surface-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="brutal-label mx-auto mb-6">
            CATEGORIES //
          </div>
          <h2 className="text-brutal-headline text-4xl md:text-5xl lg:text-6xl text-black mb-4">
            EXPLORE BY
            <br />
            CATEGORY
          </h2>
          <p className="font-mono text-lg text-black max-w-2xl mx-auto">
            CLICK A CATEGORY TO VIEW DESTINATIONS
          </p>
        </div>

        {/* Category Cards Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="spinner-brutal"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="brutal-card brutal-card-yellow p-6 cursor-pointer group h-[200px] flex flex-col"
                style={{ 
                  opacity: 0,
                  animation: `fadeIn 0.3s ease forwards`,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Header - Icon and Count Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-white border-3 border-black flex items-center justify-center group-hover:bg-brutal-yellow transition-colors">
                    {getCategoryIcon(category.id)}
                  </div>
                  <span className="badge-brutal">
                    {category.count} PLACES
                  </span>
                </div>

                {/* Category Name */}
                <h3 className="font-heading font-black text-2xl text-black mb-2 uppercase group-hover:text-brutal-blue transition-colors">
                  {category.name}
                </h3>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Footer - Average Rating */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-black">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brutal-yellow border-2 border-black flex items-center justify-center">
                      <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span className="font-mono font-bold text-black">{category.avg_rating}</span>
                    <span className="font-mono text-sm text-black opacity-50">AVG</span>
                  </div>

                  {/* Arrow */}
                  <svg className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Destinations Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedCategory && (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <div className="brutal-label mb-4">
                CATEGORY // KATEGORI
              </div>
              <h2 className="text-brutal-headline text-3xl md:text-4xl text-black mb-2">
                {selectedCategory.name.toUpperCase()}
              </h2>
              <p className="font-mono text-black opacity-70">
                {selectedCategory.count} DESTINATIONS • AVG RATING {selectedCategory.avg_rating}
              </p>
            </div>

            {/* Destinations List */}
            {isLoadingDestinations ? (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="spinner-brutal mx-auto mb-4"></div>
                  <p className="font-mono text-black">LOADING_DESTINATIONS...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
                {categoryDestinations.map((dest, index) => (
                  <div
                    key={dest.Place_Id}
                    style={{ 
                      opacity: 0,
                      animation: `fadeIn 0.3s ease forwards`,
                      animationDelay: `${index * 0.05}s`
                    }}
                  >
                    <DestinationCard 
                      destination={dest} 
                      onClick={onDestinationClick}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
};

export default CategoriesSection;
