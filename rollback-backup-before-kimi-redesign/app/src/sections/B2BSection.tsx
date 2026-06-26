import { useReducedMotion } from 'motion/react';
import { ArrowRight, Building2, UtensilsCrossed, ShoppingCart, CheckCircle } from 'lucide-react';

const clientTypes = [
  { icon: Building2, label: 'Hôtels' },
  { icon: UtensilsCrossed, label: 'Restaurants' },
  { icon: ShoppingCart, label: 'Distributeurs' },
];

const benefits = [
  'Approvisionnement local',
  'Qualité constante',
  'Produits frais',
  'Communication directe',
  'Solutions adaptées aux volumes professionnels',
];

export default function B2BSection() {
  const reduceMotion = useReducedMotion();

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <section
      id="professionnels"
      className="bg-ivory px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-2xl bg-sage/20 lg:grid-cols-12">
          <div className="relative min-h-[360px] lg:col-span-5 lg:min-h-[680px]">
            <img
              src="/images/product-decoupes.jpg"
              alt="Découpes de volaille pour les commandes professionnelles"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col justify-center p-7 md:p-12 lg:col-span-7 lg:p-16">
            <h2 className="max-w-2xl text-display text-ink-deep">
              Un approvisionnement fiable pour les professionnels.
            </h2>
            <p className="mt-6 max-w-2xl text-body-lg">
              Les Volailles de Notre-Dame accompagne les restaurants, hôtels,
              commerces et distributeurs avec une offre locale, fraîche et régulière.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              {clientTypes.map((type) => (
                <span
                  key={type.label}
                  className="inline-flex items-center gap-2 rounded-full border border-ink-deep/15 bg-ivory/65 px-4 py-2.5 font-ui text-sm font-medium text-charcoal"
                >
                  <type.icon size={16} />
                  {type.label}
                </span>
              ))}
            </div>

            <ul className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-brass flex-shrink-0" />
                  <span className="font-body text-sm text-charcoal">{benefit}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="group mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-ink-deep px-6 py-3.5 font-ui text-sm font-semibold text-ivory transition-colors hover:bg-brass active:translate-y-px"
            >
              Demander un devis
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
