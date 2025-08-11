<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Jadwal Kunjungan</title>
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
        <h2>Laporan Jadwal Kunjungan</h2>
        <p>Tanggal Cetak: {{ date('d-m-Y H:i') }}</p>
    </div>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Nama Perusahaan</th>
                <th>ID Pel</th>
                <th>Nama PIC</th>
                <th>Tanggal</th>
                <th>Tujuan</th>
                <th>Hasil</th>
                <th>Status</th>
                <th>Petugas</th>
            </tr>
        </thead>
        <tbody>
            @foreach($jadwalKunjungans as $i => $jadwal)
            <tr>
                <td>{{ $i+1 }}</td>
                <td>{{ $jadwal->pelanggan->nama_perusahaan ?? '-' }}</td>
                <td>{{ $jadwal->pelanggan->id_pel ?? '-' }}</td>
                <td>{{ $jadwal->pelanggan->nama ?? '-' }}</td>
                <td>{{ $jadwal->tanggal }}</td>
                <td>{{ $jadwal->tujuan }}</td>
                <td>{{ $jadwal->hasil ?? '-' }}</td>
                <td>{{ $jadwal->status }}</td>
                <td>{{ $jadwal->user->name ?? '-' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
