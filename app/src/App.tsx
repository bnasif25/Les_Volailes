import Navigation from '@/sections/Navigation';
import HeroSection from '@/sections/HeroSection';
import BrandPromise from '@/sections/BrandPromise';
import Products from '@/sections/Products';
import QualityBento from '@/sections/QualityBento';
import B2BSection from '@/sections/B2BSection';
import MauritiusRoots from '@/sections/MauritiusRoots';
import AboutSection from '@/sections/AboutSection';
import ContactSection from '@/sections/ContactSection';
import Footer from '@/sections/Footer';

export default function App() {
  return (
    <div className="relative">
      <Navigation />
      <main>
        <HeroSection />
        <BrandPromise />
        <Products />
        <QualityBento />
        <B2BSection />
        <MauritiusRoots />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
