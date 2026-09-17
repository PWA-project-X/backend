import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { company } from './data/company.js'
import { services } from './data/services.js'

const app = express()
const port = Number(process.env.PORT) || 3001

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:4173',
      'http://127.0.0.1:4173',
    ],
  }),
)
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

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
