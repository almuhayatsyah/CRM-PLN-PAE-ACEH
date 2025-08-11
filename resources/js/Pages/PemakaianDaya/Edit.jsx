import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Edit({ auth, pemakaianDaya }) {
    const { data, setData, put, processing, errors } = useForm({
        bulan_tahun: pemakaianDaya.bulan_tahun || "",
        pemakaian_kwh: pemakaianDaya.pemakaian_kwh || "",
        beban_puncak: pemakaianDaya.beban_puncak || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("pemakaian-daya.update", pemakaianDaya.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Pemakaian Daya untuk{" "}
                    {pemakaianDaya.pelanggan.nama_perusahaan}
                </h2>
            }
        >
            <Head title="Edit Pemakaian Daya" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel
                                        htmlFor="bulan_tahun"
                                        value="Bulan dan Tahun (Contoh: 2025-08)"
                                    />
                                    <TextInput
                                        id="bulan_tahun"
                                        type="month"
                                        name="bulan_tahun"
                                        value={data.bulan_tahun}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "bulan_tahun",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.bulan_tahun}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="pemakaian_kwh"
                                        value="Total Pemakaian (kWh)"
                                    />
                                    <TextInput
                                        id="pemakaian_kwh"
                                        type="number"
                                        name="pemakaian_kwh"
                                        value={data.pemakaian_kwh}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "pemakaian_kwh",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.pemakaian_kwh}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="beban_puncak"
                                        value="Beban Puncak (kW) (Opsional)"
                                    />
                                    <TextInput
                                        id="beban_puncak"
                                        type="number"
                                        name="beban_puncak"
                                        value={data.beban_puncak}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "beban_puncak",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.beban_puncak}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center gap-4 mt-6">
                                    <PrimaryButton disabled={processing}>
                                        Perbarui Data
                                    </PrimaryButton>
                                    <Link
                                        href={route(
                                            "pelanggan.show",
                                            pemakaianDaya.pelanggan_id
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
