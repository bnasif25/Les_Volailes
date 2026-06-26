import { useEffect, useRef, useState, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const imageUrls = Array.from({ length: 15 }, (_, i) =>
  `/images/cylinder-${String(i + 1).padStart(2, '0')}.jpg`
);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 768px)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isMobile;
};

const DesktopCylinder = lazy(() => import('./DesktopCylinder'));

function MobileGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const images = section.querySelectorAll('.gallery-image');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        images,
        { opacity: 0, y: 24, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="px-6 py-16 md:py-24 bg-ivory">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-charcoal mb-4 leading-tight">
            Ancrés à Maurice.
          </h2>
          <p className="font-body text-base md:text-lg text-clay max-w-lg mx-auto">
            Une production locale au cœur de l&apos;agriculture mauricienne.
          </p>
        </div>
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {imageUrls.map((url, i) => (
            <div
              key={url}
              className="gallery-image break-inside-avoid rounded-xl overflow-hidden opacity-0"
            >
              <img
                src={url}
                alt={`Notre ferme et nos volailles à Maurice ${i + 1}`}
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MauritiusRoots() {
  const isMobile = useIsMobile();

  if (prefersReducedMotion() || isMobile) {
    return <MobileGallery />;
  }

  return (
    <Suspense
      fallback={
        <div className="h-screen bg-ivory flex items-center justify-center">
          <span className="font-ui text-sm text-clay">Chargement de la galerie…</span>
        </div>
      }
    >
      <DesktopCylinder />
    </Suspense>
  );
}
