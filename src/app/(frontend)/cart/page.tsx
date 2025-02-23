import CartIconEmpty from "../components/Icons/CartIconEmpty"
import Link from "next/link";

const Cart = () => {
    return (
        <div className="w-full flex-1 flex justify-center items-center">
            <div className="flex flex-col gap-8 items-center">
                <CartIconEmpty />
                <h1 className="text-2xl text-gray-700">Coșul dvs. este gol</h1>
                <Link href="/" className="bg-custompink hover:bg-rose-200 focus:bg-rose-400 rounded-full p-4">
                    <span className="text-white">Vezi produsele de pe site</span>
                </Link>
            </div>
        </div>
    )
}

export default Cart;