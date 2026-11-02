
const express = require('express');
const db = require('./config/database');
const bukuRoutes = require('./routes/buku.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Mengatur EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Menggunakan Routes
app.use('/', bukuRoutes);

// Menguji koneksi database
async function testDatabase() {
    try {
        const connection = await db.getConnection();
        console.log('Database berhasil terhubung!');
        connection.release();
    } catch (error) {
        console.error('Koneksi database gagal:', error.message);
    }
}

testDatabase();

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
