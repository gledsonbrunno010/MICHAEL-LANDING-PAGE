import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, MapPin, Zap, TrendingUp, Shield, CheckCircle, MessageSquare, BarChart3, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform, wrap, AnimatePresence } from "framer-motion";
import Services from "../components/Services";
import "@fontsource/montserrat/700.css";

const PROJECTS = [
  {
    id: 8,
    image: "/produto-8.jpg",
    title: "Placa em ACM para a Embaixada da União Europeira no Brasil",
    desc: "Trabalho realizado com excelencia em parceria com a A3 ComunicaClau",
    highlight: "Identidade visual única",
    sub: "Michael Cardoso – A3 Comunica CLAU"
  },
  {
    id: 1,
    image: "/produto-1.png",
    title: "Fachada em ACM Supergás Brás",
    desc: "Fachada em ACM e Letra Caixa",
    highlight: "Fachada entregue em tempo record",
    sub: "Michael Cardoso – A3 Comunica CLAU"
  },
  {
    id: 5,
    image: "/produto-5.jpg",
    title: "Ocidental Shopping",
    desc: "Toten para orientação dos clientes",
    highlight: "Projeto elaborado por A3 Comunicação",
    sub: "Michael Cardoso – A3 Comunica CLAU"
  },
  {
    id: 3,
    image: "/produto-3.png",
    title: "V&C Studios",
    desc: "Sinalização interna Completa",
    highlight: "100% de aprovação dos usuários",
    sub: "Michael Cardoso – A3 Comunica CLAU"
  },
  {
    id: 4,
    image: "/produto-4.jpg",
    title: "Sinalização Interna Shopping",
    desc: "Visibilidade única para cada ambiente",
    highlight: "Cada espaço sinalizado e aprovado pelos Bombeiros",
    sub: "Michael Cardoso – A3 Comunica CLAU"
  },
  {
    id: 2,
    image: "/produto-2.png",
    title: "UNIEURO CENTRO UNIVERSITÁRIO",
    desc: "Simbolo da Intituição realizado por nós",
    highlight: "Trabalho realizado com excelência e qualidade",
    sub: "Michael Cardoso – A3 Comunica CLAU"
  },
  {
    id: 6,
    image: "/produto-6.jpg",
    title: "EUROBIKE",
    desc: "Letra Caixa para identificação de parques ou cidades",
    highlight: "Identidade Visual bem definida",
    sub: "Michael Cardoso – A3 Comunica CLAU"
  },
  {
    id: 7,
    image: "/produto-7.jpg",
    title: "Identificação de Condomínios",
    desc: "Corte em ACM para melhor identificação da sua casa",
    highlight: "Elegância para o visual do seu condomínio",
    sub: "Michael Cardoso – A3 Comunica CLAU"
  }
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""

  });

  // Hero Carousel Logic
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 3000); // 3 seconds autoplay

    return () => clearInterval(timer);
  }, []);

  const nextHeroSlide = () => {
    setCurrentHeroIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const prevHeroSlide = () => {
    setCurrentHeroIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  // Slider Logic
  const baseX = useMotionValue(0);
  const isDragging = useRef(false);

  /* Responsive Card Width Logic */
  const [cardWidth, setCardWidth] = useState(500);

  useEffect(() => {
    const handleResize = () => {
      // Tailwind md breakpoint is 768px.
      // < 768px -> Mobile (300px cards)
      // >= 768px -> Desktop (500px cards)
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 768) {
          setCardWidth(300);
        } else {
          setCardWidth(500);
        }
      }
    };

    // Initial Set
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate total width of one set of projects
  // PROJECTS.length * (cardWidth + 32px gap)
  const contentWidth = PROJECTS.length * (cardWidth + 32);

  useAnimationFrame((t, delta) => {
    if (!isDragging.current) {
      // Move left. Speed: 0.15 * delta (approx 9px/frame at 60fps -> 540px/s)
      // Medium-Fast speed
      let moveBy = 0.15 * delta;

      // Update x
      let newX = baseX.get() - moveBy;

      // Wrap logic
      if (newX <= -contentWidth) {
        newX += contentWidth;
      } else if (newX > 0) {
        newX -= contentWidth;
      }

      baseX.set(newX);
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageClick = (src: string) => {
    if (!isDragging.current) {
      setSelectedImage(src);
    }
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
    };

    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  const handleWhatsAppClick = (message: string) => {
    // @ts-ignore
    if (window.fbq) {
      // @ts-ignore
      window.fbq('track', 'Lead');
    }
    const phoneNumber = "5561981850437";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar Fixa */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-[#003366] md:bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/logo-original.png" alt="Michael Cardoso | A3 Comunicação" className="h-20 md:h-24 w-auto object-contain" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection("hero")} className={`${scrolled ? "text-gray-700 hover:text-[#003366]" : "text-white hover:text-gray-200"} transition`}>
                Início
              </button>
              <button onClick={() => scrollToSection("about")} className={`${scrolled ? "text-gray-700 hover:text-[#003366]" : "text-white hover:text-gray-200"} transition`}>
                Quem Sou
              </button>
              <button onClick={() => scrollToSection("projects")} className={`${scrolled ? "text-gray-700 hover:text-[#003366]" : "text-white hover:text-gray-200"} transition`}>
                Projetos
              </button>
              <button onClick={() => scrollToSection("services")} className={`${scrolled ? "text-gray-700 hover:text-[#003366]" : "text-white hover:text-gray-200"} transition`}>
                Serviços
              </button>
              <button onClick={() => scrollToSection("contact")} className={`${scrolled ? "text-gray-700 hover:text-[#003366]" : "text-white hover:text-gray-200"} transition`}>
                Contato
              </button>
              <Button
                id="btn-whatsapp-navbar"
                onClick={() => {
                  // @ts-ignore
                  if (window.fbq) window.fbq('track', 'Lead');
                  handleWhatsAppClick("Olá Michael Cardoso. Vim do seu site e gostaria de fazer um orçamento, *vamos marcar um horário?*");
                }}
                className="bg-[#25D366] hover:bg-[#128C7E] text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>

            {/* Mobile Menu Button - Agora Branco */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(true)}
                className={`p-2 ${scrolled ? "text-[#003366]" : "text-white"}`}
              >
                <Menu className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay - Blue Background, White Text */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-50 bg-[#003366] md:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b border-white/10">
                  <h2 className="text-xl font-bold text-white">Menu</h2>
                  <button onClick={() => setIsMenuOpen(false)} className="text-white p-2">
                    <X className="w-8 h-8" />
                  </button>
                </div>

                <div className="flex flex-col p-6 gap-6 flex-1">
                  <button onClick={() => scrollToSection("hero")} className="text-2xl font-semibold text-white/90 hover:text-white text-left">
                    Início
                  </button>
                  <button onClick={() => scrollToSection("about")} className="text-2xl font-semibold text-white/90 hover:text-white text-left">
                    Quem Sou
                  </button>
                  <button onClick={() => scrollToSection("projects")} className="text-2xl font-semibold text-white/90 hover:text-white text-left">
                    Projetos
                  </button>
                  <button onClick={() => scrollToSection("services")} className="text-2xl font-semibold text-white/90 hover:text-white text-left">
                    Serviços
                  </button>
                  <button onClick={() => scrollToSection("contact")} className="text-2xl font-semibold text-white/90 hover:text-white text-left">
                    Contato
                  </button>

                  <div className="mt-auto">
                    <Button
                      id="btn-whatsapp-mobile"
                      onClick={() => {
                        // @ts-ignore
                        if (window.fbq) window.fbq('track', 'Lead');
                        handleWhatsAppClick("Olá Michael Cardoso. Vim do seu site e gostaria de fazer um orçamento, *vamos marcar um horário?*");
                      }}
                      className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white h-14 text-lg"
                    >
                      <MessageCircle className="w-6 h-6 mr-2" />
                      Fale no WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden bg-gradient-to-r from-[#003366] to-[#004488]">
        {/* Mobile Background */}
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center md:hidden"
          style={{
            backgroundImage: "url('/michael-cardoso.png')", // Mantendo o background, mas a imagem do Michael saiu do conteudo principal
            backgroundPosition: "center",
          }}
        />
        {/* Desktop Background - 3D Facade */}
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center hidden md:block"
          style={{
            backgroundImage: "url('/hero-3d-gif.png')",
            backgroundAttachment: "fixed",
          }}
        />
        {/* Mobile Overlay - mais escuro */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/90 to-[#004488]/90 md:hidden" />
        {/* Desktop Overlay - Ajustado para transparência pedida (Permitindo ver o fundo) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001122]/85 to-[#002244]/85 hidden md:block" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

          {/* Centralized Text Content */}
          <div className="w-full max-w-5xl text-center flex flex-col items-center gap-6 mb-8 pt-8">
            <h1 className="font-montserrat font-bold text-[32px] md:text-[64px] text-white uppercase leading-tight tracking-wide drop-shadow-lg">
              Comunicação visual imponente
            </h1>
            <p className="font-montserrat font-bold text-[18px] md:text-[28px] text-gray-200 max-w-3xl drop-shadow-md">
              Fachadas ACM, letreiros, cortes em geral para empresas em Brasília. Atendimento personalizado.
            </p>
          </div>

          {/* Carousel (Now Middle) */}
          <div className="relative w-full max-w-5xl mx-auto mb-10 shadow-2xl rounded-xl border border-white/10">
            {/* Carousel Content */}
            <div className="overflow-hidden rounded-lg relative h-[250px] md:h-[450px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHeroIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={PROJECTS[currentHeroIndex].image}
                    alt={PROJECTS[currentHeroIndex].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 text-left">
                    <h3 className="text-white text-2xl font-bold">{PROJECTS[currentHeroIndex].title}</h3>
                    <p className="text-gray-200 text-lg">{PROJECTS[currentHeroIndex].desc}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevHeroSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all border border-white/20"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextHeroSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all border border-white/20"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>

          {/* Button (Now Bottom) */}
          <Button
            id="btn-orcamento-hero"
            onClick={() => {
              // @ts-ignore
              if (window.fbq) window.fbq('track', 'Lead');
              handleWhatsAppClick("Olá Michael Cardoso. Vim do seu site e gostaria de fazer um orçamento, *vamos marcar um horário?*");
            }}
            className="bg-[#25D366] hover:bg-[#128C7E] text-white font-montserrat font-bold text-[18px] md:text-[20px] h-16 px-10 rounded-full flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(37,211,102,0.6)]"
          >
            <MessageCircle className="w-7 h-7" />
            ORÇAMENTO NO WHATSAPP
          </Button>
        </div >
      </section >

      {/* Projetos Section */}
      < section id="projects" className="py-16 md:py-24 bg-[#f8f9fa] overflow-hidden" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">Meus Projetos</h2>
            <p className="text-xl text-gray-600">Fachadas, placas e sinalizações que transformaram negócios reais em Brasília.</p>
          </div>

          {/* Infinite Slider with Drag (Responsive) */}
          <div className="flex overflow-hidden cursor-grab active:cursor-grabbing">
            <motion.div
              className="flex gap-8 will-change-transform"
              style={{ x: baseX }}
              drag="x"
              dragConstraints={{ left: -contentWidth, right: 0 }}
              onDragStart={() => { isDragging.current = true; }}
              onDragEnd={() => { setTimeout(() => { isDragging.current = false; }, 150); }}
            >
              {/* Render 3 sets for seamless loop (Left Buffer + Main + Right Buffer) */}
              {[...PROJECTS, ...PROJECTS, ...PROJECTS].map((project, index) => (
                <div
                  key={`${project.id}-${index}`}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 select-none"
                  style={{ minWidth: cardWidth }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    draggable="false"
                    className="w-full h-64 object-cover cursor-pointer"
                    onClick={() => handleImageClick(project.image)}
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-[#003366] mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.desc}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[#00a8ff] font-bold">{project.highlight}</span>
                      <span className="text-sm text-gray-500">{project.sub}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section >

      {/* Services Section */}
      < Services />

      {/* Quem Sou Section */}
      < section id="about" className="py-16 md:py-24 bg-white" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">Quem é Michael Cardoso?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Com mais de 7 anos de experiência no mercado de comunicação visual em Brasília, Michael construiu uma trajetória marcada pela criatividade, técnica e compromisso com resultados que fortalecem marcas.
                </p>
                <p>
                  Desde 2018, atua transformando negócios locais — nos setores de arquitetura, varejo e serviços — em marcas visíveis e impactantes, que se destacam pela identidade e consistência.
                </p>
                <p>
                  Amplamente reconhecido por sua dedicação e profissionalismo, Michael se tornou referência no cenário brasiliense, sempre em busca de inovação e excelência em cada projeto.
                </p>
                <p>
                  Hoje, em parceria com a A3 ComunicaClau, ele amplia seu propósito: entregar mais do que comunicação visual — oferecer experiências memoráveis.
                  Cada cliente é visto como uma história única, e cada marca, uma oportunidade de conectar pessoas por meio do design.
                </p>
                <div className="bg-gradient-to-r from-[#003366] to-[#005580] p-6 rounded-lg shadow-md mt-6">
                  <p className="text-white font-medium text-lg">
                    Seja para renovar sua identidade visual, criar uma nova marca ou reposicionar o seu negócio, Michael e a equipe da A3 ComunicaClau estão prontos para dar visibilidade à sua ideia e transformar sua presença no mercado.
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <img src="/michael-cardoso.png" alt="Michael Cardoso" className="rounded-lg shadow-lg w-full" />
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-3xl font-bold text-[#003366] mb-8 text-center">Histórias de Sucesso em Brasília</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#f8f9fa] p-6 rounded-lg border border-gray-200">
                <h4 className="text-xl font-bold text-[#003366] mb-2">Escritório de Arquitetura Premium</h4>
                <p className="text-gray-700">180% mais projetos em 6 meses</p>
              </div>
              <div className="bg-[#f8f9fa] p-6 rounded-lg border border-gray-200">
                <h4 className="text-xl font-bold text-[#003366] mb-2">Incorporadora Imobiliária</h4>
                <p className="text-gray-700">45 novos clientes em 3 meses</p>
              </div>
              <div className="bg-[#f8f9fa] p-6 rounded-lg border border-gray-200">
                <h4 className="text-xl font-bold text-[#003366] mb-2">Estúdio de Design</h4>
                <p className="text-gray-700">Triplicou leads qualificados</p>
              </div>
              <div className="bg-[#f8f9fa] p-6 rounded-lg border border-gray-200">
                <h4 className="text-xl font-bold text-[#003366] mb-2">Consultoria Arquitetônica</h4>
                <p className="text-gray-700">Fechou parcerias estratégicas</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              <div className="bg-[#003366] text-white p-6 rounded-lg">
                <p className="text-3xl font-bold">150+</p>
                <p className="text-sm">Projetos</p>
              </div>
              <div className="bg-[#003366] text-white p-6 rounded-lg">
                <p className="text-3xl font-bold">98%</p>
                <p className="text-sm">Satisfação</p>
              </div>
              <div className="bg-[#003366] text-white p-6 rounded-lg">
                <p className="text-3xl font-bold">7 anos</p>
                <p className="text-sm">No mercado</p>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Por Que Contratar Section */}
      < section id="why" className="py-16 md:py-24 bg-[#f8f9fa]" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">Por que Michael Cardoso?</h2>
            <p className="text-xl text-gray-600">Descubra como comunicação visual estratégica aumenta seu volume de clientes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-8px]">
              <Zap className="w-12 h-12 text-[#00a8ff] mb-4" />
              <h3 className="text-2xl font-bold text-[#003366] mb-3">Aumento imediato de visibilidade</h3>
              <p className="text-gray-700">Deixa de ser invisível.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-8px]">
              <TrendingUp className="w-12 h-12 text-[#00a8ff] mb-4" />
              <h3 className="text-2xl font-bold text-[#003366] mb-3">Crescimento de leads</h3>
              <p className="text-gray-700">Atrai quem paga, não quem olha.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-8px]">
              <Shield className="w-12 h-12 text-[#00a8ff] mb-4" />
              <h3 className="text-2xl font-bold text-[#003366] mb-3">Diferencial competitivo</h3>
              <p className="text-gray-700">Fachada que grita qualidade.</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-8px]">
              <CheckCircle className="w-12 h-12 text-[#00a8ff] mb-4" />
              <h3 className="text-2xl font-bold text-[#003366] mb-3">Visual Melhorado da sua Empresa</h3>
              <p className="text-gray-700">Fachadas imponentes que geram valor</p>
            </div>

            {/* Card 5 */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-8px]">
              <MessageSquare className="w-12 h-12 text-[#00a8ff] mb-4" />
              <h3 className="text-2xl font-bold text-[#003366] mb-3">Suporte do Começo ao Fim</h3>
              <p className="text-gray-700">Acompanhamento profissional</p>
            </div>

            {/* Card 6 */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-8px]">
              <BarChart3 className="w-12 h-12 text-[#00a8ff] mb-4" />
              <h3 className="text-2xl font-bold text-[#003366] mb-3">Investimento que Vale Cada Centavo</h3>
              <p className="text-gray-700">Sua Empresa bem Vista no Mercado</p>
            </div>
          </div>
        </div>
      </section >

      {/* Contato Section */}
      < section id="contact" className="py-16 md:py-24 bg-white" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">Pronto para transformar seu negócio?</h2>
            <p className="text-xl text-gray-600">Envie uma mensagem. Consultoria gratuita. Resultado em 30 dias.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Formulário */}
            <div className="bg-[#f8f9fa] p-8 rounded-lg">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Nome Completo</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#003366]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="exemplo@empresa.com.br"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#003366]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Telefone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+55 61 98185-0437"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#003366]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Nome da Empresa</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Sua empresa"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#003366]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Mensagem</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Minha fachada está quebrada. Preciso de ACM e LED. Me explica"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#003366]"
                  />
                </div>
                <Button
                  id="btn-submit-form"
                  onClick={() => {
                    // @ts-ignore
                    if (window.fbq) {
                      // @ts-ignore
                      window.fbq('track', 'Lead');
                    }
                    handleWhatsAppClick(`Olá, Michael Cardoso. Me chamo ${formData.name}, da empresa ${formData.company}. Meu email é ${formData.email} e telefone ${formData.phone}. Mensagem: ${formData.message}`)
                  }}
                  className="w-full bg-[#003366] hover:bg-[#002244] text-white font-bold text-lg h-12"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Enviar no WhatsApp
                </Button>
              </form>
            </div>

            {/* Contato Direto */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#003366] mb-6">Contato Direto</h3>
                <div className="space-y-4">
                  <a
                    id="link-whatsapp-footer"
                    href="https://wa.me/5561981850437"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      // @ts-ignore
                      if (window.fbq) window.fbq('track', 'Lead');
                    }}
                    className="flex items-center gap-4 p-4 bg-[#f8f9fa] rounded-lg hover:bg-[#e8eaed] transition"
                  >
                    <MessageCircle className="w-6 h-6 text-[#00a8ff]" />
                    <div>
                      <p className="font-semibold text-[#003366]">WhatsApp</p>
                      <p className="text-gray-600">+55 61 98185-0437</p>
                    </div>
                  </a>

                  <a
                    id="link-phone-footer"
                    href="tel:+5561981850437"
                    onClick={() => {
                      // @ts-ignore
                      if (window.fbq) window.fbq('track', 'Lead');
                    }}
                    className="flex items-center gap-4 p-4 bg-[#f8f9fa] rounded-lg hover:bg-[#e8eaed] transition"
                  >
                    <Phone className="w-6 h-6 text-[#00a8ff]" />
                    <div>
                      <p className="font-semibold text-[#003366]">Telefone</p>
                      <p className="text-gray-600">+55 61 98185-0437</p>
                    </div>
                  </a>

                  <a
                    id="link-email-footer"
                    href="mailto:contato@michaelcardoso.com"
                    onClick={() => {
                      // @ts-ignore
                      if (window.fbq) window.fbq('track', 'Lead');
                    }}
                    className="flex items-center gap-4 p-4 bg-[#f8f9fa] rounded-lg hover:bg-[#e8eaed] transition"
                  >
                    <Mail className="w-6 h-6 text-[#00a8ff]" />
                    <div>
                      <p className="font-semibold text-[#003366]">E-mail</p>
                      <p className="text-gray-600">contato@michaelcardoso.com</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-[#003366] text-white p-6 rounded-lg">
                <h4 className="font-bold mb-4">Por que agir agora?</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#00a8ff]" />
                    <span>Concorrentes já investem em placas que vendem</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#00a8ff]" />
                    <span>Cada dia sem estratégia = cliente perdido</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#00a8ff]" />
                    <span>Consultoria inicial 100% grátis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#00a8ff]" />
                    <span>Resultados mensuráveis em 30 dias</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* CTA Final Section */}
      < section className="py-12 bg-[#003366] text-white" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Não deixe seu negócio invisível.</h2>
          <p className="text-lg mb-8 opacity-90">Fale com Michael Cardoso hoje.</p>
          <Button
            id="btn-whatsapp-final"
            onClick={() => {
              // @ts-ignore
              if (window.fbq) window.fbq('track', 'Lead');
              handleWhatsAppClick("Olá Michael Cardoso. Vim do seu site e gostaria de fazer um orçamento, *vamos marcar um horário?*");
            }}
            className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg h-12"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Iniciar Conversa no WhatsApp
          </Button>
        </div>
      </section >

      {/* Footer */}
      < footer className="bg-[#111] text-white py-12" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img src="/logo-original.png" alt="Michael Cardoso" className="h-48 w-auto object-contain" />
            </div>
            <p className="text-gray-400">Comunicação Visual Estratégica para Negócios Locais</p>
          </div>

          <div className="flex justify-center gap-8 mb-8 flex-wrap">
            <button onClick={() => scrollToSection("hero")} className="text-gray-400 hover:text-white transition">
              Início
            </button>
            <button onClick={() => scrollToSection("about")} className="text-gray-400 hover:text-white transition">
              Quem Sou
            </button>
            <button onClick={() => scrollToSection("projects")} className="text-gray-400 hover:text-white transition">
              Projetos
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-gray-400 hover:text-white transition">
              Contato
            </button>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p className="mb-2">+55 61 98185-0437 | Brasília/DF | contato@michaelcardoso.com</p>
            <p>© 2025 Michael Cardoso. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer >

      {/* Floating WhatsApp Button */}
      < button
        id="whatsapp-lead"
        onClick={() => {
          // @ts-ignore
          if (window.fbq) window.fbq('track', 'Lead');
          handleWhatsAppClick("Olá Michael Cardoso. Vim do seu site e gostaria de fazer um orçamento, *vamos marcar um horário?*");
        }
        }
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 z-40 animate-pulse-gentle"
        title="Abrir WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </button >
      {/* Lightbox Overlay */}
      {
        selectedImage && (
          <div
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
            onClick={closeLightbox}
          >
            <img
              src={selectedImage}
              alt="Full screen project"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        )
      }
    </div >
  );
}
