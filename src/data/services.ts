export type ServiceItem = {
  id: string
  title: string
  description: string
}

export const services: ServiceItem[] = [
  {
    id: 'conteudo-3d',
    title: 'Conteúdo 3D',
    description:
      'Modelagem, cenários e peças tridimensionais para comunicação visual, produtos digitais e ambientes imersivos.',
  },
  {
    id: 'realidade-virtual',
    title: 'Realidade Virtual',
    description:
      'Experiências em VR para educação, treinamento e ativação de marca, com presença e interação em ambientes virtuais.',
  },
  {
    id: 'realidade-aumentada',
    title: 'Realidade Aumentada',
    description:
      'Camadas digitais sobre o mundo físico para demonstrações, storytelling e engajamento em pontos de contato reais.',
  },
  {
    id: 'experiencias-imersivas',
    title: 'Experiências imersivas',
    description:
      'Jornadas que combinam 3D, RV e RA para criar narrativas memoráveis para marcas e organizações.',
  },
]
