import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Star } from "lucide-react";

const SERVICES = [
    {
        id: 1,
        title: "Fachadas em ACM",
        description: "Modernize a frente do seu negócio com revestimento em ACM de alta durabilidade e acabamento premium.",
        image: "/service-fachada.png",
    },
    {
        id: 2,
        title: "Letras Caixa",
        description: "Destaque sua marca com letras em relevo, com ou sem iluminação LED, para um efeito visual impactante.",
        image: "/service-letras.png",
    },
    {
        id: 3,
        title: "Sinalização Corporativa",
        description: "Oriente seus clientes com totens e placas de sinalização interna e externa com design exclusivo.",
        image: "/service-sinalizacao.png",
    }
];

export default function Services() {
    const handleWhatsAppClick = () => {
        const phoneNumber = "5561981850437";
        const message = encodeURIComponent("Olá! Gostaria de saber mais sobre os serviços de Fachadas e Letreiros.");
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    };

    return (
        <section id="services" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4 font-montserrat">
                        Nossos Serviços
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Soluções completas em comunicação visual para elevar o nível da sua empresa.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {SERVICES.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col"
                        >
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-[#003366] mb-3 font-montserrat flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 mb-6 flex-1 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                                <Button
                                    onClick={handleWhatsAppClick}
                                    className="w-full bg-white text-[#003366] border border-[#003366] hover:bg-[#003366] hover:text-white transition-colors group"
                                >
                                    Saiba Mais
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
