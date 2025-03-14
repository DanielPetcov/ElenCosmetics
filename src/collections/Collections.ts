import type { CollectionConfig } from "payload";

export const Collection: CollectionConfig = {
    slug: 'collection',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            localized: true
        },
        {
            name: 'products',
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
        },
        {
            name: 'all_products',
            label: "Add all products on site",
            type: "checkbox"
        }
    ],
    access: {
        read: () => true
    },
    hooks: {
        beforeChange: [
            async ({ data, req }) => {
                if (data.all_products) {
                    const allProducts = await req.payload.find({
                        collection: 'products',
                        limit: 10000, // Ensure we fetch all products (adjust if needed)
                    });

                    if (allProducts && allProducts.docs.length > 0) {
                        data.products = allProducts.docs.map(product => product.id);
                    }
                }
                return data;
            }
        ]
    },
    admin: {
        useAsTitle: 'title'
    },
};
