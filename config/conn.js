var sqlite = require('sqlite3').verbose();
var db_file = './db/PBO_RFID.db';

var db = new sqlite.Database(db_file, sqlite.OPEN_READWRITE, (error) => {
    if(error){
        console.log(error)
    } else {
        console.log("Koneksi database berhasil!")
    }
});

module.exports = db;