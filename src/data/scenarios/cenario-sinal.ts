import type { RoleDef, RoleId } from "../../types";

// Segundo caso da L.I.G.A.: "O Sinal Interceptado". Mesmo padrão do
// cenario-trofeu.ts — trocar/duplicar este arquivo é suficiente pra criar
// outro caso sem tocar nos componentes de role.

export const SCENARIO_ID = "cenario-sinal";

export const SCENARIO_FALLBACK = {
  id: SCENARIO_ID,
  title: "O Sinal Interceptado",
  timeLimit: 45,
};

export const ROLES: RoleDef[] = [
  {
    id: "perito-imagens",
    label: "Perito de Imagens",
    icon: "🔍",
    color: "cyan",
    tagline: "Analisa símbolos e fotos capturados pelas câmeras da escola.",
  },
  {
    id: "analista-audio",
    label: "Analista de Áudio",
    icon: "🎧",
    color: "purple",
    tagline: "Intercepta transmissões e gravações de áudio.",
  },
  {
    id: "criptografo",
    label: "Criptógrafo",
    icon: "🔐",
    color: "orange",
    tagline: "Traduz equações e notas técnicas em códigos de acesso.",
  },
  {
    id: "hacker-sistemas",
    label: "Hacker de Sistemas",
    icon: "💻",
    color: "green",
    tagline: "Invade terminais com os códigos descobertos pela equipe.",
  },
  {
    id: "especialista-comportamento",
    label: "Especialista em Comportamento",
    icon: "🧠",
    color: "red",
    tagline: "Cruza manuais internos e álibis dos suspeitos.",
  },
  {
    id: "detetive-chefe",
    label: "Detetive Chefe",
    icon: "🕵️",
    color: "yellow",
    tagline: "Comanda o mapa da escola e registra a acusação final.",
  },
];

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

export const BRIEFING = {
  title: "Transmissão da Diretoria",
  body: "Agentes, um sinal desconhecido invadiu os servidores da escola. NENHUM DE VOCÊS TEM A RESPOSTA COMPLETA. O Perito vê símbolos que o Criptógrafo precisa traduzir. O Hacker só derruba o Firewall se o Analista decifrar o ritmo da transmissão. Falem em voz alta o que estão vendo!",
  highlight: "NENHUM DE VOCÊS TEM A RESPOSTA COMPLETA.",
  missionLine: "Missão: Derrubem o Firewall, rastreiem o suspeito e provem a acusação.",
};

// --- Fase 1: Criptografia de Símbolos e Interceptação Sonora ---------------
// O Perito vê os 4 símbolos (PainelSimbolos), o Criptógrafo tem as equações
// (DicionarioMestre), o Analista ouve as batidas (RitmoInterceptado) e o
// Especialista tem a regra que converte batidas em porta (ManualPortas). O
// Hacker precisa acertar os dois campos do TerminalDuplo. Nada é escrito
// literalmente — tudo vem de SYMBOLS e BEAT_PATTERN.
const OLHO_VALUE = 3 * 15; // triplo de 15
const TRIANGULO_VALUE = 50 / 2; // metade de 50
const ESPIRAL_VALUE = 100 - 18; // 100 menos 18
const RAIO_VALUE = 7 * 8; // 7 vezes 8

export const SYMBOLS = [
  { id: "olho", icon: "👁️", label: "Olho", equation: "O triplo de 15", value: OLHO_VALUE },
  { id: "triangulo", icon: "🔺", label: "Triângulo", equation: "A metade de 50", value: TRIANGULO_VALUE },
  { id: "espiral", icon: "🌀", label: "Espiral", equation: "100 menos 18", value: ESPIRAL_VALUE },
  { id: "raio", icon: "⚡", label: "Raio", equation: "7 vezes 8", value: RAIO_VALUE },
] as const;

export const SYMBOLS_CODE = SYMBOLS.map((s) => s.value).join("");

export const BEAT_PATTERN = [3, 1, 4];
export const PORT_CODE = BEAT_PATTERN.join("");

export const AUDIO_CLUE_1 = {
  id: "audio-1",
  title: "audio_1.mp3 — Transmissão Interceptada",
  description: "Batidas rítmicas: 3 batidas, pausa, 1 batida, pausa, 4 batidas.",
  src: "/audio/audio_1.mp3",
};

export const NETWORK_MANUAL = {
  title: "Manual de Portas de Rede",
  note: "O número de batidas registradas na transmissão corresponde, em ordem, aos dígitos da Porta de Acesso do Servidor.",
};

// --- Fase 2: Rastreio Geográfico (Plano Cartesiano) ------------------------
// O Especialista recebe a transcrição da mensagem apagada, o Detetive lê o
// grid do MapaEscola (colunas A-F, linhas 1-6) e acha a interseção. O código
// nunca é escrito literalmente — vem sempre de SCHOOL_LANDMARKS.
export const SCHOOL_GRID_COLUMNS = ["A", "B", "C", "D", "E", "F"] as const;
export const SCHOOL_GRID_ROWS = [1, 2, 3, 4, 5, 6] as const;

export const SCHOOL_LANDMARKS = [
  { id: "professores", label: "Sala dos Professores", col: "A", row: 1 },
  { id: "biblioteca", label: "Biblioteca", col: "C", row: 2 },
  { id: "ginasio", label: "Ginásio de Esportes", col: "E", row: 4 },
  { id: "oficina", label: "Oficina de Projetos", col: "F", row: 6 },
] as const;

const BIBLIOTECA = SCHOOL_LANDMARKS.find((l) => l.id === "biblioteca")!;
const GINASIO = SCHOOL_LANDMARKS.find((l) => l.id === "ginasio")!;

export const SUSPECT_ROOM_COORD = `${BIBLIOTECA.col}${GINASIO.row}`;

export const TRACKING_MESSAGE = {
  title: "Mensagem Apagada (Recuperada)",
  transcript: `Encontre o suspeito na interseção da coluna da Biblioteca (Coluna ${BIBLIOTECA.col}) com a linha do Ginásio de Esportes (Linha ${GINASIO.row}).`,
};

export const MAP_IMAGE_SRC = "/assets/mapa.jpg";

// --- Fase 3: Análise Termodinâmica (Ciências) ------------------------------
// O Perito vê a foto da sala encontrada na Fase 2, o Criptógrafo calcula a
// senha a partir da nota técnica. Código nunca escrito literalmente — vem
// sempre de BOILING_POINT_C * WATER_STATES_VISIBLE.
export const LAB_CONTAINERS = [
  { id: "gelo", label: "Copo com gelo", state: "Sólido" },
  { id: "fervendo", label: "Panela fervendo", state: "Gasoso (vapor)" },
  { id: "gosma", label: "Frasco com gosma", state: "Desconhecido" },
] as const;

export const BOILING_POINT_C = 100;
export const WATER_STATES_VISIBLE = 2; // sólido (gelo) e gasoso (vapor da fervura)
export const OVERRIDE_CODE = String(BOILING_POINT_C * WATER_STATES_VISIBLE);

export const THERMO_NOTE = {
  title: "Nota Técnica",
  note: "A senha final de emergência é a temperatura de ebulição da água ao nível do mar (em °C), multiplicada pelo número de estados físicos da água visíveis na cena (sólido e gasoso).",
};

// --- Fase 4: O Álibi Quebrado -----------------------------------------------
// O Analista libera a gravação final, o Especialista cruza os depoimentos e
// o Detetive preenche o FormularioAcusacao com 3 campos. A resposta certa
// nunca é escrita solta no componente — vem sempre de CORRECT_ACCUSATION.
export const SUSPECTS = [
  {
    id: "silva",
    name: "Prof. Roberto Silva",
    role: "Professor da Oficina de Projetos",
    claim: "Disse que estava no silêncio da sala dos professores.",
  },
  {
    id: "carlos",
    name: "Inspetor Carlos",
    role: "Segurança escolar",
    claim: "Disse que estava no ginásio, que dá eco.",
  },
] as const;

export const REX_NOTE =
  "A casinha do cachorro Rex fica colada na Oficina de Projetos, sala de domínio do Prof. Roberto Silva.";

export const LOCATIONS = ["Sala dos Professores", "Ginásio", "Oficina de Projetos"] as const;

export const AUDIO_EVIDENCE_OPTIONS = ["Som de Solda", "Motor Ligado", "Latido do Cachorro"] as const;

export const FINAL_AUDIO_CLUE = {
  id: "audio-final",
  title: "audio_final.mp3 — Gravação Recuperada",
  description: "Som de solda elétrica, motor ligado e um cachorro latindo ao fundo.",
  src: "/audio/audio_final.mp3",
};

export const CORRECT_ACCUSATION = {
  suspect: "silva",
  location: "Oficina de Projetos",
  evidence: "Latido do Cachorro",
} as const;

export const CERTIFICATE_TEXT = {
  title: "Caso Encerrado",
  body: `${SUSPECTS.find((s) => s.id === CORRECT_ACCUSATION.suspect)!.name} foi confrontado com as provas e confessou: usou o sinal interceptado para encobrir sua presença na ${CORRECT_ACCUSATION.location}, onde o latido de Rex o entregou.`,
};
