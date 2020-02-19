'use strict';

module.exports = (app) => {
    // Controller
    var presensi = require('../controllers/PresensiController');
    var kehadiran = require('../controllers/KehadiranController');
    var rekapan = require('../controllers/RekapanController');
    var izin = require('../controllers/IzinController');

    // Halaman Home
    app.route('/')
    .get(presensi.index);

    // Post data from RFID device
    app.route('/presensi')
    .post(presensi.presensi);

    // Backup Database
    app.route('/backup')
    .get(presensi.backupDatabase);

    // Get Today Kehadiran
    app.route('/kehadiran')
    .get(kehadiran.getTodayKehadiranLimit)

    // Get Today Kehadiran Semua
    app.route('/kehadiran/semua')
    .get(kehadiran.getTodayKehadiranAll)

    // Rekap data presensi harian
    app.route('/rekap/harian')
    .post(rekapan.rekapharian)

    // Rekap data presensi bulanan
    app.route('/rekap/bulanan')
    .post(rekapan.rekapBulanan)

    // Get All Izin Request
    app.route('/izin')
    .get(izin.getAllIzinRequest)

    // Get detail Izin Request
    app.route('/izin/detail')
    .post(izin.getDetailIzinRequest)

    // Create Izin Request
    app.route('/izin/create')
    .post(izin.createIzinRequest)

    // Edit Izin Request
    app.route('/izin/edit')
    .patch(izin.editIzinRequest)

}