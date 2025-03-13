import BuyButtons from "./BuyButtons";
import { Product } from "@/payload-types";
const ProductBuyWindow = ({ product }: { product: Product }) => {
    return (
        <div className="sticky top-5 bg-white p-5 lg:p-10 rounded-md h-fit">
            <div className="flex flex-col gap-3 h-fit">
                <p className="text-slate-800 text-xl md:text-2xl font-semibold">{product.title}</p>
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
                                <span className="line-through text-sm md:text-base">{product.price}</span>
                                <span className="text-red-600 font-semibold text-base md:text-xl">{product.compare_price} MDL</span>
                            </div>
                            : <span className="text-base md:text-lg font-semibold">
                                {product.price} MDL
                            </span>
                    }
                </div>
                <BuyButtons product={product} />
            </div>
        </div>
    )
}

export default ProductBuyWindow;