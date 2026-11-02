
const db = require('../config/database');

const BukuModel = {
    // Mengambil semua data buku
    getAll: async () => {
        const [rows] = await db.query(
            'SELECT * FROM buku ORDER BY id DESC'
        );
        return rows;
    },

    // Mengambil satu buku berdasarkan ID
    getById: async (id) => {
        const [rows] = await db.execute(
            'SELECT * FROM buku WHERE id = ?',
            [id]
        );
        return rows[0];
    },

    // Menambahkan data buku
    create: async (data) => {
        const sql = `
            INSERT INTO buku
            (judul, penulis, penerbit, kategori, deskripsi, tanggal_terbit, stok)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            data.judul,
            data.penulis,
            data.penerbit,
            data.kategori,
            data.deskripsi,
            data.tanggal_terbit || null,
            data.stok
        ];

        const [result] = await db.execute(sql, values);
        return result;
    },

    // Mengubah data buku
    update: async (id, data) => {
        const sql = `
            UPDATE buku
            SET judul = ?, penulis = ?, penerbit = ?,
                kategori = ?, deskripsi = ?,
                tanggal_terbit = ?, stok = ?
            WHERE id = ?
        `;

        const values = [
            data.judul,
            data.penulis,
            data.penerbit,
            data.kategori,
            data.deskripsi,
            data.tanggal_terbit || null,
            data.stok,
            id
        ];

        const [result] = await db.execute(sql, values);
        return result;
    },

    // Menghapus data buku
    delete: async (id) => {
        const [result] = await db.execute(
            'DELETE FROM buku WHERE id = ?',
            [id]
        );
        return result;
    }
};

module.exports = BukuModel;
