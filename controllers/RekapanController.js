'use strict'

const sqlite = require('../config/conn')
var dateFormat = require('dateformat')

// Rekap Harian
exports.rekapharian = (req, res) => {
    const tanggal = req.body.tanggal

    if (!tanggal) { // Cek apakah data ada atau tidak
        res.status(400).send({
            status_code: 400,
            results: 'Parameter dibutuhkan!'
        })
    } else {
        // Jalankan Query
        sqlite.all('SELECT * FROM kehadiran INNER JOIN rekapan ON rekapan.id_rekapan = kehadiran.id_rekapan WHERE tanggal = ', [tanggal], (err, rows, fields) => {
            if (err) {
                console.log(err)
                res.status(400).send({
                    status_code: 400,
                    results: "Opps!"
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

// Rekap Bulanan
exports.rekapBulanan = (req, res) => {
    const tanggal_awal = req.body.tanggal_awal
    const tanggal_akhir = req.body.tanggal_akhir

    if (!tanggal_awal || !tanggal_akhir) { // Cek apakah data ada atau tidak
        res.status(400).send({
            status_code: 400,
            results: 'Parameter dibutuhkan!'
        })
    } else {
        // Jalankan Query
        sqlite.all('SELECT * FROM kehadiran INNER JOIN rekapan ON rekapan.id_rekapan = kehadiran.id_rekapan WHERE tanggal BETWEEN ? AND ?', [tanggal_awal, tanggal_akhir], (err, rows, fields) => {
            if (err) {
                console.log(err)
                res.status(400).send({
                    status_code: 400,
                    results: "Opps!"
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