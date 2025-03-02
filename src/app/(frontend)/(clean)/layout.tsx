import React from "react";
import Link from "next/link";

import { MoveLeft } from 'lucide-react';

export default async function Layout(props: { children: React.ReactNode }) {
    const { children } = props;

    return (
        <div className='min-h-screen w-full flex flex-col'>
            <div className="container px-10 py-5">
                <Link href='/' className="text-gray-500 flex gap-2 items-center justify-center md:justify-start">
                    <MoveLeft />
                    Go Home
                </Link>
            </div>
            <div className='flex-1 flex'>{children}</div>
        </div>
    )
}

