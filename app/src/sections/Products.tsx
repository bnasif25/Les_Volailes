import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
    description: 'Des \u0153ufs locaux, frais et fiables pour les besoins du quotidien.',
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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title reveal
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
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

      // Cards stagger reveal
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
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
  }, []);

  return (
    <section
      id="produits"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-ivory"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <h2
            ref={titleRef}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-ink-deep opacity-0"
          >
            Nos Produits
          </h2>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden md:inline-flex items-center gap-2 font-ui text-sm font-medium text-clay hover:text-brass transition-colors group"
          >
            Voir tout
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <div
              key={product.id}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="group opacity-0"
            >
              <div className="relative overflow-hidden rounded-xl mb-4 aspect-[4/3]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="font-ui text-lg font-semibold text-charcoal mb-2 group-hover:text-ink-deep transition-colors">
                {product.name}
              </h3>
              <p className="font-body text-sm text-clay leading-relaxed">
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
