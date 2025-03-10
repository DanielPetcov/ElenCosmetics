'use client'
import { SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Header } from "@/payload-types";
import { Link } from "@/i18n/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";
import { motion } from "motion/react";
import { UserRound } from 'lucide-react';
import { ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button"
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import MegaMenuItem from "./MegaMenuItem";
import MegaMenuLastItem from "./MegaMenuLastItem";

type MenuItems = Header['menuItems'];
type MenuItem = MenuItems[number];

const Megamenu = ({ items, locale }: { items: MenuItems, locale: string }) => {
    const [selectedLink, setSelectedLink] = useState<MenuItem | null>(null);

    const handleItemClick = (item: MenuItem) => {
        setSelectedLink(selectedLink?.label === item.label ? null : item);
    };

    const handleGoBack = () => {
        setSelectedLink(null);
    };

    if (!items || items.length <= 0) return null;

    return (
        <SheetContent side={'left'} className="p-4 text-gray-700 transition-all duration-200 flex flex-col justify-between">
            <VisuallyHidden>
                <SheetTitle>Megamenu</SheetTitle>
            </VisuallyHidden>
            <div className="flex gap-10 mt-10">
                <motion.div
                    className="flex flex-col gap-2 w-full"
                    initial={{ x: 0, opacity: 1 }}
                    animate={{
                        x: selectedLink ? '-110%' : 0,
                        opacity: selectedLink ? 0 : 1
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {items.map((item, index) => (
                        <MegaMenuItem
                            key={index}
                            item={item}
                            locale={locale}
                            handleItemClick={handleItemClick}
                        />
                    ))}
                </motion.div>
                {selectedLink && selectedLink.subItems && selectedLink.subItems.length > 0 && (
                    <motion.div
                        className="flex flex-col gap-2 w-full absolute top-0 left-0 p-4"
                        initial={{
                            x: '100%',
                            opacity: 0
                        }}
                        animate={{
                            x: selectedLink ? 0 : '100%',
                            opacity: selectedLink ? 100 : 0
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <button onClick={handleGoBack} className="text-gray-700 p-2 border border-transparent rounded-md">
                            Înapoi
                        </button>
                        {selectedLink.subItems.map((element, index) => (
                            <MegaMenuLastItem key={index} item={element} locale={locale} />
                        ))}
                    </motion.div>
                )}
            </div>
            <div className="grid grid-cols-2 gap-5 md:hidden">
                <Link href='/cart' locale={locale}>
                    <Button variant="secondary" className="w-full">
                        <ShoppingBag />
                    </Button>
                </Link>
                <LanguageSelector className="md:hidden w-full" />
                <Link href='/account' locale={locale} className="col-span-2">
                    <Button variant="secondary" className="w-full">
                        <UserRound />
                    </Button>
                </Link>
            </div>
        </SheetContent>
    );
}

export default Megamenu;