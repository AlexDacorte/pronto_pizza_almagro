import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Promos from "@/components/Promos";
import MenuSection from "@/components/MenuSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Promos />
      <MenuSection />
      <Contact />
      <Footer />
      <WhatsAppFAB />
    </div>
  );
};

export default Index;
