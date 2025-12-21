import type { CollectionConfig } from 'payload'
import { admins } from '@/collections/Users/access/admins'
import { ensureFirstUserIsAdmin } from '@/collections/Users/hooks/field'
import { setDefaultAuthProvider } from '@/collections/Users/hooks/collection'

// TODO - add image uploading
// TODO - require email verification

export const Users: CollectionConfig = {
  //! users collection can not be renamed
  slug: 'users',
  auth: true,
  access: {
    create: () => true,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role', 'authProvider'],
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: () => true,
        create: () => true,
        update: admins,
      },
    },
    {
      name: 'authProvider',
      type: 'select',
      options: [
        { label: 'GitHub', value: 'github' },
        { label: 'Email', value: 'email' },
      ],
      admin: { readOnly: true },
    },
    {
      name: 'image',
      type: 'text',
      admin: { readOnly: true },
    },
  ],
  hooks: {
    beforeChange: [setDefaultAuthProvider],
  },
}
