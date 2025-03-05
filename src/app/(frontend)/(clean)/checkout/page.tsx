import CheckoutForm from "./CheckoutForm";
import CheckoutSummary from "./CheckoutSummary";
import payload from "@/queries";
import { headers as nextHeaders } from 'next/headers';

const Checkout = async () => {
    const headers = await nextHeaders();
    const result = payload.auth({ headers });
    const user = (await result).user;

    return (
        <div className="text-gray-700 max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-18 px-5 md:px-10 py-5">
            <CheckoutForm userId={user && user.id ? user.id : null} />
            <CheckoutSummary />
        </div>
    );
}

export default Checkout;