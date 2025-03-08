import { Product } from "@/payload-types";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

import AddToCartBtn from "../AddToCartBtn";

const ProductCard = ({ id, title, price, featuredImg, comparePrice, locale }: Product & { comparePrice: number | null | undefined, locale: string }) => {
    return (
        <div className="flex flex-col justify-between gap-3 md:gap-8 bg-white w-[170px] md:w-[220px] lg:w-[250px] rounded-md p-5 group h-full">
            <Link href={`/product/${id}`} locale={locale} className="max-w-[180px] aspect-square w-full mx-auto overflow-hidden text-gray-700 relative">
                {(featuredImg && typeof featuredImg !== 'string' && featuredImg.url) ?
                    <Image
                        src={featuredImg.url}
                        alt={title}
                        className="w-full object-contain object-center group-hover:scale-105 transition-all"
                        fill={true} />
                    : 'invalid url'}
            </Link>
            <Link href={`/product/${id}`} locale={locale} className="flex flex-col gap-1 md:gap-[10px]">
                <span className="text-gray-700 font-semibold line-clamp-2">{title}</span>
                <span className="text-gray-500 font-bold text-sm">{price} mdl</span>
            </Link>
            <div className="w-full">
                <AddToCartBtn
                    productId={id}
                    price={price}
                    img={featuredImg && typeof featuredImg !== 'string' ? featuredImg.url ? featuredImg.url : null : null}
                    imgHeight={featuredImg && typeof featuredImg !== 'string' ? featuredImg.height ? featuredImg.height : null : null}
                    imgWidth={featuredImg && typeof featuredImg !== 'string' ? featuredImg.width ? featuredImg.width : null : null}
                    quantity={1}
                    name={title}
                    comparePrice={comparePrice ? comparePrice : null}
                />
            </div>
        </div>
    )
}


export default ProductCard;