# Backend — Portfólio Interno Miniverso

API em **Node.js + Express + TypeScript** para o Portfólio Interno Miniverso (Programação Avançada para Web).

Documentação técnica: [`docs/`](docs/) · Contribuição: [`CONTRIBUTING.md`](CONTRIBUTING.md) · Changelog: [`CHANGELOG.md`](CHANGELOG.md)

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

## Endpoints (contrato canônico)

| Método | Rota | Resposta |
| --- | --- | --- |
| `GET` | `/health` | `{ "ok": true }` |
| `GET` | `/api/company` | Informações gerais (`name`, `project`, `city`, `description`, `proposal`) |
| `GET` | `/api/services` | `{ "services": [{ "id", "title", "description" }] }` |
| `GET` | `/api/process` | `{ "steps": [{ "id", "number", "title", "description" }] }` |
| `GET` | `/api/projects` | `{ "projects": [{ "id", "title", "summary", "category" }] }` |

Os dados são estáticos (sem banco de dados nesta versão). Ver [ADR 0001](docs/ADR/0001-static-api.md).

CORS liberado para o Vite local (`5173` / `4173`).

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Sobe com `tsx` (hot reload) |
| `npm run build` | Compila TypeScript para `dist/` |
| `npm start` | Roda o build (`node dist/index.js`) |

## Requisitos cobertos (escopo PDF v0.1)

| ID | Descrição | Status |
| --- | --- | --- |
| RF09 | Fornecer dados da empresa, serviços, processo e projetos | Feito |
| RF11 | Rota `GET /health` | Feito |
| RNF02 | Node.js + Express + TypeScript | Feito |
| RNF05 | Código organizado em arquivos separados | Feito |
| RNF06 | Scripts no `package.json` | Feito |
| RNF07 | Sem banco de dados na v1 | Feito |
| RNF08 | Conteúdo alterável por arquivos de dados | Feito |

Matriz completa: [`docs/TRACEABILITY.md`](docs/TRACEABILITY.md). Checklist: [`docs/ACCEPTANCE.md`](docs/ACCEPTANCE.md).

## Frontend

App em: [PWA-project-X/frontend](https://github.com/PWA-project-X/frontend)
