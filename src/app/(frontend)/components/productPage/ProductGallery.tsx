'use client'

import ProductFeaturedImage from "./ProductFeaturedImage"
import ProductGallerySwiper from "./ProductGallerySwiper"

import { Product } from "@/payload-types"
import { useState, useEffect } from "react"

import { Media } from "@/payload-types"
import { Content } from "next/font/google"
type MediaType = Product['Media']

interface Props {
    featuredImg: Media
    media: MediaType
}

const ProductGallery = ({ featuredImg, media }: Props) => {
    const [globalFeaturedImg, setGlobalFeaturedImg] = useState<string>();

    const onClickImgChange = (url: string) => {
        setGlobalFeaturedImg(url);
    }

    const [gallery, setGallery] = useState<string[]>([]);
    useEffect(() => {
        if (featuredImg && typeof featuredImg === 'string') return;
        if (!featuredImg.url) return;
        setGallery([featuredImg.url]);
        setGlobalFeaturedImg(featuredImg.url);
    }, [featuredImg])

    useEffect(() => {
        if (media) {
            let urls: string[] = [];
            media.forEach((file) => {
                // @ts-ignore
                urls.push(file.url)
            })
            setGallery((content) => [...content, ...urls])
        }
    }, [media])

    return (
        <div className="flex flex-col gap-5">
            {globalFeaturedImg ?
                <ProductFeaturedImage url={globalFeaturedImg} />
                : null
            }

            {
                gallery.length > 0 ?
                    <ProductGallerySwiper media={media} onclick={onClickImgChange} />
                    : null
            }
        </div>
    )
}

export default ProductGallery