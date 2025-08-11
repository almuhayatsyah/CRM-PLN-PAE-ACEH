import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import PowerUsageChart from "@/Components/PowerUsageChart";
import { useState } from "react";

export default function AnalisisPemakaianDaya({
    auth,
    semuaPelanggan,
    pelangganTerpilih,
}) {
    const [selectedPelangganId, setSelectedPelangganId] = useState(
        pelangganTerpilih?.id || ""
    );

    const handlePelangganChange = (e) => {
        const pelangganId = e.target.value;
        setSelectedPelangganId(pelangganId);

        // Gunakan Inertia router untuk mengunjungi kembali halaman ini dengan parameter baru
        if (pelangganId) {
            router.get(
                route("analisis.pemakaian-daya", { pelanggan: pelangganId }),
                {},
                { preserveState: true }
            );
        } else {
            router.get(route("analisis.pemakaian-daya"));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Analisis Pemakaian Daya
                </h2>
            }
        >
            <Head title="Analisis Pemakaian Daya" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="mb-6">
                            <InputLabel
                                htmlFor="pelanggan_filter"
                                value="Pilih Pelanggan untuk Dianalisis"
                            />
                            <select
                                id="pelanggan_filter"
                                name="pelanggan_filter"
                                value={selectedPelangganId}
                                onChange={handlePelangganChange}
                                className="mt-1 block w-full md:w-1/2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            >
                                <option value="">-- Tampilkan Grafik --</option>
                                {semuaPelanggan.map((pelanggan) => (
                                    <option
                                        key={pelanggan.id}
                                        value={pelanggan.id}
                                    >
                                        {pelanggan.nama_perusahaan}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {pelangganTerpilih ? (
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Grafik untuk:{" "}
                                    {pelangganTerpilih.nama_perusahaan +
                                        " " +
                                        pelangganTerpilih.id_pel}
                                    {pelangganTerpilih.pemakaian_dayas.length >
                                        0 && (
                                        <span className="text-sm text-gray-500">
                                            {" "}
                                            (
                                            {
                                                pelangganTerpilih
                                                    .pemakaian_dayas.length
                                            }{" "}
                                            bulan)
                                        </span>
                                    )}
                                </h3>
                                {pelangganTerpilih.pemakaian_dayas.length >
                                1 ? (
                                    <PowerUsageChart
                                        data={pelangganTerpilih.pemakaian_dayas}
                                    />
                                ) : (
                                    <div className="text-center text-gray-500 py-8">
                                        <p>
                                            Data pemakaian daya belum cukup
                                            untuk menampilkan grafik (minimal 2
                                            bulan).
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 py-16 border-2 border-dashed rounded-lg">
                                <p>
                                    Silakan pilih pelanggan untuk melihat grafik
                                    pemakaian daya.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-8 bg-indigo-50 p-4 rounded-lg text-sm text-gray-700">
                    💡 <span className="font-semibold">Tips:</span>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
