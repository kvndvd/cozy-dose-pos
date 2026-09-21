export default function ForbiddenPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-md text-center">
        <p className="text-sm font-medium text-gray-500">
          403
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Access Denied
        </h1>

        <p className="mt-3 text-gray-600">
          You do not have permission to access this area.
        </p>

        <a
          href="/"
          className="mt-6 inline-block rounded-lg bg-black px-5 py-3 text-white"
        >
          Back to Cozy Dose
        </a>
      </div>
    </main>
  )
}