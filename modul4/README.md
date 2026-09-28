# Modul 4 — RESTful API Laravel 13 (Pemweb II, Teknik Komputer UNSOED)

Berkas ini berisi implementasi lengkap Modul 4: langkah praktikum (D.1–D.11), tugas praktikum (E.1–E.4), dan jawaban pembahasan (F.1–F.4). Struktur folder mengikuti struktur folder Laravel, jadi tinggal disalin ke proyek Laravel 13 hasil Modul 3 kalian (folder yang sama akan menimpa berkas yang sudah dibuat di Langkah 3–6 pada modul).

## Cara memasang

### Sudah punya proyek Laravel (hasil Modul 3)
1. Salin isi folder `app/`, `bootstrap/`, `routes/` ke root proyek Laravel kalian (timpa berkas yang namanya sama). Untuk `database/`, cukup salin `database/migrations/2025_01_01_000003_create_matakuliahs_table.php` dan folder `database/factories/`, `database/seeders/` (skip migration `program_studis` dan `mahasiswas` karena sudah ada dari Modul 3).
2. Jalankan:
   ```bash
   php artisan install:api   # jika routes/api.php dan Sanctum belum aktif
   php artisan migrate
   php artisan db:seed       # opsional, isi data uji
   ```
3. Jalankan server: `php artisan serve`
4. Cek rute yang terbentuk: `php artisan route:list --path=api`

### Mulai dari nol (belum ada proyek Laravel sama sekali)
Ikuti panduan lengkap langkah demi langkah di **[`docs/SETUP_DARI_AWAL.md`](docs/SETUP_DARI_AWAL.md)** — mulai dari `composer create-project` sampai seluruh endpoint bisa diuji dengan curl/Postman.

## Isi paket

| Berkas | Keterangan |
|---|---|
| `routes/api.php` | Seluruh rute: `/status`, `apiResource('mahasiswa', ...)`, `apiResource('matakuliah', ...)`, dan `/program-studi/{id}/mahasiswa` |
| `app/Http/Controllers/Api/MahasiswaController.php` | CRUD mahasiswa + filter, pagination, sort aman, dan parameter `fields` (tugas E.3) |
| `app/Http/Controllers/Api/MatakuliahController.php` | CRUD matakuliah mengikuti pola yang sama (tugas E.1) |
| `app/Http/Controllers/Api/ProgramStudiController.php` | Endpoint daftar mahasiswa per program studi (tugas E.2) |
| `app/Http/Requests/*` | Form Request validasi store & update untuk mahasiswa dan matakuliah |
| `app/Http/Resources/*` | API Resource untuk menstandarkan bentuk respons |
| `app/Models/*` | Model `Mahasiswa`, `ProgramStudi`, `Matakuliah` beserta relasinya |
| `database/migrations/2026_01_01_000001_create_matakuliahs_table.php` | Migration tabel `matakuliahs` |
| `bootstrap/app.php` | Konfigurasi `withExceptions` untuk respons galat 404 & 422 yang seragam pada `/api/*` (Langkah 10) |
| `docs/DOKUMENTASI_API.md` | Dokumentasi ringkas seluruh endpoint (tugas E.4) |
| `docs/JAWABAN_PEMBAHASAN.md` | Jawaban pertanyaan pembahasan F.1–F.4 |

## Contoh pengujian cepat

```bash
curl -s http://127.0.0.1:8000/api/mahasiswa | head -40

curl -s "http://127.0.0.1:8000/api/mahasiswa?angkatan=2023&per_halaman=5&urut=ipk&arah=desc"

curl -s "http://127.0.0.1:8000/api/mahasiswa?fields=id,nim,nama"

curl -s http://127.0.0.1:8000/api/program-studi/1/mahasiswa

curl -X PUT http://127.0.0.1:8000/api/mahasiswa/1 \
  -H "Content-Type: application/json" -H "Accept: application/json" \
  -d '{"ipk": 3.90}'

curl -s http://127.0.0.1:8000/api/mahasiswa/99999 -H "Accept: application/json"
```

Ingat: sertakan header `Accept: application/json` pada setiap permintaan agar galat dikembalikan dalam bentuk JSON, bukan halaman HTML.
