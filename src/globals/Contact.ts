import type { GlobalConfig } from "payload";

export const Contact: GlobalConfig = {
    slug: 'contact',
    fields: [
        {
            name: 'contacts',
            label: 'Contacte',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'title',
                    label: 'Titlu',
                    type: 'text',
                    required: true,
                    localized: true
                },
                {
                    name: 'type',
                    label: 'Tip',
                    type: 'select',
                    required: true,
                    options: [
                        {label: 'Link', value: 'link'},
                        {label: 'Richtext', value: 'richtext'}
                    ]
                },
                {
                    name: 'link',
                    label: 'Link',
                    type: 'group',
                    fields: [
                        {
                            name: 'type',
                            label: 'Tip',
                            type: 'select',
                            options: [
                                {label: 'Facebook', value: 'facebook'},
                                {label: 'Instagram', value: 'instagram'}
                            ]
                        },
                        {
                            name: 'label',
                            label: 'Label',
                            type: 'text',
                            required: true,
                            localized: true
                        },
                        {
                            name: 'url',
                            label: 'Url',
                            type: 'text',
                            required: true
                        }
                    ],
                    admin: {
                        condition: (_, siblingData) => siblingData.type === 'link'
                    }
                },
                {
                    name: 'richtext',
                    label: 'Richtext',
                    type: 'richText',
                    localized: true,
                    admin: {
                        condition: (_, siblingData) => siblingData.type === 'richtext'
                    }
                }
            ],
            minRows: 1,
        },
        
    ]
}