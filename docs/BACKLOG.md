# Backlog — Portfólio Interno Miniverso

Priorização MoSCoW alinhada ao PDF de escopo (v0.1). Issues criadas nos repositórios oficiais.

## Must (alinhar conteúdo ao PDF)

| Issue | Repo | Tema |
| --- | --- | --- |
| [#4](https://github.com/PWA-project-X/frontend/issues/4) | frontend | Serviços → Conteúdo 3D, RV, RA, Experiências imersivas |
| [#3](https://github.com/PWA-project-X/backend/issues/3) | backend | Mesmo alinhamento em `/api/services` |
| [#5](https://github.com/PWA-project-X/frontend/issues/5) | frontend | Processo etapa 03: Compartilhar → Entregar |
| [#4](https://github.com/PWA-project-X/backend/issues/4) | backend | Mesmo alinhamento em `/api/process` |

Implementação sob demanda do tech lead (mudança pequena de dados; não faz parte do pacote de governança).

## Should

| Issue | Repo | Tema |
| --- | --- | --- |
| [#6](https://github.com/PWA-project-X/frontend/issues/6) | frontend | Limpar branches remotas obsoletas |
| [#5](https://github.com/PWA-project-X/backend/issues/5) | backend | Limpar branches remotas obsoletas |
| [#7](https://github.com/PWA-project-X/frontend/issues/7) | frontend | Decidir versionamento do `figma-plugin` |

**Comando sugerido** (só após ok explícito do TL):

```bash
# Exemplo — NÃO executar sem confirmação
git push origin --delete devlop
```

## Could (opcional no PDF — RF13 / RF14)

| Issue | Repo | Tema |
| --- | --- | --- |
| [#8](https://github.com/PWA-project-X/frontend/issues/8) | frontend | Seção Insights/Blog visual |
| [#9](https://github.com/PWA-project-X/frontend/issues/9) | frontend | Seção Contato visual (sem envio) |

## Won't (v1)

| Issue | Repo | Tema |
| --- | --- | --- |
| [#10](https://github.com/PWA-project-X/frontend/issues/10) | frontend | Lista do fora de escopo (admin, auth, DB, XR no browser, …) |
| [#6](https://github.com/PWA-project-X/backend/issues/6) | backend | Lista do fora de escopo da API |

## Já entregue (entregas 1–4)

- Front com seções Home / Sobre / Serviços / Projetos / Processo
- API estática + CORS local
- Integração FE↔API com fallback
- Responsividade, Orbital Clean, PWA
- Pacote de tech lead (docs, CI, templates) — Entrega 5 em andamento via PRs

Ver também: [TRACEABILITY.md](TRACEABILITY.md), [ACCEPTANCE.md](ACCEPTANCE.md).
