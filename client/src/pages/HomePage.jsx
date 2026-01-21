import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import CategoriesSection from '../components/sections/CategoriesSection';
import ExploreSection from '../components/sections/ExploreSection';
import MapSection from '../components/sections/MapSection';

const HomePage = ({ destinations, onCardClick }) => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Explore Section (Highlights + Featured) */}
      <ExploreSection 
        destinations={destinations} 
        onCardClick={onCardClick}
      />

      {/* Categories Section */}
      <CategoriesSection onDestinationClick={onCardClick} />

      {/* Map Section */}
      <MapSection 
        destinations={destinations} 
        onMarkerClick={onCardClick} 
      />
    </>
  );
};

export default HomePage;
