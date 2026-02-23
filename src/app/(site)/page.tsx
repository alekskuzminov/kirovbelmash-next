import Hero from '@/components/home/Hero';
import Products from '@/components/home/Products';
import EquipmentCatalog from '@/components/home/EquipmentCatalog';
import Advantages from '@/components/home/Advantages';
import Projects from '@/components/home/Projects';
import ContactForm from '@/components/home/ContactForm';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            <Hero />
            <Products />
            <EquipmentCatalog />
            <Advantages />
            <Projects />
            <ContactForm />
        </div>
    );
}
