'use strict';

module.exports = (app) => {
    // Controller
    var presensi = require('../controllers/PresensiController');
    var kehadiran = require('../controllers/KehadiranController');
    var rekapan = require('../controllers/RekapanController');
    var izin = require('../controllers/IzinController');
    var siswa = require('../controllers/SiswaController');
    var user = require('../controllers/UserController');
    var pengumuman = require('../controllers/PengumumanController');

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

    // Get kehadiran berdasarkan Filter
    app.route('/kehadiran/filter')
        .post(kehadiran.getTodayKehadiranAllFilter)

    // Get kehadiran bersarkan id_Rekapan
    app.route('/kehadiran/byId')
        .post(kehadiran.getKehadiranByIdRekapan)

    // Get kehadiran berdasarkan NIS hari ini
    app.route('/kehadiran/nis')
        .post(kehadiran.getTodayKehadiranByNis)

    // Get kehadiran berdasarkan NIS semua
    app.route('/kehadiran/nis/semua')
        .post(kehadiran.getAllKehadiranByNis)

    // Siswa

    // Get All Siswa
    app.route('/siswa')
    .get(siswa.getAllSiswa)

    // Registrasi Siswa
    app.route('/siswa')
    .post(siswa.registrasiSiswa)

    // User

    // Get All User
    app.route('/user')
    .get(user.getAllUser)

    // Insert user
    app.route('/user')
    .post(user.insert)

    // Update User
    app.route('/user')
    .patch(user.update)

    // Rekap data presensi harian
    app.route('/rekap/harian')
        .post(rekapan.rekapharian)

    // Rekap data presensi bulanan
    app.route('/rekap/bulanan')
        .post(rekapan.rekapBulanan)

    // Pengumuman
    
    // Get All Pengumuman
    app.route('/pengumuman')
    .get(pengumuman.getAllPengumuman)

    // Get All Pengumuman Hari Ini
    app.route('/pengumuman/today')
    .get(pengumuman.getTodayAllPengumuman)

    // Get Pengumuman Per Kelas
    app.route('/pengumuman/kelas')
    .post(pengumuman.getKelasPengumuman)

    // Get Pengumuman Per Kelas
    app.route('/pengumuman/kelas/today')
    .post(pengumuman.getTodayKelasPengumuman)

    // Create Pengumuman
    app.route('/pengumuman')
    .post(pengumuman.createPengumuman)

    // Update pengumuman
    app.route('/pengumuman')
    .patch(pengumuman.updatePengumuman)

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