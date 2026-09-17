# Backend — Portfólio Interno Miniverso

API em **Node.js + Express + TypeScript** para o Portfólio Interno Miniverso (Programação Avançada para Web).

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
| `GET` | `/api/company` | Informações gerais do projeto (`name`, `project`, `city`, `description`, `proposal`) |
| `GET` | `/api/services` | `{ "services": [{ "id", "title", "description" }] }` |

Os dados são estáticos (sem banco de dados nesta versão).

CORS liberado para o Vite local (`5173` / `4173`).

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Sobe com `tsx` (hot reload) |
| `npm run build` | Compila TypeScript para `dist/` |
| `npm start` | Roda o build (`node dist/index.js`) |

## Frontend

App em: [PWA-project-X/frontend](https://github.com/PWA-project-X/frontend)
