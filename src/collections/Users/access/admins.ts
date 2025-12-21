import type { FieldAccess } from 'payload'
import { checkRole } from '@/collections/Users/access/check-role'

export const admins: FieldAccess = ({ req: { user } }) => {
  return checkRole(['admin'], user)
}
