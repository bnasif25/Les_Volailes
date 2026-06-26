import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';
import { useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react';

const navLinks = [
  { label: 'Nos Produits', href: '#produits' },
  { label: 'Notre Qualité', href: '#qualite' },
  { label: 'Professionnels', href: '#professionnels' },
  { label: 'Notre Histoire', href: '#histoire' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 80);
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'border-charcoal/10 bg-ivory/95 shadow-[0_8px_30px_rgba(23,56,43,0.08)] backdrop-blur-xl'
          : 'border-ivory/15 bg-ink-deep/35 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8 lg:px-10">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
          }}
          className="relative z-10"
          aria-label="Retour en haut"
        >
          <Logo
            color={scrolled || mobileOpen ? '#17382B' : '#F8F3E8'}
            className="transition-transform duration-300"
          />
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`whitespace-nowrap font-ui text-sm font-medium transition-colors duration-200 hover:text-brass ${
                scrolled ? 'text-charcoal' : 'text-ivory'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className={`whitespace-nowrap rounded-full px-5 py-2.5 font-ui text-sm font-semibold transition-colors duration-200 ${
              scrolled
                ? 'bg-ink-deep text-ivory hover:bg-brass'
                : 'bg-ivory text-ink-deep hover:bg-brass'
            }`}
          >
            Demander un devis
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`rounded-full p-2 transition-colors duration-200 lg:hidden ${
            scrolled || mobileOpen ? 'text-charcoal' : 'text-ivory'
          }`}
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-charcoal/10 bg-ivory/95 px-6 py-6 shadow-[0_18px_40px_rgba(23,56,43,0.12)] backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="border-b border-charcoal/10 py-3 font-ui text-base font-medium text-charcoal transition-colors hover:text-brass"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="mt-4 rounded-full bg-ink-deep px-6 py-3 text-center font-ui text-sm font-semibold text-ivory transition-colors hover:bg-brass"
            >
              Demander un devis
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
