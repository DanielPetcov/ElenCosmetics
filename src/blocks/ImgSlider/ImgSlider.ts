import type {Block} from 'payload';

const ImgSliderBlock: Block = {
    slug: 'imgslider',
    fields: [
        {
            name: 'slides',
            type: 'array',
            fields: [
                {
                    name: 'img',
                    type: 'relationship',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'linkType',
                    type: 'select',
                    label: 'Link Type',
                    options: [
                        { label: 'None', value: 'none' },
                        { label: 'Internal Link', value: 'internal' },
                        { label: 'External Link', value: 'external' } 
                    ],
                    defaultValue: 'none',
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
        }
    ]
}

export default ImgSliderBlock