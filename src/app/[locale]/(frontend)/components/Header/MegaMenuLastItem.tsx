import { Header } from "@/payload-types";
type MenuItems = Header['menuItems'];
type MenuItem = MenuItems[number];
import { Link } from "@/i18n/navigation";
const MegaMenuLastItem = ({ item, locale }: { item: MenuItem, locale: string }) => {
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
    return (
        <Link locale={locale} href={link} className="text-gray-500 group">
            <span className="group-hover:underline">{item.label}</span>
        </Link>
    )
}

export default MegaMenuLastItem;