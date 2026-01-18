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

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 0 && suggestions.length > 0 && setShowSuggestions(true)}
          placeholder="Where to next?"
          className="brutal-input pl-12 font-mono"
          disabled={isLoading}
        />
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <div className="spinner-brutal w-5 h-5"></div>
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-2 bg-white border-3 border-black shadow-brutal overflow-hidden"
        >
          <ul className="max-h-80 overflow-y-auto">
            {suggestions.map((dest, index) => (
              <li
                key={dest.Place_Id}
                onClick={() => handleSelect(dest)}
                className={`px-4 py-3 cursor-pointer transition-colors border-b-2 border-black last:border-b-0 flex items-center justify-between ${
                  index === selectedIndex 
                    ? 'bg-brutal-yellow' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex-1">
                  <div className="font-heading font-bold text-black uppercase">{dest.Place_Name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="badge-brutal text-xs">
                      {dest.Category}
                    </span>
                    <span className="font-mono text-sm text-black flex items-center gap-1">
                      <svg className="w-3 h-3 text-brutal-orange" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {dest.Rating}
                    </span>
                  </div>
                </div>
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
