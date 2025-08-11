<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PelangganFactory extends Factory
{
    public function definition(): array
    {
        return [
            'id_pel' => $this->faker->unique()->numerify('53##########'),
            'user_id' => User::inRandomOrder()->first()->id, // Mengambil user_id secara acak
            'kode_pln' => $this->faker->optional()->numerify('PLN###'),
            'nama_perusahaan' => $this->faker->company(),
            'nama' => $this->faker->name(),
            'kontak' => $this->faker->phoneNumber(),
            'kapasitas_daya' => $this->faker->randomElement([1300, 2200, 3500, 5500, 6600]),
            'sektor' => $this->faker->randomElement(['Industri', 'Bisnis', 'Pemerintahan']),
            'peruntukan' => $this->faker->bs(),
            'up3' => 'UP3 Banda Aceh',
            'ulp' => 'ULP Banda Aceh',
            'kriteria_prioritas' => $this->faker->randomElement(['Tegangan Tinggi', 'Tegangan Menengah']),
        ];
    }
}
