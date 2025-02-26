import type { CollectionConfig } from "payload";

export const TermsPage: CollectionConfig = {
    slug: 'termsPage',
    fields: [
        {
            name: 'Title',
            type: 'text'
        },
        {
            name: 'Description',
            type: 'richText'
        }
    ],
    admin: {
        useAsTitle: 'Title'
    }
}