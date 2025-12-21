import type { CollectionBeforeChangeHook } from 'payload'
import type { User } from '@/payload-types'

type UserData = Partial<User> & { password?: string }

export const setDefaultAuthProvider: CollectionBeforeChangeHook<User> = ({
  data,
  operation,
}) => {
  const userData = data as UserData
  if (operation === 'create' && userData.password && !data.authProvider) {
    data.authProvider = 'email'
  }
  return data
}
