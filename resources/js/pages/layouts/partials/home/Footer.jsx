import { Link } from "@inertiajs/react";
import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-green-500 text-gray-100 font-roboto flex items-center justify-center">
            <div className="mx-auto lg:px-96 md:px-32 py-5 text-center">
                <p className="font-thin text-sm">© {currentYear} Indonesiaku Hijau Lestari. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
