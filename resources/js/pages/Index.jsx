import React from "react";
import HomeLayout from "./layouts/HomeLayout";
import Sidebar from "./layouts/partials/home/Sidebar";
import ArtikelList from "./components/ArtikelList";

export default function Index() {
    return (
        <HomeLayout>
            <div className="px-4 py-4 md:px-10 md:py-10 2xl:px-32 2xl:py-10 block lg:flex lg:justify-between gap-5">
                <div className="col-span-5">
                    <ArtikelList />
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <Sidebar />
                </div>
            </div>
        </HomeLayout>
    );
}
