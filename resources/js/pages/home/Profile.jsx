import React, { useState } from "react";
import HomeLayout from "../layouts/HomeLayout";

export default function Profile() {
    const [activeContent, setActiveContent] = useState("latar belakangan");

    const renderContent = () => {
        switch (activeContent) {
            case "latar belakangan":
                return <p>Latar belakangan Content</p>;
            case "visi misi":
                return <p>Visi misi Content</p>;
            case "ad":
                return <p>Ad Content</p>;
            case "struktur":
                return <p>Struktur Content</p>;
            case "laporan tahunan":
                return <p>Laporan tahunan Content</p>;
            default:
                return <p>Latar belakangan Content</p>;
        }
    };

    return (
        <HomeLayout>
            <div className="w-full min-h-screen lg:px-32 lg:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 p-4">
                    <div className="lg:col-span-2 bg-white p-4">
                        <ul className="flex flex-col space-y-2">
                            <li>
                                <button
                                    onClick={() => setActiveContent("latar belakangan")}
                                    className={`w-full text-left py-2 px-4 rounded ${activeContent === "latar belakangan" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                                >
                                    Latar belakangan
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveContent("visi misi")}
                                    className={`w-full text-left py-2 px-4 rounded ${activeContent === "visi misi" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                                >
                                    Visi misi
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveContent("ad")}
                                    className={`w-full text-left py-2 px-4 rounded ${activeContent === "ad" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                                >
                                    Ad
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveContent("struktur")}
                                    className={`w-full text-left py-2 px-4 rounded ${activeContent === "struktur" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                                >
                                    Struktur
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveContent("laporan tahunan")}
                                    className={`w-full text-left py-2 px-4 rounded ${activeContent === "laporan tahunan" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                                >
                                    Laporan tahunan
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:col-span-4 bg-white p-4">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
