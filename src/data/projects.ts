export type ProjectItem = {
  id: string
  title: string
  summary: string
  category: string
  description: string
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
    description:
      'Ambientes virtuais recriam situações de risco controlado para treinar equipes industriais. Os participantes praticam procedimentos, recebem feedback imediato e repetem cenários até consolidar a resposta correta — sem interromper a operação real.',
    technologies: ['Unity', 'VR', 'C#'],
    featured: true,
  },
  {
    id: 'campus-tour',
    title: 'Tour virtual acadêmico',
    summary:
      'Ambiente virtual para apresentação de espaços e práticas educacionais, pensado para acolhida e orientação de estudantes.',
    category: 'Educação',
    description:
      'Um campus navegável em 3D apresenta salas, laboratórios e rotas de acolhida. Estudantes e visitantes exploram o espaço no próprio ritmo, com pontos de informação e orientações que facilitam a integração no primeiro dia.',
    technologies: ['Three.js', 'WebXR', 'Blender'],
    featured: true,
  },
  {
    id: 'brand-experience',
    title: 'Ativação imersiva de marca',
    summary:
      'Experiência em realidade virtual para eventos, conectando o público à narrativa da marca de forma interativa.',
    category: 'Ativação',
    description:
      'Em eventos e ativações, o público entra em uma narrativa interativa da marca. A experiência combina cenários virtuais, elementos sonoros e interações simples para gerar presença memorável em poucos minutos de uso.',
    technologies: ['Unreal', 'VR', 'Spatial Audio'],
    featured: true,
  },
  {
    id: 'ops-simulation',
    title: 'Simulação operacional',
    summary:
      'Protótipo de fluxo operacional em VR para treinar decisões rápidas sem interromper a rotina real da equipe.',
    category: 'Corporativo',
    description:
      'O protótipo simula fluxos de decisão operacional em tempo limitado. Gestores e equipes praticam prioridades, comunicação e resposta a incidentes em um ambiente seguro, com métricas claras de desempenho ao final de cada sessão.',
    technologies: ['Unity', 'VR', 'Analytics'],
    featured: true,
  },
]
