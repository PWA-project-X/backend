export type InsightItem = {
  id: string
  title: string
  summary: string
  tag: string
  body: string
  coverUrl: string
}

export const insights: InsightItem[] = [
  {
    id: 'insight-immersive-media',
    title: 'Experiência imersiva com mídia',
    summary:
      'Como texto, imagem e vídeo contam juntos uma narrativa de realidade virtual — do editor ao blog do portfólio.',
    tag: 'Realidade Virtual',
    coverUrl: '/media/articles/immersive-media-cover.jpg',
    body: `<p>Experiências imersivas ganham força quando texto, imagem e vídeo trabalham juntos — não como anexos soltos, mas como uma narrativa contínua. No portfólio da Miniverso, o editor rico existe para contar esses projetos com a mesma densidade da experiência que descreve.</p>
<h2>Mais do que um post com mídia</h2>
<p>Um artigo sobre realidade virtual precisa <strong>mostrar</strong> presença: o headset no rosto, o gesto no ar, o ambiente que envolve. Combinar tipografia clara, figuras legendadas e vídeo embutido aproxima o leitor do que a equipe construiu em Unity, Unreal ou WebXR.</p>
<figure>
<img src="/media/articles/immersive-media-body.jpg" alt="Público em evento com telão e narrativa visual" width="1600" />
<figcaption>Mídia em contexto — o público absorve a história no mesmo ritmo da cena. Foto via Unsplash.</figcaption>
</figure>
<h2>O que entra no pacote</h2>
<ul>
<li>Texto estruturado com seções curtas e ênfase onde importa.</li>
<li>Imagens de capa e de apoio alinhadas ao tema da experiência.</li>
<li>Vídeo para demonstrar movimento, áudio espacial e interação.</li>
<li>Publicação no blog do portfólio, aberta para leitura sem conta.</li>
</ul>
<h2>Do editor ao portfólio</h2>
<p>No painel admin, o time monta o artigo com o editor visual: formatação, upload de imagens e incorporação de vídeo. Na frente, o visitante vê capa, resumo e corpo sanitizado — pronto para celular, desktop ou PWA instalada.</p>
<h2>Por que isso importa na RV</h2>
<p>Realidade virtual é difícil de explicar só com parágrafo. Quando a mídia acompanha o texto, o leitor entende escala, ritmo e intenção da ativação ou do treinamento. O artigo deixa de ser documentação e passa a ser extensão da experiência.</p>
<blockquote><p>Uma boa peça de conteúdo imersivo não compete com o headset — ela prepara o público para entrar nele.</p></blockquote>
<p>Este artigo é o modelo: capa forte, seções claras e mídia no lugar certo. Use-o como referência ao publicar novos cases de RV, RA e conteúdo 3D no blog da Miniverso.</p>`,
  },
  {
    id: 'insight-vr',
    title: 'Por que a RV acelera o aprendizado',
    summary:
      'Ambientes virtuais permitem repetir cenários complexos com segurança, aumentando retenção e confiança na prática.',
    tag: 'Realidade Virtual',
    coverUrl: '/media/articles/insight-vr-cover.jpg',
    body: `<p>A realidade virtual muda a forma de treinar porque coloca a pessoa dentro do cenário, e não só diante de uma tela. Em vez de observar um vídeo, o aprendiz age: escolhe, erra, corrige e tenta de novo.</p>
<h2>Presença muda a retenção</h2>
<p>Quando o corpo e o olhar estão no ambiente, a memória deixa de ser só verbal. Procedimentos, rotas e gestos ficam associados a lugares e sensações. Essa presença ajuda a lembrar o “como fazer” semanas depois do treino.</p>
<h2>Repetir sem risco</h2>
<p>Em um ambiente imersivo, dá para repetir o mesmo procedimento quantas vezes forem necessárias, sem risco físico e sem interromper a operação real. Cada tentativa reforça memória muscular, tomada de decisão e confiança.</p>
<figure>
<img src="/media/articles/insight-vr-body.jpg" alt="Espaço de estudo e aprendizagem" width="1600" />
<figcaption>Aprendizado ativo se beneficia de cenários que podem ser revisitados. Foto via Unsplash.</figcaption>
</figure>
<h2>Feedback imediato</h2>
<p>A sessão pode terminar com um resumo claro: o que foi feito certo, onde houve hesitações e o que tentar na próxima rodada. Esse ciclo curto — praticar, ver o resultado, ajustar — é o que acelera a curva de competência.</p>
<h2>Onde a RV faz mais sentido</h2>
<ul>
<li>Procedimentos de segurança e resposta a incidentes.</li>
<li>Onboarding em espaços grandes ou de acesso restrito.</li>
<li>Treinamentos caros ou raros demais para ensaiar no mundo físico.</li>
<li>Práticas em que a confiança do operador pesa tanto quanto a teoria.</li>
</ul>
<h2>Começar pequeno</h2>
<p>Não é preciso simular a planta inteira no primeiro dia. Um cenário bem escolhido, com objetivos claros e métricas simples, já entrega valor. Para equipes industriais e educacionais, isso significa menos tempo até a competência e mais segurança na hora de agir no mundo físico.</p>`,
  },
  {
    id: 'insight-ar',
    title: 'RA no ponto de contato',
    summary:
      'A realidade aumentada aproxima produto e narrativa do público sem exigir hardware dedicado em todos os contextos.',
    tag: 'Realidade Aumentada',
    coverUrl: '/media/articles/insight-ar-cover.jpg',
    body: `<p>A realidade aumentada funciona bem quando o conteúdo chega no momento certo: na loja, no evento, no celular do cliente. Em vez de tirar a pessoa do contexto, a RA acrescenta uma camada útil sobre o que já está à frente dos olhos.</p>
<h2>Contexto é metade da experiência</h2>
<p>Ao sobrepor informação ao mundo real, a RA explica o produto, conta a história da marca e reduz a distância entre curiosidade e decisão. Em muitos casos, um smartphone já basta — sem óculos especiais.</p>
<h2>Baixa barreira, alto impacto</h2>
<p>Campanhas e ativações ganham quando o visitante aponta a câmera e vê o conteúdo em segundos. Quanto menos instalação e quanto mais óbvio o gesto, maior a chance de alguém completar a experiência.</p>
<figure>
<img src="/media/articles/insight-ar-body.jpg" alt="Smartphone em uso no ponto de contato" width="1600" />
<figcaption>O celular continua sendo o canal mais acessível para RA no dia a dia. Foto via Unsplash.</figcaption>
</figure>
<h2>Casos que costumam funcionar</h2>
<ul>
<li>Demonstração de produto em escala real na prateleira ou no stand.</li>
<li>Instruções passo a passo sobre equipamentos ou embalagens.</li>
<li>Storytelling de marca ancorado em um objeto físico.</li>
<li>Apoio educacional em visitas, laboratórios e museus.</li>
</ul>
<h2>Design para o mundo real</h2>
<p>Iluminação, ruído, fila e conexão instável fazem parte do brief. Uma boa experiência de RA prevê fallbacks, textos curtos e um convite claro para começar — senão a magia some antes do primeiro frame.</p>
<h2>Um canal direto</h2>
<p>Para ativações e educação, a RA abre um canal em que o público vê, experimenta e entende no próprio contexto em que está. Quando o conteúdo é útil e leve, o ponto de contato deixa de ser só um lugar de passagem.</p>`,
  },
  {
    id: 'insight-3d',
    title: 'Conteúdo 3D como linguagem',
    summary:
      'Modelos e cenários tridimensionais tornam ideias abstratas concretas — úteis em pitch, treinamento e ativação.',
    tag: 'Conteúdo 3D',
    coverUrl: '/media/articles/insight-3d-cover.jpg',
    body: `<p>Ideias complexas ficam mais claras quando podem ser giradas, exploradas e compartilhadas em três dimensões. O 3D deixa de ser “efeito” e passa a ser um jeito de alinhar times e públicos em torno da mesma visão.</p>
<h2>Ver a escala muda a conversa</h2>
<p>Um modelo 3D comunica escala, fluxo e relação espacial de um jeito que texto e slides sozinhos raramente alcançam. Em pitch, treinamento ou ativação de marca, o público entende mais rápido o que está sendo proposto.</p>
<h2>Uma linguagem, vários canais</h2>
<p>O mesmo ativo pode alimentar um site, uma experiência em VR, um material impresso ou uma cena em RA. Pensar o 3D como linguagem desde o início evita refazer o modelo a cada canal.</p>
<figure>
<img src="/media/articles/insight-3d-body.jpg" alt="Abstração visual tridimensional" width="1600" />
<figcaption>Formas e volumes ajudam a tornar conceitos abstratos palpáveis. Foto via Unsplash.</figcaption>
</figure>
<h2>Onde o 3D entrega mais</h2>
<ul>
<li>Apresentações de produto e arquitetura de solução.</li>
<li>Treinamentos que dependem de layout espacial.</li>
<li>Ativações em que o público precisa “entrar” na narrativa.</li>
<li>Documentação visual para times distribuídos.</li>
</ul>
<h2>Clareza acima do realismo</h2>
<p>Nem todo projeto precisa de fotorealismo. Às vezes um volume bem iluminado e um fluxo marcado bastam. O critério útil é: a pessoa entende o que importa em poucos segundos?</p>
<h2>Alinhar a visão</h2>
<p>Tratar o 3D como linguagem — e não só como efeito visual — ajuda a alinhar times, clientes e usuários em torno da mesma visão. Quando todos veem o mesmo objeto, a conversa sobe de nível: deixa de ser interpretação e passa a ser decisão.</p>`,
  },
]
