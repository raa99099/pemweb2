@extends('layouts.app')

@section('judul', 'Detail Mata Kuliah')

@section('konten')

<h1 class="h3 mb-4">Detail Mata Kuliah</h1>

<div class="card">
    <div class="card-body">

        <p>
            <strong>Kode:</strong>
            {{ $matakuliah['kode'] }}
        </p>

        <p>
            <strong>Nama:</strong>
            {{ $matakuliah['nama'] }}
        </p>

        <p class="mb-0">
            <strong>SKS:</strong>
            <x-badge-sks :sks="$matakuliah['sks']" />
        </p>

    </div>
</div>

<a href="{{ route('matakuliah.index') }}"
   class="btn btn-secondary mt-3">
    Kembali
</a>

@endsection