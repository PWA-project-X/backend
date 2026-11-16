export type ProjectItem = {
  id: string
  title: string
  summary: string
  category: string
  description: string
  coverUrl: string
  technologies: string[]
  featured: boolean
}

export const projects: ProjectItem[] = [
  {
    id: 'safety-vr',
    title: 'Treinamento de segurança em VR',
    summary:
      'Simulação imersiva de procedimentos de segurança para equipes industriais, com cenários repetíveis e feedback imediato.',
    category: 'Treinamento',
    coverUrl: '/media/projects/safety-vr-cover.jpg',
    description: `<p>Ambientes virtuais recriam situações de risco controlado para treinar equipes industriais. Os participantes praticam procedimentos, recebem feedback imediato e repetem cenários até consolidar a resposta correta — sem interromper a operação real.</p>
<h2>Contexto</h2>
<p>Em plantas industriais, erros em procedimentos de segurança têm custo humano e operacional alto. Treinar no chão de fábrica exige paradas, supervisão constante e exposição a riscos que o próprio treinamento deveria evitar. A Miniverso propôs um ambiente em VR para ensaiar esses fluxos com a mesma linguagem visual do local de trabalho.</p>
<h2>Desafio</h2>
<p>O desafio era traduzir checklists e normas em ações memoráveis: reconhecer EPIs, isolar áreas, reagir a alarmes e comunicar incidentes. A experiência precisava ser curta o bastante para encaixar em turnos, e clara o bastante para que operadores com pouca familiaridade com VR se sentissem seguros para errar e repetir.</p>
<figure>
<img src="/media/projects/safety-vr-body.jpg" alt="Ambiente industrial usado como referência visual do treinamento" width="1600" />
<figcaption>Referência de ambiente industrial para os cenários de treinamento. Foto via Unsplash.</figcaption>
</figure>
<h2>O que foi feito</h2>
<ul>
<li>Mapeamento dos procedimentos críticos com o time de segurança.</li>
<li>Modelagem de cenários em Unity com sinais sonoros e visuais alinhados à planta.</li>
<li>Fluxos com falhas controladas e feedback imediato ao final de cada tentativa.</li>
<li>Sessões piloto com operadores para ajustar ritmo, linguagem e carga cognitiva.</li>
</ul>
<h2>Resultado</h2>
<p>O protótipo entregou um ciclo de treino repetível: entrar no cenário, executar o procedimento, revisar o que falhou e tentar de novo. A equipe de segurança passou a usar a simulação como complemento ao treinamento presencial, reduzindo a dependência de paradas físicas só para ensaiar rotinas.</p>`,
    technologies: ['Unity', 'VR', 'C#'],
    featured: true,
  },
  {
    id: 'campus-tour',
    title: 'Tour virtual acadêmico',
    summary:
      'Ambiente virtual para apresentação de espaços e práticas educacionais, pensado para acolhida e orientação de estudantes.',
    category: 'Educação',
    coverUrl: '/media/projects/campus-tour-cover.jpg',
    description: `<p>Um campus navegável em 3D apresenta salas, laboratórios e rotas de acolhida. Estudantes e visitantes exploram o espaço no próprio ritmo, com pontos de informação e orientações que facilitam a integração no primeiro dia.</p>
<h2>Contexto</h2>
<p>A primeira semana na universidade costuma ser intensa: muitos espaços, poucas referências e filas de orientação. Um tour virtual antecipa essa jornada — no celular ou no computador — para que a pessoa já chegue com um mapa mental do campus e das práticas que encontrará.</p>
<h2>Desafio</h2>
<p>Era preciso equilibrar fidelidade espacial com leveza técnica: o ambiente deveria carregar bem na web, manter pontos de interesse claros e funcionar tanto para quem só quer uma visão geral quanto para quem precisa achar laboratórios e rotas de acolhida.</p>
<figure>
<img src="/media/projects/campus-tour-body.jpg" alt="Estudantes em ambiente acadêmico" width="1600" />
<figcaption>Referência de acolhida e vida no campus. Foto via Unsplash.</figcaption>
</figure>
<h2>O que foi feito</h2>
<ul>
<li>Levantamento dos espaços prioritários e das rotas de boas-vindas.</li>
<li>Modelagem em Blender e publicação com Three.js e WebXR.</li>
<li>Hotspots com textos curtos, fotos e links para materiais de apoio.</li>
<li>Modo guiado para a primeira visita e modo livre para exploração.</li>
</ul>
<h2>Resultado</h2>
<p>O tour passou a integrar o material de acolhida: estudantes exploram salas e laboratórios antes do primeiro dia, e a equipe acadêmica reduz dúvidas repetidas sobre “onde fica” e “como chegar”. A mesma base 3D serve para eventos abertos e apresentações institucionais.</p>`,
    technologies: ['Three.js', 'WebXR', 'Blender'],
    featured: true,
  },
  {
    id: 'brand-experience',
    title: 'Ativação imersiva de marca',
    summary:
      'Experiência em realidade virtual para eventos, conectando o público à narrativa da marca de forma interativa.',
    category: 'Ativação',
    coverUrl: '/media/projects/brand-experience-cover.jpg',
    description: `<p>Em eventos e ativações, o público entra em uma narrativa interativa da marca. A experiência combina cenários virtuais, elementos sonoros e interações simples para gerar presença memorável em poucos minutos de uso.</p>
<h2>Contexto</h2>
<p>Em stands e lançamentos, a atenção compete com dezenas de estímulos. A Miniverso desenhou uma ativação em VR para contar a história da marca em poucos minutos: o visitante coloca o headset, vive um arco curto e sai com uma lembrança clara — não só um brinde.</p>
<h2>Desafio</h2>
<p>O tempo médio de uso em evento é curto. A narrativa precisava ser imediata, com interações óbvias, filas fluidas e uma estética forte o bastante para fotografar bem e circular nas redes sem exigir explicação longa.</p>
<figure>
<img src="/media/projects/brand-experience-body.jpg" alt="Público em evento com iluminação cênica" width="1600" />
<figcaption>Referência de atmosfera de evento e ativação. Foto via Unsplash.</figcaption>
</figure>
<h2>O que foi feito</h2>
<ul>
<li>Roteiro de três atos alinhado aos pilares da marca.</li>
<li>Cenário em Unreal com áudio espacial e interações por gestos simples.</li>
<li>Operação de fila com briefing de 30 segundos e reset rápido entre sessões.</li>
<li>Captura de momentos-chave para conteúdo pós-evento.</li>
</ul>
<h2>Resultado</h2>
<p>A ativação concentrou fluxo no stand e gerou conversas espontâneas sobre a narrativa vivida. A equipe de marca saiu com material visual e um formato reutilizável para próximas feiras, ajustando só o conteúdo sem redesenhar toda a mecânica.</p>`,
    technologies: ['Unreal', 'VR', 'Spatial Audio'],
    featured: true,
  },
  {
    id: 'ops-simulation',
    title: 'Simulação operacional',
    summary:
      'Protótipo de fluxo operacional em VR para treinar decisões rápidas sem interromper a rotina real da equipe.',
    category: 'Corporativo',
    coverUrl: '/media/projects/ops-simulation-cover.jpg',
    description: `<p>O protótipo simula fluxos de decisão operacional em tempo limitado. Gestores e equipes praticam prioridades, comunicação e resposta a incidentes em um ambiente seguro, com métricas claras de desempenho ao final de cada sessão.</p>
<h2>Contexto</h2>
<p>Decisões operacionais raramente falham por falta de regra escrita — falham sob pressão de tempo, ruído e informação incompleta. A simulação coloca a equipe diante desses mesmos gatilhos, sem afetar a operação real.</p>
<h2>Desafio</h2>
<p>Era preciso modelar um fluxo crível (alerta, triagem, priorização, comunicação) e medir o que importa: tempo até a primeira ação, qualidade da comunicação e aderência ao protocolo. Tudo em sessões curtas, com debriefing objetivo.</p>
<figure>
<img src="/media/projects/ops-simulation-body.jpg" alt="Mesa de trabalho com planejamento e indicadores" width="1600" />
<figcaption>Referência de rotina operacional e tomada de decisão. Foto via Unsplash.</figcaption>
</figure>
<h2>O que foi feito</h2>
<ul>
<li>Definição dos incidentes-tipo com líderes de operação.</li>
<li>Protótipo em Unity com cronômetro, painéis de status e canais de comunicação simulados.</li>
<li>Dashboard simples com métricas por sessão para o debriefing.</li>
<li>Rodadas de teste com gestores e operadores para calibrar dificuldade.</li>
</ul>
<h2>Resultado</h2>
<p>O time passou a ensaiar prioridades e comunicação sob pressão em um ambiente seguro. As métricas da sessão tornaram o feedback concreto: o que demorou, o que foi bem comunicado e o que precisa de reforço no próximo ciclo de treino.</p>`,
    technologies: ['Unity', 'VR', 'Analytics'],
    featured: true,
  },
]
