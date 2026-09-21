# Guia de contribuição — Backend

API do Portfólio Interno Miniverso ([PWA-project-X/backend](https://github.com/PWA-project-X/backend)).

## Branching

Crie branches a partir de `main`:

| Prefixo | Uso |
| --- | --- |
| `feat/` | Novo endpoint ou dado |
| `fix/` | Correção de bug |
| `docs/` | Documentação |
| `chore/` | Manutenção, CI, deps |

## Commits

- Mensagens claras (português ou inglês — alinhado ao histórico).
- PRs pequenos.

## Pull requests

1. Abra PR contra `main` usando o template.
2. Se alterar o JSON de resposta, atualize o README (contrato canônico) e avise o front.
3. Aguarde CI verde (`build` / `tsc`).
4. Preferência: **squash merge** após 1 aprovação do tech lead.

### Definition of Ready

- Issue ou objetivo claro.
- Sem banco/auth/admin na v1 (RNF07 / fora do escopo).

### Definition of Done

- [ ] `npm run build` passa
- [ ] Endpoints afetados testados (curl ou browser)
- [ ] Contrato no README atualizado se o shape JSON mudou
- [ ] Dados em `src/data/` coerentes com o fallback do frontend quando o conteúdo mudar

## Ambiente local

```bash
cp .env.example .env
npm install
npm run dev
```

## Higiene de branches

Branches remotas obsoletas (`devlop`, `feat/*` já mergeadas) só devem ser apagadas após confirmação do tech lead.
