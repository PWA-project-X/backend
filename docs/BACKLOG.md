# Backlog — Portfólio Interno Miniverso

Priorização MoSCoW alinhada ao PDF de escopo (v0.1) e à fatia auth/admin.

## Must (alinhar conteúdo ao PDF)

| Issue | Repo | Tema | Status |
| --- | --- | --- | --- |
| [#4](https://github.com/PWA-project-X/frontend/issues/4) | frontend | Serviços → Conteúdo 3D, RV, RA, Experiências imersivas | Feito |
| [#3](https://github.com/PWA-project-X/backend/issues/3) | backend | Mesmo alinhamento em `/api/services` | Feito |
| [#5](https://github.com/PWA-project-X/frontend/issues/5) | frontend | Processo etapa 03: Compartilhar → Entregar | Feito |
| [#4](https://github.com/PWA-project-X/backend/issues/4) | backend | Mesmo alinhamento em `/api/process` | Feito |

## Must (escopo ampliado — auth / admin)

| Tema | Status |
| --- | --- |
| SQLite + seed (empresa, serviços, projetos, processo, insights, users) | Feito |
| Login / logout / sessão cookie httpOnly (papéis user e admin) | Feito |
| Cadastro livre em `/cadastro` (`POST /api/auth/register`) | Feito |
| Área `/conta` para usuário autenticado | Feito |
| Painel `/admin` com CRUD de conteúdo e gestão de usuários | Feito |
| `GET /api/insights` público | Feito |

## Should

| Issue | Repo | Tema |
| --- | --- | --- |
| [#6](https://github.com/PWA-project-X/frontend/issues/6) | frontend | Limpar branches remotas obsoletas |
| [#5](https://github.com/PWA-project-X/backend/issues/5) | backend | Limpar branches remotas obsoletas |
| [#7](https://github.com/PWA-project-X/frontend/issues/7) | frontend | Decidir versionamento do `figma-plugin` |

## Could (opcional no PDF — RF13 / RF14)

| Issue | Repo | Tema | Status |
| --- | --- | --- | --- |
| [#8](https://github.com/PWA-project-X/frontend/issues/8) | frontend | Seção Insights/Blog visual | Feito |
| [#9](https://github.com/PWA-project-X/frontend/issues/9) | frontend | Seção Contato visual (sem envio) | Feito |

## Won't (ainda fora)

- Auto-promoção a admin no cadastro público (só papel `user`)
- Envio real do formulário de contato
- Artigos completos / CMS de blog
- XR/3D rodando no browser
- Persistência durável do SQLite em deploy serverless (Vercel)
- Analytics e teste formal de usabilidade

## Já entregue

- Front com seções Home / Sobre / Serviços / Projetos / Processo / Insights / Contato
- API com SQLite, auth e painel admin (local)
- Integração FE↔API com fallback no portfólio público
- Responsividade, Orbital Clean, PWA
- Pacote de tech lead (docs, CI, templates)

Ver também: [TRACEABILITY.md](TRACEABILITY.md), [ACCEPTANCE.md](ACCEPTANCE.md), [ADR/0004-sqlite-auth.md](ADR/0004-sqlite-auth.md).
