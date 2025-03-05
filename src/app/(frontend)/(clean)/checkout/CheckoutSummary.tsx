'use client';
import { useCartStore } from "../../useCartStore";
import CheckoutItem from "./CheckoutItem";
const CheckoutSummary = () => {
    const items = useCartStore((state) => state.items);

    return (
        <div className="border border-gray-200 text-gray-700 p-5 rounded-2xl h-fit flex flex-col gap-10">
            <div className="flex flex-col gap-3">
                {items.map((item, index) => (
                    <CheckoutItem key={index} item={item} />
                ))}
            </div>
            <div>
                <div className="flex justify-between items-baseline text-xl">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">{items.reduce((acc, item) => acc + item.price * item.quantity, 0)} MDL</span>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSummary;