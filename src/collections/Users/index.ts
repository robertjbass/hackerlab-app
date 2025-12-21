import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  //! users collection can not be renamed
  slug: 'users',
  auth: true,
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'image',
      type: 'text',
    },
  ],
}
