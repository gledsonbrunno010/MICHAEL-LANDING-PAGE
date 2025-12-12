import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

// 4 realistic images reused
const AVATARS = [
    "/testimonial-1.webp",
    "/testimonial-2.webp",
    "/testimonial-3.webp",
    "/testimonial-4.webp",
];

const TESTIMONIALS = [
    {
        id: 1,
        name: "Ana Clara Rocha",
        role: "Proprietária da Rocha Arquitetura",
        location: "Brasília, DF",
        image: AVATARS[0],
        content: "A fachada da minha loja ficou incrível! O Michael conseguiu captar exatamente a essência da minha marca. O acabamento em ACM é de outro nível.",
    },
    {
        id: 2,
        name: "Ricardo Mendes",
        role: "Diretor da TechSolutions",
        location: "Brasília, DF",
        image: AVATARS[1],
        content: "Profissionalismo nota 10. O projeto foi entregue antes do prazo e a instalação foi super limpa. A visibilidade da nossa empresa mudou da água pro vinho.",
    },
    {
        id: 3,
        name: "Fernanda Costa",
        role: "Gerente do Café Brasília",
        location: "Brasília, DF",
        image: AVATARS[2],
        content: "Estou apaixonada pelo letreiro luminoso! Deu um charme todo especial para o nosso café, principalmente à noite. Recomendo muito o trabalho da A3.",
    },
    {
        id: 4,
        name: "João Oliveira",
        role: "CEO da Oliveira Construtora",
        location: "Brasília, DF",
        image: AVATARS[3],
        content: "Qualidade superior e atendimento diferenciado. O Michael é muito atencioso e explicou cada detalhe técnico. O resultado final superou minhas expectativas.",
    },
    {
        id: 5,
        name: "Mariana Silva",
        role: "Dentista - Clínica Sorriso",
        location: "Brasília, DF",
        image: AVATARS[0],
        content: "Transformou a entrada da minha clínica. Meus pacientes sempre elogiam a nova fachada. Foi um investimento que valeu cada centavo.",
    },
    {
        id: 6,
        name: "Pedro Santos",
        role: "Sócio do Espaço Gourmet",
        location: "Brasília, DF",
        image: AVATARS[1],
        content: "A comunicação visual interna ficou perfeita. As placas de sinalização são elegantes e muito bem acabadas. Excelente parceiro para negócios em Brasília.",
    },
    {
        id: 7,
        name: "Camila Lima",
        role: "Advogada - Lima & Associados",
        location: "Brasília, DF",
        image: AVATARS[2],
        content: "Impressionante a qualidade do corte e dos materiais. A placa do meu escritório transmite a seriedade que eu precisava. Muito obrigada!",
    },
    {
        id: 8,
        name: "Lucas Pereira",
        role: "Dono da Pereira Fitness",
        location: "Brasília, DF",
        image: AVATARS[3],
        content: "Muita agilidade na entrega. Precisava da fachada pronta para a inauguração e o Michael cumpriu o combinado. O visual ficou moderno e chamativo.",
    },
    {
        id: 9,
        name: "Juliana Martins",
        role: "Diretora da Escola Aprender",
        location: "Brasília, DF",
        image: AVATARS[0],
        content: "O atendimento consultivo fez toda a diferença. O Michael nos ajudou a escolher o melhor material para a fachada da escola. Durabilidade excelente.",
    },
    {
        id: 10,
        name: "Rafael Souza",
        role: "Gerente do Hotel Alvorada",
        location: "Brasília, DF",
        image: AVATARS[1],
        content: "Serviço impecável. A revitalização da nossa fachada trouxe um ar de modernidade para o hotel. Equipe técnica muito capacitada e educada.",
    },
    {
        id: 11,
        name: "Beatriz Gomes",
        role: "Esteticista - Bea Beauty",
        location: "Brasília, DF",
        image: AVATARS[2],
        content: "Cada detalhe ficou perfeito. O acabamento das letras caixa é incrível. Minha clínica ficou muito mais sofisticada com o novo visual.",
    },
    {
        id: 12,
        name: "Gustavo Alves",
        role: "Empresário - Center Car",
        location: "Brasília, DF",
        image: AVATARS[3],
        content: "Muito satisfeito com o resultado. A placa em ACM destacou muito minha loja na avenida. Já notei um aumento no fluxo de clientes. Recomendo!",
    }
];

// Split into two rows
const ROW_1 = TESTIMONIALS.slice(0, 6);
const ROW_2 = TESTIMONIALS.slice(6, 12);

const MarqueeCard = ({ item }: { item: typeof TESTIMONIALS[0] }) => {
    return (
        <div className="flex-shrink-0 w-[300px] md:w-[400px] p-6 mx-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105 group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12 text-[#003366]" />
            </div>

            <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-[#25D366] p-0.5"
                        loading="lazy"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#25D366] rounded-full p-1 border border-white">
                        <Star className="w-3 h-3 text-white fill-white" />
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-[#003366] text-lg leading-tight">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.role}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.location}</p>
                </div>
            </div>

            <div className="relative z-10">
                <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
                    ))}
                </div>
                <p className="text-gray-600 italic text-sm md:text-base leading-relaxed line-clamp-4">
                    "{item.content}"
                </p>
            </div>
        </div>
    );
};

export default function Testimonials() {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-[#f8f9fa] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">O que dizem nossos clientes</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Histórias reais de quem transformou a fachada do seu negócio com a nossa qualidade.
                    </p>
                </motion.div>
            </div>

            <div className="flex flex-col gap-10">
                {/* Row 1 - Right to Left */}
                <div className="relative flex overflow-hidden w-full mask-linear-gradient">
                    <motion.div
                        className="flex"
                        animate={{
                            x: ["0%", "-50%"],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 40,
                                ease: "linear",
                            },
                        }}
                        style={{ width: "200%" }} // Ensure container is wide enough
                    >
                        {/* Duplicate content strictly for the marquee loop */}
                        {[...ROW_1, ...ROW_1, ...ROW_1, ...ROW_1].map((item, idx) => (
                            <MarqueeCard key={`${item.id}-row1-${idx}`} item={item} />
                        ))}
                    </motion.div>
                </div>

                {/* Row 2 - Left to Right */}
                <div className="relative flex overflow-hidden w-full mask-linear-gradient">
                    <motion.div
                        className="flex"
                        animate={{
                            x: ["-50%", "0%"],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 45, // Slightly different speed
                                ease: "linear",
                            },
                        }}
                        style={{ width: "200%" }}
                    >
                        {/* Duplicate content strictly for the marquee loop */}
                        {[...ROW_2, ...ROW_2, ...ROW_2, ...ROW_2].map((item, idx) => (
                            <MarqueeCard key={`${item.id}-row2-${idx}`} item={item} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
