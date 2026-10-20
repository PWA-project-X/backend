import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import {
  getCompany,
  getProject,
  listFeaturedProjects,
  listHomeInsights,
  listProcessSteps,
  listServices,
  parseTechnologies,
} from './db/index.js'
import adminRouter from './routes/admin.js'
import articlesRouter from './routes/articles.js'
import authRouter from './routes/auth.js'
import uploadsRouter, { uploadsDir, useBlobStorage } from './routes/uploads.js'

const app = express()

function vercelOrigins(): Set<string> {
  const origins = new Set<string>()
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  const deployment = process.env.VERCEL_URL?.trim()
  if (production) {
    origins.add(`https://${production.replace(/^https?:\/\//, '')}`)
  }
  if (deployment) {
    origins.add(`https://${deployment.replace(/^https?:\/\//, '')}`)
  }
  return origins
}

function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return true
  try {
    const url = new URL(origin)
    const localHost =
      url.hostname === 'localhost' || url.hostname === '127.0.0.1'
    if (localHost && (url.protocol === 'http:' || url.protocol === 'https:')) {
      return true
    }
    if (url.hostname.endsWith('.vercel.app') && url.protocol === 'https:') {
      return true
    }
    return vercelOrigins().has(origin)
  } catch {
    return false
  }
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true)
        return
      }
      callback(null, false)
    },
    credentials: true,
  }),
)
app.use(express.json({ limit: '2mb' }))
app.use(cookieParser())

if (!useBlobStorage) {
  app.use('/uploads', express.static(uploadsDir))
}

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/company', async (_req, res) => {
  const row = await getCompany()
  res.json({
    name: row.name,
    project: row.project,
    city: row.city,
    description: row.description,
    proposal: row.proposal,
  })
})

app.get('/api/services', async (_req, res) => {
  const services = await listServices()
  res.json({
    services: services.map(({ id, title, description }) => ({
      id,
      title,
      description,
    })),
  })
})

app.get('/api/process', async (_req, res) => {
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

function toPublicProject(row: {
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
    description: row.description,
    coverUrl: row.cover_url || '',
    technologies: parseTechnologies(row.technologies),
    featured: Boolean(row.featured),
    sortOrder: row.sort_order,
  }
}

app.get('/api/projects', async (_req, res) => {
  const projects = await listFeaturedProjects(6)
  res.json({
    projects: projects.map(toPublicProject),
  })
})

app.get('/api/projects/:id', async (req, res) => {
  const project = await getProject(req.params.id)
  if (!project || !project.featured) {
    res.status(404).json({ error: 'Projeto não encontrado' })
    return
  }
  res.json(toPublicProject(project))
})

app.get('/api/insights', async (_req, res) => {
  const insights = await listHomeInsights(6)
  res.json({
    insights: insights.map(({ id, title, summary, tag, cover_url }) => ({
      id,
      title,
      summary,
      tag,
      coverUrl: cover_url || '',
    })),
  })
})

app.use('/api/auth', authRouter)
app.use('/api/articles', articlesRouter)
app.use('/api/admin/uploads', uploadsRouter)
app.use('/api/admin', adminRouter)

export default app
