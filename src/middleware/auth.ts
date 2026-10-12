import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { findUserById, toPublicUser } from '../db/index.js'
import type { PublicUser } from '../types.js'

const COOKIE_NAME = 'miniverso_session'

type TokenPayload = {
  sub: string
}

function getJwtSecret(): string {
  return process.env.JWT_SECRET || 'dev-only-change-me'
}

export function signSessionToken(user: PublicUser): string {
  return jwt.sign({ sub: user.id }, getJwtSecret(), { expiresIn: '7d' })
}

export function setSessionCookie(res: Response, token: string) {
  const isProd = process.env.NODE_ENV === 'production'
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  })
}

export function clearSessionCookie(res: Response) {
  const isProd = process.env.NODE_ENV === 'production'
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd,
    path: '/',
  })
}

export async function readUserFromRequest(
  req: Request,
): Promise<PublicUser | undefined> {
  const token = req.cookies?.[COOKIE_NAME] as string | undefined
  if (!token) return undefined

  try {
    const payload = jwt.verify(token, getJwtSecret()) as TokenPayload
    const user = await findUserById(payload.sub)
    if (!user) return undefined
    return toPublicUser(user)
  } catch {
    return undefined
  }
}

export async function optionalAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  req.user = await readUserFromRequest(req)
  next()
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const user = await readUserFromRequest(req)
  if (!user) {
    res.status(401).json({ error: 'Não autenticado' })
    return
  }
  req.user = user
  next()
}

export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const user = await readUserFromRequest(req)
  if (!user) {
    res.status(401).json({ error: 'Não autenticado' })
    return
  }
  if (user.role !== 'admin') {
    res.status(403).json({ error: 'Acesso restrito a administradores' })
    return
  }
  req.user = user
  next()
}

export { COOKIE_NAME }
