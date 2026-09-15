# PROMPT MESTRE DE DESENVOLVIMENTO: Plataforma Liga dos Investigadores

## 1. Contexto do Projeto
Você vai atuar como um Desenvolvedor Full-Stack Sênior para construir a "Liga dos Investigadores", um motor de jogo web multiplayer cooperativo focado em crianças de 10 anos (nível escolar do 4º ano, com dificuldade balanceada para a Júlia e sua equipe). O sistema exige que 6 jogadores em dispositivos diferentes se comuniquem para resolver o primeiro cenário: "O Caso do Troféu". A arquitetura deve ser orientada a dados (Data-Driven), permitindo trocar o tema do mistério no futuro usando a mesma base de código.

## 2. Stack Tecnológico
*   **Frontend:** React (Vite), TypeScript, Tailwind CSS (Design "Cyber-Detetive", dark mode com cores neon).
*   **Backend:** Firebase (Authentication anônimo e Cloud Firestore para sincronização em tempo real).
*   **Hospedagem:** Vercel (Frontend) integrada via CI/CD do GitHub.

## 3. Dinâmica de Lobby e Funções (Roles)
A Liga possui 6 credenciais únicas. Uma vez que um jogador escolhe um crachá no lobby, ele fica bloqueado para os outros. Cada credencial renderiza componentes específicos na tela:
1.  **Perito de Imagens:** Visualizador de imagens em alta definição com zoom (fotos da cena com QR Codes ocultos).
2.  **Analista de Áudio:** Player de áudio com espectrograma falso. Escuta os arquivos interceptados.
3.  **Criptógrafo:** Dicionários de tradução (símbolos para números/letras).
4.  **Hacker de Sistemas:** Terminal com teclado numérico/texto para input de senhas que alteram o estado do banco de dados.
5.  **Especialista em Comportamento:** Visualizador de dossiês detalhados dos suspeitos e álibis.
6.  **Detetive Chefe:** Mapa do local (escola) e acesso ao Formulário Final de Acusação.

## 4. Modelagem de Dados (Firestore) e Regras de Segurança
O sistema deve ser imune a trapaças pelo frontend. Crie as seguintes coleções e aplique as regras de segurança abaixo:

**Esquema:**
*   `scenarios/{scenarioId}`: Regras estáticas (title, timeLimit). Ex: `cenario-trofeu`.
*   `sessions/{sessionId}`: Instância da sala (status: lobby/playing, host_id).
    *   Subcoleção `players`: `uid`, `name`, `role_id`.
    *   Subcoleção `game_state`: `puzzle_1_solved: boolean`, `battery_tips: 100`.
*   `secrets/{secretId}`: Dados ocultos (áudios, senhas finais).

**Security Rules (Implementar rigorosamente):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() { return request.auth != null; }

    match /scenarios/{scenarioId} { allow read: if true; allow write: if false; }
    
    match /sessions/{sessionId} {
      allow read: if true;
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && resource.data.host_id == request.auth.uid;

      match /players/{playerId} {
        allow read: if true;
        allow create: if isAuthenticated() && request.auth.uid == playerId && !exists(/databases/$(database)/documents/sessions/$(sessionId)/players/$(request.resource.data.role_id));
        allow update, delete: if isAuthenticated() && request.auth.uid == playerId;
      }

      match /game_state/{stateId} {
        allow read, update: if isAuthenticated();
      }
    }

    match /secrets/{secretId} {
      allow read: if isAuthenticated() && get(/databases/$(database)/documents/sessions/$(secretId)/game_state/progress).data.puzzle_1_solved == true;
      allow write: if false;
    }
  }
}