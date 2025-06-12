import { db } from "./db"

// lib/db/safeQuery.ts
interface SafeQueryOptions {
  retries?: number
  timeout?: number
}

export async function safeQuery<T>(
  queryFn: () => Promise<T>,
  options: SafeQueryOptions = {}
): Promise<T> {
  const { retries = 3, timeout = 5000 } = options
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Health check first
      await Promise.race([
        db.$queryRaw`SELECT 1`,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Health check timeout')), 1000)
        )
      ])

      // Execute the query
      return await queryFn()
      
    } catch (error) {
      lastError = error as Error
      
      // Exponential backoff
      const delay = Math.min(
        timeout, 
        Math.pow(2, attempt) * 100 + Math.random() * 300
      )
      
      console.warn(`Query attempt ${attempt} failed, retrying in ${delay}ms...`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw new Error(
    `Database operation failed after ${retries} attempts: ${lastError?.message}`
  )
}