import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

export default function BrandPromise() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;
    if (!section || !leftPanel || !rightPanel) return;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        gsap.to(leftPanel.querySelector('.bg-image'), {
          y: '-12%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });

        gsap.to(rightPanel.querySelector('.bg-geometric'), {
          y: '8%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      if (leftTextRef.current) {
        gsap.fromTo(
          leftTextRef.current,
          { opacity: 0, x: -32 },
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
          { opacity: 0, x: 32 },
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
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] lg:min-h-[90vh] flex flex-col lg:flex-row overflow-hidden bg-ivory"
    >
      {/* Left Panel - Photography */}
      <div
        ref={leftPanelRef}
        className="relative w-full lg:w-1/2 min-h-[55vh] lg:min-h-full overflow-hidden"
      >
        <div
          className="bg-image absolute top-[-10%] left-0 w-full h-[120%] bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/brand-promise-left.jpg)',
            filter: 'grayscale(100%) contrast(1.15)',
          }}
        />
        <div
          ref={leftTextRef}
          className="absolute top-1/2 left-[8%] md:left-[12%] transform -translate-y-1/2 z-10"
        >
          <h2 className="font-display text-[10vw] lg:text-[4vw] font-semibold leading-[1] text-ivory" style={{ textShadow: '0 4px 24px rgba(0,0,0,0.35)' }}>
            Élevées<br />avec soin.
          </h2>
        </div>
      </div>

      {/* Right Panel - Brand green */}
      <div
        ref={rightPanelRef}
        className="relative w-full lg:w-1/2 min-h-[45vh] lg:min-h-full overflow-hidden bg-ink-deep"
      >
        <div
          className="bg-geometric absolute top-0 left-0 w-full h-full opacity-20"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, transparent 20%, rgba(248, 243, 232, 0.08) 21%, transparent 22%),
              radial-gradient(circle at 80% 20%, transparent 20%, rgba(248, 243, 232, 0.08) 21%, transparent 22%)
            `,
          }}
        />
        <div
          ref={rightTextRef}
          className="absolute top-1/2 right-[8%] md:right-[12%] transform -translate-y-1/2 z-10 text-right max-w-md"
        >
          <h2 className="font-display text-[8vw] lg:text-[3vw] font-semibold leading-[1.1] text-ivory">
            Conçues pour<br />les professionnels.
          </h2>
        </div>
      </div>
    </section>
  );
}
