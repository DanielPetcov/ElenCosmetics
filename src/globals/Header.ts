import type { GlobalConfig } from "payload";

export const Header: GlobalConfig = {
    slug: 'header',
    fields: [
        {
            name: 'upperHeader',
            label: 'Upper Header',
            type: 'text',
            localized: true
        },
        {
            name: 'logo',
            label: 'Header Logo',
            type: 'relationship',
            relationTo: 'media',
            required: true
        },
        {
            name: 'menuItems',
            label: 'Menu Items',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'label',
                    label: 'Label',
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
                    required: true,
                    admin: {
                        condition: (_, siblingData) => siblingData.linkType === 'internal'
                    }
                },
                {
                    name: 'externalUrl',
                    type: 'text',
                    required: true,
                    admin: {
                        condition: (_, siblingData) => siblingData.linkType === 'external'
                    }
                },
                {
                    name: 'subItems',
                    label: 'Sub Items',
                    type: 'array',
                    fields: [
                        {
                            name: 'label',
                            label: 'Label',
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
                            required: true,
                            admin: {
                                condition: (_, siblingData) => siblingData.linkType === 'internal'
                            }
                        },
                        {
                            name: 'externalUrl',
                            type: 'text',
                            required: true,
                            admin: {
                                condition: (_, siblingData) => siblingData.linkType === 'external'
                            }
                        },
                        {
                            name: 'subSubItems',
                            label: 'Sub Sub Items',
                            type: 'array',
                            fields: [
                                {
                                    name: 'label',
                                    label: 'Label',
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
                                    required: true,
                                    admin: {
                                        condition: (_, siblingData) => siblingData.linkType === 'internal'
                                    }
                                },
                                {
                                    name: 'externalUrl',
                                    type: 'text',
                                    required: true,
                                    admin: {
                                        condition: (_, siblingData) => siblingData.linkType === 'external'
                                    }
                                }
                            ]
                        }
                    ],
                }
            ]
        }
    ]
};
