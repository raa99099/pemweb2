<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Data Mahasiswa</title>
</head>
<body>

    <h1>Data Mahasiswa</h1>

    @if (session('sukses'))
        <p>{{ session('sukses') }}</p>
    @endif

    <table border="1" cellpadding="8" cellspacing="0">
        <thead>
            <tr>
                <th>No</th>
                <th>NIM</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Program Studi</th>
                <th>Angkatan</th>
                <th>IPK</th>
                <th>Status</th>
            </tr>
        </thead>

        <tbody>
            @forelse ($daftarMahasiswa as $mahasiswa)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $mahasiswa->nim }}</td>
                    <td>{{ $mahasiswa->nama }}</td>
                    <td>{{ $mahasiswa->email }}</td>
                    <td>{{ $mahasiswa->programStudi->nama }}</td>
                    <td>{{ $mahasiswa->angkatan }}</td>
                    <td>{{ $mahasiswa->ipk }}</td>
                    <td>
                        {{ $mahasiswa->aktif ? 'Aktif' : 'Tidak Aktif' }}
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="8">Belum ada data mahasiswa.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    {{ $daftarMahasiswa->links() }}

</body>
</html>