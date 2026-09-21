import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const tokenHash = searchParams.get('token_hash')
  const type = searchParams.get('type')

  if (tokenHash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as 'email',
    })

    if (!error) {
      return NextResponse.redirect(
        new URL('/account', request.url)
      )
    }
  }

  return NextResponse.redirect(
    new URL('/auth/error', request.url)
  )
}