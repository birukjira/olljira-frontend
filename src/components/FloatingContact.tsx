import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/251965759999?text=' +
  encodeURIComponent('Hello OllJira — I would like to ask about a project.');
const TELEGRAM_URL = 'https://t.me/olljira';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.03a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.07.81.82-3-.2-.31a8.07 8.07 0 0 1-1.24-4.31c0-4.47 3.64-8.11 8.12-8.11 4.47 0 8.11 3.64 8.11 8.11s-3.64 8.11-8.11 8.11zm4.45-6.08c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.36-1.68-.14-.24-.01-.37.11-.5.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05 0 1.21.88 2.37 1 2.53.12.16 1.72 2.63 4.18 3.69.58.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28z" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.94 2A10 10 0 0 0 2 12a10 10 0 0 0 9.94 10A10 10 0 0 0 22 12 10 10 0 0 0 11.94 2zm4.89 6.9-1.67 7.87c-.12.56-.45.7-.92.43l-2.54-1.87-1.23 1.18c-.13.14-.25.25-.5.25l.18-2.6 4.73-4.27c.2-.18-.05-.28-.32-.1l-5.85 3.68-2.52-.79c-.55-.17-.56-.55.12-.81l9.83-3.79c.46-.17.86.11.71.82z" />
    </svg>
  );
}

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex flex-col gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with OllJira on WhatsApp"
            className="group flex items-center gap-3 rounded-full bg-[#25D366] py-3 pl-4 pr-5 text-white shadow-lg transition-transform hover:scale-105"
          >
            <WhatsAppIcon className="size-6" />
            <span className="text-sm font-medium">WhatsApp</span>
          </a>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message OllJira on Telegram"
            className="group flex items-center gap-3 rounded-full bg-[#229ED9] py-3 pl-4 pr-5 text-white shadow-lg transition-transform hover:scale-105"
          >
            <TelegramIcon className="size-6" />
            <span className="text-sm font-medium">Telegram</span>
          </a>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close chat options' : 'Chat with us on WhatsApp or Telegram'}
        className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform hover:scale-105"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>
    </div>
  );
}
