import Logo from '@/components/Logo';
import { CONTACT } from '@/lib/contact';

const navLinks = [
  { label: 'Nos Produits', href: '#produits' },
  { label: 'Notre Qualité', href: '#qualite' },
  { label: 'Professionnels', href: '#professionnels' },
  { label: 'Notre Histoire', href: '#histoire' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Logo & Tagline */}
          <div>
            <Logo color="#F8F3E8" variant="full" className="mb-4" />
            <p className="font-body text-sm text-ivory/50 max-w-xs">
              Volaille fra&icirc;che de Maurice. &Eacute;lev&eacute;e avec soin pour les
              familles et les professionnels.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-ivory/40 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="font-body text-sm text-ivory/60 hover:text-brass transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-ivory/40 mb-4">
              Contact
            </h4>
            <ul className="space-y-2">
              <li>
                <a href={CONTACT.phoneLink} className="font-body text-sm text-ivory/60 hover:text-brass transition-colors">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={CONTACT.emailLink} className="font-body text-sm text-ivory/60 hover:text-brass transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li className="font-body text-sm text-ivory/60">
                {CONTACT.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-ivory/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-ivory/40">
            &copy; 2026 Les Volailles de Notre-Dame. Tous droits r&eacute;serv&eacute;s.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-body text-xs text-ivory/40 cursor-default hover:text-ivory/60 transition-colors">
              Politique de confidentialit&eacute;
            </span>
            <span className="font-body text-xs text-ivory/40 cursor-default hover:text-ivory/60 transition-colors">
              Mentions l&eacute;gales
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
