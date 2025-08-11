<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Pelanggan</title>
    <<style>
    body {
        font-family: DejaVu Sans, sans-serif;
        font-size: 11px;
        margin: 0;
        padding: 0;
    }

    h2 {
        text-align: center;
        margin-bottom: 15px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        table-layout: auto; /* biarkan lebar otomatis */
    }

    th, td {
        border: 1px solid #333;
        padding: 5px;
        text-align: left;
        vertical-align: top;
        word-break: break-word;
    }

    th {
        background-color: #f2f2f2;
    }

    @page {
        margin: 15px;
    }
</style>

</head>
<body>
    <h2>Daftar Pelanggan</h2>
    <table>
        <thead>
            <tr>
                <th style="width: 20px;">No</th>
                <th style="width: 50px;">ID Pel</th>
                <th style="width: 80px;">Nama</th>     
                <th style="width: 60px;">Telepon</th>
                <th style="width: 120px;">Alamat</th>
                <th style="width: 40px;">Tarif</th>
                <th style="width: 40px;">Daya</th>
                <th style="width: 60px;">Sektor</th>
                <th style="width: 60px;">Peruntukan</th>
                <th style="width: 40px;">UP3</th>
                <th style="width: 40px;">ULP</th>
                <th style="width: 50px;">Kriteria</th>
                <th style="width: 50px;">Progres</th>
                <th style="width: 70px;">Keterangan</th>
            </tr>
        </thead>
        <tbody>
            @foreach($pelanggans as $no => $p)
            <tr>
                <td>{{ $no + 1 }}</td>
                <td>{{ $p->id_pel }}</td>
                <td>{{ $p->nama }}</td>        
                <td>{{ $p->kontak }}</td>
                <td>{{ $p->alamat_perusahaan }}</td>
                <td>{{ $p->tarif }}</td>
                <td>{{ $p->kapasitas_daya }}</td>
                <td>{{ $p->sektor }}</td>
                <td>{{ $p->peruntukan }}</td>
                <td>{{ $p->up3 }}</td>
                <td>{{ $p->ulp }}</td>
                <td>{{ $p->kriteria_prioritas }}</td>
                <td>{{ $p->progres }}</td>
                <td>{{ $p->keterangan }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
