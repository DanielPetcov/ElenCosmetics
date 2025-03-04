import Logo from "../Icons/Logo";
import payload from "@/queries";

import InstagramIcon from "../Icons/InstagramIcon";
import FacebookIcon from "../Icons/FacebookIcon";
import TiktokIcon from "../Icons/TiktokIcon";
import RichText from "@/blocks/richtext/Server";


import Link from "next/link";

const Footer = async () => {
    const result = await payload.findGlobal({
        slug: "footer"
    });

    return (
        <div className="bg-gray-700 flex justify-center items-center p-4 py-10">
            <div className="flex flex-col gap-20 items-center">
                <Link href="/">
                    <Logo width={100} color="#fff" />
                </Link>
                <div className="grid grid-cols-3 gap-[90px]">
                    {/* Adresa Noastră */}
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg font-semibold uppercase">Adresa Noastră</h5>
                        {result.our_adress ? (
                            <div className="text-slate-100">
                                <RichText data={result.our_adress} />
                            </div>
                        ) : null}
                        {result.social_links && result.social_links.length > 0 ? (
                            <div className="flex gap-2 items-center">
                                {result.social_links.map((link) => {
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
                                        <Link href={link.social_link} className="w-5 h-5" key={link.id}>
                                            {socialIcon}
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : null}
                    </div>

                    {result.special_links && result.special_links.length > 0 ? (
                        result.special_links.map((specialLink, index) => (
                            <div className="flex flex-col gap-3" key={index}>
                                <h5 className="text-lg font-semibold uppercase">{specialLink.title}</h5>
                                {specialLink.link && specialLink.link.length > 0 ?
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
                                    : null}
                            </div>
                        ))
                    ) : null}
                </div>
                <div>
                    <span className="text-sm font-normal">
                        @ 2025 - Toate drepturile sunt rezervate. Autor - Petcov Daniel
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Footer;
