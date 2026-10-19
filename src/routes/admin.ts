import { Router } from 'express'
import {
  countAdmins,
  countFeaturedProjects,
  createInsight,
  createProcessStep,
  createProject,
  createService,
  createUser,
  deleteInsight,
  deleteProcessStep,
  deleteProject,
  deleteService,
  deleteUser,
  findUserByEmail,
  findUserById,
  getCompany,
  getProject,
  listInsights,
  listProcessSteps,
  listProjects,
  listServices,
  listUsers,
  parseTechnologies,
  updateCompany,
  updateInsight,
  updateProcessStep,
  updateProject,
  updateService,
} from '../db/index.js'
import { requireAdmin } from '../middleware/auth.js'
import type { UserRole } from '../types.js'

const router = Router()

router.use(requireAdmin)

router.get('/company', async (_req, res) => {
  const row = await getCompany()
  res.json({
    name: row.name,
    project: row.project,
    city: row.city,
    description: row.description,
    proposal: row.proposal,
  })
})

router.put('/company', async (req, res) => {
  const { name, project, city, description, proposal } = req.body ?? {}
  if (!name || !project || !city || !description || !proposal) {
    res.status(400).json({ error: 'Preencha todos os campos da empresa' })
    return
  }
  const row = await updateCompany({
    name: String(name),
    project: String(project),
    city: String(city),
    description: String(description),
    proposal: String(proposal),
  })
  res.json({
    name: row.name,
    project: row.project,
    city: row.city,
    description: row.description,
    proposal: row.proposal,
  })
})

router.get('/services', async (_req, res) => {
  const services = await listServices()
  res.json({
    services: services.map(({ id, title, description }) => ({
      id,
      title,
      description,
    })),
  })
})

router.post('/services', async (req, res) => {
  const { id, title, description } = req.body ?? {}
  if (!title || !description) {
    res.status(400).json({ error: 'Informe título e descrição' })
    return
  }
  const row = await createService({
    id: id ? String(id) : undefined,
    title: String(title),
    description: String(description),
  })
  res.status(201).json({
    id: row.id,
    title: row.title,
    description: row.description,
  })
})

router.put('/services/:id', async (req, res) => {
  const { title, description } = req.body ?? {}
  if (!title || !description) {
    res.status(400).json({ error: 'Informe título e descrição' })
    return
  }
  const row = await updateService(req.params.id, {
    title: String(title),
    description: String(description),
  })
  if (!row) {
    res.status(404).json({ error: 'Serviço não encontrado' })
    return
  }
  res.json({ id: row.id, title: row.title, description: row.description })
})

router.delete('/services/:id', async (req, res) => {
  if (!(await deleteService(req.params.id))) {
    res.status(404).json({ error: 'Serviço não encontrado' })
    return
  }
  res.json({ ok: true })
})

function toAdminProject(row: {
  id: string
  title: string
  summary: string
  category: string
  description: string
  cover_url: string
  technologies: string
  featured: number
  sort_order: number
}) {
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    category: row.category,
    description: row.description || '',
    coverUrl: row.cover_url || '',
    technologies: parseTechnologies(row.technologies),
    featured: Boolean(row.featured),
    sortOrder: row.sort_order,
  }
}

function parseTechInput(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean)
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
}

router.get('/projects', async (_req, res) => {
  const projects = await listProjects()
  res.json({
    projects: projects.map(toAdminProject),
  })
})

router.post('/projects', async (req, res) => {
  const {
    id,
    title,
    summary,
    category,
    description,
    coverUrl,
    technologies,
    featured,
    sortOrder,
  } = req.body ?? {}
  if (!title || !summary || !category || !description) {
    res
      .status(400)
      .json({ error: 'Informe título, resumo, categoria e descrição' })
    return
  }

  const wantFeatured = Boolean(featured)
  if (wantFeatured && (await countFeaturedProjects()) >= 6) {
    res.status(400).json({
      error: 'Já existem 6 projetos em destaque. Remova um antes de adicionar.',
    })
    return
  }

  const row = await createProject({
    id: id ? String(id) : undefined,
    title: String(title),
    summary: String(summary),
    category: String(category),
    description: String(description),
    coverUrl: coverUrl ? String(coverUrl) : '',
    technologies: parseTechInput(technologies),
    featured: wantFeatured,
    sortOrder:
      sortOrder === undefined || sortOrder === null || sortOrder === ''
        ? undefined
        : Number(sortOrder),
  })
  res.status(201).json(toAdminProject(row))
})

router.put('/projects/:id', async (req, res) => {
  const {
    title,
    summary,
    category,
    description,
    coverUrl,
    technologies,
    featured,
    sortOrder,
  } = req.body ?? {}
  if (!title || !summary || !category || !description) {
    res
      .status(400)
      .json({ error: 'Informe título, resumo, categoria e descrição' })
    return
  }

  const current = await getProject(req.params.id)
  if (!current) {
    res.status(404).json({ error: 'Projeto não encontrado' })
    return
  }

  const wantFeatured = Boolean(featured)
  const wasFeatured = Boolean(current.featured)
  const featuredCount = await countFeaturedProjects()

  if (wantFeatured && !wasFeatured && featuredCount >= 6) {
    res.status(400).json({
      error: 'Já existem 6 projetos em destaque. Remova um antes de adicionar.',
    })
    return
  }

  if (!wantFeatured && wasFeatured && featuredCount <= 3) {
    res.status(400).json({
      error: 'Mantenha pelo menos 3 projetos em destaque na página principal.',
    })
    return
  }

  const row = await updateProject(req.params.id, {
    title: String(title),
    summary: String(summary),
    category: String(category),
    description: String(description),
    coverUrl: coverUrl ? String(coverUrl) : '',
    technologies: parseTechInput(technologies),
    featured: wantFeatured,
    sortOrder:
      sortOrder === undefined || sortOrder === null || sortOrder === ''
        ? undefined
        : Number(sortOrder),
  })
  if (!row) {
    res.status(404).json({ error: 'Projeto não encontrado' })
    return
  }
  res.json(toAdminProject(row))
})

router.delete('/projects/:id', async (req, res) => {
  const current = await getProject(req.params.id)
  if (!current) {
    res.status(404).json({ error: 'Projeto não encontrado' })
    return
  }

  if (current.featured && (await countFeaturedProjects()) <= 3) {
    res.status(400).json({
      error:
        'Não é possível excluir: mantenha pelo menos 3 projetos em destaque.',
    })
    return
  }

  if (!(await deleteProject(req.params.id))) {
    res.status(404).json({ error: 'Projeto não encontrado' })
    return
  }
  res.json({ ok: true })
})

router.get('/process', async (_req, res) => {
  const steps = await listProcessSteps()
  res.json({
    steps: steps.map(({ id, number, title, description }) => ({
      id,
      number,
      title,
      description,
    })),
  })
})

router.post('/process', async (req, res) => {
  const { id, number, title, description } = req.body ?? {}
  if (!number || !title || !description) {
    res.status(400).json({ error: 'Informe número, título e descrição' })
    return
  }
  const row = await createProcessStep({
    id: id ? String(id) : undefined,
    number: String(number),
    title: String(title),
    description: String(description),
  })
  res.status(201).json({
    id: row.id,
    number: row.number,
    title: row.title,
    description: row.description,
  })
})

router.put('/process/:id', async (req, res) => {
  const { number, title, description } = req.body ?? {}
  if (!number || !title || !description) {
    res.status(400).json({ error: 'Informe número, título e descrição' })
    return
  }
  const row = await updateProcessStep(req.params.id, {
    number: String(number),
    title: String(title),
    description: String(description),
  })
  if (!row) {
    res.status(404).json({ error: 'Etapa não encontrada' })
    return
  }
  res.json({
    id: row.id,
    number: row.number,
    title: row.title,
    description: row.description,
  })
})

router.delete('/process/:id', async (req, res) => {
  if (!(await deleteProcessStep(req.params.id))) {
    res.status(404).json({ error: 'Etapa não encontrada' })
    return
  }
  res.json({ ok: true })
})

function toAdminArticle(row: {
  id: string
  title: string
  summary: string
  tag: string
  body: string
  cover_url: string
  created_at: string
}) {
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    tag: row.tag,
    body: row.body,
    coverUrl: row.cover_url || '',
    createdAt: row.created_at,
  }
}

router.get('/insights', async (_req, res) => {
  const insights = await listInsights()
  res.json({
    insights: insights.map(toAdminArticle),
  })
})

router.post('/insights', async (req, res) => {
  const { id, title, summary, tag, body, coverUrl } = req.body ?? {}
  if (!title || !summary || !tag || !body) {
    res.status(400).json({ error: 'Informe título, resumo, tag e texto' })
    return
  }
  const row = await createInsight({
    id: id ? String(id) : undefined,
    title: String(title),
    summary: String(summary),
    tag: String(tag),
    body: String(body),
    coverUrl: coverUrl ? String(coverUrl) : '',
  })
  res.status(201).json(toAdminArticle(row))
})

router.put('/insights/:id', async (req, res) => {
  const { title, summary, tag, body, coverUrl } = req.body ?? {}
  if (!title || !summary || !tag || !body) {
    res.status(400).json({ error: 'Informe título, resumo, tag e texto' })
    return
  }
  const row = await updateInsight(req.params.id, {
    title: String(title),
    summary: String(summary),
    tag: String(tag),
    body: String(body),
    coverUrl: coverUrl ? String(coverUrl) : '',
  })
  if (!row) {
    res.status(404).json({ error: 'Insight não encontrado' })
    return
  }
  res.json(toAdminArticle(row))
})

router.delete('/insights/:id', async (req, res) => {
  if (!(await deleteInsight(req.params.id))) {
    res.status(404).json({ error: 'Insight não encontrado' })
    return
  }
  res.json({ ok: true })
})

router.get('/users', async (_req, res) => {
  res.json({ users: await listUsers() })
})

router.post('/users', async (req, res) => {
  const { name, email, password, role } = req.body ?? {}
  if (!name || !email || !password) {
    res.status(400).json({ error: 'Informe nome, e-mail e senha' })
    return
  }

  const normalizedRole: UserRole = role === 'admin' ? 'admin' : 'user'
  if (await findUserByEmail(String(email))) {
    res.status(409).json({ error: 'Já existe um usuário com este e-mail' })
    return
  }

  try {
    const user = await createUser({
      name: String(name),
      email: String(email),
      password: String(password),
      role: normalizedRole,
    })
    res.status(201).json({ user })
  } catch {
    res.status(400).json({ error: 'Não foi possível criar o usuário' })
  }
})

router.delete('/users/:id', async (req, res) => {
  const target = await findUserById(req.params.id)
  if (!target) {
    res.status(404).json({ error: 'Usuário não encontrado' })
    return
  }

  if (req.user && target.id === req.user.id) {
    res.status(400).json({ error: 'Você não pode remover a própria conta' })
    return
  }

  if (target.role === 'admin' && (await countAdmins()) <= 1) {
    res.status(400).json({ error: 'Não é possível remover o último admin' })
    return
  }

  await deleteUser(target.id)
  res.json({ ok: true })
})

export default router
