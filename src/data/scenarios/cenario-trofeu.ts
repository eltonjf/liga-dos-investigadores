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

// --- Conteúdo placeholder do Puzzle 1 -------------------------------------
// Substitua pelos textos reais da história quando estiverem prontos.

export const CIPHER_ALPHABET: { symbol: string; letter: string }[] = [
  { symbol: "▲", letter: "A" },
  { symbol: "●", letter: "E" },
  { symbol: "■", letter: "F" },
  { symbol: "★", letter: "G" },
  { symbol: "◆", letter: "O" },
  { symbol: "✦", letter: "R" },
  { symbol: "◐", letter: "T" },
  { symbol: "✚", letter: "7" },
];

// A frase que o Criptógrafo decifra (usando o dicionário acima) revela a
// senha que o Hacker de Sistemas precisa digitar: "GRIFO7"
export const CIPHER_MESSAGE = "★✦◆■◐✚";

export const TERMINAL_PASSWORD = "GRIFO7";

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

export const AUDIO_CLUES = [
  {
    id: "a1",
    title: "Gravação 1 — Corredor principal",
    description: "Passos apressados seguidos de um barulho metálico.",
  },
];
