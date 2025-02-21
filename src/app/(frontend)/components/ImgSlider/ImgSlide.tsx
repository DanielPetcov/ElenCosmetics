import BannerProp from "../../types/BannerType";
import Link from "next/link";

const ImgSlide = ({id, img, url} : BannerProp) => {
    return (
        <Link href={url} className="w-full h-auto overflow-hidden">
            <img src={img.src} className="w-full" />
        </Link>
    )
}

export default ImgSlide;