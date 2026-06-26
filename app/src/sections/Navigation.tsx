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

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
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
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 transition-colors duration-300 ${scrolled ? 'text-charcoal' : 'text-ivory'}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-ivory/95 backdrop-blur-lg border-b border-clay/20 py-6 px-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-ui text-base font-medium text-charcoal hover:text-brass transition-colors"
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
      )}
    </nav>
  );
}
