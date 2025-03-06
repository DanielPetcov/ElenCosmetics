import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { BadgeCheck } from 'lucide-react';
import SendHome from "./SendHome";

const SuccessDialog = () => {
    return (
        <DialogContent className=" sm:max-w-[500px]">
            <DialogHeader>
                <BadgeCheck className="w-16 h-16 text-green-600 mx-auto" />
                <DialogTitle className="text-green-600 font-semibold text-lg text-center">Felicitări! comanda dumneavoastră a fost efectuată</DialogTitle>
                <DialogDescription className="text-center">
                    Un document cu comanda dvs. a fost expediat pe e-mail.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter >
                <SendHome />
            </DialogFooter>
        </DialogContent>
    )
}

export default SuccessDialog