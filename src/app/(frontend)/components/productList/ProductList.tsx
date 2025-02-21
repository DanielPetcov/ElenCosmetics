'use client'

import ProductCardType from "../../types/ProductCardType";
import {Swiper, SwiperSlide} from "swiper/react";

interface ProductListProps {
    data: ProductCardType[],
    title: string
}

import 'swiper/css';
import 'swiper/css/free-mode';
import ProductCard from "./ProductCard";

const ProductList:React.FC<ProductListProps> = ({data, title}) => {
    return (
        <div className="flex flex-col gap-5 lg:gap-10">
            <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 text-center uppercase">{title}</div>
            <div>
                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={30}
                >
                    {data.map((product) => (
                        <SwiperSlide key={product.id} style={{width: "auto"}}>
                            <ProductCard 
                                id={product.id} 
                                title={product.title} 
                                price={product.price} 
                                img={product.img} 
                                url={product.url}  
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default ProductList;