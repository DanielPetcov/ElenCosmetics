'use client'
import ProductCard from "./ProductCard";
import 'swiper/css';
import 'swiper/css/free-mode';
import { Swiper, SwiperSlide } from "swiper/react";
import { Product } from "@/payload-types";


const ProductListSwiper = ({ products, locale }: { products: Product[], locale: string }) => {
    return (
        <div>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={30}
            >
                {products.map((product, index) => (
                    <SwiperSlide key={index} style={{ width: "auto", height: "auto" }}>
                        <ProductCard
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            featuredImg={product.featuredImg}
                            updatedAt={product.updatedAt}
                            createdAt={product.createdAt}
                            comparePrice={product.compare_price}
                            locale={locale}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default ProductListSwiper;