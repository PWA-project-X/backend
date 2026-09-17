export type ProjectItem = {
  id: string
  title: string
  summary: string
  category: string
}

export const projects: ProjectItem[] = [
  {
    id: 'safety-vr',
    title: 'Treinamento de segurança em VR',
    summary:
      'Simulação imersiva de procedimentos de segurança para equipes industriais, com cenários repetíveis e feedback imediato.',
    category: 'Treinamento',
  },
  {
    id: 'campus-tour',
    title: 'Tour virtual acadêmico',
    summary:
      'Ambiente virtual para apresentação de espaços e práticas educacionais, pensado para acolhida e orientação de estudantes.',
    category: 'Educação',
  },
  {
    id: 'brand-experience',
    title: 'Ativação imersiva de marca',
    summary:
      'Experiência em realidade virtual para eventos, conectando o público à narrativa da marca de forma interativa.',
    category: 'Ativação',
  },
  {
    id: 'ops-simulation',
    title: 'Simulação operacional',
    summary:
      'Protótipo de fluxo operacional em VR para treinar decisões rápidas sem interromper a rotina real da equipe.',
    category: 'Corporativo',
  },
]
