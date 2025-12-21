import type { User } from '@/payload-types'

export type UserRole = 'admin' | 'user'

export function checkRole(allowedRoles: UserRole[], user?: User | null): boolean {
  if (!user) return false
  return allowedRoles.includes(user.role as UserRole)
}
