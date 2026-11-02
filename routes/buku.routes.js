
const express = require('express');
const router = express.Router();

const BukuController = require('../controllers/buku.controller');

// Menampilkan daftar buku
router.get('/buku', BukuController.index);

// Menampilkan form tambah buku
router.get('/buku/tambah', BukuController.createForm);

// Menyimpan data buku
router.post('/buku/tambah', BukuController.store);


router.get('/buku/edit/:id', BukuController.editForm);

router.post('/buku/edit/:id', BukuController.update);

router.post('/buku/hapus/:id', BukuController.destroy); 

module.exports = router;