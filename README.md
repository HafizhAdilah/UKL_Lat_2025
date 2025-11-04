Project backend ini dimulai dengan inisialisasi project menggunakan npm init -y dan menginstal library express, nodemon, prisma, md5, dotenv, jsonwebtoken, @prisma/client. File package.json disesuaikan menjadi module dan ditambahkan script dev untuk menjalankan server otomatis.

Prisma diinisialisasi dengan npx prisma init, model database dibuat di schema.prisma, koneksi database MySQL ditulis di .env, lalu migrasi dijalankan dengan npx prisma migrate dev.

Autentikasi dan Otorisasi: fitur login dan register menggunakan JWT, dengan kontrol akses berdasarkan role (admin, guru, siswa).

Manajemen Data User: admin dapat melakukan CRUD user, semua endpoint dilindungi token dan role admin.

Pencatatan Presensi: pengguna dapat mencatat kehadiran dan melihat riwayat presensi. Model Attendance dibuat di Prisma dengan relasi ke User. Endpoint: POST /api/attendance untuk mencatat, GET /api/attendance untuk admin melihat semua, dan GET /api/attendance/me untuk user melihat presensi sendiri. Semua endpoint dilindungi token dan role.

Kesimpulan: melalui project ini, saya belajar membuat RESTful API menggunakan Express & Prisma, autentikasi & otorisasi JWT, CRUD user, dan pencatatan presensi terhubung antar tabel, dari inisialisasi project hingga pengujian endpoint.
