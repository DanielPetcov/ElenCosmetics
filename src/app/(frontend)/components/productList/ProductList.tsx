'use client'
import { Swiper, SwiperSlide } from "swiper/react";

import { Product } from "@/payload-types";
import { Collection } from "@/payload-types";

interface ProductListProps {
    category: string | Collection,
    title: string
}

import 'swiper/css';
import 'swiper/css/free-mode';
import ProductCard from "./ProductCard";

const ProductList: React.FC<ProductListProps> = ({ category, title }) => {
    if (typeof category == 'string') return null
    const products: Product[] = Array.isArray(category.Products) && typeof category !== 'string' ? category.Products.filter((product): product is Product => typeof product !== 'string') : [];

    return (
        <div className="flex flex-col gap-5 lg:gap-10">
            <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 text-center uppercase">{title}</div>
            {products.length > 0 ? (
                <div>
                    <Swiper
                        slidesPerView={'auto'}
                        spaceBetween={30}
                    >
                        {products.map((product, index) => (
                            <SwiperSlide key={index} style={{ width: "auto", height: "auto" }}>
                                <ProductCard
                                    id={product.id}
                                    Title={product.Title}
                                    Price={product.Price}
                                    FeaturedImg={product.FeaturedImg}
                                    updatedAt={product.updatedAt}
                                    createdAt={product.createdAt}
                                    comparePrice={product["Compare price"]}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ) : (
                <div className="text-center text-gray-500">Momentan nu sunt produse disponibile</div>
            )
            }
        </div>
    )
}

export default ProductList;