import { Product } from "@/payload-types";
import Link from "next/link";
import Image from "next/image";

import AddToCartBtn from "../AddToCartBtn";

const ProductCard = ({ id, Title, Price, FeaturedImg, comparePrice }: Product & { comparePrice: number | null | undefined }) => {
    return (
        <div className="flex flex-col justify-between gap-5 md:gap-8 bg-white w-[200px] md:w-[220px] lg:w-[250px] rounded-md p-5 group h-full">
            <Link href={`/product/${id}`} className="max-w-[180px] aspect-square w-full mx-auto overflow-hidden text-gray-700 relative">
                {(typeof FeaturedImg !== 'string' && FeaturedImg.url) ?
                    <Image
                        src={FeaturedImg.url}
                        alt={Title}
                        className="w-full object-contain object-center group-hover:scale-105 transition-all"
                        fill={true} />
                    : 'invalid url'}
            </Link>
            <Link href={`/product/${id}`} className="flex flex-col gap-[10px]">
                <span className="text-gray-700 font-semibold line-clamp-2">{Title}</span>
                <span className="text-gray-500 font-bold text-sm">{Price} mdl</span>
            </Link>
            <div className="w-full">
                <AddToCartBtn
                    productId={id}
                    price={Price}
                    img={typeof FeaturedImg !== 'string' ? FeaturedImg.url ? FeaturedImg.url : null : null}
                    imgHeight={typeof FeaturedImg !== 'string' ? FeaturedImg.height ? FeaturedImg.height : null : null}
                    imgWidth={typeof FeaturedImg !== 'string' ? FeaturedImg.width ? FeaturedImg.width : null : null}
                    quantity={1}
                    name={Title}
                    comparePrice={comparePrice ? comparePrice : null}
                />
            </div>
        </div>
    )
}


export default ProductCard;