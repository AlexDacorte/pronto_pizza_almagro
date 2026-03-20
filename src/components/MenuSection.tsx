import { useState } from "react";
import { X, Phone } from "lucide-react";
import productsData from "@/data/products.json";
import catEmpanada from "@/assets/cat-empanada.jpg";
import catPizzaInd from "@/assets/cat-pizza-ind.jpg";
import catPizzaGrande from "@/assets/cat-pizza-grande.jpg";
import catTequenos from "@/assets/cat-tequenos.jpg";
import catBebidas from "@/assets/cat-bebidas.jpg";
import catSalsas from "@/assets/cat-salsas.jpg";

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

const sectionIcons: Record<string, string> = {
  "Empanada": "🥟",
  "Pizza Individual": "🍕",
  "Pizzas Grandes": "🍕",
  "Salsas": "🫙",
  "Bebidas": "🥤",
  "Tequeños": "🧀",
};

const sectionImages: Record<string, string> = {
  "Empanada": catEmpanada,
  "Pizza Individual": catPizzaInd,
  "Pizzas Grandes": catPizzaGrande,
  "Salsas": catSalsas,
  "Bebidas": catBebidas,
  "Tequeños": catTequenos,
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 0 }).format(price);
};

const MenuSection = () => {
  const menuSections = sections.filter(s => s.section !== "Rappi Promos");
  const [activeTab, setActiveTab] = useState(menuSections[0]?.section || "");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categoryImage = sectionImages[activeTab] || catEmpanada;

  return (
    <section id="menu" className="py-16 bg-warm-white">
      <div className="container">
        <h2 className="font-display text-4xl md:text-5xl font-black text-charcoal text-center uppercase mb-2">
          Nuestro Menú
        </h2>
        <div className="w-20 h-1 bg-gold mx-auto mb-10 rounded-full" />

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {menuSections.map((s) => (
            <button
              key={s.section}
              onClick={() => setActiveTab(s.section)}
              className={`font-display text-sm font-bold px-5 py-2.5 rounded-full transition-all ${
                activeTab === s.section
                  ? "bg-charcoal text-gold shadow-lg"
                  : "bg-sand/50 text-charcoal hover:bg-sand"
              }`}
            >
              {sectionIcons[s.section] || "🍽️"} {s.section}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuSections
            .filter((s) => s.section === activeTab)
            .flatMap((s) => s.products)
            .map((product, i) => (
              <div
                key={i}
                className="group flex gap-4 bg-background rounded-lg border border-border p-4 transition-all hover:shadow-lg hover:scale-[1.02] hover:border-gold/50"
              >
                <img
                  src={categoryImage}
                  alt={product.name}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-sm font-bold text-charcoal capitalize leading-tight mb-1">
                    {product.name}
                  </h3>
                  <p className="font-body text-xs text-support-gray leading-snug mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-base font-black text-sauce-red">
                      {formatPrice(product.price)}
                    </span>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="font-display text-xs font-bold text-warm-white bg-charcoal px-3 py-1.5 rounded-full hover:bg-gold hover:text-charcoal transition-colors"
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedProduct(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm" />

          {/* Card */}
          <div
            className="relative z-10 w-full max-w-sm bg-background rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={categoryImage}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-charcoal/70 text-warm-white flex items-center justify-center hover:bg-charcoal transition-colors"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="font-display text-xl font-bold text-charcoal capitalize mb-2">
                {selectedProduct.name}
              </h3>
              <p className="font-body text-sm text-support-gray leading-relaxed mb-4">
                {selectedProduct.description}
              </p>
              <span className="font-display text-3xl font-black text-sauce-red block mb-6">
                {formatPrice(selectedProduct.price)}
              </span>

              <a
                href={`https://wa.me/541164377551?text=Hola!%20Quiero%20pedir:%20${encodeURIComponent(selectedProduct.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-whatsapp text-warm-white font-display text-sm font-bold py-3 rounded-full hover:scale-[1.02] transition-transform"
              >
                <Phone className="h-4 w-4" />
                Pedir
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MenuSection;
