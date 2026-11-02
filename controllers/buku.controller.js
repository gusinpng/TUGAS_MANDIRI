
const BukuModel = require('../models/buku.model');

const BukuController = {
    // Menampilkan halaman daftar buku
    index: async (req, res) => {
        try {
            const buku = await BukuModel.getAll();

            res.render('pages/buku-list', {
                title: 'Daftar Buku',
                buku: buku
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Terjadi kesalahan saat mengambil data buku');
        }
    },

    // Menampilkan form tambah buku
    createForm: (req, res) => {
        res.render('pages/buku-form-tambah', {
            title: 'Tambah Buku'
        });
    },

    // Menyimpan buku ke database
    
store: async (req, res) => {
    try {
        const {
            judul,
            penulis,
            penerbit,
            kategori,
            deskripsi,
            tanggal_terbit,
            stok
        } = req.body;

        // Validasi data wajib
        if (!judul || !penulis || !kategori || stok === '') {
            return res.status(400).send(
                'Judul, penulis, kategori, dan stok wajib diisi!'
            );
        }

        // Validasi kategori
        const kategoriValid = [
            'Teknologi',
            'Pendidikan',
            'Novel',
            'Sejarah'
        ];

        if (!kategoriValid.includes(kategori)) {
            return res.status(400).send('Kategori tidak valid!');
        }

        // Validasi stok
        const jumlahStok = Number(stok);

        if (!Number.isInteger(jumlahStok) || jumlahStok < 0) {
            return res.status(400).send('Stok harus berupa angka bulat dan tidak boleh negatif!');
        }

        await BukuModel.create({
            judul: judul.trim(),
            penulis: penulis.trim(),
            penerbit,
            kategori,
            deskripsi,
            tanggal_terbit: tanggal_terbit || null,
            stok: jumlahStok
        });

        res.redirect('/buku');

    } catch (error) {
        console.error(error);
        res.status(500).send('Gagal menambahkan buku');
    }
},


    
    // Menampilkan form edit buku
    editForm: async (req, res) => {
    try {
        const id = req.params.id;
        const buku = await BukuModel.getById(id);

        if (!buku) {
            return res.status(404).send('Buku tidak ditemukan');
        }

        res.render('pages/buku-form-edit', {
            title: 'Edit Buku',
            buku: buku
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Gagal mengambil data buku');
    }
},

    // Memperbarui data buku
   
update: async (req, res) => {
    try {
        const id = req.params.id;

        const {
            judul,
            penulis,
            penerbit,
            kategori,
            deskripsi,
            tanggal_terbit,
            stok
        } = req.body;

        // Validasi data wajib
        if (!judul || !penulis || !kategori || stok === '') {
            return res.status(400).send(
                'Judul, penulis, kategori, dan stok wajib diisi!'
            );
        }

        // Validasi kategori
        const kategoriValid = [
            'Teknologi',
            'Pendidikan',
            'Novel',
            'Sejarah'
        ];

        if (!kategoriValid.includes(kategori)) {
            return res.status(400).send('Kategori tidak valid!');
        }

        // Validasi stok
        const jumlahStok = Number(stok);

        if (!Number.isInteger(jumlahStok) || jumlahStok < 0) {
            return res.status(400).send(
                'Stok harus berupa angka bulat dan tidak boleh negatif!'
            );
        }

        // Memperbarui data buku
        await BukuModel.update(id, {
            judul: judul.trim(),
            penulis: penulis.trim(),
            penerbit,
            kategori,
            deskripsi,
            tanggal_terbit: tanggal_terbit || null,
            stok: jumlahStok
        });

        res.redirect('/buku');

    } catch (error) {
        console.error(error);
        res.status(500).send('Gagal memperbarui buku');
    }
},



    // Menghapus data buku
    destroy: async (req, res) => {
        try {
            const id = req.params.id;

            await BukuModel.delete(id);

            res.redirect('/buku');
        } catch (error) {
            console.error(error);
            res.status(500).send('Gagal menghapus buku');
        }
    }
};

module.exports = BukuController;
