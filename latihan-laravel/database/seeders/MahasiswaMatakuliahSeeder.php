<?php

namespace Database\Seeders;

use App\Models\Mahasiswa;
use App\Models\Matakuliah;
use Illuminate\Database\Seeder;

class MahasiswaMatakuliahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $mahasiswa = Mahasiswa::all();
        $matakuliah = Matakuliah::all();

        foreach ($mahasiswa as $mhs) {
            $pilihan = $matakuliah->random(rand(2, 4));

            foreach ($pilihan as $mk) {
                $mhs->matakuliah()->attach($mk->id, [
                    'nilai' => rand(70, 100),
                ]);
            }
        }
    }
}