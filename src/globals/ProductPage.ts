import type { GlobalConfig } from "payload";
import ProductListBlock from "@/blocks/productList/productList";

export const ProductPageGlobal: GlobalConfig = {
    slug: 'productPage',
    fields: [
        {
            name: 'layout',
            type: 'blocks',
            blocks: [ProductListBlock],
            required: true,
        }
    ]
}