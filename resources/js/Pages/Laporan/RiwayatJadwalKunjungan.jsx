import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, interaksis }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Riwayat Interaksi
                </h2>
            }
        >
            <Head title="Riwayat Interaksi" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                                            Jenis
                                        </th>
                                        <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                            Dicatat Oleh
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {interaksis.length > 0 ? (
                                        interaksis.map((interaksi, index) => (
                                            <tr
                                                key={interaksi.id}
                                                className="hover:bg-gray-50 transition"
                                            >
                                                <td className="px-6 py-4">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {new Date(
                                                        interaksi.created_at
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
                                                            interaksi.pelanggan
                                                                .id
                                                        )}
                                                    >
                                                        {interaksi.pelanggan
                                                            ?.nama_perusahaan ||
                                                            "-"}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {interaksi.jenis}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {interaksi.status}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {interaksi.user?.name ||
                                                        "-"}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="px-6 py-8 text-center text-gray-500"
                                            >
                                                Belum ada data interaksi.
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
