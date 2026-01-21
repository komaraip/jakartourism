import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getCategories, getDestinationsByCategory } from '../../api/api';
import Modal from '../Modal';
import DestinationCard from '../DestinationCard';

// Fix for default Leaflet marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom brutalist marker
const createBrutalIcon = (isHovered) => L.divIcon({
  className: 'custom-icon',
  html: `<div style="
    background-color: ${isHovered ? '#FFEB00' : '#FF4800'};
    width: 24px;
    height: 24px;
    border: 3px solid black;
    transform: rotate(45deg);
    box-shadow: 4px 4px 0px 0px black;
    transition: all 0.2s ease;
  "></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -20]
});

// Recenter button component
const RecenterBtn = ({ center }) => {
  const map = useMap();
  
  const handleRecenter = () => {
    map.setView(center, 11);
  };

  return (
    <div className="leaflet-top leaflet-right md:leaflet-bottom md:leaflet-left !top-4 !right-4 md:!top-auto md:!right-auto md:!bottom-6 md:!left-6 z-[1000] pointer-events-auto">
      <button 
        onClick={handleRecenter}
        className="brutal-btn brutal-btn-white text-xs md:text-sm py-1 px-2 md:py-2 md:px-4 shadow-brutal pointer-events-auto"
      >
        RECENTER MAP
      </button>
    </div>
  );
};

// Highlight reasons data
const reasons = [
  {
    id: 1,
    title: 'RICH CULTURE',
    description: 'Experience authentic Betawi heritage, historic museums, and traditional performances that still thrive in the modern metropolis.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
    hoverColor: 'brutal-card-yellow'
  },
  {
    id: 2,
    title: 'LEGENDARY FOOD',
    description: 'From Soto Betawi to Kerak Telor, taste the legendary street food and culinary treasures that define Jakarta\'s flavor.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    hoverColor: 'brutal-card-yellow'
  },
  {
    id: 3,
    title: 'URBAN JUNGLE',
    description: 'Navigate the concrete jungle with MRT, LRT, and TransJakarta. Modern infrastructure meets raw urban energy.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    hoverColor: 'brutal-card-yellow'
  }
];

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

const ExploreSection = ({ destinations, onCardClick }) => {
  // Categories state
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  
  // Category modal state
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryDestinations, setCategoryDestinations] = useState([]);
  const [isLoadingCategoryDestinations, setIsLoadingCategoryDestinations] = useState(false);

  // Map state
  const jakartaCenter = [-6.2088, 106.8456];
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const data = await getCategories();
        setCategories(data.categories);
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  // Get featured destinations (top 4 by rating)
  const featuredDestinations = [...destinations]
    .sort((a, b) => b.Rating - a.Rating)
    .slice(0, 4);

  // Filter destinations with valid coordinates for map
  const mapDestinations = destinations.filter(
    dest => dest.Lat && dest.Long && !isNaN(dest.Lat) && !isNaN(dest.Long)
  );

  // Handle category card click
  const handleCategoryClick = async (category) => {
    try {
      setSelectedCategory(category);
      setIsCategoryModalOpen(true);
      setIsLoadingCategoryDestinations(true);
      
      const data = await getDestinationsByCategory(category.name);
      setCategoryDestinations(data.destinations);
    } catch (error) {
      console.error('Failed to load destinations:', error);
    } finally {
      setIsLoadingCategoryDestinations(false);
    }
  };

  // Close category modal
  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setSelectedCategory(null);
    setCategoryDestinations([]);
  };

  return (
    <section id="explore" className="bg-surface-50">
      {/* ===== UNIFIED EXPLORE SECTION ===== */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Main Section Header */}
          <div className="text-center mb-16">
            <div className="brutal-label mx-auto mb-6">
              EXPLORE //
            </div>
            <h2 className="text-brutal-headline text-5xl md:text-6xl lg:text-7xl text-black mb-4">
              DISCOVER JAKARTA.
            </h2>
            <p className="font-mono text-lg text-black max-w-2xl mx-auto">
              YOUR COMPLETE GUIDE TO THE CAPITAL'S BEST DESTINATIONS
            </p>
          </div>

          {/* ===== HIGHLIGHTS SUB-SECTION ===== */}
          <div className="mb-16">
            {/* Sub-header with Icon */}
            <div className="mb-8 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
                <h3 className="font-heading font-black text-xl md:text-2xl text-black uppercase tracking-wide">
                  WHY JAKARTA?
                </h3>
              </div>
              <p className="font-mono text-sm text-black opacity-60 mb-3">
                Three reasons to explore the capital city
              </p>
              <div className="w-16 h-1 bg-brutal-yellow mx-auto md:mx-0"></div>
            </div>

            {/* Minimalist 3-Column Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              {reasons.map((reason, index) => (
                <div 
                  key={reason.id}
                  className="border-3 border-black bg-white p-6 group hover:bg-brutal-yellow transition-colors"
                  style={{ 
                    opacity: 0,
                    animation: `fadeIn 0.5s ease forwards`,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Icon + Title Row */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 border-2 border-black bg-surface-50 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                      {reason.icon}
                    </div>
                    <h4 className="font-heading font-black text-lg text-black">
                      {reason.title}
                    </h4>
                  </div>

                  {/* Description */}
                  <p className="font-mono text-sm text-black leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ===== FEATURED SUB-SECTION ===== */}
          <div className="mb-16">
            {/* Sub-header with Icon */}
            <div className="mb-8 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                </svg>
                <h3 className="font-heading font-black text-xl md:text-2xl text-black uppercase tracking-wide">
                  TRENDING NOW
                </h3>
              </div>
              <p className="font-mono text-sm text-black opacity-60 mb-3">
                Top-rated destinations you need to visit
              </p>
              <div className="w-16 h-1 bg-brutal-orange mx-auto md:mx-0"></div>
            </div>

            {/* 4-Card Grid */}
            {featuredDestinations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuredDestinations.map((dest, index) => (
                  <div 
                    key={dest.Place_Id}
                    style={{ 
                      opacity: 0,
                      animation: `fadeIn 0.5s ease forwards`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <DestinationCard 
                      destination={dest} 
                      onClick={onCardClick}
                      compact={true}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="spinner-brutal mx-auto mb-4"></div>
                <p className="font-mono text-black">LOADING_DESTINATIONS...</p>
              </div>
            )}
          </div>

          {/* ===== CATEGORIES SUB-SECTION ===== */}
          <div>
            {/* Sub-header with Icon */}
            <div className="mb-8 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
                <h3 className="font-heading font-black text-xl md:text-2xl text-black uppercase tracking-wide">
                  BY CATEGORY
                </h3>
              </div>
              <p className="font-mono text-sm text-black opacity-60 mb-3">
                Click a category to view destinations
              </p>
              <div className="w-16 h-1 bg-brutal-blue mx-auto md:mx-0"></div>
            </div>

            {/* Minimalist Category Grid */}
            {isLoadingCategories ? (
              <div className="flex items-center justify-center py-8">
                <div className="spinner-brutal"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {categories.map((category, index) => (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryClick(category)}
                    className="flex items-center gap-3 border-3 border-black bg-white p-3 cursor-pointer group hover:bg-brutal-yellow transition-colors"
                    style={{ 
                      opacity: 0,
                      animation: `fadeIn 0.3s ease forwards`,
                      animationDelay: `${index * 0.05}s`
                    }}
                  >
                    {/* Icon */}
                    <div className="w-10 h-10 border-2 border-black bg-surface-50 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                      {getCategoryIcon(category.id)}
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col min-w-0">
                      <h4 className="font-heading font-black text-xs text-black uppercase leading-tight truncate">
                        {category.name}
                      </h4>
                      <span className="font-mono text-[10px] text-black opacity-60">
                        {category.count} destinations
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== MAP SUB-SECTION ===== */}
      {mapDestinations.length > 0 && (
        <div className="pb-16 px-4 bg-surface-50">
          <div className="max-w-7xl mx-auto">
            {/* Sub-header with Icon */}
            <div className="mb-8 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                </svg>
                <h3 className="font-heading font-black text-xl md:text-2xl text-black uppercase tracking-wide">
                  INTERACTIVE MAP
                </h3>
              </div>
              <p className="font-mono text-sm text-black opacity-60 mb-3">
                Explore all {mapDestinations.length} destinations across the city
              </p>
              <div className="w-16 h-1 bg-brutal-orange mx-auto md:mx-0"></div>
            </div>

            {/* Map Card */}
            <div className="border-4 border-black bg-white shadow-brutal overflow-hidden">
              {/* Map Container */}
              <div className="relative h-[400px] md:h-[500px]">
                <MapContainer 
                  center={jakartaCenter} 
                  zoom={11} 
                  scrollWheelZoom={true} 
                  className="h-full w-full"
                  style={{ backgroundColor: '#f0f0f0' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  />
                  
                  {mapDestinations.map((dest) => (
                    <Marker 
                      key={dest.Place_Id}
                      position={[dest.Lat, dest.Long]}
                      icon={createBrutalIcon(hoveredMarkerId === dest.Place_Id)}
                      eventHandlers={{
                        click: () => onCardClick(dest.Place_Name),
                        mouseover: () => setHoveredMarkerId(dest.Place_Id),
                        mouseout: () => setHoveredMarkerId(null)
                      }}
                    >
                      <Popup className="brutal-popup">
                        <div className="font-heading font-bold uppercase text-sm border-b-2 border-black pb-1 mb-1">
                          {dest.Place_Name}
                        </div>
                        <div className="font-mono text-xs mb-2">
                          {dest.Category}
                        </div>
                        <div className="font-mono text-xs font-bold text-brutal-orange">
                          CLICK FOR DETAILS
                        </div>
                      </Popup>
                    </Marker>
                  ))}

                  <RecenterBtn center={jakartaCenter} />
                </MapContainer>

                {/* Legend Overlay */}
                <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 z-[1000] pointer-events-none">
                  <div className="bg-white border-2 border-black p-2 md:p-3 shadow-brutal-sm">
                    <div className="font-mono text-[10px] md:text-xs font-bold mb-1 md:mb-2">LEGEND</div>
                    <div className="flex items-center gap-1 md:gap-2 mb-1">
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-brutal-orange border border-black rotate-45"></div>
                      <span className="font-mono text-[8px] md:text-[10px]">DESTINATION</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3">
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-brutal-yellow border border-black rotate-45"></div>
                      <span className="font-mono text-[8px] md:text-[10px]">HOVERED</span>
                    </div>
                    <div className="border-t border-black pt-1 md:pt-2 hidden md:block">
                      <span className="font-mono text-[9px] opacity-60">SCROLL TO ZOOM • CLICK MARKER</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-surface-50 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* CTA Card */}
          <div className="border-4 border-black bg-brutal-blue p-8 md:p-12 text-center shadow-brutal">
            {/* Heading */}
            <h3 className="font-heading font-black text-xl md:text-2xl text-white mb-3">
              READY TO EXPLORE?
            </h3>

            {/* Description */}
            <p className="font-mono text-sm text-white opacity-80 mb-8 max-w-md mx-auto">
              Get personalized destination recommendations powered by AI
            </p>

            {/* CTA Button */}
            <Link 
              to="/search"
              className="inline-flex items-center gap-3 bg-white text-black border-3 border-black font-heading font-bold text-lg px-8 py-4 hover:bg-brutal-yellow transition-colors shadow-brutal-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
              </svg>
              START AI SEARCH
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Category Destinations Modal */}
      <Modal isOpen={isCategoryModalOpen} onClose={handleCloseCategoryModal}>
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
            {isLoadingCategoryDestinations ? (
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
                      onClick={onCardClick}
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

export default ExploreSection;
