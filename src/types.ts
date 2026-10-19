export type UserRole = 'user' | 'admin'

export type PublicUser = {
  id: string
  name: string
  email: string
  role: UserRole
}

export type DbUser = PublicUser & {
  password_hash: string
}

export type CompanyRow = {
  id: number
  name: string
  project: string
  city: string
  description: string
  proposal: string
}

export type ServiceRow = {
  id: string
  title: string
  description: string
  sort_order: number
}

export type ProjectRow = {
  id: string
  title: string
  summary: string
  category: string
  description: string
  cover_url: string
  technologies: string
  featured: number
  sort_order: number
}

export type ProcessStepRow = {
  id: string
  number: string
  title: string
  description: string
  sort_order: number
}

export type InsightRow = {
  id: string
  title: string
  summary: string
  tag: string
  body: string
  cover_url: string
  created_at: string
  sort_order: number
}

declare global {
  namespace Express {
    interface Request {
      user?: PublicUser
    }
  }
}

export {}
