import { useEffect } from 'react';
import Lenis from 'lenis';
import HeroSection from './components/HeroSection';

const BG_IMAGE_URL = 'https://i.postimg.cc/y89HMNGx/inicio.jpg';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative min-h-screen text-brand-light font-sans bg-bg-dark overflow-hidden">
      {/* Background cinematic element */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-bg-dark/60 to-bg-dark z-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-blue/10 via-bg-dark/30 to-bg-dark/80 z-20 pointer-events-none" />
        
        <div 
          className="w-full h-full bg-cover bg-center opacity-60 z-10"
          style={{ backgroundImage: `url(${BG_IMAGE_URL})` }}
        />
      </div>

      <main className="relative z-30">
        <HeroSection />
      </main>
    </div>
  );
}

export default App;
