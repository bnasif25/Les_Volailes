import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Calendar, Truck, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Calendar, value: '20+', label: 'Années d’expertise' },
  { icon: Truck, value: 'Quotidien', label: 'Approvisionnement frais' },
  { icon: Users, value: '150+', label: 'Partenaires professionnels' },
];

const certifications = [
  { icon: Award, label: 'Certifié HACCP', desc: 'Hygiène et traçabilité' },
  { icon: Award, label: 'Production locale', desc: 'Élevé à Maurice' },
  { icon: Award, label: 'Fraîcheur garantie', desc: 'Contrôle qualité quotidien' },
];

const testimonials = [
  {
    quote:
      'La qualité est constante et la livraison toujours ponctuelle. Un partenaire fiable pour notre restaurant.',
    author: 'Chef R.',
    role: 'Restaurant à Port-Louis',
  },
  {
    quote:
      'Nous apprécions la fraîcheur des produits et la communication directe avec l’équipe.',
    author: 'Marie L.',
    role: 'Gérante d’hôtel',
  },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function TrustSignals() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        if (prefersReducedMotion()) {
          gsap.set(item, { opacity: 1, y: 0 });
          return;
        }
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
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
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-ivory"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={(el) => { if (el) itemsRef.current[0] = el; }}
          className="text-center mb-16 opacity-0"
        >
          <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-brass mb-4 block">
            Pourquoi nous faire confiance
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-ink-deep">
            Une ferme reconnue à Maurice.
          </h2>
        </div>

        {/* Stats */}
        <div
          ref={(el) => { if (el) itemsRef.current[1] = el; }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 opacity-0"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-card hover:shadow-card-hover transition-shadow"
            >
              <stat.icon size={28} className="mx-auto text-brass mb-4" />
              <span className="font-display text-4xl md:text-5xl font-semibold text-ink-deep block mb-2">
                {stat.value}
              </span>
              <span className="font-ui text-sm font-medium text-clay">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Certifications + Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            ref={(el) => { if (el) itemsRef.current[2] = el; }}
            className="bg-ink-deep rounded-2xl p-6 md:p-8 opacity-0"
          >
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-ivory mb-6">
              Nos engagements
            </h3>
            <ul className="space-y-4">
              {certifications.map((cert) => (
                <li key={cert.label} className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-full bg-brass/20 flex items-center justify-center flex-shrink-0">
                    <cert.icon size={18} className="text-brass" />
                  </span>
                  <div>
                    <h4 className="font-ui text-base font-semibold text-ivory">
                      {cert.label}
                    </h4>
                    <p className="font-body text-sm text-ivory/60">{cert.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div
            ref={(el) => { if (el) itemsRef.current[3] = el; }}
            className="opacity-0"
          >
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-ink-deep mb-6">
              Ce que disent nos partenaires
            </h3>
            <div className="space-y-4">
              {testimonials.map((t) => (
                <div
                  key={t.author}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-card"
                >
                  <Quote size={24} className="text-brass/40 mb-4" />
                  <p className="font-body text-base text-charcoal leading-relaxed mb-4">
                    {t.quote}
                  </p>
                  <div>
                    <span className="font-ui text-sm font-semibold text-ink-deep block">
                      {t.author}
                    </span>
                    <span className="font-body text-xs text-clay">{t.role}</span>
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
