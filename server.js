const bodyParser = require('body-parser');
var socket = require('./socket/socketServer')

socket.getApp().use(bodyParser.urlencoded({extended: true}));
socket.getApp().use(bodyParser.json());

var routes = require('./routes/routes');
routes(socket.getApp());

// app.listen(port);
console.log('Mulai :' + socket.getPort());


socket.getHttp().listen(socket.getPort(), function(){
	console.log("Server Is Listening")
})
