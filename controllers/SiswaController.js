'use strict'

const sqlite = require('../config/conn')

// Tampilkan Semua Siswa
exports.getAllSiswa = (req, res) => {
    // Jalankan Query
    sqlite.all('SELECT * FROM siswa', (err, rows, fields) => {
        if (err) {
            res.status(404).send({
                status_code: 404,
                msg: 'Data not found'
            })
        } else {
            res.status(200).send({
                status_code: 200,
                results: rows
            })
        }
    })
}

// Registrasi Siswa
exports.registrasiSiswa = (req, res) => {
    // Ambil Data yang diperlukan
    const nis = req.body.nis
    const id_rfid = req.body.id_rfid
    const nama = req.body.nama
    const jurusan = req.body.jurusan
    const kelas = req.body.kelas
    const jenis_kelamin = req.body.jenis_kelamin

    // Validasi
    if (!nis || !id_rfid || !nama || !jurusan || !kelas || !jenis_kelamin) {
        res.status(404).send({
            status_code: 404,
            msg: 'Parameter is required'
        })
    } else {
        // Jalankan Query
        sqlite.run('INSERT INTO siswa (nis, id_rfid, nama, jurusan, kelas, jenis_kelamin) VALUES (?,?,?,?,?,?)', [nis, id_rfid, nama, jurusan, kelas, jenis_kelamin], (err, rows, fields) => {
            if (err) {
                res.status(404).send({
                    status_code: 404,
                    msg: 'Data gagal dimasukan'
                })
            } else {

                res.status(201).send({
                    status_code: 201,
                    msg: 'Data berhasil dimasukan'
                })
            }
        })
    }
}