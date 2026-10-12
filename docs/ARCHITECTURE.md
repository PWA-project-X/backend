# Arquitetura — Portfólio Interno Miniverso

Visão técnica da aplicação acadêmica (v1 + fatia auth/admin). Escopo oficial: PDF *Escopo do Projeto — Portfólio Interno Miniverso* (v0.1), ampliado conforme [ADR 0004](ADR/0004-sqlite-auth.md).

## Visão geral

```
┌─────────────────────┐   GET /api/* (+ cookie)   ┌─────────────────────┐
│  Frontend (Vite)    │ ─────────────────────────► │  Backend (Express)  │
│  React + TypeScript │                            │  Node + TypeScript  │
│  :5173 (dev)        │ ◄── JSON / Set-Cookie ─────│  :3001              │
│  :4173 (preview)    │                            │  SQLite local       │
│  React Router       │                            └─────────────────────┘
│  /  /login /conta   │
│  /admin             │──► fallback: src/data/content.ts (portfólio público)
│  PWA (build only)   │──► Service Worker + manifest
└─────────────────────┘
```

A pasta `PWA/` na máquina do time **não é um git remoto**. Orquestra os dois repositórios com `concurrently`. Detalhes: [ADR 0002](ADR/0002-two-repos.md).

## Portas

| Ambiente | Frontend | Backend |
| --- | --- | --- |
| Desenvolvimento | `http://localhost:5173` | `http://localhost:3001` |
| Preview / PWA | `http://localhost:4173` | `http://localhost:3001` |

Variáveis: `frontend/.env` → `VITE_API_URL`; `backend/.env` → `PORT`, `JWT_SECRET`, `ADMIN_*`, `DEMO_USER_*`.

## Frontend

- Stack: React, TypeScript, Vite, CSS, `vite-plugin-pwa`, `react-router-dom`.
- Rotas: `/` (portfólio com âncoras), `/login`, `/conta`, `/admin`.
- Cliente HTTP: `frontend/src/api/client.ts` (`credentials: 'include'` + fallback no conteúdo público).
- Auth: `AuthProvider` + cookie de sessão gerenciado pelo backend.
- Design tokens: `frontend/src/styles/tokens.css` (Orbital Clean).
- Motion: `useRevealOnScroll` + `prefers-reduced-motion`.

## Backend

- Stack: Node.js, Express 5, TypeScript, CORS, dotenv, better-sqlite3, bcrypt, jsonwebtoken, cookie-parser.
- Persistência em `backend/data/miniverso.db` (seed a partir de `backend/src/data/*`). Ver [ADR 0004](ADR/0004-sqlite-auth.md).
- CORS com credenciais para qualquer origem `localhost` / `127.0.0.1` (Vite pode usar 5173, 5174, …).

## Endpoints

| Método | Rota | Notas |
| --- | --- | --- |
| `GET` | `/health` | Health check |
| `GET` | `/api/company` `/api/services` `/api/process` `/api/projects` `/api/insights` | Público (SQLite) |
| `POST` | `/api/auth/login` `/api/auth/logout` | Cookie de sessão |
| `GET` | `/api/auth/me` | Requer sessão |
| `*` | `/api/admin/*` | Requer papel `admin` |

Contrato canônico: README do [backend](https://github.com/PWA-project-X/backend).

## PWA

Service Worker e manifest são gerados no **build** (`npm run build` no frontend). Em `vite dev` o SW fica desligado (`devOptions.enabled: false`). Ver [ADR 0003](ADR/0003-pwa-fallback.md).

## Fallback

Se as leituras públicas da API falharem, o front usa `content.ts` e exibe o aviso “Conteúdo local — API indisponível”. Login e painel admin exigem a API no ar.
