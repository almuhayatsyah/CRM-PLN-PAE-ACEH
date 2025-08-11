<?php

namespace App\Exports;

use App\Models\JadwalKunjungan;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class JadwalKunjunganExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return JadwalKunjungan::with(['pelanggan', 'user'])->get();
    }

    public function headings(): array
    {
        return [
            'No',
            'Nama Perusahaan',
            'ID Pelanggan',
            'Nama PIC',
            'Tanggal',
            'Tujuan',
            'Hasil',
            'Status',
            'Petugas',
        ];
    }

    public function map($jadwal): array
    {
        return [
            $jadwal->id,
            $jadwal->pelanggan ? $jadwal->pelanggan->nama_perusahaan : '',
            $jadwal->pelanggan ? $jadwal->pelanggan->id_pel : '',
            $jadwal->pelanggan ? $jadwal->pelanggan->nama : '',
            $jadwal->tanggal,
            $jadwal->tujuan,
            $jadwal->hasil,
            $jadwal->status,
            $jadwal->user ? $jadwal->user->name : '',
        ];
    }
}
