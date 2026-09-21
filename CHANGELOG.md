# Changelog — Portfólio Interno Miniverso

Registro das mudanças relevantes do projeto (dois repositórios + pasta de orquestração local).

O formato segue a ideia de [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [Unreleased]

### Added

- Pacote de tech lead: documentação (`docs/`), ADRs, matriz de rastreabilidade, checklist de aceitação.
- CONTRIBUTING, templates de PR/issue e CI (GitHub Actions) nos repos frontend e backend.
- Script `npm run lint` na pasta de orquestração.
- `.env` ignorado no frontend.

## [1.0.0] — 2026-09 — Baseline acadêmica

### Frontend ([PWA-project-X/frontend](https://github.com/PWA-project-X/frontend))

- Portfólio single-page: Home, Sobre, Serviços, Projetos, Processo.
- Consumo da API com fallback local (`api/client.ts` + `data/content.ts`).
- PWA com `vite-plugin-pwa` (manifest, Workbox).
- Direção visual Orbital Clean (tokens, tipografia, microanimações com `prefers-reduced-motion`).
- PRs históricos: #1–#3 (portfólio, projetos, UX).

### Backend ([PWA-project-X/backend](https://github.com/PWA-project-X/backend))

- API Express + TypeScript: `/health`, `/api/company`, `/api/services`, `/api/process`, `/api/projects`.
- Dados estáticos sem banco; CORS para Vite local (`5173` / `4173`).
- PRs históricos: #1–#2 (company/services, projects).

### Orquestração local

- `package.json` na pasta `PWA/` com `concurrently` (`dev`, `build`, `preview`).
- Plugin Figma e README de design (fora dos remotes GitHub).
