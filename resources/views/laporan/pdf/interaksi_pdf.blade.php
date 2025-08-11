<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Interaksi</title>
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
        <h2>Laporan Interaksi</h2>
        <p>Tanggal Cetak: {{ date('d-m-Y H:i') }}</p>
    </div>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Nama Perusahaan</th>
                <th>Nama PIC</th>
                <th>ID Pel</th>
                <th>Jenis Interaksi</th>
                <th>Deskripsi</th>
                <th>Status</th>
                <th>Petugas</th>
            </tr>
        </thead>
        <tbody>
            @foreach($interaksis as $i => $interaksi)
            <tr>
                <td>{{ $i+1 }}</td>
                <td>{{ $interaksi->pelanggan->nama_perusahaan ?? '-' }}</td>
                <td>{{ $interaksi->pelanggan->nama ?? '-' }}</td>
                <td>{{ $interaksi->pelanggan->id_pel ?? '-' }}</td>
                <td>{{ $interaksi->jenis }}</td>
                <td>{{ $interaksi->deskripsi }}</td>
                <td>{{ $interaksi->status }}</td>
                <td>{{ $interaksi->user->name ?? '-' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
