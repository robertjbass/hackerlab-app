import type { EnrichedAuthConfig } from 'payload-authjs'
import type { GitHubProfile } from '@auth/core/providers/github'
import GitHub from 'next-auth/providers/github'

export const authConfig: EnrichedAuthConfig = {
  providers: [
    GitHub({
      authorization: {
        params: {
          scope: 'read:user user:email',
        },
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  events: {
    signIn: async ({ payload, user, profile, account }) => {
      if (!user.id || !profile || !account || !payload) return
      if (account.provider !== 'github') return

      const githubProfile = profile as unknown as GitHubProfile

      await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          name: githubProfile.name ?? githubProfile.login,
          image: githubProfile.avatar_url,
          authProvider: 'github',
        },
      })
    },
  },
}
