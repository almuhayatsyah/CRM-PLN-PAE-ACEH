<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\User;
use App\Models\Notifikasi;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use App\Exports\FeedbackExport;
use Maatwebsite\Excel\Facades\Excel;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // --- PERBARUI DI SINI ---
        // Memuat relasi pelanggan dan penindakLanjut
        $feedbacks = Feedback::with([
            'pelanggan:id,nama_perusahaan',
            'penindakLanjut:id,name'
        ])->latest()->get();

        return Inertia::render('Feedback/Index', [
            'feedbacks' => $feedbacks,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'skor' => 'required|integer|min:1|max:5',
            'komentar' => 'nullable|string',
            'pelanggan_id' => 'required|exists:pelanggans,id'
        ]);

        if ($request->user()->pelanggan_id == $validated['pelanggan_id']) {
            $feedback = Feedback::create($validated + ['status' => 'Diterima']);

            $penerimaNotifikasi = User::role(['Admin', 'Manajer'])->get();

            foreach ($penerimaNotifikasi as $user) {
                Notifikasi::create([
                    'user_id' => $user->id,
                    'pesan' => "Feedback baru diterima dari {$feedback->pelanggan->nama_perusahaan}."
                ]);
            }

            return redirect()->back()->with('success', 'Terima kasih, feedback Anda telah kami terima.');
        }

        return redirect()->back()->with('error', 'Terjadi kesalahan.');
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feedback $feedback): Response
    {
        $feedback->load('pelanggan');

        return Inertia::render('Feedback/Edit', [
            'feedback' => $feedback,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Feedback $feedback): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|string|in:Diterima,Diproses,Selesai',
            'catatan_tindak_lanjut' => 'nullable|string',
        ]);

        $validated['ditindak_lanjuti_oleh'] = $request->user()->id;

        $feedback->update($validated);

        $customerUser = User::where('pelanggan_id', $feedback->pelanggan_id)->first();

        if ($customerUser) {
            Notifikasi::create([
                'user_id' => $customerUser->id,
                'pesan' => "Feedback Anda telah ditanggapi oleh tim kami dengan status: {$validated['status']}."
            ]);
        }

        return redirect()->route('feedback.index')->with('success', 'Tindak lanjut feedback berhasil disimpan.');
    }

    /**
     * Respond to feedback from PLN team
     */
    public function respond(Request $request, Feedback $feedback): RedirectResponse
    {
        $validated = $request->validate([
            'tanggapan_pln' => 'required|string|min:10',
            'status' => 'required|string|in:Diproses,Selesai',
            'follow_up' => 'nullable|string',
        ]);

        $validated['responder'] = $request->user()->name;
        $validated['tanggal_tanggapan'] = now();

        $feedback->update($validated);

        // Kirim notifikasi ke pelanggan
        $customerUser = User::where('pelanggan_id', $feedback->pelanggan_id)->first();
        if ($customerUser) {
            Notifikasi::create([
                'user_id' => $customerUser->id,
                'pesan' => "Feedback Anda telah dibalas oleh tim PLN. Silakan cek dashboard Anda."
            ]);
        }

        return redirect()->route('feedback.index')->with('success', 'Tanggapan PLN berhasil disimpan.');
    }


    public function destroy(Feedback $feedback): RedirectResponse
    {
        $feedback->delete();

        return redirect()->route('feedback.index')->with('success', 'Feedback berhasil dihapus.');
    }



    public function export()
    {
        return Excel::download(new FeedbackExport, 'feedback.xlsx');
    }
}
