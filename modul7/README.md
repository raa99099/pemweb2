# Modul 7: RESTful API CRUD dengan Fiber v3 & GORM

Dokumentasi implementasi RESTful API untuk pengelolaan data mahasiswa menggunakan framework Go **Fiber v3**, **GORM** ORM, dan database **MySQL**. Projek ini menerapkan arsitektur **Repository Pattern** dan **Data Transfer Object (DTO)** untuk pemisahan logika aplikasi yang bersih dan terstruktur.

## 🚀 Fitur Utama

- **Repository Pattern**: Pemisahan logika akses basis data (`internal/repository`) dengan handler HTTP (`internal/handler`).
- **Request DTO & Validation**: Penggunaan struct DTO dan pointer untuk penanganan request body JSON yang aman.
- **GORM Relational Mapping**: Relasi *Belongs To* antara model `Mahasiswa` dan `ProgramStudi` dengan fitur `Preload`.
- **Full CRUD Endpoints**:

  | Method | Endpoint | Deskripsi |
  |--------|----------|-----------|
  | `GET` | `/api/mahasiswa` | Mengambil daftar mahasiswa (dilengkapi Pagination & Search/Filter) |
  | `GET` | `/api/mahasiswa/:id` | Mengambil detail data mahasiswa berdasarkan ID |
  | `POST` | `/api/mahasiswa` | Menambahkan data mahasiswa baru |
  | `PUT` | `/api/mahasiswa/:id` | Memperbarui data mahasiswa |
  | `DELETE` | `/api/mahasiswa/:id` | Menghapus data mahasiswa |

- **Auto Migration & Seeder**: Migrasi tabel otomatis dan pengisian data awal program studi saat server dinyalakan.

## 📁 Struktur Direktori

```text
modul7/
├── cmd/
│   └── api/
│       └── main.go                  # Entry point aplikasi
├── internal/
│   ├── config/
│   │   ├── config.go                # Memuat konfig variabel lingkungan (.env)
│   │   ├── database.go              # Inisialisasi koneksi MySQL via GORM
│   │   └── migrasi.go               # Auto-migrate model & seeder data awal
│   ├── handler/
│   │   ├── dto.go                   # Struct Request DTO
│   │   └── mahasiswa_handler.go     # HTTP Logic & Controller CRUD
│   ├── model/
│   │   └── mahasiswa.go             # GORM Struct Models (Mahasiswa & ProgramStudi)
│   ├── repository/
│   │   └── mahasiswa_repository.go  # Database Layer / GORM Queries
│   └── router/
│       └── router.go                # Definisi route & endpoint API
├── .env                             # Konfigurasi Environment (DB, Port, App)
├── go.mod                           # Go Modules
└── go.sum                           # Dependensi checksum Go
```

## ⚙️ Persyaratan Sistem & Dependensi

- **Go**: Version 1.20+
- **MySQL** Database
- **Go Packages**:
  - `github.com/gofiber/fiber/v3`
  - `gorm.io/gorm`
  - `gorm.io/driver/mysql`
  - `github.com/joho/godotenv`

## 🛠️ Instalasi & Cara Menjalankan

1. **Pastikan MySQL Aktif**

   Buat database baru di MySQL/XAMPP dengan nama `pemweb2_fiber`:

   ```sql
   CREATE DATABASE pemweb2_fiber;
   ```

2. **Pengaturan `.env`**

   Buat berkas `.env` di dalam folder `modul7/`:

   ```env
   APP_NAME="Fiber API Modul 7"
   APP_PORT=3000
   APP_ENV=local

   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_NAME=pemweb2_fiber
   DB_USER=root
   DB_PASS=
   ```

3. **Install Dependensi**

   Jalankan perintah berikut di dalam direktori `modul7/`:

   ```bash
   go mod tidy
   ```

4. **Jalankan Aplikasi**

   ```bash
   go run cmd/api/main.go
   ```

   Server akan berjalan secara otomatis di <http://localhost:3000>.

## 📡 Dokumentasi API Endpoint

### 1. Ambil Daftar Mahasiswa

- **URL**: `/api/mahasiswa`
- **Method**: `GET`
- **Query Parameters**:

  | Parameter | Default | Keterangan |
  |-----------|---------|------------|
  | `halaman` | `1` | Nomor halaman |
  | `per_halaman` | `10` | Jumlah data per halaman |
  | `cari` | - | (opsional) Cari berdasarkan nama/NIM |
  | `angkatan` | - | (opsional) Filter tahun angkatan |

**Response Contoh (200 OK):**

```json
{
  "sukses": true,
  "data": [
    {
      "id": 1,
      "program_studi_id": 1,
      "program_studi": {
        "id": 1,
        "kode": "TK",
        "nama": "Teknik Komputer",
        "jenjang": "S1"
      },
      "nim": "220101001",
      "nama": "Budi Santoso",
      "email": "budi@example.com",
      "angkatan": 2022,
      "ipk": 3.75,
      "aktif": true
    }
  ],
  "meta": {
    "halaman": 1,
    "per_halaman": 10,
    "total": 1,
    "total_halaman": 1
  }
}
```

### 2. Ambil Detail Mahasiswa

- **URL**: `/api/mahasiswa/:id`
- **Method**: `GET`

**Response Contoh (200 OK):**

```json
{
  "sukses": true,
  "data": {
    "id": 1,
    "program_studi_id": 1,
    "program_studi": {
      "id": 1,
      "kode": "TK",
      "nama": "Teknik Komputer",
      "jenjang": "S1"
    },
    "nim": "220101001",
    "nama": "Budi Santoso",
    "email": "budi@example.com",
    "angkatan": 2022,
    "ipk": 3.75,
    "aktif": true
  }
}
```

### 3. Tambah Mahasiswa

- **URL**: `/api/mahasiswa`
- **Method**: `POST`

**Request Body:**

```json
{
  "program_studi_id": 1,
  "nim": "220101002",
  "nama": "Siti Aminah",
  "email": "siti@example.com",
  "angkatan": 2022,
  "ipk": 3.80,
  "aktif": true
}
```

**Response Contoh (201 Created):**

```json
{
  "sukses": true,
  "pesan": "Data mahasiswa berhasil dibuat",
  "data": { ... }
}
```

### 4. Perbarui Mahasiswa

- **URL**: `/api/mahasiswa/:id`
- **Method**: `PUT`

**Request Body (Partial Update / DTO):**

```json
{
  "nama": "Siti Aminah, S.Kom",
  "ipk": 3.90
}
```

**Response Contoh (200 OK):**

```json
{
  "sukses": true,
  "pesan": "Data mahasiswa berhasil diperbarui",
  "data": { ... }
}
```

### 5. Hapus Mahasiswa

- **URL**: `/api/mahasiswa/:id`
- **Method**: `DELETE`

**Response Contoh (200 OK):**

```json
{
  "sukses": true,
  "pesan": "Data mahasiswa berhasil dihapus"
}
```
