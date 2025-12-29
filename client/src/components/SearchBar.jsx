import { useState, useEffect, useRef, useMemo } from 'react';

const SearchBar = ({ destinations, onSelect, isLoading }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Compute filtered suggestions using useMemo (no setState)
  const suggestions = useMemo(() => {
    if (query.trim().length > 0 && destinations.length > 0) {
      return destinations
        .filter(dest => 
          dest.Place_Name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8);
    }
    return [];
  }, [query, destinations]);

  // Update showSuggestions and selectedIndex when query changes
  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
    setShowSuggestions(newQuery.trim().length > 0);
    setSelectedIndex(-1);
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  const handleSelect = (destination) => {
    setQuery(destination.Place_Name);
    setShowSuggestions(false);
    onSelect(destination.Place_Name);
  };

  const getCategoryBadgeClass = (category) => {
    const categoryMap = {
      'Budaya': 'badge-budaya',
      'Taman Hiburan': 'badge-taman-hiburan',
      'Bahari': 'badge-bahari',
      'Cagar Alam': 'badge-cagar-alam',
      'Pusat Perbelanjaan': 'badge-pusat-perbelanjaan',
      'Tempat Ibadah': 'badge-tempat-ibadah',
    };
    return categoryMap[category] || 'badge-default';
  };

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg 
            className="w-5 h-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 0 && suggestions.length > 0 && setShowSuggestions(true)}
          placeholder="Cari destinasi wisata... (contoh: Taman Impian Jaya Ancol)"
          className="w-full pl-12 pr-4 py-4 text-lg bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
          disabled={isLoading}
        />
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <div className="spinner w-5 h-5"></div>
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-2 bg-slate-800/95 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl overflow-hidden"
        >
          <ul className="py-2 max-h-80 overflow-y-auto">
            {suggestions.map((dest, index) => (
              <li
                key={dest.Place_Id}
                onClick={() => handleSelect(dest)}
                className={`px-4 py-3 cursor-pointer transition-colors duration-150 flex items-center justify-between ${
                  index === selectedIndex 
                    ? 'bg-blue-600/30' 
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="flex-1">
                  <div className="text-white font-medium">{dest.Place_Name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full text-white ${getCategoryBadgeClass(dest.Category)}`}>
                      {dest.Category}
                    </span>
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {dest.Rating}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Helper Text */}
      <p className="mt-3 text-sm text-gray-500 text-center">
        Pilih destinasi wisata untuk melihat rekomendasi serupa
      </p>
    </div>
  );
};

export default SearchBar;
