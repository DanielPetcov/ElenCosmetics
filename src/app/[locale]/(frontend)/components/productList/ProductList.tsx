import { Product } from "@/payload-types";
import { Collection } from "@/payload-types";
import { Suspense } from "react";

interface ProductListProps {
    category: string | Collection,
    title: string,
    locale: string,
}

import 'swiper/css';
import 'swiper/css/free-mode';
import ProductListSwiper from "./ProductListSwiper";

const ProductList: React.FC<ProductListProps> = ({ category, title, locale }) => {
    if (typeof category == 'string') return null
    const products: Product[] = Array.isArray(category.products) && typeof category !== 'string' ? category.products.filter((product): product is Product => typeof product !== 'string') : [];

    return (
        <div className="mx-auto max-w-[1400px] w-full px-5 md:px-4 overflow-hidden">
            <div className="flex flex-col gap-5 lg:gap-10 max-w-full">
                <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 text-center uppercase">{title}</div>
                {products.length > 0 ? (
                    <Suspense fallback={<div>is loading</div>}>
                        <ProductListSwiper
                            locale={locale}
                            products={products}
                        />
                    </Suspense>
                ) : (
                    <div className="text-center text-gray-500">Momentan nu sunt produse disponibile</div>
                )
                }
            </div>
        </div>
    )
}

export default ProductList;