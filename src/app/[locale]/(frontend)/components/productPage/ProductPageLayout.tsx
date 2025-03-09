import payload from "@/queries";
import ProductList from "../productList/ProductList";

const ProductPageLayout = async ({ locale }: { locale: string }) => {
    const ProductPage = await payload.findGlobal({
        slug: 'productPage',
        depth: 3,
        locale: locale as 'ro' | 'ru' || 'all'
    })

    const layout = ProductPage.layout;
    if (layout && layout.length > 0) {
        layout.map((block, index) => {
            switch (block.blockType) {
                case 'productList':
                    return <ProductList locale={locale} key={index} title={block.title} category={block.category} />
                default:
                    return null
            }
        })
    };
    return null;
}

export default ProductPageLayout