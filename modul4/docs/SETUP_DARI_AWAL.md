# Setup Dari Awal — Laravel 13 RESTful API (Modul 3 + Modul 4)

Panduan ini untuk yang mulai dari nol (belum punya proyek Laravel sama sekali), sampai seluruh endpoint Modul 4 siap diuji.

## 0. Prasyarat

- PHP ≥ 8.2, ekstensi umum (mbstring, pdo_sqlite/pdo_mysql, dll)
- Composer
- Database: SQLite (paling cepat untuk praktikum) atau MySQL/MariaDB

Cek versi:
```bash
php -v
composer -V
```

## 1. Buat proyek Laravel 13 baru

```bash
composer create-project laravel/laravel:^13.0 pemweb2-mahasiswa-api
cd pemweb2-mahasiswa-api
```

## 2. Konfigurasi database

**Opsi tercepat — SQLite:**
```bash
touch database/database.sqlite
```
Di `.env`, set:
```
DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/ke/proyek/database/database.sqlite
```
(Hapus/comment baris DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD agar tidak bentrok.)

**Opsi MySQL:**
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pemweb2_mahasiswa
DB_USERNAME=root
DB_PASSWORD=
```
Buat database `pemweb2_mahasiswa` terlebih dahulu di MySQL.

## 3. Salin berkas dari paket ini

Salin seluruh isi folder berikut dari paket `laravel-mahasiswa-api-modul4/` ke root proyek Laravel yang baru dibuat (menimpa berkas bawaan yang sama nama, seperti `database/seeders/DatabaseSeeder.php`):

```
app/Models/
app/Http/Controllers/Api/
app/Http/Requests/
app/Http/Resources/
database/migrations/
database/factories/
database/seeders/
routes/api.php
bootstrap/app.php
```

## 4. Aktifkan routing API + Sanctum (Langkah 1 Modul 4)

```bash
php artisan install:api
```
Perintah ini akan membuat `routes/api.php` bawaan (akan tertimpa oleh berkas yang sudah kalian salin di Langkah 3) dan memasang Laravel Sanctum beserta migration token-nya.

## 5. Jalankan migration

```bash
php artisan migrate
```
Urutan migration akan otomatis benar (program_studis → mahasiswas → matakuliahs) karena penamaan timestamp berkasnya sudah disusun berurutan.

## 6. Isi data uji (seeder)

```bash
php artisan db:seed
```
Ini akan membuat 3 program studi, 30 mahasiswa, dan 15 matakuliah acak lewat factory.

## 7. Periksa rute API yang terbentuk

```bash
php artisan route:list --path=api
```
Pastikan muncul: `GET|POST /api/mahasiswa`, `GET|PUT|PATCH|DELETE /api/mahasiswa/{mahasiswa}`, hal yang sama untuk `matakuliah`, ditambah `GET /api/program-studi/{programStudi}/mahasiswa` dan `GET /api/status`.

## 8. Jalankan server

```bash
php artisan serve
```

## 9. Uji endpoint

```bash
curl -s http://127.0.0.1:8000/api/status

curl -s http://127.0.0.1:8000/api/mahasiswa | head -40

curl -s "http://127.0.0.1:8000/api/mahasiswa?angkatan=2023&per_halaman=5&urut=ipk&arah=desc"

curl -s "http://127.0.0.1:8000/api/mahasiswa?fields=id,nim,nama"

curl -s http://127.0.0.1:8000/api/program-studi/1/mahasiswa

curl -X POST http://127.0.0.1:8000/api/mahasiswa \
  -H "Content-Type: application/json" -H "Accept: application/json" \
  -d '{"program_studi_id":1,"nim":"H1A125999","nama":"Dewi Anggraini","email":"dewi.anggraini@example.com","angkatan":2025,"ipk":3.65}'

curl -X PUT http://127.0.0.1:8000/api/mahasiswa/1 \
  -H "Content-Type: application/json" -H "Accept: application/json" \
  -d '{"ipk": 3.90}'

curl -X DELETE http://127.0.0.1:8000/api/mahasiswa/1 -H "Accept: application/json"

curl -s http://127.0.0.1:8000/api/mahasiswa/99999 -H "Accept: application/json"
```

Ingat: header `Accept: application/json` wajib disertakan, kalau tidak, Laravel bisa mengembalikan halaman HTML alih-alih JSON saat terjadi galat (lihat catatan pada Langkah 8 modul).

## 10. Uji dengan Postman/Bruno (Langkah 11)

1. Buat collection baru bernama **Pemweb2 API**.
2. Buat environment variable `base_url` = `http://127.0.0.1:8000/api`.
3. Gunakan `{{base_url}}/mahasiswa`, `{{base_url}}/matakuliah`, `{{base_url}}/program-studi/1/mahasiswa`, dst pada setiap request.
4. Export collection-nya untuk dilampirkan di laporan.

## Troubleshooting singkat

| Gejala | Kemungkinan penyebab |
|---|---|
| `SQLSTATE... no such table` | Migration belum dijalankan / urutan migration salah |
| Respons HTML saat error, bukan JSON | Header `Accept: application/json` tidak disertakan |
| 404 di semua endpoint `/api/*` | `routes/api.php` belum aktif — jalankan `php artisan install:api` lalu pastikan berkas `routes/api.php` sudah berisi rute dari paket ini |
| `Class "App\Models\ProgramStudi" not found` di seeder | Berkas `app/Models/ProgramStudi.php` belum disalin dari paket ini |
| Field `program_studi` selalu `null` di respons JSON | Relasi belum di-`load()`/`with()` — cek bahwa controller memanggil `->load('programStudi')` atau `->with('programStudi')` |
