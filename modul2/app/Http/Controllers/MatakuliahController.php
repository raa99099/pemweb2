<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MatakuliahController extends Controller
{
    public function index(Request $request)
    {
        $daftarMatakuliah = [
            [
                'kode' => 'TK245001',
                'nama' => 'Pemrograman Web II',
                'sks' => 3
            ],
            [
                'kode' => 'TK245002',
                'nama' => 'Internet of Things',
                'sks' => 3
            ],
            [
                'kode' => 'TK245003',
                'nama' => 'Basis Data',
                'sks' => 3
            ],
            [
                'kode' => 'TK245004',
                'nama' => 'Jaringan Komputer',
                'sks' => 3
            ],
            [
                'kode' => 'TK245005',
                'nama' => 'Sistem Operasi',
                'sks' => 2
            ],
        ];

        // Pencarian menggunakan query string ?q=
        $kataKunci = $request->query('q', '');

        if ($kataKunci !== '') {
            $daftarMatakuliah = array_filter(
                $daftarMatakuliah,
                function ($matakuliah) use ($kataKunci) {
                    return stripos($matakuliah['kode'], $kataKunci) !== false
                        || stripos($matakuliah['nama'], $kataKunci) !== false;
                }
            );
        }

        return view('matakuliah.index', [
            'daftarMatakuliah' => $daftarMatakuliah,
            'kataKunci' => $kataKunci
        ]);
    }

    public function show(string $kode)
    {
        $daftarMatakuliah = [
            [
                'kode' => 'TK245001',
                'nama' => 'Pemrograman Web II',
                'sks' => 3
            ],
            [
                'kode' => 'TK245002',
                'nama' => 'Internet of Things',
                'sks' => 3
            ],
            [
                'kode' => 'TK245003',
                'nama' => 'Basis Data',
                'sks' => 3
            ],
            [
                'kode' => 'TK245004',
                'nama' => 'Jaringan Komputer',
                'sks' => 3
            ],
            [
                'kode' => 'TK245005',
                'nama' => 'Sistem Operasi',
                'sks' => 2
            ],
        ];

        $matakuliah = null;

        foreach ($daftarMatakuliah as $data) {
            if ($data['kode'] === $kode) {
                $matakuliah = $data;
                break;
            }
        }

        if ($matakuliah === null) {
            abort(404);
        }

        return view('matakuliah.show', [
            'matakuliah' => $matakuliah
        ]);
    }
}