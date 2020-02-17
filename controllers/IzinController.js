'use strict';

var response = require('../res/res')
var dateFormat = require('dateformat')
var sqlite = require('../config/conn')

/*
    Pada Controller ini akan menangani request untuk izin yang nantinya akan di request dari siswa
*/
exports.getAllIzinRequest = (req, res) => {
    // Kembalikan semua List izin yang ada kepada Admin
    sqlite.all('SELECT * FROM izin', (err, rows, fields) => {
        if(err) {
            console.log(err)
            throw err
        } else {
            response.ok(rows, res)
        }
    })
}

exports.createIzinRequest =  async (req, res) => {
    // Kelas : XIIRPL1; TahunAjaran : 2019-2020
    // Tampung parameter ke dalam Variabel
    const nis = req.body.nis
    const kelas = req.body.kelas
    const tahun_ajaran = req.body.tahun_ajaran
    const keterangan = req.body.keterangan
    const status_izin = req.body.status_izin

    // Tanggal di set ke Now
    var tanggal = dateFormat(new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta'
    }), "dd-mm-yyyy HH:MM:ss")

    // Masukan ke dalam Database
    sqlite.run('INSERT INTO izin (nis, kelas, tahun_ajaran, keterangan, status_izin, tanggal) VALUES (?,?,?,?,?,?)', [nis, kelas, tahun_ajaran, keterangan, status_izin, tanggal], (err, rows, fields) => {
        if(err){
            console.log(err)
            throw err
        } else {
            response.ok('Data berhasil dimasukan ke database!', res)
        }
    })
}

exports.getDetailIzinRequest = (req, res) => {
    // Primary Key : ID_IZIN
    const id_izin = req.params.id_izin

    sqlite.run('SELECT * FROM izin where id_izin = ?', [id_izin], (err, rows, fields) => {
        if(err) {
            console.log(err)
            throw err
        } else {
            response.ok(rows, res)
        }
    })
}

exports.editIzinRequest = (res, res) => {
    // Primary Key : ID_IZIN
    const id_izin = req.params.id_izin

    // Jalankan Query untuk edit data di Database
    sqlite.run('UPDATE izin SET status_izin = ? WHERE id_izin = ?', [id_izin], (err, rows, fields) => {
        if(err) {
            console.log(err)
            throw err
        } else {
            response.ok('Data berhasil diubah!', res)
        }
    })
}