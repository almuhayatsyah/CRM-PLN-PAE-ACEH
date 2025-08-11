<?php

namespace App\Exports;

use App\Models\Pelanggan;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class PelangganExport implements FromCollection, WithHeadings, WithMapping
{
    private int $rowNumber = 0;

    public function collection()
    {
        $this->rowNumber = 0; // Reset nomor urut setiap export
        return Pelanggan::all();
    }

    public function headings(): array
    {
        return [
            'No',
            'ID Pelanggan',
            'Nama Perusahaan',
            'Alamat Perusahaan',
            'Nama PIC',
            'Kontak',
            'Tarif',
            'Kapasitas Daya',
            'Sektor',
            'Peruntukan',
            'UP3',
            'ULP',
            'Kriteria Prioritas',
            'Progres',
            'Keterangan',
        ];
    }

    public function map($pelanggan): array
    {
        $this->rowNumber++;
        return [
            $this->rowNumber,
            $pelanggan->id_pel,
            $pelanggan->nama_perusahaan,
            $pelanggan->alamat_perusahaan,
            $pelanggan->nama,
            $pelanggan->kontak,
            $pelanggan->tarif,
            $pelanggan->kapasitas_daya,
            $pelanggan->sektor,
            $pelanggan->peruntukan,
            $pelanggan->up3,
            $pelanggan->ulp,
            $pelanggan->kriteria_prioritas,
            $pelanggan->progres,
            $pelanggan->keterangan,
        ];
    }
}
