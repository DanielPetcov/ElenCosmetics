import type { CollectionConfig } from "payload";

export const Volume: CollectionConfig = {
    slug: 'volume',
    fields: [
        {
            name: 'slug',
            label: 'Titlu',
            type: 'text',
            required: true
        },
        {
            name: 'assignProducts',
            type: 'relationship',
            label: 'Produse atribuite',
            relationTo: 'products',
            hasMany: true
        }
    ],
    admin: {
        useAsTitle: 'slug'
    },
    access: {
        read: () => true
    }
}