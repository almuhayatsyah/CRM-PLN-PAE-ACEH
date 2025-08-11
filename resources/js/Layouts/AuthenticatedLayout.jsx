import Dropdown from "@/Components/Dropdown";
import NotificationDropdown from "@/Components/NotificationDropdown";
import Sidebar from "@/Components/Sidebar";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AuthenticatedLayout({ header, children }) {
    const { auth, flash } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    success: {
                        duration: 3000,
                        style: {
                            background:
                                "linear-gradient(135deg, #10b981, #059669)",
                            color: "white",
                            borderRadius: "16px",
                            boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)",
                        },
                    },
                    error: {
                        duration: 5000,
                        style: {
                            background:
                                "linear-gradient(135deg, #ef4444, #dc2626)",
                            color: "white",
                            borderRadius: "16px",
                            boxShadow: "0 10px 25px rgba(239, 68, 68, 0.3)",
                        },
                    },
                }}
            />

            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:hidden"
                />
            )}

            <div className="sm:ml-64 transition-all duration-300">
                <nav className="glass-effect border-b border-white/20 shadow-lg sticky top-0 z-30">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        {/* LEFT: Hamburger + Logo */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="sm:hidden rounded-xl p-2 hover:bg-white/50 transition-all duration-300 hover:shadow-lg"
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
                        </div>

                        {/* RIGHT: Notif + User Dropdown */}
                        <div className="flex items-center space-x-4">
                            <NotificationDropdown />

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-xl">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-xl border border-white/20 bg-white/50 backdrop-blur-sm px-4 py-2 text-sm font-medium leading-4 text-gray-700 transition-all duration-300 hover:bg-white/70 hover:shadow-lg focus:outline-none"
                                        >
                                            <img
                                                src={
                                                    auth.user.profile_photo_url
                                                }
                                                alt={auth.user.name}
                                                className="h-8 w-8 rounded-full object-cover mr-3 ring-2 ring-white/50"
                                            />

                                            <span className="font-medium">
                                                {auth.user.name}
                                            </span>

                                            <svg
                                                className="-me-0.5 ms-2 h-4 w-4 transition-transform duration-200"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </nav>

                <main className="p-6 sm:p-8">
                    {header && (
                        <div className="mb-8 text-2xl font-bold gradient-text">
                            {header}
                        </div>
                    )}

                    {children}
                </main>
            </div>
        </div>
    );
}
