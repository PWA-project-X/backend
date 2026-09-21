import cors from 'cors'
import express from 'express'
import { company } from './data/company.js'
import { processSteps } from './data/process.js'
import { projects } from './data/projects.js'
import { services } from './data/services.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/company', (_req, res) => {
  res.json(company)
})

app.get('/api/services', (_req, res) => {
  res.json({ services })
})

app.get('/api/process', (_req, res) => {
  res.json({ steps: processSteps })
})

app.get('/api/projects', (_req, res) => {
  res.json({ projects })
})

export default app
