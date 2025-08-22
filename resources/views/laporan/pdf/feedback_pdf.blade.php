<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Laporan Feedback Pelanggan</title>
    <style>
        body {
            font-family: sans-serif;
            margin: 0;
            padding: 0;
            font-size: 12px;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
            position: relative;
        }

        .header img {
            position: absolute;
            left: 0;
            top: 0;
            height: 60px;
        }

        .header-content {
            display: inline-block;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .header p {
            margin: 5px 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }

        thead {
            background-color: #f2f2f2;
        }

        th {
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div class="header">
        <img src="{{ public_path('images/logo-pln.png') }}" alt="Logo PLN">
        <div class="header-content">
            <h1>Laporan Feedback Pelanggan</h1>
            <p>PT PLN (Persero) UID Aceh</p>
            <p>Priority Account Executive</p>
            <p>Tanggal Cetak: {{ now()->format('d F Y') }}</p>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>No.</th>
                <th>Tanggal</th>
                <th>Nama Perusahaan</th>
                <th>Skor</th>
                <th>Status</th>
                <th>Ditindaklanjuti Oleh</th>
                <th>Komentar</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($feedbacks as $feedback)
            <tr>
                <td>{{ $loop->iteration }}</td>
                <td>{{ $feedback->created_at->format('d-m-Y') }}</td>
                <td>{{ $feedback->pelanggan?->nama_perusahaan ?? 'N/A' }}</td>
                <td>{{ $feedback->skor }} / 5</td>
                <td>{{ $feedback->status }}</td>
                <td>{{ $feedback->penindakLanjut?->name ?? '-' }}</td>
                <td>{{ $feedback->komentar ?? '-' }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="7" style="text-align: center;">Tidak ada data feedback.</td>
            </tr>
            @endforelse
        </tbody>
    </table>
</body>

</html>