import type {Block} from 'payload';

const GeneralBigCategoriesBlock: Block = {
    slug: 'general-big-categories',
    fields: [
        {
            name: 'categories',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    type: 'relationship',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'linkType',
                    type: 'select',
                    label: 'Link Type',
                    options: [
                        { label: 'Internal Link', value: 'internal' },
                        { label: 'External Link', value: 'external' } 
                    ],
                    defaultValue: 'internal',
                    required: true
                },
                {
                    name: 'internalLink',
                    type: 'relationship',
                    relationTo: ['collection', 'products'],
                    admin: {
                        condition: (_, siblingData) => siblingData.linkType === 'internal'
                    }
                },
                {
                    name: 'externalUrl',
                    type: 'text',
                    admin: {
                        condition: (_, siblingData) => siblingData.linkType === 'external'
                    }
                }
            ],
            required: true,
            minRows: 1,
            maxRows: 2
        }
    ]
}

export default GeneralBigCategoriesBlock