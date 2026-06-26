import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: 'Poulet frais',
    description: 'Une volaille fraîche, sélectionnée avec soin pour une cuisine savoureuse au quotidien.',
    image: '/images/product-poulet.jpg',
  },
  {
    id: 2,
    name: 'Découpes de volaille',
    description: 'Des découpes pratiques et régulières pour les familles, restaurants et professionnels.',
    image: '/images/product-decoupes.jpg',
  },
  {
    id: 3,
    name: '\u0152ufs frais',
    description: 'Des œufs locaux, frais et fiables pour les besoins du quotidien.',
    image: '/images/product-oeufs.jpg',
  },
  {
    id: 4,
    name: 'Offre professionnelle',
    description: 'Solutions adaptées aux volumes professionnels : hôtels, restaurants et distributeurs.',
    image: '/images/bento-kitchen.jpg',
  },
];

export default function Products() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [reduceMotion]);

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <section
      id="produits"
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 bg-ivory"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="text-ui text-brass mb-3 block">Nos produits</span>
            <h2
              ref={titleRef}
              className="text-display text-ink-deep"
            >
              Une gamme pensée pour chaque table.
            </h2>
          </div>
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="inline-flex items-center gap-2 font-ui text-sm font-medium text-ink-deep hover:text-brass transition-colors group shrink-0"
          >
            Demander un devis
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 md:gap-6">
          {products.map((product, i) => {
            const spanClass =
              i === 0
                ? 'lg:col-span-7 aspect-[16/10]'
                : i === 1
                ? 'lg:col-span-5 aspect-[4/3]'
                : i === 2
                ? 'lg:col-span-5 aspect-[4/3]'
                : 'lg:col-span-7 aspect-[16/10]';

            return (
              <div
                key={product.id}
                ref={(el) => {
                  if (el) cardsRef.current[i] = el;
                }}
                className={`group relative overflow-hidden rounded-xl ${spanClass}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/80 via-ink-deep/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-ivory mb-2">
                    {product.name}
                  </h3>
                  <p className="font-body text-sm text-ivory/80 max-w-md">
                    {product.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
