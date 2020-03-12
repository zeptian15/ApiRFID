'use strict';

const dateFormat = require('dateformat')
const sqlite = require('../config/conn')


exports.getKelasPengumuman = (req, res) => {
    // Tampung variabel request yang dkirim 
    const kelas = req.body.kelas
    const tahun_ajaran = req.body.tahun_ajaran

    if (!kelas || !tahun_ajaran) {
        res.status(404).send({
            status_code: 404,
            msg: 'Parameter is required'
        })
    } else {
        // Ambil data berdasarkan data yang di request
        sqlite.all('SELECT * FROM pengumuman WHERE kelas = ? AND tahun_ajaran = ?', [kelas, tahun_ajaran], (err, rows, fields) => {
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
}

exports.getTodayKelasPengumuman = (req, res) => {
    // Tampung variabel request yang dkirim 
    const kelas = req.body.kelas
    const tahun_ajaran = req.body.tahun_ajaran
    const tanggal = req.body.tanggal

    if (!kelas || !tahun_ajaran || !tanggal) {
        res.status(404).send({
            status_code: 404,
            msg: 'Parameter is required'
        })
    } else {
        // Tanggal di set ke Now
        var tanggal = dateFormat(new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta'
        }), "yyyy-mm-dd")
        // Ambil data berdasarkan data yang di request
        sqlite.all('SELECT * FROM pengumuman WHERE kelas = ? AND tahun_ajaran = ? AND tanggal = ?', [kelas, tahun_ajaran, tanggal], (err, rows, fields) => {
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
}

exports.getAllPengumuman = (req, res) => {
    const kelas = 'ALL'
    const tahun_ajaran = 'ALL'
    // Jalankan Query
    sqlite.all('SELECT * FROM pengumuman WHERE kelas = ? AND tahun_ajaran = ?', [kelas, tahun_ajaran], (err, rows, field) => {
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

exports.getTodayAllPengumuman = (req, res) => {
    const kelas = 'ALL'
    const tahun_ajaran = 'ALL'
    const tanggal = req.body.tanggal
    // Jalankan Query
    sqlite.all('SELECT * FROM pengumuman WHERE kelas = ? AND tahun_ajaran = ? AND tanggal = ?', [kelas, tahun_ajaran, tanggal], (err, rows, field) => {
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

exports.createPengumuman = (req, res) => {
    // Kelas : XIIRPL1; Tahun Ajaran : 2019-2020
    // Tampung parameter ke dalam Variabel
    const kelas = req.body.kelas
    const tahun_ajaran = req.body.tahun_ajaran
    const isi = req.body.isi
    const author = req.body.author

    if (!kelas || !tahun_ajaran || !isi || !author) {
        res.status(404).send({
            status_code: 404,
            msg: 'Parameter is required'
        })
    } else {

        // Tanggal di set ke Now
        var tanggal = dateFormat(new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta'
        }), "yyyy-mm-dd")

        // Waktu di set ke Now
        var waktu = dateFormat(new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta'
        }), "HH:MM:ss")

        // Masukan ke dalam Database
        sqlite.run('INSERT INTO pengumuman (kelas, tahun_ajaran, isi, author, tanggal, waktu) VALUES (?,?,?,?,?,?)', [kelas, tahun_ajaran, isi, author, tanggal, waktu], (err, rows, field) => {
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

exports.updatePengumuman = (req, res) => {
    // Kelas : XIIRPL1; Tahun Ajaran : 2019-2020
    // Tampung parameter ke dalam Variabel
    const id_pengumuman = req.body.id_pengumuman
    const kelas = req.body.kelas
    const tahun_ajaran = req.body.tahun_ajaran
    const isi = req.body.isi
    const author = req.body.author

    if (!kelas || !tahun_ajaran || !isi || !author) {
        res.status(404).send({
            status_code: 404,
            msg: 'Parameter is required'
        })
    } else {
        // Tanggal di set ke Now
        var tanggal = dateFormat(new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta'
        }), "yyyy-mm-dd")

        // Waktu di set ke Now
        var waktu = dateFormat(new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta'
        }), "HH:MM:ss")

        // Masukan ke dalam Database
        sqlite.run('UPDATE pengumuman SET kelas = ?, tahun_ajaran = ?, isi = ?, author = ?, tanggal = ?, waktu = ?  WHERE id_pengumuman = ?', [kelas, tahun_ajaran, isi, author, tanggal, id_pengumuman], (err, rows, field) => {
            if (err) {
                res.status(404).send({
                    status_code: 404,
                    msg: 'Data gagal diubah'
                })
                console.log(err)
            } else {
                res.status(200).send({
                    status_code: 200,
                    msg: 'Data berhasil diubah'
                })
            }
        })
    }
}