import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

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
    discount: number | null
}

const OrderSummary = ({ items, discount }: Props) => {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    let total = subtotal;
    if (discount) {
        total -= (subtotal * discount) / 100
    }

    return (
        <div className="text-gray-700 border border-gray-300 rounded-xl p-5 flex flex-col gap-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="flex flex-col gap-4">
                <div className="flex items-baseline justify-between text-lg">
                    <span>Subtotal</span>
                    <div className="flex gap-2">
                        <span>{subtotal}</span><span>MDL</span>
                    </div>
                </div>

                <Separator className="my-4" />
                <div className="flex items-baseline justify-between text-lg">
                    <span>Total</span>
                    <div className="flex gap-2 font-semibold">
                        <span>{total}</span><span>MDL</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                        <Input className="py-6 rounded-full" placeholder="Promo Code" />
                        <Button className="bg-[#F5A3B7] hover:bg-[#eb92a8] active:bg-[#faaabe] rounded-full py-6"
                        >Apply</Button>
                    </div>
                    <Link href="/checkout" className="w-full">
                        <Button className="bg-[#F5A3B7] hover:bg-[#eb92a8] active:bg-[#faaabe] rounded-full py-6 w-full"
                        >Go to checkout</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary;