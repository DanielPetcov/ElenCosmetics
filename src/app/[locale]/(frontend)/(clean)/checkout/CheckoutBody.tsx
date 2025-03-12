'use client'
import CheckoutForm from "./CheckoutForm"
import CheckoutSummary from "./CheckoutSummary"
import { User } from "@/payload-types"
import { useCartStore } from "../../useCartStore"; // Import useCartStore

const CheckoutBody = ({ user }: { user: User | null }) => {
    const discount = useCartStore((state) => state.discount); // Get discount from store

    return (
        <>
            <CheckoutForm userId={user && user.id ? user.id : null} />
            <CheckoutSummary discount={discount} />
        </>
    )
}

export default CheckoutBody