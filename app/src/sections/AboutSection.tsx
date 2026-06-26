import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const promiseCards = [
  {
    title: 'Fraîcheur locale',
    desc: 'Des produits frais issus d’un élevage local, pensés pour les tables mauriciennes.',
  },
  {
    title: 'Élevage avec soin',
    desc: 'Chaque étape est guidée par l’attention, la propreté et le respect des bonnes pratiques.',
  },
  {
    title: 'Qualité constante',
    desc: 'Une production fiable pour les familles, restaurants, hôtels et distributeurs.',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Image reveal with clip-path
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Text fade
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 55%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Cards stagger
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.2 + i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 50%',
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative overflow-hidden rounded-2xl aspect-[4/3]"
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
          <div ref={textRef} className="opacity-0">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-brass mb-4 block">
              Notre histoire
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink-deep mb-6 leading-tight">
              Notre histoire
            </h2>
            <p className="font-body text-base md:text-lg text-clay leading-relaxed mb-6">
              Les Volailles de Notre-Dame est n&eacute;e d&apos;une volont&eacute; simple :
              proposer une volaille locale de confiance, &eacute;lev&eacute;e avec soin et
              pens&eacute;e pour les besoins des familles et des professionnels &agrave; Maurice.
            </p>
            <p className="font-body text-base text-clay leading-relaxed">
              Au fil des ann&eacute;es, nous avons b&acirc;ti notre r&eacute;putation sur des
              valeurs solides : fra&icirc;cheur, propret&eacute;, r&eacute;gularit&eacute; et
              respect de nos partenaires. Chaque volaille qui quitte notre ferme porte
              cet engagement.
            </p>
          </div>
        </div>

        {/* Promise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promiseCards.map((card, i) => (
            <div
              key={card.title}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 opacity-0"
            >
              <span
                className="font-display text-4xl font-bold block mb-4"
                style={{ color: 'rgba(184, 138, 54, 0.2)' }}
              >
                0{i + 1}
              </span>
              <h3 className="font-ui text-lg font-semibold text-charcoal mb-3">
                {card.title}
              </h3>
              <p className="font-body text-sm text-clay leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
