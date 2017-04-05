var server = require('http').Server();
var io = require('socket.io')(server);

io.on('connection', function (socket) {
	// send 'open' event
	socket.emit('open');

	// msg object
	var client = {
		name: null,
		time: null,
		text: null,
		color: getColor()
	}

	// send 'join' event
	socket.on('join', function(msg) {
		client.name = msg;
		client.time = getTime();
		console.log(client.name + ' login');
		socket.emit('join', client);
		socket.broadcast.emit('join', client);
	});

	// send 'message' event
	socket.on('message', function(msg) {
		client.text = msg;
		client.time = getTime()
		console.log(client.name + ' say: ' + msg);
		socket.emit('message', client);
		socket.broadcast.emit('message', client);
	});

	// send 'disconnect' event
	socket.on('disconnect', function () {
		client.time = getTime();
		console.log(client.name + ' disconnect');
		socket.broadcast.emit('close', client);
	});
});

// listen
server.listen(3000, function(){
	console.log("server start, listening on port 3000");
});

// get current time
var getTime = function() {
	var date = new Date();
	return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

// get random color
var getColor = function() {
	var colors = ['pink','red','green','orange','blue','brown'];
	var random = Math.random() * (colors.length - 1)
	return colors[Math.floor(random)];
}