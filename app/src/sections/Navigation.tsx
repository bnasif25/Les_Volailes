import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';
import gsap from 'gsap';

const navLinks = [
  { label: 'Nos Produits', href: '#produits' },
  { label: 'Notre Qualité', href: '#qualite' },
  { label: 'Professionnels', href: '#professionnels' },
  { label: 'Notre Histoire', href: '#histoire' },
  { label: 'Contact', href: '#contact' },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (logoRef.current && !prefersReducedMotion()) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      lastFocusedRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      // Focus first menu item after animation
      setTimeout(() => {
        const firstLink = menuRef.current?.querySelector('a');
        firstLink?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
      lastFocusedRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Focus trap and Escape to close
  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        return;
      }

      if (e.key !== 'Tab') return;

      const menu = menuRef.current;
      if (!menu) return;

      const focusable = menu.querySelectorAll<HTMLElement>(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-ivory/80 backdrop-blur-md border-b border-clay/20'
          : 'py-6 bg-gradient-to-b from-ink-deep/75 via-ink-deep/40 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div ref={logoRef}>
          <Logo
            color={scrolled ? '#17382B' : '#F8F3E8'}
            className={scrolled ? 'scale-90' : 'scale-100'}
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`font-ui text-sm font-medium transition-colors duration-300 hover:text-brass ${
                scrolled ? 'text-charcoal' : 'text-ivory'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="font-ui text-sm font-semibold px-6 py-2.5 bg-ink-deep text-ivory rounded-full hover:bg-brass transition-colors duration-300"
          >
            Demander un devis
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          ref={toggleRef}
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 transition-colors duration-300 ${scrolled ? 'text-charcoal' : 'text-ivory'}`}
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-ink-deep/20 z-[-1] lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-menu"
            ref={menuRef}
            className="lg:hidden absolute top-full left-0 right-0 bg-ivory/95 backdrop-blur-lg border-b border-clay/20 py-6 px-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-ui text-base font-medium text-charcoal hover:text-brass transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="font-ui text-sm font-semibold px-6 py-3 bg-ink-deep text-ivory rounded-full text-center hover:bg-brass transition-colors mt-2"
              >
                Demander un devis
              </a>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
