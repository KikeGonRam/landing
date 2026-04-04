// ============================================================================
// Site Configuration
// ============================================================================

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "UrbakBlade | Barbería de Élite",
  description: "UrbakBlade - La barbería donde el estilo urbano encuentra la precisión del filo. Cortes clásicos, degradados modernos y cuidado de barba.",
  language: "es",
};

/** SEO y redes: la URL canónica en producción debe coincidir con `VITE_SITE_URL` en `.env`. */
export interface SiteMetaConfig {
  /** Ruta de imagen Open Graph bajo `/public` (ej. /hero-main.jpg). */
  ogImage: string;
  twitterSite?: string;
}

export const siteMeta: SiteMetaConfig = {
  ogImage: "/hero-main.jpg",
  twitterSite: "@urbakblade",
};

// ============================================================================
// Navigation Configuration
// ============================================================================

export interface NavItem {
  label: string;
  href: string;
}

export interface NavigationConfig {
  logo: string;
  items: NavItem[];
}

export const navigationConfig: NavigationConfig = {
  logo: "URBAKBLADE",
  items: [
    { label: "Inicio", href: "#hero" },
    { label: "Nosotros", href: "#about" },
    { label: "Galería", href: "#works" },
    { label: "Servicios", href: "#services" },
    { label: "Precios", href: "#pricing" },
    { label: "Contacto", href: "#contact" },
  ],
};

// ============================================================================
// Hero Section Configuration
// ============================================================================

export interface HeroConfig {
  title: string;
  subtitle: string;
  backgroundImage: string;
  servicesLabel: string;
  copyright: string;
}

export const heroConfig: HeroConfig = {
  title: "URBAKBLADE",
  subtitle: "Donde el Estilo Urbano Encuentra el Filo",
  backgroundImage: "/hero-main.jpg",
  servicesLabel: "Cortes | Barba | Estilo",
  copyright: "© 2026 UrbakBlade",
};

// ============================================================================
// About Section Configuration
// ============================================================================

export interface AboutConfig {
  titleLine1: string;
  titleLine2: string;
  description: string;
  image1: string;
  image1Alt: string;
  image2: string;
  image2Alt: string;
  authorImage: string;
  authorName: string;
  authorBio: string;
}

export const aboutConfig: AboutConfig = {
  titleLine1: "Más que una barbería,",
  titleLine2: "somos artesanos del estilo masculino.",
  description: "En UrbakBlade combinamos técnicas tradicionales con las últimas tendencias urbanas. Cada corte es una obra de arte, cada cliente es único. Nuestro espacio está diseñado para que disfrutes de una experiencia de cuidado personal incomparable.",
  image1: "/about-1.jpg",
  image1Alt: "Interior de la barbería UrbakBlade",
  image2: "/about-2.jpg",
  image2Alt: "Barbero trabajando con precisión",
  authorImage: "/barber-master.jpg",
  authorName: "Carlos 'Blade' Martínez",
  authorBio: "Con más de 15 años de experiencia, Carlos ha perfeccionado el arte del corte masculino. Formado en las mejores barberías de Nueva York y Londres, trae a UrbakBlade su pasión por la precisión y el estilo.",
};

// ============================================================================
// Works Section Configuration
// ============================================================================

export interface WorkItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface WorksConfig {
  title: string;
  subtitle: string;
  projects: WorkItem[];
}

export const worksConfig: WorksConfig = {
  title: "Nuestros Trabajos",
  subtitle: "Una selección de nuestros mejores cortes y estilos.",
  projects: [
    { id: 1, title: "Fade Urbano", category: "Degradado", image: "/work-1.jpg" },
    { id: 2, title: "Clásico Moderno", category: "Corte Clásico", image: "/work-2.jpg" },
    { id: 3, title: "Texturizado", category: "Estilo Libre", image: "/work-3.jpg" },
    { id: 4, title: "Barba Perfecta", category: "Afeitado", image: "/work-4.jpg" },
  ],
};

// ============================================================================
// Services Section Configuration
// ============================================================================

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ServicesConfig {
  title: string;
  subtitle: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  title: "Nuestros Servicios",
  subtitle: "Cada servicio es una experiencia diseñada para realzar tu estilo.",
  services: [
    { 
      id: "01", 
      title: "Corte de Cabello", 
      description: "Desde clásicos atemporales hasta los últimos trends urbanos. Incluye lavado, corte a máquina y/o tijera, y styling final.", 
      image: "/service-1.jpg" 
    },
    { 
      id: "02", 
      title: "Arreglo de Barba", 
      description: "Diseño y mantenimiento de barba con navaja, toallas calientes y productos premium para un acabado impecable.", 
      image: "/service-2.jpg" 
    },
    { 
      id: "03", 
      title: "Afeitado Tradicional", 
      description: "La experiencia clásica de barbero: toallas calientes, espuma, navaja y cuidados post-afeitado.", 
      image: "/service-3.jpg" 
    },
    { 
      id: "04", 
      title: "Combo Completo", 
      description: "Corte de cabello + arreglo de barba. La experiencia completa UrbakBlade para lucir impecable.", 
      image: "/service-4.jpg" 
    },
  ],
};

// ============================================================================
// Testimonials Section Configuration
// ============================================================================

export interface TestimonialItem {
  id: number;
  name: string;
  title: string;
  quote: string;
  image: string;
}

export interface TestimonialsConfig {
  title: string;
  testimonials: TestimonialItem[];
}

export const testimonialsConfig: TestimonialsConfig = {
  title: "Lo Que Dicen Nuestros Clientes",
  testimonials: [
    { 
      id: 1, 
      name: "Miguel Ángel Ruiz", 
      title: "Cliente Regular", 
      quote: "UrbakBlade cambió mi forma de ver las barberías. No es solo un corte, es toda una experiencia. Carlos entiende exactamente lo que quiero.", 
      image: "/testimonial-1.jpg" 
    },
    { 
      id: 2, 
      name: "Diego Hernández", 
      title: "Empresario", 
      quote: "La atención al detalle es increíble. Desde el momento en que entras, sabes que estás en buenas manos. Mi barba nunca se había visto mejor.", 
      image: "/testimonial-2.jpg" 
    },
    { 
      id: 3, 
      name: "Andrés López", 
      title: "Músico", 
      quote: "El ambiente es genial, la música es perfecta y el resultado siempre supera mis expectativas. UrbakBlade es mi lugar de confianza.", 
      image: "/testimonial-3.jpg" 
    },
  ],
};

// ============================================================================
// Pricing Section Configuration
// ============================================================================

export interface PricingPlan {
  id: number;
  name: string;
  price: number;
  unit: string;
  featured: boolean;
  features: string[];
}

export interface PricingConfig {
  title: string;
  subtitle: string;
  ctaButtonText: string;
  plans: PricingPlan[];
}

export const pricingConfig: PricingConfig = {
  title: "Nuestros Precios",
  subtitle: "Calidad premium a precios justos. Elige el plan que se adapte a tus necesidades.",
  ctaButtonText: "Reservar",
  plans: [
    { 
      id: 1, 
      name: "Básico", 
      price: 25, 
      unit: "por visita", 
      featured: false, 
      features: [
        "Corte de cabello",
        "Lavado incluido",
        "Styling básico",
        "Bebida de cortesía"
      ] 
    },
    { 
      id: 2, 
      name: "Premium", 
      price: 45, 
      unit: "por visita", 
      featured: true, 
      features: [
        "Corte de cabello premium",
        "Arreglo de barba",
        "Tratamiento capilar",
        "Bebida premium",
        "Productos de cuidado"
      ] 
    },
    { 
      id: 3, 
      name: "VIP", 
      price: 75, 
      unit: "por visita", 
      featured: false, 
      features: [
        "Corte de cabello exclusivo",
        "Afeitado tradicional",
        "Tratamiento facial",
        "Bebida premium",
        "Kit de productos",
        "Prioridad de reserva"
      ] 
    },
  ],
};

// ============================================================================
// FAQ Section Configuration
// ============================================================================

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQConfig {
  title: string;
  faqs: FAQItem[];
}

export const faqConfig: FAQConfig = {
  title: "Preguntas Frecuentes",
  faqs: [
    { 
      question: "¿Necesito reservar cita previa?", 
      answer: "Sí, recomendamos reservar con al menos 24-48 horas de anticipación para asegurar tu lugar. Puedes hacerlo a través de nuestro formulario de contacto o llamando directamente." 
    },
    { 
      question: "¿Cuánto dura un corte típico?", 
      answer: "Un corte estándar dura entre 30-45 minutos. Los servicios premium como el afeitado tradicional o el combo completo pueden tomar hasta 60-75 minutos." 
    },
    { 
      question: "¿Qué productos utilizan?", 
      answer: "Trabajamos exclusivamente con marcas premium como American Crew, Reuzel, y productos orgánicos seleccionados. Todos nuestros productos son de la más alta calidad." 
    },
    { 
      question: "¿Tienen estacionamiento?", 
      answer: "Sí, contamos con estacionamiento gratuito para nuestros clientes justo frente a la barbería. También hay opciones de estacionamiento en la calle." 
    },
    { 
      question: "¿Aceptan pagos con tarjeta?", 
      answer: "Sí, aceptamos todas las tarjetas de crédito y débito principales, así como pagos digitales como Apple Pay y Google Pay." 
    },
  ],
};

// ============================================================================
// Blog Section Configuration
// ============================================================================

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  image: string;
  category: string;
  url?: string;
}

export interface BlogConfig {
  title: string;
  subtitle: string;
  allPostsLabel: string;
  readMoreLabel: string;
  readTimePrefix: string;
  posts: BlogPost[];
  allPostsUrl?: string;
}

export const blogConfig: BlogConfig = {
  title: "Blog de Estilo",
  subtitle: "Consejos, tendencias y cultura de la barbería moderna.",
  allPostsLabel: "Ver Todos",
  allPostsUrl: "/blog",
  readMoreLabel: "Leer Más",
  readTimePrefix: "Lectura: ",
  posts: [
    { 
      id: 1, 
      title: "Guía del Fade Perfecto", 
      excerpt: "Descubre los diferentes tipos de degradados y cómo elegir el que mejor se adapte a tu tipo de rostro y estilo de vida.", 
      readTime: "5 min", 
      date: "15 Mar, 2026", 
      image: "/blog-1.jpg", 
      category: "Consejos",
      url: "/blog/guia-del-fade-perfecto"
    },
    { 
      id: 2, 
      title: "Cuidado de la Barba en Invierno", 
      excerpt: "El frío puede dañar tu barba. Aprende los mejores trucos y productos para mantenerla saludable y con buen aspecto durante todo el año.", 
      readTime: "4 min", 
      date: "10 Mar, 2026", 
      image: "/blog-2.jpg", 
      category: "Cuidado",
      url: "/blog/cuidado-de-la-barba-invierno"
    },
  ],
};

// ============================================================================
// Contact Section Configuration
// ============================================================================

export interface ContactFormOption {
  value: string;
  label: string;
}

export interface ContactConfig {
  title: string;
  subtitle: string;
  nameLabel: string;
  emailLabel: string;
  projectTypeLabel: string;
  projectTypePlaceholder: string;
  projectTypeOptions: ContactFormOption[];
  messageLabel: string;
  submitButtonText: string;
  image: string;
  /** Email para modo `mailto:` cuando no hay `VITE_CONTACT_FORM_URL`. */
  contactEmail: string;
  sendingLabel: string;
  successMessage: string;
  errorMessage: string;
  mailtoFallbackMessage: string;
}

export const contactConfig: ContactConfig = {
  title: "Reserva Tu Cita",
  subtitle: "Déjanos tus datos y nos pondremos en contacto para confirmar tu reserva.",
  nameLabel: "Nombre *",
  emailLabel: "Email *",
  projectTypeLabel: "Tipo de Servicio",
  projectTypePlaceholder: "Selecciona...",
  projectTypeOptions: [
    { value: "corte", label: "Corte de Cabello" },
    { value: "barba", label: "Arreglo de Barba" },
    { value: "afeitado", label: "Afeitado Tradicional" },
    { value: "combo", label: "Combo Completo" },
    { value: "vip", label: "Experiencia VIP" },
  ],
  messageLabel: "Mensaje (opcional)",
  submitButtonText: "Enviar Reserva",
  image: "/contact.jpg",
  contactEmail: "reservas@urbakblade.com",
  sendingLabel: "Enviando…",
  successMessage: "Gracias. Hemos recibido tu solicitud.",
  errorMessage: "No se pudo enviar. Inténtalo de nuevo o escríbenos por email.",
  mailtoFallbackMessage: "Se abrirá tu aplicación de correo con el mensaje preparado.",
};

// ============================================================================
// Footer Configuration
// ============================================================================

export interface FooterLink {
  label: string;
  href: string;
  icon?: string;
}

export interface FooterConfig {
  marqueeText: string;
  marqueeHighlightChars: string[];
  navLinks1: FooterLink[];
  navLinks2: FooterLink[];
  ctaText: string;
  ctaHref: string;
  copyright: string;
  tagline: string;
}

export const footerConfig: FooterConfig = {
  marqueeText: "Tu Estilo Nuestro Arte",
  marqueeHighlightChars: ["E", "A"],
  navLinks1: [
    { label: "Inicio", href: "#hero" },
    { label: "Nosotros", href: "#about" },
    { label: "Galería", href: "#works" },
    { label: "Servicios", href: "#services" },
  ],
  navLinks2: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/urbakblade",
      icon: "Instagram",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/urbakblade",
      icon: "Facebook",
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@urbakblade",
      icon: "Music",
    },
  ],
  ctaText: "Reservar Ahora",
  ctaHref: "#contact",
  copyright: "© 2026 UrbakBlade. Todos los derechos reservados.",
  tagline: "Crafted with passion",
};
