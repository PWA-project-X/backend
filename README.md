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
| `GET` | `/api/insights` | `{ "insights": [{ "id", "title", "summary", "tag" }] }` |
| `POST` | `/api/auth/register` | Cadastro livre (papel `user`) + cookie |
| `POST` | `/api/auth/login` | Cookie de sessão + `{ "user" }` |
| `POST` | `/api/auth/logout` | Limpa cookie |
| `GET` | `/api/auth/me` | Usuário da sessão |
| `*` | `/api/admin/*` | CRUD de conteúdo e usuários (papel `admin`) |

Dados em **SQLite** (`data/miniverso.db`), com seed a partir de `src/data/*`. Ver [ADR 0004](docs/ADR/0004-sqlite-auth.md). A v1 sem banco permanece documentada em [ADR 0001](docs/ADR/0001-static-api.md).

CORS com credenciais para origens locais (`localhost` / `127.0.0.1`, qualquer porta do Vite). Contas iniciais: `ADMIN_*` e `DEMO_USER_*` no `.env`.

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
| RF15–RF19 | Auth, sessão e admin | Feito |
| RNF02 | Node.js + Express + TypeScript | Feito |
| RNF05 | Código organizado em arquivos separados | Feito |
| RNF06 | Scripts no `package.json` | Feito |
| RNF07 | Sem banco de dados na v1 | Superseded (ADR 0004) |
| RNF08 | Conteúdo alterável por API / painel | Feito |
| RNF11 | SQLite local + cookie JWT | Feito |

Matriz completa: [`docs/TRACEABILITY.md`](docs/TRACEABILITY.md). Checklist: [`docs/ACCEPTANCE.md`](docs/ACCEPTANCE.md).

## Frontend

App em: [PWA-project-X/frontend](https://github.com/PWA-project-X/frontend)
