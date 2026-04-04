import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Works } from '../sections/Works';
import { Services } from '../sections/Services';
import { FAQ } from '../sections/FAQ';
import { Testimonials } from '../sections/Testimonials';
import { Pricing } from '../sections/Pricing';
import { Blog } from '../sections/Blog';
import { Contact } from '../sections/Contact';
import { Footer } from '../sections/Footer';

export function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Works />
      <Services />
      <FAQ />
      <Testimonials />
      <Pricing />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
