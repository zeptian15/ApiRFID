'use strict';

module.exports = (app) => {
    // Controller
    var presensi = require('../controllers/PresensiController');

    // Get data for presensi
    app.route('/')
    .get(presensi.index);

    // Post data from RFID device & Send data to Firebase
    app.route('/presensi')
    .post(presensi.presensi);

    app.route('/backup')
    .get(presensi.backupDatabase);

}