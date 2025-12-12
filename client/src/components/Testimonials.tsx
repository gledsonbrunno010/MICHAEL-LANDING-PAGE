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
        <div className="flex-shrink-0 w-[260px] md:w-[400px] p-5 md:p-6 mx-3 md:mx-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105 group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-10 h-10 md:w-12 md:h-12 text-[#003366]" />
            </div>

            <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="relative">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-[#25D366] p-0.5"
                        loading="lazy"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#25D366] rounded-full p-1 border border-white">
                        <Star className="w-2.5 h-2.5 md:w-3 md:h-3 text-white fill-white" />
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-[#003366] text-base md:text-lg leading-tight">{item.name}</h4>
                    <p className="text-xs md:text-sm text-gray-500">{item.role}</p>
                    <p className="text-[10px] md:text-xs text-gray-400 mt-0.5">{item.location}</p>
                </div>
            </div>

            <div className="relative z-10">
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-wide">Avaliações Google</p>
                <div className="flex gap-0.5 md:gap-1 mb-2 md:mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#FFD700] fill-[#FFD700]" />
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
        <section className="py-16 md:py-24 bg-[#003366] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">O que dizem nossos clientes</h2>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                        Histórias reais de quem transformou a fachada do seu negócio com a nossa qualidade.
                    </p>
                </motion.div>
            </div>

            <div className="flex flex-col gap-6 md:gap-10">
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
                                duration: 30,
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
                                duration: 35, // Slightly different speed
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
