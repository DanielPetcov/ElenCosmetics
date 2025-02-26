import Logo from "./Icons/Logo";
import Link from "next/link";

const Footer = () => {
    return (
        <div className="bg-gray-700 flex justify-center items-center p-4 py-10">
            <div className="flex flex-col gap-20 items-center">
                <Link href='/'>
                    <Logo width={100} color="#fff" />
                </Link>
                <div className="grid grid-cols-3 gap-[90px]">
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg font-semibold uppercase">Despre noi</h5>
                        <Link href="/contact" className="text-sm hover:underline">Contacte</Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg font-semibold uppercase">Despre noi</h5>
                        <Link href="/contact" className="text-sm hover:underline">Contacte</Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg font-semibold uppercase">Despre noi</h5>
                        <Link href="/contact" className="text-sm hover:underline">Contacte</Link>
                    </div>
                </div>
                <div>
                    <span className="text-sm font-normal">@ 2025 - Toate drepturile sunt rezervate. Autor - Petcov Daniel </span>
                </div>
            </div>
        </div>
    )
}

export default Footer;