'use client'

import { Github } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function LoginPage() {
  function handleGitHubLogin() {
    window.location.href = '/api/auth/signin/github?callbackUrl=/'
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Sign in to DevTools</CardTitle>
          <CardDescription>
            Access your developer tools and settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            onClick={handleGitHubLogin}
            className="w-full"
            size="lg"
          >
            <Github className="mr-2 h-5 w-5" />
            Continue with GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
