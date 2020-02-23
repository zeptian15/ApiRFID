'use strict'

const sqlite = require('../config/conn')
const validator = require('email-validator')

// Get All User
exports.getAllUser = (req, res) => {
    // Jalankan Query
    sqlite.all('SELECT * FROM user', (err, rows, fields) => {
        if (err) {
            res.status(404).send({
                status_code: 404,
                msg: 'Data not found'
            })
        } else {
            res.status(200).send({
                status_code: 404,
                results: rows
            })
        }
    })
}

// Insert User Baru
exports.insert = async (req, res) => {
    const nama = req.body.nama
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const level = req.body.level

    // Validasi
    if (!nama || !username || !password || !email || !level) {
        res.status(404).send({
            status_code: 404,
            msg: 'Parameter is required'
        })
    } else {
        var validUsername = await cekUsername(username)
        var validEmail = await cekEmail(email)
        if (validUsername) {
            if (validEmail) {
                // Jalankan Query
                sqlite.run('INSERT INTO user (nama, username, password, email, level) VALUES (?,?,?,?,?)', [nama, username, password, email, level], (err, roes, fields) => {
                    if (err) {
                        res.status(404).send({
                            status_code: 404,
                            msg: 'Data gagal dimasukan'
                        })
                    } else {
                        res.status(201).send({
                            status_code: 201,
                            msg: 'Data berhasil dimasukan'
                        })
                    }
                })
            } else {
                res.status(404).send({
                    status_code: 404,
                    msg: 'Email not valid'
                })
            }
        } else {
            res.status(404).send({
                status_code: 404,
                msg: 'Username already exist'
            })
        }
    }
}


// Cek apakah username sudah digunakan atau tidak
function cekUsername(username) {
    return new Promise(isNotExist => {
        setTimeout(() => {
            // Jalankan Query
            sqlite.all('SELECT * FROM user WHERE username = ? ', [username], (err, rows, fields) => {
                if (err) {
                    console.log(err)
                } else {
                    if (rows.length < 0) {
                        isNotExist(true)
                    } else {
                        isNotExist(false)
                    }
                }
            })
        }, 2000)
    })
}

// Cek apakah Email Valida atau tidak
function cekEmail(email) {
    return new Promise(isValid => {
        setTimeout(() => {
            var valid = validator.validate(email)
            if (valid) {
                isValid(true)
            } else {
                isValid(false)
            }
        }, 2000)
    })
}

// Update data user
exports.update = async (req, res) => {
    const id_user = req.body.id_user
    const nama = req.body.nama
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const level = req.body.level

    // Validasi
    if (!id_user || !nama || !username || !password || !email || !level) {
        res.status(404).send({
            status_code: 404,
            msg: 'Parameter is required'
        })
    } else {
        var validEmail = await cekEmail(email)
        if (validEmail) {
            // Jalankan Query
            sqlite.run('UPDATE user SET nama = ?, username = ?, password = ?, email = ?, level = ? WHERE id_user = ?', [nama, username, password, email, level, id_user], (err, rows, fields) => {
                if (err) {
                    res.status(404).send({
                        status_code: 404,
                        msg: 'Data gagal diubah'
                    })
                    console.log(err)
                } else {
                    res.status(200).send({
                        status_code: 200,
                        msg: 'Data berhasil diubah'
                    })
                }
            })
        } else {
            res.status(404).send({
                status_code: 404,
                msg: 'Email not valid'
            })
        }
    }
}