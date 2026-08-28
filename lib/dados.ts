/* Dados reais do Man Space | Male Concept, em Matosinhos.

   Duas fontes, que não coincidem: o painel de marcações em
   sites.appbarber.com.br/manspace-j56c dá o que é marcável e as durações; o
   poster de preços da loja dá os nomes da casa, as descrições e o que vai
   dentro de cada pack. O AppBarber manda no que existe, o poster manda no que
   se lê.

   Preços em euros, durações em minutos.

   POR CONFIRMAR: morada, telefone, horário, ano de abertura e número de
   avaliações. Estão todos aqui em baixo, assinalados — o site sabe esconder o
   que estiver vazio. */

export type Grupo =
  | "Experiências Man Space"
  | "Cortes"
  | "Barba"
  | "Extras & Cuidados"
  | "Prótese capilar";

export type EstadoMarcacao = "agendada" | "concluida" | "falta";

export interface Servico {
  id: string;
  nome: string;
  grupo: Grupo;
  minutos: number;
  preco: number;
  /** Quando o preço é um mínimo e não um valor fechado: "desde 45 €". */
  desde?: boolean;
  /** A linha do poster, quando existe. Aparece sob o nome na carta. */
  descricao?: string;
  /** O que o pack inclui. Só os dois packs a têm. */
  inclui?: string[];
  destaque?: boolean;
}

export interface Barbeiro {
  id: string;
  nome: string;
  papel: string;
  foto: string;
  bio: string;
}

export interface DiaHorario {
  dia: string;
  aberto: boolean;
  abre: string | null;
  fecha: string | null;
}

export interface Foto {
  /** `null` enquanto a fotografia não existir: sai uma moldura no lugar. */
  src: string | null;
  alt: string;
  /** Largura a dividir por altura. Fixa o lugar antes de a foto lá estar. */
  ratio: number;
}

export interface Marcacao {
  id: string;
  servicoId: string;
  minutos: number;
  preco: number;
  barbeiroId: string;
  escolhaBarbeiro: string;
  data: string;      // YYYY-MM-DD
  inicio: number;    // minutos desde a meia-noite
  nome: string;
  telemovel: string;
  notas: string;
  estado: EstadoMarcacao;
  minha: boolean;
  criadoEm: number;
}

export const CASA = {
  nome: "Man Space",
  nomeCompleto: "Man Space | Male Concept",
  lema: "Experiências que elevam o seu padrão.",
  lemaEN: "Experiences that elevate your standard.",
  /** POR CONFIRMAR — ano de abertura. `null` esconde as frases que o usariam. */
  desde: null as number | null,
  /* Lidos da ficha do Google Maps da casa — vale a pena confirmares com eles. */
  morada: "Av. da República 606",
  codigoPostal: "4450-242",
  localidade: "Matosinhos",
  /** POR CONFIRMAR — vazio esconde o telefone e os botões de chamada. */
  telefone: "",
  telefoneRaw: "",
  instagram: "https://www.instagram.com/manspace.pt/",
  /* `mapa` é a ligação que abre o Google Maps, `mapaEmbed` é o mesmo sítio
     dentro do iframe da página. O `output=embed` não precisa de chave de API.
     A consulta do iframe fica pelo nome de propósito: assim o Maps abre a ficha
     da casa, com a avaliação e a fotografia, em vez de um alfinete anónimo. */
  mapa: "https://www.google.com/maps/search/?api=1&query=Man+Space+Male+Concept,+Av.+da+Rep%C3%BAblica+606,+4450-242+Matosinhos",
  mapaEmbed: "https://www.google.com/maps?q=Man+Space+Male+Concept+Matosinhos&z=15&output=embed",
  /* Também da ficha do Google. `null` em qualquer um esconde-o. */
  avaliacoes: 237 as number | null,
  estrelas: 5 as number | null,
  /* Sete entradas indexadas por Date.getDay(): 0 é domingo. Não reordenar — o
     motor de marcações, o rodapé e o "Aberto até às…" leem este array pelo
     índice do dia. */
  horario: [
    { dia: "Domingo", aberto: false, abre: null,    fecha: null },
    { dia: "Segunda", aberto: true,  abre: "10:00", fecha: "19:00" },
    { dia: "Terça",   aberto: true,  abre: "10:00", fecha: "19:00" },
    { dia: "Quarta",  aberto: true,  abre: "10:00", fecha: "19:00" },
    { dia: "Quinta",  aberto: true,  abre: "10:00", fecha: "19:00" },
    { dia: "Sexta",   aberto: true,  abre: "09:00", fecha: "19:00" },
    { dia: "Sábado",  aberto: true,  abre: "09:00", fecha: "18:00" }
  ] as DiaHorario[]
};

/* POR CONFIRMAR: os papéis e as bios foram escritos a partir da carta, não ditos
   pela casa. Os nomes e as fotografias, esses, são os verdadeiros. */
export const BARBEIROS: Barbeiro[] = [
  {
    id: "bruno",
    nome: "Bruno Tissi",
    papel: "Barbeiro · Prótese capilar",
    foto: "/img/barbeiro-bruno-tissi.jpg",
    bio: "Aplicação e adaptação de prótese capilar, feita à medida de cada cabeça."
  },
  {
    id: "wemysson",
    nome: "Wemysson Silva",
    papel: "Barbeiro · Barba e navalha",
    foto: "/img/barbeiro-wemysson-silva.jpg",
    bio: "Barbaterapia e método full barba: toalha quente, desenho e acabamento."
  },
  {
    id: "leonardo",
    nome: "Leonardo Oliveira",
    papel: "Barbeiro · Degradés",
    foto: "/img/barbeiro-leonardo-oliveira.jpg",
    bio: "Corte shaver e degradé com acabamento à navalha. Linha limpa, mão firme."
  },
  {
    id: "patrick",
    nome: "Patrick Monteiro",
    papel: "Barbeiro · Coloração",
    foto: "/img/barbeiro-patrick-monteiro.jpg",
    bio: "Madeixas, platinados e pigmentação. Descoloração feita com tempo."
  }
];

export const SERVICOS: Servico[] = [
  {
    id: "pack-man-space",
    nome: "Pack Man Space",
    grupo: "Experiências Man Space",
    minutos: 60,
    preco: 50,
    destaque: true,
    descricao: "A experiência completa Man Space.",
    inclui: [
      "Corte premium com lavagem",
      "Barbaterapia",
      "Método full barba",
      "Hidratação no ozono",
      "Limpeza de pele / esfoliação",
      "Sobrancelha",
      "Toalha quente",
      "Massagem relaxante",
      "Finalização premium"
    ]
  },
  {
    id: "pack-premium",
    nome: "Pack Premium",
    grupo: "Experiências Man Space",
    minutos: 60,
    preco: 30,
    destaque: true,
    descricao: "Experiência completa para cabelo e cuidados essenciais.",
    inclui: [
      "Corte com lavagem",
      "Hidratação",
      "Limpeza de pele / esfoliação",
      "Sobrancelha",
      "Massagem relaxante",
      "Toalha quente",
      "Finalização premium"
    ]
  },

  {
    id: "corte-tradicional",
    nome: "Corte tradicional",
    grupo: "Cortes",
    minutos: 30,
    preco: 16,
    destaque: true,
    descricao: "Corte clássico com acabamento premium."
  },
  {
    id: "corte-com-lavagem",
    nome: "Corte com lavagem",
    grupo: "Cortes",
    minutos: 30,
    preco: 18,
    descricao: "Corte completo com lavagem e finalização."
  },
  {
    id: "corte-shaver",
    nome: "Corte shaver",
    grupo: "Cortes",
    minutos: 30,
    preco: 18,
    descricao: "Degradé com acabamento à navalha."
  },
  {
    id: "corte-sobrancelha",
    nome: "Corte + sobrancelha",
    grupo: "Cortes",
    minutos: 30,
    preco: 18,
    descricao: "Corte com desenho de sobrancelha incluído."
  },
  {
    id: "corte-barba",
    nome: "Corte + barba",
    grupo: "Cortes",
    minutos: 45,
    preco: 25,
    destaque: true,
    descricao: "Corte e barba modelada na mesma cadeira."
  },
  {
    id: "cabelo-barba-sobrancelha",
    nome: "Cabelo + barba + sobrancelha",
    grupo: "Cortes",
    minutos: 45,
    preco: 27,
    descricao: "As três coisas de uma vez, do princípio ao fim."
  },
  {
    id: "contorno",
    nome: "Contorno",
    grupo: "Cortes",
    minutos: 15,
    preco: 5,
    descricao: "Acerto de linhas entre cortes."
  },

  {
    id: "barba-modelada-toalha",
    nome: "Barba modelada + toalha",
    grupo: "Barba",
    minutos: 15,
    preco: 12,
    descricao: "Modelada com toalha quente."
  },
  {
    id: "barbaterapia",
    nome: "Barbaterapia",
    grupo: "Barba",
    minutos: 15,
    preco: 17,
    descricao: "Relaxamento, hidratação e cuidado completo da barba."
  },
  {
    id: "metodo-full-barba",
    nome: "Método full barba",
    grupo: "Barba",
    minutos: 15,
    preco: 20,
    descricao: "Experiência premium completa para barba."
  },
  {
    id: "pigmentacao",
    nome: "Pigmentação",
    grupo: "Barba",
    minutos: 15,
    preco: 10,
    desde: true,
    descricao: "Correcção e cobertura de fios."
  },

  {
    id: "limpeza-de-pele",
    nome: "Limpeza de pele / esfoliação",
    grupo: "Extras & Cuidados",
    minutos: 15,
    preco: 10,
    descricao: "Remoção de impurezas e renovação da pele."
  },
  {
    id: "hidratacao-ozono",
    nome: "Hidratação no ozono",
    grupo: "Extras & Cuidados",
    minutos: 15,
    preco: 10,
    descricao: "Tratamento intensivo com tecnologia de ozono."
  },
  {
    id: "hidratacao-tradicional",
    nome: "Hidratação tradicional",
    grupo: "Extras & Cuidados",
    minutos: 15,
    preco: 5,
    descricao: "Reposição de hidratação e brilho."
  },
  {
    id: "lavagem-profunda",
    nome: "Lavagem profunda",
    grupo: "Extras & Cuidados",
    minutos: 15,
    preco: 5,
    descricao: "Limpeza profunda do couro cabeludo."
  },
  {
    id: "higienizacao-nariz-e-ouvidos",
    nome: "Higienização nariz e ouvidos",
    grupo: "Extras & Cuidados",
    minutos: 15,
    preco: 8,
    descricao: "Serviço completo, os dois."
  },
  {
    id: "higienizacao-nariz-ou-ouvidos",
    nome: "Higienização nariz ou ouvidos",
    grupo: "Extras & Cuidados",
    minutos: 15,
    preco: 5,
    descricao: "Serviço individual, à escolha."
  },
  {
    id: "sobrancelha",
    nome: "Sobrancelha",
    grupo: "Extras & Cuidados",
    minutos: 15,
    preco: 5,
    descricao: "Desenho e limpeza."
  },
  {
    id: "madeixas",
    nome: "Madeixas",
    grupo: "Extras & Cuidados",
    minutos: 90,
    preco: 45,
    desde: true,
    descricao: "Iluminação personalizada."
  },
  {
    id: "platinado",
    nome: "Platinado",
    grupo: "Extras & Cuidados",
    minutos: 90,
    preco: 50,
    desde: true,
    descricao: "Descoloração premium."
  },

  {
    id: "protese-capilar",
    nome: "Prótese capilar",
    grupo: "Prótese capilar",
    minutos: 180,
    preco: 400,
    desde: true,
    descricao: "Aplicação e adaptação personalizada."
  },
  {
    id: "protese-capilar-barba",
    nome: "Prótese + barba",
    grupo: "Prótese capilar",
    minutos: 180,
    preco: 450,
    desde: true,
    descricao: "Prótese capilar e barba, modeladas para um visual completo e natural."
  },
  {
    id: "protese-capilar-pack-premium",
    nome: "Prótese + Pack Premium",
    grupo: "Prótese capilar",
    minutos: 180,
    preco: 480,
    desde: true,
    descricao: "Prótese capilar com o Pack Premium, para a experiência completa."
  }
];

/* POR CONFIRMAR: as fotografias do espaço ainda não chegaram. Enquanto `src`
   for null sai uma moldura com o monograma no lugar, do mesmo tamanho que a
   fotografia vai ter — assim o desenho da página não muda quando entrarem. */
export const GALERIA: Foto[] = [
  { src: null, ratio: 4 / 3, alt: "O salão visto da entrada, com a parede de ripado em madeira" },
  { src: null, ratio: 3 / 4, alt: "As cadeiras e a bancada de trabalho" },
  { src: null, ratio: 3 / 4, alt: "Pormenor da placa Man Space na parede" },
  { src: null, ratio: 1, alt: "Um corte a ser acabado à navalha" },
  { src: null, ratio: 3 / 4, alt: "A zona de espera" }
];

export interface Testemunho {
  texto: string;
  autor: string;
  /** De 1 a 5. Omitido quando a avaliação não trazia estrelas. */
  estrelas?: number;
}

/* POR CONFIRMAR — as avaliações reais do Google ou do Instagram.
   Está vazio de propósito: inventar testemunhos seria pôr na boca de clientes
   palavras que eles não disseram, e é o género de coisa que passa despercebida
   até ao dia em que não passa. A secção só aparece quando isto tiver conteúdo. */
export const TESTEMUNHOS: Testemunho[] = [];
