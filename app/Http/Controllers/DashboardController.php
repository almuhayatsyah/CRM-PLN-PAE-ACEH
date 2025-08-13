<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\Interaksi;
use App\Models\JadwalKunjungan;
use App\Models\PemakaianDaya;
use App\Models\Pelanggan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        // --- DASHBOARD UNTUK ADMIN & MANAJER ---
        if ($user->hasRole('Admin') || $user->hasRole('Manajer')) {

            $stats = [
                'total_pelanggan' => Pelanggan::count(),
                'total_user' => User::count(),
                'feedback_baru' => Feedback::where('status', 'Diterima')->count(),
                'kunjungan_terjadwal' => JadwalKunjungan::where('status', 'Dijadwalkan')->count(),
                'total_anomali' => PemakaianDaya::where('flag_anomali', true)->count(),
            ];

            $customerComposition = Pelanggan::select('kriteria_prioritas', DB::raw('count(*) as total'))
                ->groupBy('kriteria_prioritas')
                ->pluck('total', 'kriteria_prioritas');

            $recentFeedbacks = Feedback::with('pelanggan:id,nama_perusahaan')->latest()->take(5)->get();
            $pelangganList = Pelanggan::select('id', 'nama_perusahaan')->orderBy('nama_perusahaan')->get();
            $averagePowerUsage = PemakaianDaya::select('bulan_tahun', DB::raw('AVG(pemakaian_kwh) as rata_rata_kwh'))
                ->groupBy('bulan_tahun')
                ->orderBy('bulan_tahun', 'asc')
                ->get();

            // Tentukan view berdasarkan peran
            $dashboardView = $user->hasRole('Admin') ? 'Dashboard/Admin' : 'Dashboard/Manajer';

            return Inertia::render($dashboardView, [
                'stats' => $stats,
                'customerComposition' => $customerComposition,
                'recentFeedbacks' => $recentFeedbacks,
                'pelangganList' => $pelangganList,
                'averagePowerUsage' => $averagePowerUsage,
            ]);
        }
        if ($user->hasRole('Staff')) {
            // Mengambil jadwal kunjungan yang akan datang untuk staff ini
            $jadwalKunjungan = JadwalKunjungan::where('user_id', $user->id)
                ->where('status', 'Dijadwalkan')
                ->whereDate('tanggal', '>=', now())
                ->with('pelanggan:id,nama_perusahaan')
                ->orderBy('tanggal', 'asc')
                ->take(5)
                ->get();

            // Mengambil feedback yang perlu ditindaklanjuti
            $feedbackBaru = Feedback::whereIn('status', ['Diterima', 'Diproses'])
                ->with('pelanggan:id,nama_perusahaan')
                ->latest()
                ->take(5)
                ->get();

            // Daftar pelanggan untuk referensi cepat
            $pelangganList = Pelanggan::select('id', 'nama_perusahaan')
                ->orderBy('nama_perusahaan')
                ->get();

            // Komposisi pelanggan berdasarkan tingkat tegangan (TM/TT)
            // Samakan logika dengan Admin yang berbasis 'kriteria_prioritas'
            $teganganComposition = [
                'Tegangan Menengah' => Pelanggan::where('kriteria_prioritas', 'Tegangan Menengah')->count(),
                'Tegangan Tinggi' => Pelanggan::where('kriteria_prioritas', 'Tegangan Tinggi')->count(),
            ];

            return Inertia::render('Dashboard/Staff', [
                'jadwalKunjungan' => $jadwalKunjungan,
                'feedbackBaru' => $feedbackBaru,
                'pelangganList' => $pelangganList,
                'teganganComposition' => $teganganComposition,
            ]);
        }


        // --- DASHBOARD UNTUK PELANGGAN ---
        if ($user->hasRole('Pelanggan') && $user->pelanggan) {
            $user->load(['pelanggan' => function ($query) {
                $query->with([
                    'feedbacks' => function ($query) {
                        $query->latest()->with(['penindakLanjut:id,name']);
                    },
                    'pemakaianDayas' => function ($query) {
                        $query->oldest('bulan_tahun');
                    }
                ]);
            }]);

            return Inertia::render('Dashboard/Pelanggan', [
                'pelanggan' => $user->pelanggan,
            ]);
        }

        // --- DASHBOARD DEFAULT (UNTUK STAFF, DLL) ---
        return Inertia::render('Dashboard');
    }

    //dashboard Manajer//



}
