# ADR 0004 — SQLite, login e painel admin

## Status

Aceito (escopo ampliado pós-v1)

## Contexto

A v1 (ADR 0001 / RNF07) usava JSON estático sem autenticação. O escopo passou a exigir login com papéis `user` e `admin`, área logada e painel que edita o conteúdo e gerencia usuários. Sem persistência e sessão, isso não é possível.

## Decisão

- Persistência local com **SQLite** (`better-sqlite3`) em `backend/data/miniverso.db`.
- Seed na primeira subida a partir de `backend/src/data/*` + contas `ADMIN_*` e `DEMO_USER_*` no `.env`.
- Sessão via **JWT em cookie httpOnly** (`SameSite=Lax`, `Secure` só em produção).
- CORS com origens explícitas (`5173` / `4173`) e `credentials: true`.
- Rotas públicas de leitura passam a ler o banco; rotas `/api/auth/*` e `/api/admin/*` exigem autenticação / papel admin.
- RNF07 (“sem banco na v1”) deixa de valer para esta fatia. O ADR 0001 permanece como registro histórico da v1.

## Consequências

- Login e painel funcionam de forma confiável em desenvolvimento local.
- Deploy com escrita durável na Vercel (filesystem efêmero) **não** está no escopo desta fatia.
- Conteúdo editado no painel reflete nos `GET` públicos; o fallback do front (`content.ts`) continua para quando a API estiver fora.
- Sem cadastro público: o admin cria usuários.
