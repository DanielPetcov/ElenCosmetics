import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
    slug: 'footer',
    fields: [
        {
            name: 'our_adress',
            label: 'Adresele noastra',
            type: 'richText',
            localized: true
        },
        {
            name: 'social_links',
            label: 'Linkuri Sociale',
            type: 'array',
            fields: [
                {
                    name: 'social_link',
                    label: 'Url',
                    type: 'text',
                    required: true
                }, 
                {
                    name: 'social_icon',
                    label: 'Icon',
                    type: 'select',
                    required: true,
                    options: [
                        {label: 'Instagram', value: 'instagram'},
                        {label: 'Facebook', value: 'facebook'},
                        {label: 'TikTok', value: 'tiktok'}
                    ]
                }
            ]
        },
        {
            name: 'special_links',
            label: 'Special Links',
            type: 'array',
            fields: [
                {
                    name: 'title',
                    label: 'Title',
                    type: 'text',
                    required: true,
                    localized: true
                },
                {
                    name: 'link',
                    label: 'Link',
                    type: 'array',
                    fields: [
                        {
                            name: 'title',
                            label: 'Title',
                            type: 'text',
                            required: true,
                            localized: true
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
                            relationTo: ['collection', 'products', 'termsPage'],
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
                    ]
                }
            ]
        }
    ]
}