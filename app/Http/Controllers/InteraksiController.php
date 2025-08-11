<?php

namespace App\Http\Controllers;

use App\Models\Interaksi;
use App\Models\Pelanggan;
use App\Exports\InteraksiExport;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class InteraksiController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */

    public function index(): Response
    {
        // Mengambil semua data interaksi, beserta data pelanggan dan user yang terkait
        $interaksis = Interaksi::with(['pelanggan:id,nama_perusahaan', 'user:id,name'])
            ->latest()
            ->get();

        return Inertia::render('Interaksi/Index', [
            'interaksis' => $interaksis,
        ]);
    }

    public function create(Request $request): Response
    {
        // Mengambil data pelanggan berdasarkan ID dari URL
        $pelanggan = Pelanggan::findOrFail($request->query('pelanggan'));

        return Inertia::render('Interaksi/Create', [
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
            'jenis' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'status' => 'required|string|max:255',
        ]);

        $validated['user_id'] = $request->user()->id;

        Interaksi::create($validated);

        return redirect()->route('pelanggan.show', $validated['pelanggan_id'])
            ->with('success', 'Interaksi baru berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Interaksi $interaksi): Response
    {
        // Memuat relasi pelanggan untuk menampilkan nama perusahaan di header
        $interaksi->load('pelanggan');

        return Inertia::render('Interaksi/Edit', [
            'interaksi' => $interaksi,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Interaksi $interaksi): RedirectResponse
    {
        $validated = $request->validate([
            'jenis' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'status' => 'required|string|max:255',
        ]);

        $interaksi->update($validated);

        return redirect()->route('pelanggan.show', $interaksi->pelanggan_id)
            ->with('success', 'Interaksi berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Interaksi $interaksi): RedirectResponse
    {
        $pelangganId = $interaksi->pelanggan_id;
        $interaksi->delete();

        return redirect()->route('pelanggan.show', $pelangganId)
            ->with('success', 'Interaksi berhasil dihapus.');
    }

    public function export()
    {
        return Excel::download(new InteraksiExport, 'interaksi.xlsx');
    }
}
