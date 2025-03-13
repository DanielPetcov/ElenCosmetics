import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
    slug: 'products',
    fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            index: true,
            required: true,
            localized: true
        },
        {
            name: 'productCode',
            label: 'CodProdus',
            type: "text"
        },
        {
            name: 'featuredImg',
            label: 'FeaturedImg',
            type: 'upload',
            relationTo: 'media',
            filterOptions: {
                mimeType: { contains: 'image' }
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
            name: 'brandRelation',
            label: 'Brand',
            type: 'relationship',
            relationTo: 'brand',
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
            type: 'richText',
            localized: true
        },
        {
            name: 'ingredients',
            label: 'Ingrediente',
            type: 'text',
            localized: true
        },
        {
            name: 'stock',
            label: 'Stock',
            type: 'number',
        },
        {
            name: 'volumeRelation',
            label: 'Volum',
            type: 'relationship',
            relationTo: 'volume',
        },
        {
            name: 'relatedCollections',
            type: 'join',
            collection: 'collection',
            on: 'products'
        }
    ],
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'title'
    }
}