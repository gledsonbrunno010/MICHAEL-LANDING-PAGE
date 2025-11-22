import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, MapPin, Zap, TrendingUp, Shield, CheckCircle, MessageSquare, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
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
    const phoneNumber = "5561981850437";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar Fixa */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-[#003366]">Michael Cardoso | A3 Comunicação</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection("hero")} className="text-gray-700 hover:text-[#003366] transition">
                Início
              </button>
              <button onClick={() => scrollToSection("about")} className="text-gray-700 hover:text-[#003366] transition">
                Quem Sou
              </button>
              <button onClick={() => scrollToSection("projects")} className="text-gray-700 hover:text-[#003366] transition">
                Projetos
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-gray-700 hover:text-[#003366] transition">
                Contato
              </button>
              <Button
                onClick={() => handleWhatsAppClick("Olá Michael Cardoso. Vim do seu site e gostaria de fazer um orçamento, *vamos marcar um horário?*")}
                className="bg-[#003366] hover:bg-[#002244] text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                onClick={() => handleWhatsAppClick("Olá Michael Cardoso. Vim do seu site e gostaria de fazer um orçamento, *vamos marcar um horário?*")}
                className="bg-[#003366] hover:bg-[#002244] text-white"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden bg-gradient-to-r from-[#003366] to-[#004488]">
        {/* Mobile Background */}
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center md:hidden"
          style={{
            backgroundImage: "url('/michael-cardoso.png')",
            backgroundPosition: "center",
          }}
        />
        {/* Desktop Background */}
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center hidden md:block"
          style={{
            backgroundImage: "url('/hero-facade.jpg')",
            backgroundAttachment: "fixed",
          }}
        />
        {/* Mobile Overlay - mais claro */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/50 to-[#004488]/50 md:hidden" />
        {/* Desktop Overlay - mais escuro */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/95 to-[#004488]/85 hidden md:block" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center md:pt-8">
            <div className="text-white md:text-left text-center">
              <h2 className="text-4xl md:text-4xl font-bold mb-4 md:mb-5 leading-tight">Se o negócio está invisível, não vende.</h2>
              <p className="text-base md:text-lg mb-6 md:mb-5 opacity-90">
                Empresas locais perdem 70% dos clientes por falta de identidade visual. Michael Cardoso transforma presença com estratégias comprovadas – visibilidade imediata, leads reais.
              </p>

              <div className="space-y-2 md:space-y-2 mb-6 md:mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#00a8ff] flex items-center justify-center text-white font-bold text-sm">✓</div>
                  <span className="text-base md:text-base">+7 anos transformando negócios em Brasília</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#00a8ff] flex items-center justify-center text-white font-bold text-sm">✓</div>
                  <span className="text-base md:text-base">Especialista em comunicação visual para arquitetura e varejo</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#00a8ff] flex items-center justify-center text-white font-bold text-sm">✓</div>
                  <span className="text-base md:text-base">Aumento médio de 150% em leads B2B</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-3">
                <Button
                  onClick={() => handleWhatsAppClick("Olá Michael Cardoso. Vim do seu site e gostaria de fazer um orçamento, *vamos marcar um horário?*")}
                  className="bg-white text-[#003366] hover:bg-gray-100 font-bold text-lg h-12"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Fale comigo no WhatsApp
                </Button>
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-[#00a8ff] hover:bg-[#0088cc] text-white font-bold text-lg h-12"
                >
                  Solicitar Consultoria Gratuita
                </Button>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="relative">
                <img src="/michael-cardoso.png" alt="Michael Cardoso" className="rounded-lg shadow-2xl w-full" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#003366] text-white p-4 rounded-lg text-center font-semibold">
                  Desde 2018 – Comunicação Visual Estratégica
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projetos Section */}
      <section id="projects" className="py-16 md:py-24 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">Meus Projetos</h2>
            <p className="text-xl text-gray-600">Fachadas, placas e sinalizações que transformaram negócios reais em Brasília.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Projeto 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-8px]">
              <img
                src="/produto-1.png"
                alt="Fachada em ACM Supergás Brás"
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => handleImageClick("/produto-1.png")}
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#003366] mb-2">Fachada em ACM Supergás Brás</h3>
                <p className="text-gray-600 mb-4">Fachada em ACM e Letra Caixa</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#00a8ff] font-bold">Fachada entregue em tempo record</span>
                  <span className="text-sm text-gray-500">Michael Cardoso – A3 Comunica CLAU</span>
                </div>
              </div>
            </div>

            {/* Projeto 2 (Antigo Projeto 5) */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-8px]">
              <img
                src="/produto-5.jpg"
                alt="Projeto 5"
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => handleImageClick("/produto-5.jpg")}
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#003366] mb-2">Ocidental Shopping</h3>
                <p className="text-gray-600 mb-4">Toten para orientação dos clientes</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#00a8ff] font-bold">Projeto elaborado por A3 Comunicação</span>
                  <span className="text-sm text-gray-500">Michael Cardoso – A3 Comunica CLAU</span>
                </div>
              </div>
            </div>

            {/* Projeto 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-8px]">
              <img
                src="/produto-3.png"
                alt="V&C Studios"
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => handleImageClick("/produto-3.png")}
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#003366] mb-2">V&C Studios</h3>
                <p className="text-gray-600 mb-4">Sinalização interna Completa</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#00a8ff] font-bold">100% de aprovação dos usuários</span>
                  <span className="text-sm text-gray-500">Michael Cardoso – A3 Comunica CLAU</span>
                </div>
              </div>
            </div>

            {/* Projeto 4 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-8px]">
              <img
                src="/produto-4.jpg"
                alt="Sinalização Interna Shopping"
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => handleImageClick("/produto-4.jpg")}
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#003366] mb-2">Sinalização Interna Shopping</h3>
                <p className="text-gray-600 mb-4">Visibilidade única para cada ambiente</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#00a8ff] font-bold">Cada espaço sinalizado e aprovado pelos Bombeiros</span>
                  <span className="text-sm text-gray-500">Michael Cardoso – A3 Comunica CLAU</span>
                </div>
              </div>
            </div>

            {/* Projeto 5 (Antigo Projeto 2) */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-8px]">
              <img
                src="/produto-2.png"
                alt="Supermercados Bellavia"
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => handleImageClick("/produto-2.png")}
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#003366] mb-2">UNIEURO CENTRO UNIVERSITÁRIO</h3>
                <p className="text-gray-600 mb-4">Simbolo da Intituição realizado por nós</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#00a8ff] font-bold">Trabalho realizado com excelência e qualidade</span>
                  <span className="text-sm text-gray-500">Michael Cardoso – A3 Comunica CLAU</span>
                </div>
              </div>
            </div>

            {/* Projeto 6 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-8px]">
              <img
                src="/produto-6.jpg"
                alt="Projeto 6"
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => handleImageClick("/produto-6.jpg")}
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#003366] mb-2">EUROBIKE</h3>
                <p className="text-gray-600 mb-4">Letra Caixa para identificação de parques ou cidades</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#00a8ff] font-bold">Identidade Visual bem definida</span>
                  <span className="text-sm text-gray-500">Michael Cardoso – A3 Comunica CLAU</span>
                </div>
              </div>
            </div>

            {/* Projeto 7 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-8px]">
              <img
                src="/produto-7.jpg"
                alt="Projeto 7"
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => handleImageClick("/produto-7.jpg")}
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#003366] mb-2">Identificação de Condomínios</h3>
                <p className="text-gray-600 mb-4">Corte em ACM para melhor identificação da sua casa</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#00a8ff] font-bold">Elegância para o visual da sua casa</span>
                  <span className="text-sm text-gray-500">Michael Cardoso – A3 Comunica CLAU</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quem Sou Section */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">Quem é Michael Cardoso?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Especialista em comunicação visual com <strong>+7 anos de experiência</strong> em Brasília. Desde 2018, transforma negócios locais (arquitetura, varejo, serviços) em marcas visíveis. Parceiro da <strong>A3 Comunica CLAU</strong>.
              </p>

              <div className="bg-[#b3e5fc] border-l-4 border-[#0288d1] p-6 rounded mb-8">
                <p className="font-bold text-[#003366] mb-2">Missão:</p>
                <p className="text-gray-800">Ajudar empresas locais a aumentar volume de clientes com estratégias visuais de alto impacto. Invisibilidade vira presença.</p>
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
      </section>

      {/* Por Que Contratar Section */}
      <section id="why" className="py-16 md:py-24 bg-[#f8f9fa]">
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
      </section>

      {/* Contato Section */}
      <section id="contact" className="py-16 md:py-24 bg-white">
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
                  onClick={() => handleWhatsAppClick(`Olá, Michael Cardoso. Me chamo ${formData.name}, da empresa ${formData.company}. Meu email é ${formData.email} e telefone ${formData.phone}. Mensagem: ${formData.message}`)}
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
                  <a href="https://wa.me/5561981850437" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-[#f8f9fa] rounded-lg hover:bg-[#e8eaed] transition">
                    <MessageCircle className="w-6 h-6 text-[#00a8ff]" />
                    <div>
                      <p className="font-semibold text-[#003366]">WhatsApp</p>
                      <p className="text-gray-600">+55 61 98185-0437</p>
                    </div>
                  </a>

                  <a href="tel:+5561981850437" className="flex items-center gap-4 p-4 bg-[#f8f9fa] rounded-lg hover:bg-[#e8eaed] transition">
                    <Phone className="w-6 h-6 text-[#00a8ff]" />
                    <div>
                      <p className="font-semibold text-[#003366]">Telefone</p>
                      <p className="text-gray-600">+55 61 98185-0437</p>
                    </div>
                  </a>

                  <a href="mailto:contato@michaelcardoso.com" className="flex items-center gap-4 p-4 bg-[#f8f9fa] rounded-lg hover:bg-[#e8eaed] transition">
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
      </section>

      {/* CTA Final Section */}
      <section className="py-12 bg-[#003366] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Não deixe seu negócio invisível.</h2>
          <p className="text-lg mb-8 opacity-90">Fale com Michael Cardoso hoje.</p>
          <Button
            onClick={() => handleWhatsAppClick("Olá Michael Cardoso. Vim do seu site e gostaria de fazer um orçamento, *vamos marcar um horário?*")}
            className="bg-white text-[#003366] hover:bg-gray-100 font-bold text-lg h-12"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Iniciar Conversa no WhatsApp
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Michael Cardoso</h3>
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
      </footer>

      {/* Floating WhatsApp Button */}
      <button
        onClick={() => handleWhatsAppClick("Olá Michael Cardoso. Vim do seu site e gostaria de fazer um orçamento, *vamos marcar um horário?*")}
        className="fixed bottom-6 right-6 bg-[#003366] hover:bg-[#002244] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 z-40"
        title="Abrir WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </button>
      {/* Lightbox Overlay */}
      {selectedImage && (
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
      )}
    </div>
  );
}
