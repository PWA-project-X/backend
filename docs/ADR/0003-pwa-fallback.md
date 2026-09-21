# ADR 0003 — PWA + fallback de conteúdo local

## Status

Aceito (v1)

## Contexto

O escopo exige PWA (RF12) e funcionamento com conteúdo local quando a API estiver indisponível (RF10).

## Decisão

1. **PWA** via `vite-plugin-pwa`: manifest Miniverso, ícones 192/512, `registerType: 'autoUpdate'`, Workbox com NetworkFirst para páginas/API e SWR para assets. SW **desabilitado** em `vite dev`.
2. **Fallback** em `frontend/src/api/client.ts`: cada `get*` captura erro de rede/HTTP e devolve dados de `content.ts` com `fromFallback: true`. A UI mostra um banner de status.

## Consequências

- Demo acadêmica funciona só com o front.
- Cache de API no Workbox restringe-se a `localhost` / `127.0.0.1` — adequado para a entrega local; deploy remoto exigiria ajuste.
- Conteúdo duplicado FE/BE exige sincronização manual na v1.
