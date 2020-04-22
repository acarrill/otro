function login() {
  //-- Crear el websocket
  var socket = io();
  let loginTool = document.getElementById('login-tool');
  let loginInput = document.getElementById('login-input');
  let loginButton = document.getElementById('login-send');
  let tyMssg = document.getElementById('ty-mssg');

  loginButton.onclick = () => {
    const User = loginInput.value;
    loginTool.style = "display:none";
    tyMssg.innerHTML += User;
    tyMssg.style = "display:block";

    socket.emit('login', User);
    main(socket, User);
  }
}

function main(socket, User) {
  console.log("Hola!!!!-------------")


  //-- Obtener los elementos de interfaz:

  //-- Boton de envio de mensaje
  var send = document.getElementById('send')

  //-- Parrafo para mostrar mensajes recibidos
  var display = document.getElementById('display')

  //-- Caja con el mensaje a enviar
  var msg = document.getElementById("msg")

  // --Boton de irse
  var logOut = document.getElementById("logout-button")
  logOut.style = "display: block"

  logOut.onclick = () => {
    socket.emit('taluego', User)
  }

  //-- Cuando se aprieta el botón de enviar...
  send.onclick = () => {
    //-- Enviar el mensaje, con el evento "new_message"
    socket.emit('new_message', msg.value, User);
    //-- Lo notificamos en la consola del navegador
    console.log("Mensaje emitido")
  }

  //-- Cuando se reciba un mensaje del servidor se muestra
  //-- en el párrafo
  socket.on('new_message', msg => {
    console.log(msg);
    display.innerHTML += '\n' + msg;
  });

}
