import { Product } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
const SearchItem = ({ product }: { product: Product }) => {
    return (
        <Link href={`/product/${product.id}`} className="w-full flex flex-col justify-between gap-5 text-gray-700 group">
            <div>
                {product.featuredImg && typeof product.featuredImg !== 'string' ?
                    <Image src={product.featuredImg.url || ''} alt={product.title} width={product.featuredImg.width || 100} height={product.featuredImg.height || 100} className="group-hover:scale-105 transition-all duration-300" />
                    : <div>no image</div>}
            </div>
            <div>
                <div className="text-lg">
                    {product.title}
                </div>
                <div>
                    {
                        product.compare_price ?
                            <div>
                                <span>{product.price}</span>
                                <span>{product.compare_price} MDL</span>
                            </div>
                            :
                            <div>{product.price} MDL</div>
                    }
                </div>
            </div>
        </Link>
    )
}

export default SearchItem;