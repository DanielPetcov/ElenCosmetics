import { Header } from "@/payload-types";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

type MenuItems = Header['menuItems'];
type MenuItem = MenuItems[number];

interface Props {
    item: MenuItem;
    handleItemClick: (item: MenuItem) => void;
    locale: string;
}

const MegaMenuItem = ({ item, handleItemClick, locale }: Props) => {
    let link = '';

    if (item.linkType === 'internal' && item.internalLink) {
        if (typeof item.internalLink === 'object' && 'relationTo' in item.internalLink) {
            switch (item.internalLink.relationTo) {
                case 'collection':
                    if (typeof item.internalLink.value === 'string') {
                        link = `/collection/${item.internalLink.value}`;
                    } else {
                        link = `/collection/${item.internalLink.value.id}`;
                    }
                    break;
                case 'products':
                    if (typeof item.internalLink.value === 'string') {
                        link = `/product/${item.internalLink.value}`;
                    } else {
                        link = `/product/${item.internalLink.value.id}`;
                    }
                    break;
                case 'termsPage':
                    if (typeof item.internalLink.value === 'string') {
                        link = `/termsPage/${item.internalLink.value}`;
                    } else {
                        link = `/termsPage/${item.internalLink.value.urlTitle}`;
                    }
                    break;
                default:
                    link = '/';
            }
        }
    } else if (item.linkType === 'external' && item.externalUrl) {
        link = typeof item.externalUrl === 'string' ? item.externalUrl : '';
    }

    return item.subItems && item.subItems.length > 0 ? (
        <div
            onClick={() => handleItemClick({
                id: item.id || undefined,
                label: item.label,
                subItems: item.subItems ?? undefined,
                linkType: item.linkType,
                internalLink: item.internalLink,
                externalUrl: item.externalUrl
            })}
            className="flex justify-between items-center gap-20 cursor-pointer p-2 border border-gray-100 hover:border-gray-200 rounded-md transition-all duration-200"
        >
            <span>{item.label}</span>
            <ArrowRight width={20} />
        </div>
    ) : (
        <Link locale={locale} href={link} className="text-gray-700 p-2 border border-transparent rounded-md group">
            <span className="group-hover:underline">{item.label}</span>
        </Link>
    );
};

export default MegaMenuItem;
