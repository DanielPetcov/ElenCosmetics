import type { CollectionConfig } from "payload";

export const Collection: CollectionConfig = {
    slug: 'collection',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true
        },
        {
            name: 'Products',
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
        }
    ],
    admin: {
        useAsTitle: 'title'
    }
}