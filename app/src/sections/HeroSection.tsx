import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const PARTICLE_COUNT = 18;

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: 60 + Math.random() * 40,
  size: 1 + Math.random() * 3,
  delay: Math.random() * 8,
  duration: 12 + Math.random() * 10,
  opacity: 0.15 + Math.random() * 0.25,
}));

export default function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!imageRef.current) return;
    const x = (mouse.x - 0.5) * -20;
    const y = (mouse.y - 0.5) * -12;
    gsap.to(imageRef.current, {
      x,
      y,
      duration: 1.2,
      ease: 'power2.out',
    });
  }, [mouse]);

  useEffect(() => {
    if (!contentRef.current) return;
    const els = contentRef.current.querySelectorAll('.hero-animate');
    gsap.fromTo(
      els,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.5,
      }
    );
  }, []);

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-ivory">
      {/* Background image with Ken Burns and parallax */}
      <div
        ref={imageRef}
        className="absolute inset-[-5%] w-[110%] h-[110%] animate-hero-ken-burns"
        style={{
          backgroundImage: 'url(/hero_landing.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />

      {/* Golden sunrise light sweep */}
      <div
        className="absolute inset-0 pointer-events-none animate-hero-light-sweep"
        style={{
          background:
            'linear-gradient(115deg, transparent 30%, rgba(255,230,180,0.18) 45%, rgba(255,245,210,0.28) 50%, rgba(255,230,180,0.18) 55%, transparent 70%)',
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Warm sunrise vignette / color grade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 20%, rgba(255,220,160,0.22) 0%, transparent 45%), linear-gradient(to bottom, rgba(248,243,232,0.15) 0%, transparent 35%, rgba(248,243,232,0.35) 100%)',
        }}
      />

      {/* Floating dust / morning mist particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-brass animate-hero-float"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      {/* Bottom gradient for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(23,56,43,0.78) 0%, rgba(23,56,43,0.45) 30%, transparent 60%)',
        }}
      />

      <div
        ref={contentRef}
        className="absolute bottom-0 left-0 right-0 pb-16 md:pb-24 px-6 md:px-12 lg:px-20 text-right"
      >
        <h1 className="hero-animate font-display text-[12vw] md:text-[8vw] lg:text-[7vw] font-semibold text-ivory leading-[0.95] mb-4 opacity-0">
          Les Volailles de
          <br />
          Notre-Dame
        </h1>
        <p className="hero-animate font-display text-xl md:text-2xl lg:text-3xl text-ivory/80 italic mb-8 opacity-0">
          Fraîcheur locale. Qualité de confiance.
        </p>
        <a
          href="#produits"
          onClick={(e) => handleScrollTo(e, '#produits')}
          className="hero-animate inline-flex items-center justify-end gap-3 font-ui text-sm font-semibold text-ivory hover:text-brass transition-colors group opacity-0"
        >
          Découvrir nos produits
          <ArrowRight
            size={18}
            className="transform group-hover:translate-x-1 transition-transform"
          />
        </a>
      </div>
    </section>
  );
}
