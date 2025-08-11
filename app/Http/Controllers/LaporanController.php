<?php

namespace App\Http\Controllers;

use App\Exports\FeedbackExport;
use App\Exports\JadwalKunjunganExport;
use App\Exports\InteraksiExport;
use App\Models\Feedback;
use App\Models\PemakaianDaya;
use App\Models\Pelanggan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;

class LaporanController extends Controller
{
    /**
     * Display the main report download page.
     */
    public function index(): Response
    {
        return Inertia::render('Laporan/Index');
    }

    /**
     * Handle the export request for various reports.
     */
    public function export(Request $request)
    {
        $request->validate([
            'jenis_laporan' => 'required|string|in:feedback,pelanggan,kunjungan,interaksi,pemakaian_daya',
            'format' => 'required|string|in:excel,pdf',
        ]);

        $jenisLaporan = $request->input('jenis_laporan');
        $format = $request->input('format');
        $fileName = "laporan-{$jenisLaporan}-" . now()->format('Y-m-d');

        switch ($jenisLaporan) {
            case 'feedback':
                if ($format === 'excel') {
                    return Excel::download(new FeedbackExport, $fileName . '.xlsx');
                }
                if ($format === 'pdf') {
                    $feedbacks = Feedback::with('pelanggan', 'penindakLanjut')->get();
                    $pdf = Pdf::loadView('laporan.pdf.feedback_pdf', ['feedbacks' => $feedbacks]);
                    return $pdf->download($fileName . '.pdf');
                }
                break;
            case 'pemakaian_daya':
                if ($format === 'excel') {
                    return Excel::download(new \App\Exports\PemakaianDayaExport, $fileName . '.xlsx');
                }
                if ($format === 'pdf') {
                    $pemakaianDayas = \App\Models\PemakaianDaya::with('pelanggan')->get();
                    $pdf = Pdf::loadView('laporan.pdf.pemakaian_daya_pdf', ['pemakaianDayas' => $pemakaianDayas]);
                    return $pdf->download($fileName . '.pdf');
                }
                break;
            case 'pelanggan':
                if ($format === 'excel') {
                    return Excel::download(new \App\Exports\PelangganExport, $fileName . '.xlsx');
                }
                if ($format === 'pdf') {
                    $pelanggans = \App\Models\Pelanggan::with('interaksis', 'jadwalKunjungans')->get();
                    $pdf = Pdf::loadView('laporan.pdf.pelanggan_pdf', ['pelanggans' => $pelanggans]);
                    return $pdf->download($fileName . '.pdf');
                }
                break;
            case 'kunjungan':
                if ($format === 'excel') {
                    return Excel::download(new JadwalKunjunganExport, $fileName . '.xlsx');
                }
                if ($format === 'pdf') {
                    $jadwalKunjungans = \App\Models\JadwalKunjungan::with(['pelanggan', 'user'])->get();
                    $pdf = Pdf::loadView('laporan.pdf.jadwal_kunjungan_pdf', ['jadwalKunjungans' => $jadwalKunjungans]);
                    return $pdf->download($fileName . '.pdf');
                }
                break;
            case 'interaksi':
                if ($format === 'excel') {
                    return Excel::download(new InteraksiExport, $fileName . '.xlsx');
                }
                if ($format === 'pdf') {
                    $interaksis = \App\Models\Interaksi::with(['pelanggan', 'user'])->get();
                    $pdf = Pdf::loadView('laporan.pdf.interaksi_pdf', ['interaksis' => $interaksis]);
                    return $pdf->download($fileName . '.pdf');
                }
                break;
            default:
                return redirect()->back()->with('error', 'Jenis laporan tidak valid.');
        }
    }


    public function analisisPemakaianDaya(Request $request): Response
    {
        // Ambil semua pelanggan untuk dropdown filter
        $semuaPelanggan = Pelanggan::select('id', 'nama_perusahaan')->orderBy('nama_perusahaan')->get();

        $dataPelangganTerpilih = null;

        // Cek jika ada pelanggan yang dipilih dari filter
        if ($request->has('pelanggan')) {
            $dataPelangganTerpilih = Pelanggan::with(['pemakaianDayas' => function ($query) {
                $query->oldest('bulan_tahun');
            }])->find($request->query('pelanggan'));
        }

        return Inertia::render('Laporan/AnalisisPemakaianDaya', [
            'semuaPelanggan' => $semuaPelanggan,
            'pelangganTerpilih' => $dataPelangganTerpilih,
        ]);
    }
}
