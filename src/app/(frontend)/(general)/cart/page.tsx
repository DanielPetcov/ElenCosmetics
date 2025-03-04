'use client'
import CartIconEmpty from "../../components/Icons/CartIconEmpty";
import Link from "next/link";
import PageTitle from "../../components/PageTitle";
import { useCartStore } from "../../useCartStore";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";
import CartItem from "./cartItem";

import OrderSummary from "./orderSummary";

const Cart = () => {
    const items = useCartStore((state) => state.items);
    const [hydrated, setHydrated] = useState(false)
    useEffect(() => {
        const unsubHydrate = useCartStore.persist.onHydrate(() => setHydrated(false))
        const unsubFinishHydration = useCartStore.persist.onFinishHydration(() => setHydrated(true))
        setHydrated(useCartStore.persist.hasHydrated());

        return () => {
            unsubHydrate()
            unsubFinishHydration()
        }
    }, [])

    // Show loading spinner until Zustand has finished hydrating
    if (!hydrated) {
        return (
            <div className="flex flex-1 justify-center items-center">
                <LoadingSpinner color="#000" width={20} height={20} />
            </div>
        );
    }

    // Only render cart when hydration is complete
    if (items.length === 0) {
        return (
            <div className="w-full flex-1 flex justify-center items-center">
                <div className="flex flex-col gap-8 items-center">
                    <CartIconEmpty />
                    <h1 className="text-2xl text-gray-700">Coșul dvs. este gol</h1>
                    <Link href="/" className="bg-custompink hover:bg-rose-200 focus:bg-rose-400 rounded-full p-4">
                        <span className="text-white">Vezi produsele de pe site</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container flex flex-col gap-4 px-10 py-10 mx-auto">
            <PageTitle title="Cosul meu" />
            <div className="grid grid-cols-[1fr_auto] gap-4">
                <div className="flex flex-col gap-4 text-gray-700 border border-gray-300 rounded-xl p-5 h-fit">
                    {items.map((item, index) => {
                        if (index + 1 === items.length) {
                            return (
                                <CartItem key={index}
                                    title={item.name}
                                    comparePrice={0}
                                    img={item.img}
                                    imgHeight={item.imgHeight}
                                    imgWidth={item.imgWidth}
                                    price={item.price}
                                    quantity={item.quantity}
                                    id={item.productId}
                                />
                            )
                        }

                        return (<div key={index} className="flex flex-col gap-4">
                            <CartItem key={index}
                                title={item.name}
                                comparePrice={0}
                                img={item.img}
                                imgHeight={item.imgHeight}
                                imgWidth={item.imgWidth}
                                price={item.price}
                                quantity={item.quantity}
                                id={item.productId}
                            />
                            <Separator />
                        </div>)
                    }
                    )}
                </div>
                <OrderSummary
                    items={items}
                    discount={20}
                />
            </div>
        </div>
    );
};

export default Cart;

