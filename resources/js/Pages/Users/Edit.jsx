import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Edit({ auth, user, roles, pelanggans }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
        role: user.roles.length > 0 ? user.roles[0].name : "",
        pelanggan_id: user.pelanggan_id || "", // <-- Inisialisasi state pelanggan_id
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("users.update", user.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Data Pengguna
                </h2>
            }
        >
            <Head title="Edit Pengguna" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6">
                                {/* ... Input Nama & Email ... */}
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Nama Lengkap"
                                    />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value="Alamat Email"
                                    />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>

                                {/* ... Input Password (Opsional) ... */}
                                <div>
                                    <InputLabel
                                        htmlFor="password"
                                        value="Kata Sandi Baru (Opsional)"
                                    />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Konfirmasi Kata Sandi Baru"
                                    />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="role"
                                        value="Peran (Role)"
                                    />
                                    <select
                                        id="role"
                                        name="role"
                                        value={data.role}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm disabled:bg-gray-100"
                                        onChange={(e) =>
                                            setData("role", e.target.value)
                                        }
                                        // Mencegah admin mengubah perannya sendiri
                                        disabled={auth.user.id === user.id}
                                        required
                                    >
                                        <option value="">Pilih Peran</option>
                                        {roles.map((role) => (
                                            <option
                                                key={role.id}
                                                value={role.name}
                                            >
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                    {/* Menampilkan pesan bantuan jika admin mengedit profilnya sendiri */}
                                    {auth.user.id === user.id && (
                                        <p className="mt-1 text-xs text-gray-500">
                                            Anda tidak dapat mengubah peran akun
                                            Anda sendiri.
                                        </p>
                                    )}
                                    <InputError
                                        message={errors.role}
                                        className="mt-2"
                                    />
                                </div>

                                {/* --- DROPDOWN PELANGGAN KONDISIONAL --- */}
                                {data.role === "Pelanggan" && (
                                    <div>
                                        <InputLabel
                                            htmlFor="pelanggan_id"
                                            value="Hubungkan ke Perusahaan Pelanggan"
                                        />
                                        <select
                                            id="pelanggan_id"
                                            name="pelanggan_id"
                                            value={data.pelanggan_id}
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            onChange={(e) =>
                                                setData(
                                                    "pelanggan_id",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        >
                                            <option value="">
                                                Pilih Perusahaan
                                            </option>
                                            {pelanggans.map((pelanggan) => (
                                                <option
                                                    key={pelanggan.id}
                                                    value={pelanggan.id}
                                                >
                                                    {pelanggan.nama_perusahaan}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.pelanggan_id}
                                            className="mt-2"
                                        />
                                    </div>
                                )}

                                <div className="flex items-center gap-4 mt-6">
                                    <PrimaryButton disabled={processing}>
                                        Perbarui Pengguna
                                    </PrimaryButton>
                                    <Link
                                        href={route("users.index")}
                                        className="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-300"
                                    >
                                        Batal
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
