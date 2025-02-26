import type { GlobalConfig } from "payload";
import ProductListBlock from "@/blocks/productList/productList";
import ImgSliderBlock from "@/blocks/ImgSlider/ImgSlider";

export const HomePage: GlobalConfig = {
    slug: 'homepage',
    fields: [
        {
            name: 'Layout',
            type: 'blocks',
            blocks: [ProductListBlock, ImgSliderBlock],
            required: true
        }
    ],
}