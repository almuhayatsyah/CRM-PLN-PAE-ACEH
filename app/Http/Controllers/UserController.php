<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Pelanggan; // <-- 1. Tambahkan model Pelanggan
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Illuminate\Http\RedirectResponse;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $users = User::with('roles')->latest()->get();

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $roles = Role::all();
        // 2. Ambil semua data pelanggan untuk ditampilkan di dropdown
        $pelanggans = Pelanggan::orderBy('nama_perusahaan')->get();

        return Inertia::render('Users/Create', [
            'roles' => $roles,
            'pelanggans' => $pelanggans, // 3. Kirim data pelanggan ke frontend
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|string|exists:roles,name',
            // 4. Validasi pelanggan_id: wajib ada jika perannya 'Pelanggan'
            'pelanggan_id' => 'nullable|required_if:role,Pelanggan|exists:pelanggans,id',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            // 5. Simpan pelanggan_id jika ada
            'pelanggan_id' => $request->pelanggan_id,
        ]);

        $user->assignRole($request->role);

        return redirect(route('users.index'))->with('success', 'Pengguna baru berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user): Response
    {
        $user->load('roles');
        $roles = Role::all();
        $pelanggans = Pelanggan::orderBy('nama_perusahaan')->get();

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'roles' => $roles,
            'pelanggans' => $pelanggans,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)->ignore($user->id)],
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|string|exists:roles,name',
            'pelanggan_id' => 'nullable|required_if:role,Pelanggan|exists:pelanggans,id',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            // Jika peran bukan Pelanggan, set pelanggan_id menjadi null
            'pelanggan_id' => $request->role === 'Pelanggan' ? $request->pelanggan_id : null,
        ]);

        if ($request->filled('password')) {
            $user->update(['password' => Hash::make($request->password)]);
        }

        $user->syncRoles($request->role);

        return redirect(route('users.index'))->with('success', 'Data pengguna berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        if ($user->id === auth()->id()) {
            // Menggunakan flash message error
            return redirect(route('users.index'))->with('error', 'Anda tidak dapat menghapus akun Anda sendiri.');
        }

        $user->delete();

        return redirect(route('users.index'))->with('success', 'Pengguna berhasil dihapus.');
    }
}
