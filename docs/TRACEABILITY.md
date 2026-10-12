# Matriz de rastreabilidade — Escopo PDF v0.1 + fatia auth/admin

IDs conforme o documento *Escopo do Projeto — Portfólio Interno Miniverso* (20/09/2026), ampliados com RF15–RF19 e RNF11.

## Requisitos funcionais

| ID | Requisito | Status | Onde |
| --- | --- | --- | --- |
| RF01 | Página inicial com nome e proposta | Feito | `frontend/src/components/homeSection/` |
| RF02 | Seção Sobre | Feito | `frontend/src/components/aboutSection/` |
| RF03 | Serviços em cards | Feito | `servicesSection/`, `serviceCard/` + `GET /api/services` |
| RF04 | Projetos selecionados | Feito | `projectsSection/`, `projectCard/` + `GET /api/projects` |
| RF05 | Etapas do processo | Feito | `processSection/`, `processStep/` + `GET /api/process` |
| RF06 | Navegação entre seções por links | Feito | `header/` + `NAV_LINKS` em `content.ts` |
| RF07 | Retornar ao topo | Feito | `buttonScrollTop/` |
| RF08 | Interface adaptada a mobile | Feito | CSS responsivo nos componentes |
| RF09 | Dados via API (empresa, serviços, processo, projetos) | Feito | `api/client.ts` ↔ SQLite via `backend/src/app.ts` |
| RF10 | Fallback local se API indisponível | Feito | `api/client.ts` + `data/content.ts` |
| RF11 | Rota `/health` no back-end | Feito | `backend/src/app.ts` |
| RF12 | Manter configuração PWA | Feito | `frontend/vite.config.ts` (`vite-plugin-pwa`) |
| RF13 | Seção de artigos / insights | Feito | `insightsSection/` + `GET /api/insights` |
| RF14 | Seção de contato visual | Feito | `frontend/src/components/contactSection/` |
| RF15 | Login com e-mail e senha (papéis user/admin) | Feito | `/login` + `POST /api/auth/login` |
| RF15b | Cadastro livre de usuário (papel user) | Feito | `/cadastro` + `POST /api/auth/register` |
| RF16 | Área do usuário autenticado | Feito | `/conta` + `GET /api/auth/me` |
| RF17 | Painel admin edita conteúdo do portfólio | Feito | `/admin` + `/api/admin/*` |
| RF18 | Admin cria, lista e remove usuários | Feito | `/api/admin/users` |
| RF19 | Logout e sessão em cookie | Feito | `POST /api/auth/logout` + cookie httpOnly |

## Requisitos não funcionais

| ID | Requisito | Status | Onde |
| --- | --- | --- | --- |
| RNF01 | React, TypeScript e Vite | Feito | `frontend/package.json` |
| RNF02 | Node.js, Express e TypeScript | Feito | `backend/package.json` |
| RNF03 | Interface responsiva | Feito | CSS dos componentes |
| RNF04 | Contraste e navegação compreensível | Feito | tokens Orbital Clean + header |
| RNF05 | Organização de componentes existente | Feito | `frontend/src/components/*` |
| RNF06 | Executável pelos `package.json` | Feito | raiz, frontend, backend |
| RNF07 | Sem banco de dados na v1 | Superseded | Ver ADR 0004 — SQLite na fatia auth/admin |
| RNF08 | Conteúdo alterável por arquivos / API | Feito | painel admin + seed + fallback FE |
| RNF09 | Evitar imagens e deps pesadas | Feito | CSS/tokens; assets leves |
| RNF10 | Respeitar `prefers-reduced-motion` | Feito | `index.css`, hooks e estilos de cards |
| RNF11 | Persistência SQLite local + sessão JWT em cookie | Feito | `backend/src/db/`, `middleware/auth.ts` |

## Critérios de aceitação

Ver [ACCEPTANCE.md](ACCEPTANCE.md).
