import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
    productId: string;
    name: string;
    price: number;
    comparePrice: number | null;
    quantity: number;
    img: string | null
    imgWidth: number | null,
    imgHeight: number | null
};

type CartState = {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    decreaseQuantity: (item: CartItem) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
};

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            addToCart: (item) =>
                set((state) => {
                    const existingItem = state.items.find((i) => i.productId === item.productId);
                    if (existingItem) {
                        return {
                            items: state.items.map((i) =>
                                i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i
                            ),
                        };
                    }
                    return { items: [...state.items, item] };
                }),
            decreaseQuantity: (item) => 
                set((state) => {
                    const existinItem = state.items.find((i) => i.productId === item.productId);
                    if(existinItem) {
                        if(item.quantity === 1 ){
                            return {
                                items: state.items.filter((i) => i.productId !== item.productId)
                            }
                        } else {
                            return {
                                items: state.items.map((i) => 
                                i.productId === item.productId ? {...i, quantity: i.quantity - 1} : i)
                            }
                        }
                    }
                    return { items: [...state.items]}
                }),
            removeFromCart: (productId) =>
                set((state) => ({
                    items: state.items.filter((item) => item.productId !== productId),
                })),

            clearCart: () => set({ items: [] }),
        }),
        {
          name: 'cart-storage',
        }
    )
);
