<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MahasiswaWebController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/mahasiswa-data', [MahasiswaWebController::class, 'index'])
    ->name('mahasiswa.data');