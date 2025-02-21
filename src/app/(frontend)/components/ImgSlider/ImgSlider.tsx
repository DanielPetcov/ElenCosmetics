'use client'

import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';

import BannerProp from '../../types/BannerType';
import ImgSlide from './ImgSlide';

interface ImgSliderProps {
    data: BannerProp[]
}

const ImgSlider:React.FC<ImgSliderProps> = ({data}) => {
    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={10}
            speed={1000}
        >
            {data.map((slide) => (
                <SwiperSlide key={slide.id}>
                    <ImgSlide id={slide.id} img={slide.img} url={slide.url} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default ImgSlider