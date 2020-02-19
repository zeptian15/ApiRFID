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
        if (err) {
            console.log(err)
            res.status(400).send({
                status_code: 400,
                results: 'Opps!'
            })
        } else {
            res.status(200).send({
                status_code: 200,
                results: rows
            })
        }
    })
}

exports.createIzinRequest = async (req, res) => {
    // Kelas : XIIRPL1; TahunAjaran : 2019-2020
    // Tampung parameter ke dalam Variabel
    const nis = req.body.nis
    const kelas = req.body.kelas
    const tahun_ajaran = req.body.tahun_ajaran
    const keterangan = req.body.keterangan
    const status_izin = req.body.status_izin

    if (!nis || !kelas || !tahun_ajaran || !keterangan || !status_izin) { // Cek apakah data ada atau tidak
        res.status(400).send({
            status_code: 400,
            results: 'Parameter dibutuhkan!'
        })
    } else {

        // Tanggal di set ke Now
        var tanggal = dateFormat(new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta'
        }), "yyyy-mm-dd HH:MM:ss")

        // Masukan ke dalam Database
        sqlite.run('INSERT INTO izin (nis, kelas, tahun_ajaran, keterangan, status_izin, tanggal, status_request) VALUES (?,?,?,?,?,?,?)', [nis, kelas, tahun_ajaran, keterangan, status_izin, tanggal, 'proses'], (err, rows, fields) => {
            if (err) {
                console.log(err)
                res.status(400).send({
                    status_code: 400,
                    results: 'Data berhasil di update'
                })
            } else {
                res.status(201).send({
                    status_code: 201,
                    results: 'Data berhasil dimasukan ke database'
                })
            }
        })
    }
}

exports.getDetailIzinRequest = (req, res) => {
    // Primary Key : ID_IZIN
    const id_izin = req.body.id_izin

    if (!id_izin) { // Cek apakah data ada atau tidak
        res.status(400).send({
            status_code: 400,
            results: 'Parameter dibutuhkan!'
        })
    } else {
        // Jalankan Query
        sqlite.run('SELECT * FROM izin where id_izin = ?', [id_izin], (err, rows, fields) => {
            if (err) {
                console.log(err)
                throw err
            } else {
                res.status(200).send({
                    status_code: 200,
                    results: rows
                })
            }
        })
    }
}

exports.editIzinRequest = (req, res) => {
    // Primary Key : ID_IZIN
    const id_izin = req.body.id_izin
    const status_request = req.body.status_request

    if (!id_izin || !status_request) { // Cek apakah data ada atau tidak
        res.status(400).send({
            status_code: 400,
            results: 'Parameter dibutuhkan!'
        })
    } else {

        // Jalankan Query untuk edit data di Database
        sqlite.run('UPDATE izin SET status_request = ? WHERE id_izin = ?', [status_request, id_izin], (err, rows, fields) => {
            if (err) {
                console.log(err)
                res.status(400).send({
                    status_code: 400,
                    results: 'Data gagal di update'
                })
            } else {
                res.status(200).send({
                    status_code: 200,
                    results: 'Data berhasil di update'
                })
            }
        })
    }
}