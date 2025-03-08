import Link from "next/link";
import Image from "next/image";
import { Media } from "@/payload-types";

interface ImgSlideProps {
    img: string | Media;
    url: string;
}

const ImgSlide = ({ img, url }: ImgSlideProps) => {
    if (typeof img === 'string' || img === undefined) return null;


    return (
        <Link href={url} className="w-full h-full overflow-hidden relative">
            <Image
                src={img.url || ''}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: 'auto' }}
            />
        </Link>

    )
}

export default ImgSlide;