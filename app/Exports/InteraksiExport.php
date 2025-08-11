<?php

namespace App\Exports;

use App\Models\Interaksi;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class InteraksiExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return Interaksi::with(['pelanggan', 'user'])->get();
    }

    public function headings(): array
    {
        return [
            'No',
            'Nama Perusahaan',
            'Nama PIC',
            'Id Pel',
            'Jenis Interaksi',
            'Deskripsi',
            'Status',
            'Petugas',
        ];
    }

    public function map($interaksi): array
    {
        return [
            $interaksi->id,
            $interaksi->pelanggan ? $interaksi->pelanggan->nama_perusahaan : '',
            $interaksi->pelanggan ? $interaksi->pelanggan->id_pel : '',
            $interaksi->jenis,
            $interaksi->deskripsi,
            $interaksi->status,
            $interaksi->user ? $interaksi->user->name : '',
        ];
    }
}
