type Params = Promise<{ id: string }>
import payload from "@/queries";
import Link from "next/link";
import ProductGallery from "../../../components/productPage/ProductGallery";
import AddToCartBtn from "@/app/(frontend)/components/AddToCartBtn";

import { ChevronRight } from 'lucide-react';
import QuantityButtons from "./quantityButtons";

import ProductAccordion from "./productAccordion";
const ProductPage = async ({ params }: { params: Params }) => {
    const { id } = await params;

    const ProductData = await payload.find({
        collection: 'products',
        where: { id: { equals: id } }
    })

    const product = ProductData.docs[0];

    return (
        <div className="flex flex-col gap-10 container px-10 py-6 mx-auto w-full">
            <div className="flex gap-2">
                <Link href='/' className="text-gray-500 hover:underline">HOME</Link>
                <span className="text-gray-500"><ChevronRight /></span>
                <span className="text-gray-600 uppercase">{product.Title}</span>
            </div>
            <div className="grid grid-cols-2 gap-10">
                <div className="flex flex-col gap-10">
                    {/* product gallery */}
                    {typeof product.FeaturedImg !== 'string' ?
                        <ProductGallery featuredImg={product.FeaturedImg} media={product.Media} />
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
                        <p className="text-slate-800 text-2xl font-semibold">{product.Title}</p>
                        <div>
                            reviews
                        </div>
                        <div>
                            volum: 19
                        </div>
                        <div className="text-gray-700">
                            {
                                product["Compare price"] ?
                                    <div className="flex gap-2 items-baseline">
                                        <span className="line-through">{product.Price}</span>
                                        <span className="text-red-600 font-semibold text-xl">{product["Compare price"]} MDL</span>
                                    </div>
                                    : <span className="text-lg font-semibold">
                                        {product.Price} MDL
                                    </span>
                            }
                        </div>
                        <div className="grid grid-cols-[auto_1fr] gap-2">
                            <QuantityButtons id={product.id} product={product} />
                            <AddToCartBtn
                                name={product.Title}
                                price={product.Price}
                                productId={product.id}
                                quantity={1}
                                comparePrice={product["Compare price"] !== undefined ? product["Compare price"] : null}
                                img={typeof product.FeaturedImg !== 'string' ? product.FeaturedImg.url ? product.FeaturedImg.url : null : null}
                                imgHeight={typeof product.FeaturedImg !== 'string' ? product.FeaturedImg.height ? product.FeaturedImg.height : null : null}
                                imgWidth={typeof product.FeaturedImg !== 'string' ? product.FeaturedImg.width ? product.FeaturedImg.width : null : null}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductPage;