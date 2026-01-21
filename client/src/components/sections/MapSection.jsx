import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
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

const RecenterBtn = ({ center }) => {
  const map = useMap();
  
  const handleRecenter = () => {
    map.setView(center, 11);
  };

  return (
    <div className="leaflet-bottom leaflet-left !bottom-6 !left-6 z-[1000] pointer-events-auto">
      <button 
        onClick={handleRecenter}
        className="brutal-btn brutal-btn-white text-sm py-2 px-4 shadow-brutal pointer-events-auto"
      >
        RECENTER MAP
      </button>
    </div>
  );
};

const MapSection = ({ destinations, onMarkerClick }) => {
  // Default coordinates for Jakarta
  const jakartaCenter = [-6.2088, 106.8456];
  
  // Filter destinations that have valid lat/long
  const mapDestinations = destinations.filter(
    dest => dest.Lat && dest.Long && !isNaN(dest.Lat) && !isNaN(dest.Long)
  );

  const [hoveredId, setHoveredId] = useState(null);

  if (mapDestinations.length === 0) {
    return null;
  }

  return (
    <section id="map" className="border-t-4 border-black">
      <div className="flex flex-col lg:flex-row h-[600px] lg:h-[700px]">
        {/* Sidebar Info - Desktop Only */}
        <div className="hidden lg:flex flex-col w-1/3 bg-surface-50 border-r-4 border-black p-8 overflow-y-auto">
          <div className="brutal-label mb-6">
            EXPLORE // PETA
          </div>
          <h2 className="text-brutal-headline text-5xl text-black mb-6">
            CONCRETE
            <br />
            JUNGLE
            <br />
            MAP.
          </h2>
          <p className="font-mono text-black mb-8">
            INTERACTIVE GUIDE TO {mapDestinations.length} LOCATIONS ACROSS THE CITY.
          </p>
          
          <div className="mt-auto">
             <div className="brutal-card p-4 bg-brutal-orange mb-4">
                <div className="font-bold font-mono">LEGEND:</div>
                <div className="flex items-center gap-2 mt-2">
                    <div className="w-4 h-4 bg-brutal-orange border-2 border-black rotate-45"></div>
                    <span className="font-mono text-sm">DESTINATION</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <div className="w-4 h-4 bg-brutal-yellow border-2 border-black rotate-45"></div>
                    <span className="font-mono text-sm">HOVERED</span>
                </div>
             </div>

             {/* Search CTA */}
             <div className="brutal-card p-4 bg-white mb-4">
                <div className="font-bold font-mono mb-2 text-brutal-black">AI RECOMMENDATIONS</div>
                <p className="font-mono text-sm mb-4 text-black">
                  GET PERSONALIZED DESTINATION SUGGESTIONS POWERED BY AI.
                </p>
                <Link 
                  to="/search"
                  className="brutal-btn brutal-btn-blue w-full justify-center"
                >
                  START EXPLORE
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
             </div>

             <p className="font-mono text-xs opacity-50">
                SCROLL TO ZOOM • DRAG TO PAN • CLICK TO VIEW
             </p>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative z-0">
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
                icon={createBrutalIcon(hoveredId === dest.Place_Id)}
                eventHandlers={{
                  click: () => onMarkerClick(dest.Place_Name),
                  mouseover: () => setHoveredId(dest.Place_Id),
                  mouseout: () => setHoveredId(null)
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
          
          {/* Mobile Overlay Header */}
          <div className="lg:hidden absolute top-4 left-4 right-4 z-[1000] pointer-events-none">
            <div className="brutal-card bg-white p-4 shadow-brutal">
                <h2 className="font-heading font-black text-xl">CONCRETE JUNGLE MAP</h2>
                <p className="font-mono text-xs">{mapDestinations.length} LOCATIONS FOUND</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;