import { MessageCircle } from 'lucide-react';
import { CONTACT } from '@/lib/contact';

export default function WhatsAppFloat() {
  return (
    <a
      href={CONTACT.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Commander via WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
    >
      <MessageCircle size={28} fill="currentColor" />
    </a>
  );
}
