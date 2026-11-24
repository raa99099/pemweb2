---

### 2. `README.md` untuk Folder `frontend-pemweb2` (Modul 9)
Simpan teks di bawah ini ke dalam file `frontend-pemweb2/README.md`:

```markdown
# Modul 9 - Integrasi Backend dan Frontend (React + Vite)

**Nama:** Reva Aura Ramadhani  
**NIM:** H1H024059  
**Shift Awal / Akhir:** A / D  

## Deskripsi
Aplikasi frontend berbasis **React** dan **Vite** yang mengonsumsi RESTful API menggunakan **Axios** beserta *request/response interceptor*[cite: 11, 12]. Aplikasi mendukung pergantian antara dua backend (**Laravel 13** dan **Go Fiber v3**) melalui satu pengaturan abstraksi (`MODE_BACKEND`) serta telah dilengkapi konfigurasi **CORS** pada kedua sisi server[cite: 10, 19].

## Penyelesaian Tugas Praktikum
1. **Formulir Tambah Mahasiswa & Validasi Server**: Tersedia pada halaman `/mahasiswa/tambah` yang menampilkan pesan galat validasi dari backend secara terstruktur[cite: 19].
2. **Hapus Data & Pembaruan Daftar**: Tersedia tombol **Hapus** pada setiap baris tabel mahasiswa dengan dialog konfirmasi dan pemuatan ulang daftar otomatis setelah penghapusan berhasil[cite: 19].
3. **Abstraksi Pergantian Backend (`MODE_BACKEND`)**: Diatur melalui konstanta `MODE_BACKEND` (`'fiber'` atau `'laravel'`) pada `src/api/klien.js` yang secara otomatis menyesuaikan `baseURL`, payload autentikasi, dan pembacaan metadata paginasi[cite: 11, 19].
4. **Perbandingan Struktur Respons Backend & Usulan Kontrak API Tunggal**:

| Aspek / Endpoint | Backend Laravel (Modul 5) | Backend Go Fiber (Modul 8) | Usulan Kontrak API Tunggal |
| :--- | :--- | :--- | :--- |
| **Payload Login (`POST /auth/login`)** | `{"email": "...", "password": "..."}`[cite: 13] | `{"email": "...", "kata_sandi": "..."}`[cite: 19] | `{"email": "...", "password": "..."}` |
| **Struktur Meta Paginasi (`GET /mahasiswa`)** | `meta.current_page` & `meta.last_page`[cite: 17, 19] | `meta.halaman` & `meta.total_halaman`[cite: 19] | `meta: { "page": 1, "per_page": 10, "total": 25, "last_page": 3 }` |
| **Format Respons Sukses** | `{"status": "sukses", "pesan": "...", "data": ..., "meta": ...}` | `{"sukses": true, "pesan": "...", "data": ..., "meta": ...}` | `{"success": true, "message": "...", "data": ..., "meta": ...}` |
| **Format Galat Validasi (HTTP 422)** | `{"pesan": "...", "errors": {"field": ["..."]}}` | `{"pesan": "...", "galat": {"field": "..."}}` | `{"success": false, "message": "Validasi gagal", "errors": {"field": ["..."]}}` |

## Jawaban Pertanyaan Pembahasan Modul 9

1. **Mengapa galat CORS tidak dapat diselesaikan dari sisi frontend?**  
   Galat CORS merupakan mekanisme keamanan *Same-Origin Policy* yang ditegakkan langsung oleh peramban (*browser*) untuk mencegah skrip dari suatu *origin* mengakses sumber daya pada *origin* berbeda tanpa izin eksplisit dari server tujuan[cite: 9, 10]. Kode frontend yang berjalan di dalam peramban tidak memiliki wewenang untuk melewati atau memanipulasi validasi header respons seperti `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, maupun respons permintaan *preflight* `OPTIONS`[cite: 9, 10]. Oleh karena itu, izin lintas *origin* hanya dapat diberikan oleh backend melalui konfigurasi header CORS pada respons server[cite: 9, 10].

2. **Jelaskan kelebihan dan kekurangan penyimpanan token pada `sessionStorage` dibandingkan cookie `HttpOnly`.**  
   - **Penyimpanan di `sessionStorage`**: Memiliki kelebihan mudah diakses langsung melalui JavaScript untuk disisipkan ke header `Authorization: Bearer`, otomatis terisolasi per tab peramban, serta terhapus saat tab ditutup[cite: 11]. Kekurangannya, `sessionStorage` rentan terhadap serangan *Cross-Site Scripting* (XSS) karena skrip berbahaya yang berhasil disuntikkan ke halaman dapat membaca dan mencuri token tersebut.
   - **Penyimpanan di Cookie `HttpOnly`**: Jauh lebih aman terhadap serangan XSS karena tidak dapat dibaca oleh JavaScript (`document.cookie`) dan dikirim otomatis oleh peramban pada setiap permintaan. Kekurangannya, cookie `HttpOnly` rentan terhadap serangan *Cross-Site Request Forgery* (CSRF) sehingga memerlukan perlindungan tambahan seperti token CSRF atau pengaturan atribut `SameSite` yang ketat.

3. **Apa fungsi interceptor pada Axios dan masalah apa yang dicegah olehnya?**  
   Interceptor pada Axios berfungsi sebagai *middleware* di sisi klien untuk mencegat dan memodifikasi setiap permintaan HTTP sebelum dikirim ke server maupun setiap respons sebelum diteruskan ke komponen pemanggil[cite: 12]. *Interceptor* permintaan mencegah duplikasi kode penyisipan header `Authorization` pada setiap pemanggilan endpoint terlindungi[cite: 11, 12], sedangkan *interceptor* respons menangani kegagalan autentikasi (status HTTP `401` saat token tidak valid atau kedaluwarsa) secara terpusat dengan menghapus token dan mengarahkan pengguna kembali ke halaman login tanpa perlu menulis ulang blok penanganan galat pada setiap halaman[cite: 12].

4. **Mengapa penanganan status memuat dan galat penting bagi pengalaman pengguna?**  
   Penanganan status memuat (*loading*) memberikan umpan balik visual yang jelas bahwa permintaan sedang diproses serta mencegah pengiriman ganda (*double submit*) dengan menonaktifkan tombol selama proses berlangsung[cite: 14, 16]. Sementara itu, penanganan status galat (*error*) mencegah antarmuka menjadi kosong atau terhenti tanpa kejelasan saat terjadi gangguan jaringan maupun kegagalan validasi, sehingga pengguna mengetahui penyebab pasti kegagalan dan langkah perbaikan yang harus dilakukan[cite: 14, 16].

## Cara Menjalankan
1. Buat file `.env` pada folder `frontend-pemweb2`:
   ```env
   VITE_API_LARAVEL=[http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)
   VITE_API_FIBER=http://localhost:3000/api
