import BurgerMenuIcon from "../Icons/BurgerMenuIcon";
import Logo from "../Icons/Logo";
import SearchIcon from "../Icons/SearchIcon";
import AccountIcon from "../Icons/AccountIcon";
import CartIcon from "../Icons/CartIcon";
import Link from "next/link";

const Header = () => {
    return <div className="py-6 px-10">
        <div className="grid grid-cols-3 w-full items-center h-fit">
            <div className="flex justify-start">
                <BurgerMenuIcon />
            </div>
            <Link href="/" className="flex justify-center">
                <Logo width={110} color="#374151" />
            </Link>
            <div className="flex gap-5 items-center justify-end">
                <SearchIcon />
                <Link href={'/account'}>
                    <AccountIcon />
                </Link>
                <Link href={'/cart'}>
                    <CartIcon />
                </Link>
            </div>
        </div>
    </div>
}

export default Header;