import Logout from "./logout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserInfo {
    id?: string | null
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    phoneNumber?: string | null
}


const AccountCard = async ({ id, firstName, lastName, email, phoneNumber }: UserInfo) => {
    return (
        <div className="flex flex-col gap-4 items-center">
            <Avatar>
                <AvatarFallback>{firstName?.charAt(0)}{lastName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <span>{firstName}</span>
                <span>{lastName}</span>
            </div>
            <div className="space-y-2">
                <div>{email}</div>
                <div>{phoneNumber}</div>
            </div>
            <Logout />
        </div>
    )
}

export default AccountCard;