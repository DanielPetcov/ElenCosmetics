import type { GlobalConfig } from "payload";

export const Header: GlobalConfig = {
    slug: 'header',
    fields: [
        {
            name: 'upperHeader',
            label: 'Upper Header',
            type: 'text',
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
            fields: [
                {
                    name: 'label',
                    label: 'Label',
                    type: 'text',
                    required: true
                },
                {
                    name: 'link',
                    label: 'Link',
                    type: 'text',
                    required: true
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
                            required: true
                        },
                        {
                            name: 'link',
                            label: 'Link',
                            type: 'text',
                            required: true
                        }
                    ]
                }
            ]
        }
    ]
}