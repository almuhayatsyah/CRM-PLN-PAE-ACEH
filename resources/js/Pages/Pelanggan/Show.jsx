import PowerUsageChart from "@/Components/PowerUsageChart";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ auth, pelanggan }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Detail Pelanggan
                    </h2>
                    <Link
                        href={route("pelanggan.index")}
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        &larr; Kembali ke Daftar Pelanggan
                    </Link>
                </div>
            }
        >
            <Head title={`Detail - ${pelanggan.nama_perusahaan}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* --- KARTU DETAIL PROFIL PELANGGAN --- */}
                    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
                            Profil Perusahaan
                            <span className="block text-sm text-gray-500 font-normal mt-1">
                                {pelanggan.nama_perusahaan}
                            </span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                            {/* Identitas Pelanggan */}
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

                            {/* Kontak PIC */}
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
                                    Alamat Perusahaan
                                </span>
                                <span className="text-gray-900">
                                    {pelanggan.alamat_perusahaan ||
                                        "Tidak tersedia"}
                                </span>
                            </div>

                            {/* Kapasitas & Tarif */}
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

                            {/* Sektor & Peruntukan */}
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500 font-medium">
                                    Sektor
                                </span>
                                <span className="text-gray-900">
                                    {pelanggan.sektor}
                                </span>
                            </div>

                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500 font-medium">
                                    Peruntukan
                                </span>
                                <span className="text-gray-900">
                                    {pelanggan.peruntukan}
                                </span>
                            </div>

                            {/* Lokasi Layanan */}
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500 font-medium">
                                    UP3
                                </span>
                                <span className="text-gray-900">
                                    {pelanggan.up3}
                                </span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500 font-medium">
                                    ULP
                                </span>
                                <span className="text-gray-900">
                                    {pelanggan.ulp}
                                </span>
                            </div>

                            {/* Status Prioritas */}
                            <div className="flex justify-between">
                                <span className="text-gray-500 font-medium">
                                    Kriteria Prioritas
                                </span>
                                <span className="text-gray-900">
                                    {pelanggan.kriteria_prioritas}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500 font-medium">
                                    Progres
                                </span>
                                <span className="text-gray-900">
                                    {pelanggan.progres}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 font-medium">
                                    keterangan
                                </span>
                                <span className="text-gray-900">
                                    {pelanggan.keterangan}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* --- KARTU RIWAYAT INTERAKSI --- */}
                    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">
                                Riwayat Interaksi
                            </h3>
                            <Link
                                href={route("interaksi.create", {
                                    pelanggan: pelanggan.id,
                                })}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 transition-colors duration-200"
                            >
                                + Tambah Interaksi
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {[
                                            "Tanggal",
                                            "Jenis",
                                            "Deskripsi",
                                            "Status",
                                            "Dicatat oleh",
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
                                    {pelanggan.interaksis.length > 0 ? (
                                        pelanggan.interaksis.map(
                                            (interaksi) => (
                                                <tr
                                                    key={interaksi.id}
                                                    className="hover:bg-gray-50 transition-colors duration-150"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
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
                                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">
                                                        {interaksi.jenis}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-600">
                                                        {interaksi.deskripsi}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-xs font-semibold
                                        ${
                                            interaksi.status === "Selesai"
                                                ? "bg-green-100 text-green-700"
                                                : interaksi.status === "Proses"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-gray-100 text-gray-600"
                                        }`}
                                                        >
                                                            {interaksi.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                                        {interaksi.user?.name ||
                                                            "-"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap font-medium space-x-3">
                                                        <Link
                                                            href={route(
                                                                "interaksi.edit",
                                                                interaksi.id
                                                            )}
                                                            className="text-indigo-600 hover:text-indigo-900 transition-colors duration-150"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                "interaksi.destroy",
                                                                interaksi.id
                                                            )}
                                                            method="delete"
                                                            as="button"
                                                            className="text-red-600 hover:text-red-900 transition-colors duration-150"
                                                            onBefore={() =>
                                                                confirm(
                                                                    "Apakah Anda yakin ingin menghapus interaksi ini?"
                                                                )
                                                            }
                                                        >
                                                            Hapus
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="px-6 py-8 text-center text-gray-500"
                                            >
                                                Belum ada riwayat interaksi.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* --- BAGIAN RIWAYAT KUNJUNGAN --- */}
                    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 mb-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">
                                Riwayat Kunjungan
                            </h3>
                            <Link
                                href={route("jadwal-kunjungan.create", {
                                    pelanggan: pelanggan.id,
                                })}
                                className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 transition-colors duration-200"
                            >
                                + Jadwalkan Kunjungan
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {[
                                            "Tanggal",
                                            "Tujuan",
                                            "Status",
                                            "Dijadwalkan oleh",
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
                                    {pelanggan.jadwal_kunjungans.length > 0 ? (
                                        pelanggan.jadwal_kunjungans.map(
                                            (kunjungan) => (
                                                <tr
                                                    key={kunjungan.id}
                                                    className="hover:bg-gray-50 transition-colors duration-150"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {new Date(
                                                            kunjungan.tanggal
                                                        ).toLocaleString(
                                                            "id-ID",
                                                            {
                                                                dateStyle:
                                                                    "long",
                                                                timeStyle:
                                                                    "short",
                                                            }
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-700">
                                                        {kunjungan.tujuan}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-xs font-semibold
                                        ${
                                            kunjungan.status === "Selesai"
                                                ? "bg-green-100 text-green-700"
                                                : kunjungan.status ===
                                                  "Dijadwalkan"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-gray-100 text-gray-600"
                                        }`}
                                                        >
                                                            {kunjungan.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                                        {kunjungan.user?.name ||
                                                            "-"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap font-medium space-x-3">
                                                        <Link
                                                            href={route(
                                                                "jadwal-kunjungan.edit",
                                                                kunjungan.id
                                                            )}
                                                            className="text-indigo-600 hover:text-indigo-900 transition-colors duration-150"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                "jadwal-kunjungan.destroy",
                                                                kunjungan.id
                                                            )}
                                                            method="delete"
                                                            as="button"
                                                            className="text-red-600 hover:text-red-900 transition-colors duration-150"
                                                            onBefore={() =>
                                                                confirm(
                                                                    "Apakah Anda yakin ingin menghapus jadwal ini?"
                                                                )
                                                            }
                                                        >
                                                            Hapus
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-6 py-8 text-center text-gray-500"
                                            >
                                                Belum ada jadwal kunjungan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Riwayat Pemakaian Daya
                                </h3>
                                <Link
                                    href={route("pemakaian-daya.create", {
                                        pelanggan: pelanggan.id,
                                    })}
                                    className="inline-flex items-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-700"
                                >
                                    Input Data Baru
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Bulan & Tahun
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Pemakaian (kWh)
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Beban Puncak (kW)
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {pelanggan.pemakaian_dayas.map(
                                            (daya) => (
                                                <tr
                                                    key={daya.id}
                                                    className={
                                                        daya.flag_anomali
                                                            ? "bg-red-50"
                                                            : ""
                                                    }
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        {new Date(
                                                            daya.bulan_tahun +
                                                                "-01"
                                                        ).toLocaleDateString(
                                                            "id-ID",
                                                            {
                                                                month: "long",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
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
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        {daya.beban_puncak
                                                            ? new Intl.NumberFormat(
                                                                  "id-ID"
                                                              ).format(
                                                                  daya.beban_puncak
                                                              )
                                                            : "-"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <Link
                                                            href={route(
                                                                "pemakaian-daya.edit",
                                                                daya.id
                                                            )}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                "pemakaian-daya.destroy",
                                                                daya.id
                                                            )}
                                                            method="delete"
                                                            as="button"
                                                            className="ml-4 text-red-600 hover:text-red-900"
                                                        >
                                                            Hapus
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* --- BAGIAN GRAFIK PEMAKAIAN DAYA (BARU) --- */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Grafik Pemakaian Daya
                            </h3>
                            {pelanggan.pemakaian_dayas.length > 1 ? (
                                <PowerUsageChart
                                    data={pelanggan.pemakaian_dayas}
                                />
                            ) : (
                                <div className="text-center text-gray-500 py-8">
                                    <p>
                                        Data pemakaian daya belum cukup untuk
                                        menampilkan grafik (minimal 2 bulan).
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
