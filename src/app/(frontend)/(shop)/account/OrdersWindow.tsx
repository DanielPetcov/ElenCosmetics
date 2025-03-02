import { Button } from "@/components/ui/button"
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog"

import payload from "@/queries"

import { Order } from "@/payload-types"
import { Product } from "@/payload-types"

const OrdersWindow = async ({ id }: { id: string | undefined }) => {
    const orders: Order[] = []
    if (id) {
        const result = await payload.find({
            collection: 'orders',
            where: {
                customer: {
                    equals: id
                }
            }
        })

        result.docs.map((doc) => orders.push(doc));
    }
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Orders</DialogTitle>
                <DialogDescription>
                    Here you can find all your orders
                </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-5">
                {orders && orders.length > 0 ?
                    <div className="flex flex-col gap-5">
                        {orders.map((order, index) => (
                            <div key={index} className="flex flex-col gap-2 text-gray-500 border border-gray-300 p-2 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <span>Order nr.</span>
                                    <span>{order.orderNumber}</span>
                                </div>
                                <div className="space-y-2">
                                    {typeof order.items !== 'string' && order.items.map((item: { product: string | Product; quantity: number; price: number; }, index) => (
                                        <div key={index} className="flex items-baseline justify-between gap-5">
                                            <div>
                                                <span className="max-w-10 truncate">{typeof item.product === 'string' ? item.product : item.product.Title}</span>
                                            </div>
                                            <div className="flex gap-1 items-baseline">
                                                <span>price:</span>
                                                <span>{item.price}</span>
                                            </div>
                                            <div className="flex gap-1 items-baseline">
                                                <span>quantity:</span>
                                                <span>{item.quantity}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <div>
                        <span className="text-gray-700">At the moment there are no orders</span>
                    </div>
                }
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button>Close</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}

export default OrdersWindow;