import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send } from 'lucide-react';
import { contactConfig } from '../config';
import { usePrefersReducedMotion } from '../hooks/useMotionPreference';

gsap.registerPlugin(ScrollTrigger);

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Introduce al menos 2 caracteres'),
  email: z.string().trim().email('Email no válido'),
  projectType: z.string().min(1, 'Selecciona un servicio'),
  message: z.string().max(2000).optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const inputsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  );
  const reduceMotion = usePrefersReducedMotion();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      projectType: '',
      message: '',
    },
  });

  const nameVal = watch('name');
  const emailVal = watch('email');
  const projectTypeVal = watch('projectType');
  const messageVal = watch('message');

  const nameField = register('name');
  const emailField = register('email');
  const projectTypeField = register('projectType');
  const messageField = register('message');

  useEffect(() => {
    if (!contactConfig.title || reduceMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        const tl = gsap.timeline();

        tl.fromTo(
          dividerRef.current,
          { height: 0 },
          { height: '100%', duration: 1.2, ease: 'expo.inOut' }
        );

        tl.fromTo(
          formRef.current,
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'expo.out' },
          '-=0.8'
        );

        tl.fromTo(
          imageRef.current,
          {
            scale: 1.1,
            clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
          },
          {
            scale: 1,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 1,
            ease: 'expo.out',
          },
          '-=0.6'
        );

        if (titleRef.current) {
          const chars = titleRef.current.querySelectorAll('.char');
          tl.fromTo(
            chars,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.03,
              ease: 'power2.out',
            },
            '-=0.7'
          );
        }

        tl.fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.5'
        );

        inputsRef.current.forEach((input, i) => {
          if (input) {
            tl.fromTo(
              input,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
              `-=${0.4 - i * 0.1}`
            );
          }
        });

        tl.fromTo(
          buttonRef.current,
          { scale: 0 },
          { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' },
          '-=0.3'
        );
      },
      once: true,
    });
    triggersRef.current.push(trigger);

    const parallaxTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        if (imageRef.current) {
          gsap.set(imageRef.current, {
            y: -30 + self.progress * 60,
          });
        }
      },
    });
    triggersRef.current.push(parallaxTrigger);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, [reduceMotion]);

  if (!contactConfig.title) return null;

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitStatus('idle');
    const endpoint = import.meta.env.VITE_CONTACT_FORM_URL?.trim();

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            service: data.projectType,
            message: data.message ?? '',
          }),
        });
        if (!res.ok) throw new Error('bad response');
      } else {
        const subject = encodeURIComponent(
          `Reserva UrbakBlade – ${data.projectType}`
        );
        const body = encodeURIComponent(
          `Nombre: ${data.name}\nEmail: ${data.email}\nServicio: ${data.projectType}\n\n${data.message || '(sin mensaje)'}`
        );
        window.location.assign(
          `mailto:${contactConfig.contactEmail}?subject=${subject}&body=${body}`
        );
      }
      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    }
  };

  const titleChars = contactConfig.title.split('');

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 px-8 lg:px-16 bg-theme-primary overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 relative">
          <div
            ref={dividerRef}
            className="hidden lg:block absolute left-1/2 top-0 w-px bg-theme-primary/20"
            style={{
              transform: 'rotate(12deg) translateX(-50%)',
              transformOrigin: 'top center',
              willChange: 'height',
            }}
            aria-hidden
          />

          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="relative z-10"
            noValidate
            aria-label="Formulario de reserva"
          >
            <h2
              ref={titleRef}
              className="text-h2 lg:text-h1 text-theme-primary font-medium mb-4"
            >
              {titleChars.map((char, i) => (
                <span key={i} className="char inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h2>

            <p
              ref={subtitleRef}
              className="text-body-lg text-theme-secondary mb-12"
            >
              {contactConfig.subtitle}
            </p>

            {submitStatus === 'success' && (
              <p
                className="mb-6 text-body text-highlight"
                role="status"
                aria-live="polite"
              >
                {!import.meta.env.VITE_CONTACT_FORM_URL?.trim()
                  ? `${contactConfig.successMessage} ${contactConfig.mailtoFallbackMessage}`
                  : contactConfig.successMessage}
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="mb-6 text-body text-red-500" role="alert">
                {contactConfig.errorMessage}
              </p>
            )}

            <div className="space-y-8">
              <div
                ref={(el) => {
                  inputsRef.current[0] = el;
                }}
                className="relative"
              >
                <label
                  htmlFor="contact-name"
                  className={`absolute left-0 transition-all duration-200 ${
                    focusedField === 'name' || nameVal
                      ? '-top-6 text-body-sm text-theme-primary'
                      : 'top-3 text-body text-theme-muted'
                  }`}
                >
                  {contactConfig.nameLabel}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={
                    errors.name ? 'contact-name-error' : undefined
                  }
                  className="w-full bg-transparent border-b border-theme-primary/20 py-3 text-theme-primary focus:outline-none focus:border-theme-primary transition-colors duration-300"
                  name={nameField.name}
                  ref={nameField.ref}
                  onChange={nameField.onChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={(e) => {
                    void nameField.onBlur(e);
                    setFocusedField(null);
                  }}
                />
                {errors.name && (
                  <p
                    id="contact-name-error"
                    className="mt-1 text-body-sm text-red-500"
                    role="alert"
                  >
                    {errors.name.message}
                  </p>
                )}
                <div
                  className={`absolute bottom-0 left-0 h-px bg-theme-primary transition-all duration-300 ${
                    focusedField === 'name' ? 'w-full' : 'w-0'
                  }`}
                  aria-hidden
                />
              </div>

              <div
                ref={(el) => {
                  inputsRef.current[1] = el;
                }}
                className="relative"
              >
                <label
                  htmlFor="contact-email"
                  className={`absolute left-0 transition-all duration-200 ${
                    focusedField === 'email' || emailVal
                      ? '-top-6 text-body-sm text-theme-primary'
                      : 'top-3 text-body text-theme-muted'
                  }`}
                >
                  {contactConfig.emailLabel}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={
                    errors.email ? 'contact-email-error' : undefined
                  }
                  className="w-full bg-transparent border-b border-theme-primary/20 py-3 text-theme-primary focus:outline-none focus:border-theme-primary transition-colors duration-300"
                  name={emailField.name}
                  ref={emailField.ref}
                  onChange={emailField.onChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={(e) => {
                    void emailField.onBlur(e);
                    setFocusedField(null);
                  }}
                />
                {errors.email && (
                  <p
                    id="contact-email-error"
                    className="mt-1 text-body-sm text-red-500"
                    role="alert"
                  >
                    {errors.email.message}
                  </p>
                )}
                <div
                  className={`absolute bottom-0 left-0 h-px bg-theme-primary transition-all duration-300 ${
                    focusedField === 'email' ? 'w-full' : 'w-0'
                  }`}
                  aria-hidden
                />
              </div>

              <div
                ref={(el) => {
                  inputsRef.current[2] = el;
                }}
                className="relative"
              >
                <label
                  htmlFor="contact-service"
                  className={`absolute left-0 transition-all duration-200 ${
                    focusedField === 'projectType' || projectTypeVal
                      ? '-top-6 text-body-sm text-theme-primary'
                      : 'top-3 text-body text-theme-muted'
                  }`}
                >
                  {contactConfig.projectTypeLabel}
                </label>
                <select
                  id="contact-service"
                  aria-invalid={errors.projectType ? true : undefined}
                  aria-describedby={
                    errors.projectType ? 'contact-service-error' : undefined
                  }
                  className="w-full bg-transparent border-b border-theme-primary/20 py-3 text-theme-primary focus:outline-none focus:border-theme-primary transition-colors duration-300 appearance-none cursor-pointer"
                  name={projectTypeField.name}
                  ref={projectTypeField.ref}
                  onChange={projectTypeField.onChange}
                  onFocus={() => setFocusedField('projectType')}
                  onBlur={(e) => {
                    void projectTypeField.onBlur(e);
                    setFocusedField(null);
                  }}
                >
                  <option value="" className="bg-theme-primary">
                    {contactConfig.projectTypePlaceholder}
                  </option>
                  {contactConfig.projectTypeOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-theme-primary"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <p
                    id="contact-service-error"
                    className="mt-1 text-body-sm text-red-500"
                    role="alert"
                  >
                    {errors.projectType.message}
                  </p>
                )}
                <div
                  className={`absolute bottom-0 left-0 h-px bg-theme-primary transition-all duration-300 ${
                    focusedField === 'projectType' ? 'w-full' : 'w-0'
                  }`}
                  aria-hidden
                />
              </div>

              <div
                ref={(el) => {
                  inputsRef.current[3] = el;
                }}
                className="relative"
              >
                <label
                  htmlFor="contact-message"
                  className={`absolute left-0 transition-all duration-200 ${
                    focusedField === 'message' || messageVal
                      ? '-top-6 text-body-sm text-theme-primary'
                      : 'top-3 text-body text-theme-muted'
                  }`}
                >
                  {contactConfig.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={
                    errors.message ? 'contact-message-error' : undefined
                  }
                  className="w-full bg-transparent border-b border-theme-primary/20 py-3 text-theme-primary focus:outline-none focus:border-theme-primary transition-colors duration-300 resize-none"
                  name={messageField.name}
                  ref={messageField.ref}
                  onChange={messageField.onChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={(e) => {
                    void messageField.onBlur(e);
                    setFocusedField(null);
                  }}
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    className="mt-1 text-body-sm text-red-500"
                    role="alert"
                  >
                    {errors.message.message}
                  </p>
                )}
                <div
                  className={`absolute bottom-0 left-0 h-px bg-theme-primary transition-all duration-300 ${
                    focusedField === 'message' ? 'w-full' : 'w-0'
                  }`}
                  aria-hidden
                />
              </div>
            </div>

            <button
              ref={buttonRef}
              type="submit"
              disabled={isSubmitting}
              className="mt-12 px-10 py-4 bg-theme-primary text-theme-primary text-body font-medium flex items-center gap-3 hover:bg-highlight hover:text-white transition-colors duration-300 relative overflow-hidden group disabled:opacity-60 disabled:pointer-events-none"
            >
              <span className="relative z-10">
                {isSubmitting ? contactConfig.sendingLabel : contactConfig.submitButtonText}
              </span>
              <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-highlight transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </button>
          </form>

          <div
            ref={imageRef}
            className="relative aspect-[2/3] lg:aspect-auto overflow-hidden"
            style={{ willChange: 'transform, clip-path' }}
          >
            <img
              src={contactConfig.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />

            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-highlight/20" aria-hidden />
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-theme-primary/5" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
