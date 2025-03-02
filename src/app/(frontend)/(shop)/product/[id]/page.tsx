type Params = Promise<{ id: string }>
import payload from "@/queries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductGallery from "../../../components/productPage/ProductGallery";

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
                <span className="text-gray-500">%</span>
                <span className="text-gray-600 uppercase">{product.Title}</span>
            </div>
            <div className="grid grid-cols-2 gap-10">
                <div className="flex flex-col gap-10">
                    {/* product gallery */}
                    {typeof product.FeaturedImg !== 'string' ?
                        <ProductGallery featuredImg={product.FeaturedImg} media={product.Media} />
                        : null}
                    {/* product description */}
                    <div className="bg-white p-5 rounded-md">

                    </div>
                </div>
                <div className="sticky top-0 bg-white p-10 rounded-md h-fit">
                    <div className="flex flex-col gap-3 h-fit">
                        <p className="text-slate-800 text-2xl font-semibold">{product.Title}</p>
                        <div>
                            reviews
                        </div>
                        <div>
                            <Button>Button</Button>
                        </div>
                        <div>
                            volum: 19
                        </div>
                        <div>
                            price
                        </div>
                        <div>
                            buy buttons
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductPage;