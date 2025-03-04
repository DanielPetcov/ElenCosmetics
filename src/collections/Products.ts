import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
    slug: 'products',
    fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            index: true,
            required: true
        },
        {
            name: 'featuredImg',
            label: 'FeaturedImg',
            type: 'upload',
            relationTo: 'media',
            filterOptions: {
                mimeType: { contains: 'image'}
            },
            required: true
        },
        {
            name: 'media',
            label: 'Media',
            type: 'relationship',
            relationTo: 'media',
            hasMany: true
        },
        {
            name: 'price',
            label: 'Price',
            type: 'number',
            required: true
        },
        {
            name: 'compare_price',
            label: 'Compare price',
            type: 'number',
        },
        {
            name: 'description',
            label: 'Descriere',
            type: 'richText'
        },
        {
            name: 'ingredients',
            label: 'Ingrediente',
            type: 'text'
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
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'title'
    }
}