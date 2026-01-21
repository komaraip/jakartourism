import { formatRupiah } from '../api/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const createBrutalIcon = () => L.divIcon({
  className: 'custom-icon',
  html: `<div style="
    background-color: #FF4800;
    width: 24px;
    height: 24px;
    border: 3px solid black;
    transform: rotate(45deg);
    box-shadow: 4px 4px 0px 0px black;
  "></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -20]
});

const DestinationDetail = ({ destination }) => {
  if (!destination) return null;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <div key={i} className="w-6 h-6 bg-brutal-yellow border-2 border-black flex items-center justify-center">
            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        );
      } else {
        stars.push(
          <div key={i} className="w-6 h-6 bg-white border-2 border-black flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        );
      }
    }
    return stars;
  };

  const hasCoords = destination.Lat && destination.Long && !isNaN(destination.Lat) && !isNaN(destination.Long);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="brutal-label mb-4">
        DESTINATION_DETAILS
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
        <div className="flex-1">
          <h3 className="text-brutal-headline text-3xl md:text-4xl text-black mb-4">
            {destination.Place_Name}
          </h3>
          <span className="badge-brutal">
            {destination.Category}
          </span>
        </div>
        
        {/* Price */}
        <div className="brutal-card p-4 text-center min-w-[160px]">
          <div className="font-mono text-xs text-black mb-1">TICKET_PRICE</div>
          <div className={`text-2xl font-heading font-black ${destination.Price === 0 ? 'text-brutal-blue' : 'text-brutal-orange'}`}>
            {destination.Price === 0 ? 'FREE' : formatRupiah(destination.Price)}
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b-3 border-black">
        <div className="flex gap-0.5">{renderStars(destination.Rating)}</div>
        <span className="font-mono font-bold text-xl text-black">{destination.Rating}</span>
        <span className="font-mono text-black opacity-50">/ 5.0</span>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h4 className="font-heading font-black text-lg text-black mb-3 uppercase">Description</h4>
        <p className="text-brutal-body text-black leading-relaxed">
          {destination.Description || 'No description available.'}
        </p>
      </div>

      {/* Location Info & Map */}
      <div className="pt-4 border-t-3 border-black">
        <h4 className="font-heading font-black text-lg text-black mb-3 uppercase flex items-center gap-2">
            LOCATION
        </h4>
        
        <div className="flex flex-col gap-4">
            {hasCoords && (
                <div className="h-[250px] w-full border-3 border-black mt-2 relative z-0">
                     <MapContainer 
                        center={[destination.Lat, destination.Long]} 
                        zoom={15} 
                        scrollWheelZoom={false} 
                        className="h-full w-full"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        />
                        <Marker 
                            position={[destination.Lat, destination.Long]}
                            icon={createBrutalIcon()}
                        >
                            <Popup className="brutal-popup">
                                <span className="font-bold">{destination.Place_Name}</span>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
