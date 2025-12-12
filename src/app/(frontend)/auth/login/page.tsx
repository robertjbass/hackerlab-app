'use client'

import { Github } from 'lucide-react'

export default function LoginPage() {
  function handleGitHubLogin() {
    window.location.href = '/api/auth/signin/github?callbackUrl=/'
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Sign in to DevTools
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Access your developer tools and settings
          </p>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            onClick={handleGitHubLogin}
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md bg-zinc-900 px-4 py-3 text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <Github className="h-5 w-5" />
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  )
}
