type Params = Promise<{ id: string, locale: string }>
import payload from "@/queries";
import ProductGallery from "../../../components/productPage/ProductGallery";
import ProductAccordion from "./productAccordion";
import ProductList from "../../../components/productList/ProductList";
import BuyButtons from "./BuyButtons";
import ProductBreadCrumbs from "./ProductBreadCrumbs";
import ProductBuyWindow from "./ProductBuyWindow";

const ProductPage = async ({ params }: { params: Params }) => {
    const { id, locale } = await params;
    const ProductData = await payload.find({
        collection: 'products',
        where: { id: { equals: id } },
        locale: locale as 'ro' | 'ru' || 'all'
    })

    const product = ProductData.docs[0];

    const ProductPage = await payload.findGlobal({
        slug: 'productPage',
        depth: 3,
        locale: locale as 'ro' | 'ru' || 'all'
    })

    const layout = ProductPage.layout;

    return (
        <div className="flex flex-col gap-12 lg:gap-20 container px-5 lg:px-10 py-6 mx-auto w-full">
            <div className="flex flex-col gap-5 lg:gap-10">
                <ProductBreadCrumbs locale={locale} title={product.title} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
                    <div className="flex flex-col gap-10">
                        {/* product gallery */}
                        {typeof product.featuredImg !== 'string' ?
                            <ProductGallery featuredImg={product.featuredImg} media={product.media} />
                            : null}
                        {/* product description */}
                        {product.description || product.ingredients ?
                            <div className="bg-white p-5 rounded-md text-gray-700">
                                <ProductAccordion
                                    description={product.description}
                                    ingredients={product.ingredients}
                                />
                            </div> : null
                        }
                    </div>
                    <ProductBuyWindow product={product} />
                </div>
            </div>
            {
                layout && layout.length > 0 && layout.map((block, index) => {
                    switch (block.blockType) {
                        case 'productList':
                            return <ProductList locale={locale} key={index} title={block.title} category={block.category} />
                        default:
                            return null
                    }
                })
            }
        </div>
    )
}
export default ProductPage;