import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import './db/index.js'
import {
  getCompany,
  listInsights,
  listProcessSteps,
  listProjects,
  listServices,
} from './db/index.js'
import adminRouter from './routes/admin.js'
import articlesRouter from './routes/articles.js'
import authRouter from './routes/auth.js'
import uploadsRouter, { uploadsDir } from './routes/uploads.js'

const app = express()

function isLocalDevOrigin(origin: string | undefined): boolean {
  if (!origin) return true
  try {
    const url = new URL(origin)
    const localHost =
      url.hostname === 'localhost' || url.hostname === '127.0.0.1'
    return localHost && (url.protocol === 'http:' || url.protocol === 'https:')
  } catch {
    return false
  }
}

app.use(
  cors({
    origin(origin, callback) {
      // Vite pode subir em 5173, 5174, … quando a porta padrão está ocupada
      if (isLocalDevOrigin(origin)) {
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
app.use('/uploads', express.static(uploadsDir))

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/company', (_req, res) => {
  const row = getCompany()
  res.json({
    name: row.name,
    project: row.project,
    city: row.city,
    description: row.description,
    proposal: row.proposal,
  })
})

app.get('/api/services', (_req, res) => {
  res.json({
    services: listServices().map(({ id, title, description }) => ({
      id,
      title,
      description,
    })),
  })
})

app.get('/api/process', (_req, res) => {
  res.json({
    steps: listProcessSteps().map(({ id, number, title, description }) => ({
      id,
      number,
      title,
      description,
    })),
  })
})

app.get('/api/projects', (_req, res) => {
  res.json({
    projects: listProjects().map(({ id, title, summary, category }) => ({
      id,
      title,
      summary,
      category,
    })),
  })
})

app.get('/api/insights', (_req, res) => {
  res.json({
    insights: listInsights().map(({ id, title, summary, tag, cover_url }) => ({
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
