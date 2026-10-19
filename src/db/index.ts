import { createClient, type Client, type InValue } from '@libsql/client'
import bcrypt from 'bcryptjs'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { company } from '../data/company.js'
import { insights } from '../data/insights.js'
import { processSteps } from '../data/process.js'
import { projects } from '../data/projects.js'
import { services } from '../data/services.js'
import type {
  CompanyRow,
  DbUser,
  InsightRow,
  ProcessStepRow,
  ProjectRow,
  PublicUser,
  ServiceRow,
  UserRole,
} from '../types.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.resolve(__dirname, '../../data')
const localDbPath = path.join(dataDir, 'miniverso.db')

function createDbClient(): Client {
  const remoteUrl = process.env.TURSO_DATABASE_URL?.trim()
  const authToken = process.env.TURSO_AUTH_TOKEN?.trim()

  if (remoteUrl) {
    return createClient({
      url: remoteUrl,
      authToken,
    })
  }

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  return createClient({
    url: `file:${localDbPath}`,
  })
}

const db = createDbClient()

function asNumber(value: unknown): number {
  if (typeof value === 'bigint') return Number(value)
  if (typeof value === 'number') return value
  return Number(value ?? 0)
}

function firstRow<T>(rows: unknown[]): T | undefined {
  return rows[0] as T | undefined
}

async function execute(sql: string, args: InValue[] = []) {
  return db.execute({ sql, args })
}

async function migrate() {
  await execute(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('user', 'admin'))
    )
  `)

  await execute(`
    CREATE TABLE IF NOT EXISTS company (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      name TEXT NOT NULL,
      project TEXT NOT NULL,
      city TEXT NOT NULL,
      description TEXT NOT NULL,
      proposal TEXT NOT NULL
    )
  `)

  await execute(`
    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    )
  `)

  await execute(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      cover_url TEXT NOT NULL DEFAULT '',
      technologies TEXT NOT NULL DEFAULT '[]',
      featured INTEGER NOT NULL DEFAULT 0,
      sort_order INTEGER NOT NULL DEFAULT 0
    )
  `)

  await execute(`
    CREATE TABLE IF NOT EXISTS process_steps (
      id TEXT PRIMARY KEY,
      number TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    )
  `)

  await execute(`
    CREATE TABLE IF NOT EXISTS insights (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      tag TEXT NOT NULL,
      body TEXT NOT NULL DEFAULT '',
      cover_url TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      sort_order INTEGER NOT NULL DEFAULT 0
    )
  `)

  const insightsInfo = await execute(`PRAGMA table_info(insights)`)
  const insightColumns = insightsInfo.rows.map((col) => String(col.name))

  if (!insightColumns.includes('body')) {
    try {
      await execute(
        `ALTER TABLE insights ADD COLUMN body TEXT NOT NULL DEFAULT ''`,
      )
    } catch {
      // column may already exist
    }
  }
  if (!insightColumns.includes('cover_url')) {
    try {
      await execute(
        `ALTER TABLE insights ADD COLUMN cover_url TEXT NOT NULL DEFAULT ''`,
      )
    } catch {
      // column may already exist
    }
  }
  if (!insightColumns.includes('created_at')) {
    try {
      await execute(
        `ALTER TABLE insights ADD COLUMN created_at TEXT NOT NULL DEFAULT ''`,
      )
    } catch {
      // column may already exist
    }
  }

  await execute(
    `UPDATE insights SET created_at = datetime('now') WHERE created_at = '' OR created_at IS NULL`,
  )

  for (const item of insights) {
    await execute(
      `UPDATE insights SET body = ? WHERE id = ? AND (body IS NULL OR body = '')`,
      [item.body, item.id],
    )
  }

  const projectsInfo = await execute(`PRAGMA table_info(projects)`)
  const projectColumns = projectsInfo.rows.map((col) => String(col.name))

  if (!projectColumns.includes('description')) {
    try {
      await execute(
        `ALTER TABLE projects ADD COLUMN description TEXT NOT NULL DEFAULT ''`,
      )
    } catch {
      // column may already exist
    }
  }
  if (!projectColumns.includes('cover_url')) {
    try {
      await execute(
        `ALTER TABLE projects ADD COLUMN cover_url TEXT NOT NULL DEFAULT ''`,
      )
    } catch {
      // column may already exist
    }
  }
  if (!projectColumns.includes('technologies')) {
    try {
      await execute(
        `ALTER TABLE projects ADD COLUMN technologies TEXT NOT NULL DEFAULT '[]'`,
      )
    } catch {
      // column may already exist
    }
  }
  if (!projectColumns.includes('featured')) {
    try {
      await execute(
        `ALTER TABLE projects ADD COLUMN featured INTEGER NOT NULL DEFAULT 0`,
      )
    } catch {
      // column may already exist
    }
  }

  for (const item of projects) {
    await execute(
      `UPDATE projects
       SET description = ?,
           technologies = ?,
           featured = ?
       WHERE id = ?
         AND (description IS NULL OR description = '')`,
      [
        item.description,
        JSON.stringify(item.technologies),
        item.featured ? 1 : 0,
        item.id,
      ],
    )
  }

  const minSortResult = await execute(
    `SELECT MIN(sort_order) AS min FROM projects`,
  )
  const minSort = minSortResult.rows[0]?.min
  if (minSort !== null && minSort !== undefined && asNumber(minSort) === 0) {
    await execute(`UPDATE projects SET sort_order = sort_order + 1`)
  }
}

async function seedIfEmpty() {
  const countResult = await execute(`SELECT COUNT(*) AS count FROM users`)
  const userCount = asNumber(countResult.rows[0]?.count)

  if (userCount > 0) {
    return
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@miniverso.local'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  const adminName = process.env.ADMIN_NAME || 'Administrador'

  const demoEmail = process.env.DEMO_USER_EMAIL || 'user@miniverso.local'
  const demoPassword = process.env.DEMO_USER_PASSWORD || 'user123'
  const demoName = process.env.DEMO_USER_NAME || 'Usuário Demo'

  const statements = [
    {
      sql: `INSERT INTO users (id, name, email, password_hash, role)
            VALUES (?, ?, ?, ?, ?)`,
      args: [
        crypto.randomUUID(),
        adminName,
        adminEmail.toLowerCase(),
        bcrypt.hashSync(adminPassword, 10),
        'admin',
      ] as InValue[],
    },
    {
      sql: `INSERT INTO users (id, name, email, password_hash, role)
            VALUES (?, ?, ?, ?, ?)`,
      args: [
        crypto.randomUUID(),
        demoName,
        demoEmail.toLowerCase(),
        bcrypt.hashSync(demoPassword, 10),
        'user',
      ] as InValue[],
    },
    {
      sql: `INSERT INTO company (id, name, project, city, description, proposal)
            VALUES (1, ?, ?, ?, ?, ?)`,
      args: [
        company.name,
        company.project,
        company.city,
        company.description,
        company.proposal,
      ] as InValue[],
    },
    ...services.map((item, index) => ({
      sql: `INSERT INTO services (id, title, description, sort_order)
            VALUES (?, ?, ?, ?)`,
      args: [item.id, item.title, item.description, index] as InValue[],
    })),
    ...projects.map((item, index) => ({
      sql: `INSERT INTO projects (
              id, title, summary, category, description, cover_url,
              technologies, featured, sort_order
            ) VALUES (?, ?, ?, ?, ?, '', ?, ?, ?)`,
      args: [
        item.id,
        item.title,
        item.summary,
        item.category,
        item.description,
        JSON.stringify(item.technologies),
        item.featured ? 1 : 0,
        index + 1,
      ] as InValue[],
    })),
    ...processSteps.map((item, index) => ({
      sql: `INSERT INTO process_steps (id, number, title, description, sort_order)
            VALUES (?, ?, ?, ?, ?)`,
      args: [
        item.id,
        item.number,
        item.title,
        item.description,
        index,
      ] as InValue[],
    })),
    ...insights.map((item, index) => ({
      sql: `INSERT INTO insights (id, title, summary, tag, body, cover_url, created_at, sort_order)
            VALUES (?, ?, ?, ?, ?, '', datetime('now'), ?)`,
      args: [
        item.id,
        item.title,
        item.summary,
        item.tag,
        item.body,
        index,
      ] as InValue[],
    })),
  ]

  await db.batch(statements, 'write')
  console.log(`Database seeded. Admin: ${adminEmail} | Demo user: ${demoEmail}`)
}

function assertProductionSecrets() {
  const isProd =
    process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL)
  if (isProd && !process.env.JWT_SECRET?.trim()) {
    throw new Error(
      'JWT_SECRET is required in production. Set it in the Vercel project env.',
    )
  }
}

let readyPromise: Promise<void> | null = null

export async function ensureDbReady(): Promise<void> {
  if (!readyPromise) {
    readyPromise = (async () => {
      assertProductionSecrets()
      await migrate()
      await seedIfEmpty()
    })()
  }
  await readyPromise
}

export function toPublicUser(user: DbUser): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
}

export async function findUserByEmail(
  email: string,
): Promise<DbUser | undefined> {
  await ensureDbReady()
  const result = await execute(`SELECT * FROM users WHERE email = ?`, [
    email.toLowerCase(),
  ])
  return firstRow<DbUser>(result.rows)
}

export async function findUserById(id: string): Promise<DbUser | undefined> {
  await ensureDbReady()
  const result = await execute(`SELECT * FROM users WHERE id = ?`, [id])
  return firstRow<DbUser>(result.rows)
}

export async function listUsers(): Promise<PublicUser[]> {
  await ensureDbReady()
  const result = await execute(
    `SELECT id, name, email, role FROM users ORDER BY role DESC, name ASC`,
  )
  return result.rows as unknown as PublicUser[]
}

export async function createUser(input: {
  name: string
  email: string
  password: string
  role: UserRole
}): Promise<PublicUser> {
  await ensureDbReady()
  const id = crypto.randomUUID()
  const name = input.name.trim()
  const email = input.email.toLowerCase().trim()
  await execute(
    `INSERT INTO users (id, name, email, password_hash, role)
     VALUES (?, ?, ?, ?, ?)`,
    [id, name, email, bcrypt.hashSync(input.password, 10), input.role],
  )
  return { id, name, email, role: input.role }
}

export async function countAdmins(): Promise<number> {
  await ensureDbReady()
  const result = await execute(
    `SELECT COUNT(*) AS count FROM users WHERE role = 'admin'`,
  )
  return asNumber(result.rows[0]?.count)
}

export async function deleteUser(id: string): Promise<boolean> {
  await ensureDbReady()
  const result = await execute(`DELETE FROM users WHERE id = ?`, [id])
  return result.rowsAffected > 0
}

export async function getCompany(): Promise<CompanyRow> {
  await ensureDbReady()
  const result = await execute(`SELECT * FROM company WHERE id = 1`)
  const row = firstRow<CompanyRow>(result.rows)
  if (!row) {
    throw new Error('Company row missing — database may not be seeded')
  }
  return row
}

export async function updateCompany(input: {
  name: string
  project: string
  city: string
  description: string
  proposal: string
}): Promise<CompanyRow> {
  await ensureDbReady()
  await execute(
    `UPDATE company
     SET name = ?, project = ?, city = ?, description = ?, proposal = ?
     WHERE id = 1`,
    [
      input.name,
      input.project,
      input.city,
      input.description,
      input.proposal,
    ],
  )
  return getCompany()
}

export async function listServices(): Promise<ServiceRow[]> {
  await ensureDbReady()
  const result = await execute(
    `SELECT * FROM services ORDER BY sort_order ASC, title ASC`,
  )
  return result.rows as unknown as ServiceRow[]
}

export async function getService(id: string): Promise<ServiceRow | undefined> {
  await ensureDbReady()
  const result = await execute(`SELECT * FROM services WHERE id = ?`, [id])
  return firstRow<ServiceRow>(result.rows)
}

export async function createService(input: {
  id?: string
  title: string
  description: string
}): Promise<ServiceRow> {
  await ensureDbReady()
  const id = input.id?.trim() || crypto.randomUUID()
  const maxResult = await execute(
    `SELECT COALESCE(MAX(sort_order), -1) AS max FROM services`,
  )
  const max = asNumber(maxResult.rows[0]?.max)
  await execute(
    `INSERT INTO services (id, title, description, sort_order)
     VALUES (?, ?, ?, ?)`,
    [id, input.title.trim(), input.description.trim(), max + 1],
  )
  return (await getService(id))!
}

export async function updateService(
  id: string,
  input: { title: string; description: string },
): Promise<ServiceRow | undefined> {
  await ensureDbReady()
  const result = await execute(
    `UPDATE services SET title = ?, description = ? WHERE id = ?`,
    [input.title.trim(), input.description.trim(), id],
  )
  if (result.rowsAffected === 0) return undefined
  return getService(id)
}

export async function deleteService(id: string): Promise<boolean> {
  await ensureDbReady()
  const result = await execute(`DELETE FROM services WHERE id = ?`, [id])
  return result.rowsAffected > 0
}

export function parseTechnologies(raw: string | null | undefined): string[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed
      .map((item) => String(item).trim())
      .filter(Boolean)
  } catch {
    return raw
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }
}

export function serializeTechnologies(items: string[]): string {
  return JSON.stringify(
    items.map((item) => item.trim()).filter(Boolean),
  )
}

export async function listProjects(): Promise<ProjectRow[]> {
  await ensureDbReady()
  const result = await execute(
    `SELECT * FROM projects ORDER BY sort_order ASC, title ASC`,
  )
  return result.rows as unknown as ProjectRow[]
}

export async function listFeaturedProjects(
  limit = 6,
): Promise<ProjectRow[]> {
  await ensureDbReady()
  const result = await execute(
    `SELECT * FROM projects
     WHERE featured = 1
     ORDER BY sort_order ASC, title ASC
     LIMIT ?`,
    [limit],
  )
  return result.rows as unknown as ProjectRow[]
}

export async function countFeaturedProjects(): Promise<number> {
  await ensureDbReady()
  const result = await execute(
    `SELECT COUNT(*) AS count FROM projects WHERE featured = 1`,
  )
  return asNumber(result.rows[0]?.count)
}

export async function getProject(id: string): Promise<ProjectRow | undefined> {
  await ensureDbReady()
  const result = await execute(`SELECT * FROM projects WHERE id = ?`, [id])
  return firstRow<ProjectRow>(result.rows)
}

export async function createProject(input: {
  id?: string
  title: string
  summary: string
  category: string
  description: string
  coverUrl?: string
  technologies?: string[]
  featured?: boolean
  sortOrder?: number
}): Promise<ProjectRow> {
  await ensureDbReady()
  const id = input.id?.trim() || crypto.randomUUID()
  const maxResult = await execute(
    `SELECT COALESCE(MAX(sort_order), 0) AS max FROM projects`,
  )
  const max = asNumber(maxResult.rows[0]?.max)
  const sortOrder =
    typeof input.sortOrder === 'number' && Number.isFinite(input.sortOrder)
      ? Math.max(1, Math.floor(input.sortOrder))
      : Math.max(1, max + 1)
  await execute(
    `INSERT INTO projects (
       id, title, summary, category, description, cover_url,
       technologies, featured, sort_order
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      input.title.trim(),
      input.summary.trim(),
      input.category.trim(),
      input.description.trim(),
      (input.coverUrl || '').trim(),
      serializeTechnologies(input.technologies || []),
      input.featured ? 1 : 0,
      sortOrder,
    ],
  )
  return (await getProject(id))!
}

export async function updateProject(
  id: string,
  input: {
    title: string
    summary: string
    category: string
    description: string
    coverUrl?: string
    technologies?: string[]
    featured?: boolean
    sortOrder?: number
  },
): Promise<ProjectRow | undefined> {
  await ensureDbReady()
  const current = await getProject(id)
  if (!current) return undefined

  const sortOrder =
    typeof input.sortOrder === 'number' && Number.isFinite(input.sortOrder)
      ? Math.max(1, Math.floor(input.sortOrder))
      : Math.max(1, current.sort_order)

  const result = await execute(
    `UPDATE projects
     SET title = ?, summary = ?, category = ?, description = ?,
         cover_url = ?, technologies = ?, featured = ?, sort_order = ?
     WHERE id = ?`,
    [
      input.title.trim(),
      input.summary.trim(),
      input.category.trim(),
      input.description.trim(),
      (input.coverUrl || '').trim(),
      serializeTechnologies(input.technologies || []),
      input.featured ? 1 : 0,
      sortOrder,
      id,
    ],
  )
  if (result.rowsAffected === 0) return undefined
  return getProject(id)
}

export async function deleteProject(id: string): Promise<boolean> {
  await ensureDbReady()
  const result = await execute(`DELETE FROM projects WHERE id = ?`, [id])
  return result.rowsAffected > 0
}

export async function listProcessSteps(): Promise<ProcessStepRow[]> {
  await ensureDbReady()
  const result = await execute(
    `SELECT * FROM process_steps ORDER BY sort_order ASC, number ASC`,
  )
  return result.rows as unknown as ProcessStepRow[]
}

export async function getProcessStep(
  id: string,
): Promise<ProcessStepRow | undefined> {
  await ensureDbReady()
  const result = await execute(`SELECT * FROM process_steps WHERE id = ?`, [
    id,
  ])
  return firstRow<ProcessStepRow>(result.rows)
}

export async function createProcessStep(input: {
  id?: string
  number: string
  title: string
  description: string
}): Promise<ProcessStepRow> {
  await ensureDbReady()
  const id = input.id?.trim() || crypto.randomUUID()
  const maxResult = await execute(
    `SELECT COALESCE(MAX(sort_order), -1) AS max FROM process_steps`,
  )
  const max = asNumber(maxResult.rows[0]?.max)
  await execute(
    `INSERT INTO process_steps (id, number, title, description, sort_order)
     VALUES (?, ?, ?, ?, ?)`,
    [
      id,
      input.number.trim(),
      input.title.trim(),
      input.description.trim(),
      max + 1,
    ],
  )
  return (await getProcessStep(id))!
}

export async function updateProcessStep(
  id: string,
  input: { number: string; title: string; description: string },
): Promise<ProcessStepRow | undefined> {
  await ensureDbReady()
  const result = await execute(
    `UPDATE process_steps
     SET number = ?, title = ?, description = ?
     WHERE id = ?`,
    [
      input.number.trim(),
      input.title.trim(),
      input.description.trim(),
      id,
    ],
  )
  if (result.rowsAffected === 0) return undefined
  return getProcessStep(id)
}

export async function deleteProcessStep(id: string): Promise<boolean> {
  await ensureDbReady()
  const result = await execute(`DELETE FROM process_steps WHERE id = ?`, [id])
  return result.rowsAffected > 0
}

export async function listInsights(): Promise<InsightRow[]> {
  await ensureDbReady()
  const result = await execute(
    `SELECT * FROM insights
     ORDER BY datetime(created_at) DESC, title ASC`,
  )
  return result.rows as unknown as InsightRow[]
}

export async function getInsight(id: string): Promise<InsightRow | undefined> {
  await ensureDbReady()
  const result = await execute(`SELECT * FROM insights WHERE id = ?`, [id])
  return firstRow<InsightRow>(result.rows)
}

export async function createInsight(input: {
  id?: string
  title: string
  summary: string
  tag: string
  body: string
  coverUrl?: string
}): Promise<InsightRow> {
  await ensureDbReady()
  const id = input.id?.trim() || crypto.randomUUID()
  const maxResult = await execute(
    `SELECT COALESCE(MAX(sort_order), -1) AS max FROM insights`,
  )
  const max = asNumber(maxResult.rows[0]?.max)
  await execute(
    `INSERT INTO insights (id, title, summary, tag, body, cover_url, created_at, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, datetime('now'), ?)`,
    [
      id,
      input.title.trim(),
      input.summary.trim(),
      input.tag.trim(),
      input.body.trim(),
      (input.coverUrl || '').trim(),
      max + 1,
    ],
  )
  return (await getInsight(id))!
}

export async function updateInsight(
  id: string,
  input: {
    title: string
    summary: string
    tag: string
    body: string
    coverUrl?: string
  },
): Promise<InsightRow | undefined> {
  await ensureDbReady()
  const result = await execute(
    `UPDATE insights SET title = ?, summary = ?, tag = ?, body = ?, cover_url = ? WHERE id = ?`,
    [
      input.title.trim(),
      input.summary.trim(),
      input.tag.trim(),
      input.body.trim(),
      (input.coverUrl || '').trim(),
      id,
    ],
  )
  if (result.rowsAffected === 0) return undefined
  return getInsight(id)
}

export async function deleteInsight(id: string): Promise<boolean> {
  await ensureDbReady()
  const result = await execute(`DELETE FROM insights WHERE id = ?`, [id])
  return result.rowsAffected > 0
}

export default db
