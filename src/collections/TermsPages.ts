import type { CollectionConfig } from "payload";

export const TermsPage: CollectionConfig = {
    slug: 'termsPage',
    fields: [
        {
            name: 'title',
            label: 'Titlu',
            type: 'text',
            required: true
        },
        {
            name: 'description',
            label: 'Descriere',
            type: 'richText'
        }
    ],
    admin: {
        useAsTitle: 'title'
    }
}