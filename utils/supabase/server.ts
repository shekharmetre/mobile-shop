import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // Retrieve all cookies as an array of objects
          return Object.entries(cookieStore).map(([name, value]) => ({
            name,
            value,
            options: {} // You can set options if needed
          }))
        },
        setAll(cookiesToSet) {
          // Note: You cannot set cookies directly in a server component.
          // You would typically handle this in an API route or middleware.
          cookiesToSet.forEach(({ name, value, options }) => {
            const cookieOptions = options ? `; Path=${options.path || '/'}; HttpOnly=${options.httpOnly ? 'true' : 'false'}; Secure=${options.secure ? 'true' : 'false'}` : '';
            // Log the cookie setting for demonstration purposes
            console.log(`Set-Cookie: ${name}=${value}${cookieOptions}`);
          });
        },
      },
    }
  )
}