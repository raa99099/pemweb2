<?php

namespace Database\Seeders;

use App\Models\ProgramStudi;
use Illuminate\Database\Seeder;

class ProgramStudiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProgramStudi::create([
            'kode' => 'TK',
            'nama' => 'Teknik Komputer',
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'kode' => 'IF',
            'nama' => 'Informatika',
            'jenjang' => 'S1',
        ]);

        ProgramStudi::create([
            'kode' => 'TE',
            'nama' => 'Teknik Elektro',
            'jenjang' => 'S1',
        ]);
    }
}