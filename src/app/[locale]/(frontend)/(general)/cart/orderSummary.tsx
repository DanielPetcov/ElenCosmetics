import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";

interface CartItem {
    productId: string;
    name: string;
    price: number;
    comparePrice: number | null;
    quantity: number;
    img: string | null;
    imgWidth: number | null;
    imgHeight: number | null;
}

interface Props {
    items: CartItem[],
    discount: number | null,
}

const OrderSummary = ({ items, discount }: Props) => {
    const t = useTranslations('CartPage');
    const locale = useLocale();
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    let total = subtotal;
    if (discount) {
        total -= (subtotal * discount) / 100
    }

    return (
        <div className="text-gray-700 border border-gray-300 rounded-xl p-5 flex flex-col gap-6 lg:max-w-[400px] h-fit">
            <h2 className="text-xl font-semibold">{t('orderSummary')}</h2>
            <div className="flex flex-col gap-3 md:gap-4">
                <div className="flex items-baseline justify-between text-base md:text-lg">
                    <span>{t('subtotal')}</span>
                    <div className="flex gap-1">
                        <span>{subtotal}</span><span>MDL</span>
                    </div>
                </div>
                <Separator className="my-3 md:my-4" />
                <div className="flex items-baseline justify-between text-lg">
                    <span>{t('total')}</span>
                    <div className="flex gap-1 font-semibold">
                        <span>{total}</span><span>MDL</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                        <Input className="py-4 md:py-6 rounded-full text-sm md:text-base" placeholder={t('promo')} />
                        <Button className="bg-[#F5A3B7] hover:bg-[#eb92a8] active:bg-[#faaabe] rounded-full py-4 md:py-6 text-sm md:text-base"
                        >{t('apply')}</Button>
                    </div>
                    <Link href="/checkout" locale={locale} className="w-full">
                        <Button className="bg-[#F5A3B7] hover:bg-[#eb92a8] active:bg-[#faaabe] rounded-full py-6 w-full"
                        >{t('goCheckout')}</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary;