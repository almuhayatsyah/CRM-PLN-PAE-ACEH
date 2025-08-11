<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Pelanggan; // <-- 1. Import model Pelanggan
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // --- 1. Buat User Admin ---
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@crm.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
            ]
        );
        $adminRole = Role::findByName('Admin');
        $adminUser->assignRole($adminRole);

        // --- 2. Buat User Staff Contoh ---
        $staffUser = User::firstOrCreate(
            ['email' => 'staff@crm.com'],
            [
                'name' => 'Staff Contoh',
                'password' => Hash::make('password'),
            ]
        );
        $staffRole = Role::findByName('Staff');
        $staffUser->assignRole($staffRole);


        // --- 3. Buat Pelanggan dan Akun Loginnya ---
        $pelangganRole = Role::findByName('Pelanggan');

        // Buat 5 profil perusahaan contoh menggunakan factory
        Pelanggan::factory(5)->create()->each(function ($pelanggan) use ($pelangganRole) {
            // Untuk setiap profil perusahaan yang dibuat, buatkan satu akun user
            User::factory()->create([
                'name' => 'User ' . $pelanggan->nama_perusahaan,
                'email' => strtolower(str_replace(' ', '', $pelanggan->nama_perusahaan)) . '@example.com',
                'password' => Hash::make('password'),
                'pelanggan_id' => $pelanggan->id, // <-- Kunci penghubungnya ada di sini
            ])->assignRole($pelangganRole);
        });
    }
}
