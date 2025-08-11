<?php

namespace App\Exports;

use App\Models\Feedback;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class FeedbackExport implements FromCollection, WithHeadings, WithMapping
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        // Mengambil semua data feedback beserta relasi yang dibutuhkan
        return Feedback::with('pelanggan', 'penindakLanjut')->get();
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        // Di sinilah kita mendefinisikan header kolom yang ramah pengguna
        return [

            'ID Pelanggan',
            'Nama Perusahaan',
            'Skor',
            'Komentar',
            'Status',
            'Catatan Tindak Lanjut',
            'Ditindaklanjuti Oleh',
            'Tanggal Dibuat',
            'Tanggal Diperbarui',
        ];
    }

    /**
     * @param mixed $feedback
     *
     * @return array
     */
    public function map($feedback): array
    {
        // Di sini kita memetakan setiap baris data agar sesuai dengan urutan header
        return [

            $feedback->pelanggan->id_pel,
            $feedback->pelanggan->nama_perusahaan ?? 'N/A',
            $feedback->skor,
            $feedback->komentar,
            $feedback->status,
            $feedback->catatan_tindak_lanjut,
            $feedback->penindakLanjut->name ?? '-',
            $feedback->created_at->format('d-m-Y H:i'),
            $feedback->updated_at->format('d-m-Y H:i'),
        ];
    }
}
