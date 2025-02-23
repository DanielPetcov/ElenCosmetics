import type { CollectionConfig } from "payload";
import { relationship } from "payload/shared";

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
            name: 'Collections',
            type: 'relationship',
            relationTo: 'collection',
            hasMany: true
        }
    ]
}