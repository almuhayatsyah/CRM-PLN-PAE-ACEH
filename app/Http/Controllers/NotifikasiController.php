<?php

namespace App\Http\Controllers;

use App\Models\Notifikasi;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class NotifikasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $notifikasis = $user->notifikasis()->latest()->paginate(15);
        $user->unreadNotifikasis()->update(['dibaca' => true]);

        return Inertia::render('Notifikasi/Index', [
            'notifikasis' => $notifikasis,
        ]);
    }

    /**
     * Mark a specific notification as read and redirect.
     */
    public function markAsReadAndRedirect(Request $request, Notifikasi $notifikasi): RedirectResponse
    {
        $user = $request->user();

        // Keamanan: Pastikan pengguna yang login adalah pemilik notifikasi
        if ($user->id !== $notifikasi->user_id) {
            abort(403);
        }

        // Ubah status 'dibaca' menjadi true
        $notifikasi->update(['dibaca' => true]);

        // --- LOGIKA PENGALIHAN BERDASARKAN PERAN (PERBAIKAN KRUSIAL) ---
        // Jika pengguna adalah Pelanggan, arahkan ke dashboard mereka
        if ($user->hasRole('Pelanggan')) {
            return redirect()->route('dashboard');
        }

        // Jika pengguna adalah Admin/Manajer/Staff, arahkan ke halaman feedback internal
        return redirect()->route('feedback.index');
    }
}
