<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\App;
use App\Models\Pelanggan;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        $pelanggans = Pelanggan::all();

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => App::VERSION(),
            'phpVersion' => PHP_VERSION,
            'pelanggans' => $pelanggans,
        ]);
    }
}
