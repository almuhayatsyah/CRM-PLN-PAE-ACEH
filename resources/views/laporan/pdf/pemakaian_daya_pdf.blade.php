<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Pemakaian Daya</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #333; padding: 6px 8px; text-align: left; }
        th { background: #f2f2f2; }
        h2 { margin-bottom: 0; }
        .header { margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <h2>Laporan Pemakaian Daya</h2>
        <p>Tanggal Cetak: {{ date('d-m-Y H:i') }}</p>
    </div>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>ID Pel</th>
                <th>Nama Perusahaan</th>
                <th>Bulan/Tahun</th>
                <th>Pemakaian KWH</th>
                <th>Beban Puncak</th>
                <th>Flag Anomali</th>
            </tr>
        </thead>
        <tbody>
            @foreach($pemakaianDayas as $i => $data)
            <tr>
                <td>{{ $i+1 }}</td>
                <td>{{ $data->pelanggan->id_pel ?? '-' }}</td>
                <td>{{ $data->pelanggan->nama_perusahaan ?? '-' }}</td>
                <td>{{ $data->bulan_tahun }}</td>
                <td>{{ number_format($data->pemakaian_kwh, 2, ',', '.') }}</td>
                <td>{{ number_format($data->beban_puncak, 2, ',', '.') }}</td>
                <td>{{ $data->flag_anomali ? 'Ya' : 'Tidak' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
