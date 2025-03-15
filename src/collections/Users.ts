import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    plural: "Utilizatori",
    singular: "Utilizator"
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role']
  },
  auth: true,

  access: {
    admin: ({ req }) => req.user?.role === 'admin',
    read: ({ req }) => {
      if (req.user?.role === 'admin') return true;
      return { id: { equals: req.user?.id } }
    },
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role == 'admin',
    create: () => true
  },

  fields: [
    {
      name: 'role',
      label: 'User Role',
      type: 'select',
      required: true,
      defaultValue: 'customer',
      options: [
        { label: 'Customer', value: 'customer' },
        { label: 'Admin', value: 'admin' }
      ]
    },
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
    },
    {
      name: 'address',
      label: 'Shipping Address',
      type: 'group',
      fields: [
        { name: 'street', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'zipCode', type: 'text' },
      ],
    },
  ],
}
