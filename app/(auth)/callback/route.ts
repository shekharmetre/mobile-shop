import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const cookieStore = cookies()
  const all = (await cookieStore).getAll();
  const redirectTo = (await cookieStore).get("redirectTo")?.value;
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const forwardedHost = "https://www.bhagyawantimobile.shop/"
      const isDev = process.env.NODE_ENV === 'development'

      // Use your production domain or fallback to forwarded header
      const productionHost = 'https://www.bhagyawantimobile.shop/'
      const baseRedirect = isDev
        ? 'http://localhost:3000'
        : `https://${forwardedHost || productionHost}`

      return NextResponse.redirect(`${baseRedirect}${redirectTo}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}