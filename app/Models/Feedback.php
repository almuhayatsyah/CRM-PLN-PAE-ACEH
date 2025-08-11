<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Feedback extends Model
{
    use HasFactory;
    protected $table = 'feedbacks';
    protected $fillable = [
        'pelanggan_id',
        'interaksi_id',
        'skor',
        'komentar',
        'status',
        'catatan_tindak_lanjut',
        'ditindak_lanjuti_oleh',

    ];

    public function pelanggan(): BelongsTo
    {
        return $this->belongsTo(Pelanggan::class);
    }

    public function interaksi(): BelongsTo
    {
        return $this->belongsTo(Interaksi::class);
    }
    public function penindakLanjut(): BelongsTo
    {
        // Menghubungkan ke model User melalui kolom 'ditindak_lanjuti_oleh'
        return $this->belongsTo(User::class, 'ditindak_lanjuti_oleh');
    }
}
