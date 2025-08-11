import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        id_pel: "",
        nama_perusahaan: "",
        nama: "",
        kontak: "",
        kapasitas_daya: "",
        sektor: "",
        tarif: "",
        peruntukan: "",
        up3: "",
        ulp: "",
        progres: "",
        keterangan: "",
        kriteria_prioritas: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("pelanggan.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    + Tambah Pelanggan Baru
                </h2>
            }
        >
            <Head title="Tambah Pelanggan" />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-md sm:rounded-xl">
                        <div className="p-6 text-gray-900 space-y-8">
                            <form onSubmit={submit} className="space-y-8">
                                {/* --- Data Perusahaan --- */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                                        Data Perusahaan
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormInput
                                            label="ID Pelanggan"
                                            id="id_pel"
                                            value={data.id_pel}
                                            onChange={(e) =>
                                                setData(
                                                    "id_pel",
                                                    e.target.value
                                                )
                                            }
                                            error={errors.id_pel}
                                            required
                                        />
                                        <FormInput
                                            label="Nama Perusahaan"
                                            id="nama_perusahaan"
                                            value={data.nama_perusahaan}
                                            onChange={(e) =>
                                                setData(
                                                    "nama_perusahaan",
                                                    e.target.value
                                                )
                                            }
                                            error={errors.nama_perusahaan}
                                            required
                                        />
                                        <FormInput
                                            label="Alamat Perusahaan"
                                            id="alamat_perusahaan"
                                            value={data.alamat_perusahaan}
                                            onChange={(e) =>
                                                setData(
                                                    "alamat_perusahaan",
                                                    e.target.value
                                                )
                                            }
                                            error={errors.alamat_perusahaan}
                                            required={false}
                                        />
                                    </div>
                                </div>

                                {/* --- Kontak & Kapasitas --- */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                                        Kontak & Kapasitas
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormInput
                                            label="Nama Kontak (PIC)"
                                            id="nama"
                                            value={data.nama}
                                            onChange={(e) =>
                                                setData("nama", e.target.value)
                                            }
                                            error={errors.nama}
                                            required
                                        />
                                        <FormInput
                                            label="Nomor Kontak"
                                            id="kontak"
                                            value={data.kontak}
                                            onChange={(e) =>
                                                setData(
                                                    "kontak",
                                                    e.target.value
                                                )
                                            }
                                            error={errors.kontak}
                                            required
                                        />
                                        <FormInput
                                            label="Kapasitas Daya (KVA)"
                                            id="kapasitas_daya"
                                            type="number"
                                            value={data.kapasitas_daya}
                                            onChange={(e) =>
                                                setData(
                                                    "kapasitas_daya",
                                                    e.target.value
                                                )
                                            }
                                            error={errors.kapasitas_daya}
                                            required
                                        />
                                        <FormInput
                                            label="Sektor"
                                            id="sektor"
                                            value={data.sektor}
                                            onChange={(e) =>
                                                setData(
                                                    "sektor",
                                                    e.target.value
                                                )
                                            }
                                            error={errors.sektor}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* --- Tarif & Peruntukan --- */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                                        Tarif & Peruntukan
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormInput
                                            label="Tarif"
                                            id="tarif"
                                            value={data.tarif}
                                            onChange={(e) =>
                                                setData("tarif", e.target.value)
                                            }
                                            error={errors.tarif}
                                            required
                                        />
                                        <FormInput
                                            label="Peruntukan"
                                            id="peruntukan"
                                            value={data.peruntukan}
                                            onChange={(e) =>
                                                setData(
                                                    "peruntukan",
                                                    e.target.value
                                                )
                                            }
                                            error={errors.peruntukan}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* --- Lokasi & Profiling --- */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                                        Lokasi & Profiling
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormInput
                                            label="UP3"
                                            id="up3"
                                            value={data.up3}
                                            onChange={(e) =>
                                                setData("up3", e.target.value)
                                            }
                                            error={errors.up3}
                                            required
                                        />
                                        <FormInput
                                            label="ULP"
                                            id="ulp"
                                            value={data.ulp}
                                            onChange={(e) =>
                                                setData("ulp", e.target.value)
                                            }
                                            error={errors.ulp}
                                            required
                                        />
                                        {/* Select Progres */}
                                        <FormSelect
                                            label="Progres Profiling"
                                            id="progres"
                                            value={data.progres}
                                            onChange={(e) =>
                                                setData(
                                                    "progres",
                                                    e.target.value
                                                )
                                            }
                                            options={[
                                                {
                                                    value: "Sudah",
                                                    label: "Sudah",
                                                },
                                                {
                                                    value: "Belum",
                                                    label: "Belum",
                                                },
                                            ]}
                                            error={errors.progres}
                                        />
                                        {/* Select Kriteria */}
                                        <FormSelect
                                            label="Kriteria Prioritas"
                                            id="kriteria_prioritas"
                                            value={data.kriteria_prioritas}
                                            onChange={(e) =>
                                                setData(
                                                    "kriteria_prioritas",
                                                    e.target.value
                                                )
                                            }
                                            options={[
                                                {
                                                    value: "Tegangan Tinggi",
                                                    label: "Tegangan Tinggi",
                                                },
                                                {
                                                    value: "Tegangan Menengah",
                                                    label: "Tegangan Menengah",
                                                },
                                            ]}
                                            error={errors.kriteria_prioritas}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* --- Keterangan --- */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                                        Keterangan Tambahan
                                    </h3>
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
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows="3"
                                    />
                                    <InputError
                                        message={errors.keterangan}
                                        className="mt-2"
                                    />
                                </div>

                                {/* --- Tombol Aksi --- */}
                                <div className="flex items-center gap-4 pt-4">
                                    <PrimaryButton disabled={processing}>
                                        Simpan Pelanggan
                                    </PrimaryButton>
                                    <Link
                                        href={route("pelanggan.index")}
                                        className="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-300 transition"
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

/* --- Component Reusable Input --- */
function FormInput({
    label,
    id,
    value,
    onChange,
    error,
    type = "text",
    required,
}) {
    return (
        <div>
            <InputLabel htmlFor={id} value={label} />
            <TextInput
                id={id}
                name={id}
                type={type}
                value={value}
                className="mt-1 block w-full"
                onChange={onChange}
                required={required}
            />
            <InputError message={error} className="mt-2" />
        </div>
    );
}

function FormSelect({ label, id, value, onChange, options, error, required }) {
    return (
        <div>
            <InputLabel htmlFor={id} value={label} />
            <select
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                required={required}
            >
                <option value="">-- Pilih --</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <InputError message={error} className="mt-2" />
        </div>
    );
}
