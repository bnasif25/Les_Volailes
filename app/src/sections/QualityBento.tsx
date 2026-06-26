import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Thermometer, Truck, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const processSteps = [
  { num: '01', title: 'Élevage', desc: 'Soins quotidiens et environnement contrôlé' },
  { num: '02', title: 'Sélection', desc: 'Contrôle rigoureux de chaque volaille' },
  { num: '03', title: 'Préparation', desc: 'Hygiène et traçabilité assurées' },
  { num: '04', title: 'Conditionnement', desc: 'Fraîcheur préservée sous vide' },
  { num: '05', title: 'Livraison', desc: 'Chaîne du froid respectée' },
];

const qualityPillars = [
  { icon: ShieldCheck, label: 'Propreté', color: '#A7B89A' },
  { icon: Thermometer, label: 'Fraîcheur contrôlée', color: '#4E9AA4' },
  { icon: Truck, label: 'Livraison fiable', color: '#B88A36' },
  { icon: Leaf, label: 'Soins quotidiens', color: '#8D7461' },
];

export default function QualityBento() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bricksRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      bricksRef.current.forEach((brick, i) => {
        if (!brick) return;
        if (prefersReducedMotion()) {
          gsap.set(brick, { opacity: 1, y: 0 });
          return;
        }
        gsap.fromTo(
          brick,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.1,
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
  }, []);

  return (
    <section
      id="qualite"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-ivory"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-ink-deep mb-4">
          La qualité commence à la ferme.
        </h2>
        <p className="font-body text-base md:text-lg text-clay max-w-2xl mb-12 md:mb-16">
          Nos standards sont construits autour d’un savoir-faire rigoureux :
          propreté, alimentation saine, pratiques responsables et approvisionnement fiable.
        </p>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Hero Brick - 2x2 */}
          <div
            ref={(el) => { if (el) bricksRef.current[0] = el; }}
            className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl p-8 md:p-12 flex flex-col justify-between min-h-[360px] md:min-h-[480px] opacity-0"
            style={{ backgroundColor: '#17382B' }}
          >
            <span
              className="absolute top-4 right-4 md:top-8 md:right-12 font-display text-[120px] md:text-[200px] font-bold leading-none pointer-events-none select-none"
              style={{ color: 'rgba(184, 138, 54, 0.08)' }}
            >
              Q
            </span>
            <div>
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-brass mb-4 block">
                Notre engagement
              </span>
              <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-ivory leading-tight">
                La Qualité
              </h3>
            </div>
            <p className="font-body text-sm md:text-base text-ivory/70 max-w-md">
              Chaque volaille est élevée avec soin, suivie quotidiennement et préparée
              dans le respect des normes d’hygiène les plus strictes.
            </p>
          </div>

          {/* Metric Brick 1 */}
          <div
            ref={(el) => { if (el) bricksRef.current[1] = el; }}
            className="relative overflow-hidden rounded-2xl p-6 md:p-8 opacity-0"
            style={{ backgroundColor: '#A7B89A' }}
          >
            <span className="font-display text-5xl md:text-6xl font-bold text-ink-deep/20 block mb-2">
              100%
            </span>
            <h4 className="font-ui text-lg font-semibold text-ink-deep mb-2">
              Fraîcheur quotidienne
            </h4>
            <p className="font-body text-sm text-ink-deep/70">
              Production et livraison quotidiennes pour une fraîcheur garantie.
            </p>
          </div>

          {/* Metric Brick 2 */}
          <div
            ref={(el) => { if (el) bricksRef.current[2] = el; }}
            className="relative overflow-hidden rounded-2xl p-6 md:p-8 opacity-0"
            style={{ backgroundColor: '#A7B89A' }}
          >
            <span className="font-display text-5xl md:text-6xl font-bold text-ink-deep/20 block mb-2">
              HACCP
            </span>
            <h4 className="font-ui text-lg font-semibold text-ink-deep mb-2">
              Traçabilité totale
            </h4>
            <p className="font-body text-sm text-ink-deep/70">
              Suivi complet de l’élevage à l’assiette.
            </p>
          </div>

          {/* Image Brick */}
          <div
            ref={(el) => { if (el) bricksRef.current[3] = el; }}
            className="md:col-span-2 relative overflow-hidden rounded-2xl min-h-[200px] opacity-0"
          >
            <img
              src="/images/bento-kitchen.jpg"
              alt="Installation professionnelle"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-deep/60 to-transparent" />
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-brass mb-2 block">
                Installations
              </span>
              <h4 className="font-display text-2xl md:text-3xl font-semibold text-ivory">
                Hygiène rigoureuse
              </h4>
            </div>
          </div>

          {/* Feature Brick */}
          <div
            ref={(el) => { if (el) bricksRef.current[4] = el; }}
            className="bg-white rounded-2xl p-6 md:p-8 opacity-0"
          >
            <h4 className="font-ui text-lg font-semibold text-charcoal mb-4">
              Nos standards
            </h4>
            <ul className="space-y-3">
              {qualityPillars.map((pillar) => (
                <li key={pillar.label} className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: pillar.color + '20' }}
                  >
                    <pillar.icon size={16} style={{ color: pillar.color }} />
                  </span>
                  <span className="font-body text-sm text-charcoal">{pillar.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="mt-16 md:mt-24">
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-ink-deep mb-8 md:mb-12 text-center">
            Notre processus
          </h3>
          <div className="relative">
            {/* Mobile vertical connector */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-clay/20 md:hidden" />

            <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-0">
              {processSteps.map((step, i) => (
                <div
                  key={step.num}
                  ref={(el) => { if (el) bricksRef.current[5 + i] = el; }}
                  className="flex-1 relative opacity-0 group"
                >
                  {/* Desktop connector line */}
                  {i < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] right-0 h-[2px] bg-clay/20" />
                  )}
                  <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-3 p-4 md:p-6 pl-14 md:pl-6">
                    <span className="absolute left-2 md:static md:mb-2 w-8 h-8 md:w-auto md:h-auto rounded-full md:rounded-none bg-ivory md:bg-transparent border-2 border-brass/30 md:border-0 flex items-center justify-center font-display text-lg md:text-3xl lg:text-4xl font-bold text-brass/70 md:text-brass/40 group-hover:text-brass transition-colors">
                      {step.num}
                    </span>
                    <div>
                      <h4 className="font-ui text-base font-semibold text-charcoal mb-1">
                        {step.title}
                      </h4>
                      <p className="font-body text-sm text-clay">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
