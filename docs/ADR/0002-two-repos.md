# ADR 0002 — Dois repositórios Git + pasta local de orquestração

## Status

Aceito (exigência da disciplina)

## Contexto

A disciplina pede repositórios separados de front-end e back-end (`PWA-project-X/frontend` e `PWA-project-X/backend`). Localmente o time precisa subir API e Vite juntos.

## Decisão

- Versionar o código **somente** nos dois remotes GitHub.
- Usar a pasta `PWA/` como workspace local **sem** inicializar git na raiz.
- Orquestrar com `concurrently` no `package.json` da raiz (`npm run dev`, `build`, `preview`).
- Documentação de orquestração, PDFs e `figma-plugin/` ficam na pasta local; docs técnicos relevantes são espelhados (ou referenciados) nos dois repos.

## Consequências

- Commits/PRs sempre dentro de `frontend/` ou `backend/`.
- Risco de drift entre fallback do front e dados do back — mitigado por checklist de aceitação e issues de alinhamento de conteúdo.
- CI separado por repositório.
