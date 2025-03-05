import Logo from "../Icons/Logo";
import payload from "@/queries";

import FooterLinks from "./FooterLinks";
import FooterLinksMobile from "./FooterLinksMobile";
import Link from "next/link";

const Footer = async () => {
    const result = await payload.findGlobal({
        slug: "footer"
    });

    return (
        <div className="bg-gray-700 flex justify-center items-center p-4 py-10">
            <div className="flex flex-col gap-10 md:gap-20 items-center">
                <Link href="/">
                    <Logo width={120} color="#fff" />
                </Link>
                <FooterLinks footer={result} />
                <FooterLinksMobile footer={result} />
                <p className="text-xs md:text-sm font-normal text-center">
                    @ 2025 - Toate drepturile sunt rezervate. Autor - Petcov Daniel
                </p>
            </div>
        </div>
    );
};

export default Footer;
