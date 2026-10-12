import { Router } from 'express'
import { getInsight, listInsights } from '../db/index.js'

const router = Router()

function toArticle(row: {
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

router.get('/', (_req, res) => {
  res.json({ articles: listInsights().map(toArticle) })
})

router.get('/:id', (req, res) => {
  const row = getInsight(req.params.id)
  if (!row) {
    res.status(404).json({ error: 'Artigo não encontrado' })
    return
  }
  res.json(toArticle(row))
})

export default router
