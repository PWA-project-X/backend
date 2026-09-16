import 'dotenv/config'
import cors from 'cors'
import express from 'express'

const app = express()
const port = Number(process.env.PORT) || 3001

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:4173', 'http://127.0.0.1:4173'] }))
app.use(express.json())

app.get('/health', (_req, res) => res.json({ ok: true }))

app.get('/api/company', (_req, res) => {
  res.json({ name: 'Miniverso', description: 'Portfólio interno para organizar ideias, serviços e projetos.' })
})

app.get('/api/services', (_req, res) => {
  res.json([
    { id: 1, title: 'Consultoria', description: 'Organização de ideias e soluções.' },
    { id: 2, title: 'Treinamentos', description: 'Conteúdos e capacitações.' },
    { id: 3, title: 'Projetos digitais', description: 'Experiências digitais simples e úteis.' },
  ])
})

app.listen(port, () => console.log(`API listening on http://localhost:${port}`))
