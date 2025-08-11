import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, feedbacks }) {
    // Hitung jumlah feedback per status
    const statusCount = {
        Diproses: feedbacks.filter((f) => f.status === "Diproses").length,
        Diterima: feedbacks.filter((f) => f.status === "Diterima").length,
        Selesai: feedbacks.filter((f) => f.status === "Selesai").length,
    };
    const getSkorBadge = (skor) => {
        if (skor >= 4) return "bg-green-100 text-green-800";
        if (skor >= 3) return "bg-yellow-100 text-yellow-800";
        return "bg-red-100 text-red-800";
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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Feedback Masuk
                </h2>
            }
        >
            <Head title="Feedback Pelanggan" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Card Statistik Status Feedback */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg shadow p-5 flex flex-col items-center">
                            <span className="text-sm text-yellow-600 font-medium">
                                Diproses
                            </span>
                            <span className="text-3xl font-bold text-yellow-800">
                                {statusCount.Diproses}
                            </span>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg shadow p-5 flex flex-col items-center">
                            <span className="text-sm text-blue-600 font-medium">
                                Diterima
                            </span>
                            <span className="text-3xl font-bold text-blue-800">
                                {statusCount.Diterima}
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
                    </div>
                    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">
                            ⭐ Feedback Pelanggan
                        </h3>

                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {[
                                            "Tanggal",
                                            "Nama Perusahaan",
                                            "Skor",
                                            "Status",
                                            "Ditindaklanjuti Oleh",
                                            "Aksi",
                                        ].map((header) => (
                                            <th
                                                key={header}
                                                className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {feedbacks.length > 0 ? (
                                        feedbacks.map((feedback) => (
                                            <tr
                                                key={feedback.id}
                                                className="hover:bg-gray-50 transition-colors duration-150"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {new Date(
                                                        feedback.created_at
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "2-digit",
                                                            month: "long",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                                    {feedback.pelanggan
                                                        ?.nama_perusahaan ||
                                                        "N/A"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getSkorBadge(
                                                            feedback.skor
                                                        )}`}
                                                    >
                                                        {feedback.skor} / 5
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                                                            feedback.status
                                                        )}`}
                                                    >
                                                        {feedback.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                                    {feedback.penindak_lanjut
                                                        ?.name || "-"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap font-medium space-x-3">
                                                    <Link
                                                        href={route(
                                                            "feedback.edit",
                                                            feedback.id
                                                        )}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Tindak Lanjut
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "feedback.destroy",
                                                            feedback.id
                                                        )}
                                                        method="delete"
                                                        as="button"
                                                        className="text-red-600 hover:text-red-900"
                                                        onBefore={() =>
                                                            confirm(
                                                                "Apakah Anda yakin ingin menghapus data ini?"
                                                            )
                                                        }
                                                    >
                                                        Hapus
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="px-6 py-8 text-center text-gray-500"
                                            >
                                                Belum ada feedback yang masuk.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-4">
                            {feedbacks.length > 0 ? (
                                feedbacks.map((feedback) => (
                                    <div
                                        key={feedback.id}
                                        className="border border-gray-200 rounded-lg p-4 shadow-sm"
                                    >
                                        <p className="text-sm text-gray-500">
                                            {new Date(
                                                feedback.created_at
                                            ).toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </p>
                                        <p className="font-semibold text-gray-800">
                                            {feedback.pelanggan
                                                ?.nama_perusahaan || "N/A"}
                                        </p>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getSkorBadge(
                                                    feedback.skor
                                                )}`}
                                            >
                                                Skor: {feedback.skor} / 5
                                            </span>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                                                    feedback.status
                                                )}`}
                                            >
                                                {feedback.status}
                                            </span>
                                        </div>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Ditindaklanjuti:{" "}
                                            {feedback.penindak_lanjut?.name ||
                                                "-"}
                                        </p>
                                        <div className="mt-3 flex gap-4 text-sm">
                                            <Link
                                                href={route(
                                                    "feedback.edit",
                                                    feedback.id
                                                )}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Tindak Lanjut
                                            </Link>
                                            <Link
                                                href={route(
                                                    "feedback.destroy",
                                                    feedback.id
                                                )}
                                                method="delete"
                                                as="button"
                                                className="text-red-600 hover:text-red-900"
                                                onBefore={() =>
                                                    confirm(
                                                        "Apakah Anda yakin ingin menghapus data ini?"
                                                    )
                                                }
                                            >
                                                Hapus
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">
                                    Belum ada feedback yang masuk.
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mt-8 bg-indigo-50 p-4 rounded-lg text-sm text-gray-700">
                        💡 <span className="font-semibold">Note:</span> Feedback
                        Masuk Interaksi antara PAE dan Pelanggan Prioritas
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
