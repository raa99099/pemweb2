# Modul 8 - RESTful API, Autentikasi JWT, & Otorisasi RBAC (Go Fiber v3)

**Nama:** Reva Aura Ramadhani  
**NIM:** H1H024059  
**Shift Awal / Akhir:** A / D  

## Deskripsi
Implementasi backend RESTful API menggunakan framework **Go Fiber v3** dan **GORM** yang mencakup autentikasi berbasis **JWT (JSON Web Token)**, otorisasi berbasis peran (**Role-Based Access Control / RBAC**), paginasi, pencarian data, serta middleware **CORS** untuk integrasi dengan frontend React[cite: 10, 19].

## Fitur Utama
- **Autentikasi JWT (`POST /api/auth/login`, `GET /api/auth/profil`, `POST /api/auth/logout`)**: Validasi kredensial menggunakan `bcrypt` dan penerbitan token JWT dengan masa berlaku tertentu[cite: 13].
- **Otorisasi RBAC**: Pembatasan hak akses berdasarkan peran (`admin` dan `mahasiswa`) pada endpoint pengelolaan data mahasiswa.
- **CRUD Mahasiswa (`GET`, `POST`, `PUT`, `DELETE /api/mahasiswa`)**: Mendukung validasi masukan (NIM wajib diawali huruf `H`, email unik, rentang IPK `0.00 - 4.00`), pencarian (`cari`), dan paginasi (`page`, `per_halaman`)[cite: 12, 13, 16].
- **Middleware CORS**: Mengizinkan akses lintas *origin* dari frontend Vite/React (`http://localhost:5173`) beserta *preflight request* (`OPTIONS`)[cite: 9, 10].

## Cara Menjalankan
1. Salin konfigurasi `.env` dan sesuaikan koneksi database MySQL (`pemweb2_fiber`).
2. Jalankan server API:
   ```bash
   go run ./cmd/api
