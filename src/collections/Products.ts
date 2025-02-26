import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
    slug: 'products',
    fields: [
        {
            name: 'Title',
            type: 'text',
            required: true
        },
        {
            name: 'FeaturedImg',
            type: 'upload',
            relationTo: 'media',
            filterOptions: {
                mimeType: { contains: 'image'}
            },
            required: true
        },
        {
            name: 'Media',
            type: 'relationship',
            relationTo: 'media',
            hasMany: true
        },
        {
            name: 'Price',
            type: 'number',
            required: true
        },
        {
            name: 'Compare price',
            type: 'number',
        },
        {
            name: 'stock',
            label: 'Stock',
            type: 'number'
        },
        {
            name: 'tags',
            label: 'Tags',
            type: 'relationship',
            relationTo: 'Tags',
            hasMany: true
        },
        {
            name: 'relatedCollections',
            type: 'join',
            collection: 'collection',
            on: 'Products'
        }
    ],
    admin: {
        useAsTitle: 'Title'
    }
}