'use strict';

module.exports = (app) => {
    // Controller
    var presensi = require('../controllers/PresensiController');

    // Get data for presensi
    app.route('/')
    .get(presensi.index);

    // Post data from RFID device & Send data to Firebase
    app.route('/rfid-data')
    .post(presensi.presensi);

    // Kirimkan Pengumuman
    app.route('/pengumuman/:kelas_tujuan')
    .post(presensi.pengumuman);

    // Buat Izin dari Android
    app.route('/izin')
    .post(presensi.izin);
    
    // Menampilkan status Absen siswa hari ini berdasarkan Absen
    app.route('/kehadiran')
    .post(presensi.kehadiran);

    // Menampilkan seluruh List Absen siswa Selama yang ada pada record
    app.route('/kehadiran/semua')
    .post(presensi.kehadiranSemua);

}