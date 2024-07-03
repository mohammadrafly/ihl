import React from "react";
import HomeLayout from "./layouts/HomeLayout";
import Sidebar from "./layouts/partials/home/Sidebar";
import ArtikelList from "./components/ArtikelList";

export default function Index() {
    return (
        <HomeLayout>
            <div className="lg:px-64 lg:py-10 md:py-10 block lg:grid lg:grid-cols-5 gap-5">
                <div className="col-span-3">
                    <ArtikelList />
                </div>
                <div className="col-span-2 flex items-center justify-center">
                    <Sidebar />
                </div>
            </div>
        </HomeLayout>
    );
}
