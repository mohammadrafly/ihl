import React from 'react';
import Header from './partials/home/Header';
import Footer from './partials/home/Footer';
import { usePage, Head } from '@inertiajs/react';

export default function HomeLayout({ children }) {
    const { title } = usePage().props;

    return (
        <div className="min-h-screen bg-white">
            <Head title={`Indonesiaku Hijau Lestari | ${title}`} />
            <Header />
                <div className="pb-10 min-h-screen">
                    {children}
                </div>
            <Footer />
        </div>
    );
}
