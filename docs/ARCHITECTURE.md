# Arquitetura — Portfólio Interno Miniverso

Visão técnica da aplicação acadêmica (v1). Escopo oficial: PDF *Escopo do Projeto — Portfólio Interno Miniverso* (v0.1).

## Visão geral

```
┌─────────────────────┐     GET /api/*      ┌─────────────────────┐
│  Frontend (Vite)    │ ──────────────────► │  Backend (Express)  │
│  React + TypeScript │                     │  Node + TypeScript  │
│  :5173 (dev)        │ ◄── JSON estático ──│  :3001              │
│  :4173 (preview)    │                     └─────────────────────┘
│                     │
│  fallback local     │──► src/data/content.ts (se API falhar)
│  PWA (build only)   │──► Service Worker + manifest
└─────────────────────┘
```

A pasta `PWA/` na máquina do time **não é um git remoto**. Orquestra os dois repositórios com `concurrently`. Detalhes: [ADR 0002](ADR/0002-two-repos.md).

## Portas

| Ambiente | Frontend | Backend |
| --- | --- | --- |
| Desenvolvimento | `http://localhost:5173` | `http://localhost:3001` |
| Preview / PWA | `http://localhost:4173` | `http://localhost:3001` |

Variáveis: `frontend/.env` → `VITE_API_URL`; `backend/.env` → `PORT`.

## Frontend

- Stack: React, TypeScript, Vite, CSS, `vite-plugin-pwa`.
- SPA com âncoras (`#home`, `#sobre`, `#servicos`, `#projetos`, `#processo`) — sem React Router.
- Cliente HTTP: `frontend/src/api/client.ts` (fetch + fallback).
- Design tokens: `frontend/src/styles/tokens.css` (Orbital Clean).
- Motion: `useRevealOnScroll` + `prefers-reduced-motion`.

## Backend

- Stack: Node.js, Express 5, TypeScript, CORS, dotenv.
- Dados estáticos em `backend/src/data/*.ts` — sem banco (RNF07). Ver [ADR 0001](ADR/0001-static-api.md).
- CORS liberado apenas para localhost `5173` e `4173`.

## Endpoints

| Método | Rota | Resposta |
| --- | --- | --- |
| `GET` | `/health` | `{ "ok": true }` |
| `GET` | `/api/company` | objeto empresa |
| `GET` | `/api/services` | `{ "services": [...] }` |
| `GET` | `/api/process` | `{ "steps": [...] }` |
| `GET` | `/api/projects` | `{ "projects": [...] }` |

Contrato canônico: README do [backend](https://github.com/PWA-project-X/backend).

## PWA

Service Worker e manifest são gerados no **build** (`npm run build` no frontend). Em `vite dev` o SW fica desligado (`devOptions.enabled: false`). Ver [ADR 0003](ADR/0003-pwa-fallback.md).

## Fallback

Se qualquer chamada à API falhar, o front usa `content.ts` e exibe o aviso “Conteúdo local — API indisponível”.
