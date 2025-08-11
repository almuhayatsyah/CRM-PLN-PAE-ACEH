import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

export default function StaffDashboard({
    auth,
    jadwalKunjungan,
    feedbackBaru,
    pelangganList,
    teganganComposition,
}) {
    const getStatusBadge = (status) => {
        switch (status) {
            case "Selesai":
                return "bg-green-100 text-green-800";
            case "Dijadwalkan":
                return "bg-blue-100 text-blue-800";
            case "Diproses":
                return "bg-yellow-100 text-yellow-800";
            case "Diterima":
            default:
                return "bg-orange-100 text-orange-800";
        }
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 11) return "Selamat pagi";
        if (hour >= 11 && hour < 15) return "Selamat siang";
        if (hour >= 15 && hour < 18) return "Selamat sore";
        return "Selamat malam";
    };

    const pieData = teganganComposition
        ? Object.entries(teganganComposition).map(([name, value]) => ({
              name,
              value,
          }))
        : [];
    const totalPie = pieData.reduce(
        (sum, d) => sum + (Number(d.value) || 0),
        0
    );
    const COLORS = ["#0088FE", "#FF8042"]; // TM, TT

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard Staff
                </h2>
            }
        >
            <div className="modern-card p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold gradient-text mb-2">
                            {getGreeting()}, {auth.user.name}! 👋
                            <p className="text-lg text-gray-600">
                                Anda Login Sebagai Staff
                            </p>
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Selamat datang di CRM PAE Aceh. Kelola aktivitas
                            Anda dengan mudah.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                            <svg
                                className="w-12 h-12 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <Head title="Dashboard Staff" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* --- KARTU JADWAL KUNJUNGAN --- */}
                        <div className="bg-white shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Jadwal Kunjungan Mendatang
                            </h3>
                            <div className="space-y-4">
                                {jadwalKunjungan.length > 0 ? (
                                    jadwalKunjungan.map((kunjungan) => (
                                        <div
                                            key={kunjungan.id}
                                            className="p-3 bg-gray-50 rounded-lg border"
                                        >
                                            <p className="text-sm font-semibold text-blue-600">
                                                <Link
                                                    href={route(
                                                        "pelanggan.show",
                                                        kunjungan.pelanggan.id
                                                    )}
                                                >
                                                    {
                                                        kunjungan.pelanggan
                                                            .nama_perusahaan
                                                    }
                                                </Link>
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                {kunjungan.tujuan}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(
                                                    kunjungan.tanggal
                                                ).toLocaleString("id-ID", {
                                                    dateStyle: "full",
                                                    timeStyle: "short",
                                                })}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500 text-center py-4">
                                        Tidak ada jadwal kunjungan mendatang.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* --- KARTU FEEDBACK BARU --- */}
                        <div className="bg-white shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Feedback Perlu Tindak Lanjut
                            </h3>
                            <div className="space-y-4">
                                {feedbackBaru.length > 0 ? (
                                    feedbackBaru.map((feedback) => (
                                        <div
                                            key={feedback.id}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                                        >
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {
                                                        feedback.pelanggan
                                                            .nama_perusahaan
                                                    }
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Skor: {feedback.skor}/5
                                                </p>
                                            </div>
                                            <Link
                                                href={route(
                                                    "feedback.edit",
                                                    feedback.id
                                                )}
                                                className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                                                    feedback.status
                                                )}`}
                                            >
                                                {feedback.status}
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500 text-center py-4">
                                        Tidak ada feedback baru.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* --- KOMPOSISI TEGANGAN TM/TT --- */}
                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
                                Komposisi Pelanggan (TM vs TT)
                            </h3>
                            {totalPie > 0 ? (
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            nameKey="name"
                                            label={({ name, percent }) =>
                                                `${name}: ${(
                                                    percent * 100
                                                ).toFixed(0)}%`
                                            }
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        COLORS[
                                                            index %
                                                                COLORS.length
                                                        ]
                                                    }
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="text-center text-sm text-gray-500 py-10">
                                    Data belum tersedia untuk ditampilkan.
                                </div>
                            )}
                        </div>

                        {/* --- DAFTAR PELANGGAN TERDAFTAR --- */}
                        <div className="bg-white shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Pelanggan Terdaftar
                            </h3>
                            <div className="overflow-auto max-h-50">
                                <ul className="divide-y divide-gray-150">
                                    {pelangganList &&
                                    pelangganList.length > 0 ? (
                                        pelangganList.map((pelanggan) => (
                                            <li
                                                key={pelanggan.id}
                                                className="py-2"
                                            >
                                                <Link
                                                    href={route(
                                                        "pelanggan.show",
                                                        pelanggan.id
                                                    )}
                                                    className="text-sm text-blue-600 hover:underline"
                                                >
                                                    {pelanggan.nama_perusahaan}
                                                </Link>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-sm text-gray-500">
                                            Tidak ada perusahaan terdaftar.
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
