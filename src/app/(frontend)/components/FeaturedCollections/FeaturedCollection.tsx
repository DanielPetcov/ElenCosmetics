import FeaturedCategoryProps from "../../types/FeaturedCollectionType";
import Link from "next/link";

const FeaturedCollection = ({id, img, url} : FeaturedCategoryProps) => {
    return (
        <Link href={url} className="rounded-md overflow-hidden group">
            <img 
                src={img.src} 
                alt="featured collection" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500" />
        </Link>
    )
}

export default FeaturedCollection;