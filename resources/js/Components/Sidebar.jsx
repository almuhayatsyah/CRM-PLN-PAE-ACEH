import NavLink from "@/Components/NavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Sidebar({ isOpen, setIsOpen }) {
    const { auth } = usePage().props;
    const [expandedMenus, setExpandedMenus] = useState({
        pelanggan: false,
        monitoring: false,
        laporan: false,
        users: false,
    });

    const hasRole = (roleName) =>
        auth.user?.roles?.some((role) => role === roleName);

    const isAdmin = hasRole("Admin");
    const isManajer = hasRole("Manajer");
    const isStaff = hasRole("Staff");

    const toggleMenu = (menuKey) => {
        setExpandedMenus((prev) => ({
            ...prev,
            [menuKey]: !prev[menuKey],
        }));
    };

    return (
        <>
            {/* --- HAMBURGER MOBILE BUTTON (Fixed top-left) --- */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 left-4 z-50 rounded-xl bg-white/90 backdrop-blur-md p-3 shadow-xl shadow-gray-900/10 border border-white/20 sm:hidden hover:bg-white hover:shadow-2xl transition-all duration-300"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-700"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </button>

            {/* --- OVERLAY MOBILE --- */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:hidden"
                />
            )}

            {/* --- SIDEBAR --- */}
            <aside
                className={`fixed left-0 top-0 z-50 h-screen w-64 bg-white shadow-lg border-r border-gray-200 transform transition-all duration-300 ease-out
                ${
                    isOpen
                        ? "translate-x-0"
                        : "-translate-x-full sm:translate-x-0"
                }
            `}
            >
                {/* --- LOGO HEADER --- */}
                <div className="flex flex-col items-center justify-center p-6 border-b border-gray-200 bg-gradient-to-br from-white to-gray-50">
                    <Link href="/" className="flex flex-col items-center group">
                        <div className="relative">
                            <img
                                src="/images/logo-pln.png"
                                alt="Logo PLN"
                                className="h-12 w-auto transition-all duration-300 group-hover:scale-110 drop-shadow-lg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
                        </div>
                        <span className="mt-2 text-xs font-bold text-blue-600 tracking-wide">
                            CRM PAE ACEH
                        </span>
                    </Link>
                </div>

                {/* --- MENU --- */}
                <div
                    className="h-full overflow-y-auto px-3 py-4"
                    style={{
                        maxHeight: "calc(100vh - 80px)",
                        scrollbarWidth: "thin",
                    }}
                >
                    <ul className="space-y-4 font-medium">
                        {/* Dashboard - Always Visible */}
                        <li className="mb-4">
                            <NavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                                className={({ isActive }) =>
                                    `!border-none !px-0 !pt-0 relative flex items-center p-3 rounded-xl transition-all duration-300 group hover:shadow-lg hover:-translate-y-0.5
                                    ${
                                        isActive
                                            ? "!text-blue-600 bg-blue-50 border border-blue-200 shadow-sm"
                                            : "!text-gray-700 bg-white hover:bg-gray-50 hover:!text-blue-600 border border-gray-200 hover:border-blue-200 shadow-sm"
                                    }`
                                }
                            >
                                {route().current("dashboard") && (
                                    <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r-full"></div>
                                )}
                                <svg
                                    className="w-5 h-5 mr-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
                                    />
                                </svg>
                                <span className="font-medium">Dashboard</span>
                            </NavLink>
                        </li>

                        {/* Manajemen Pelanggan - Dropdown */}
                        {(isAdmin || isStaff || isManajer) && (
                            <li>
                                <button
                                    onClick={() => toggleMenu("pelanggan")}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group hover:shadow-lg hover:-translate-y-0.5
                                    ${
                                        expandedMenus.pelanggan ||
                                        route().current("pelanggan.*")
                                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50"
                                            : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600"
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        <span className="font-medium">
                                            Pelanggan
                                        </span>
                                    </div>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-300 ${
                                            expandedMenus.pelanggan
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {/* Dropdown Content */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                        expandedMenus.pelanggan
                                            ? "max-h-40 opacity-100"
                                            : "max-h-0 opacity-0"
                                    }`}
                                >
                                    <ul className="mt-2 space-y-1 pl-8">
                                        <li>
                                            <NavLink
                                                href={route("pelanggan.index")}
                                                active={route().current(
                                                    "pelanggan.index"
                                                )}
                                                className={({ isActive }) =>
                                                    `flex items-center p-2 rounded-lg transition-all duration-200 text-sm
                                                    ${
                                                        isActive
                                                            ? "bg-blue-100 text-blue-600 font-semibold"
                                                            : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                                    }`
                                                }
                                            >
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                                    />
                                                </svg>
                                                Daftar Pelanggan
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                href={route("pelanggan.create")}
                                                active={route().current(
                                                    "pelanggan.create"
                                                )}
                                                className={({ isActive }) =>
                                                    `flex items-center p-2 rounded-lg transition-all duration-200 text-sm
                                                    ${
                                                        isActive
                                                            ? "bg-blue-100 text-blue-600 font-semibold"
                                                            : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                                    }`
                                                }
                                            >
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                    />
                                                </svg>
                                                Tambah Pelanggan
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        )}

                        {/* Aktivitas Saya - Khusus Staff */}
                        {isStaff && (
                            <li>
                                <div className="px-3 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                    Aktivitas Saya
                                </div>
                                <ul className="mt-2 space-y-1">
                                    <li>
                                        <NavLink
                                            href={route("feedback.index")}
                                            active={route().current(
                                                "feedback.*"
                                            )}
                                            className={({ isActive }) =>
                                                `flex items-center p-3 rounded-xl transition-all duration-200 text-sm border
                                                ${
                                                    isActive
                                                        ? "bg-blue-50 text-blue-600 border-blue-200"
                                                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600 border-gray-200"
                                                }`
                                            }
                                        >
                                            <svg
                                                className="w-4 h-4 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                                />
                                            </svg>
                                            Feedback Masuk
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            href={route(
                                                "jadwal-kunjungan.index"
                                            )}
                                            active={route().current(
                                                "jadwal-kunjungan.*"
                                            )}
                                            className={({ isActive }) =>
                                                `flex items-center p-3 rounded-xl transition-all duration-200 text-sm border
                                                ${
                                                    isActive
                                                        ? "bg-blue-50 text-blue-600 border-blue-200"
                                                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600 border-gray-200"
                                                }`
                                            }
                                        >
                                            <svg
                                                className="w-4 h-4 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            Jadwal Kunjungan
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            href={route("interaksi.index")}
                                            active={route().current(
                                                "interaksi.*"
                                            )}
                                            className={({ isActive }) =>
                                                `flex items-center p-3 rounded-xl transition-all duration-200 text-sm border
                                                ${
                                                    isActive
                                                        ? "bg-blue-50 text-blue-600 border-blue-200"
                                                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600 border-gray-200"
                                                }`
                                            }
                                        >
                                            <svg
                                                className="w-4 h-4 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                                />
                                            </svg>
                                            Interaksi
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            href={route("notifikasi.index")}
                                            active={route().current(
                                                "notifikasi.index"
                                            )}
                                            className={({ isActive }) =>
                                                `flex items-center p-3 rounded-xl transition-all duration-200 text-sm border
                                                ${
                                                    isActive
                                                        ? "bg-blue-50 text-blue-600 border-blue-200"
                                                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600 border-gray-200"
                                                }`
                                            }
                                        >
                                            <svg
                                                className="w-4 h-4 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                                />
                                            </svg>
                                            Notifikasi
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                        )}

                        {/* Monitoring Aktivitas - Dropdown */}
                        {(isAdmin || isManajer) && (
                            <li>
                                <button
                                    onClick={() => toggleMenu("monitoring")}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group hover:shadow-lg hover:-translate-y-0.5
                                    ${
                                        expandedMenus.monitoring ||
                                        route().current("feedback.*") ||
                                        route().current("interaksi.*") ||
                                        route().current("jadwal-kunjungan.*")
                                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50"
                                            : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600"
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                            />
                                        </svg>
                                        <span className="font-medium">
                                            Aktivitas Staff
                                        </span>
                                    </div>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-300 ${
                                            expandedMenus.monitoring
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {/* Dropdown Content */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                        expandedMenus.monitoring
                                            ? "max-h-60 opacity-100"
                                            : "max-h-0 opacity-0"
                                    }`}
                                >
                                    <ul className="mt-2 space-y-1 pl-8">
                                        <li>
                                            <NavLink
                                                href={route("feedback.index")}
                                                active={route().current(
                                                    "feedback.*"
                                                )}
                                                className={({ isActive }) =>
                                                    `flex items-center p-2 rounded-lg transition-all duration-200 text-sm
                                                    ${
                                                        isActive
                                                            ? "bg-blue-100 text-blue-600 font-semibold"
                                                            : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                                    }`
                                                }
                                            >
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                                    />
                                                </svg>
                                                Feedback
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                href={route("interaksi.index")}
                                                active={route().current(
                                                    "interaksi.*"
                                                )}
                                                className={({ isActive }) =>
                                                    `flex items-center p-2 rounded-lg transition-all duration-200 text-sm
                                                    ${
                                                        isActive
                                                            ? "bg-blue-100 text-blue-600 font-semibold"
                                                            : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                                    }`
                                                }
                                            >
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                                    />
                                                </svg>
                                                Interaksi
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                href={route(
                                                    "jadwal-kunjungan.index"
                                                )}
                                                active={route().current(
                                                    "jadwal-kunjungan.*"
                                                )}
                                                className={({ isActive }) =>
                                                    `flex items-center p-2 rounded-lg transition-all duration-200 text-sm
                                                    ${
                                                        isActive
                                                            ? "bg-blue-100 text-blue-600 font-semibold"
                                                            : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                                    }`
                                                }
                                            >
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                Jadwal Kunjungan
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                href={route(
                                                    "pemakaian-daya.index"
                                                )}
                                                active={route().current(
                                                    "pemakaian-daya.*"
                                                )}
                                                className={({ isActive }) =>
                                                    `flex items-center p-2 rounded-lg transition-all duration-200 text-sm
                                                    ${
                                                        isActive
                                                            ? "bg-blue-100 text-blue-600 font-semibold"
                                                            : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                                    }`
                                                }
                                            >
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                                    />
                                                </svg>
                                                Pemakaian Daya
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        )}

                        {/* Laporan & Analitik - Dropdown */}
                        {(isAdmin || isManajer || isStaff) && (
                            <li>
                                <button
                                    onClick={() => toggleMenu("laporan")}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group hover:shadow-lg hover:-translate-y-0.5
                                    ${
                                        expandedMenus.laporan ||
                                        route().current("laporan.*")
                                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50"
                                            : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600"
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                        <span className="font-medium">
                                            Laporan
                                        </span>
                                    </div>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-300 ${
                                            expandedMenus.laporan
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {/* Dropdown Content */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                        expandedMenus.laporan
                                            ? "max-h-40 opacity-100"
                                            : "max-h-0 opacity-0"
                                    }`}
                                >
                                    <ul className="mt-2 space-y-1 pl-8">
                                        <li>
                                            <NavLink
                                                href={route("laporan.index")}
                                                active={route().current(
                                                    "laporan.index"
                                                )}
                                                className={({ isActive }) =>
                                                    `flex items-center p-2 rounded-lg transition-all duration-200 text-sm
                                                    ${
                                                        isActive
                                                            ? "bg-blue-100 text-blue-600 font-semibold"
                                                            : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                                    }`
                                                }
                                            >
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                    />
                                                </svg>
                                                Export Laporan
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                href={route(
                                                    "analisis.pemakaian-daya"
                                                )}
                                                active={route().current(
                                                    "analisis.pemakaian-daya"
                                                )}
                                                className={({ isActive }) =>
                                                    `flex items-center p-2 rounded-lg transition-all duration-200 text-sm
                                                    ${
                                                        isActive
                                                            ? "bg-blue-100 text-blue-600 font-semibold"
                                                            : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                                    }`
                                                }
                                            >
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                    />
                                                </svg>
                                                Analisis Daya
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        )}

                        {/* Manajemen Pengguna - Dropdown */}
                        {isAdmin && (
                            <li>
                                <button
                                    onClick={() => toggleMenu("users")}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group hover:shadow-lg hover:-translate-y-0.5
                                    ${
                                        expandedMenus.users ||
                                        route().current("users.*")
                                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50"
                                            : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600"
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-4a4 4 0 11-8 0 4 4 0 018 0z"
                                            />
                                        </svg>
                                        <span className="font-medium">
                                            Users
                                        </span>
                                    </div>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-300 ${
                                            expandedMenus.users
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {/* Dropdown Content */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                        expandedMenus.users
                                            ? "max-h-40 opacity-100"
                                            : "max-h-0 opacity-0"
                                    }`}
                                >
                                    <ul className="mt-2 space-y-1 pl-8">
                                        <li>
                                            <NavLink
                                                href={route("users.index")}
                                                active={route().current(
                                                    "users.index"
                                                )}
                                                className={({ isActive }) =>
                                                    `flex items-center p-2 rounded-lg transition-all duration-200 text-sm
                                                    ${
                                                        isActive
                                                            ? "bg-blue-100 text-blue-600 font-semibold"
                                                            : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                                    }`
                                                }
                                            >
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                    />
                                                </svg>
                                                Daftar Users
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                href={route("users.create")}
                                                active={route().current(
                                                    "users.create"
                                                )}
                                                className={({ isActive }) =>
                                                    `flex items-center p-2 rounded-lg transition-all duration-200 text-sm
                                                    ${
                                                        isActive
                                                            ? "bg-blue-100 text-blue-600 font-semibold"
                                                            : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                                    }`
                                                }
                                            >
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                                    />
                                                </svg>
                                                Tambah User
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </aside>
        </>
    );
}
