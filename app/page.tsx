import { Navbar } from '@/src/components/Navbar';
import { Footer } from '@/src/components/Footer';
import { Hero } from '@/src/components/Hero';
import { About } from '@/src/components/About';
import { Projects } from '@/src/components/Projects';
import { Contact } from '@/src/components/Contact';
import { PortfolioChat } from '@/src/components/PortfolioChat';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Contact />
        <PortfolioChat />
      </main>
      <Footer />
    </>
  );
}
