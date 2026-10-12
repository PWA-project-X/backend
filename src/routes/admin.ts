import { Router } from 'express'
import {
  countAdmins,
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
  listInsights,
  listProcessSteps,
  listProjects,
  listServices,
  listUsers,
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

router.get('/company', (_req, res) => {
  const row = getCompany()
  res.json({
    name: row.name,
    project: row.project,
    city: row.city,
    description: row.description,
    proposal: row.proposal,
  })
})

router.put('/company', (req, res) => {
  const { name, project, city, description, proposal } = req.body ?? {}
  if (!name || !project || !city || !description || !proposal) {
    res.status(400).json({ error: 'Preencha todos os campos da empresa' })
    return
  }
  const row = updateCompany({
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

router.get('/services', (_req, res) => {
  res.json({
    services: listServices().map(({ id, title, description }) => ({
      id,
      title,
      description,
    })),
  })
})

router.post('/services', (req, res) => {
  const { id, title, description } = req.body ?? {}
  if (!title || !description) {
    res.status(400).json({ error: 'Informe título e descrição' })
    return
  }
  const row = createService({
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

router.put('/services/:id', (req, res) => {
  const { title, description } = req.body ?? {}
  if (!title || !description) {
    res.status(400).json({ error: 'Informe título e descrição' })
    return
  }
  const row = updateService(req.params.id, {
    title: String(title),
    description: String(description),
  })
  if (!row) {
    res.status(404).json({ error: 'Serviço não encontrado' })
    return
  }
  res.json({ id: row.id, title: row.title, description: row.description })
})

router.delete('/services/:id', (req, res) => {
  if (!deleteService(req.params.id)) {
    res.status(404).json({ error: 'Serviço não encontrado' })
    return
  }
  res.json({ ok: true })
})

router.get('/projects', (_req, res) => {
  res.json({
    projects: listProjects().map(({ id, title, summary, category }) => ({
      id,
      title,
      summary,
      category,
    })),
  })
})

router.post('/projects', (req, res) => {
  const { id, title, summary, category } = req.body ?? {}
  if (!title || !summary || !category) {
    res.status(400).json({ error: 'Informe título, resumo e categoria' })
    return
  }
  const row = createProject({
    id: id ? String(id) : undefined,
    title: String(title),
    summary: String(summary),
    category: String(category),
  })
  res.status(201).json({
    id: row.id,
    title: row.title,
    summary: row.summary,
    category: row.category,
  })
})

router.put('/projects/:id', (req, res) => {
  const { title, summary, category } = req.body ?? {}
  if (!title || !summary || !category) {
    res.status(400).json({ error: 'Informe título, resumo e categoria' })
    return
  }
  const row = updateProject(req.params.id, {
    title: String(title),
    summary: String(summary),
    category: String(category),
  })
  if (!row) {
    res.status(404).json({ error: 'Projeto não encontrado' })
    return
  }
  res.json({
    id: row.id,
    title: row.title,
    summary: row.summary,
    category: row.category,
  })
})

router.delete('/projects/:id', (req, res) => {
  if (!deleteProject(req.params.id)) {
    res.status(404).json({ error: 'Projeto não encontrado' })
    return
  }
  res.json({ ok: true })
})

router.get('/process', (_req, res) => {
  res.json({
    steps: listProcessSteps().map(({ id, number, title, description }) => ({
      id,
      number,
      title,
      description,
    })),
  })
})

router.post('/process', (req, res) => {
  const { id, number, title, description } = req.body ?? {}
  if (!number || !title || !description) {
    res.status(400).json({ error: 'Informe número, título e descrição' })
    return
  }
  const row = createProcessStep({
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

router.put('/process/:id', (req, res) => {
  const { number, title, description } = req.body ?? {}
  if (!number || !title || !description) {
    res.status(400).json({ error: 'Informe número, título e descrição' })
    return
  }
  const row = updateProcessStep(req.params.id, {
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

router.delete('/process/:id', (req, res) => {
  if (!deleteProcessStep(req.params.id)) {
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

router.get('/insights', (_req, res) => {
  res.json({
    insights: listInsights().map(toAdminArticle),
  })
})

router.post('/insights', (req, res) => {
  const { id, title, summary, tag, body, coverUrl } = req.body ?? {}
  if (!title || !summary || !tag || !body) {
    res.status(400).json({ error: 'Informe título, resumo, tag e texto' })
    return
  }
  const row = createInsight({
    id: id ? String(id) : undefined,
    title: String(title),
    summary: String(summary),
    tag: String(tag),
    body: String(body),
    coverUrl: coverUrl ? String(coverUrl) : '',
  })
  res.status(201).json(toAdminArticle(row))
})

router.put('/insights/:id', (req, res) => {
  const { title, summary, tag, body, coverUrl } = req.body ?? {}
  if (!title || !summary || !tag || !body) {
    res.status(400).json({ error: 'Informe título, resumo, tag e texto' })
    return
  }
  const row = updateInsight(req.params.id, {
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

router.delete('/insights/:id', (req, res) => {
  if (!deleteInsight(req.params.id)) {
    res.status(404).json({ error: 'Insight não encontrado' })
    return
  }
  res.json({ ok: true })
})

router.get('/users', (_req, res) => {
  res.json({ users: listUsers() })
})

router.post('/users', (req, res) => {
  const { name, email, password, role } = req.body ?? {}
  if (!name || !email || !password) {
    res.status(400).json({ error: 'Informe nome, e-mail e senha' })
    return
  }

  const normalizedRole: UserRole = role === 'admin' ? 'admin' : 'user'
  if (findUserByEmail(String(email))) {
    res.status(409).json({ error: 'Já existe um usuário com este e-mail' })
    return
  }

  try {
    const user = createUser({
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

router.delete('/users/:id', (req, res) => {
  const target = findUserById(req.params.id)
  if (!target) {
    res.status(404).json({ error: 'Usuário não encontrado' })
    return
  }

  if (req.user && target.id === req.user.id) {
    res.status(400).json({ error: 'Você não pode remover a própria conta' })
    return
  }

  if (target.role === 'admin' && countAdmins() <= 1) {
    res.status(400).json({ error: 'Não é possível remover o último admin' })
    return
  }

  deleteUser(target.id)
  res.json({ ok: true })
})

export default router
