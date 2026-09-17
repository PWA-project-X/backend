export type ServiceItem = {
  id: string
  title: string
  description: string
}

export const services: ServiceItem[] = [
  {
    id: 'vr-training',
    title: 'Treinamentos em VR',
    description:
      'Simulações imersivas que aumentam retenção e performance, reduzindo custos de logística e deslocamento.',
  },
  {
    id: 'brand-activation',
    title: 'Ativações de marca',
    description:
      'Experiências interativas em realidade virtual para eventos, campanhas e engajamento de público.',
  },
  {
    id: 'immersive-education',
    title: 'Educação imersiva',
    description:
      'Conteúdos e ambientes virtuais voltados ao aprendizado prático em escolas, universidades e empresas.',
  },
  {
    id: 'xr-consulting',
    title: 'Consultoria em XR',
    description:
      'Apoio técnico e estratégico para projetos de realidade virtual e experiências digitais imersivas.',
  },
]
