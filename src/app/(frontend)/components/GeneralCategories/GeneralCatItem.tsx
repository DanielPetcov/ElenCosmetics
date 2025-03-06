import { Homepage } from '@/payload-types';

type CategoriesBlock = Extract<Homepage['Layout'][number], { blockType: 'general-big-categories' }>
type Categories = CategoriesBlock['categories'];
type Category = Categories[number];

interface Props {
    category: Category;
}

import Link from 'next/link';
import Image from 'next/image';

const GeneralCatItem = ({ category }: Props) => {
    let link: string = '#';

    if (category.linkType === 'internal' && category.internalLink) {
        if (category.internalLink.relationTo === 'collection') {
            link = `/collection/${typeof category.internalLink.value === 'string' ? category.internalLink.value : category.internalLink.value.Title}`;
        } else if (category.internalLink.relationTo === 'products') {
            link = `/product/${typeof category.internalLink.value === 'string' ? category.internalLink.value : category.internalLink.value.title}`;
        }
    } else if (category.linkType === 'external' && category.externalUrl) {
        link = category.externalUrl;
    }

    return (
        <Link href={link}>
            {typeof category.image !== 'string' && category.image.url ?
                <div className='w-full h-full overflow-hidden rounded-2xl group'>
                    <Image
                        src={category.image.url}
                        alt={category.image.alt}
                        width={category.image.width || 100}
                        height={category.image.height || 100}
                        className='w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-200'
                    />

                </div>
                : null}
        </Link>
    )
}

export default GeneralCatItem;