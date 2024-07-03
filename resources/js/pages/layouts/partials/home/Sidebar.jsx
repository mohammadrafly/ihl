import { Link, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Sidebar = () => {
    const { artikelAll } = usePage().props;
    const getArticleCountsByYear = () => {
        let countsByYear = {};

        artikelAll.forEach((article) => {
            const year = new Date(article.created_at).getFullYear();
            if (countsByYear[year]) {
                countsByYear[year]++;
            } else {
                countsByYear[year] = 1;
            }
        });

        return countsByYear;
    };

    const articleCountsByYear = getArticleCountsByYear();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="bg-green-500 text-white p-5 h-full w-[410px] rounded-lg">
            <div className="mb-5 border p-5">
                <ul className="flex flex-col gap-5">
                    {Object.keys(articleCountsByYear).map((year) => (
                        <li key={year}>
                            <Link href={`article/archieve/${year}`} className="hover:underline">
                                {year} ({articleCountsByYear[year]})
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="border p-5">
                <ul className="flex flex-col gap-5">
                    <li className="hidden lg:block">
                        <div className="aspect-w-1 aspect-h-1">
                            <blockquote
                                className="instagram-media"
                                data-instgrm-permalink="https://www.instagram.com/indonesiakuhijaulestari/"
                                data-instgrm-version="13"
                            ></blockquote>
                        </div>
                    </li>
                    <li>
                        <a
                            href="https://www.facebook.com"
                            className="bg-blue-500 w-full flex justify-center items-center py-2 rounded-lg"
                        >
                            <FontAwesomeIcon icon={faFacebook} size="2x" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.youtube.com"
                            className="bg-red-500 w-full flex justify-center items-center py-2 rounded-lg"
                        >
                            <FontAwesomeIcon icon={faYoutube} size="2x" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
