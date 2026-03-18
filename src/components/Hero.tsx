import heroPizza from "@/assets/hero-pizza.jpg";
import heroEmpanadas from "@/assets/hero-empanadas.jpg";
import { Phone } from "lucide-react";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background images */}
      <div className="absolute inset-0 grid grid-cols-2">
        <div className="relative overflow-hidden">
          <img src={heroEmpanadas} alt="Empanadas artesanales" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="relative overflow-hidden">
          <img src={heroPizza} alt="Pizza de muzzarella" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </div>
      </div>
      {/* Single overlay at 60% */}
      <div className="absolute inset-0 bg-charcoal/[0.6]" />

      {/* Content */}
      <div className="relative z-10 container text-center py-20">
        <h1 className="font-display text-5xl md:text-7xl font-black text-warm-white uppercase tracking-tight leading-none mb-4">
          Empanadas y<br />
          <span className="text-gold">Pizzas</span><br />
          <span className="text-sauce-red">Pronto.</span>
        </h1>
        <p className="font-body text-lg md:text-xl text-sand max-w-xl mx-auto mb-8">
          Masa casera, sabores únicos, directo a tu mesa. Av. Rivadavia 3610, CABA.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#menu"
            className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 font-display text-base font-bold text-charcoal transition-transform hover:scale-105"
          >
            Ver Menú
          </a>
          <a
            href="https://wa.me/541164377551?text=Hola!%20Quiero%20hacer%20un%20pedido"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-8 py-4 font-display text-base font-bold text-warm-white transition-transform hover:scale-105"
          >
            <Phone className="h-5 w-5" />
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
