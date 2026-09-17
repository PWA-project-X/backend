export type ProcessStepItem = {
  id: string
  number: string
  title: string
  description: string
}

export const processSteps: ProcessStepItem[] = [
  {
    id: 'entender',
    number: '01',
    title: 'Entender',
    description:
      'Escutamos o contexto, o público e o objetivo. Definimos o que a experiência precisa comunicar e entregar.',
  },
  {
    id: 'criar',
    number: '02',
    title: 'Criar',
    description:
      'Prototipamos e desenvolvemos a solução imersiva, com acompanhamento claro em cada etapa.',
  },
  {
    id: 'compartilhar',
    number: '03',
    title: 'Compartilhar',
    description:
      'Entregamos a experiência, validamos no uso real e compartilhamos o resultado com o time e o público.',
  },
]
