# Modul 8 - Validasi, JWT, dan Penanganan Galat Terstruktur pada Fiber

**Nama:** Reva Aura Ramadhani  
**NIM:** H1H024059  
**Shift Awal / Akhir:** A / D  

## Deskripsi
Implementasi RESTful API menggunakan **Go Fiber v3** dan **GORM** yang mencakup validasi masukan terstruktur menggunakan `go-playground/validator`[cite: 20, 22], autentikasi berbasis **JSON Web Token (JWT)**[cite: 20], middleware otorisasi peran (**Role-Based Access Control**)[cite: 20, 29], mekanisme pencabutan token (*blacklist*) serta penyegaran token[cite: 32], penyeragaman format respons galat[cite: 20, 31], dan konfigurasi middleware **CORS**.

## Penyelesaian Tugas Praktikum
1. **Endpoint Penyegaran Token (`POST /api/auth/segarkan`)**: Menerima token aktif dari header `Authorization: Bearer` dan menerbitkan token JWT baru dengan waktu kedaluwarsa (`exp`) yang diperbarui[cite: 21, 29, 32].
2. **Validasi Kustom NIM**: Aturan validasi kustom pada `internal/validasi/validasi.go` menggunakan ekspresi reguler (`^H[0-9]+$`) untuk memastikan NIM wajib diawali huruf `H` diikuti angka[cite: 22, 32].
3. **Daftar Hitam Token (`POST /api/auth/logout`)**: Menyimpan token yang telah keluar ke dalam tabel `daftar_hitam_tokens` sehingga middleware autentikasi menolak token tersebut meskipun masa berlakunya (`exp`) belum habis[cite: 21, 32].
4. **Analisis Perbandingan Autentikasi Modul 5 (Laravel Sanctum) vs Modul 8 (Go Fiber JWT)**:[cite: 32]

| Aspek Perbandingan | Modul 5 (Laravel 13 + Sanctum) | Modul 8 (Go Fiber v3 + JWT) |
| :--- | :--- | :--- |
| **Jumlah Kode** | Sangat ringkas karena fitur *hashing*, penerbitan token (`createToken`), middleware `auth:sanctum`, serta validasi *Form Request* sudah tersedia secara bawaan framework. | Lebih banyak (*verbose*) karena harus menyusun manual utilitas *signing/parsing* JWT, hashing `bcrypt`, tag validator, serta fungsi middleware autentikasi dan peran[cite: 22, 25, 26, 29]. |
| **Kemudahan Implementasi** | Sangat mudah dan cepat diterapkan (*batteries-included*) dengan konfigurasi minimal. | Membutuhkan pemahaman mendalam mengenai struktur klaim JWT, *type assertion* pada Go, dan alur middleware secara eksplisit[cite: 20, 25, 29]. |
| **Fleksibilitas & Performa** | Pencabutan token (*logout*) sangat mudah cukup dengan menghapus baris di tabel `personal_access_tokens`[cite: 21], namun setiap request memerlukan kueri tambahan ke database[cite: 21]. | Sangat fleksibel dan ringan untuk arsitektur terdistribusi/mikroservis karena verifikasi token bersifat *stateless* (cukup memvalidasi tanda tangan kriptografis tanpa kueri database)[cite: 21]. |

## Jawaban Pertanyaan Pembahasan Modul 8

1. **Mengapa `bcrypt` lebih sesuai untuk kata sandi dibandingkan fungsi hash cepat seperti SHA-256?**[cite: 32]  
   Fungsi hash kriptografi cepat seperti SHA-256 dirancang untuk memproses data dalam waktu sangat singkat (miliaran hash per detik pada GPU modern), sehingga sangat rentan terhadap serangan *brute-force* maupun *dictionary attack* apabila basis data bocor. Sebaliknya, `bcrypt` dirancang khusus untuk kata sandi dengan algoritma *key-stretching* yang sengaja dibuat lambat secara komputasi, memiliki parameter *cost factor* yang dapat ditingkatkan seiring perkembangan perangkat keras, serta otomatis menyertakan *salt* acak yang unik pada setiap kata sandi guna mencegah serangan *rainbow table*.

2. **Apa konsekuensi apabila nilai `JWT_SECRET` bocor?**[cite: 32]  
   Apabila nilai `JWT_SECRET` bocor kepada pihak yang tidak berwenang, penyerang dapat memalsukan *signature* JWT menggunakan algoritma penandatanganan yang sama (`HS256`)[cite: 25]. Akibatnya, penyerang bebas membuat atau memodifikasi isi *payload* token—seperti mengganti klaim `sub` menjadi ID pengguna lain atau mengubah klaim `peran` menjadi `admin`—dan server akan menganggap token palsu tersebut sah sehingga memberikan akses penuh tanpa perlu mengetahui kata sandi pengguna[cite: 20, 25].

3. **Mengapa penerapan logout pada JWT memerlukan usaha tambahan dibandingkan token tersimpan?**[cite: 32]  
   Berbeda dengan token tersimpan (*stateful*) seperti Laravel Sanctum yang menyimpan catatan token di tabel basis data sehingga dapat langsung dicabut dengan menghapus barisnya[cite: 21], JWT bersifat *stateless* dan *self-contained* sehingga server tidak menyimpan daftar token aktif[cite: 20, 21]. Selama tanda tangan (*signature*) valid dan waktu kedaluwarsa (`exp`) belum terlewati, token akan terus diterima oleh middleware[cite: 21, 25, 29]. Oleh karena itu, penerapan logout sebelum waktu kedaluwarsa memerlukan mekanisme tambahan di sisi server, seperti menyimpan token yang dicabut ke dalam tabel daftar hitam (*token blacklist*) dan memeriksanya pada setiap permintaan autentikasi[cite: 32].

4. **Jelaskan alasan pesan login gagal sebaiknya tidak menyebutkan apakah email atau kata sandi yang salah.**[cite: 32]  
   Memberikan pesan galat yang spesifik seperti *"Email tidak terdaftar"* atau *"Kata sandi salah"* membuka celah keamanan berupa *user enumeration* (enumerasi pengguna). Penyerang dapat memanfaatkan perbedaan pesan respons tersebut untuk memvalidasi daftar alamat email mana saja yang aktif terdaftar di dalam sistem, lalu memfokuskan serangan *brute-force* atau *credential stuffing* secara terarah pada akun-akun yang sudah dipastikan valid. Menggunakan pesan umum seperti *"Email atau kata sandi tidak sesuai"* mencegah kebocoran informasi keberadaan akun[cite: 27].
