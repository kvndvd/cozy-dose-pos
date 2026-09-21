'use client'

import { FormEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoading(true)
    setMessage('')

    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
        },
      },
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage(
        'Registration successful. Please check your email to confirm your account.'
      )
    }

    setLoading(false)
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md space-y-4"
      >
        <div>
          <h1 className="text-3xl font-bold">
            Create Account
          </h1>

          <p className="mt-2 text-gray-600">
            Create your Cozy Dose customer account.
          </p>
        </div>

        <input
          type="text"
          placeholder="Full name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          required
          className="w-full rounded-lg border p-3"
        />

        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          required
          className="w-full rounded-lg border p-3"
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="w-full rounded-lg border p-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={6}
          className="w-full rounded-lg border p-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-black p-3 text-white disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        {message && (
          <p className="rounded-lg border p-3 text-sm">
            {message}
          </p>
        )}
      </form>
    </main>
  )
}