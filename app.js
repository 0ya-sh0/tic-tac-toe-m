const mexpress = require('express');
const mhttp = require('http');
const mio = require('socket.io');
const Games = require('./server/games');

const app = mexpress();
const http = mhttp.Server(app);
const io = mio(http);

const ipadd2= '192.168.43.42';
const ipadd1 = '0.0.0.0';
const ipadd = ipadd2;
const port = 3000;

http.listen(port,ipadd,function(){
	console.log(`listening on... http://${ipadd}:${port}`);
});

app.get('/',function(req,res){
	res.sendFile(__dirname + '/client/static/main.html');
});

app.get('/client/styles/responsive.css',function(req,res){
	res.sendFile(__dirname + '/client/styles/responsive.css');
});

app.get('/client/styles/style.css',function(req,res){
	res.sendFile(__dirname + '/client/styles/style.css');
});

app.get('/client/scripts/script.js',function(req,res){
	res.sendFile(__dirname + '/client/scripts/script.js');
});

const games = new Games();
const connectionHandler = games.connectionHandler.bind(games);

io.on("connection",(sock)=>connectionHandler(sock));
