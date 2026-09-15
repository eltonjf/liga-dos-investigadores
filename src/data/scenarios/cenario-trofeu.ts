import type { RoleDef } from "../../types";

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
    color: "magenta",
    tagline: "Escuta gravações interceptadas.",
  },
  {
    id: "criptografo",
    label: "Criptógrafo",
    icon: "🔐",
    color: "lime",
    tagline: "Traduz símbolos e códigos secretos.",
  },
  {
    id: "hacker-sistemas",
    label: "Hacker de Sistemas",
    icon: "💻",
    color: "amber",
    tagline: "Invade terminais com senhas descobertas pela equipe.",
  },
  {
    id: "especialista-comportamento",
    label: "Especialista em Comportamento",
    icon: "🧠",
    color: "magenta",
    tagline: "Estuda dossiês e álibis dos suspeitos.",
  },
  {
    id: "detetive-chefe",
    label: "Detetive Chefe",
    icon: "🕵️",
    color: "cyan",
    tagline: "Comanda o mapa e registra a acusação final.",
  },
];

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
