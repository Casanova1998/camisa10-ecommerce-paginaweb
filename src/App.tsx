import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, X, Menu, ArrowRight, Instagram, Github, Trophy, Goal, Activity, Search } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  thirdImage?: string;
  category: string;
  description: string;
  sizes: string[];
  flag?: string;
  nativeName?: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Camisola 'ÁGUIA GLORIOSA' - SLB",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800",
    thirdImage: "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=800",
    category: "Equipamento",
    description: "A mística da Luz numa peça de alta performance. Design exclusivo 'Camisa 10'.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "Camisola 'LEÃO RAMPANTE' - SCP",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800",
    thirdImage: "https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?auto=format&fit=crop&q=80&w=800",
    category: "Equipamento",
    description: "O ADN de campeão em cada fibra. Elegância e tradição verde e branca.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 3,
    name: "Camisola 'DRAGÃO AZUL' - FCP",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    thirdImage: "https://images.unsplash.com/photo-1553062407-98eeb94c6a62?auto=format&fit=crop&q=80&w=800",
    category: "Equipamento",
    description: "A força do Norte representada num design moderno e arrojado.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 4,
    name: "Camisola 'GUERREIRO' - SCB",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=800",
    thirdImage: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800",
    category: "Equipamento",
    description: "A garra dos Guerreiros do Minho. Conforto e estilo para os adeptos mais fiéis.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 5,
    name: "Camisola 'GALÁCTICO' - MADRID",
    price: 94.99,
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800",
    thirdImage: "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=800",
    category: "Equipamento",
    description: "A realeza do futebol mundial. O branco imaculado com detalhes em ouro.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 6,
    name: "Camisola 'CITIZEN' - MANCHESTER",
    price: 94.99,
    image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800",
    thirdImage: "https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?auto=format&fit=crop&q=80&w=800",
    category: "Equipamento",
    description: "O domínio tecnológico e tático traduzido num design futurista.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 7,
    name: "Camisola 'PARISIEN' - PSG",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    thirdImage: "https://images.unsplash.com/photo-1553062407-98eeb94c6a62?auto=format&fit=crop&q=80&w=800",
    category: "Equipamento",
    description: "Onde a moda encontra o futebol. Estilo inconfundível da capital francesa.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 8,
    name: "Camisola 'NERAZZURRI' - INTER",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=800",
    thirdImage: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=800",
    category: "Equipamento",
    description: "A elegância italiana em tons de azul e preto. Um clássico moderno.",
    sizes: ["S", "M", "L", "XL"]
  }
];

const PRIME_PRODUCTS: Product[] = [
  {
    id: 101,
    name: "Camisola 'PRIME GOLD' - SLB",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800",
    thirdImage: "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=800",
    category: "Prime",
    description: "Edição limitada com detalhes em ouro real de 24k. O pináculo do luxo desportivo.",
    sizes: ["M", "L", "XL"]
  },
  {
    id: 102,
    name: "Camisola 'PRIME TITAN' - FCP",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    thirdImage: "https://images.unsplash.com/photo-1553062407-98eeb94c6a62?auto=format&fit=crop&q=80&w=800",
    category: "Prime",
    description: "Estrutura em carbono e titânio para uma leveza nunca antes vista.",
    sizes: ["M", "L", "XL"]
  },
  {
    id: 103,
    name: "Bola 'PRIME ORBIT'",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1614632537190-23e414d40399?auto=format&fit=crop&q=80&w=800",
    category: "Prime",
    description: "Aerodinâmica testada em túnel de vento. A bola mais precisa do mundo.",
    sizes: ["Tamanho 5"]
  },
  {
    id: 104,
    name: "Relógio 'PRIME TIME'",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    category: "Prime",
    description: "Cronómetro de alta precisão para atletas de elite.",
    sizes: ["Único"]
  },
  {
    id: 105,
    name: "Mala de Viagem 'PRIME JET'",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb94c6a62?auto=format&fit=crop&q=80&w=800",
    category: "Prime",
    description: "Couro italiano e acabamentos em metal escovado.",
    sizes: ["Único"]
  },
  {
    id: 106,
    name: "Óculos 'PRIME VISION'",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
    category: "Prime",
    description: "Lentes polarizadas com proteção máxima e estilo inconfundível.",
    sizes: ["Único"]
  },
  {
    id: 107,
    name: "Sapatilhas 'PRIME WALK'",
    price: 139.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    category: "Prime",
    description: "Conforto supremo para o dia-a-dia do craque.",
    sizes: ["40", "41", "42", "43"]
  },
  {
    id: 108,
    name: "Auriculares 'PRIME SOUND'",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    category: "Prime",
    description: "Cancelamento de ruído ativo para foco total antes do jogo.",
    sizes: ["Único"]
  }
];

const EQUIPAMENTOS_PRODUCTS: Product[] = [
  {
    id: 201,
    name: "Fato de Seleção 'ACADEMY'",
    price: 84.99,
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800",
    category: "Equipamento",
    description: "Conjunto completo de casaco e calças. Tecido técnico que mantém a temperatura ideal.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 202,
    name: "Camisola 'VAPOR KNIT'",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800",
    category: "Equipamento",
    description: "A tecnologia mais avançada em camisolas de jogo. Leveza e ventilação extrema.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 203,
    name: "T-Shirt 'STRIKE'",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=800",
    category: "Equipamento",
    description: "Design moderno para treino ou lazer. Corte ajustado que favorece a performance.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 204,
    name: "Meiões 'MATCH'",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    category: "Equipamento",
    description: "Suporte anatómico e amortecimento nas zonas de maior impacto.",
    sizes: ["39-42", "43-46"]
  },
  {
    id: 205,
    name: "Fato de Seleção 'CHAMPION'",
    price: 94.99,
    image: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=800",
    category: "Equipamento",
    description: "Edição especial para dias de jogo. Detalhes em dourado e acabamento premium.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 206,
    name: "Camisola 'PRO DRI-FIT'",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800",
    category: "Equipamento",
    description: "Camisola de base para máxima absorção de suor. Mantém-te seco e focado.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 207,
    name: "T-Shirt 'LEGEND'",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800",
    category: "Equipamento",
    description: "Homenagem às lendas do futebol. Tecido suave e duradouro.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 208,
    name: "Meiões 'ELITE'",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    category: "Equipamento",
    description: "Compressão graduada para melhor recuperação. O topo de gama em meias desportivas.",
    sizes: ["39-42", "43-46"]
  },
  {
    id: 209,
    name: "Fato de Seleção 'WINTER'",
    price: 109.99,
    image: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=800",
    category: "Equipamento",
    description: "Proteção térmica para os dias mais frios. Resistente ao vento e à chuva leve.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 210,
    name: "Camisola 'GOALIE'",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?auto=format&fit=crop&q=80&w=800",
    category: "Equipamento",
    description: "Proteção acolchoada nos cotovelos. Design vibrante para dominar a baliza.",
    sizes: ["M", "L", "XL"]
  },
  {
    id: 211,
    name: "T-Shirt 'TRAINING'",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=800",
    category: "Equipamento",
    description: "Básica mas essencial. O teu parceiro diário no campo de treino.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 212,
    name: "Meiões 'CLASSIC'",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    category: "Equipamento",
    description: "O design tradicional que nunca falha. Conforto garantido em cada jogo.",
    sizes: ["35-38", "39-42", "43-46"]
  }
];

const RETRO_PRODUCTS: Product[] = [
  {
    id: 301,
    name: "Camisola Retro 'ZIDANE 98'",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800",
    category: "Retro",
    description: "A mítica camisola da final de 98. Um símbolo de elegância e vitória.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 302,
    name: "Camisola Retro 'RONALDO 2002'",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800",
    category: "Retro",
    description: "O regresso do Fenómeno em 2002. Design icónico com tecnologia de época.",
    sizes: ["M", "L", "XL"]
  },
  {
    id: 303,
    name: "Camisola Retro 'FIGO 2000'",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800",
    category: "Retro",
    description: "A camisola do ano em que Figo conquistou a Bola de Ouro.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 304,
    name: "Camisola Retro 'EUSÉBIO 66'",
    price: 84.99,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800",
    category: "Retro",
    description: "Homenagem ao Pantera Negra no Mundial de 66. Algodão pesado e detalhes bordados.",
    sizes: ["M", "L", "XL", "XXL"]
  },
  {
    id: 305,
    name: "Camisola Retro 'BECKHAM 7'",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800",
    category: "Retro",
    description: "O estilo inconfundível do número 7. Um clássico do futebol inglês.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 306,
    name: "Camisola Retro 'MALDINI 3'",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800",
    category: "Retro",
    description: "A classe eterna do capitão. Design minimalista e imponente.",
    sizes: ["M", "L", "XL"]
  },
  {
    id: 307,
    name: "Camisola Retro 'CRUYFF 14'",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800",
    category: "Retro",
    description: "Futebol total. A camisola que mudou o jogo para sempre.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 308,
    name: "Camisola Retro 'BEST 7'",
    price: 64.99,
    image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800",
    category: "Retro",
    description: "O génio rebelde de Belfast. Estilo puro dos anos 60.",
    sizes: ["S", "M", "L"]
  },
  {
    id: 309,
    name: "Camisola Retro 'CANTONA 7'",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800",
    category: "Retro",
    description: "Gola levantada e autoridade máxima. O Rei de Old Trafford.",
    sizes: ["M", "L", "XL"]
  },
  {
    id: 310,
    name: "Camisola Retro 'HENRY 14'",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800",
    category: "Retro",
    description: "Velocidade e finalização perfeita. A era dos invencíveis.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 311,
    name: "Camisola Retro 'TOTTI 10'",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800",
    category: "Retro",
    description: "Il Capitano. Uma vida dedicada a uma só camisola.",
    sizes: ["M", "L", "XL"]
  },
  {
    id: 312,
    name: "Camisola Retro 'BAGGIO 10'",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800",
    category: "Retro",
    description: "O rabo-de-cavalo divino. Magia pura nos pés do número 10.",
    sizes: ["S", "M", "L", "XL"]
  }
];

const SELECAO_PRODUCTS: Product[] = [
  {
    id: 401,
    name: "Camisola Seleção 'PRO'",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800",
    category: "Seleção",
    description: "Tecido ultraleve com ventilação estratégica. Foca-te no teu objetivo.",
    sizes: ["S", "M", "L", "XL"],
    flag: "https://flagcdn.com/w640/pt.png",
    nativeName: "Portugal"
  },
  {
    id: 402,
    name: "Calções Seleção 'ELITE'",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=800",
    category: "Seleção",
    description: "Liberdade total de movimentos. Cintura elástica com cordão interno.",
    sizes: ["S", "M", "L", "XL"],
    flag: "https://flagcdn.com/w640/br.png",
    nativeName: "Brasil"
  },
  {
    id: 403,
    name: "Casaco Seleção 'STORM'",
    price: 64.99,
    image: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=800",
    category: "Seleção",
    description: "Proteção contra os elementos sem comprometer a respirabilidade.",
    sizes: ["M", "L", "XL"],
    flag: "https://flagcdn.com/w640/ar.png",
    nativeName: "Argentina"
  },
  {
    id: 404,
    name: "Calças Seleção 'TECH'",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800",
    category: "Seleção",
    description: "Corte afunilado para evitar distrações. Bolsos com fecho seguro.",
    sizes: ["S", "M", "L", "XL"],
    flag: "https://flagcdn.com/w640/fr.png",
    nativeName: "France"
  },
  {
    id: 405,
    name: "Colete Seleção 'TACTIC'",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=800",
    category: "Seleção",
    description: "Para distinguir as equipas no campo. Malha leve e resistente.",
    sizes: ["Único"],
    flag: "https://flagcdn.com/w640/de.png",
    nativeName: "Deutschland"
  },
  {
    id: 406,
    name: "Camisola Compressão 'BASE'",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800",
    category: "Seleção",
    description: "Segunda pele que mantém os músculos quentes e protegidos.",
    sizes: ["S", "M", "L", "XL"],
    flag: "https://flagcdn.com/w640/it.png",
    nativeName: "Italia"
  },
  {
    id: 407,
    name: "Calções Compressão 'CORE'",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=800",
    category: "Seleção",
    description: "Suporte extra onde mais precisas. Costuras planas para evitar irritações.",
    sizes: ["S", "M", "L"],
    flag: "https://flagcdn.com/w640/es.png",
    nativeName: "España"
  },
  {
    id: 408,
    name: "Acessórios Seleção 'OTHERS'",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=800",
    category: "Seleção",
    description: "Equipamento variado para outras seleções mundiais.",
    sizes: ["S", "M", "L", "XL"],
    flag: "https://flagcdn.com/w640/un.png",
    nativeName: "Others"
  }
];

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isPrimeOpen, setIsPrimeOpen] = useState(false);
  const [isEquipamentosOpen, setIsEquipamentosOpen] = useState(false);
  const [isRetroOpen, setIsRetroOpen] = useState(false);
  const [isSelecaoOpen, setIsSelecaoOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Product | null>(null);
  const [showAllPrime, setShowAllPrime] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [isShippingPolicyOpen, setIsShippingPolicyOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setSelectedSize(null);
    if (selectedProduct) {
      setActiveImage(selectedProduct.image);
    }
  }, [selectedProduct]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-gold selection:text-brand-black">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-black/90 backdrop-blur-md border-b border-brand-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <button onClick={() => setIsMenuOpen(true)} className="hover:text-brand-gold transition-colors">
              <Menu size={24} />
            </button>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-tighter flex items-center gap-2 leading-none text-brand-white">
                <div className="w-8 h-8 bg-brand-gold rounded-sm flex items-center justify-center text-brand-black text-xs font-black italic">10</div>
                CAMISA 10
              </span>
              <span className="text-[8px] uppercase tracking-[0.4em] text-brand-gold font-bold ml-10">Vista a Lenda.</span>
            </div>
          </div>
          
          <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest">
            <button onClick={() => setIsEquipamentosOpen(true)} className="hover:text-brand-gold transition-colors uppercase tracking-widest cursor-pointer">Equipamentos</button>
            <button onClick={() => setIsRetroOpen(true)} className="hover:text-brand-gold transition-colors uppercase tracking-widest cursor-pointer">Retro</button>
            <button onClick={() => setIsSelecaoOpen(true)} className="hover:text-brand-gold transition-colors uppercase tracking-widest cursor-pointer">Seleção</button>
            <button onClick={() => setIsPrimeOpen(true)} className="hover:text-brand-gold transition-colors uppercase tracking-widest cursor-pointer">Novidades</button>
          </div>

          <div className="flex items-center gap-4">
            <div className={`relative flex items-center transition-all duration-500 ${isSearchVisible ? 'w-48 md:w-64 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
              <input
                type="text"
                placeholder="Procurar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-white/5 border border-brand-white/10 rounded-full py-1.5 px-4 text-xs focus:outline-none focus:border-brand-gold transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-brand-white/40 hover:text-brand-white"
                >
                  <X size={12} />
                </button>
              )}
            </div>
            
            <button 
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              className={`p-2 transition-colors ${isSearchVisible ? 'text-brand-gold' : 'hover:text-brand-gold'}`}
            >
              <Search size={22} />
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:text-brand-gold transition-colors"
            >
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1920" 
            alt="Stadium Background"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-transparent to-brand-black" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-brand-gold rounded-sm flex items-center justify-center text-brand-black text-4xl md:text-6xl font-black italic shadow-2xl">
                  10
                </div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 md:w-16 md:h-16 bg-brand-white rounded-full flex items-center justify-center border-4 border-brand-navy shadow-xl">
                  <Goal className="text-brand-navy" size={24} />
                </div>
              </div>
            </div>
            <span className="inline-block px-4 py-1 border border-brand-gold text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
              A Marca dos Campeões
            </span>
            <h1 className="font-display text-6xl md:text-9xl font-bold tracking-tighter mb-4 leading-none">
              CAMISA 10
            </h1>
            <p className="text-brand-white/50 text-sm uppercase tracking-[0.5em] mb-12 font-bold">Vista a Lenda.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <a 
                href="#products" 
                className="group relative px-10 py-4 bg-brand-gold text-brand-black font-bold uppercase tracking-widest overflow-hidden transition-all hover:bg-brand-white hover:scale-105"
              >
                <span className="relative z-10">Explorar Loja</span>
              </a>
              <button 
                onClick={() => setIsPrimeOpen(true)}
                className="px-10 py-4 border border-brand-white/20 hover:border-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all font-bold uppercase tracking-widest cursor-pointer"
              >
                Novidades
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-container bg-brand-white text-brand-black font-display font-bold text-sm uppercase tracking-widest">
        <div className="marquee-content">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-12 flex items-center gap-4">
              <Activity size={16} /> CAMISA 10 FOOTBALL STORE — VISTA A LENDA — EQUIPAMENTO DE ELITE — RETRO CLASSICS — 
            </span>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <section id="products" className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-brand-gold mb-2">
              <Activity size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Em Destaque</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter">COLEÇÃO 2026</h2>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-2 w-full md:w-auto">
            {['Todos', 'Retro', 'Equipamento', 'Seleção', 'Acessórios'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-colors border-b-2 pb-1 ${
                  activeCategory === cat ? 'text-brand-gold border-brand-gold' : 'text-brand-white/50 border-transparent hover:text-brand-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 4) * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#0f0f0f] mb-4 border border-brand-white/5">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-0"
                    referrerPolicy="no-referrer"
                  />
                  {product.hoverImage && (
                    <img 
                      src={product.hoverImage} 
                      alt={`${product.name} hover`}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-105 opacity-0 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="absolute inset-0 bg-brand-navy/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="w-full bg-brand-white text-brand-black py-3 font-bold uppercase text-[10px] tracking-widest hover:bg-brand-gold transition-colors"
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="text-[9px] font-bold uppercase tracking-widest bg-brand-gold text-brand-black px-2 py-1">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start px-1">
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider group-hover:text-brand-gold transition-colors">{product.name}</h3>
                    <p className="text-brand-white/40 text-[9px] mt-1 uppercase tracking-widest">Stock Limitado</p>
                  </div>
                  <span className="font-display font-bold text-brand-gold">€{product.price}</span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-brand-white/40 uppercase tracking-[0.3em] text-sm">Nenhum produto encontrado para "{searchQuery}"</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('Todos');
                }}
                className="mt-6 text-brand-gold font-bold uppercase tracking-widest text-[10px] hover:text-brand-white transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-brand-white/5">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
            <div className="flex flex-col mb-6">
              <span className="font-display text-4xl font-bold tracking-tighter flex items-center gap-3 leading-none text-brand-white">
                <div className="w-12 h-12 bg-brand-gold rounded-sm flex items-center justify-center text-brand-black text-xl font-black italic">10</div>
                CAMISA 10
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold ml-15 mt-1">Vista a Lenda.</span>
            </div>
              <p className="text-brand-white/40 max-w-sm mb-8 text-sm uppercase tracking-wider leading-relaxed">
                A marca dos verdadeiros craques. Equipamento profissional e clássicos retro para quem vive o futebol 24/7.
              </p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-brand-gold transition-colors"><Instagram size={20} /></a>
                <a href="#" className="hover:text-brand-gold transition-colors"><Github size={20} /></a>
              </div>
            </div>
            <div>
              <h4 className="font-bold uppercase text-[10px] tracking-[0.3em] text-brand-gold mb-8">Categorias</h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-brand-white/40">
                <li><a href="#" className="hover:text-brand-white transition-colors">Equipamentos</a></li>
                <li><a href="#" className="hover:text-brand-white transition-colors">Retro Classics</a></li>
                <li><a href="#" className="hover:text-brand-white transition-colors">Botas de Elite</a></li>
                <li><a href="#" className="hover:text-brand-white transition-colors">Acessórios</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase text-[10px] tracking-[0.3em] text-brand-gold mb-8">Info</h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-brand-white/40">
                <li><a href="#" className="hover:text-brand-white transition-colors">Tamanhos</a></li>
                <li><a href="#" className="hover:text-brand-white transition-colors">Apoio ao Cliente</a></li>
                <li><button onClick={() => setIsFAQOpen(true)} className="hover:text-brand-white transition-colors uppercase tracking-widest cursor-pointer">Perguntas Frequentes (FAQ)</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-brand-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-bold uppercase tracking-[0.4em] text-brand-white/20">
            <p>© 2026 CAMISA 10 FOOTBALL STORE. O JOGO COMEÇA AQUI.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-brand-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-brand-white transition-colors">Termos de Serviço</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-brand-black/90 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-brand-black border-l border-brand-white/10 z-[70] p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="font-display text-3xl font-bold tracking-tighter">CARRINHO</h2>
                <button onClick={() => setIsCartOpen(false)} className="hover:text-brand-gold transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                {cart.length === 0 ? (
                  <div className="text-center py-20 opacity-20">
                    <Goal size={64} className="mx-auto mb-4 text-brand-gold" />
                    <p className="uppercase tracking-widest text-[10px] font-bold">O teu balneário está vazio</p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="flex gap-4 group p-2 border border-brand-white/5 bg-brand-white/5">
                      <div className="w-20 h-24 bg-[#0f0f0f] overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-[10px] font-bold uppercase tracking-wider">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(idx)}
                            className="text-brand-white/30 hover:text-brand-gold transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-[9px] text-brand-white/40 mt-1 uppercase tracking-widest">Tamanho: Único</p>
                        <p className="font-display font-bold mt-2 text-brand-gold">€{item.price}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="pt-8 border-t border-brand-white/10 mt-8">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-white/40">Subtotal</span>
                    <span className="font-display text-3xl font-bold text-brand-gold">€{cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-brand-gold text-brand-black py-4 font-bold uppercase tracking-[0.2em] text-xs hover:bg-brand-white transition-colors">
                    Finalizar Pedido
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 bg-brand-black z-[100] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-20">
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold tracking-tighter flex items-center gap-2 leading-none text-brand-white">
                  <div className="w-8 h-8 bg-brand-gold rounded-sm flex items-center justify-center text-brand-black text-xs font-black italic">10</div>
                  CAMISA 10
                </span>
                <span className="text-[8px] uppercase tracking-[0.4em] text-brand-gold font-bold ml-10">Vista a Lenda.</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="hover:text-brand-gold transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-8 text-5xl font-display font-bold tracking-tighter">
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsEquipamentosOpen(true);
                }} 
                className="text-left hover:text-brand-gold transition-colors"
              >
                Equipamentos
              </button>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsRetroOpen(true);
                }} 
                className="text-left hover:text-brand-gold transition-colors"
              >
                Retro
              </button>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsSelecaoOpen(true);
                }} 
                className="text-left hover:text-brand-gold transition-colors"
              >
                Seleção
              </button>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsPrimeOpen(true);
                }} 
                className="text-left hover:text-brand-gold transition-colors"
              >
                Novidades
              </button>
              <a href="#" className="hover:text-brand-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Acessórios</a>
            </div>
            <div className="mt-auto flex justify-between items-end">
              <div className="flex gap-6">
                <Instagram size={24} className="hover:text-brand-gold transition-colors cursor-pointer" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/50">Lisboa, PT</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-brand-black/95 backdrop-blur-md z-[500]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 m-auto w-[90%] max-w-4xl h-fit max-h-[90vh] bg-brand-black border border-brand-white/10 z-[510] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-20 p-2 bg-brand-black/50 hover:bg-brand-gold hover:text-brand-black transition-all rounded-full"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 h-[400px] md:h-auto bg-[#0f0f0f] relative group/modal">
                <img 
                  src={activeImage || selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Thumbnails */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                  {[selectedProduct.image, selectedProduct.hoverImage, selectedProduct.thirdImage].filter(Boolean).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(img!)}
                      className={`w-12 h-12 border-2 transition-all duration-300 overflow-hidden ${
                        activeImage === img ? 'border-brand-gold scale-110 shadow-lg' : 'border-brand-white/20 opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img src={img!} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col">
                <div className="flex items-center gap-2 text-brand-gold mb-4">
                  <Activity size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{selectedProduct.category}</span>
                </div>
                
                <h2 className="font-display text-2xl md:text-5xl font-bold tracking-tighter mb-4 leading-none">
                  {selectedProduct.name}
                </h2>
                
                <p className="text-brand-white/60 text-xs md:text-sm uppercase tracking-wider leading-relaxed mb-6 md:mb-8 font-medium">
                  {selectedProduct.description}
                </p>

                <div className="mb-6 md:mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-white/30 block mb-4">Tamanhos Disponíveis</span>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {selectedProduct.sizes.map(size => (
                      <button 
                        key={size} 
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-2 md:px-4 md:py-2 border text-[10px] font-bold transition-all duration-300 ${
                          selectedSize === size 
                            ? 'border-brand-gold bg-brand-gold text-brand-black scale-110 shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                            : 'border-brand-white/10 text-brand-white hover:border-brand-gold/50 hover:text-brand-gold'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 mt-auto pt-6 md:pt-8 border-t border-brand-white/5">
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-white/30 block mb-1">Preço</span>
                    <span className="font-display text-3xl md:text-4xl font-bold text-brand-gold">€{selectedProduct.price}</span>
                  </div>
                  <button 
                    disabled={!selectedSize}
                    onClick={() => {
                      if (selectedSize) {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }
                    }}
                    className={`w-full sm:w-auto px-8 py-4 font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all duration-300 ${
                      selectedSize 
                        ? 'bg-brand-gold text-brand-black hover:bg-brand-white cursor-pointer' 
                        : 'bg-brand-white/10 text-brand-white/30 cursor-not-allowed'
                    }`}
                  >
                    {selectedSize ? 'Adicionar ao Carrinho' : 'Selecione um Tamanho'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* PRIME Products Overlay */}
      <AnimatePresence>
        {isPrimeOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-black z-[200] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-6 py-20">
              <div className="flex justify-between items-center mb-16">
                <div>
                  <div className="flex items-center gap-2 text-brand-gold mb-2">
                    <Trophy size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Coleção Exclusiva</span>
                  </div>
                  <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter">PRODUTOS <span className="text-brand-gold">PRIME</span></h2>
                </div>
                <button 
                  onClick={() => {
                    setIsPrimeOpen(false);
                    setShowAllPrime(false);
                  }} 
                  className="p-4 bg-brand-white/5 hover:bg-brand-gold hover:text-brand-black transition-all rounded-full"
                >
                  <X size={32} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {PRIME_PRODUCTS.slice(0, showAllPrime ? 8 : 4).map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#0f0f0f] mb-4 border border-brand-gold/20">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-0"
                        referrerPolicy="no-referrer"
                      />
                      {product.hoverImage && (
                        <img 
                          src={product.hoverImage} 
                          alt={`${product.name} hover`}
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-105 opacity-0 group-hover:opacity-100"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div className="absolute inset-0 bg-brand-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-4 left-4">
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] bg-brand-gold text-brand-black px-2 py-1">PRIME</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-start px-1">
                      <h3 className="font-bold text-xs uppercase tracking-wider group-hover:text-brand-gold transition-colors">{product.name}</h3>
                      <span className="font-display font-bold text-brand-gold">€{product.price}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {!showAllPrime && (
                <div className="mt-20 text-center">
                  <button 
                    onClick={() => setShowAllPrime(true)}
                    className="group flex items-center gap-4 mx-auto text-[10px] font-bold uppercase tracking-[0.4em] hover:text-brand-gold transition-colors"
                  >
                    Mostrar Mais <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EQUIPAMENTOS Products Overlay */}
      <AnimatePresence>
        {isEquipamentosOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-black z-[200] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-6 py-20">
              <div className="flex justify-between items-center mb-16">
                <div>
                  <div className="flex items-center gap-2 text-brand-gold mb-2">
                    <Activity size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Performance & Seleção</span>
                  </div>
                  <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter">EQUIPAMENTOS</h2>
                </div>
                <button 
                  onClick={() => setIsEquipamentosOpen(false)} 
                  className="p-4 bg-brand-white/5 hover:bg-brand-gold hover:text-brand-black transition-all rounded-full"
                >
                  <X size={32} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {EQUIPAMENTOS_PRODUCTS.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (idx % 4) * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#0f0f0f] mb-4 border border-brand-white/5">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-0"
                        referrerPolicy="no-referrer"
                      />
                      {product.hoverImage && (
                        <img 
                          src={product.hoverImage} 
                          alt={`${product.name} hover`}
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-105 opacity-0 group-hover:opacity-100"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div className="absolute inset-0 bg-brand-navy/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex justify-between items-start px-1">
                      <div>
                        <h3 className="font-bold text-xs uppercase tracking-wider group-hover:text-brand-gold transition-colors">{product.name}</h3>
                        <span className="text-[8px] uppercase tracking-widest text-brand-white/30 font-bold">{product.category}</span>
                      </div>
                      <span className="font-display font-bold text-brand-gold">€{product.price}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RETRO Products Overlay */}
      <AnimatePresence>
        {isRetroOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-black z-[200] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-6 py-20">
              <div className="flex justify-between items-center mb-16">
                <div>
                  <div className="flex items-center gap-2 text-brand-gold mb-2">
                    <Trophy size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Clássicos Eternos</span>
                  </div>
                  <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter">COLECÇÃO <span className="text-brand-gold">RETRO</span></h2>
                </div>
                <button 
                  onClick={() => setIsRetroOpen(false)} 
                  className="p-4 bg-brand-white/5 hover:bg-brand-gold hover:text-brand-black transition-all rounded-full"
                >
                  <X size={32} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {RETRO_PRODUCTS.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (idx % 4) * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#0f0f0f] mb-4 border border-brand-white/5">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-0"
                        referrerPolicy="no-referrer"
                      />
                      {product.hoverImage && (
                        <img 
                          src={product.hoverImage} 
                          alt={`${product.name} hover`}
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-105 opacity-0 group-hover:opacity-100"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div className="absolute inset-0 bg-brand-navy/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex justify-between items-start px-1">
                      <div>
                        <h3 className="font-bold text-xs uppercase tracking-wider group-hover:text-brand-gold transition-colors">{product.name}</h3>
                        <span className="text-[8px] uppercase tracking-widest text-brand-white/30 font-bold">{product.category}</span>
                      </div>
                      <span className="font-display font-bold text-brand-gold">€{product.price}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SELEÇÃO Products Overlay */}
      <AnimatePresence>
        {isSelecaoOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-black z-[200] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-6 py-20">
              <div className="flex justify-between items-center mb-16">
                <div>
                  <div className="flex items-center gap-2 text-brand-gold mb-2">
                    <Activity size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Alta Performance</span>
                  </div>
                  <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter">EQUIPAMENTO <span className="text-brand-gold">SELEÇÃO</span></h2>
                </div>
                <button 
                  onClick={() => setIsSelecaoOpen(false)} 
                  className="p-4 bg-brand-white/5 hover:bg-brand-gold hover:text-brand-black transition-all rounded-full"
                >
                  <X size={32} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {SELECAO_PRODUCTS.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (idx % 4) * 0.1 }}
                    className="group cursor-pointer relative"
                    onClick={() => setSelectedCountry(product)}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#0f0f0f] mb-4 border border-brand-white/5">
                      {/* Flag Background */}
                      {product.flag && (
                        <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                          <img 
                            src={product.flag} 
                            alt="Flag Background" 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Native Name Overlay on Hover */}
                      <div className="absolute inset-0 bg-brand-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <span className="font-display text-3xl font-bold tracking-tighter text-brand-gold uppercase">
                          {product.nativeName}
                        </span>
                      </div>
                      
                      <div className="absolute inset-0 bg-brand-navy/20 opacity-0 group-hover:opacity-100 transition-opacity z-15" />
                    </div>
                    <div className="flex justify-between items-start px-1">
                      <div>
                        <h3 className="font-bold text-xs uppercase tracking-wider group-hover:text-brand-gold transition-colors">{product.name}</h3>
                        <span className="text-[8px] uppercase tracking-widest text-brand-white/30 font-bold">{product.category}</span>
                      </div>
                      <span className="font-display font-bold text-brand-gold">€{product.price}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* FAQ Overlay */}
      <AnimatePresence>
        {isFAQOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFAQOpen(false)}
              className="fixed inset-0 bg-brand-black/95 backdrop-blur-md z-[600]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 m-auto w-[90%] max-w-2xl h-fit max-h-[80vh] bg-brand-black border border-brand-white/10 z-[610] p-8 md:p-12 shadow-2xl overflow-y-auto"
            >
              <button 
                onClick={() => setIsFAQOpen(false)}
                className="absolute top-6 right-6 z-20 p-2 bg-brand-black/50 hover:bg-brand-gold hover:text-brand-black transition-all rounded-full"
              >
                <X size={20} />
              </button>

              <div className="mb-12">
                <div className="flex items-center gap-2 text-brand-gold mb-4">
                  <Activity size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Apoio ao Cliente</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter leading-none">
                  PERGUNTAS <span className="text-brand-gold">FREQUENTES</span>
                </h2>
              </div>

              <div className="space-y-8">
                {[
                  {
                    q: "Quanto tempo demora a chegar a minha encomenda?",
                    a: (
                      <div className="space-y-4 pt-2">
                        <div className="flex flex-col gap-4">
                          <div className="border-l-2 border-brand-gold pl-4 py-1">
                            <p className="font-bold text-brand-white text-[10px] tracking-widest uppercase mb-2">Processamento da Encomenda</p>
                            <p className="text-brand-white/60">Todas as encomendas são processadas e produzidas em 48 a 72 horas antes do envio.</p>
                          </div>
                          
                          <div className="border-l-2 border-brand-gold pl-4 py-1">
                            <p className="font-bold text-brand-white text-[10px] tracking-widest uppercase mb-2">Prazos de Entrega (após envio):</p>
                            <ul className="space-y-2 text-brand-white/60">
                              <li className="flex items-center gap-2"><span className="w-1 h-1 bg-brand-gold rounded-full"></span> Envio Standard: 10 a 20 dias úteis.</li>
                              <li className="flex items-center gap-2"><span className="w-1 h-1 bg-brand-gold rounded-full"></span> Envio Expresso: 5 a 10 dias úteis.</li>
                              <li className="flex items-center gap-2"><span className="w-1 h-1 bg-brand-gold rounded-full"></span> Regiões Autónomas: 15-25 dias úteis</li>
                            </ul>
                          </div>

                          <div className="bg-brand-white/5 p-4 rounded-sm border border-brand-white/10">
                            <p className="text-brand-gold flex items-start gap-2 mb-3">
                              <span className="shrink-0">⚠️</span> 
                              <span>Atenção: Os prazos acima referem-se apenas ao tempo de envio. Não incluem o tempo de processamento e produção da encomenda.</span>
                            </p>
                            <p className="text-brand-white/80 flex items-center gap-2">
                              <span className="shrink-0">👉</span>
                              <span>
                                Para mais informações,{' '}
                                <button 
                                  onClick={() => setIsShippingPolicyOpen(true)}
                                  className="underline hover:text-brand-gold transition-colors cursor-pointer"
                                >
                                  consulta a nossa Política de Envio
                                </button>.
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  },
                  {
                    q: "fazemos envio a cobrança?",
                    a: "Percebemos perfeitamente que prefiras o envio à cobrança — é uma opção mais confortável para muitos clientes 😊\nNo entanto, na Camisa10 trabalhamos com produtos importados e personalizados ao teu gosto, o que implica produção específica para cada encomenda. Por esse motivo, não conseguimos realizar envios à cobrança.\n\nSe tiveres alguma dúvida ou precisares de ajuda com o processo, estamos aqui para ajudar!"
                  },
                  {
                    q: "qualidade do produto?",
                    a: "Trabalhamos apenas com materiais de alta qualidade, garantindo durabilidade e conforto em todas as nossas peças. Todos os detalhes são verificados para assegurar a máxima satisfação."
                  }
                ].map((item, i) => (
                  <div key={i} className="border-b border-brand-white/5 pb-6 last:border-0">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-brand-gold font-bold uppercase tracking-widest text-xs mt-1">
                        {item.q}
                      </h3>
                      <button 
                        onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                        className="text-[9px] font-black uppercase tracking-[0.2em] bg-brand-white/5 hover:bg-brand-gold hover:text-brand-black px-3 py-1.5 transition-all shrink-0"
                      >
                        {expandedFAQ === i ? 'Fechar' : 'Ver mais'}
                      </button>
                    </div>
                    
                    <AnimatePresence>
                      {expandedFAQ === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-6 text-brand-white/50 text-[11px] uppercase tracking-wider leading-relaxed font-medium max-h-[300px] overflow-y-auto pr-4 custom-scrollbar whitespace-pre-line">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Shipping Policy Overlay */}
      <AnimatePresence>
        {isShippingPolicyOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShippingPolicyOpen(false)}
              className="fixed inset-0 bg-brand-black/95 backdrop-blur-md z-[700]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 m-auto w-[95%] max-w-4xl h-fit max-h-[90vh] bg-brand-black border border-brand-white/10 z-[710] p-8 md:p-16 shadow-2xl overflow-y-auto custom-scrollbar"
            >
              <button 
                onClick={() => setIsShippingPolicyOpen(false)}
                className="absolute top-6 right-6 z-20 p-2 bg-brand-black/50 hover:bg-brand-gold hover:text-brand-black transition-all rounded-full"
              >
                <X size={24} />
              </button>

              <div className="mb-12">
                <div className="flex items-center gap-2 text-brand-gold mb-4">
                  <Activity size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Informação Legal</span>
                </div>
                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter leading-none">
                  POLÍTICA DE <span className="text-brand-gold">ENVIO</span>
                </h2>
              </div>

              <div className="space-y-10 text-brand-white/70 text-sm md:text-base leading-relaxed">
                <section>
                  <p className="text-brand-white font-medium mb-4">
                    Obrigado por escolher a <span className="text-brand-gold">Camisa10</span>! 
                    Estamos encantados por lhe proporcionar uma experiência de compras excepcional. 
                    Por favor, reserve um momento para rever a nossa política de envio antes de efetuar a sua encomenda.
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <section className="space-y-4">
                    <h3 className="text-brand-gold font-bold uppercase tracking-widest text-xs">Tempo de Processamento</h3>
                    <p>
                      Por serem artigos de caráter personalizado, as encomendas são normalmente processadas dentro de 
                      <span className="text-brand-white font-bold"> 3 a 5 dias úteis</span> após a confirmação do pagamento. 
                      Este prazo corresponde ao tempo entre o pagamento e a preparação da encomenda para envio.
                    </p>
                    <p className="text-xs italic opacity-60">
                      * Durante épocas de maior movimento ou períodos promocionais, os tempos de processamento podem ser ligeiramente mais longos.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-brand-gold font-bold uppercase tracking-widest text-xs">Prazos de Entrega</h3>
                    <p>
                      O tempo de entrega varia com base na sua localização:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-brand-gold mt-1">•</span>
                        <span>Geralmente entre <span className="text-brand-white font-bold">10 a 20 dias úteis</span> após o processamento.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-gold mt-1">•</span>
                        <span>Pode estender-se a <span className="text-brand-white font-bold">25 dias úteis</span> em épocas de maior afluência.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-gold mt-1">•</span>
                        <span>Envios para as Regiões Autónomas podem ter um prazo mais alargado.</span>
                      </li>
                    </ul>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-brand-gold font-bold uppercase tracking-widest text-xs">Acompanhamento</h3>
                    <p>
                      Assim que a sua encomenda for enviada, iremos fornecer-lhe um número de rastreamento por e-mail ou SMS. 
                      Pode utilizar este número para monitorizar o estado de entrega em tempo real.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-brand-gold font-bold uppercase tracking-widest text-xs">Custos de Envio</h3>
                    <div className="bg-brand-gold/10 border border-brand-gold/20 p-4 rounded-sm">
                      <p className="text-brand-gold font-bold text-center uppercase tracking-widest">
                        O envio é gratuito para Portugal e Ilhas a partir de 2 unidades!
                      </p>
                    </div>
                  </section>
                </div>

                <section className="space-y-4 border-t border-brand-white/10 pt-10">
                  <h3 className="text-brand-gold font-bold uppercase tracking-widest text-xs">Envio Internacional e Alfândega</h3>
                  <p>
                    As encomendas internacionais podem estar sujeitas a direitos aduaneiros, impostos ou outras taxas impostas pelas regulamentações do seu país. 
                    Estas taxas são da <span className="text-brand-white font-bold underline">responsabilidade do destinatário</span> e não estão incluídas no preço do produto.
                  </p>
                </section>

                <section className="space-y-4">
                  <h3 className="text-brand-gold font-bold uppercase tracking-widest text-xs">Precisão do Endereço</h3>
                  <p>
                    Forneça informações de envio precisas e completas durante o checkout. 
                    Não somos responsáveis por atrasos ou problemas de entrega causados por detalhes de endereço incorretos ou incompletos.
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-brand-white/10 pt-10">
                  <section className="space-y-4">
                    <h3 className="text-brand-gold font-bold uppercase tracking-widest text-xs">Atrasos na Entrega</h3>
                    <p>
                      Embora façamos todos os esforços para cumprir os prazos, fatores como condições climáticas ou inspeções alfandegárias 
                      podem causar atrasos além do nosso controlo. Agradecemos a sua compreensão.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-brand-gold font-bold uppercase tracking-widest text-xs">Perdas ou Danos</h3>
                    <p>
                      No raro caso de a sua encomenda se perder ou danificar, entre imediatamente em contacto connosco. 
                      Trabalharemos diligentemente para oferecer soluções adequadas.
                    </p>
                  </section>
                </div>

                <section className="bg-brand-white/5 p-8 rounded-sm text-center space-y-4">
                  <h3 className="text-brand-gold font-bold uppercase tracking-widest text-xs">Apoio ao Cliente</h3>
                  <p>
                    Para qualquer questão sobre o estado do seu envio, contacte-nos através do email:
                  </p>
                  <p className="text-brand-gold font-bold text-xl md:text-2xl">
                    camisa10@gmail.com
                  </p>
                  <p className="text-xs opacity-50">
                    Estamos aqui para ajudá-lo em cada passo do caminho.
                  </p>
                </section>

                <section className="text-[10px] uppercase tracking-[0.2em] opacity-40 text-center pt-10">
                  <p>
                    Esta política de envio está sujeita a alterações sem aviso prévio. 
                    Ao efetuar uma encomenda, reconhece e concorda com os termos aqui descritos.
                  </p>
                  <p className="mt-4 font-bold text-brand-gold">
                    Obrigado por comprar na Camisa10!
                  </p>
                </section>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Country Sub-Options Overlay */}
      <AnimatePresence>
        {selectedCountry && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-brand-black/95 z-[300] flex items-start md:items-center justify-center p-4 md:p-6 backdrop-blur-xl overflow-y-auto"
          >
            <div className="max-w-5xl w-full py-12 md:py-0">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-2 block">Coleção Oficial</span>
                  <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter">
                    {selectedCountry.nativeName} <span className="text-brand-gold">OPTIONS</span>
                  </h2>
                </div>
                <button 
                  onClick={() => setSelectedCountry(null)} 
                  className="p-4 bg-brand-white/5 hover:bg-brand-gold hover:text-brand-black transition-all rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { type: 'Principal', price: 89.99, img: selectedCountry.image },
                  { type: 'Alternativo', price: 84.99, img: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800" },
                  { type: 'Treino', price: 114.99, img: "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=800" },
                  { type: 'Lifestyle', price: 59.99, img: "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=800" }
                ].map((opt, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => {
                      setSelectedProduct({
                        ...selectedCountry,
                        id: selectedCountry.id * 100 + i,
                        name: `Equipamento ${opt.type} - ${selectedCountry.nativeName}`,
                        price: opt.price,
                        image: opt.img,
                        description: `A versão oficial ${opt.type.toLowerCase()} da seleção de ${selectedCountry.nativeName}. Qualidade elite para os adeptos mais exigentes.`
                      });
                    }}
                  >
                    <div className="relative aspect-square overflow-hidden bg-brand-white/5 border border-brand-white/10 mb-4">
                      <img 
                        src={opt.img} 
                        alt={opt.type}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-brand-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-brand-gold font-bold uppercase tracking-widest text-xs">Ver Detalhes</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-[10px] uppercase tracking-widest mb-1 group-hover:text-brand-gold transition-colors">{opt.type}</h3>
                    <span className="font-display font-bold text-brand-gold">€{opt.price}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
