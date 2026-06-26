import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.1,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 55%',
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
      className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 bg-ivory"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="lg:col-span-5 relative overflow-hidden rounded-2xl aspect-[4/5]"
          >
            <img
              src="/images/cylinder-03.jpg"
              alt="Notre ferme avicole"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(23,56,43,0.2) 0%, transparent 60%)',
              }}
            />
          </div>

          {/* Text */}
          <div ref={textRef} className="lg:col-span-7">
            <h2 className="text-display text-ink-deep mb-6 max-w-xl">
              Notre histoire
            </h2>
            <div className="space-y-5 text-body-lg max-w-2xl">
              <p>
                Les Volailles de Notre-Dame est n&eacute;e d&apos;une volont&eacute; simple :
                proposer une volaille locale de confiance, &eacute;lev&eacute;e avec soin et
                pens&eacute;e pour les besoins des familles et des professionnels &agrave; Maurice.
              </p>
              <p>
                Au fil des ann&eacute;es, nous avons b&acirc;ti notre r&eacute;putation sur des
                valeurs solides : fra&icirc;cheur, propret&eacute;, r&eacute;gularit&eacute; et
                respect de nos partenaires. Chaque volaille qui quitte notre ferme porte
                cet engagement.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-charcoal/10 max-w-xl">
              <p className="font-display text-2xl md:text-3xl text-ink-deep italic leading-[1.25] pb-1">
                “La fraîcheur n&apos;est pas une option. C&apos;est notre m&eacute;tier.”
              </p>
              <span className="font-ui text-xs font-semibold tracking-[0.18em] uppercase text-charcoal/50 mt-3 block">
                L&apos;&eacute;quipe Les Volailles de Notre-Dame
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
