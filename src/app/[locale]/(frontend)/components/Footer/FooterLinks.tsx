import InstagramIcon from "../Icons/InstagramIcon";
import FacebookIcon from "../Icons/FacebookIcon";
import TiktokIcon from "../Icons/TiktokIcon";
import RichText from "@/blocks/richtext/Server";

import Link from "next/link";
import { Footer } from "@/payload-types";
import { useTranslations } from "next-intl";

const FooterLinks = ({ footer }: { footer: Footer }) => {
    const t = useTranslations("Footer");
    return (
        <div className="hidden md:grid grid-cols-3 gap-[90px]">
            {/* Adresa Noastră */}
            <div className="flex flex-col gap-2">
                <h5 className="text-lg font-semibold uppercase">{t('ourAddress')}</h5>
                {footer.our_adress ? (
                    <div className="text-slate-100">
                        <RichText data={footer.our_adress} />
                    </div>
                ) : null}
                {footer.social_links && footer.social_links.length > 0 ? (
                    <div className="flex gap-2 items-center">
                        {footer.social_links.map((link) => {
                            let socialIcon;
                            const color = "#fff";
                            switch (link.social_icon) {
                                case "facebook":
                                    socialIcon = <FacebookIcon color={color} />;
                                    break;
                                case "instagram":
                                    socialIcon = <InstagramIcon color={color} />;
                                    break;
                                case "tiktok":
                                    socialIcon = <TiktokIcon color={color} />;
                                    break;
                                default:
                                    socialIcon = <div key={link.id}>nothing</div>;
                            }
                            return (
                                <Link href={link.social_link} target="_blank" className="w-5 h-5" key={link.id}>
                                    {socialIcon}
                                </Link>
                            );
                        })}
                    </div>
                ) : null}
            </div>

            {footer.special_links && footer.special_links.length > 0 ? (
                footer.special_links.map((specialLink, index) => (
                    <div className="flex flex-col gap-3" key={index}>
                        <h5 className="text-lg font-semibold uppercase">{specialLink.title}</h5>
                        {/* {specialLink.link && specialLink.link.length > 0 ?
                            <div className="flex flex-col gap-2">
                                {specialLink.link.map((linkItem) => (
                                    <Link
                                        key={linkItem.title}
                                        href={typeof linkItem.page === 'string' ? linkItem.page : linkItem.page.title}
                                        className="text-sm hover:underline"
                                    >
                                        {linkItem.title}
                                    </Link>
                                ))}
                            </div>
                            : null} */}
                    </div>
                ))
            ) : null}
        </div>
    )
}

export default FooterLinks;