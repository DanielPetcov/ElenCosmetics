import type { CollectionConfig } from "payload";

export const Tags:CollectionConfig = {
    slug: 'Tags',
    fields: [
        {
            name: 'assignProducts',
            type: 'relationship',
            label: 'Assigned Products',
            relationTo: 'products',
            hasMany: true
        }
    ]
}