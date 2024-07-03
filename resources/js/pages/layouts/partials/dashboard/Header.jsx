import React from 'react';
import { router } from '@inertiajs/react';

const Header = ({title}) => {
    const handleLogout = async () => {
        try {
            const response = await fetch('dashboard/logout', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                },
            });

            const data = await response.json();

            if (data.code === 200) {
                router.visit(data.redirect, { method: 'get' });
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Network error', error);
        }
    };

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl">{title}</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
                Logout
            </button>
        </header>
    );
};

export default Header;
