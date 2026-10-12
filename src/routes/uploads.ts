import { put } from '@vercel/blob'
import { Router } from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import multer from 'multer'
import { requireAdmin } from '../middleware/auth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const uploadsDir = path.resolve(__dirname, '../../data/uploads')
export const useBlobStorage = Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim())

if (!useBlobStorage && !fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
])

function safeExt(originalName: string): string {
  const ext = path.extname(originalName).toLowerCase() || '.bin'
  return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)
    ? ext
    : '.jpg'
}

const diskStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (_req, file, cb) => {
    cb(null, `${crypto.randomUUID()}${safeExt(file.originalname)}`)
  },
})

const upload = multer({
  storage: useBlobStorage ? multer.memoryStorage() : diskStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME.has(file.mimetype)) {
      cb(new Error('Envie uma imagem JPEG, PNG, WebP ou GIF'))
      return
    }
    cb(null, true)
  },
})

const router = Router()

router.use(requireAdmin)

router.post('/', (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(400).json({ error: 'Imagem deve ter no máximo 5 MB' })
        return
      }
      res.status(400).json({ error: err.message })
      return
    }
    if (err) {
      res.status(400).json({
        error: err instanceof Error ? err.message : 'Falha no upload',
      })
      return
    }
    if (!req.file) {
      res.status(400).json({ error: 'Selecione um arquivo de imagem' })
      return
    }

    try {
      if (useBlobStorage) {
        const filename = `uploads/${crypto.randomUUID()}${safeExt(req.file.originalname)}`
        const blob = await put(filename, req.file.buffer, {
          access: 'public',
          contentType: req.file.mimetype,
          token: process.env.BLOB_READ_WRITE_TOKEN,
        })
        res.status(201).json({ url: blob.url })
        return
      }

      res.status(201).json({ url: `/uploads/${req.file.filename}` })
    } catch (uploadError) {
      res.status(500).json({
        error:
          uploadError instanceof Error
            ? uploadError.message
            : 'Falha ao enviar a imagem',
      })
    }
  })
})

export default router
