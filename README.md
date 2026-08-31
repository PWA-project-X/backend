# Backend — PWA Project X

API mínima em **Node.js + Express + TypeScript** para a disciplina de Programação Avançada para Web.

## Pré-requisitos

- Node.js
- npm

## Instalação

```bash
npm install
cp .env.example .env
```

## Desenvolvimento

```bash
npm run dev
```

A API sobe em `http://localhost:3001` (porta configurável via `PORT`).

## Endpoints

| Método | Rota | Resposta |
| --- | --- | --- |
| `GET` | `/health` | `{ "ok": true }` |

CORS liberado para o Vite local (`5173` / `4173`).

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Sobe com `tsx` (hot reload) |
| `npm run build` | Compila TypeScript para `dist/` |
| `npm start` | Roda o build (`node dist/index.js`) |

## Frontend

App em: [PWA-project-X/frontend](https://github.com/PWA-project-X/frontend)
