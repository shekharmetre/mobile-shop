// lib/db.ts
import { PrismaClient } from '@prisma/client'
import { createBrowserClient } from '@supabase/ssr'

// Prisma Client with connection pooling
const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
  log: ['error']
})

// Supabase Client
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Singleton pattern for Prisma
const globalForPrisma = globalThis as any
export const db = globalForPrisma.prisma || prisma
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db