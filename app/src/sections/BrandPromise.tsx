import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandPromise() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;
    if (!section || !leftPanel || !rightPanel) return;

    const ctx = gsap.context(() => {
      // Parallax for left panel (moves up)
      gsap.to(leftPanel.querySelector('.bg-image'), {
        y: '-15%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Parallax for right panel (moves down)
      gsap.to(rightPanel.querySelector('.bg-geometric'), {
        y: '10%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Text reveal
      if (leftTextRef.current) {
        gsap.fromTo(
          leftTextRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (rightTextRef.current) {
        gsap.fromTo(
          rightTextRef.current,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] lg:min-h-screen flex flex-col lg:flex-row overflow-hidden"
    >
      {/* Left Panel - Photography */}
      <div
        ref={leftPanelRef}
        className="relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-full overflow-hidden"
      >
        <div
          className="bg-image absolute top-[-10%] left-0 w-full h-[120%] bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/brand-promise-left.jpg)',
            filter: 'grayscale(100%) contrast(1.2)',
          }}
        />
        <div
          ref={leftTextRef}
          className="absolute top-1/2 left-[10%] transform -translate-y-1/2 z-10"
        >
          <h2
            className="font-display text-[8vw] lg:text-[4vw] font-semibold leading-none"
            style={{
              color: '#F8F3E8',
              textShadow: '0 4px 24px rgba(0,0,0,0.3)',
            }}
          >
            Élevées<br />avec soin.
          </h2>
        </div>
      </div>

      {/* Right Panel - Geometric */}
      <div
        ref={rightPanelRef}
        className="relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-full overflow-hidden"
        style={{ backgroundColor: '#17382B' }}
      >
        <div
          className="bg-geometric absolute top-0 left-0 w-full h-full"
          style={{
            opacity: 0.2,
            background: `
              radial-gradient(circle at 20% 50%, transparent 20%, rgba(248, 243, 232, 0.1) 21%, transparent 22%),
              radial-gradient(circle at 80% 20%, transparent 20%, rgba(248, 243, 232, 0.1) 21%, transparent 22%)
            `,
          }}
        />
        <div
          ref={rightTextRef}
          className="absolute top-1/2 right-[10%] transform -translate-y-1/2 z-10 text-right"
        >
          <h2
            className="font-ui text-[6vw] lg:text-[3vw] font-medium leading-tight"
            style={{ color: '#F8F3E8' }}
          >
            Conçues pour<br />les professionnels.
          </h2>
        </div>
      </div>
    </section>
  );
}
