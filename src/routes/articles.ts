import { Router } from 'express'
import { getInsight, listPublicInsights } from '../db/index.js'

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

router.get('/', async (_req, res) => {
  const articles = await listPublicInsights()
  res.json({ articles: articles.map(toArticle) })
})

router.get('/:id', async (req, res) => {
  const row = await getInsight(req.params.id)
  if (!row || row.archived) {
    res.status(404).json({ error: 'Artigo não encontrado' })
    return
  }
  res.json(toArticle(row))
})

export default router
