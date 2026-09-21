# Checklist de aceitação — v1

Baseado na seção 12 do escopo oficial. Marque antes de considerar a entrega pronta.

## Ambiente

- [x] Front sobe com `npm run dev` (pasta `frontend/` ou `npm run dev:web` na raiz)
- [x] Back sobe com `npm run dev` (pasta `backend/` ou `npm run dev:api` na raiz)
- [x] Front faz build com `npm run build`
- [x] Back faz build com `npm run build`
- [x] Na raiz: `npm run install:all`, `npm run dev`, `npm run build` funcionam

## UI

- [x] Página inicial exibida sem erros de console bloqueantes
- [x] Seções **Sobre**, **Serviços**, **Projetos** e **Processo** disponíveis
- [x] Navegação por links funciona em desktop
- [x] Navegação / layout utilizáveis em celular (viewport estreito)
- [x] Botão / controle de retorno ao topo funciona

## API e fallback

- [x] `GET /health` retorna JSON
- [x] `GET /api/company`, `/api/services`, `/api/process`, `/api/projects` retornam JSON
- [x] Com a API no ar, o front **não** mostra “Conteúdo local — API indisponível”
- [x] Com a API parada, o front mostra o aviso e as seções continuam preenchidas

## PWA

- [x] `npm run build` + `npm run preview` (ou `npm run preview` na raiz com API) abre em `:4173`
- [x] Manifest / ícones presentes no build
- [x] Service worker registrado no preview (DevTools → Application)

## Organização

- [x] Alterações commitadas nos repositórios originais (`frontend` e `backend`)
- [x] PRs com descrição e IDs RF/RNF quando aplicável
- [x] CI verde em `main` (quando o pacote de governança estiver mergeado)

## Observações da validação (2026-09-21)

- Conteúdo Must alinhado: serviços 3D/RV/RA/imersivo; processo etapa **Entregar**; Sobre com tecnologia/design/narrativa/imersivo.
- RF13 Insights e RF14 Contato entregues como seções visuais.
- PRs mergeados: frontend #11, backend #7; CI verde em `main`.
- Fallback verificado com API interrompida (banner “Conteúdo local — API indisponível” + seções preenchidas).
