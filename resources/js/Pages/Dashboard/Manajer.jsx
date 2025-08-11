import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

export default function ManajerDashboard({
    auth,
    stats,
    customerComposition,
    recentFeedbacks,
    pelangganList,
    averagePowerUsage,
}) {
    const pieData = Object.entries(customerComposition).map(
        ([name, value]) => ({ name, value })
    );
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
            default:
                return "bg-blue-100 text-blue-800";
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard Manajer
                </h2>
            }
        >
            <Head title="Dashboard Manajer" />
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
                            title="Anomali Terdeteksi"
                            value={stats.total_anomali}
                            link="#"
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
                            <div className="overflow-auto max-h-72">
                                <ul className="divide-y divide-gray-200">
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
        red: "text-red-600",
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
