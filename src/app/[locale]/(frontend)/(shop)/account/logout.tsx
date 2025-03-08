'use client'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const Logout = () => {
    const router = useRouter();

    const logoutFunction = async () => {
        try {
            const response = await fetch('/api/users/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': "application/json"
                }
            })

            if (response.ok) {
                router.replace('/login')
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Button onClick={() => logoutFunction()} className='w-full'>
            Logout
        </Button>
    );
}

export default Logout;