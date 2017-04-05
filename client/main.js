$(function () {
	var content = $('#content');
	var status = $('#status');
	var input = $('#input');
	var username = null;

	// connect
	socket = io.connect('http://localhost:3000');

	// handle 'open' event
	socket.on('open',function(){
		status.text('Choose a name:');
	});

	// handle 'join' event
	socket.on('join',function(json){
		var p = '<p style="background:' + json.color + '">system  @ '+ json.time + ' : Welcome ' + json.name +'</p>';
		content.prepend(p); 
	});

	// handle 'close' event
	socket.on('close',function(json){
		var p = '<p style="background:' + json.color + '">system  @ '+ json.time + ' : Bye ' + json.name +'</p>';
		content.prepend(p); 
	});

	// handle 'message' event
	socket.on('message',function(json){
		var p = '<p><span style="color:' + json.color + ';">' + json.name + '</span> @ ' + json.time + ' : ' + json.text + '</p>';
		content.prepend(p);
	});

	// handle keyboard event
	input.keydown(function(e) {
		if (e.keyCode != 13) {
			return;
		}
		var msg = $(this).val();
		if (!msg) {
			return;
		}
		if(username == null) {
			username = msg;
			socket.emit("join", msg);
		} else {
			// Tips: send(xxx) = emit("message", xxx)
			socket.send(msg);
		}
		$(this).val('');
	});
});