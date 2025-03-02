import Link from "next/link"
import AccountIcon from "../Icons/AccountIcon"
import payload from "@/queries"
import { headers as nextHeaders } from 'next/headers'

const AccountBtn = async () => {
    const headers = await nextHeaders();
    const result = await payload.auth({ headers })
    return (
        <Link href={`${result.user ? '/account' : '/login'}`} className="hidden md:block">
            <AccountIcon />
        </Link>
    )
}

export default AccountBtn;