'use strict';

var response = require('../res/res')
var dateFormat = require('dateformat')
var sqlite = require('../config/conn')

/*
    Pada Controller ini akan menangani request untuk pengumuman yang nantinya akan dilakukan oleh Admin
*/

exports.createPengumuman = (req, res) => {
    // Kelas : XIIRPL1; Tahun Ajaran : 2019-2020
    // Tampung parameter ke dalam Variabel
    const kelas = req.body.kelas
    const tahun_ajaran = req.body.tahun_jaran
    const isi = req.body.isi
    const author = req.body.author

    // Tanggal di set ke Now
    var tanggal = dateFormat(new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta'
    }), "dd-mm-yyyy HH:MM:ss")

    // Masukan ke dalam Database
    sqlite.run('INSERT INTO pengumuman (kelas, tahun_ajaran, isi, author, tanggal) VALUES (?,?,?,?,?)', [kelas, tahun_ajaran, isi, author, tanggal], (err, rows, field) => {
        if (err) {
            console.log(err)
            throw err
        } else {
            response.ok('Berhasil memasukan data ke Database!', res)
        }
    })
}

function selectPengumumanPerKelas(kelas, tahun_ajaran) {
    return new Promise(response => {
        setTimeout(() => {
            // Ambil data berdasarkan data yang di request
            sqlite.all('SELECT * FROM penguman WHERE kelas = ?, tahun_ajaran = ?', [kelas, tahun_ajaran], (err, rows, field) => {
                if(err){
                    console.log(err)
                    throw err
                } else {
                    console.log(rows)
                    response(rows)
                }
            })
        }, 1000)
    })
}

exports.getPengumumanPerKelas = (req, res) => {
    // Tampung variabel request yang dkirim
    const kelas = req.body.kelas
    const tahunAjaran = req.body.tahunAjaran

    var result = selectPengumumanPerKelas(kelas, tahunAjaran)

    // Cek hasil
    console.log(result)

    // Kembalikan Response ke User
    response.ok(result, res)
}

exports.getPengumumanAll = (req, res) => {
    // Variabel All
    const kelas = 'all'
    const tahun_ajaran = 'all'
    // Jalankan Query
    sqlite.all('SELECT * FROM pengumuman where kelas = ? AND tahun_ajaran = ?', [kelas, tahun_ajaran], (err, rows, field) => {
        if(err) {
            console.log(err)
            throw err
        } else {
            response.ok(rows, res)
        }
    })
}