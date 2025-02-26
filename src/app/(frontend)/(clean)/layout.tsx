import React from "react";

export default async function Layout(props: { children: React.ReactNode }) {
    const { children } = props;

    return (
        <div className='min-h-screen w-full flex'>
            <div className='flex-1 flex'>{children}</div>
        </div>
    )
}