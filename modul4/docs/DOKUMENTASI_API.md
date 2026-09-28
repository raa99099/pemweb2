# Dokumentasi API — Pemweb II Modul 4

Base URL: `{{base_url}}` = `http://127.0.0.1:8000/api`

## 1. Status

| Metode | URI | Parameter | Contoh Respons |
|---|---|---|---|
| GET | `/status` | – | `{"sukses":true,"pesan":"API Pemweb II aktif","waktu":"2026-09-24T09:00:00+07:00"}` |

## 2. Mahasiswa

| Metode | URI | Parameter | Contoh Body | Contoh Respons |
|---|---|---|---|---|
| GET | `/mahasiswa` | Query: `cari`, `angkatan`, `program_studi_id`, `urut` (nama/nim/angkatan/ipk), `arah` (asc/desc), `per_halaman` (maks 100), `fields` (daftar kolom dipisah koma) | – | `{"data":[{"id":1,"nim":"H1A123456","nama":"..."}],"links":{...},"meta":{...}}` |
| GET | `/mahasiswa/{id}` | – | – | `{"sukses":true,"data":{"id":1,"nim":"H1A123456", "nama":"..."}}` |
| POST | `/mahasiswa` | Header wajib: `Accept: application/json` | `{"program_studi_id":1,"nim":"H1A125999","nama":"Dewi Anggraini","email":"dewi.anggraini@example.com","angkatan":2025,"ipk":3.65}` | `201 Created` `{"sukses":true,"pesan":"Data mahasiswa berhasil dibuat","data":{...}}` |
| PUT/PATCH | `/mahasiswa/{id}` | – | `{"ipk":3.90}` | `{"sukses":true,"pesan":"Data mahasiswa berhasil diperbarui","data":{...}}` |
| DELETE | `/mahasiswa/{id}` | – | – | `{"sukses":true,"pesan":"Data mahasiswa berhasil dihapus"}` |

Contoh pemakaian `fields`:
```
GET /mahasiswa?fields=id,nim,nama
```

## 3. Matakuliah (Tugas E.1)

| Metode | URI | Parameter | Contoh Body | Contoh Respons |
|---|---|---|---|---|
| GET | `/matakuliah` | Query: `cari`, `semester`, `program_studi_id`, `urut` (nama/kode/sks/semester), `arah`, `per_halaman` | – | `{"data":[{"id":1,"kode":"IF101","nama":"Algoritma","sks":3,"semester":1}],"links":{...},"meta":{...}}` |
| GET | `/matakuliah/{id}` | – | – | `{"sukses":true,"data":{...}}` |
| POST | `/matakuliah` | – | `{"program_studi_id":1,"kode":"IF201","nama":"Struktur Data","sks":3,"semester":2}` | `201 Created` `{"sukses":true,"pesan":"Data matakuliah berhasil dibuat","data":{...}}` |
| PUT/PATCH | `/matakuliah/{id}` | – | `{"sks":4}` | `{"sukses":true,"pesan":"Data matakuliah berhasil diperbarui","data":{...}}` |
| DELETE | `/matakuliah/{id}` | – | – | `{"sukses":true,"pesan":"Data matakuliah berhasil dihapus"}` |

## 4. Mahasiswa per Program Studi (Tugas E.2)

| Metode | URI | Parameter | Contoh Respons |
|---|---|---|---|
| GET | `/program-studi/{id}/mahasiswa` | Query: `urut`, `arah`, `per_halaman` | `{"data":[{"id":3,"nim":"H1A123001","nama":"..."}],"links":{...},"meta":{...}}` |

## Kode Status

| Kode | Makna |
|---|---|
| 200 | Permintaan berhasil |
| 201 | Sumber daya berhasil dibuat |
| 204 | Berhasil tanpa isi respons |
| 400 | Permintaan tidak valid |
| 401 | Belum terautentikasi |
| 403 | Terautentikasi tetapi tidak berwenang |
| 404 | Sumber daya tidak ditemukan |
| 422 | Data gagal validasi |
| 500 | Galat pada server |

## Catatan Pengujian

- Header `Accept: application/json` wajib disertakan pada semua permintaan agar Laravel mengembalikan JSON, bukan halaman HTML, saat terjadi galat.
- Simpan seluruh permintaan pada koleksi Postman bernama **Pemweb2 API**, dengan variabel lingkungan `base_url` = `http://127.0.0.1:8000/api`.
