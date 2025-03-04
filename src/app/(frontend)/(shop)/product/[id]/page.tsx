type Params = Promise<{ id: string }>
import payload from "@/queries";
import Link from "next/link";
import ProductGallery from "../../../components/productPage/ProductGallery";
import AddToCartBtn from "@/app/(frontend)/components/AddToCartBtn";

import { ChevronRight } from 'lucide-react';
import QuantityButtons from "./quantityButtons";

import ProductAccordion from "./productAccordion";

import ProductList from "@/app/(frontend)/components/productList/ProductList";
const ProductPage = async ({ params }: { params: Params }) => {
    const { id } = await params;

    const ProductData = await payload.find({
        collection: 'products',
        where: { id: { equals: id } }
    })

    const product = ProductData.docs[0];

    const ProductPage = await payload.findGlobal({
        slug: 'productPage'
    })

    const layout = ProductPage.layout;

    return (
        <div className="flex flex-col gap-10 container px-10 py-6 mx-auto w-full">
            <div className="flex gap-2">
                <Link href='/' className="text-gray-500 hover:underline">HOME</Link>
                <span className="text-gray-500"><ChevronRight /></span>
                <span className="text-gray-600 uppercase">{product.title}</span>
            </div>
            <div className="grid grid-cols-2 gap-10">
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
                <div className="sticky top-0 bg-white p-10 rounded-md h-fit">
                    <div className="flex flex-col gap-3 h-fit">
                        <p className="text-slate-800 text-2xl font-semibold">{product.title}</p>
                        <div>
                            reviews
                        </div>
                        <div>
                            volum: 19
                        </div>
                        <div className="text-gray-700">
                            {
                                product.compare_price ?
                                    <div className="flex gap-2 items-baseline">
                                        <span className="line-through">{product.price}</span>
                                        <span className="text-red-600 font-semibold text-xl">{product.compare_price} MDL</span>
                                    </div>
                                    : <span className="text-lg font-semibold">
                                        {product.price} MDL
                                    </span>
                            }
                        </div>
                        <div className="grid grid-cols-[auto_1fr] gap-2">
                            <QuantityButtons id={product.id} product={product} />
                            <AddToCartBtn
                                name={product.title}
                                price={product.price}
                                productId={product.id}
                                quantity={1}
                                comparePrice={product.compare_price !== undefined ? product.compare_price : null}
                                img={typeof product.featuredImg !== 'string' ? product.featuredImg.url ? product.featuredImg.url : null : null}
                                imgHeight={typeof product.featuredImg !== 'string' ? product.featuredImg.height ? product.featuredImg.height : null : null}
                                imgWidth={typeof product.featuredImg !== 'string' ? product.featuredImg.width ? product.featuredImg.width : null : null}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {
                layout && layout.length > 0 && layout.map((block, index) => {
                    switch (block.blockType) {
                        case 'productList':
                            return <ProductList key={index} title={block.title} category={block.category} />
                        default:
                            return null
                    }
                })
            }
        </div>
    )
}
export default ProductPage;