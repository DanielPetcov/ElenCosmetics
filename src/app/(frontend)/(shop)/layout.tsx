import React from "react";
import Subheader from "../components/Subheader";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

export default async function Layout(props: { children: React.ReactNode }) {
    const { children } = props;

    return (
        <div className='min-h-screen w-full flex flex-col gap-10 justify-between'>
            <div className='flex-1 flex flex-col'>
                <Subheader>Livrare  în raza orasului Cimislia gratuit de la 500 lei</Subheader>
                <Header />
                <div className='flex-1 flex flex-col'>{children}</div>
            </div>
            <Footer />
        </div>
    )
}