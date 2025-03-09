'use client'
import { SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Header } from "@/payload-types";
import Link from "next/link";
import { ArrowRight } from 'lucide-react';
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";
import { motion } from "motion/react";
import { UserRound } from 'lucide-react';
import { ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button"
import LanguageSelector from "../LanguageSelector/LanguageSelector";


type Props = Header['menuItems'];
type Sublink = {
    label: string,
    link: string
};
type MenuItem = {
    label: string,
    link: string,
    id?: string | undefined,
    subItems?: Sublink[]
};

const Megamenu = ({ items }: { items: Props }) => {
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
                        item.subItems && item.subItems.length > 0 ? (
                            <div
                                key={index}
                                onClick={() => handleItemClick({
                                    id: item.id ? item.id : undefined,
                                    label: item.label,
                                    link: item.link,
                                    subItems: item.subItems ?? undefined
                                })}
                                className={`flex justify-between items-center gap-20 cursor-pointer p-2 border border-gray-100 hover:border-gray-200 rounded-md transition-all duration-200
                                        ${selectedLink && selectedLink.id !== null && selectedLink?.id === item.id ? 'border-gray-500' : 'border-transparent'}`}
                            >
                                <span>{item.label}</span>
                                <ArrowRight width={20} />
                            </div>
                        ) : (
                            <Link key={index} href={item.link} className="text-gray-700 p-2 border border-transparent rounded-md group">
                                <span className="group-hover:underline">{item.label}</span>
                            </Link>
                        )
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
                            <Link href={element.link} key={index} className="text-gray-500 group">
                                <span className="group-hover:underline">{element.label}</span>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </div>
            <div className="grid grid-cols-2 gap-5 md:hidden">
                <Link href='/cart'>
                    <Button variant="secondary" className="w-full">
                        <ShoppingBag />
                    </Button>
                </Link>
                <LanguageSelector className="md:hidden w-full" />
                <Link href='/account' className="col-span-2">
                    <Button variant="secondary" className="w-full">
                        <UserRound />
                    </Button>
                </Link>
            </div>
        </SheetContent>
    );
}

export default Megamenu;