'use strict';

var response = require('../res/res')
var dateFormat = require('dateformat')
var socketIo = require('../socket/socketServer')
var sqlite = require('../config/conn');
var moment = require('moment');

exports.index = (req, res) => {
    res.sendFile('index.html', {
        root: '.'
    });
}


exports.presensi = async (req, res) => {
    // Masukan ke dalam Database
    const id_device = req.body.id_device;
    const id_rfid = req.body.id_rfid;

    if (!id_device || !id_rfid) { // Cek apakah data ada atau tidak
        res.status(404).send({
            status_code: 404,
            msg: 'Parameter is required'
        })
    } else {

        var tanggal = dateFormat(new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta'
        }), "yyyy-mm-dd")

        var waktu = dateFormat(new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta'
        }), "HH:MM")

        var tanggalCekTelat = dateFormat(new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta'
        }), "yyyy-mm-dd HH:MM:ss")

        // Get data siswa
        var nis_siswa = await getDataSiswa(id_rfid)

        // Cek apakah data sudah ada atau belum
        var isExist = await cekIfTableExist(tanggal)

        // Cek apakah Siswa Telat atau tidak
        var status = await cekTelat(tanggalCekTelat)

        // Variabel waktu

        // Jika Siswa Ada 
        if (nis_siswa != null) {
            // Jika Table Rekapan telah ada
            if (isExist) {
                // Ambil Id Rekapan yang telah ada
                var id_rekapan = await getIdRekapan(tanggal)

                sqlite.run('INSERT INTO kehadiran (id_rekapan, nis, waktu, status) VALUES (?,?,?,?)', [id_rekapan, nis_siswa, waktu, status], (err, rows, fields) => {
                    if (err) {
                        res.status(404).send({
                            status_code: 404,
                            msg: 'Data gagal dimasukan'
                        })
                    } else {
                        res.status(404).send({
                            status_code: 404,
                            msg: 'Data berhasil dimasukan'
                        })
                        socketIo.getIo().emit('new-data', true)
                    }
                })
            } else {
                // Buat Data baru di dalam table rekapan
                sqlite.run('INSERT INTO rekapan (tanggal) VALUES (?)', [tanggal], (err, rows, fields) => {
                    if (err) {
                        res.status(404).send({
                            status_code: 404,
                            msg: 'Data gagal dimasukan'
                        })
                    } else {
                        res.status(200).send({
                            status_code: 200,
                            msg: 'Table berhasil dibuat, silahkan tap untuk mulai presensi'
                        })
                    }
                })
            }
        } else {
            // Jika Table Rekapan telah ada
            if (isExist) {
                res.status(404).send({
                    msg: 'Maaf kamu tidak terdaftar'
                })
            } else {
                // Buat Data baru di dalam table rekapan
                sqlite.run('INSERT INTO rekapan (tanggal) VALUES (?)', [tanggal], (err, rows, fields) => {
                    if (err) {
                        res.status(404).send({
                            status_code: 404,
                            msg: 'Data gagal dimasukan'
                        })
                    } else {
                        res.status(404).send({
                            status_code: 404,
                            msg: 'Maaf kamu tidak terdaftar'
                        })
                    }
                })
            }
        }

    }
}

function cekTelat(waktu_absen) {
    return new Promise(isTelat => {
        setTimeout(() => {

            // Get Tanggal Sekarang
            var tanggal_sekarang = dateFormat(new Date().toLocaleString('en-US', {
                timeZone: 'Asia/Jakarta'
            }), "yyyy-mm-dd")

            var aturan_jam_masuk = moment(tanggal_sekarang + ' 07:00:00', 'YYYY-MM-DD HH:mm:ss')

            var durasi_telat = moment.duration(aturan_jam_masuk.diff(waktu_absen))
            var minuteTelat = durasi_telat.asMinutes()

            if (minuteTelat < 0) {
                isTelat('Terlambat')
            } else {
                isTelat('Hadir')
            }
        }, 1000)
    })
}

function getDataSiswa(id_rfid) {
    return new Promise(siswa => {
        setTimeout(() => {
            // Jalankan Query
            sqlite.all('SELECT * FROM siswa WHERE id_rfid = ?', [id_rfid], (err, rows, fields) => {
                if (err) {
                    console.log(err)
                    throw err
                } else {
                    if (rows[0] != null) {
                        siswa(rows[0].nis)
                    } else {
                        siswa(null)
                    }
                }
            })
        }, 1000)
    })
}

function cekIfTableExist(tanggal) {
    return new Promise(isExist => {
        setTimeout(() => {
            // Jalankan Query
            sqlite.all('SELECT * FROM rekapan WHERE tanggal = ?', [tanggal], (err, rows, fields) => {
                if (err) {
                    console.log(err)
                    throw err
                } else {
                    if (rows.length > 0) {
                        isExist(true)
                    } else {
                        isExist(false)
                    }
                }
            })
        })
    })
}

function getIdRekapan(tanggal) {
    return new Promise(id_rekapan => (
        setTimeout(() => {
            // Jalankan Query
            sqlite.all("SELECT id_rekapan FROM rekapan WHERE tanggal = ?", [tanggal], (err, rows, fields) => {
                if (err) {
                    console.log(err)
                    throw err
                } else {
                    id_rekapan(rows[0].id_rekapan)
                }
            })
        }, 1000)
    ))
}

exports.backupDatabase = (req, res) => {
    const fileDatabase = './db/PBO_RFID.db';
    res.download(fileDatabase)
}