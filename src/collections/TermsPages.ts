import type { CollectionConfig } from "payload";

export const TermsPage: CollectionConfig = {
    slug: 'termsPage',
    fields: [
        {
            name: 'title',
            label: 'Titlu',
            type: 'text',
            required: true,
            localized: true
        },
        {
            name: 'urlTitle',
            label: 'Url Titlu',
            type: 'text',
            required: true
        },
        {
            name: 'description',
            label: 'Descriere',
            type: 'richText',
            localized: true
        }
    ],
    admin: {
        useAsTitle: 'title'
    }
}