<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany; // <-- 1. Tambahkan ini

class Pelanggan extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_pel',
        'user_id',
        'kode_pln',
        'nama_perusahaan',
        'alamat_perusahaan',
        'nama',
        'kontak',
        'tarif',
        'kapasitas_daya',
        'sektor',
        'peruntukan',
        'up3',
        'ulp',
        'kriteria_prioritas',
        'progres',
        'keterangan',
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all of the interaksis for the Pelanggan.
     */
    public function interaksis(): HasMany
    {
        return $this->hasMany(Interaksi::class);
    }

    /**
     * Get all of the jadwal kunjungans for the Pelanggan.
     */
    public function jadwalKunjungans(): HasMany
    {
        return $this->hasMany(JadwalKunjungan::class);
    }

    /**
     * Get all of the feedbacks for the Pelanggan.
     */
    public function feedbacks(): HasMany
    {
        return $this->hasMany(Feedback::class);
    }

    //pemakaian daya 

    public function pemakaianDayas(): HasMany
    {
        return $this->hasMany(PemakaianDaya::class);
    }
}
