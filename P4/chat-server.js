var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let users = [];

// static files
app.use('/static', express.static('static'));
//--Servir la pagina principal
app.get('/', function(req, res){
  res.sendFile(__dirname + '/templates/chat.html');
});

//-- Servir el cliente javascript
app.get('/chat-client.js', function(req, res){
  res.sendFile(__dirname + '/chat-client.js');
});

//-- Lanzar el servidor
http.listen(3000, function(){
  console.log('listening on *:3000');
});

//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){

  socket.on('login', data => {
    users.push(data);
    let serverMssg = `SERVER MESSAGE: ${data} is one of us now!!!`;
    socket.broadcast.emit('new_message', serverMssg);
    socket.emit('new_message', "SERVER MESSAGE: BIENVENIDO CHAVAL")
  });

  //-- Detectar si el usuario se ha desconectado
  socket.on('taluego', function(user){
    let serverMssg = `SERVER MESSAGE: ${user} rests in peace`;
    socket.broadcast.emit('new_message', serverMssg);
    // REMOVE USER FROM users array
    users.splice(users.indexOf(user),1);
  });

  //-- Detectar si se ha recibido un mensaje del cliente
  socket.on('new_message', (msg, User) => {
     //server message if command is used
    let serverMssg = "";
    if (msg.charAt(0) == '/') {
      switch (msg) {
       case "/help":
        serverMssg = "SERVER MESSAGE: COMMANDS = /list /help /date /hello";
        break;
       case "/list":
        serverMssg = `SERVER MESSAGE: Users = ${users}`;
        break;
       case "/hello":
        serverMssg = "HEY YO  ";
        break;
       case "/date":
        let date = new Date();
        serverMssg = `SERVER MESSAGE: Date: ${date}`;
        break;
       default:
       serverMssg = "SERVER MESSAGE: This looks like an invalid command my friend";
      }
    } else {
     if (users.includes(User)) {
       if (msg.length != 0) {
         socket.broadcast.emit('new_message', User + ": " +msg);
       }
     }else{
       socket.emit('new_message', "SERVER MESSAGE: U ARE LOGOUT RELOAD THE PAGE AND LOG URSELF");
     }
   }

   if (serverMssg != "") {
     socket.emit('new_message', serverMssg);
   }
 });


});
