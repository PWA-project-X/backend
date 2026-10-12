# Checklist de aceitação — v1 + auth/admin

Baseado na seção 12 do escopo oficial e na fatia de login/painel.

## Ambiente

- [x] Front sobe com `npm run dev` (pasta `frontend/` ou `npm run dev:web` na raiz)
- [x] Back sobe com `npm run dev` (pasta `backend/` ou `npm run dev:api` na raiz)
- [x] Front faz build com `npm run build`
- [x] Back faz build com `npm run build`
- [x] Na raiz: `npm run install:all`, `npm run dev`, `npm run build` funcionam
- [x] `backend/.env` com `JWT_SECRET`, `ADMIN_*` e `DEMO_USER_*` (ver `.env.example`)

## UI pública

- [x] Página inicial exibida sem erros de console bloqueantes
- [x] Seções **Sobre**, **Serviços**, **Projetos**, **Processo**, **Insights** e **Contato** disponíveis
- [x] Navegação por links funciona em desktop
- [x] Navegação / layout utilizáveis em celular (viewport estreito)
- [x] Botão / controle de retorno ao topo funciona
- [x] Header mostra **Entrar** para visitante; nome + **Sair** (e **Painel** se admin) quando autenticado

## API e fallback

- [x] `GET /health` retorna JSON
- [x] `GET /api/company`, `/api/services`, `/api/process`, `/api/projects`, `/api/insights` retornam JSON do SQLite
- [x] Com a API no ar, o front **não** mostra “Conteúdo local — API indisponível”
- [x] Com a API parada, o front mostra o aviso e as seções do portfólio continuam preenchidas
- [x] Login e painel exigem a API no ar

## Auth e painel (local)

- [x] Login admin (`ADMIN_EMAIL` / `ADMIN_PASSWORD`) acessa `/admin` e `/conta`
- [x] Login user (`DEMO_USER_EMAIL` / `DEMO_USER_PASSWORD`) acessa `/conta` e recebe 403 em `/admin`
- [x] Visitante cria conta em `/cadastro` (papel `user`) sem depender do admin
- [x] Visitante sem cookie continua vendo o portfólio público (acesso livre)
- [x] Admin edita empresa/serviços/projetos/processo/insights e a alteração aparece no site público após recarregar
- [x] Admin cria e remove usuários; não remove a própria conta nem o último admin
- [x] Logout limpa a sessão (cookie)

## PWA

- [x] `npm run build` + `npm run preview` (ou `npm run preview` na raiz com API) abre em `:4173`
- [x] Manifest / ícones presentes no build
- [x] Service worker registrado no preview (DevTools → Application)

## Organização

- [ ] Alterações commitadas nos repositórios originais (`frontend` e `backend`)
- [ ] PRs com descrição e IDs RF/RNF quando aplicável
- [ ] CI verde nas branches afetadas

## Observações

- Persistência e escrita do painel: ambiente **local** (`localhost:3001` + `localhost:5173`). Ver ADR 0004.
- RNF07 (sem banco) superseded pela fatia auth/admin.
