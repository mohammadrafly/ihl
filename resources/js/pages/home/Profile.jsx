import React, { useState } from "react";
import HomeLayout from "../layouts/HomeLayout";
import { MapInteractionCSS } from 'react-map-interaction';

export default function Profile() {
    const [activeContent, setActiveContent] = useState("latar belakangan");
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const renderContent = () => {
        switch (activeContent) {
            case "latar belakangan":
                return (
                    <div>
                        <img src="assets/images/latar-belakang.jpg" alt="" className="rounded-xl"/>
                        <p>
                        Pada era modern ini, tantangan terbesar yang dihadapi manusia adalah menjaga keseimbangan antara pembangunan ekonomi dan pelestarian lingkungan hidup. Di tengah-tengah urbanisasi yang cepat dan pertumbuhan populasi yang tak terelakkan, ekosistem alam kita semakin terancam oleh perubahan iklim, degradasi habitat, dan polusi lingkungan.
                        </p>
                        <p>
                        Dalam menghadapi tantangan ini, berdirinya Indonesiaku Hijau Lestari, sebuah lembaga non-profit yang didedikasikan untuk pelestarian dan perlindungan lingkungan hidup, menjadi sangat penting. Berawal dari kesadaran akan pentingnya menjaga alam sebagai warisan yang harus kita jaga bagi generasi mendatang, Indonesiaku Hijau Lestari didirikan dengan tujuan utama untuk melindungi keanekaragaman hayati, memulihkan ekosistem yang terdegradasi, dan mendidik masyarakat tentang pentingnya berkontribusi dalam upaya pelestarian alam.
                        </p>
                        <p>
                        Diprakarsai oleh alhm. Bapak Suhadi Pangestu, Lembaga ini telah disahkan secara hukum melalui surat pengesahan Kementrian Hukum dan Hak Asasi Manusia Republik Indonesia dengan nomor AHU-0000411.AH.01.07.TAHUN 2022 dengan Akta Notaris no. 06 tanggal 23 Juni 2021 yang didirikan berazaskan Pancasila dan Undang-undang Dasar Negara Republik Indonesia 1945 yang bertujuan social dalam menjaga, mengawasi dan memberikan edukasi serta solusi terhadap segala permasalahan lingkungan demi menciptakan lingkungan alam yang Lestari dan berkesinambungan. Melalui kolaborasi dengan pemerintah, lembaga swadaya masyarakat, sektor bisnis, dan masyarakat umum, kami telah berhasil melaksanakan sejumlah inisiatif yang signifikan dalam upaya kami untuk mengatasi tantangan lingkungan yang semakin kompleks.
                        </p>
                        <p>
                        Dukungan yang kami terima dari para donatur, sukarelawan, dan mitra telah memungkinkan kami untuk meraih berbagai pencapaian yang membanggakan dalam upaya pelestarian alam. Namun, kami sadar bahwa perjalanan ini masih jauh dari selesai, dan kami berkomitmen untuk terus bekerja keras demi menciptakan sebuah dunia di mana manusia dan alam dapat hidup berdampingan dalam harmoni.
                        </p>
                        <p>
                        Dengan dorongan semangat dan dukungan yang terus-menerus dari seluruh pihak, Indonesiaku Hijau Lestari yakin bahwa kita dapat mencapai tujuan bersama dalam melestarikan lingkungan hidup untuk generasi mendatang.
                        </p>
                    </div>
                );
            case "visi misi":
                return (
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">VISI</h2>
                        <p className="mb-6">
                            Menciptakan sebuah dunia di mana manusia hidup beriringan dengan alam, memelihara keanekaragaman hayati, dan mengurangi jejak ekologis.
                        </p>

                        <h2 className="text-3xl font-bold mb-4">MISI</h2>
                        <ol className="list-decimal list-inside">
                            <li className="mb-4">
                                <span className="font-bold">Konservasi dan Perlindungan:</span> Melindungi ekosistem alami dan spesies yang terancam punah melalui langkah-langkah konservasi yang holistik.
                            </li>
                            <li className="mb-4">
                                <span className="font-bold">Pendidikan dan Kesadaran:</span> Memberikan pemahaman yang mendalam kepada masyarakat tentang pentingnya menjaga lingkungan hidup dan bagaimana setiap individu dapat berkontribusi serta membangun masyarakat yang mandiri melalui pengembangan pribadi yang berbasis sumber daya alam dengan cara yang baik dan benar.
                            </li>
                            <li className="mb-4">
                                <span className="font-bold">Restorasi Lingkungan:</span> Mengembalikan ekosistem yang rusak melalui kegiatan restorasi lahan, pembersihan pantai, dan rehabilitasi habitat alami.
                            </li>
                            <li className="mb-4">
                                <span className="font-bold">Kebijakan Lingkungan:</span> Membangun jejaring advokasi untuk mendorong kebijakan publik yang pro-lingkungan, termasuk legislasi perlindungan alam, tata ruang, dan pengelolaan sumber daya yang berkelanjutan terutama yang terkait dengan sumber-sumber alam di wilayah Republik Indonesia.
                            </li>
                            <li className="mb-4">
                                <span className="font-bold">Kemitraan Kolaboratif:</span> Bekerja sama dengan pemerintah, perusahaan, lembaga pendidikan, dan organisasi non-profit lainnya untuk mencapai tujuan bersama dalam pelestarian lingkungan hidup.
                            </li>
                            <li className="mb-4">
                                <span className="font-bold">Menciptakan Kaderisasi:</span> Menumbuhkan kaderisasi yang handal dan kritis demi menjaga kelestarian lingkungan serta menumbuhkan rasa nasionalisme dan cinta terhadap bangsa dan negara melalui penjagaan dan pelestarian sumber daya alam.
                            </li>
                        </ol>
                    </div>
                );
            case "ad":
                return (
                    <div className="max-w-3xl mx-auto">
                        <iframe src="assets/pdf/ad.pdf" width="100%" height="600px"></iframe>
                    </div>
                );
            case "struktur":
                return (
                    <div className="max-w-3xl mx-auto">
                        <MapInteractionCSS>
                            <img src="assets/images/struktur.png" alt="Logo"/>
                        </MapInteractionCSS>
                    </div>
                );
        }
    };

    const handleAdClick = () => {
        const password = "officialihl";
        const enteredPassword = prompt("Please enter the password to view Anggaran Dasar:");

        if (enteredPassword === password) {
            setIsPasswordValid(true);
            setActiveContent("ad");
        } else {
            alert("Incorrect password!");
        }
    };

    return (
        <HomeLayout>
            <div className="w-full min-h-screen xl:px-32 xl:py-10">
                <div className="grid grid-cols-1 xl:grid-cols-6 gap-4">
                    <div className="xl:col-span-2 bg-white p-4">
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
                                    onClick={handleAdClick}
                                    className={`w-full text-left py-2 px-4 rounded ${activeContent === "ad" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                                >
                                    Anggaran Dasar
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
                        </ul>
                    </div>
                    <div className="xl:col-span-4 bg-white p-4">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
