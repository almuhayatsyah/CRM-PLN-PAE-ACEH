import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Edit({ auth, pelanggan }) {
    const { data, setData, put, processing, errors } = useForm({
        id_pel: pelanggan.id_pel || "",
        nama_perusahaan: pelanggan.nama_perusahaan || "",
        alamat_perusahaan: pelanggan.alamat_perusahaan || "",
        nama: pelanggan.nama || "",
        kontak: pelanggan.kontak || "",
        kapasitas_daya: pelanggan.kapasitas_daya || "",
        sektor: pelanggan.sektor || "",
        peruntukan: pelanggan.peruntukan || "",
        tarif: pelanggan.tarif || "",
        up3: pelanggan.up3 || "",
        ulp: pelanggan.ulp || "",
        kriteria_prioritas: pelanggan.kriteria_prioritas || "",
        progres: pelanggan.progres || "",
        keterangan: pelanggan.keterangan || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("pelanggan.update", pelanggan.id));
    };

    const renderInput = (id, label, required = true, type = "text") => (
        <div>
            <InputLabel htmlFor={id} value={label} />
            <TextInput
                id={id}
                name={id}
                type={type}
                value={data[id]}
                className="mt-1 block w-full"
                onChange={(e) => setData(id, e.target.value)}
                required={required}
            />
            <InputError message={errors[id]} className="mt-2" />
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Data Pelanggan
                </h2>
            }
        >
            <Head title="Edit Pelanggan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden">
                        <div className="p-6 text-gray-900 space-y-6">
                            <form onSubmit={submit} className="space-y-6">
                                {/* --- Data Perusahaan --- */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                                        Data Perusahaan
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {renderInput("id_pel", "ID Pelanggan")}
                                        {renderInput(
                                            "nama_perusahaan",
                                            "Nama Perusahaan"
                                        )}
                                        {renderInput(
                                            "alamat_perusahaan",
                                            "Alamat Perusahaan",
                                            false
                                        )}
                                    </div>
                                </div>

                                {/* --- Kontak & Kapasitas --- */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                                        Kontak & Kapasitas
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {renderInput(
                                            "nama",
                                            "Nama Kontak (PIC)"
                                        )}
                                        {renderInput("kontak", "Nomor Kontak")}
                                        {renderInput(
                                            "kapasitas_daya",
                                            "Kapasitas Daya (KVA)",
                                            true,
                                            "number"
                                        )}
                                        {renderInput("sektor", "Sektor")}
                                    </div>
                                </div>

                                {/* --- Tarif & Peruntukan --- */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                                        Tarif & Peruntukan
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {renderInput("tarif", "Tarif")}
                                        {renderInput(
                                            "peruntukan",
                                            "Peruntukan"
                                        )}
                                    </div>
                                </div>

                                {/* --- Lokasi & Profiling --- */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                                        Lokasi & Profiling
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {renderInput("up3", "UP3")}
                                        {renderInput("ulp", "ULP")}
                                        <div>
                                            <InputLabel
                                                htmlFor="progres"
                                                value="Progres Profiling"
                                            />
                                            <select
                                                id="progres"
                                                name="progres"
                                                value={data.progres}
                                                onChange={(e) =>
                                                    setData(
                                                        "progres",
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            >
                                                <option value="">
                                                    -- Pilih Progres --
                                                </option>
                                                <option value="Sudah">
                                                    Sudah
                                                </option>
                                                <option value="Belum">
                                                    Belum
                                                </option>
                                            </select>
                                            <InputError
                                                message={errors.progres}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="kriteria_prioritas"
                                                value="Kriteria Prioritas"
                                            />
                                            <select
                                                id="kriteria_prioritas"
                                                name="kriteria_prioritas"
                                                value={data.kriteria_prioritas}
                                                onChange={(e) =>
                                                    setData(
                                                        "kriteria_prioritas",
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                required
                                            >
                                                <option value="">
                                                    -- Pilih Kriteria --
                                                </option>
                                                <option value="Tegangan Tinggi">
                                                    Tegangan Tinggi
                                                </option>
                                                <option value="Tegangan Menengah">
                                                    Tegangan Menengah
                                                </option>
                                            </select>
                                            <InputError
                                                message={
                                                    errors.kriteria_prioritas
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* --- Keterangan --- */}
                                <div>
                                    <InputLabel
                                        htmlFor="keterangan"
                                        value="Keterangan"
                                    />
                                    <textarea
                                        id="keterangan"
                                        name="keterangan"
                                        value={data.keterangan}
                                        onChange={(e) =>
                                            setData(
                                                "keterangan",
                                                e.target.value
                                            )
                                        }
                                        rows="3"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    ></textarea>
                                    <InputError
                                        message={errors.keterangan}
                                        className="mt-2"
                                    />
                                </div>

                                {/* --- Tombol Aksi --- */}
                                <div className="flex items-center gap-4 mt-6">
                                    <PrimaryButton disabled={processing}>
                                        Perbarui Pelanggan
                                    </PrimaryButton>
                                    <Link
                                        href={route("pelanggan.index")}
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
