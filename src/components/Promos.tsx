import { useRef, useState, useEffect } from "react";
import { productsData } from "@/data/products";
import { Phone, ChevronLeft, ChevronRight } from "lucide-react";

type Product = {
  name: string;
  description: string;
  price: number;
  currency: string;
};

type Section = {
  section: string;
  products: Product[];
};

const sections: Section[] = productsData.sections as Section[];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 0 }).format(price);
};

const AUTO_SCROLL_SPEED = 0.5; // px per frame
const AUTO_SCROLL_PAUSE = 2000; // ms pause after manual interaction

const Promos = () => {
  const promos = sections.find(s => s.section === "Rappi Promos");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const pauseRef = useRef(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    pauseRef.current = true;
    clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => { pauseRef.current = false; }, AUTO_SCROLL_PAUSE);
  };

  // Auto-scroll effect
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    const step = () => {
      if (!pauseRef.current && el) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScroll - 1) {
          el.scrollLeft = 0;
        } else {
          el.scrollLeft += AUTO_SCROLL_SPEED;
        }
        checkScroll();
      }
      animId = requestAnimationFrame(step);
    };
    animId = requestAnimationFrame(step);

    const pause = () => {
      pauseRef.current = true;
      clearTimeout(pauseTimerRef.current);
    };
    const resume = () => {
      pauseTimerRef.current = setTimeout(() => { pauseRef.current = false; }, AUTO_SCROLL_PAUSE);
    };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(pauseTimerRef.current);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, []);

  if (!promos) return null;

  return (
    <section id="promos" className="py-16 bg-charcoal">
      <div className="container">
        <h2 className="font-display text-4xl md:text-5xl font-black text-gold text-center uppercase mb-2">
          🔥 Promos
        </h2>
        <p className="text-center text-sand font-body mb-10">Las mejores ofertas para vos</p>

        <div className="relative">
          {/* Arrows */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gold flex items-center justify-center text-charcoal shadow-lg hover:scale-110 transition-transform"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gold flex items-center justify-center text-charcoal shadow-lg hover:scale-110 transition-transform"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          {/* Carousel */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {promos.products.map((product, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[32%] snap-start rounded-xl border-2 border-gold/30 bg-charcoal p-6 pt-8 mt-4 flex flex-col transition-all hover:border-gold hover:shadow-[0_0_30px_hsl(var(--gold)/0.15)]"
              >
                <div className="absolute -top-3 right-4 bg-sauce-red text-warm-white font-display text-xs font-bold px-3 py-1 rounded-full z-10">
                  PROMO
                </div>
                <h3 className="font-display text-lg font-bold text-warm-white capitalize mb-2 pr-16">
                  {product.name}
                </h3>
                <p className="font-body text-sm text-sand/80 leading-relaxed flex-1 mb-4">
                  {product.description}
                </p>
                <a
                  href={`https://wa.me/541164377551?text=Hola!%20Quiero%20pedir:%20${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 bg-whatsapp text-warm-white font-display text-sm font-bold w-full py-3 rounded-full hover:scale-[1.02] transition-transform"
                >
                  <Phone className="h-4 w-4" />
                  Pedir por WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promos;
