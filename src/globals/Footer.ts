import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
    slug: 'footer',
    fields: [
        {
            name: 'Special Links',
            type: 'array',
            fields: [
                {
                    name: 'Title',
                    type: 'text'
                },
                {
                    name: 'Link',
                    type: 'array',
                    fields: [
                        {
                            name: 'Title',
                            type: 'text'
                        },
                        {
                            name: 'Page',
                            type: 'relationship',
                            relationTo: 'termsPage'
                        }
                    ]
                }
            ]
        }
    ]
}