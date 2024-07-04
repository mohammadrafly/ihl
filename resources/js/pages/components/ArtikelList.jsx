import React from "react";
import { Link, usePage } from "@inertiajs/react";
import TruncateContent from "./TruncatedContent";
import FormattedDate from './FormattedDate';

function ArtikelList() {
    const { artikelAll } = usePage().props;

    return (
        <div className="">
            {artikelAll.length === 0 ? (
                <div className="text-center text-gray-500">
                    No articles available.
                </div>
            ) : (
                artikelAll.map(article => (
                    <Link href={`/article/${article.id}`} key={article.id} className="block md:flex mb-4 transition duration-300 ease-in-out hover:opacity-75">
                        <div className="flex-shrink-0 mb-5 md:mb-0 md:mr-4">
                            <img
                                src={`storage/images/${article.image}`}
                                alt={article.title}
                                className="md:w-[300px] md:h-[200px] w-full h-full object-cover md:rounded-lg"
                            />
                        </div>
                        <div className="px-5">
                            <h2 className="text-2xl font-bold mb-2 text-[#333333]">{article.title}</h2>
                            <p className="mb-2 text-[#666666]">
                                <FormattedDate date={article.created_at} />
                            </p>
                            <div className="mt-3 text-[#666666]">
                                <TruncateContent content={article.content} length={150}  />
                            </div>
                            <Link href={`/article/${article.id}`} className="text-blue-500 hover:underline">
                                Read More
                            </Link>
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
}

export default ArtikelList;
