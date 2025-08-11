import { Link, usePage } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";

export default function NotificationDropdown() {
    // Ambil data auth untuk memeriksa peran
    const { auth, notifications } = usePage().props;
    const unreadCount = notifications.count;
    const unreadNotifications = notifications.unread;

    // Cek apakah pengguna yang login adalah Pelanggan
    const isPelanggan = auth.user?.roles?.some((role) => role === "Pelanggan");

    // Tentukan link tujuan berdasarkan peran
    const allNotificationsLink = isPelanggan
        ? route("dashboard")
        : route("feedback.index");

    return (
        <div className="relative ms-3">
            <Dropdown>
                <Dropdown.Trigger>
                    <button className="relative inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 hover:text-gray-700 focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                        {unreadCount > 0 && (
                            <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1 -right-1">
                                {unreadCount}
                            </div>
                        )}
                    </button>
                </Dropdown.Trigger>

                <Dropdown.Content align="right" width="w-80">
                    <div className="block px-4 py-2 text-xs text-gray-400">
                        Notifikasi Terbaru
                    </div>
                    {unreadNotifications.length > 0 ? (
                        unreadNotifications.map((notification) => (
                            <Dropdown.Link
                                key={notification.id}
                                href={route("notifikasi.read", notification.id)}
                            >
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-800">
                                        Feedback Baru
                                    </p>
                                    <p className="text-gray-600">
                                        {notification.pesan}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(
                                            notification.created_at
                                        ).toLocaleString("id-ID")}
                                    </p>
                                </div>
                            </Dropdown.Link>
                        ))
                    ) : (
                        <div className="px-4 py-3 text-sm text-center text-gray-500">
                            Tidak ada notifikasi baru.
                        </div>
                    )}
                    <div className="border-t border-gray-200">
                        <Dropdown.Link
                            href={allNotificationsLink}
                            className="text-center font-bold text-blue-600"
                        >
                            {isPelanggan
                                ? "Lihat Dashboard Saya"
                                : "Lihat Semua Feedback"}
                        </Dropdown.Link>
                    </div>
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
}
