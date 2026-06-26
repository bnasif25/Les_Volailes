import { useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-ink-deep">
      <img
        src="/hero_landing.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[46%_center] md:object-center"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,45,34,0.94)_0%,rgba(16,45,34,0.77)_36%,rgba(16,45,34,0.2)_72%),linear-gradient(0deg,rgba(16,45,34,0.62)_0%,transparent_52%)]" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl items-end px-6 pb-14 pt-28 md:px-12 md:pb-20 lg:items-center lg:px-10 lg:pb-0 lg:pt-24">
        <div className="max-w-3xl">
          <span className="mb-5 block font-ui text-xs font-semibold uppercase tracking-[0.18em] text-ivory/75">
            Élevage local à Maurice
          </span>
          <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[0.96] tracking-[-0.035em] text-ivory sm:text-6xl md:text-7xl lg:text-[5.75rem]">
            Les Volailles de Notre-Dame
          </h1>
          <p className="mb-8 mt-6 max-w-lg font-body text-base leading-relaxed text-ivory/80 md:text-lg">
            Des volailles fraîches, élevées avec soin pour les familles et les professionnels.
          </p>
          <a
            href="#produits"
            onClick={(e) => handleScrollTo(e, '#produits')}
            className="group inline-flex items-center gap-3 rounded-full bg-ivory px-6 py-3.5 font-ui text-sm font-semibold text-ink-deep transition-colors hover:bg-brass active:translate-y-px"
          >
            Voir nos produits
            <ArrowRight
              size={18}
              className="transform group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
