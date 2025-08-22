<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Laporan Interaksi Pelanggan</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;
            color: #333;
            margin: 0;
            padding: 20px;
        }

        .header {
            display: flex;
            align-items: center;
            margin-bottom: 25px;
            border-bottom: 2px solid #f0f0f0;
            padding-bottom: 15px;
        }

        .logo {
            height: 70px;
            margin-right: 20px;
        }

        .header-text {
            flex-grow: 1;
        }

        .header h1 {
            margin: 0;
            color: #005baa;
            font-size: 22px;
            font-weight: 600;
        }

        .header p {
            margin: 5px 0 0;
            color: #666;
        }

        .report-title {
            color: #005baa;
            font-size: 18px;
            margin-bottom: 5px;
        }

        .report-date {
            color: #666;
            margin-bottom: 20px;
            font-size: 11px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        th {
            background-color: #005baa;
            color: white;
            font-weight: 500;
            padding: 10px 12px;
            text-align: left;
            font-size: 11px;
            text-transform: uppercase;
        }

        td {
            padding: 10px 12px;
            border-bottom: 1px solid #e0e0e0;
            font-size: 11px;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        tr:hover {
            background-color: #f0f7ff;
        }

        .footer {
            margin-top: 30px;
            text-align: right;
            font-size: 11px;
            color: #666;
            border-top: 1px solid #eee;
            padding-top: 10px;
        }

        .status-badge {
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 10px;
            display: inline-block;
        }

        .status-selesai {
            background-color: #e6f7ee;
            color: #00a854;
        }

        .status-proses {
            background-color: #fff4e6;
            color: #fa8c16;
        }
    </style>
</head>

<body>
    <div class="header">
        <img src="{{ public_path('images/logo-pln.png') }}" alt="Logo PLN" class="logo">
        <div class="header-text">
            <h1>PT PLN (Persero) UID Aceh</h1>
            <p>Jl. Tgk. Imum Lueng Bata No.1, Lueng Bata, Banda Aceh</p>
        </div>
    </div>

    <div class="report-title">Laporan Interaksi Pelanggan</div>
    <div class="report-date">Tanggal Cetak: {{ date('d-m-Y H:i') }}</div>

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
                <td>{{ $interaksi->pelanggan?->nama_perusahaan ?? '-' }}</td>
                <td>{{ $interaksi->pelanggan?->nama ?? '-' }}</td>
                <td>{{ $interaksi->pelanggan?->id_pel ?? '-' }}</td>
                <td>{{ $interaksi->jenis }}</td>
                <td>{{ $interaksi->deskripsi }}</td>
                <td>
                    <span class="status-badge {{ $interaksi->status == 'Selesai' ? 'status-selesai' : 'status-proses' }}">
                        {{ $interaksi->status }}
                    </span>
                </td>
                <td>{{ $interaksi->user?->name ?? '-' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        Dokumen ini dicetak secara otomatis oleh Sistem Pelayanan Pelanggan PT PLN
    </div>
</body>

</html>