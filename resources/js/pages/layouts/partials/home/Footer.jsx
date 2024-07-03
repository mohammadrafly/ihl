import { Link } from "@inertiajs/react";
import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-green-500 text-gray-100 py-10 font-roboto flex items-center justify-center">
            <div className="mx-auto lg:px-96 md:px-32 mt-5 text-center">
                <div className="mx-auto text-center">
                    <div className="pb-5 flex justify-center items-center uppercase">
                        <ul className="flex gap-5 text-center">
                            <li>
                                <Link href="/" className="hover:underline">Home</Link>
                            </li>
                            <li>
                                <Link href="/profile" className="hover:underline">Profile</Link>
                            </li>
                            <li>
                                <Link href="/member" className="hover:underline">Member</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:underline">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="pb-5">
                        <p className="mt-2 text-center uppercase">
                            <span className="underline">LEMBAGA SWADAYA MASYARAKAT</span><br />
                            <span className="text-sm">SK NOMOR AHU-0000411.AH.01.07.TAHUN 2022</span><br />
                            <span className="">Jalan Langsep No. 1, Oro-Oro Ombo - Batu (65311)</span>
                        </p>
                    </div>
                    <div className="pb-5 block lg:flex items-center justify-center">
                        <img src="assets/images/logo.png" alt="Logo" className="mx-auto lg:mx-0" width={100} height={100} />
                        <div className="font-bold font-roboto lg:text-left text-center lg:ml-4">
                            INDONESIAKU <br />
                            HIJAU <br />
                            LESTARI
                        </div>
                    </div>
                </div>
                <p className="font-thin text-sm">© {currentYear} Indonesiaku Hijau Lestari. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
