import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'motion/react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    type: '',
    message: '',
  });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [reduceMotion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ nom: '', email: '', telephone: '', type: '', message: '' });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 bg-ink-deep"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-display text-ivory mb-5">
            Contactez-nous
          </h2>
          <p className="font-body text-base md:text-lg text-ivory/60 max-w-2xl">
            Besoin d&apos;un approvisionnement r&eacute;gulier ? Parlons-en.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-1">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-full bg-brass/20 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-brass" />
                </span>
                <div>
                  <span className="font-ui text-sm font-semibold text-ivory/90 block mb-1">
                    T&eacute;l&eacute;phone
                  </span>
                  <span className="font-body text-sm text-ivory/60">
                    +230 5XXX XXXX
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-full bg-brass/20 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-brass" />
                </span>
                <div>
                  <span className="font-ui text-sm font-semibold text-ivory/90 block mb-1">
                    Email
                  </span>
                  <span className="font-body text-sm text-ivory/60">
                    contact@volailles-notredame.mu
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-full bg-brass/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-brass" />
                </span>
                <div>
                  <span className="font-ui text-sm font-semibold text-ivory/90 block mb-1">
                    Localisation
                  </span>
                  <span className="font-body text-sm text-ivory/60">
                    Maurice
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-ivory/10">
                <a
                  href="https://wa.me/2305XXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brass text-ink-deep font-ui text-sm font-semibold rounded-full hover:bg-ivory active:scale-[0.98] transition-all"
                >
                  <MessageCircle size={18} />
                  Commander via WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div ref={formRef} className="lg:col-span-2">
            <div className="bg-ivory/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-ivory/10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle size={56} className="text-brass mb-4" />
                  <h3 className="font-ui text-xl font-semibold text-ivory mb-2">
                    Message envoy&eacute;
                  </h3>
                  <p className="font-body text-sm text-ivory/60">
                    Nous vous r&eacute;pondrons dans les plus brefs d&eacute;lais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label htmlFor="contact-nom" className="font-ui text-xs font-medium text-ivory/70">Nom complet</label>
                      <input
                        id="contact-nom"
                        type="text"
                        placeholder="Nom complet"
                        required
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        className="w-full px-4 py-3.5 bg-ivory/10 border border-ivory/20 rounded-none font-body text-sm text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-brass transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="contact-email" className="font-ui text-xs font-medium text-ivory/70">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 bg-ivory/10 border border-ivory/20 rounded-none font-body text-sm text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-brass transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label htmlFor="contact-telephone" className="font-ui text-xs font-medium text-ivory/70">Téléphone</label>
                      <input
                        id="contact-telephone"
                        type="tel"
                        placeholder="T&eacute;l&eacute;phone"
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        className="w-full px-4 py-3.5 bg-ivory/10 border border-ivory/20 rounded-none font-body text-sm text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-brass transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="contact-type" className="font-ui text-xs font-medium text-ivory/70">Type de client</label>
                      <select
                        id="contact-type"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-3.5 bg-ivory/10 border border-ivory/20 rounded-none font-body text-sm text-ivory focus:outline-none focus:border-brass transition-colors"
                        style={{ color: formData.type ? '#F8F3E8' : 'rgba(248,243,232,0.4)' }}
                      >
                        <option value="" style={{ color: '#20201E' }}>Type de client</option>
                        <option value="particulier" style={{ color: '#20201E' }}>Particulier</option>
                        <option value="restaurant" style={{ color: '#20201E' }}>Restaurant</option>
                        <option value="hotel" style={{ color: '#20201E' }}>H&ocirc;tel</option>
                        <option value="commerce" style={{ color: '#20201E' }}>Commerce</option>
                        <option value="distributeur" style={{ color: '#20201E' }}>Distributeur</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="contact-message" className="font-ui text-xs font-medium text-ivory/70">Votre message</label>
                    <textarea
                      id="contact-message"
                      placeholder="Votre message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 bg-ivory/10 border border-ivory/20 rounded-none font-body text-sm text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-brass transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brass text-ink-deep font-ui text-sm font-semibold hover:bg-ivory active:scale-[0.98] transition-all"
                  >
                    <Send size={16} />
                    Envoyer le message
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
