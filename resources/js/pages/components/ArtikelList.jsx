import React from "react";
import { Link, usePage } from "@inertiajs/react";

function ArtikelList() {
    const { artikelAll } = usePage().props;

    const shortenContent = (content, maxLength) => {
        if (content.length <= maxLength) {
            return content;
        }
        return content.slice(0, maxLength) + "...";
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="container mx-auto ">
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
                            <p className="mb-2 text-[#666666]">{formatDate(article.created_at)}</p>
                            <div className="mt-3 text-[#666666]" dangerouslySetInnerHTML={{ __html: shortenContent(article.content, 150) }} />
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
