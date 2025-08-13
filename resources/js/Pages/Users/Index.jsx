import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, users }) {
    // Helper function untuk menentukan warna badge berdasarkan peran
    const getRoleBadge = (roleName) => {
        switch (roleName) {
            case "Admin":
                return "bg-purple-100 text-purple-800";
            case "Manajer":
                return "bg-green-100 text-green-800";
            case "Staff":
                return "bg-blue-100 text-blue-800";
            case "Pelanggan":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // Kelompokkan user berdasarkan role utama
    const groupedUsers = {
        Admin: users.filter((u) => u.roles[0]?.name === "Admin"),
        Manajer: users.filter((u) => u.roles[0]?.name === "Manajer"),
        Staff: users.filter((u) => u.roles[0]?.name === "Staff"),
        Pelanggan: users.filter((u) => u.roles[0]?.name === "Pelanggan"),
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Manajemen Pengguna
                </h2>
            }
        >
            <Head title="Manajemen Pengguna" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4">
                                <Link
                                    href={route("users.create")}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Tambah Pengguna Baru
                                </Link>
                            </div>

                            {/* Tabel per Role */}
                            {Object.entries(groupedUsers).map(
                                ([role, userList]) => (
                                    <div key={role} className="mb-10">
                                        <h3 className="text-lg font-bold text-gray-700 mb-2">
                                            {role}
                                        </h3>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            No.
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Nama
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Email
                                                        </th>
                                                        {role ===
                                                            "Pelanggan" && (
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Nama Perusahaan
                                                            </th>
                                                        )}
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Peran (Role)
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Aksi
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {userList.length > 0 ? (
                                                        userList.map(
                                                            (user, index) => (
                                                                <tr
                                                                    key={
                                                                        user.id
                                                                    }
                                                                >
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        {index +
                                                                            1}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        {
                                                                            user.name
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        {
                                                                            user.email
                                                                        }
                                                                    </td>
                                                                    {role ===
                                                                        "Pelanggan" && (
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            {user
                                                                                .pelanggan
                                                                                ?.nama_perusahaan ||
                                                                                "-"}
                                                                        </td>
                                                                    )}
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        {user
                                                                            .roles
                                                                            .length >
                                                                        0 ? (
                                                                            <span
                                                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadge(
                                                                                    user
                                                                                        .roles[0]
                                                                                        .name
                                                                                )}`}
                                                                            >
                                                                                {
                                                                                    user
                                                                                        .roles[0]
                                                                                        .name
                                                                                }
                                                                            </span>
                                                                        ) : (
                                                                            "N/A"
                                                                        )}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                        <Link
                                                                            href={route(
                                                                                "users.edit",
                                                                                user.id
                                                                            )}
                                                                            className="text-indigo-600 hover:text-indigo-900"
                                                                        >
                                                                            Edit
                                                                        </Link>
                                                                        <Link
                                                                            href={route(
                                                                                "users.destroy",
                                                                                user.id
                                                                            )}
                                                                            method="delete"
                                                                            as="button"
                                                                            className="ml-4 text-red-600 hover:text-red-900"
                                                                            onBefore={() =>
                                                                                confirm(
                                                                                    "Apakah Anda yakin ingin menghapus pengguna ini?"
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
                                                                colSpan={
                                                                    role ===
                                                                    "Pelanggan"
                                                                        ? 6
                                                                        : 5
                                                                }
                                                                className="px-6 py-8 text-center text-gray-500"
                                                            >
                                                                Belum ada
                                                                pengguna dengan
                                                                role {role}.
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
