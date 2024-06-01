### INIT PROJECT
- PHP 8.1
- NODE 16.19.1
- NPM 8.19.3
- MYSQL 5.7

### DOKUMENTASI API DI POSTMAN
https://documenter.getpostman.com/view/7698325/2sA3Qwb9zX

## Instalasi

### 1. Clone Repository
Clone repository ini ke direktori lokal kamu menggunakan perintah berikut:

```bash
git clone https://github.com/aditamairham66/prakasa-test.git
cd prakasa-test
```

### 2. Install Dependencies
Jalankan perintah berikut untuk menginstall semua dependencies PHP:

```bash
composer install
```

Selanjutnya, install semua dependencies JavaScript:

```bash
npm install
```

### 3. Konfigurasi Environment
Salin file `.env.example` ke `.env` dan sesuaikan konfigurasi database dan lainnya sesuai kebutuhan kamu:

```bash
cp .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

### 4. Migrasi Database
Jalankan migrasi untuk membuat tabel-tabel di database:

```bash
php artisan migrate
php artisan db:seed
```

### 5. Menjalankan Aplikasi
Jalankan server pengembangan Laravel dengan perintah berikut:

```bash
php artisan serve
```

Dan untuk menjalankan server pengembangan frontend, jalankan:

```bash
npm run dev
```

Sekarang kamu bisa mengakses aplikasi di `http://localhost:8000`.

## Skrip NPM
Berikut adalah beberapa skrip NPM yang berguna:

- `npm run dev` atau `yarn dev`: Menjalankan server pengembangan.
- `npm run build` atau `yarn build`: Membangun aplikasi untuk produksi.
- `npm run lint` atau `yarn lint`: Menjalankan linter untuk memeriksa kesalahan dalam kode.

## Strukur Direktori
Beberapa direktori penting dalam proyek ini adalah:

- `resources/js`: Direktori utama untuk semua file JavaScript/TypeScript dan komponen React.
- `resources/views`: Direktori untuk file blade Laravel.
- `routes`: Direktori untuk file rute Laravel.
- `database/migrations`: Direktori untuk file migrasi database.

## Kontribusi
Jika kamu ingin berkontribusi ke proyek ini, silakan buat pull request atau buka isu di GitHub.

## Lisensi
Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## Kontak
Untuk informasi lebih lanjut, kamu bisa menghubungi saya di [Klik untuk mail](mailto:aditamairham66@gmail.com).
```