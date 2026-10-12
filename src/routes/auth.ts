import bcrypt from 'bcryptjs'
import { Router } from 'express'
import {
  createUser,
  findUserByEmail,
  toPublicUser,
} from '../db/index.js'
import {
  clearSessionCookie,
  requireAuth,
  setSessionCookie,
  signSessionToken,
} from '../middleware/auth.js'

const router = Router()

router.post('/register', async (req, res) => {
  const name = String(req.body?.name || '').trim()
  const email = String(req.body?.email || '')
    .trim()
    .toLowerCase()
  const password = String(req.body?.password || '')

  if (!name || !email || !password) {
    res.status(400).json({ error: 'Informe nome, e-mail e senha' })
    return
  }

  if (password.length < 6) {
    res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres' })
    return
  }

  if (await findUserByEmail(email)) {
    res.status(409).json({ error: 'Já existe uma conta com este e-mail' })
    return
  }

  try {
    const publicUser = await createUser({
      name,
      email,
      password,
      role: 'user',
    })
    const token = signSessionToken(publicUser)
    setSessionCookie(res, token)
    res.status(201).json({ user: publicUser })
  } catch {
    res.status(400).json({ error: 'Não foi possível criar a conta' })
  }
})

router.post('/login', async (req, res) => {
  const email = String(req.body?.email || '')
    .trim()
    .toLowerCase()
  const password = String(req.body?.password || '')

  if (!email || !password) {
    res.status(400).json({ error: 'Informe e-mail e senha' })
    return
  }

  const user = await findUserByEmail(email)
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    res.status(401).json({ error: 'E-mail ou senha inválidos' })
    return
  }

  const publicUser = toPublicUser(user)
  const token = signSessionToken(publicUser)
  setSessionCookie(res, token)
  res.json({ user: publicUser })
})

router.post('/logout', (_req, res) => {
  clearSessionCookie(res)
  res.json({ ok: true })
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user })
})

export default router
