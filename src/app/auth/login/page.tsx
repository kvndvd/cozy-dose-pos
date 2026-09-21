import { Suspense } from 'react'
import LoginForm from './login-form'

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center p-8">
          <div className="w-full max-w-md">
            <p className="text-sm text-gray-500">
              Loading...
            </p>
          </div>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
