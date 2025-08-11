import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

// Komponen Notifikasi Download
function DownloadNotification({ message, isVisible, onClose, isDownloading }) {
    if (!isVisible) return null;

    const getNotificationStyle = () => {
        if (message.includes("✅")) {
            return "bg-green-50 border-green-200 text-green-800 shadow-lg";
        } else if (message.includes("❌")) {
            return "bg-red-50 border-red-200 text-red-800 shadow-lg";
        } else {
            return "bg-blue-50 border-blue-200 text-blue-800 shadow-lg";
        }
    };

    const getIcon = () => {
        if (message.includes("✅")) return "✅";
        if (message.includes("❌")) return "❌";
        return "📥";
    };

    return (
        <div
            className={`mb-6 p-4 rounded-lg border-2 ${getNotificationStyle()} transition-all duration-500 ease-in-out transform ${
                isVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-2 opacity-0"
            }`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                    <span className="text-xl animate-bounce">{getIcon()}</span>
                    <span className="font-medium">{message}</span>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors ml-4 hover:scale-110 transform duration-200"
                >
                    ✕
                </button>
            </div>

            {/* Progress Bar untuk Download */}
            {isDownloading && (
                <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-blue-600 h-2 rounded-full animate-pulse transition-all duration-1000 ease-out"
                            style={{ width: "100%" }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span className="animate-pulse">Mengunduh...</span>
                        <span className="font-semibold">100%</span>
                    </div>
                </div>
            )}
        </div>
    );
}

// Komponen Loading Spinner
function LoadingSpinner() {
    return (
        <div className="inline-flex items-center">
            <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
            Mengunduh...
        </div>
    );
}

export default function ReportCenter({ auth }) {
    const [selectedReport, setSelectedReport] = useState("");
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadMessage, setDownloadMessage] = useState("");
    const [showNotification, setShowNotification] = useState(false);
    const [downloadInfo, setDownloadInfo] = useState("");

    const handleReportChange = (e) => {
        setSelectedReport(e.target.value);
        setDownloadInfo(""); // Reset download info when report type changes
    };

    const handleFormatChange = (e) => {
        const format = e.target.value;
        const reportType = selectedReport;

        if (reportType && format) {
            const formatText =
                format === "excel" ? "Excel (.xlsx)" : "PDF (.pdf)";
            const reportText = getReportDisplayName(reportType);
            setDownloadInfo(
                `File yang akan diunduh: ${reportText} dalam format ${formatText}`
            );
        }
    };

    const getReportDisplayName = (type) => {
        const reportNames = {
            feedback: "Laporan Feedback Pelanggan",
            pelanggan: "Daftar Pelanggan",
            kunjungan: "Jadwal Kunjungan",
            interaksi: "Interaksi",
            pemakaian_daya: "Pemakaian Daya",
        };
        return reportNames[type] || type;
    };

    const handleDownload = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const jenisLaporan = formData.get("jenis_laporan");
        const format = formData.get("format");

        if (!jenisLaporan || !format) {
            setDownloadMessage(
                "❌ Silakan pilih jenis laporan dan format unduhan"
            );
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
            return;
        }

        setIsDownloading(true);
        setDownloadMessage(
            `📥 Dokumen ${getReportDisplayName(jenisLaporan)} sedang diunduh...`
        );
        setShowNotification(true);

        try {
            // Buat URL dengan query parameters
            const params = new URLSearchParams({
                jenis_laporan: jenisLaporan,
                format: format,
            });

            // Tambahkan filter jika ada
            if (jenisLaporan === "feedback") {
                const startDate = formData.get("start_date");
                const endDate = formData.get("end_date");
                if (startDate) params.append("start_date", startDate);
                if (endDate) params.append("end_date", endDate);
            } else if (jenisLaporan === "kunjungan") {
                const bulan = formData.get("bulan");
                if (bulan) params.append("bulan", bulan);
            } else if (jenisLaporan === "pemakaian_daya") {
                const bulanTahun = formData.get("bulan_tahun");
                if (bulanTahun) params.append("bulan_tahun", bulanTahun);
            }

            const url = `${route("laporan.export")}?${params.toString()}`;

            // Buat link download dan trigger download
            const link = document.createElement("a");
            link.href = url;
            link.download = "";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Update pesan sukses
            setDownloadMessage(
                `✅ Dokumen ${getReportDisplayName(
                    jenisLaporan
                )} berhasil diunduh!`
            );

            // Reset pesan setelah 5 detik
            setTimeout(() => {
                setShowNotification(false);
                setDownloadMessage("");
            }, 5000);
        } catch (error) {
            setDownloadMessage(`❌ Gagal mengunduh dokumen: ${error.message}`);
            setTimeout(() => {
                setShowNotification(false);
                setDownloadMessage("");
            }, 5000);
        } finally {
            setIsDownloading(false);
        }
    };

    const closeNotification = () => {
        setShowNotification(false);
        setDownloadMessage("");
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight flex items-center gap-2">
                    📊 Pusat Laporan & Analitik
                </h2>
            }
        >
            <Head title="Pusat Laporan" />

            <div className="py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Notifikasi Download */}
                    <DownloadNotification
                        message={downloadMessage}
                        isVisible={showNotification}
                        onClose={closeNotification}
                        isDownloading={isDownloading}
                    />

                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6">
                            {/* Header Info */}
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                📄 Unduh Laporan
                            </h3>
                            <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                                Gunakan halaman ini untuk mengunduh laporan
                                penting dalam format Excel atau PDF. Pilih jenis
                                laporan yang tersedia, lalu pilih format
                                unduhan.
                            </p>

                            {/* Form Unduh Laporan */}
                            <form
                                onSubmit={handleDownload}
                                className="mt-6 space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Jenis Laporan */}
                                    <div>
                                        <InputLabel
                                            htmlFor="jenis_laporan"
                                            value="Jenis Laporan"
                                        />
                                        <select
                                            id="jenis_laporan"
                                            name="jenis_laporan"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
                                            onChange={handleReportChange}
                                            required
                                        >
                                            <option value="">
                                                -- Pilih Laporan --
                                            </option>
                                            <option value="feedback">
                                                Laporan Feedback Pelanggan
                                            </option>
                                            <option value="pelanggan">
                                                Daftar Pelanggan
                                            </option>
                                            <option value="kunjungan">
                                                Jadwal Kunjungan
                                            </option>
                                            <option value="interaksi">
                                                Interaksi
                                            </option>
                                            <option value="pemakaian_daya">
                                                Pemakaian Daya
                                            </option>
                                        </select>
                                        <p className="mt-1 text-xs text-gray-500">
                                            Pilih jenis laporan yang ingin Anda
                                            unduh.
                                        </p>
                                    </div>

                                    {/* Format Unduhan */}
                                    <div>
                                        <InputLabel
                                            htmlFor="format"
                                            value="Format Unduhan"
                                        />
                                        <select
                                            id="format"
                                            name="format"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
                                            onChange={handleFormatChange}
                                            required
                                        >
                                            <option value="excel">
                                                📊 Excel (.xlsx)
                                            </option>
                                            <option value="pdf">
                                                📄 PDF (.pdf)
                                            </option>
                                        </select>
                                        <p className="mt-1 text-xs text-gray-500">
                                            Format laporan yang tersedia saat
                                            ini: Excel.
                                        </p>
                                    </div>
                                </div>

                                {/* Filter Dinamis */}
                                {selectedReport === "feedback" && (
                                    <div className="border-t border-gray-200 pt-6">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                                            Filter Laporan Feedback
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <InputLabel
                                                    htmlFor="start_date"
                                                    value="Tanggal Mulai"
                                                />
                                                <input
                                                    type="date"
                                                    id="start_date"
                                                    name="start_date"
                                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
                                                />
                                            </div>
                                            <div>
                                                <InputLabel
                                                    htmlFor="end_date"
                                                    value="Tanggal Selesai"
                                                />
                                                <input
                                                    type="date"
                                                    id="end_date"
                                                    name="end_date"
                                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedReport === "kunjungan" && (
                                    <div className="border-t border-gray-200 pt-6">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                                            Filter Jadwal Kunjungan
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <InputLabel
                                                    htmlFor="bulan"
                                                    value="Bulan"
                                                />
                                                <input
                                                    type="month"
                                                    id="bulan"
                                                    name="bulan"
                                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedReport === "pemakaian_daya" && (
                                    <div className="border-t border-gray-200 pt-6">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                                            Filter Pemakaian Daya
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <InputLabel
                                                    htmlFor="bulan_tahun"
                                                    value="Bulan/Tahun"
                                                />
                                                <input
                                                    type="month"
                                                    id="bulan_tahun"
                                                    name="bulan_tahun"
                                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Tombol */}
                                <div className="flex justify-end pt-4">
                                    <PrimaryButton
                                        type="submit"
                                        className="px-6 min-w-[140px]"
                                        disabled={isDownloading}
                                    >
                                        {isDownloading ? (
                                            <LoadingSpinner />
                                        ) : (
                                            "🚀 Unduh Laporan"
                                        )}
                                    </PrimaryButton>
                                </div>

                                {/* Informasi File yang akan diunduh */}
                                {downloadInfo && (
                                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                        <div className="flex items-center gap-2 text-blue-800">
                                            <span className="text-blue-600">
                                                ℹ️
                                            </span>
                                            <span className="text-sm font-medium">
                                                {downloadInfo}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Tips Section */}
                    <div className="mt-8 bg-indigo-50 p-4 rounded-lg text-sm text-gray-700">
                        💡 <span className="font-semibold">Tips:</span> Gunakan
                        filter tanggal untuk mempersempit data laporan agar file
                        lebih ringan dan mudah dianalisis.
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
