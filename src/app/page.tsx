"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const specialties = [
  { name: "Fisioterapia y Kinesiología", icon: "M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" },
  { name: "Cirugía Ósea", icon: "M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z" },
  { name: "Dermatología", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" },
  { name: "Laparoscopia", icon: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" },
  { name: "Ginecología", icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" },
  { name: "Instrumentos Cardiovasculares", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" },
  { name: "Laringe", icon: "M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" },
  { name: "Intestinos", icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" },
  { name: "Neurocirugía", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-9h10v2H7z" },
  { name: "Oftalmología", icon: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" },
  { name: "Otología", icon: "M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" },
  { name: "Traqueotomía", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" },
  { name: "Urología", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" },
  { name: "Cirugía Digestiva", icon: "M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z" },
  { name: "Laserterapia", icon: "M7 2v11h3v9l7-12h-4l4-8z" },
  { name: "Magnetoterapia", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" },
  { name: "Electroterapia", icon: "M7 2v11h3v9l7-12h-4l4-8z" },
];

const brands = [
  { name: "ZEPF Instruments", logo: "/zepf_logo.png", desc: "Instrumental quirúrgico de precisión alemana" },
  { name: "Tontarra", logo: "/tontarra_logo.jpg", desc: "Equipos médicos de alta tecnología" },
  { name: "Zimmer Medizinsysteme", logo: "/zimmer_logo.png", desc: "Soluciones médicas innovadoras" },
  { name: "Alsa Bologna", logo: "/ALSA-bologna_logo.webp", desc: "Tecnología médica italiana de excelencia" },
  { name: "i-Tech Medical Division", logo: "/i-tech_logo.png", desc: "División médica de vanguardia" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      let current = "inicio";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id") || "inicio";
        }
      });
      setActiveSection(current);

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="min-h-screen bg-white">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-sm shadow-[0_4px_20px_rgba(26,26,46,0.15)]" : "bg-white/95 backdrop-blur-sm shadow-sm"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[72px]">
          <button onClick={() => scrollTo("inicio")} className="flex items-center">
            <Image src="/easy_medical_logo.svg" alt="Easy Medical Equipos Médicos" height={44} width={160} className="h-[44px] w-auto" priority />
          </button>
          <nav className="hidden md:block">
            <ul className="flex gap-8">
              {[
                { id: "inicio", label: "Inicio" },
                { id: "especialidades", label: "Especialidades" },
                { id: "marcas", label: "Marcas" },
                { id: "productos", label: "Productos" },
                { id: "contacto", label: "Contacto" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`font-medium text-sm transition-colors relative pb-1 ${activeSection === item.id ? "text-[#6ea6e3] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#6ea6e3] after:rounded" : "text-[#4a8bd4] hover:text-[#6ea6e3]"}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden md:flex gap-4">
            <a href="tel:70765126" className="flex items-center gap-1.5 text-[#4a8bd4] font-semibold text-sm hover:text-[#6ea6e3] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              70765126
            </a>
            <a href="tel:69598108" className="flex items-center gap-1.5 text-[#4a8bd4] font-semibold text-sm hover:text-[#6ea6e3] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              69598108
            </a>
          </div>
          <button className="md:hidden flex flex-col gap-1 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${menuOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
          </button>
        </div>
        {menuOpen && (
          <nav className="md:hidden bg-white border-t shadow-lg">
            <ul className="px-6 py-4 space-y-4">
              {[
                { id: "inicio", label: "Inicio" },
                { id: "especialidades", label: "Especialidades" },
                { id: "marcas", label: "Marcas" },
                { id: "productos", label: "Productos" },
                { id: "contacto", label: "Contacto" },
              ].map((item) => (
                <li key={item.id}>
                  <button onClick={() => scrollTo(item.id)} className="block w-full text-left font-medium text-[#4a8bd4] hover:text-[#6ea6e3]">
                    {item.label}
                </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <div className="fixed top-[72px] left-0 right-0 h-[3px] z-50 bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#6ea6e3] via-[#4a8bd4] to-[#9cc4ef] shadow-[0_0_8px_rgba(110,166,227,0.6)] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80"
            alt="Equipo médico moderno"
            fill
            className={`object-cover transition-all duration-1000 ${heroLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#6ea6e3]/70 via-[#4a8bd4]/60 to-[#9cc4ef]/50"></div>
        </div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[length:24px_24px]"></div>
        <div className={`relative z-10 max-w-7xl mx-auto px-6 pt-[72px] w-full transition-all duration-1000 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="shrink-0">
              <div className="metallic-border rounded-2xl p-4">
                <Image
                  src="/easy_medical_logo.svg"
                  alt="Easy Medical Equipos Médicos"
                  height={280}
                  width={280}
                  className="metallic-logo w-[220px] h-[220px] md:w-[300px] md:h-[300px] object-contain drop-shadow-[0_8px_25px_rgba(26,26,46,0.3)]"
                  priority
                />
              </div>
            </div>
            <div className="text-center md:text-left text-white">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                <span className="shimmer-text">Calidad, Precisión, Confianza</span>
              </h1>
              <p className="text-xl md:text-2xl font-medium mb-5 opacity-95">Tu aliado en cada procedimiento</p>
              <p className="text-base md:text-lg max-w-2xl mb-9 opacity-90 leading-relaxed md:mx-0 mx-auto">Equipamiento médico, instrumental y soluciones profesionales para fisioterapia, kinesiología, instrumental médico y equipamiento para quirófano. Productos alemanes de importación con los más altos estándares.</p>
              <div className="flex gap-4 justify-center md:justify-start flex-wrap">
                <button onClick={() => scrollTo("productos")} className="px-8 py-3.5 rounded-full bg-white text-[#6ea6e3] font-semibold hover:bg-gray-100 hover:-translate-y-0.5 transition-all shadow-[0_4px_15px_rgba(26,26,46,0.2)]">Ver Productos</button>
                <button onClick={() => scrollTo("contacto")} className="px-8 py-3.5 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-[#6ea6e3] transition-all shadow-[0_4px_15px_rgba(26,26,46,0.15)]">Contáctanos</button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white text-sm opacity-80">
          <span>Desliza</span>
          <div className="w-6 h-10 border-2 border-white/60 rounded-xl relative">
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1 h-2 bg-white rounded animate-bounce"></div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#1a1a2e]/5 via-white to-[#16213e]/5">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-3">¿Quiénes Somos?</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#6ea6e3] via-[#9cc4ef] to-[#4a8bd4] mx-auto rounded"></div>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection className="space-y-5 text-gray-600 leading-relaxed">
              <p><strong className="text-gray-900">Easy Medical Equipos Médicos</strong> es una empresa boliviana especializada en equipamiento médico, instrumental y soluciones profesionales para fisioterapia, kinesiología, instrumental médico y equipamiento para quirófano.</p>
              <p>Trabajamos con marcas profesionales europeas de reconocido prestigio como <strong className="text-gray-900">ZEPF Instruments</strong>, <strong className="text-gray-900">Tontarra</strong>, <strong className="text-gray-900">Zimmer Medizinsysteme</strong>, <strong className="text-gray-900">Alsa Bologna</strong> e <strong className="text-gray-900">i-Tech Medical Division</strong>, trayendo productos directamente desde Alemania con los más altos estándares de calidad.</p>
              <p>Contamos con dos sucursales en Bolivia: <strong className="text-gray-900">Santa Cruz</strong> y <strong className="text-gray-900">Cochabamba</strong>, para brindarte atención personalizada y soporte técnico especializado.</p>
            </AnimatedSection>
            <AnimatedSection delay={150} className="space-y-6">
              {[
                { title: "Importación Directa", desc: "Productos alemanes originales con garantía y certificación internacional.", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
                { title: "Garantía y Soporte", desc: "Soporte técnico especializado y garantía en todos nuestros equipos.", icon: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" },
                { title: "Atención Personalizada", desc: "Asesoría profesional para equipar tu clínica u hospital.", icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" },
              ].map((f) => (
                <div key={f.title} className="card-metallic bg-gradient-to-br from-[#e8f1fb] to-white rounded-xl p-7 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(26,26,46,0.12)] transition-all border border-transparent hover:border-[#9cc4ef]">
                  <div className="text-[#6ea6e3] mb-3">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d={f.icon}/></svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm">{f.desc}</p>
                </div>
              ))}
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="especialidades" className="py-20 bg-gradient-to-br from-[#16213e]/5 via-gray-50 to-[#1a1a2e]/5">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-3">Especialidades</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#6ea6e3] via-[#9cc4ef] to-[#4a8bd4] mx-auto rounded mb-4"></div>
              <p className="text-gray-600 max-w-xl mx-auto">Soluciones integrales para cada área médica</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {specialties.map((s, i) => (
              <AnimatedSection key={s.name} delay={i * 50}>
                <div className="card-metallic bg-white rounded-xl p-5 text-center hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(110,166,227,0.15)] transition-all border border-gray-200 hover:border-[#6ea6e3] cursor-default h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#e8f1fb] to-[#9cc4ef]/30 rounded-full flex items-center justify-center mx-auto mb-3 text-[#6ea6e3]">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d={s.icon}/></svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">{s.name}</h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="marcas" className="py-20 bg-gradient-to-br from-white via-[#1a1a2e]/5 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-3">Nuestras Marcas</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#6ea6e3] via-[#9cc4ef] to-[#4a8bd4] mx-auto rounded mb-4"></div>
              <p className="text-gray-600 max-w-xl mx-auto">Trabajamos con marcas profesionales europeas de prestigio mundial</p>
            </div>
          </AnimatedSection>
          <AnimatedSection className="flex justify-center mb-10">
            <div className="shimmer-badge flex items-center gap-3 text-white px-7 py-3.5 rounded-full font-semibold shadow-[0_4px_20px_rgba(110,166,227,0.4)]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              Importación Directa desde Alemania
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {brands.map((b, i) => (
              <AnimatedSection key={b.name} delay={i * 100}>
                <div className="card-metallic bg-white border border-gray-200 rounded-xl p-6 text-center hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(26,26,46,0.1)] transition-all hover:border-[#6ea6e3] h-full">
                  <div className="h-16 flex items-center justify-center mb-4">
                    <Image src={b.logo} alt={b.name} height={64} width={120} className="max-h-full max-w-full object-contain" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{b.name}</h3>
                  <p className="text-xs text-gray-500">{b.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="productos" className="py-20 bg-gradient-to-br from-[#16213e]/5 via-gray-50 to-[#1a1a2e]/5">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-3">Nuestros Productos</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#6ea6e3] via-[#9cc4ef] to-[#4a8bd4] mx-auto rounded"></div>
            </div>
          </AnimatedSection>
          <div className="space-y-12">
            <AnimatedSection>
              <div className="card-metallic grid md:grid-cols-2 gap-0 bg-white rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(26,26,46,0.1)] group">
                <div className="min-h-[300px] relative overflow-hidden">
                  <Image
                    src="/info2.png"
                    alt="Renueva tu clínica con tecnología de punta"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-10 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Renueva tu clínica con tecnología de punta</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">Equipos con ultrasonido, láser terapia, magnetoterapia y electroterapia. Tecnología alemana de última generación para tu consultorio.</p>
                  <div>
                    <button onClick={() => scrollTo("contacto")} className="px-8 py-3 rounded-full bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white font-semibold hover:from-[#16213e] hover:to-[#1a1a2e] hover:-translate-y-0.5 transition-all shadow-[0_4px_15px_rgba(26,26,46,0.2)]">Cotiza Ahora</button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={150}>
              <div className="card-metallic grid md:grid-cols-2 gap-0 bg-white rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(26,26,46,0.1)] group">
                <div className="min-h-[300px] relative overflow-hidden md:order-2">
                  <Image
                    src="/info1.png"
                    alt="Lleva tu consultorio al siguiente nivel"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-10 flex flex-col justify-center md:order-1">
                  <h3 className="text-2xl font-bold text-[#1a1a2e] mb-4">Lleva tu consultorio al siguiente nivel</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">Equipo de terapia combinada: integra ultrasonido más electroterapia en un solo equipo. Solución completa para tu práctica profesional.</p>
                  <div>
                    <button onClick={() => scrollTo("contacto")} className="px-8 py-3 rounded-full bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white font-semibold hover:from-[#16213e] hover:to-[#1a1a2e] hover:-translate-y-0.5 transition-all shadow-[0_4px_15px_rgba(26,26,46,0.2)]">Cotiza Ahora</button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#1a1a2e] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[length:24px_24px]"></div>
        <AnimatedSection className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">¿Listo para equipar tu clínica?</h2>
          <p className="text-white/90 text-lg mb-8">Contáctanos hoy y recibe asesoría profesional personalizada</p>
          <button onClick={() => scrollTo("contacto")} className="px-8 py-3.5 rounded-full bg-white text-[#1a1a2e] font-semibold hover:-translate-y-0.5 transition-all shadow-[0_4px_20px_rgba(26,26,46,0.3)]">Solicitar Cotización</button>
        </AnimatedSection>
      </section>

      <footer id="contacto" className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#1a1a2e] text-white/80 pt-16 pb-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
            <div>
              <Image src="/easy_medical_logo.svg" alt="Easy Medical" height={40} width={160} className="h-10 w-auto mb-5 brightness-0 invert" />
              <p className="text-sm leading-relaxed mb-5">Equipamiento médico, instrumental y soluciones profesionales para fisioterapia, kinesiología, instrumental médico y equipamiento para quirófano.</p>
              <a href="https://www.facebook.com/profile.php?id=61594188715143" target="_blank" rel="noopener" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-[#9cc4ef] hover:bg-[#6ea6e3] hover:text-white hover:-translate-y-0.5 transition-all inline-flex shadow-[0_2px_10px_rgba(110,166,227,0.3)]" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5">Contacto</h4>
              <ul className="space-y-3.5 text-sm">
                <li className="flex items-center gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#6ea6e3] shrink-0"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  <a href="tel:70765126" className="hover:text-[#6ea6e3] transition-colors">70765126</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#6ea6e3] shrink-0"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  <a href="tel:69598108" className="hover:text-[#6ea6e3] transition-colors">69598108</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#6ea6e3] shrink-0"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  <a href="mailto:easy.medical@hotmail.com" className="hover:text-[#6ea6e3] transition-colors">easy.medical@hotmail.com</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5">Sucursales</h4>
              <ul className="space-y-3.5 text-sm">
                <li className="flex items-start gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#6ea6e3] shrink-0 mt-0.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  <div>
                    <strong className="block text-white text-sm">Santa Cruz</strong>
                    <span className="text-xs text-gray-400">Bolivia</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#6ea6e3] shrink-0 mt-0.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  <div>
                    <strong className="block text-white text-sm">Cochabamba</strong>
                    <a href="https://maps.app.goo.gl/V13UZCVVFEeGtTCf9" target="_blank" rel="noopener" className="text-xs text-gray-400 hover:text-[#6ea6e3] transition-colors">Ver en Maps</a>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5">Horario de Atención</h4>
              <ul className="space-y-2.5 text-sm">
                <li className="flex justify-between"><span>Lunes - Viernes</span><span>8:00 - 18:00</span></li>
                <li className="flex justify-between"><span>Sábado</span><span>8:00 - 14:00</span></li>
                <li className="flex justify-between"><span>Domingo</span><span>Cerrado</span></li>
              </ul>
            </div>
          </div>
          <div className="py-6 text-center text-sm text-gray-400">
            <p>&copy; 2026 Easy Medical Equipos Médicos. Todos los derechos reservados. | Bolivia</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
