import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ExploreSection from '../components/sections/ExploreSection';

const HomePage = ({ destinations, onCardClick }) => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExploreSection destinations={destinations} onCardClick={onCardClick} />
    </>
  );
};

export default HomePage;
