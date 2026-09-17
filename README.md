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
| `GET` | `/api/process` | `{ "steps": [{ "id", "number", "title", "description" }] }` |

Os dados são estáticos (sem banco de dados nesta versão).

CORS liberado para o Vite local (`5173` / `4173`).

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Sobe com `tsx` (hot reload) |
| `npm run build` | Compila TypeScript para `dist/` |
| `npm start` | Roda o build (`node dist/index.js`) |

## Requisitos cobertos (v1)

| ID | Descrição |
| --- | --- |
| RF12 | `GET /health` |
| RF13 | `GET /api/company` |
| RF14 | `GET /api/services` |
| RNF02 | Node.js + Express + TypeScript |
| RNF05 | Código organizado em arquivos separados |
| RNF06 | Scripts no `package.json` |

Extra in-scope: `GET /api/process` (etapas Entender / Criar / Compartilhar).

## Frontend

App em: [PWA-project-X/frontend](https://github.com/PWA-project-X/frontend)
