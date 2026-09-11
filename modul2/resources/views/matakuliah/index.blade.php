@extends('layouts.app')

@section('judul', 'Daftar Mata Kuliah')

@section('konten')

<h1 class="h3 mb-4">Daftar Mata Kuliah</h1>

<form action="{{ route('matakuliah.index') }}" method="GET" class="mb-4">
    <div class="input-group">
        <input
            type="text"
            name="q"
            class="form-control"
            placeholder="Cari kode atau nama mata kuliah..."
            value="{{ $kataKunci }}"
        >

        <button type="submit" class="btn btn-primary">
            Cari
        </button>
    </div>
</form>

<table class="table table-bordered bg-white">
    <thead>
        <tr>
            <th>Kode</th>
            <th>Nama</th>
            <th>SKS</th>
            <th>Aksi</th>
        </tr>
    </thead>

    <tbody>
        @forelse ($daftarMatakuliah as $matakuliah)
            <tr>
                <td>{{ $matakuliah['kode'] }}</td>

                <td>{{ $matakuliah['nama'] }}</td>

                <td>{{ $matakuliah['sks'] }}</td>

                <td>
                    <a
                        href="{{ route('matakuliah.show', $matakuliah['kode']) }}"
                        class="btn btn-sm btn-primary"
                    >
                        Detail
                    </a>
                </td>
            </tr>
        @empty
            <tr>
                <td colspan="4" class="text-center">
                    Data mata kuliah tidak ditemukan.
                </td>
            </tr>
        @endforelse
    </tbody>
</table>

@endsection