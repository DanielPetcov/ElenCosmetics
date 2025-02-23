'use client'

import {Swiper, SwiperSlide} from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import PrevSlide from '../navigationIcons/prevSlide';
import NextSlide from '../navigationIcons/nextSlide';

import 'swiper/css';

import BannerProp from '../../types/BannerType';
import ImgSlide from './ImgSlide';

interface ImgSliderProps {
    data: BannerProp[]
}

const ImgSlider:React.FC<ImgSliderProps> = ({data}) => {
    return (
        <div className='flex flex-col gap-3 md:gap-6'>
            <div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    speed={800}
                    loop={true}
                    pagination={{
                        el: ".swiper-pagination",
                        type: "bullets",
                        clickable: true,
                        bulletClass: "swiper-bullet",
                        bulletActiveClass: "active",
                    }}
                    navigation={{
                        nextEl: '.next-slide',
                        prevEl: '.prev-slide',
                    }}
                    modules={[Pagination, Navigation]}
                >
                    {data.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <ImgSlide id={slide.id} img={slide.img} url={slide.url} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className='relative w-full flex justify-center items-center'>
                <div className='flex gap-3 md:gap-4 items-center'>
                    <div className="prev-slide cursor-pointer">
                        <PrevSlide />
                    </div>
                    <div className="swiper-pagination"></div>
                    <div className='next-slide cursor-pointer'>
                        <NextSlide />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImgSlider