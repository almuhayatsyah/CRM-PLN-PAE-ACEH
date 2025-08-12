<?php

namespace App\Http\Controllers;

use App\Models\Pelanggan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\PelangganExport;



class PelangganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        // Mulai query
        $query = Pelanggan::query();

        // Filter berdasarkan nama perusahaan
        if ($request->filled('nama_perusahaan')) {
            $query->where('nama_perusahaan', $request->nama_perusahaan);
        }

        // Filter berdasarkan ID Pelanggan
        if ($request->filled('id_pel')) {
            $query->where('id_pel', $request->id_pel);
        }

        // Filter berdasarkan kriteria prioritas
        if ($request->filled('kriteria_prioritas')) {
            $query->where('kriteria_prioritas', $request->kriteria_prioritas);
        }

        // Ambil data pelanggan dengan pagination
        $pelanggans = $query->latest()->paginate(10)->withQueryString();

        // Ambil daftar unik nama perusahaan untuk dropdown
        $namaPerusahaanList = Pelanggan::select('nama_perusahaan')
            ->whereNotNull('nama_perusahaan')
            ->distinct()
            ->orderBy('nama_perusahaan')
            ->pluck('nama_perusahaan');

        // Ambil daftar unik ID pelanggan untuk dropdown
        $idPelList = Pelanggan::select('id_pel')
            ->whereNotNull('id_pel')
            ->distinct()
            ->orderBy('id_pel')
            ->pluck('id_pel');

        // Hitung jumlah pelanggan berdasarkan kriteria prioritas (gunakan nilai yang konsisten)
        $jumlahTeganganTinggi = Pelanggan::where('kriteria_prioritas', 'Tegangan Tinggi')->count();
        $jumlahTeganganMenengah = Pelanggan::where('kriteria_prioritas', 'Tegangan Menengah')->count();

        // Kirim data ke view Inertia
        return Inertia::render('Pelanggan/Index', [
            'pelanggans' => $pelanggans,
            'filters' => $request->only(['nama_perusahaan', 'id_pel', 'kriteria_prioritas']),
            'namaPerusahaanList' => $namaPerusahaanList,
            'idPelList' => $idPelList,
            'jumlahTeganganTinggi' => $jumlahTeganganTinggi,
            'jumlahTeganganMenengah' => $jumlahTeganganMenengah,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Pelanggan/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'id_pel' => 'required|string|unique:pelanggans|max:255',
            'nama_perusahaan' => 'required|string|max:255',
            'nama' => 'required|string|max:255',
            'alamat_perusahaan' => 'nullable|string|max:255',
            'kontak' => 'required|string|max:255',
            'kapasitas_daya' => 'required|numeric',
            'sektor' => 'required|string|max:255',
            'progres' => 'required|string|max:255',
            'peruntukan' => 'required|string|max:255',
            'up3' => 'required|string|max:255',
            'ulp' => 'required|string|max:255',
            'kriteria_prioritas' => 'required|string|max:255',
        ]);

        $validated['user_id'] = $request->user()->id;

        Pelanggan::create($validated);

        return redirect(route('pelanggan.index'))->with('success', 'Pelanggan berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pelanggan $pelanggan): Response
    {
        return Inertia::render('Pelanggan/Edit', [
            'pelanggan' => $pelanggan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pelanggan $pelanggan): RedirectResponse
    {
        $validated = $request->validate([
            'id_pel' => ['required', 'string', Rule::unique('pelanggans')->ignore($pelanggan->id), 'max:255'],
            'nama_perusahaan' => 'required|string|max:255',
            'nama' => 'required|string|max:255',
            'kontak' => 'required|string|max:255',
            'alamat_perusahaan' => 'nullable|string|max:255',
            'kapasitas_daya' => 'required|numeric',
            'sektor' => 'required|string|max:255',
            'progres' => 'required|string|max:255',
            'keterangan' => 'required|string|max:255',
            'peruntukan' => 'required|string|max:255',
            'tarif' => 'required|string|max:255',
            'up3' => 'required|string|max:255',
            'ulp' => 'required|string|max:255',
            'kriteria_prioritas' => 'required|string|max:255',
        ]);

        $pelanggan->update($validated);

        return redirect(route('pelanggan.index'))->with('success', 'Data pelanggan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Pelanggan $pelanggan): RedirectResponse
    {
        // Cek apakah user adalah manajer, jika ya tolak akses
        if ($request->user()->hasRole('Manajer')) {
            return redirect()->back()->with('error', 'Manajer tidak diizinkan menghapus data pelanggan.');
        }

        // Hapus data pelanggan dari database
        $pelanggan->delete();

        // Arahkan kembali ke halaman daftar pelanggan dengan pesan sukses
        return redirect(route('pelanggan.index'))->with('success', 'Data pelanggan berhasil dihapus.');
    }

    public function show(Pelanggan $pelanggan): Response
    {
        // Memuat semua relasi yang dibutuhkan
        $pelanggan->load([
            'interaksis' => function ($query) {
                $query->latest()->with('user:id,name');
            },
            'jadwalKunjungans' => function ($query) {
                $query->latest()->with('user:id,name');
            },
            // --- TAMBAHKAN INI ---
            'pemakaianDayas' => function ($query) {
                $query->latest('bulan_tahun');
            }
        ]);

        return Inertia::render('Pelanggan/Show', [
            'pelanggan' => $pelanggan,
        ]);
    }
    public function export()
    {
        return Excel::download(new PelangganExport, 'pelanggan.xlsx');
    }
}
