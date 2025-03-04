import Logout from "./logout"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mail } from 'lucide-react';
import { Phone } from 'lucide-react';
import { Box } from 'lucide-react'
import { Button } from "@/components/ui/button";

import OrdersWindow from "./OrdersWindow";

import { Dialog } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

interface UserInfo {
    id?: string | undefined
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    phoneNumber?: string | null
}


const AccountCard = async ({ id, firstName, lastName, email, phoneNumber }: UserInfo) => {
    return (
        <div className="flex flex-col gap-4 items-center bg-white p-5 rounded-md">
            <Avatar className="w-20 h-20">
                <AvatarFallback>{firstName?.charAt(0)}{lastName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex gap-2">
                <span className="text-gray-700 font-semibold">{firstName}</span>
                <span className="text-gray-700 font-semibold">{lastName}</span>
            </div>
            <div className="space-y-2">
                <div className="border border-gray-300 p-3 rounded-lg flex items-center gap-4">
                    <Mail />
                    <span className="text-sm">{email}</span>
                </div>
                {
                    phoneNumber ?
                        <div className="border border-gray-300 p-3 rounded-lg flex items-center gap-4">
                            <Phone />
                            <span className="text-sm">{phoneNumber}</span>
                        </div> : null
                }
            </div>
            <Dialog >
                <div className="space-y-2 w-full">
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                            <Box />
                            <span className="text-sm">Orders</span>
                        </Button>
                    </DialogTrigger>
                    <Logout />
                </div>
                <OrdersWindow id={id} />
            </Dialog>
        </div>
    )
}

export default AccountCard;