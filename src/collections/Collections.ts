import type { CollectionConfig } from "payload";

export const Collection: CollectionConfig = {
    slug: 'collection',
    fields: [
        {
            name: 'Title',
            type: 'text',
            required: true
        }
    ],
    admin: {
        useAsTitle: 'Title'
    }
}