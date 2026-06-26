import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'motion/react';
import { ShieldCheck, Thermometer, Truck, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const qualityPillars = [
  { icon: ShieldCheck, label: 'Propreté' },
  { icon: Thermometer, label: 'Fraîcheur contrôlée' },
  { icon: Truck, label: 'Livraison fiable' },
  { icon: Leaf, label: 'Soins quotidiens' },
];

const processGroups = [
  {
    title: 'Contrôle à la ferme',
    steps: ['Élevage', 'Sélection'],
  },
  {
    title: 'Respect de la chaîne du froid',
    steps: ['Préparation', 'Conditionnement'],
  },
  {
    title: 'Livraison fiable',
    steps: ['Distribution'],
  },
];

export default function QualityBento() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bricksRef = useRef<HTMLDivElement[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      bricksRef.current.forEach((brick, i) => {
        if (!brick) return;
        gsap.fromTo(
          brick,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      id="qualite"
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 bg-ivory"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-display text-ink-deep mb-5">
            La qualité commence à la ferme.
          </h2>
          <p className="text-body-lg">
            Nos standards sont construits autour d’un savoir-faire rigoureux :
            propreté, alimentation saine, pratiques responsables et approvisionnement fiable.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-20 md:mb-28">
          {/* Hero Brick - 2x2 */}
          <div
            ref={(el) => { if (el) bricksRef.current[0] = el; }}
            className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl p-8 md:p-12 flex flex-col justify-between min-h-[360px] md:min-h-[480px] bg-ink-deep"
          >
            <span
              className="absolute top-4 right-4 md:top-8 md:right-12 font-display text-[120px] md:text-[200px] font-bold leading-none pointer-events-none select-none text-brass/[0.08]"
            >
              Q
            </span>
            <div>
              <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-ivory leading-[1.1]">
                La Qualité
              </h3>
            </div>
            <p className="font-body text-sm md:text-base text-ivory/70 max-w-md">
              Chaque volaille est élevée avec soin, suivie quotidiennement et préparée
              dans le respect des normes d’hygiène les plus strictes.
            </p>
          </div>

          {/* Pillar Brick */}
          <div
            ref={(el) => { if (el) bricksRef.current[1] = el; }}
            className="bg-white rounded-2xl p-6 md:p-8 border border-charcoal/5"
          >
            <h4 className="font-ui text-lg font-semibold text-charcoal mb-6">
              Nos standards
            </h4>
            <ul className="space-y-4">
              {qualityPillars.map((pillar) => (
                <li key={pillar.label} className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-brass/10 flex items-center justify-center">
                    <pillar.icon size={18} className="text-brass" />
                  </span>
                  <span className="font-body text-sm text-charcoal">{pillar.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Metric Brick */}
          <div
            ref={(el) => { if (el) bricksRef.current[2] = el; }}
            className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-brass/10"
          >
            <span className="font-display text-5xl md:text-6xl font-bold text-brass/30 block mb-3">
              HACCP
            </span>
            <h4 className="font-ui text-lg font-semibold text-ink-deep mb-2">
              Traçabilité totale
            </h4>
            <p className="font-body text-sm text-charcoal/70">
              Suivi complet de l’élevage à l’assiette.
            </p>
          </div>

          {/* Image Brick */}
          <div
            ref={(el) => { if (el) bricksRef.current[3] = el; }}
            className="md:col-span-2 relative overflow-hidden rounded-2xl min-h-[220px]"
          >
            <img
              src="/images/bento-kitchen.jpg"
              alt="Installation professionnelle"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-deep/70 to-transparent" />
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 max-w-xs">
              <span className="text-ui text-brass mb-2 block">Installations</span>
              <h4 className="font-display text-2xl md:text-3xl font-semibold text-ivory">
                Hygiène rigoureuse
              </h4>
            </div>
          </div>

          {/* Freshness Brick */}
          <div
            ref={(el) => { if (el) bricksRef.current[4] = el; }}
            className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-ink-deep/5"
          >
            <span className="font-display text-5xl md:text-6xl font-bold text-ink-deep/10 block mb-3">
              24h
            </span>
            <h4 className="font-ui text-lg font-semibold text-ink-deep mb-2">
              Fraîcheur quotidienne
            </h4>
            <p className="font-body text-sm text-charcoal/70">
              Production et livraison quotidiennes.
            </p>
          </div>
        </div>

        {/* Process Groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {processGroups.map((group, i) => (
            <div
              key={group.title}
              ref={(el) => { if (el) bricksRef.current[5 + i] = el; }}
              className=""
            >
              <h3 className="font-ui text-sm font-semibold text-ink-deep mb-3">
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.steps.map((step) => (
                  <li
                    key={step}
                    className="font-body text-sm text-charcoal/80 px-3 py-1.5 bg-white border border-charcoal/10 rounded-full"
                  >
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
