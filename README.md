# Tugas Mandiri 2: Sistem Inventaris Laboratorium Robotika

Sistem Manajemen Master Entitas Inventaris Laboratorium Robotika berbasis Node.js, Express.js, dan MySQL yang dibangun dengan arsitektur MVC ketat, isolasi `.env`, dan 100% Prepared Statements.

## 1. Struktur Proyek

```text
express-inventaris-robotik/
├── config/database.js
├── controllers/alat.controller.js
├── models/alat.model.js
├── routes/alat.routes.js
├── views/
│   ├── pages/
│   └── partials/
├── public/css/style.css
├── docs/screenshots/
├── .env.example
├── database.sql
└── README.md
```

## 2. Skema Basis Data (`database.sql`)

```sql
CREATE DATABASE IF NOT EXISTS db_inventaris_robotika;
USE db_inventaris_robotika;

CREATE TABLE IF NOT EXISTS alat_robotik (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_alat VARCHAR(100) NOT NULL,
    kategori VARCHAR(50) NOT NULL,
    jumlah INT NOT NULL,
    kondisi VARCHAR(50) NOT NULL,
    spesifikasi TEXT,
    harga_satuan DECIMAL(10,2) NOT NULL,
    tanggal_pengadaan DATE NOT NULL
);

INSERT INTO alat_robotik VALUES
(1, 'IRIS', 'Sensor', 100, 'Baik', 'Keren banget', 10000.00, '2026-10-20'),
(2, 'UNO', 'Power', 100, 'Baik', 'NEW', 100000.00, '2026-10-15');
```

## 3. Cara Menjalankan Aplikasi

1. Clone repositori & masuk ke folder proyek.
2. Jalankan `npm install`.
3. Salin `.env.example` ke `.env` dan sesuaikan kredensial MySQL.
4. Impor `database.sql` ke MySQL.
5. Jalankan `npm run dev` atau `node app.js`, lalu akses `http://localhost:3000/`