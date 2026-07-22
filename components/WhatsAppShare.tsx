"use client";

const WHATSAPP_NUMBER = "393793718598";

export default function WhatsAppShare() {
  const openChat = () => {
    const message = `Ciao! Ho visto il vostro sito Consegna Fiori Milano e vorrei informazioni su un bouquet. Pagina: ${window.location.href}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <button
      type="button"
      onClick={openChat}
      className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 font-semibold text-white shadow-xl transition hover:scale-[1.03] hover:shadow-2xl"
      aria-label="Scrivici su WhatsApp"
      title="Scrivici su WhatsApp"
    >
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-6 w-6 fill-current">
        <path d="M16.04 3C8.85 3 3 8.72 3 15.76c0 2.25.6 4.45 1.75 6.38L3 29l7.08-1.81a13.2 13.2 0 0 0 5.95 1.39h.01C23.22 28.58 29 22.86 29 15.81 29 8.77 23.23 3 16.04 3Zm0 23.42h-.01a11 11 0 0 1-5.6-1.5l-.4-.24-4.2 1.08 1.12-4.02-.27-.42a10.49 10.49 0 0 1-1.67-5.56c0-5.84 4.95-10.6 11.04-10.6 2.95 0 5.72 1.13 7.8 3.18a10.32 10.32 0 0 1 3.23 7.47c-.01 5.85-4.96 10.61-11.04 10.61Zm6.06-7.94c-.33-.16-1.96-.95-2.26-1.06-.3-.1-.52-.16-.74.16-.22.32-.85 1.06-1.04 1.27-.19.22-.38.24-.71.08-.33-.16-1.39-.5-2.65-1.6a9.8 9.8 0 0 1-1.83-2.23c-.19-.32-.02-.5.14-.66.15-.14.33-.38.49-.57.16-.19.22-.32.33-.54.11-.22.05-.4-.03-.57-.08-.16-.74-1.74-1.01-2.38-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.4-.3.33-1.15 1.1-1.15 2.68 0 1.58 1.17 3.1 1.33 3.32.16.22 2.3 3.45 5.57 4.84.78.33 1.38.52 1.85.67.78.24 1.49.21 2.05.13.63-.09 1.96-.79 2.23-1.55.27-.76.27-1.42.19-1.55-.08-.14-.3-.22-.63-.38Z" />
      </svg>
      <span className="hidden sm:inline">Scrivici su WhatsApp</span>
    </button>
  );
}
