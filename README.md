# Liga dos Investigadores

Motor de jogo web multiplayer cooperativo (6 jogadores, dispositivos diferentes) para o primeiro
cenário "O Caso do Troféu". Stack: React + Vite + TypeScript + Tailwind CSS v4, Firebase
(Authentication anônima + Cloud Firestore).

## Estado atual (scaffold)

- Fluxo completo: Home (criar/entrar em sala) → Lobby (escolher um dos 6 crachás, sincronizado em
  tempo real) → Game (tela específica por role, com Firestore como fonte de verdade).
- As 6 telas de role existem e são funcionais, mas o conteúdo do mistério é **placeholder** (senha,
  suspeitos, cifra, áudio) — veja `src/data/scenarios/cenario-trofeu.ts`.
- `scenarios/{scenarioId}` (título/tempo limite) hoje é lido localmente desse mesmo arquivo, não do
  Firestore, para manter o MVP simples. O schema e as regras da coleção `scenarios` já existem caso
  vocês queiram editar isso pelo console no futuro sem alterar código.
- Trocar o mistério = criar um novo `src/data/scenarios/<nome>.ts` seguindo o mesmo formato e trocar
  o import usado pelas páginas/componentes.

## Configurar o Firebase

1. Crie um projeto em https://console.firebase.google.com.
2. Ative **Authentication → Sign-in method → Anônimo**.
3. Ative **Cloud Firestore** (modo produção).
4. Em *Configurações do projeto → Geral → Seus apps*, crie um app Web e copie as credenciais.
5. Copie `.env.example` para `.env` e preencha os valores.
6. (Opcional, recomendado) Publique as regras deste repositório com o Firebase CLI:
   ```bash
   npm i -g firebase-tools
   firebase login
   firebase use --add        # selecione o projeto criado acima
   firebase deploy --only firestore:rules
   ```
   Sem isso, o Firestore roda com as regras padrão do console — publique `firestore.rules` antes de
   testar com dispositivos reais.

Veja o comentário no topo de `firestore.rules` para duas ressalvas sobre a regra original do
`players` (checagem de crachá duplicado) e do `game_state` (permissão de `create` adicionada para o
app conseguir inicializar o progresso da sessão).

## Rodando localmente

```bash
npm install
npm run dev
```

Sem um `.env` preenchido, a tela inicial mostra um aviso pedindo a configuração em vez de quebrar.

## Estrutura

```
src/
  components/roles/   6 telas de investigador (uma por crachá)
  components/ui/       Button, Panel, RoleBadge (tema "Cyber-Detetive")
  data/scenarios/      Conteúdo do mistério, orientado a dados
  hooks/                useAuthUser, useSession, usePlayers, useGameState (onSnapshot)
  lib/                  firebase.ts (init) e sessions.ts (criar sala, escolher crachá, iniciar)
  pages/                Home, Lobby, Game
firestore.rules         Regras de segurança (fonte de verdade fica sempre no servidor)
```

## Deploy (Vercel)

Projeto Vite padrão — importe o repositório no Vercel, configure as mesmas variáveis do `.env` como
Environment Variables e o build (`npm run build`) funciona sem ajustes adicionais.
