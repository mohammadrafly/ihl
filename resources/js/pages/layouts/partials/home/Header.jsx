import { Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";

export default function Header() {
    const { url } = usePage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (href) => url === href;

    return (
        <div className="bg-green-500 text-gray-100 flex justify-between items-center p-2 px-5 lg:px-32 top-0 sticky">
            <div className="text-2xl font-bold flex items-center">
                <img src="assets/images/logo.png" alt="Logo" width={50} height={50} />
                <h1 className="px-5 font-bold font-roboto">INDONESIAKU HIJAU LESTARI</h1>
            </div>
            <div className="hidden md:block">
                <ul className="flex justify-between gap-5 uppercase font-semibold">
                    <li>
                        <Link href="/" className={`transition-all duration-300 hover:text-black ${isActive('/') ? 'text-black' : ''}`}>Home</Link>
                    </li>
                    <li>
                        <Link href="/profile" className={`transition-all duration-300 hover:text-black ${isActive('/profile') ? 'text-black' : ''}`}>Profile</Link>
                    </li>
                    <li>
                        <Link href="/member" className={`transition-all duration-300 hover:text-black ${isActive('/member') ? 'text-black' : ''}`}>Member</Link>
                    </li>
                    <li>
                        <Link href="/contact" className="transition-all duration-300 py-2 px-3 bg-white hover:bg-green-500 rounded-lg text-green-500 hover:text-white border border-green-500 hover:border-white">Contact</Link>
                    </li>
                </ul>
            </div>
            <div className="md:hidden flex items-center">
                <button onClick={toggleMenu} className="focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-green-500 text-white p-5 md:hidden">
                    <ul className="flex flex-col gap-5 uppercase font-semibold">
                        <li>
                            <Link href="/" className={`${isActive('/') ? 'text-black' : ''}`}>Home</Link>
                        </li>
                        <li>
                            <Link href="/profile" className={`${isActive('/profile') ? 'text-black' : ''}`}>Profile</Link>
                        </li>
                        <li>
                            <Link href="/member" className={`${isActive('/member') ? 'text-black' : ''}`}>Member</Link>
                        </li>
                        <li>
                            <Link href="/contact" className={`${isActive('/contact') ? 'text-black' : ''}`}>Contact</Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
