# Jawaban Pertanyaan Pembahasan (Bagian F)

**1. Mengapa penamaan URI sebaiknya menggunakan kata benda jamak dan bukan kata kerja?**

URI dalam REST merepresentasikan *resource* (benda/entitas), sedangkan aksi terhadap resource itu sudah diwakili oleh metode HTTP (GET, POST, PUT/PATCH, DELETE). Kata benda jamak seperti `/mahasiswa` atau `/matakuliah` konsisten dipakai baik untuk mengambil koleksi (`GET /mahasiswa`) maupun satu item (`GET /mahasiswa/{id}`), sehingga satu URI bisa dipetakan ke banyak operasi CRUD hanya dengan mengganti metode HTTP-nya. Jika kata kerja disisipkan, misalnya `/api/getMahasiswa` atau `/api/hapusMahasiswa/{id}`, maka arti aksi menjadi berulang (di URI sekaligus di metode HTTP), API menjadi tidak konsisten antar endpoint, dan uniform interface (salah satu prinsip REST) dilanggar.

**2. Jelaskan perbedaan status 401 dan 403 beserta contoh kasusnya.**

- **401 Unauthorized** berarti klien belum berhasil membuktikan identitasnya sama sekali, atau kredensial yang dikirim tidak valid/kedaluwarsa. Contoh: mengakses endpoint yang memerlukan token Sanctum tanpa menyertakan header `Authorization`, atau menyertakan token yang sudah dicabut.
- **403 Forbidden** berarti identitas klien sudah dikenali (sudah lolos autentikasi), tetapi klien tidak memiliki hak akses terhadap resource yang diminta. Contoh: mahasiswa yang sudah login mencoba mengakses endpoint `DELETE /api/mahasiswa/{id}` yang seharusnya hanya boleh diakses oleh admin.

Singkatnya: 401 = "Anda belum dikenali", 403 = "Anda dikenali, tetapi tidak diizinkan".

**3. Apa risiko keamanan apabila parameter pengurutan pada Langkah 5 diterima tanpa pemeriksaan daftar kolom yang diizinkan?**

Jika nilai parameter `urut` langsung dipakai sebagai nama kolom pada `orderBy()` tanpa validasi terhadap whitelist, klien bisa mengirim nama kolom sembarang. Risikonya:

- **Query error / DoS ringan**: kolom yang tidak ada akan membuat query SQL gagal dan berpotensi memicu error 500 yang membocorkan detail struktur database (nama tabel/kolom) lewat pesan galat.
- **Kebocoran informasi terstruktur**: penyerang bisa mencoba mengurutkan berdasarkan kolom sensitif yang tidak seharusnya bisa diakses publik (misalnya kolom internal yang tidak ditampilkan di Resource), untuk menyimpulkan datanya lewat urutan hasil (*inference attack*), meski nilainya sendiri tidak ditampilkan.
- **Potensi injection pada driver tertentu**: bila nama kolom digabungkan secara mentah ke string SQL (bukan lewat query builder yang aman), celah SQL Injection bisa terbuka.

Solusinya seperti yang diterapkan pada `MahasiswaController` dan `MatakuliahController`: cocokkan nilai `urut` terhadap daftar kolom yang eksplisit diizinkan (`KOLOM_URUT_DIIZINKAN`) sebelum dipakai; jika tidak cocok, gunakan default yang aman. Prinsip yang sama diterapkan pada parameter `fields` di tugas E.3.

**4. Mengapa API Resource lebih baik daripada mengembalikan model secara langsung?**

- **Kontrol bentuk respons**: Resource memungkinkan pengembang memilih dan menamai field yang benar-benar ingin ditampilkan, sehingga kolom sensitif (misalnya `password`, `remember_token`, atau kolom internal) tidak ikut terekspos secara tidak sengaja.
- **Stabilitas kontrak API**: perubahan struktur tabel di database (menambah/mengubah nama kolom) tidak otomatis mengubah bentuk JSON yang diterima klien, karena pemetaan dilakukan eksplisit di `toArray()`.
- **Transformasi data**: Resource memudahkan transformasi tipe data (`(float) $this->ipk`), format tanggal (`toIso8601String()`), dan penyertaan relasi bersyarat (`whenLoaded`) tanpa mengotori model atau controller.
- **Konsistensi lintas endpoint**: dengan satu kelas Resource yang dipakai berulang, seluruh endpoint yang mengembalikan resource yang sama akan memiliki bentuk JSON yang identik, sesuai prinsip uniform interface pada REST dan menghindari kesalahan umum yang disebutkan pada bagian C.4.
