import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

export default function Edit({ auth, feedback }) {
    const { data, setData, put, processing, errors } = useForm({
        status: feedback.status || "Diproses",
        catatan_tindak_lanjut: feedback.catatan_tindak_lanjut || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("feedback.update", feedback.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tindak Lanjut Feedback
                </h2>
            }
        >
            <Head title="Tindak Lanjut Feedback" />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 space-y-8">
                        {/* --- DETAIL FEEDBACK --- */}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                Detail Feedback
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <p>
                                    <strong>Dari:</strong>{" "}
                                    {feedback.pelanggan.nama_perusahaan}
                                </p>
                                <p>
                                    <strong>ID Pelanggan:</strong>{" "}
                                    {feedback.pelanggan.id_pel}
                                </p>
                                <p>
                                    <strong>Tanggal:</strong>{" "}
                                    {new Date(
                                        feedback.created_at
                                    ).toLocaleDateString("id-ID", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                                <p>
                                    <strong>Skor:</strong>{" "}
                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
                                        {feedback.skor} / 5
                                    </span>
                                </p>
                            </div>

                            <div className="mt-4">
                                <p className="font-medium text-gray-700 mb-1">
                                    Komentar:
                                </p>
                                <div className="p-4 bg-gray-50 rounded-lg border text-gray-700 text-sm">
                                    {feedback.komentar || "Tidak ada komentar."}
                                </div>
                            </div>
                        </div>

                        {/* --- FORM TINDAK LANJUT --- */}
                        <form
                            onSubmit={submit}
                            className="space-y-6 border-t pt-6"
                        >
                            <h3 className="text-xl font-semibold text-gray-800">
                                Form Tindak Lanjut
                            </h3>

                            <div>
                                <InputLabel
                                    htmlFor="status"
                                    value="Ubah Status Feedback"
                                />
                                <select
                                    id="status"
                                    name="status"
                                    value={data.status}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                >
                                    <option value="Diterima">Diterima</option>
                                    <option value="Diproses">Diproses</option>
                                    <option value="Selesai">Selesai</option>
                                </select>
                                <InputError
                                    message={errors.status}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="catatan_tindak_lanjut"
                                    value="Catatan Tindak Lanjut"
                                />
                                <textarea
                                    id="catatan_tindak_lanjut"
                                    name="catatan_tindak_lanjut"
                                    value={data.catatan_tindak_lanjut || ""}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    rows="4"
                                    onChange={(e) =>
                                        setData(
                                            "catatan_tindak_lanjut",
                                            e.target.value
                                        )
                                    }
                                ></textarea>
                                <InputError
                                    message={errors.catatan_tindak_lanjut}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>
                                    Simpan Tindak Lanjut
                                </PrimaryButton>
                                <Link
                                    href={route("feedback.index")}
                                    className="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-300 transition"
                                >
                                    Kembali
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
