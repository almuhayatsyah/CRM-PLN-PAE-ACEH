import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Create({ auth, pelanggan }) {
    const { data, setData, post, processing, errors } = useForm({
        pelanggan_id: pelanggan.id,
        tanggal: "",
        tujuan: "",
        status: "Dijadwalkan", // Nilai default
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("jadwal-kunjungan.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Jadwalkan Kunjungan Baru untuk {pelanggan.nama_perusahaan}
                </h2>
            }
        >
            <Head title="Jadwalkan Kunjungan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel
                                        htmlFor="tanggal"
                                        value="Tanggal dan Waktu Kunjungan"
                                    />
                                    <TextInput
                                        id="tanggal"
                                        type="datetime-local"
                                        name="tanggal"
                                        value={data.tanggal}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("tanggal", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.tanggal}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="tujuan"
                                        value="Tujuan Kunjungan"
                                    />
                                    <textarea
                                        id="tujuan"
                                        name="tujuan"
                                        value={data.tujuan}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows="4"
                                        onChange={(e) =>
                                            setData("tujuan", e.target.value)
                                        }
                                        required
                                    ></textarea>
                                    <InputError
                                        message={errors.tujuan}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="status"
                                        value="Status Awal"
                                    />
                                    <select
                                        id="status"
                                        name="status"
                                        value={data.status}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        required
                                    >
                                        <option value="Dijadwalkan">
                                            Dijadwalkan
                                        </option>
                                        <option value="Selesai">Selesai</option>
                                        <option value="Batal">Batal</option>
                                    </select>
                                    <InputError
                                        message={errors.status}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center gap-4 mt-6">
                                    <PrimaryButton disabled={processing}>
                                        Simpan Jadwal
                                    </PrimaryButton>
                                    <Link
                                        href={route(
                                            "pelanggan.show",
                                            pelanggan.id
                                        )}
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
