import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function AdminDashboard({
    auth,
    stats,
    customerComposition,
    recentFeedbacks,
    pelangganList,
    averagePowerUsage,
}) {
    // Data dan warna untuk Pie Chart
    const pieData = Object.entries(customerComposition).map(
        ([name, value]) => ({ name, value })
    );
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    // Menyiapkan data untuk Bar Chart
    const barChartData = averagePowerUsage.map((item) => ({
        name: item.bulan_tahun,
        "Rata-rata Pemakaian (kWh)": parseFloat(item.rata_rata_kwh).toFixed(2),
    }));

    const getStatusBadge = (status) => {
        switch (status) {
            case "Selesai":
                return "bg-green-100 text-green-800";
            case "Diproses":
                return "bg-yellow-100 text-yellow-800";
            case "Diterima":
            default:
                return "bg-blue-100 text-blue-800";
        }
    };

    // Fungsi untuk menentukan ucapan waktu
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 11) return "Selamat pagi";
        if (hour >= 11 && hour < 15) return "Selamat siang";
        if (hour >= 15 && hour < 18) return "Selamat sore";
        return "Selamat malam";
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard Admin
                </h2>
            }
        >
            <div className="modern-card p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold gradient-text mb-2">
                            {getGreeting()}, {auth.user.name}! 👋
                            <p className="text-lg text-gray-600">
                                Anda Login Sebagai Admin
                            </p>
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Selamat datang di CRM PAE Aceh. Kelola pelanggan dan
                            aktivitas Anda dengan mudah.
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

            <Head title="Dashboard Admin" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* --- KARTU STATISTIK --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <StatCard
                            title="Total Pelanggan"
                            value={stats.total_pelanggan}
                            link={route("pelanggan.index")}
                            color="blue"
                        />
                        <StatCard
                            title="Total Pengguna"
                            value={stats.total_user}
                            link={route("users.index")}
                            color="purple"
                        />
                        <StatCard
                            title="Feedback Baru"
                            value={stats.feedback_baru}
                            link={route("feedback.index")}
                            color="green"
                        />
                        <StatCard
                            title="Kunjungan Terjadwal"
                            value={stats.kunjungan_terjadwal}
                            link="#"
                            color="yellow"
                        />

                        <StatCard
                            title="Anomali Daya Terdeteksi"
                            value={stats.total_anomali}
                            link={route("analisis.pemakaian-daya")}
                            color="red"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* --- GRAFIK KOMPOSISI PELANGGAN --- */}
                        <div className="bg-white shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
                                Komposisi Pelanggan
                            </h3>
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
                                            `${name}: ${(percent * 100).toFixed(
                                                0
                                            )}%`
                                        }
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    COLORS[
                                                        index % COLORS.length
                                                    ]
                                                }
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* --- DAFTAR PELANGGAN TERDAFTAR --- */}
                        <div className="lg:col-span-2 bg-white shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Pelanggan Terdaftar
                            </h3>
                            <div className="overflow-auto max-h-50">
                                <ul className="divide-y divide-gray-150">
                                    {pelangganList.length > 0 ? (
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

                    {/* --- GRAFIK RATA-RATA PEMAKAIAN DAYA --- */}
                    <div className="mt-6 bg-white shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Rata-rata Pemakaian Daya per Bulan
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="Rata-rata Pemakaian (kWh)"
                                    fill="#8884d8"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Komponen kecil untuk kartu statistik
const StatCard = ({ title, value, link, color }) => {
    const colors = {
        blue: "text-blue-600",
        purple: "text-purple-600",
        green: "text-green-600",
        yellow: "text-yellow-600",
    };
    return (
        <div className="bg-white shadow-sm rounded-lg p-6 text-center">
            <div className={`text-4xl font-bold ${colors[color]}`}>{value}</div>
            <div className="mt-2 text-gray-600">{title}</div>
            <Link
                href={link}
                className={`text-sm mt-4 block font-medium ${colors[color]} hover:underline`}
            >
                Lihat Detail &rarr;
            </Link>
        </div>
    );
};
