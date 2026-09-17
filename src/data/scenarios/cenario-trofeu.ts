import type { RoleDef, RoleId } from "../../types";

// Conteúdo do mistério. Trocar este arquivo (ou criar um novo cenario-*.ts)
// é suficiente para reskinar o jogo sem tocar nos componentes de role.

export const ROLES: RoleDef[] = [
  {
    id: "perito-imagens",
    label: "Perito de Imagens",
    icon: "🔍",
    color: "cyan",
    tagline: "Examina fotos da cena em alta definição.",
  },
  {
    id: "analista-audio",
    label: "Analista de Áudio",
    icon: "🎧",
    color: "purple",
    tagline: "Escuta gravações interceptadas.",
  },
  {
    id: "criptografo",
    label: "Criptógrafo",
    icon: "🔐",
    color: "orange",
    tagline: "Traduz símbolos e códigos secretos.",
  },
  {
    id: "hacker-sistemas",
    label: "Hacker de Sistemas",
    icon: "💻",
    color: "green",
    tagline: "Invade terminais com senhas descobertas pela equipe.",
  },
  {
    id: "especialista-comportamento",
    label: "Especialista em Comportamento",
    icon: "🧠",
    color: "red",
    tagline: "Estuda dossiês e álibis dos suspeitos.",
  },
  {
    id: "detetive-chefe",
    label: "Detetive Chefe",
    icon: "🕵️",
    color: "yellow",
    tagline: "Comanda o mapa e registra a acusação final.",
  },
];

// Como os 6 papéis-base se agrupam em crachás conforme o nº de jogadores
// (2 a 6). Cada sub-array é um crachá; um jogador que escolhe um crachá
// com mais de um papel acumula todos eles.
export const BADGES_BY_PLAYER_COUNT: Record<number, RoleId[][]> = {
  6: [
    ["perito-imagens"],
    ["analista-audio"],
    ["criptografo"],
    ["hacker-sistemas"],
    ["especialista-comportamento"],
    ["detetive-chefe"],
  ],
  5: [
    ["detetive-chefe"],
    ["especialista-comportamento"],
    ["perito-imagens"],
    ["analista-audio"],
    ["criptografo", "hacker-sistemas"],
  ],
  4: [
    ["detetive-chefe"],
    ["perito-imagens"],
    ["criptografo", "hacker-sistemas"],
    ["especialista-comportamento", "analista-audio"],
  ],
  3: [
    ["detetive-chefe", "especialista-comportamento"],
    ["perito-imagens", "analista-audio"],
    ["criptografo", "hacker-sistemas"],
  ],
  2: [
    ["detetive-chefe", "perito-imagens", "analista-audio"],
    ["criptografo", "hacker-sistemas", "especialista-comportamento"],
  ],
};

export const SCENARIO_ID = "cenario-trofeu";

export const SCENARIO_FALLBACK = {
  id: SCENARIO_ID,
  title: "O Caso do Troféu",
  timeLimit: 45,
};

// --- Enigma 1: O Cofre Matemático ------------------------------------------
// O Perito vê os 4 frascos (CenaDosFrascos), o Criptógrafo vê as fórmulas
// (ManualLaboratorio) e o Hacker combina os dois pra montar a senha do
// cofre (TerminalHacker). A senha nunca é escrita literalmente — é sempre
// calculada a partir de FRASCOS, pra formulário e frascos nunca saírem de
// sincronia.
export const FRASCOS = [
  { color: "Vermelho", hex: "#ef4444", value: 4 },
  { color: "Azul", hex: "#3b82f6", value: 7 },
  { color: "Verde", hex: "#22c55e", value: 2 },
  { color: "Amarelo", hex: "#eab308", value: 9 },
] as const;

function valorDoFrasco(color: (typeof FRASCOS)[number]["color"]) {
  return FRASCOS.find((f) => f.color === color)!.value;
}

export const COFRE_PASSWORD = [
  valorDoFrasco("Vermelho") + valorDoFrasco("Verde"),
  valorDoFrasco("Amarelo") - valorDoFrasco("Azul"),
  valorDoFrasco("Verde") * 2,
  valorDoFrasco("Azul") - valorDoFrasco("Vermelho"),
].join("");

export const SUSPECTS = [
  {
    id: "s1",
    name: "Professor Renato",
    role: "Professor de Educação Física",
    alibi: "Disse que estava na quadra o tempo todo, mas ninguém o viu depois das 14h.",
  },
  {
    id: "s2",
    name: "Bibliotecária Vera",
    role: "Responsável pela biblioteca",
    alibi: "Afirma ter organizado livros na sala de troféus até mais tarde que o normal.",
  },
  {
    id: "s3",
    name: "Zelador Toninho",
    role: "Zelador da escola",
    alibi: "Tem as chaves de todas as salas, inclusive da sala de troféus.",
  },
];

// --- Fase 1, Trava B: Frequência de Rádio ----------------------------------
// O Analista de Áudio ouve a transmissão (RadioInterceptador) e repassa o
// codinome + dígitos pro time. O Especialista em Comportamento tem, no
// dossiê da escola, a tabela que traduz o codinome grego em dígito. A senha
// nunca é escrita literalmente — vem sempre de CODE_WORDS + RADIO_DIGITS.
export const CODE_WORDS: Record<string, string> = {
  Alpha: "1",
  Beta: "2",
  Gama: "3",
  Delta: "4",
};

export const RADIO_DIGITS = "998";

export const RADIO_TRANSMISSION = {
  title: "Frequência Interceptada",
  transcript: "Frequência de acesso: Alpha-Nove-Nove-Oito.",
};

export const SCHOOL_DOSSIER = {
  title: "Dossiê da Escola",
  note: "A diretoria usa codinomes gregos para representar dígitos em comunicações internas: ALPHA = 1, BETA = 2, GAMA = 3, DELTA = 4.",
};

export const RADIO_CODE = CODE_WORDS.Alpha + RADIO_DIGITS;

// --- Fase 2: Rastreando o Caminho (O Mapa) ---------------------------------
// O Especialista lê o bilhete (direção), o Detetive segue a rota no
// <MapaTatico /> a partir do Laboratório e acha o destino (Cantina), o
// Perito lê a foto da cena (estados físicos). O Hacker junta o nº da sala
// com a resposta de ciências. O código nunca é escrito literalmente — vem
// sempre do roomNumber da Cantina + PHYSICS_ANSWER.
export const BILHETE_INTERCEPTADO = "Fugir 2 blocos para o Leste e virar ao Sul.";

export const SCHOOL_ROOMS = [
  { id: "laboratorio", label: "Laboratório", col: 0, row: 0 },
  { id: "biblioteca", label: "Biblioteca", col: 3, row: 0 },
  { id: "ginasio", label: "Ginásio", col: 0, row: 1 },
  { id: "cantina", label: "Cantina (Sala 5)", col: 2, row: 1, roomNumber: 5 },
  { id: "oficina", label: "Oficina", col: 3, row: 1 },
] as const;

export const MAP_START_ROOM_ID = "laboratorio";
export const MAP_DESTINATION_ROOM_ID = "cantina";

const CANTINA = SCHOOL_ROOMS.find((r) => r.id === MAP_DESTINATION_ROOM_ID)!;

export const PHYSICS_ANSWER = 2; // gelo derretendo: sólido + líquido = 2 estados físicos

export const TRACKING_CODE = `${CANTINA.roomNumber}${PHYSICS_ANSWER}`;

export const AUDIO_CLUES = [
  {
    id: "a1",
    title: "Gravação 1 — Corredor principal",
    description: "Passos apressados seguidos de um barulho metálico.",
  },
];
