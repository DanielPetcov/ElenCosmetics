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
            <div className="text-gray-500 flex flex-1 items-center justify-center py-10 px-5">
                <AccountCard
                    id={user && user.id ? user.id : undefined}
                    firstName={user?.firstName}
                    lastName={user?.lastName}
                    email={user?.email}
                    phoneNumber={user?.phone}
                />
            </div>
        );
    } catch (error) {
        console.log(error);
        redirect('/login');
    }
}

export default Account;