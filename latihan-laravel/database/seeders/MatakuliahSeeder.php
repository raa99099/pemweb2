<?php

namespace Database\Seeders;

use App\Models\Matakuliah;
use Illuminate\Database\Seeder;

class MatakuliahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $matakuliah = [
            [
                'kode' => 'TK101',
                'nama' => 'Pemrograman Web II',
                'sks' => 3,
                'semester' => 3,
            ],
            [
                'kode' => 'TK102',
                'nama' => 'Basis Data',
                'sks' => 3,
                'semester' => 3,
            ],
            [
                'kode' => 'TK103',
                'nama' => 'Internet of Things',
                'sks' => 3,
                'semester' => 5,
            ],
            [
                'kode' => 'TK104',
                'nama' => 'Sistem Operasi',
                'sks' => 3,
                'semester' => 3,
            ],
            [
                'kode' => 'TK105',
                'nama' => 'Jaringan Komputer',
                'sks' => 3,
                'semester' => 4,
            ],
        ];

        foreach ($matakuliah as $data) {
            Matakuliah::create($data);
        }
    }
}