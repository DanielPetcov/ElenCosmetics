'use client'
import { useCartStore } from "@/app/(frontend)/useCartStore";
import { motion } from "motion/react";

import { Minus, Plus } from 'lucide-react';
import { Product } from "@/payload-types";

const QuantityButtons = ({ id, product }: { id: string, product: Product }) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
    const items = useCartStore((state) => state.items);
    const item = items.find((i) => i.productId === product.id);
    return (
        <div className="grid grid-cols-3 p-2 rounded-md border border-gray-300 gap-2 text-gray-700">
            <motion.div
                whileTap={{ scale: 1.2 }}
                onClick={() => decreaseQuantity(item ? item :
                    {
                        productId: product.id,
                        price: product.Price,
                        comparePrice: product["Compare price"] !== undefined ? product["Compare price"] : null,
                        img: typeof product.FeaturedImg === 'string' ? product.FeaturedImg : null,
                        imgHeight: typeof product.FeaturedImg !== 'string' ? (product.FeaturedImg.height ?? null) : null,
                        imgWidth: typeof product.FeaturedImg !== 'string' ? (product.FeaturedImg.width ?? null) : null,
                        name: product.Title,
                        quantity: 1
                    }
                )}
            >
                <Minus className='cursor-pointer' strokeWidth={1.5} />
            </motion.div>
            <span className="text-center pointer-events-none select-none">{item ? item.quantity : 1}</span>
            <motion.div
                whileTap={{ scale: 1.2 }}
                onClick={() => addToCart(item ? item :
                    {
                        productId: product.id,
                        price: product.Price,
                        comparePrice: product["Compare price"] !== undefined ? product["Compare price"] : null,
                        img: typeof product.FeaturedImg === 'string' ? product.FeaturedImg : null,
                        imgHeight: typeof product.FeaturedImg !== 'string' ? (product.FeaturedImg.height ?? null) : null,
                        imgWidth: typeof product.FeaturedImg !== 'string' ? (product.FeaturedImg.width ?? null) : null,
                        name: product.Title,
                        quantity: 1
                    }
                )}
            >
                <Plus className='cursor-pointer' strokeWidth={1.5} />
            </motion.div>
        </div>
    )
}

export default QuantityButtons;