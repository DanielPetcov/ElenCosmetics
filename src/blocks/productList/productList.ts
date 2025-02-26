import type { Block } from "payload";

const ProductListBlock: Block = {
    slug: 'productList',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'collection',
            required: true
        }
    ]
}

export default ProductListBlock;