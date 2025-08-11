import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, kunjungans }) {
    // Hitung jumlah kunjungan per status
    const statusCount = {
        Dijadwalkan: kunjungans.filter((k) => k.status === "Dijadwalkan")
            .length,
        Selesai: kunjungans.filter((k) => k.status === "Selesai").length,
        Batal: kunjungans.filter((k) => k.status === "Batal").length,
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "Selesai":
                return "bg-green-100 text-green-800";
            case "Dijadwalkan":
                return "bg-blue-100 text-blue-800";
            case "Batal":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Riwayat Kunjungan
                </h2>
            }
        >
            <Head title="Riwayat Kunjungan" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Card Statistik Status Kunjungan */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg shadow p-5 flex flex-col items-center">
                            <span className="text-sm text-blue-600 font-medium">
                                Dijadwalkan
                            </span>
                            <span className="text-3xl font-bold text-blue-800">
                                {statusCount.Dijadwalkan}
                            </span>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg shadow p-5 flex flex-col items-center">
                            <span className="text-sm text-green-600 font-medium">
                                Selesai
                            </span>
                            <span className="text-3xl font-bold text-green-800">
                                {statusCount.Selesai}
                            </span>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg shadow p-5 flex flex-col items-center">
                            <span className="text-sm text-red-600 font-medium">
                                Batal
                            </span>
                            <span className="text-3xl font-bold text-red-800">
                                {statusCount.Batal}
                            </span>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-xl p-6">
                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                            No.
                                        </th>
                                        <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                            Nama Pelanggan
                                        </th>
                                        <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                            Dijadwalkan Oleh
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {kunjungans.length > 0 ? (
                                        kunjungans.map((kunjungan, index) => (
                                            <tr
                                                key={kunjungan.id}
                                                className="hover:bg-gray-50 transition"
                                            >
                                                <td className="px-6 py-4">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {new Date(
                                                        kunjungan.tanggal
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "2-digit",
                                                            month: "long",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 font-medium text-blue-600 hover:underline">
                                                    <Link
                                                        href={route(
                                                            "pelanggan.show",
                                                            kunjungan.pelanggan
                                                                .id
                                                        )}
                                                    >
                                                        {kunjungan.pelanggan
                                                            ?.nama_perusahaan ||
                                                            "-"}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                                                            kunjungan.status
                                                        )}`}
                                                    >
                                                        {kunjungan.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {kunjungan.user?.name ||
                                                        "-"}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-6 py-8 text-center text-gray-500"
                                            >
                                                Belum ada data kunjungan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
