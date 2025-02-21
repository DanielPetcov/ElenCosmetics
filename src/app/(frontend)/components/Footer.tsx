import Logo from "../testdata/Logo";
import Link from "next/link";

const Footer = () => {
    return (
        <div className="bg-gray-700 flex justify-center items-center p-4 mt-12">
            <div className="flex flex-col gap-[50px] items-center">
                <Link href='/'>
                    <Logo width="w-[100px]" color="#fff"/>
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
                    <span className="text-sm font-normal">@ 2025 - Toate drepturile sunt rezervate. Facut de Petcov Daniel </span>
                </div>
            </div>
        </div>
    )
}

export default Footer;