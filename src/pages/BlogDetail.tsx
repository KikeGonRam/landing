import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import { blogConfig } from '../config';
import { SEO } from '../components/SEO';
import { Magnetic } from '../components/Magnetic';
import { Footer } from '../sections/Footer';

export function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Find the post by slug
  const post = blogConfig.posts.find(p => p.url?.split('/').pop() === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const tl = gsap.timeline();
    
    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }
    );
    
    tl.fromTo(contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    );
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-theme-primary text-theme-primary">
        <h1 className="text-h2 mb-8">Post no encontrado</h1>
        <Link to="/" className="px-8 py-3 bg-highlight text-white hover:bg-highlight/90 transition-colors">
          Volver al Inicio
        </Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-theme-primary transition-colors duration-300">
      <SEO title={post.title} description={post.excerpt} ogImage={post.image} />
      
      {/* Header Image Section */}
      <header ref={headerRef} className="relative h-[60vh] lg:h-[70vh] w-full overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-theme-primary via-theme-primary/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-24 max-w-7xl mx-auto">
          <div className="mb-8">
            <Magnetic strength={0.2}>
              <Link to="/" className="flex items-center gap-2 text-theme-secondary hover:text-theme-primary transition-colors mb-8 group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Volver al inicio
              </Link>
            </Magnetic>
            
            <span className="px-4 py-2 bg-highlight text-white text-sm uppercase tracking-widest font-medium mb-6 inline-block">
              {post.category}
            </span>
            <h1 className="text-h2 lg:text-display-md text-theme-primary font-medium tracking-tight mb-8">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-8 text-theme-muted text-body-sm">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {blogConfig.readTimePrefix}{post.readTime}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <button className="flex items-center gap-2 hover:text-theme-primary transition-colors">
                <Share2 className="w-4 h-4" />
                Compartir
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content Section */}
      <main ref={contentRef} className="max-w-4xl mx-auto px-8 lg:px-0 py-24">
        <div className="prose prose-xl prose-invert max-w-none text-theme-secondary leading-relaxed space-y-8">
          <p className="text-h4 lg:text-h3 font-light text-theme-primary italic border-l-4 border-highlight pl-8 mb-12">
            {post.excerpt}
          </p>
          
          <p>
            En UrbakBlade entendemos que el cuidado personal masculino ha evolucionado. Ya no se trata solo de un corte rápido, sino de una experiencia que define tu estilo y confianza. En este artículo exploraremos profundamente los detalles que hacen que un servicio sea excepcional.
          </p>
          
          <h2 className="text-h3 text-theme-primary pt-8">La técnica y el arte</h2>
          <p>
            Cada herramienta que utilizamos, desde la navaja más afilada hasta las tijeras de precisión, tiene un propósito único. Nuestros barberos pasan horas perfeccionando sus habilidades para asegurar que cada trazo sea perfecto. El arte de la barbería es una danza entre la tradición y la innovación.
          </p>
          
          <div className="aspect-video w-full bg-theme-secondary/10 overflow-hidden my-12">
             <img src="/hero-main.jpg" alt="Barbería" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
          
          <p>
            No importa si prefieres un look clásico de los años 50 o un degradado urbano moderno, el secreto está en los detalles. La forma de tu rostro, la textura de tu cabello y tu estilo de vida son factores que consideramos antes de que la primera cuchilla toque tu piel.
          </p>
          
          <blockquote className="bg-theme-secondary/5 p-12 rounded-lg border-t-2 border-highlight">
            "El estilo es una forma de decir quién eres sin tener que hablar." — Un gran barbero de UrbakBlade.
          </blockquote>
          
          <p>
            Esperamos que esta guía te ayude a comprender mejor las posibilidades de tu próximo cambio de look. Te esperamos pronto en nuestras sillas para vivir la experiencia completa.
          </p>
        </div>
        
        {/* Next posts suggestions or similar could go here */}
        <div className="mt-24 pt-12 border-t border-theme-primary/10 flex justify-between items-center">
          <Link to="/" className="text-theme-primary font-medium hover:text-highlight transition-colors">
            ← Anterior Post
          </Link>
          <Link to="/" className="text-theme-primary font-medium hover:text-highlight transition-colors">
            Siguiente Post →
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
