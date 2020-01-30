'use strict';

var response = require('../res/res')
var dateFormat = require('dateformat')
var socketIo = require('../socket/socketServer')
var sqlite = require('../config/conn');

exports.index = (req, res) => {
    res.sendFile('index.html', { root: '.' });
}

exports.presensi = (req, res) => {
    const id_device = req.body.id_device;
    const id_rfid = req.body.id_device;

    if (!id_device || !id_rfid) { // Cek apakah data ada atau tidak
        res.status(404)
        response.ok('Paramater is required!', res)
    }

    // Kembalikan respon ke dalam bentuk Json
    var dateNow = dateFormat(new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta'
    }), "d-mm-yyyy HH:MM:ss")
    var values = {
        'id_rfid': id_rfid,
        'id_device': id_device,
        'datetime': dateNow
    }
    
    socketIo.getIo().emit('rfid-data', values)

    response.ok(values, res)

}

exports.pengumuman = (req, res) => {
    const isi_pegumuman = req.body.isi_pegumuman;
    const kelas_tujuan = req.params.kelas_tujuan;

    if(!isi_pegumuman || !kelas_tujuan){
        res.status(404)
        response.ok('Parameter is required', res)
    }

    // Emmit Pengumuman ke Socket IO
    var values = {
        'isi_pengumuman': isi_pegumuman,
        'kelas_tujuan': kelas_tujuan
    }

    // Mulai Emmit
    socketIo.getIo().emit('pengumuman', values)

    response.ok(values, res)
}

exports.izin = (req, res) => {
    // Beberapa atribut yang akan digunakan
    // 1. NIS untuk mengidentifikasi siapa yang izin
    // 2. Keterangan untuk mengindentifikasi Kenapa izin
    // 3. Jenis Izin, (Sakit / Izin)
    // 4. Waktu dan Tanggal Izin

    const nis = req.body.nis
    const keterangan = req.body.keterangan
    const jenis_izin = req.body.jenis_izin

    // Cek apakah sudah dimasukan atau belum
    if(!nis || !keterangan || !jenis_izin){
        res.status(404)
        response.ok('Parameter is Required!', res)
    }

    // Logic izin : Masuk data ke DB Sementara, lalu ubah status nya apakah approved atau denied
    var hari_ini = dateFormat(new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta'
    }), "d-mm-yyyy")

    // Set Values
    var values = {
        'nis': nis,
        'keterangan': keterangan,
        'jenis_izin': jenis_izin,
        'datetime': hari_ini
    }

    // Kirimkan Emit
    socketIo.getIo().emit('izin', values)

    response.ok(values, res)

}

exports.kehadiran = (req, res) => {
    // Select data berdasarkan nis
    const nis = req.body.nis
    var pesan = ""
    var status = ""
    const quote = "Jutaan siswa tidak menyadari bahwa pergi kesekolah setiap hari bisa menjadikan kita sukses dan menghasilkan $1000 dolar hanya dengan belajar"
    const hari_ini = dateFormat(new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta'
    }), "d-mm-yyyy")

    // Jalankan Query
    sqlite.all('SELECT status FROM kehadiran WHERE nis = ? AND tanggal = ? ', [nis, hari_ini], (err, rows) => {
        if(err){
            console.log(err)
            throw err
        } else {
            // Set Status
            status = rows[0].status
            
            // Cek untuk response yang interaktif
            if(status == "Izin"){
                pesan = "Kamu hari ini Izin"
            } else if(status == "Sakit"){
                pesan = "Kamu hari ini Sakit, pastikan segera periksa ke Dokter Ya!"
            } else {
                pesan = "Wah kayakna kamu hari ini bolos deh"
            }

            // Masukan ke dalam values, sebelum dikirim menjadi response
            var values = {
                'nis': nis,
                'pesan': pesan,
                'status': status,
                'quote': quote
            }

            response.ok(values, res)
        }
    });
}

exports.kehadiranSemua = (req, res) => {
    const nis = req.body.nis

    // Jalankan Query
    sqlite.all('SELECT * FROM kehadiran WHERE nis = ?', [nis], (err, rows) => {
        if(err){
            console.log(err)
            throw err
        } else {
            response.ok(rows,res)
        }
    });
}