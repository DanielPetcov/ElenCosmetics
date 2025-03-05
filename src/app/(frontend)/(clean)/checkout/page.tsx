import AddressForm from "./AddressForm";
import CheckoutSummary from "./CheckoutSummary";
const Checkout = () => {
    return (
        <div className="text-gray-700 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-5 md:px-10 py-5">
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-5">
                    <h1 className="text-gray-700 text-3xl md:text-4xl font-semibold uppercase">Livrare</h1>
                    <AddressForm />
                </div>
            </div>
            <CheckoutSummary />
        </div>
    );
}

export default Checkout;