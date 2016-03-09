var express = require("express"); 
var path = require('path');
var app = express(); 

// to use static file
app.use(express.static(path.join(__dirname, '/static'))); 
// to set veiws location and engine
app.set('views', path.join(__dirname, '/views')); 
app.set('view engine', 'ejs');

// set root file 
app.get('/', function(req, res){
	console.log('root route is working');
	res.render('index');
}); 
// set listening port and assign to server variable 
var server = app.listen(1234, function(){
	console.log("Listening on port: 1234"); 
}); 

var counter = 0; 
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
	socket.on("button_pushed", function(){
		counter = counter +1; 
		console.log("The counter was incremented by 1"); 
		io.emit("counter_change", {counter: counter});
		 
		// Other possible broadcast methods
		// socket.emit(...);
		// socket.broadcast(...); 
	}); 
	socket.on('reset', function(){
		counter = 0; 
		io.emit('counter_change',{counter: counter}); 
		console.log("The counter was reset."); 
	});
});