import type { CollectionConfig } from "payload";

export const Collection: CollectionConfig = {
    slug: 'collection',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            localized: true
        },
        {
            name: 'products',
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
        }
    ],
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'title'
    },
}