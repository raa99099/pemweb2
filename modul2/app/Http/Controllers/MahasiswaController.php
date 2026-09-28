<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MahasiswaController extends Controller
{
    public function index()
    {
        $daftarMahasiswa = [
            [
                'nim' => 'H1H024059',
                'nama' => 'Reva Dhanira',
                'angkatan' => 2024
            ],
            [
                'nim' => 'H1H024060',
                'nama' => 'Andi Prasetyo',
                'angkatan' => 2024
            ],
            [
                'nim' => 'H1H024061',
                'nama' => 'Bunga Lestari',
                'angkatan' => 2024
            ],
        ];

        return view('mahasiswa.index', [
            'daftarMahasiswa' => $daftarMahasiswa
        ]);
    }

    public function show(string $nim)
    {
        return view('mahasiswa.show', [
            'nim' => $nim
        ]);
    }

    public function cari(Request $request)
    {
        $kataKunci = $request->query('q', '');

        return response()->json([
            'kata_kunci' => $kataKunci,
            'metode' => $request->method(),
            'path' => $request->path(),
        ]);
    }
}