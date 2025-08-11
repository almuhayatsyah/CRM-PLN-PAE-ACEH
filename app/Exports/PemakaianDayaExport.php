<?php

namespace App\Exports;

use App\Models\PemakaianDaya;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class PemakaianDayaExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return PemakaianDaya::all();
    }

    public function headings(): array
    {
        return [
            'ID Pel',
            'Nama Perusahaan',
            'Bulan/Tahun',
            'Pemakaian KWH',
            'Beban Puncak',
            'Flag Anomali',
        ];
    }

    public function map($pemakaianDaya): array
    {
        return [
            $pemakaianDaya->pelanggan ? $pemakaianDaya->pelanggan->id_pel : '',
            $pemakaianDaya->pelanggan ? $pemakaianDaya->pelanggan->nama_perusahaan : '',
            $pemakaianDaya->bulan_tahun,
            $pemakaianDaya->pemakaian_kwh,
            $pemakaianDaya->beban_puncak,
            $pemakaianDaya->flag_anomali,
        ];
    }
}
