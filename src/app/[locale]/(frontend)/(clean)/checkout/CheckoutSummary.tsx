'use client';
import { useCartStore } from "../../useCartStore";
import CheckoutItem from "./components/CheckoutItem";
import { useTranslations } from "next-intl";
const CheckoutSummary = () => {
    const items = useCartStore((state) => state.items);
    const t = useTranslations("CheckoutPage");
    return (
        <div className="border border-gray-300 text-gray-700 p-5 rounded-2xl h-fit flex flex-col gap-10 max-h-[450px] md:max-h-none overflow-y-auto">
            <div className="flex flex-col gap-3">
                {items.map((item, index) => (
                    <CheckoutItem key={index} item={item} />
                ))}
            </div>
            <div>
                <div className="flex justify-between items-baseline text-xl">
                    <span className="font-semibold">{t('summary.total')}</span>
                    <span className="font-semibold">{items.reduce((acc, item) => acc + item.price * item.quantity, 0)} MDL</span>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSummary;