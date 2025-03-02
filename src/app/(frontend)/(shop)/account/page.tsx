import { headers as nextHeaders } from 'next/headers';
import { redirect } from 'next/navigation';

import payload from "@/queries";

import AccountCard from './accountCard';

const Account = async () => {
    const headers = await nextHeaders();
    const token = headers.get('cookie')?.split('; ').find(c => c.startsWith('payload-token='))?.split('=')[1];

    if (!token) {
        redirect('/login')
    }

    try {
        const result = payload.auth({ headers });
        const user = (await result).user

        return (
            <div className="text-gray-500 flex flex-1 items-center justify-center">
                <AccountCard
                    id={user?.id}
                    firstName={user?.firstName}
                    lastName={user?.lastName}
                    email={user?.email}
                    phoneNumber={user?.phone}
                />
            </div>
        );
    } catch (error) {
        redirect('/login');
    }
}

export default Account;