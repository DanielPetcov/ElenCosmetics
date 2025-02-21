import ProductCardType from "../../types/ProductCardType";
import Link from "next/link";

const ProductCard = ({id, title, price, img, url} : ProductCardType) => {
    return (
        <Link href={`/product/${id}`} className="flex flex-col gap-5 md:gap-8 bg-white max-w-[200px] md:max-w-[220px] lg:max-w-[250px] rounded-md p-5 group">
            <div className="max-w-[180px] w-full mx-auto overflow-hidden p-1">
                <img src={img.src} alt={title} className="w-full object-cover object-center group-hover:scale-105 transition-all"/>
            </div>
            <div className="flex flex-col gap-[10px]">
                <span className="text-gray-700 font-semibold line-clamp-2">{title}</span>
                <span className="text-gray-500 font-bold text-sm">{price} mdl</span>
            </div>
            <button className="text-sm md:text-base font-semibold text px-4 py-2 rounded-md bg-custompink hover:bg-rose-200 focus:bg-rose-400 text-white text-center w-full transition-all duration-300">Adauga in cos</button>
        </Link>
    )
}


export default ProductCard;