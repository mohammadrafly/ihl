import React from 'react';
import Header from './partials/dashboard/Header';
import Sidebar from './partials/dashboard/Sidebar';
import { usePage } from "@inertiajs/react";

export default function DashboardLayout({ children }) {
    const { title } = usePage().props;
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header title={title}/>
                <main className="flex-1 p-4">
                    {children}
                </main>
            </div>
        </div>
    );
};
