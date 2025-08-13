import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, pemakaianDayas, stats }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Riwayat Pemakaian Daya
                </h2>
            }
        >
            <Head title="Riwayat Pemakaian Daya" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Card Statistik Anomali */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                        <div className="bg-red-50 border border-red-200 rounded-lg shadow p-5 flex flex-col items-center">
                            <span className="text-sm text-red-600 font-medium">
                                Total Data Anomali
                            </span>
                            <span className="text-3xl font-bold text-red-800">
                                {stats?.total_anomali ?? 0}
                            </span>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-xl p-6">
                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                            Bulan/Tahun
                                        </th>
                                        <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                            Nama Pelanggan
                                        </th>
                                        <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                            Pemakaian (kWh)
                                        </th>
                                        <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                            Beban Puncak (kW)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {pemakaianDayas.data.map((daya) => (
                                        <tr
                                            key={daya.id}
                                            className={`hover:bg-gray-50 transition ${
                                                daya.flag_anomali
                                                    ? "bg-red-50"
                                                    : ""
                                            }`}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {new Date(
                                                    daya.bulan_tahun + "-01"
                                                ).toLocaleDateString("id-ID", {
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </td>

                                            <td className="px-6 py-4 font-medium text-blue-600 hover:underline">
                                                <Link
                                                    href={route(
                                                        "pelanggan.show",
                                                        daya.pelanggan.id
                                                    )}
                                                >
                                                    {daya.pelanggan
                                                        ?.nama_perusahaan ||
                                                        "-"}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                {new Intl.NumberFormat(
                                                    "id-ID"
                                                ).format(daya.pemakaian_kwh)}
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
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
