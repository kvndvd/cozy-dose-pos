'use client'

import {
  FormEvent,
  useState,
} from 'react'

import {
  useRouter,
  useSearchParams,
} from 'next/navigation'

import { createClient } from '@/lib/supabase/client'

export default function LoginForm() {
  const router = useRouter()
  const searchParams =
    useSearchParams()

  const redirectTo =
    searchParams.get('redirectTo') ||
    '/admin'

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [error, setError] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  async function handleLogin(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    setLoading(true)
    setError('')

    const supabase =
      createClient()

    const { error } =
      await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      )

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push(redirectTo)
    router.refresh()
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <p className="text-sm font-medium tracking-wide text-gray-500">
            COZY DOSE
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Admin Login
          </h1>

          <p className="mt-2 text-gray-600">
            Sign in to manage your café.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              autoComplete="email"
              className="w-full rounded-lg border p-3"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              autoComplete="current-password"
              className="w-full rounded-lg border p-3"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black p-3 text-white disabled:opacity-50"
          >
            {loading
              ? 'Signing in...'
              : 'Sign in'}
          </button>
        </form>
      </div>
    </main>
  )
}
