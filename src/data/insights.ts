export type InsightItem = {
  id: string
  title: string
  summary: string
  tag: string
  body: string
}

export const insights: InsightItem[] = [
  {
    id: 'insight-vr',
    title: 'Por que a RV acelera o aprendizado',
    summary:
      'Ambientes virtuais permitem repetir cenários complexos com segurança, aumentando retenção e confiança na prática.',
    tag: 'Realidade Virtual',
    body: `A realidade virtual muda a forma de treinar porque coloca a pessoa dentro do cenário, e não só diante de uma tela.

Em um ambiente imersivo, dá para repetir o mesmo procedimento quantas vezes forem necessárias, sem risco físico e sem interromper a operação real. Cada tentativa reforça memória muscular, tomada de decisão e confiança.

Para equipes industriais e educacionais, isso significa menos tempo até a competência e mais segurança na hora de agir no mundo físico.`,
  },
  {
    id: 'insight-ar',
    title: 'RA no ponto de contato',
    summary:
      'A realidade aumentada aproxima produto e narrativa do público sem exigir hardware dedicado em todos os contextos.',
    tag: 'Realidade Aumentada',
    body: `A realidade aumentada funciona bem quando o conteúdo chega no momento certo: na loja, no evento, no celular do cliente.

Ao sobrepor informação ao mundo real, a RA explica o produto, conta a história da marca e reduz a distância entre curiosidade e decisão. Em muitos casos, um smartphone já basta — sem óculos especiais.

Para ativações e educação, isso abre um canal direto: o público vê, experimenta e entende no próprio contexto em que está.`,
  },
  {
    id: 'insight-3d',
    title: 'Conteúdo 3D como linguagem',
    summary:
      'Modelos e cenários tridimensionais tornam ideias abstratas concretas — úteis em pitch, treinamento e ativação.',
    tag: 'Conteúdo 3D',
    body: `Ideias complexas ficam mais claras quando podem ser giradas, exploradas e compartilhadas em três dimensões.

Um modelo 3D comunica escala, fluxo e relação espacial de um jeito que texto e slides sozinhos raramente alcançam. Em pitch, treinamento ou ativação de marca, o público entende mais rápido o que está sendo proposto.

Tratar o 3D como linguagem — e não só como efeito visual — ajuda a alinhar times, clientes e usuários em torno da mesma visão.`,
  },
]
