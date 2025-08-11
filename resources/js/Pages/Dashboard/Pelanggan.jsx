import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
// Contoh: gunakan chart dari Recharts
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return "Selamat pagi";
    if (hour >= 11 && hour < 15) return "Selamat siang";
    if (hour >= 15 && hour < 18) return "Selamat sore";
    return "Selamat malam";
};

export default function PelangganDashboard({ auth, pelanggan }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        skor: "",
        komentar: "",
        pelanggan_id: pelanggan.id,
    });

    const submitFeedback = (e) => {
        e.preventDefault();
        post(route("feedback.store"), {
            preserveScroll: true,
            onSuccess: () => reset("skor", "komentar"),
        });
    };

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

    // Data chart contoh dari pemakaian daya
    const chartData =
        pelanggan.pemakaian_dayas?.map((d) => ({
            name: d.bulan_tahun,
            kwh: d.pemakaian_kwh,
            beban: d.beban_puncak || 0,
        })) || [];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Portal Pelanggan Prioritas
                </h2>
            }
        >
            <Head title="Dashboard Pelanggan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    <div className="modern-card p-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold gradient-text mb-2">
                                    {getGreeting()}, {auth.user.name}! 👋
                                    <p className="text-lg text-gray-600">
                                        Anda Login Sebagai Pelanggan Prioritas
                                        Kami 👤
                                    </p>
                                </h1>
                                <p className="text-gray-600 text-lg">
                                    Selamat datang di CRM Portal PLN UID Aceh.
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
                    {/* --- Profil Perusahaan --- */}
                    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
                            Profil Perusahaan Anda
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500 font-medium">
                                    ID Pelanggan
                                </span>
                                <span className="text-gray-900">
                                    {pelanggan.id_pel}
                                </span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500 font-medium">
                                    Nama Perusahaan
                                </span>
                                <span className="text-gray-900">
                                    {pelanggan.nama_perusahaan}
                                </span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500 font-medium">
                                    Alamat Perusahaan
                                </span>
                                <span className="text-gray-900">
                                    {pelanggan.alamat_perusahaan}
                                </span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500 font-medium">
                                    Kontak PIC
                                </span>
                                <span className="text-gray-900">
                                    {pelanggan.nama} ({pelanggan.kontak})
                                </span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500 font-medium">
                                    Kapasitas Daya
                                </span>
                                <span className="text-gray-900">
                                    {new Intl.NumberFormat("id-ID").format(
                                        pelanggan.kapasitas_daya
                                    )}{" "}
                                    KVA
                                </span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500 font-medium">
                                    Tarif
                                </span>
                                <span className="text-gray-900">
                                    {pelanggan.tarif}
                                </span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500 font-medium">
                                    UP3
                                </span>
                                <span className="text-gray-900">
                                    {pelanggan.up3}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 font-medium">
                                    ULP
                                </span>
                                <span className="text-gray-900">
                                    {pelanggan.ulp}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* --- Chart Pemakaian Daya --- */}
                    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-6">
                            Grafik Pemakaian Daya
                        </h3>
                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={chartData}>
                                    <CartesianGrid
                                        stroke="#e5e7eb"
                                        strokeDasharray="5 5"
                                    />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="kwh"
                                        stroke="#2563eb"
                                        strokeWidth={2}
                                        name="Pemakaian kWh"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="beban"
                                        stroke="#f59e0b"
                                        strokeWidth={2}
                                        name="Beban Puncak kW"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-gray-500 text-center py-10">
                                Belum ada data pemakaian daya.
                            </p>
                        )}
                    </div>

                    {/* --- Riwayat Pemakaian Daya (Tabel) --- */}
                    <div className="bg-white shadow-md rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
                            Tabel Riwayat Pemakaian Daya
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="border-b bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                                            Bulan & Tahun
                                        </th>
                                        <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                                            Pemakaian (kWh)
                                        </th>
                                        <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                                            Beban Puncak (kW)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pelanggan.pemakaian_dayas?.length > 0 ? (
                                        pelanggan.pemakaian_dayas.map(
                                            (daya) => (
                                                <tr
                                                    key={daya.id}
                                                    className={`border-b hover:bg-gray-50 ${
                                                        daya.flag_anomali
                                                            ? "bg-red-50"
                                                            : ""
                                                    }`}
                                                >
                                                    <td className="px-6 py-4">
                                                        {daya.bulan_tahun}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {new Intl.NumberFormat(
                                                            "id-ID"
                                                        ).format(
                                                            daya.pemakaian_kwh
                                                        )}
                                                        {daya.flag_anomali && (
                                                            <span className="ml-2 text-xs text-red-600 font-semibold">
                                                                (Anomali)
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {daya.beban_puncak
                                                            ? new Intl.NumberFormat(
                                                                  "id-ID"
                                                              ).format(
                                                                  daya.beban_puncak
                                                              )
                                                            : "-"}
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="3"
                                                className="px-6 py-4 text-center text-gray-500"
                                            >
                                                Belum ada data pemakaian daya.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* --- Form Feedback --- */}
                    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
                            Kirim Feedback Layanan
                        </h3>
                        <form onSubmit={submitFeedback} className="space-y-6">
                            <div>
                                <InputLabel
                                    htmlFor="skor"
                                    value="Skor Kepuasan (1-5)⭐"
                                />
                                <input
                                    id="skor"
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={data.skor}
                                    onChange={(e) =>
                                        setData("skor", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.skor}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="komentar"
                                    value="Komentar Anda"
                                />
                                <textarea
                                    id="komentar"
                                    value={data.komentar}
                                    onChange={(e) =>
                                        setData("komentar", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    rows="3"
                                />
                                <InputError
                                    message={errors.komentar}
                                    className="mt-2"
                                />
                            </div>
                            <PrimaryButton disabled={processing}>
                                Kirim Feedback
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
