export default function AuthErrorPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold">
          Authentication Error
        </h1>

        <p className="mt-3 text-gray-600">
          We couldn't complete your authentication request.
          Please try again.
        </p>
      </div>
    </main>
  )
}