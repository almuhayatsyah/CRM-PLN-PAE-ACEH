<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Menggunakan firstOrCreate untuk mengecek sebelum membuat
        // Ini akan mencari role 'Admin', jika tidak ada, baru akan membuatnya.
        Role::firstOrCreate(['name' => 'Admin']);
        Role::firstOrCreate(['name' => 'Manajer']);
        Role::firstOrCreate(['name' => 'Staff']);
        Role::firstOrCreate(['name' => 'Pelanggan']);
    }
}
