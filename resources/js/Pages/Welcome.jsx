import { Head, Link } from "@inertiajs/react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Welcome({ auth, pelanggans }) {
    useEffect(() => {
        AOS.init({ duration: 900, once: true });
        AOS.refresh();
    }, []);

    const features = [
        {
            name: "Manajemen Pelanggan Terpusat",
            description:
                "Kelola seluruh data pelanggan prioritas, riwayat interaksi, dan status layanan dalam satu platform yang terintegrasi.",
            icon: (
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
            ),
            aos: "fade-up",
        },
        {
            name: "Monitoring Aktivitas Real-time",
            description:
                "Pantau semua interaksi dan jadwal kunjungan tim secara langsung untuk evaluasi kinerja yang transparan.",
            icon: (
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                </svg>
            ),
            aos: "fade-up",
        },
        {
            name: "Pengelolaan Feedback Efektif",
            description:
                "Terima, kelola, dan tindak lanjuti setiap masukan pelanggan dengan cepat untuk meningkatkan kepuasan.",
            icon: (
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                </svg>
            ),
            aos: "fade-up",
        },
        {
            name: "Laporan Analitik Mendalam",
            description:
                "Hasilkan laporan komprehensif aktivitas tim dan feedback pelanggan. Ekspor ke PDF & Excel dengan mudah.",
            icon: (
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
            ),
            aos: "fade-up",
        },
        {
            name: "Notifikasi Proaktif",
            description:
                "Sistem otomatis mengingatkan tim akan tugas penting agar tidak ada hal yang terlewat.",
            icon: (
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                </svg>
            ),
            aos: "fade-up",
        },
        {
            name: "Portal Pelanggan Mandiri",
            description:
                "Pelanggan dapat mengakses riwayat layanan, memberi feedback, dan menerima notifikasi layanan.",
            icon: (
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            ),
            aos: "fade-up",
        },
    ];

    return (
        <>
            <Head title="CRM PAE Aceh - Priority Service" />
            <div className="bg-white text-gray-800">
                {/* Header */}
                <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-sm">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                        <div className="flex items-center">
                            <img
                                src="/images/logo-pln.png"
                                alt="CRM PLN Logo"
                                className="h-10 w-auto"
                            />
                            <span className="ml-3 text-xl font-bold text-blue-600">
                                CRM PAE ACEH
                            </span>
                        </div>
                        <nav className="flex items-center space-x-6">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2 font-medium text-white shadow-sm transition-all hover:shadow-md hover:from-blue-700 hover:to-blue-600"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route("login")}
                                    className="rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300 px-5 py-2 font-medium text-gray-900 shadow-sm transition-all hover:shadow-md hover:from-yellow-500 hover:to-yellow-400"
                                >
                                    Masuk
                                </Link>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative overflow-hidden min-h-[500px] flex items-center">
                    {/* Background Image with Overlay */}
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: "url('/images/foto_pln.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-white/90" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-24">
                        <div className="text-center" data-aos="fade-up">
                            <span className="inline-flex items-center rounded-full bg-white px-4 py-1 text-sm font-medium text-blue-600 shadow-md ring-1 ring-blue-100">
                                Layanan Prioritas PLN UID Aceh
                            </span>
                            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                                Sistem CRM{" "}
                                <span className="text-blue-500">
                                    Pelanggan Prioritas
                                </span>
                            </h1>
                            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-700">
                                Nikmati kemudahan layanan prioritas PLN UID
                                ACEH. Pelanggan dapat memantau layanan,
                                memberikan feedback, dan mengakses informasi
                                kapan saja.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                    href={route("login")}
                                    className="rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:from-blue-700 hover:to-blue-600"
                                    data-aos="zoom-in"
                                    data-aos-delay="200"
                                >
                                    Masuk ke Sistem
                                </Link>
                                <a
                                    href="#features"
                                    className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition flex items-center group"
                                >
                                    Lihat Fitur{" "}
                                    <span className="ml-1 group-hover:translate-x-1 transition-transform">
                                        →
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Features Section */}
                <section id="features" className="bg-white py-20 sm:py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div
                            className="mx-auto max-w-2xl text-center"
                            data-aos="fade-up"
                        >
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Fitur Unggulan
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                CRM PAE Aceh menghadirkan fitur-fitur modern
                                untuk kemudahan layanan pelanggan prioritas.
                            </p>
                        </div>
                        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="relative rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-200 hover:ring-blue-500 transition-all duration-300"
                                    data-aos={feature.aos}
                                    data-aos-delay={idx * 100}
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                        {feature.icon}
                                    </div>
                                    <h3 className="mt-6 text-lg font-semibold text-gray-900">
                                        {feature.name}
                                    </h3>
                                    <p className="mt-2 text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Customers Section */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <h2
                            className="text-3xl font-bold text-gray-900 mb-12 text-center"
                            data-aos="fade-up"
                        >
                            Daftar Pelanggan Prioritas Kami
                        </h2>

                        {pelanggans && pelanggans.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {pelanggans.map((pel) => (
                                    <div
                                        key={pel.id}
                                        className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                        data-aos="fade-up"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1.5}
                                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                                        />
                                                    </svg>
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-800">
                                                    {pel.nama_perusahaan}
                                                </h3>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-500 mb-2">
                                            <span className="font-medium">
                                                ID Pelanggan:
                                            </span>{" "}
                                            {pel.id_pel}
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {pel.sektor}
                                            </span>
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {pel.kapasitas_daya} kVA
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div
                                className="text-center py-12"
                                data-aos="fade-up"
                            >
                                <div className="mx-auto h-12 w-12 text-gray-400">
                                    <svg
                                        className="h-full w-full"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1}
                                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">
                                    Belum ada pelanggan terdaftar
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Daftar pelanggan akan muncul di sini
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 pt-20 pb-12">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <img
                                        src="/images/logo-pln.png"
                                        alt="CRM PLN Logo"
                                        className="h-10 w-auto"
                                    />
                                    <span className="ml-3 text-xl font-bold text-white">
                                        CRM PLN UID Aceh
                                    </span>
                                </div>
                                <p className="text-gray-400">
                                    Layanan prioritas untuk pelanggan eksklusif
                                    PLN Unit Induk Distribusi Aceh.
                                </p>
                                <div className="flex space-x-4">
                                    <a
                                        href="https://www.facebook.com/profile.php?id=100057241368943"
                                        className="text-gray-400 hover:text-white"
                                    >
                                        <span className="sr-only">
                                            Facebook
                                        </span>
                                        <svg
                                            className="h-6 w-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.instagram.com/plnaceh/"
                                        className="text-gray-400 hover:text-white"
                                    >
                                        <span className="sr-only">
                                            Instagram
                                        </span>
                                        <svg
                                            className="h-6 w-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://x.com/plnacehofficial"
                                        className="text-gray-400 hover:text-white"
                                    >
                                        <span className="sr-only">Twitter</span>
                                        <svg
                                            className="h-6 w-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                                        Tautan
                                    </h3>
                                    <ul className="mt-4 space-y-2">
                                        <li>
                                            <a
                                                href="#"
                                                className="text-base text-gray-400 hover:text-white"
                                            >
                                                Beranda
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#features"
                                                className="text-base text-gray-400 hover:text-white"
                                            >
                                                Fitur
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="text-base text-gray-400 hover:text-white"
                                            >
                                                Pelanggan
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                                        Legal
                                    </h3>
                                    <ul className="mt-4 space-y-2">
                                        <li>
                                            <a
                                                href="#"
                                                className="text-base text-gray-400 hover:text-white"
                                            >
                                                Kebijakan Privasi
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="text-base text-gray-400 hover:text-white"
                                            >
                                                Syarat & Ketentuan
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="text-base text-gray-400 hover:text-white"
                                            >
                                                FAQ
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                                    Hubungi Kami
                                </h3>
                                <address className="mt-4 not-italic text-gray-400">
                                    <p>Jl. Tgk. H. M. Daud Beureueh No. 172</p>
                                    <p>Banda Aceh, Aceh 23126</p>
                                    <p className="mt-4">
                                        Email:{" "}
                                        <a
                                            href="mailto:uid.aceh@pln.co.id"
                                            className="hover:text-white"
                                        >
                                            uid.aceh@pln.co.id
                                        </a>
                                    </p>
                                    <p>
                                        Telp:{" "}
                                        <a
                                            href="tel:+6265122122"
                                            className="hover:text-white"
                                        >
                                            (0651) 22122
                                        </a>
                                    </p>
                                </address>
                            </div>
                        </div>
                        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-400 text-sm">
                                &copy; {new Date().getFullYear()} CRM Priority
                                Account Executive. All rights reserved.
                            </p>
                            <p className="mt-4 md:mt-0 text-gray-400 text-sm">
                                Developer by{" "}
                                <a
                                    href="https://almuhayatsyah-portfolio-iota.vercel.app/"
                                    className="text-blue-400 hover:text-blue-300"
                                >
                                    Almuhayatsyah
                                </a>
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
