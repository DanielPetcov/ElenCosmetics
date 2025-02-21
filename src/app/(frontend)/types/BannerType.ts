import { StaticImageData } from "next/image";

export default interface BannerProp {
    id: number,
    img: StaticImageData,
    url: string
}