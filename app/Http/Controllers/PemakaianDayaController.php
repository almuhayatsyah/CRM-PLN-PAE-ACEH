<?php

namespace App\Http\Controllers;

use App\Models\PemakaianDaya;
use App\Models\Pelanggan;
use App\Models\User;
use App\Models\Notifikasi;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\PemakaianDayaExport;

class PemakaianDayaController extends Controller
{

    public function index(): Response
    {
        $pemakaianDayas = PemakaianDaya::with('pelanggan:id,nama_perusahaan,id_pel')
            ->latest('bulan_tahun')
            ->paginate(15);

        // --- TAMBAHKAN LOGIKA STATISTIK DI SINI ---
        $stats = [
            'total_anomali' => PemakaianDaya::where('flag_anomali', true)->count(),
            // Anda bisa menambahkan statistik lain di sini nanti
        ];

        return Inertia::render('PemakaianDaya/Index', [
            'pemakaianDayas' => $pemakaianDayas,
            'stats' => $stats, // Kirim data statistik ke frontend
        ]);
    }

    public function create(Request $request): Response
    {
        $pelanggan = Pelanggan::findOrFail($request->query('pelanggan'));
        return Inertia::render('PemakaianDaya/Create', ['pelanggan' => $pelanggan]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'pelanggan_id' => 'required|exists:pelanggans,id',
            'bulan_tahun' => ['required', 'date_format:Y-m', Rule::unique('pemakaian_dayas')->where(function ($query) use ($request) {
                return $query->where('pelanggan_id', $request->pelanggan_id);
            })],
            'pemakaian_kwh' => 'required|numeric|min:0',
            'beban_puncak' => 'nullable|numeric|min:0',
        ]);

        $ambangBatas = 0.5;
        $flagAnomali = false;

        $riwayatPemakaian = PemakaianDaya::where('pelanggan_id', $validated['pelanggan_id'])
            ->latest('bulan_tahun')
            ->take(3)
            ->pluck('pemakaian_kwh');

        if ($riwayatPemakaian->count() > 0) {
            $rataRata = $riwayatPemakaian->avg();
            $pemakaianBaru = (float) $validated['pemakaian_kwh'];

            if ($rataRata > 0 && (abs($pemakaianBaru - $rataRata) / $rataRata) > $ambangBatas) {
                $flagAnomali = true;
            }
        }

        $validated['flag_anomali'] = $flagAnomali;

        $pemakaianDaya = PemakaianDaya::create($validated);

        if ($flagAnomali) {
            $pelanggan = Pelanggan::find($validated['pelanggan_id']);
            $penerimaNotifikasi = User::role(['Admin', 'Manajer'])->get();
            foreach ($penerimaNotifikasi as $user) {
                Notifikasi::create([
                    'user_id' => $user->id,
                    'pesan' => "Terdeteksi anomali pemakaian daya pada {$pelanggan->nama_perusahaan} untuk bulan {$validated['bulan_tahun']}."
                ]);
            }
        }

        return redirect()->route('pelanggan.show', $validated['pelanggan_id'])
            ->with('success', 'Data pemakaian daya berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PemakaianDaya $pemakaianDaya): Response
    {
        $pemakaianDaya->load('pelanggan:id,nama_perusahaan');
        return Inertia::render('PemakaianDaya/Edit', [
            'pemakaianDaya' => $pemakaianDaya,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PemakaianDaya $pemakaianDaya): RedirectResponse
    {
        $validated = $request->validate([
            'bulan_tahun' => ['required', 'date_format:Y-m', Rule::unique('pemakaian_dayas')->where(function ($query) use ($request, $pemakaianDaya) {
                return $query->where('pelanggan_id', $pemakaianDaya->pelanggan_id);
            })->ignore($pemakaianDaya->id)],
            'pemakaian_kwh' => 'required|numeric|min:0',
            'beban_puncak' => 'nullable|numeric|min:0',
        ]);

        $pemakaianDaya->update($validated);

        return redirect()->route('pelanggan.show', $pemakaianDaya->pelanggan_id)
            ->with('success', 'Data pemakaian daya berhasil diperbarui.');
    }


    public function destroy(PemakaianDaya $pemakaianDaya): RedirectResponse
    {
        $pelangganId = $pemakaianDaya->pelanggan_id;
        $pemakaianDaya->delete();

        return redirect()->route('pelanggan.show', $pelangganId)
            ->with('success', 'Data pemakaian daya berhasil dihapus.');
    }
    public function export()
    {
        return Excel::download(new PemakaianDayaExport, 'pemakaian_daya.xlsx');
    }
}
