# ADR 0001 — API com dados estáticos (sem banco)

## Status

Aceito (v1 acadêmica)

## Contexto

O escopo (RNF07) exige que a primeira versão não dependa de banco de dados. O grupo já tinha módulos TypeScript com conteúdo da Miniverso.

## Decisão

Manter a API Express servindo JSON a partir de arquivos em `backend/src/data/` (`company`, `services`, `process`, `projects`). Sem ORM, sem persistência, sem painel admin.

## Consequências

- Conteúdo alterável editando os arquivos de dados (RNF08) e o fallback espelhado em `frontend/src/data/content.ts`.
- Não há autenticação nem CRUD.
- Evolução futura (DB, CMS) fica fora do escopo inicial e deve ser um ADR novo.
