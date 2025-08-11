<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PelangganController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\InteraksiController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\JadwalKunjunganController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NotifikasiController;
use App\Http\Controllers\PemakaianDayaController;
use App\Http\Controllers\LaporanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Exports\FeedbackExport;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [WelcomeController::class, 'index']);

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/photo', [ProfileController::class, 'updatePhoto'])->name('profile.photo.update');

    // Resource Routes
    Route::resource('pelanggan', PelangganController::class)->middleware('role:Admin|Staff|Manajer');
    Route::resource('users', UserController::class)->middleware('role:Admin');
    Route::resource('interaksi', InteraksiController::class)->middleware('role:Admin|Staff|Manajer');
    Route::resource('jadwal-kunjungan', JadwalKunjunganController::class)->middleware('role:Admin|Staff|Manajer');
    Route::resource('feedback', FeedbackController::class)->middleware('auth');
    Route::resource('pemakaian-daya', PemakaianDayaController::class)->middleware('role:Admin|Staff|Manajer');
    Route::get('/laporan/feedback', [LaporanController::class, 'feedback'])->name('laporan.feedback')->middleware('role:Admin|Manajer|Staff');

    // Export Laporan Feedback Excel/pdf
    Route::get('/laporan', [LaporanController::class, 'index'])->name('laporan.index')->middleware('role:Admin|Manajer|Staff');
    Route::get('/laporan/export', [LaporanController::class, 'export'])->name('laporan.export')->middleware('role:Admin|Manajer|Staff');

    Route::get('/analisis/pemakaian-daya', [LaporanController::class, 'analisisPemakaianDaya'])->name('analisis.pemakaian-daya')->middleware('role:Admin|Manajer|Staff');

    // Notifikasi Routes
    Route::get('/notifikasi', [NotifikasiController::class, 'index'])->name('notifikasi.index');
    Route::get('/notifikasi/{notifikasi}/read', [NotifikasiController::class, 'markAsReadAndRedirect'])->name('notifikasi.read');
});

require __DIR__ . '/auth.php';
