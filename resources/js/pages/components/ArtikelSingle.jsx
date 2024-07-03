import React from "react";
import { usePage, Link } from "@inertiajs/react";
import HomeLayout from "../layouts/HomeLayout";

function ArtikelSingle() {
    const { artikel, artikelAll } = usePage().props;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formattedDate = formatDate(artikel.created_at);

    return (
        <HomeLayout>
            <div className="mx-auto">
                {artikel.image && (
                    <img
                        src={`storage/images/${artikel.image}`}
                        alt={artikel.title}
                        className="w-full h-[400px] object-cover mb-5"
                    />
                )}
                <div className="lg:px-96 px-5">
                    <h1 className="text-[#333333] text-4xl font-bold font-roboto py-5">{artikel.title}</h1>
                    <div className="flex py-5 gap-5 text-[#666666] text-[18px]">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <div className="font-semibold ml-2 text-sm">
                                Admin
                            </div>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <div className="font-semibold ml-2 text-sm">
                                {formattedDate}
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 text-[#666666] text-[18px] pb-10" dangerouslySetInnerHTML={{ __html: artikel.content }} />
                    <div className="mx-auto block lg:flex gap-5">
                        {artikelAll.slice(0, 3).map(article => (
                            <Link href={`${article.id}`} key={article.id} className="mb-4 transition duration-300 ease-in-out hover:opacity-75">
                                <div className="mb-5">
                                    <div className="flex-shrink-0 mb-5">
                                        <img
                                            src={`storage/images/${article.image}`}
                                            alt={article.title}
                                            className="md:w-[300px] md:h-[200px] w-full h-full object-cover md:rounded-lg"
                                        />
                                    </div>
                                    <div className="md:flex-1">
                                        <h2 className="text-2xl font-bold mb-2 text-[#333333] md:max-w-[300px]">{article.title}</h2>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default ArtikelSingle;
