'use strict'

const sqlite = require('../config/conn')
var dateFormat = require('dateformat')

// Menampilkan Kehadiran dengan Limit 5
exports.getTodayKehadiranLimit = async (req, res) => {
    var tanggal = dateFormat(new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta'
    }), "yyyy-mm-dd")

    // Menghitung jumlah siswa telat dan tepat waktu
    var siswaTepat = await getJumlahStatistik('Tepat', tanggal)
    var siswaTelat = await getJumlahStatistik('Terlambat', tanggal)
    // Jalankan Query
    sqlite.all('SELECT nama, kelas, waktu, status, tanggal FROM kehadiran INNER JOIN siswa ON siswa.nis = kehadiran.nis INNER JOIN rekapan ON rekapan.id_rekapan = kehadiran.id_rekapan WHERE tanggal = ? ORDER BY waktu DESC LIMIT 5', [tanggal],(err, rows, fields) => {
        if(err){
            console.log(err)
            throw err
        } else {
            res.status(200).send({status_code: 200, siswaTepat: siswaTepat, siswaTelat: siswaTelat , results: rows})
        }
    })
}

// Menampilkan Kehadiran pada hari ini
exports.getTodayKehadiranAll = async (req, res) => {
    var tanggal = dateFormat(new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta'
    }), "yyyy-mm-dd")

    // Menghitung jumlah siswa telat dan tepat waktu
    var siswaTepat = await getJumlahStatistik('Tepat', tanggal)
    var siswaTelat = await getJumlahStatistik('Terlambat', tanggal)
    // Jalankan Query
    sqlite.all('SELECT nama, kelas, waktu, status, tanggal FROM kehadiran INNER JOIN siswa ON siswa.nis = kehadiran.nis INNER JOIN rekapan ON rekapan.id_rekapan = kehadiran.id_rekapan WHERE tanggal = ? ORDER BY waktu DESC', [tanggal],(err, rows, fields) => {
        if(err){
            console.log(err)
            throw err
        } else {
            res.status(200).send({status_code: 200, siswaTepat: siswaTepat, siswaTelat: siswaTelat , results: rows})
        }
    })
}

function getJumlahStatistik(status, tanggal){
    return new Promise(statistik => {
        // Jalankan Query
        sqlite.all('SELECT * FROM kehadiran INNER JOIN rekapan ON rekapan.id_rekapan = kehadiran.id_rekapan WHERE status = ? AND tanggal = ?', [status, tanggal], (err, rows, fields) => {
            if(err){
                console.log(err)
                throw err
            } else {
                statistik(rows.length)
            }
        })
    })
}