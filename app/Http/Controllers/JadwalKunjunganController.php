<?php

namespace App\Http\Controllers;

use App\Models\JadwalKunjungan;
use App\Models\Pelanggan;
use App\Exports\JadwalKunjunganExport;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;



class JadwalKunjunganController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */

    public function index(): Response
    {
        $kunjungans = JadwalKunjungan::with(['pelanggan:id,nama_perusahaan', 'user:id,name'])
            ->latest('tanggal')
            ->get();

        return Inertia::render('JadwalKunjungan/Index', [
            'kunjungans' => $kunjungans,
        ]);
    }
    public function create(Request $request): Response
    {
        $pelanggan = Pelanggan::findOrFail($request->query('pelanggan'));

        return Inertia::render('JadwalKunjungan/Create', [
            'pelanggan' => $pelanggan
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'pelanggan_id' => 'required|exists:pelanggans,id',
            'tanggal' => 'required|date',
            'tujuan' => 'required|string',
            'status' => 'required|string|max:255',
        ]);

        $validated['user_id'] = $request->user()->id;

        JadwalKunjungan::create($validated);

        return redirect()->route('pelanggan.show', ['pelanggan' => $validated['pelanggan_id']])
            ->with('success', 'Jadwal kunjungan baru berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JadwalKunjungan $jadwalKunjungan): Response
    {
        // Memuat relasi pelanggan untuk menampilkan nama perusahaan di header
        $jadwalKunjungan->load('pelanggan');

        return Inertia::render('JadwalKunjungan/Edit', [
            'jadwalKunjungan' => $jadwalKunjungan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JadwalKunjungan $jadwalKunjungan): RedirectResponse
    {
        $validated = $request->validate([
            'tanggal' => 'required|date',
            'tujuan' => 'required|string',
            'status' => 'required|string|max:255',
        ]);

        $jadwalKunjungan->update($validated);

        return redirect()->route('pelanggan.show', $jadwalKunjungan->pelanggan_id)
            ->with('success', 'Jadwal kunjungan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JadwalKunjungan $jadwalKunjungan): RedirectResponse
    {
        $pelangganId = $jadwalKunjungan->pelanggan_id;
        $jadwalKunjungan->delete();

        return redirect()->route('pelanggan.show', $pelangganId)
            ->with('success', 'Jadwal kunjungan berhasil dihapus.');
    }

    public function export()
    {
        return Excel::download(new JadwalKunjunganExport, 'jadwal_kunjungan.xlsx');
    }
}
