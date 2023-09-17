# Simple Inventory App

This is simple web based inventory app

## Tech Stacks

- `React.js`
- `Tailwind CSS`
- `Laravel`
- `MySQL`

## Cloud Storage

- `Cloudinary`

## Installation

### Front-end

- Untuk menjalankan aplikasi front-end, dapat pergi ke folder `inventory-app-fe`, kemudian di root directory buka terminal baru dan ketik `npm install` terlebih dahulu
- Setelah menjalakan `npm install` dapat menjalakan `npm run dev` agar server React dapat berjalan

### Back-end

- Untuk menjalankan aplikasi back-end, dapat pergi ke folder `inventory-app-be`, kemudian di root directory buka terminal baru ketik terlebih dahulu `composer install`
- Setelah menginstall dependencies yang diperlukan, di terminal yang sama ketik `php artisan serve` untuk menjalankan server Laravel
- Nyalakan XAMPP untuk Apache server dan database MySQL
- Apabila ingin mengisi data dummy (seeding), disarankan untuk menjalakan `php artisan migrate:fresh --seed`