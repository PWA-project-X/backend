import bcrypt from 'bcrypt'
import Database from 'better-sqlite3'
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
const dbPath = path.join(dataDir, 'miniverso.db')

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const db = new Database(dbPath)
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

function migrate() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('user', 'admin'))
    );

    CREATE TABLE IF NOT EXISTS company (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      name TEXT NOT NULL,
      project TEXT NOT NULL,
      city TEXT NOT NULL,
      description TEXT NOT NULL,
      proposal TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      category TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS process_steps (
      id TEXT PRIMARY KEY,
      number TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS insights (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      tag TEXT NOT NULL,
      body TEXT NOT NULL DEFAULT '',
      cover_url TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      sort_order INTEGER NOT NULL DEFAULT 0
    );
  `)

  const insightColumns = () =>
    (
      db.prepare(`PRAGMA table_info(insights)`).all() as { name: string }[]
    ).map((col) => col.name)

  if (!insightColumns().includes('body')) {
    try {
      db.exec(`ALTER TABLE insights ADD COLUMN body TEXT NOT NULL DEFAULT ''`)
    } catch {
      // column may already exist from a concurrent start
    }
  }
  if (!insightColumns().includes('cover_url')) {
    try {
      db.exec(
        `ALTER TABLE insights ADD COLUMN cover_url TEXT NOT NULL DEFAULT ''`,
      )
    } catch {
      // column may already exist from a concurrent start
    }
  }
  if (!insightColumns().includes('created_at')) {
    try {
      db.exec(
        `ALTER TABLE insights ADD COLUMN created_at TEXT NOT NULL DEFAULT ''`,
      )
    } catch {
      // column may already exist from a concurrent start
    }
  }

  db.exec(
    `UPDATE insights SET created_at = datetime('now') WHERE created_at = '' OR created_at IS NULL`,
  )

  const updateEmptyBody = db.prepare(
    `UPDATE insights SET body = ? WHERE id = ? AND (body IS NULL OR body = '')`,
  )
  for (const item of insights) {
    updateEmptyBody.run(item.body, item.id)
  }
}

function seedIfEmpty() {
  const userCount = db.prepare('SELECT COUNT(*) AS count FROM users').get() as {
    count: number
  }

  if (userCount.count > 0) {
    return
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@miniverso.local'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  const adminName = process.env.ADMIN_NAME || 'Administrador'

  const demoEmail = process.env.DEMO_USER_EMAIL || 'user@miniverso.local'
  const demoPassword = process.env.DEMO_USER_PASSWORD || 'user123'
  const demoName = process.env.DEMO_USER_NAME || 'Usuário Demo'

  const insertUser = db.prepare(
    `INSERT INTO users (id, name, email, password_hash, role)
     VALUES (@id, @name, @email, @password_hash, @role)`,
  )

  const seed = db.transaction(() => {
    insertUser.run({
      id: crypto.randomUUID(),
      name: adminName,
      email: adminEmail.toLowerCase(),
      password_hash: bcrypt.hashSync(adminPassword, 10),
      role: 'admin',
    })

    insertUser.run({
      id: crypto.randomUUID(),
      name: demoName,
      email: demoEmail.toLowerCase(),
      password_hash: bcrypt.hashSync(demoPassword, 10),
      role: 'user',
    })

    db.prepare(
      `INSERT INTO company (id, name, project, city, description, proposal)
       VALUES (1, @name, @project, @city, @description, @proposal)`,
    ).run(company)

    const insertService = db.prepare(
      `INSERT INTO services (id, title, description, sort_order)
       VALUES (@id, @title, @description, @sort_order)`,
    )
    services.forEach((item, index) => {
      insertService.run({ ...item, sort_order: index })
    })

    const insertProject = db.prepare(
      `INSERT INTO projects (id, title, summary, category, sort_order)
       VALUES (@id, @title, @summary, @category, @sort_order)`,
    )
    projects.forEach((item, index) => {
      insertProject.run({ ...item, sort_order: index })
    })

    const insertStep = db.prepare(
      `INSERT INTO process_steps (id, number, title, description, sort_order)
       VALUES (@id, @number, @title, @description, @sort_order)`,
    )
    processSteps.forEach((item, index) => {
      insertStep.run({ ...item, sort_order: index })
    })

    const insertInsight = db.prepare(
      `INSERT INTO insights (id, title, summary, tag, body, cover_url, created_at, sort_order)
       VALUES (@id, @title, @summary, @tag, @body, '', datetime('now'), @sort_order)`,
    )
    insights.forEach((item, index) => {
      insertInsight.run({ ...item, sort_order: index })
    })
  })

  seed()
  console.log(`Database seeded. Admin: ${adminEmail} | Demo user: ${demoEmail}`)
}

migrate()
seedIfEmpty()

export function toPublicUser(user: DbUser): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
}

export function findUserByEmail(email: string): DbUser | undefined {
  return db
    .prepare('SELECT * FROM users WHERE email = ?')
    .get(email.toLowerCase()) as DbUser | undefined
}

export function findUserById(id: string): DbUser | undefined {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as
    | DbUser
    | undefined
}

export function listUsers(): PublicUser[] {
  return db
    .prepare(
      `SELECT id, name, email, role FROM users ORDER BY role DESC, name ASC`,
    )
    .all() as PublicUser[]
}

export function createUser(input: {
  name: string
  email: string
  password: string
  role: UserRole
}): PublicUser {
  const id = crypto.randomUUID()
  db.prepare(
    `INSERT INTO users (id, name, email, password_hash, role)
     VALUES (?, ?, ?, ?, ?)`,
  ).run(
    id,
    input.name.trim(),
    input.email.toLowerCase().trim(),
    bcrypt.hashSync(input.password, 10),
    input.role,
  )
  return {
    id,
    name: input.name.trim(),
    email: input.email.toLowerCase().trim(),
    role: input.role,
  }
}

export function countAdmins(): number {
  const row = db
    .prepare(`SELECT COUNT(*) AS count FROM users WHERE role = 'admin'`)
    .get() as { count: number }
  return row.count
}

export function deleteUser(id: string): boolean {
  const result = db.prepare('DELETE FROM users WHERE id = ?').run(id)
  return result.changes > 0
}

export function getCompany(): CompanyRow {
  return db.prepare('SELECT * FROM company WHERE id = 1').get() as CompanyRow
}

export function updateCompany(input: {
  name: string
  project: string
  city: string
  description: string
  proposal: string
}): CompanyRow {
  db.prepare(
    `UPDATE company
     SET name = @name, project = @project, city = @city,
         description = @description, proposal = @proposal
     WHERE id = 1`,
  ).run(input)
  return getCompany()
}

export function listServices(): ServiceRow[] {
  return db
    .prepare('SELECT * FROM services ORDER BY sort_order ASC, title ASC')
    .all() as ServiceRow[]
}

export function getService(id: string): ServiceRow | undefined {
  return db.prepare('SELECT * FROM services WHERE id = ?').get(id) as
    | ServiceRow
    | undefined
}

export function createService(input: {
  id?: string
  title: string
  description: string
}): ServiceRow {
  const id = input.id?.trim() || crypto.randomUUID()
  const max = db
    .prepare('SELECT COALESCE(MAX(sort_order), -1) AS max FROM services')
    .get() as { max: number }
  db.prepare(
    `INSERT INTO services (id, title, description, sort_order)
     VALUES (?, ?, ?, ?)`,
  ).run(id, input.title.trim(), input.description.trim(), max.max + 1)
  return getService(id)!
}

export function updateService(
  id: string,
  input: { title: string; description: string },
): ServiceRow | undefined {
  const result = db
    .prepare(
      `UPDATE services SET title = ?, description = ? WHERE id = ?`,
    )
    .run(input.title.trim(), input.description.trim(), id)
  if (result.changes === 0) return undefined
  return getService(id)
}

export function deleteService(id: string): boolean {
  return db.prepare('DELETE FROM services WHERE id = ?').run(id).changes > 0
}

export function listProjects(): ProjectRow[] {
  return db
    .prepare('SELECT * FROM projects ORDER BY sort_order ASC, title ASC')
    .all() as ProjectRow[]
}

export function getProject(id: string): ProjectRow | undefined {
  return db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as
    | ProjectRow
    | undefined
}

export function createProject(input: {
  id?: string
  title: string
  summary: string
  category: string
}): ProjectRow {
  const id = input.id?.trim() || crypto.randomUUID()
  const max = db
    .prepare('SELECT COALESCE(MAX(sort_order), -1) AS max FROM projects')
    .get() as { max: number }
  db.prepare(
    `INSERT INTO projects (id, title, summary, category, sort_order)
     VALUES (?, ?, ?, ?, ?)`,
  ).run(
    id,
    input.title.trim(),
    input.summary.trim(),
    input.category.trim(),
    max.max + 1,
  )
  return getProject(id)!
}

export function updateProject(
  id: string,
  input: { title: string; summary: string; category: string },
): ProjectRow | undefined {
  const result = db
    .prepare(
      `UPDATE projects SET title = ?, summary = ?, category = ? WHERE id = ?`,
    )
    .run(input.title.trim(), input.summary.trim(), input.category.trim(), id)
  if (result.changes === 0) return undefined
  return getProject(id)
}

export function deleteProject(id: string): boolean {
  return db.prepare('DELETE FROM projects WHERE id = ?').run(id).changes > 0
}

export function listProcessSteps(): ProcessStepRow[] {
  return db
    .prepare('SELECT * FROM process_steps ORDER BY sort_order ASC, number ASC')
    .all() as ProcessStepRow[]
}

export function getProcessStep(id: string): ProcessStepRow | undefined {
  return db.prepare('SELECT * FROM process_steps WHERE id = ?').get(id) as
    | ProcessStepRow
    | undefined
}

export function createProcessStep(input: {
  id?: string
  number: string
  title: string
  description: string
}): ProcessStepRow {
  const id = input.id?.trim() || crypto.randomUUID()
  const max = db
    .prepare('SELECT COALESCE(MAX(sort_order), -1) AS max FROM process_steps')
    .get() as { max: number }
  db.prepare(
    `INSERT INTO process_steps (id, number, title, description, sort_order)
     VALUES (?, ?, ?, ?, ?)`,
  ).run(
    id,
    input.number.trim(),
    input.title.trim(),
    input.description.trim(),
    max.max + 1,
  )
  return getProcessStep(id)!
}

export function updateProcessStep(
  id: string,
  input: { number: string; title: string; description: string },
): ProcessStepRow | undefined {
  const result = db
    .prepare(
      `UPDATE process_steps
       SET number = ?, title = ?, description = ?
       WHERE id = ?`,
    )
    .run(
      input.number.trim(),
      input.title.trim(),
      input.description.trim(),
      id,
    )
  if (result.changes === 0) return undefined
  return getProcessStep(id)
}

export function deleteProcessStep(id: string): boolean {
  return (
    db.prepare('DELETE FROM process_steps WHERE id = ?').run(id).changes > 0
  )
}

export function listInsights(): InsightRow[] {
  return db
    .prepare(
      `SELECT * FROM insights
       ORDER BY datetime(created_at) DESC, title ASC`,
    )
    .all() as InsightRow[]
}

export function getInsight(id: string): InsightRow | undefined {
  return db.prepare('SELECT * FROM insights WHERE id = ?').get(id) as
    | InsightRow
    | undefined
}

export function createInsight(input: {
  id?: string
  title: string
  summary: string
  tag: string
  body: string
  coverUrl?: string
}): InsightRow {
  const id = input.id?.trim() || crypto.randomUUID()
  const max = db
    .prepare('SELECT COALESCE(MAX(sort_order), -1) AS max FROM insights')
    .get() as { max: number }
  db.prepare(
    `INSERT INTO insights (id, title, summary, tag, body, cover_url, created_at, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, datetime('now'), ?)`,
  ).run(
    id,
    input.title.trim(),
    input.summary.trim(),
    input.tag.trim(),
    input.body.trim(),
    (input.coverUrl || '').trim(),
    max.max + 1,
  )
  return getInsight(id)!
}

export function updateInsight(
  id: string,
  input: {
    title: string
    summary: string
    tag: string
    body: string
    coverUrl?: string
  },
): InsightRow | undefined {
  const result = db
    .prepare(
      `UPDATE insights SET title = ?, summary = ?, tag = ?, body = ?, cover_url = ? WHERE id = ?`,
    )
    .run(
      input.title.trim(),
      input.summary.trim(),
      input.tag.trim(),
      input.body.trim(),
      (input.coverUrl || '').trim(),
      id,
    )
  if (result.changes === 0) return undefined
  return getInsight(id)
}

export function deleteInsight(id: string): boolean {
  return db.prepare('DELETE FROM insights WHERE id = ?').run(id).changes > 0
}

export default db
