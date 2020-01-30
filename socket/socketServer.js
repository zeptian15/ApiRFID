const express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    port = process.env.PORT || 3000,
    io = require('socket.io')(http);

const getApp = () => {
    return app;
}

const getHttp = () => {
    return http;
}

const getPort = () => {
    return port;
}

const getIo = () => {
    return io;
}

const getIoInstance = () => {
    return io.on('connection', function (socket) {
        console.log('Client connected...');
    });
}

exports.getApp = getApp;
exports.getHttp = getHttp;
exports.getPort = getPort;
exports.getIo = getIo;
exports.getIoInstance = getIoInstance;