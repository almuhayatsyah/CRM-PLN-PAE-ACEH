<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PemakaianDaya extends Model
{
    use HasFactory;

    protected $fillable = [
        'pelanggan_id',
        'bulan_tahun',
        'pemakaian_kwh',
        'beban_puncak',
        'flag_anomali',
    ];

    public function pelanggan(): BelongsTo
    {
        return $this->belongsTo(Pelanggan::class);
    }
}
