import BurgerMenuIcon from "../Icons/BurgerMenuIcon";
import Logo from "../Icons/Logo";
import SearchIcon from "../Icons/SearchIcon";
import AccountIcon from "../Icons/AccountIcon";
import CartIcon from "../Icons/CartIcon";
import Link from "next/link";
import payload from "@/queries";

import AccountBtn from "./AccountBtn";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

import Image from "next/image";
import Subheader from "../Subheader";
import Megamenu from "./Megamenu";


const Header = async () => {
    const header = await payload.findGlobal({
        slug: 'header'
    })

    const logoUrl = typeof header.logo === 'string'
        ? `/api/media/${header.logo}`
        : header.logo.url;

    return (
        <Sheet>
            <Megamenu items={header.menuItems} />
            {header.upperHeader ?
                <Subheader children={header.upperHeader} />
                : null}
            <div className="py-4 px-6 md:py-6 md:px-10 bg-white shadow-bottom">
                <div className="grid grid-cols-3 w-full items-center h-fit">
                    <SheetTrigger asChild className="w-fit">
                        <Button variant="ghost" className="p-2">
                            <Menu className="w-8 h-8 text-[#374151]" />
                        </Button>
                    </SheetTrigger>
                    <Link href="/" className="flex justify-center w-[100px] h-auto mx-auto">
                        {logoUrl ?
                            <Image
                                src={logoUrl}
                                alt={typeof header.logo !== 'string' ? header.logo.alt : 'Logo'}
                                width={typeof header.logo !== 'string' ? header.logo.width ? header.logo.width : 50 : 50}
                                height={typeof header.logo !== 'string' ? header.logo.height ? header.logo.height : 50 : 50}
                                className="w-full h-auto mx-auto"
                            />
                            : <Logo width={110} color="#374151" />
                        }
                    </Link>
                    <div className="flex gap-5 items-center justify-end">
                        <SearchIcon />
                        <AccountBtn />
                        <Link href={'/cart'} className="hidden md:block">
                            <CartIcon />
                        </Link>
                    </div>
                </div>
            </div>
        </Sheet>
    )
}

export default Header;