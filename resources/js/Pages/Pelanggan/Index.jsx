import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import ReactPaginate from "react-paginate";

export default function Index({
    auth,
    pelanggans,
    filters,
    namaPerusahaanList,
    idPelList,
    jumlahTeganganTinggi,
    jumlahTeganganMenengah,
}) {
    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1;
        router.get(
            route("pelanggan.index", {
                ...filters,
                page: selectedPage,
            }),
            {},
            { preserveState: true, preserveScroll: true }
        );
    };

    const getKriteriaBadge = (kriteria) => {
        switch (kriteria) {
            case "Tegangan Tinggi":
                return "badge-danger";
            case "Tegangan Menengah":
                return "badge-warning";
            default:
                return "badge-info";
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-2xl font-bold gradient-text">
                    👥 Daftar Pelanggan
                </h2>
            }
        >
            <Head title="Daftar Pelanggan" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="modern-card overflow-hidden">
                        <div className="p-6 text-gray-900">
                            {/* Tombol Tambah */}
                            <div className="mb-6 flex justify-start">
                                <Link
                                    href={route("pelanggan.create")}
                                    className="btn-primary-modern inline-flex items-center"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                    Tambah Pelanggan Baru
                                </Link>
                            </div>

                            {/* Dropdown Filter */}
                            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                                {/* Nama Perusahaan */}
                                <select
                                    value={filters.nama_perusahaan || ""}
                                    onChange={(e) =>
                                        router.get(route("pelanggan.index"), {
                                            nama_perusahaan: e.target.value,
                                            id_pel: filters.id_pel || "",
                                        })
                                    }
                                    className="input-modern"
                                >
                                    <option value="">
                                        -- Semua Perusahaan --
                                    </option>
                                    {namaPerusahaanList.map((nama, index) => (
                                        <option key={index} value={nama}>
                                            {nama}
                                        </option>
                                    ))}
                                </select>

                                {/* ID Pelanggan */}
                                <select
                                    value={filters.id_pel || ""}
                                    onChange={(e) =>
                                        router.get(route("pelanggan.index"), {
                                            nama_perusahaan:
                                                filters.nama_perusahaan || "",
                                            id_pel: e.target.value,
                                        })
                                    }
                                    className="input-modern"
                                >
                                    <option value="">
                                        -- Semua ID Pelanggan --
                                    </option>
                                    {idPelList.map((id, index) => (
                                        <option key={index} value={id}>
                                            {id}
                                        </option>
                                    ))}
                                </select>

                                {/* Kriteria Prioritas */}
                                <select
                                    value={filters.kriteria_prioritas || ""}
                                    onChange={(e) =>
                                        router.get(route("pelanggan.index"), {
                                            nama_perusahaan:
                                                filters.nama_perusahaan || "",
                                            id_pel: filters.id_pel || "",
                                            kriteria_prioritas: e.target.value,
                                        })
                                    }
                                    className="input-modern"
                                >
                                    <option value="">
                                        -- Semua Kriteria Prioritas --
                                    </option>
                                    <option value="Tegangan Tinggi">
                                        Tegangan Tinggi
                                    </option>
                                    <option value="Tegangan Menengah">
                                        Tegangan Menengah
                                    </option>
                                </select>
                            </div>

                            {/* Statistik Card */}
                            <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="modern-card p-5 flex flex-col items-center">
                                    <span className="text-sm text-blue-600 font-medium">
                                        Total Pelanggan
                                    </span>
                                    <span className="text-3xl font-bold text-blue-800">
                                        {pelanggans.total}
                                    </span>
                                </div>
                                <div className="modern-card p-5 flex flex-col items-center">
                                    <span className="text-sm text-red-600 font-medium">
                                        Tegangan Tinggi
                                    </span>
                                    <span className="text-3xl font-bold text-red-800">
                                        {jumlahTeganganTinggi}
                                    </span>
                                </div>
                                <div className="modern-card p-5 flex flex-col items-center">
                                    <span className="text-sm text-yellow-600 font-medium">
                                        Tegangan Menengah
                                    </span>
                                    <span className="text-3xl font-bold text-yellow-800">
                                        {jumlahTeganganMenengah}
                                    </span>
                                </div>
                            </div>

                            {/* Tabel */}
                            <div className="overflow-x-auto rounded-lg border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                                No.
                                            </th>
                                            <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                                ID Pelanggan
                                            </th>
                                            <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                                Nama Perusahaan
                                            </th>
                                            <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                                Nama PIC
                                            </th>
                                            <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                                Alamat Perusahaan
                                            </th>
                                            <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                                Kriteria Prioritas
                                            </th>
                                            <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {pelanggans.data.length > 0 ? (
                                            pelanggans.data.map(
                                                (pelanggan, index) => (
                                                    <tr
                                                        key={pelanggan.id}
                                                        className="hover:bg-gray-50 transition"
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {(pelanggans.current_page -
                                                                1) *
                                                                pelanggans.per_page +
                                                                index +
                                                                1}
                                                        </td>
                                                        <td
                                                            className="px-6 py-4 font-medium text-gray-700"
                                                            style={{
                                                                wordBreak:
                                                                    "break-word",
                                                                whiteSpace:
                                                                    "normal",
                                                            }}
                                                        >
                                                            {pelanggan.id_pel}
                                                        </td>
                                                        <td
                                                            className="px-6 py-4"
                                                            style={{
                                                                wordBreak:
                                                                    "break-word",
                                                                whiteSpace:
                                                                    "normal",
                                                            }}
                                                        >
                                                            {
                                                                pelanggan.nama_perusahaan
                                                            }
                                                        </td>
                                                        <td
                                                            className="px-6 py-4"
                                                            style={{
                                                                wordBreak:
                                                                    "break-word",
                                                                whiteSpace:
                                                                    "normal",
                                                            }}
                                                        >
                                                            {pelanggan.nama}
                                                        </td>
                                                        <td
                                                            className="px-6 py-4"
                                                            style={{
                                                                wordBreak:
                                                                    "break-word",
                                                                whiteSpace:
                                                                    "normal",
                                                            }}
                                                        >
                                                            {
                                                                pelanggan.alamat_perusahaan
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span
                                                                className={`badge-modern ${getKriteriaBadge(
                                                                    pelanggan.kriteria_prioritas
                                                                )}`}
                                                            >
                                                                {
                                                                    pelanggan.kriteria_prioritas
                                                                }
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                                            <Link
                                                                href={route(
                                                                    "pelanggan.show",
                                                                    pelanggan.id
                                                                )}
                                                                className="text-gray-600 hover:text-gray-900"
                                                            >
                                                                Detail
                                                            </Link>
                                                            <Link
                                                                href={route(
                                                                    "pelanggan.edit",
                                                                    pelanggan.id
                                                                )}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <Link
                                                                href={route(
                                                                    "pelanggan.destroy",
                                                                    pelanggan.id
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
                                                )
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="7"
                                                    className="px-6 py-8 text-center text-gray-500"
                                                >
                                                    Belum ada data pelanggan.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-6 flex justify-center">
                                <ReactPaginate
                                    previousLabel={"<"}
                                    nextLabel={">"}
                                    breakLabel={"..."}
                                    pageCount={pelanggans.last_page}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={3}
                                    onPageChange={handlePageClick}
                                    containerClassName="flex space-x-2 text-sm"
                                    pageClassName="px-3 py-1 border rounded-md hover:bg-blue-100"
                                    activeClassName="bg-blue-500 text-white"
                                    forcePage={pelanggans.current_page - 1}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
