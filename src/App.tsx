import { HeroSection } from './components/HeroSection';
import { ScrollSequence } from './components/ScrollSequence';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="bg-black">
      {/* Hero section - the landing view */}
      <HeroSection />

      {/* Scroll-driven frame animation section */}
      <ScrollSequence />

      {/* Footer */}
      <Footer />
    </div>
  );
}
