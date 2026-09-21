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
      'Compreendemos a necessidade, o público e o objetivo do projeto antes de propor a solução.',
  },
  {
    id: 'criar',
    number: '02',
    title: 'Criar',
    description:
      'Desenvolvemos a solução visual, técnica e interativa, com acompanhamento claro em cada etapa.',
  },
  {
    id: 'entregar',
    number: '03',
    title: 'Entregar',
    description:
      'Testamos, apresentamos e disponibilizamos o resultado para o time e o público.',
  },
]
