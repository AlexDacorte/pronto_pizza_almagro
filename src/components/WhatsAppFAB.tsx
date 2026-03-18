import { Phone } from "lucide-react";

const WhatsAppFAB = () => {
  return (
    <a
      href="https://wa.me/5411643775510?text=Hola!%20Quiero%20hacer%20un%20pedido"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-whatsapp text-warm-white shadow-[0_4px_20px_hsl(var(--whatsapp)/0.4)] transition-transform hover:scale-110 animate-bounce"
      aria-label="Pedir por WhatsApp"
      style={{ animationDuration: "2s", animationIterationCount: "3" }}
    >
      <Phone className="h-7 w-7" />
    </a>
  );
};

export default WhatsAppFAB;
