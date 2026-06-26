import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, UtensilsCrossed, ShoppingCart, Send, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    type: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (leftRef.current) {
        if (prefersReducedMotion()) {
          gsap.set(leftRef.current, { opacity: 1, x: 0 });
        } else {
          gsap.fromTo(
            leftRef.current,
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 60%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }
      if (rightRef.current) {
        if (prefersReducedMotion()) {
          gsap.set(rightRef.current, { opacity: 1, x: 0 });
        } else {
          gsap.fromTo(
            rightRef.current,
            { opacity: 0, x: 50 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 60%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ nom: '', email: '', telephone: '', type: '', message: '' });
  };

  return (
    <section
      id="professionnels"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-ivory"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Content */}
          <div ref={leftRef} className="lg:col-span-3 opacity-0">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-brass mb-4 block">
              Professionnels
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink-deep mb-6 leading-tight">
              Pour les professionnels de la restauration et de la distribution.
            </h2>
            <p className="font-body text-base md:text-lg text-clay mb-8 leading-relaxed">
              Les Volailles de Notre-Dame accompagne les restaurants, hôtels,
              commerces et distributeurs avec une offre locale, fraîche et régulière.
            </p>

            {/* Client type pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {clientTypes.map((type) => (
                <span
                  key={type.label}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-clay/30 font-ui text-sm font-medium text-charcoal hover:border-brass hover:text-brass transition-colors cursor-default"
                >
                  <type.icon size={16} />
                  {type.label}
                </span>
              ))}
            </div>

            {/* Benefits */}
            <ul className="space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-brass flex-shrink-0" />
                  <span className="font-body text-sm text-charcoal">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Form */}
          <div ref={rightRef} className="lg:col-span-2 opacity-0">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card">
              <h3 className="font-ui text-xl font-semibold text-charcoal mb-6">
                Demander un devis
              </h3>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle size={48} className="text-brass mb-4" />
                  <h4 className="font-ui text-lg font-semibold text-charcoal mb-2">
                    Demande envoyée
                  </h4>
                  <p className="font-body text-sm text-clay">
                    Nous vous contacterons rapidement.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nom complet"
                    required
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="w-full px-4 py-3 border border-clay/30 rounded-none font-body text-sm text-charcoal placeholder:text-clay/50 focus:outline-none focus:border-ink-deep transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-clay/30 rounded-none font-body text-sm text-charcoal placeholder:text-clay/50 focus:outline-none focus:border-ink-deep transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    className="w-full px-4 py-3 border border-clay/30 rounded-none font-body text-sm text-charcoal placeholder:text-clay/50 focus:outline-none focus:border-ink-deep transition-colors"
                  />
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 border border-clay/30 rounded-none font-body text-sm text-charcoal focus:outline-none focus:border-ink-deep transition-colors bg-white"
                  >
                    <option value="">Type d’établissement</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="hotel">Hôtel</option>
                    <option value="commerce">Commerce</option>
                    <option value="distributeur">Distributeur</option>
                    <option value="autre">Autre</option>
                  </select>
                  <textarea
                    placeholder="Message (optionnel)"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-clay/30 rounded-none font-body text-sm text-charcoal placeholder:text-clay/50 focus:outline-none focus:border-ink-deep transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-ink-deep text-ivory font-ui text-sm font-semibold hover:bg-brass transition-colors"
                  >
                    <Send size={16} />
                    Envoyer la demande
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
