const http = require('http');
const url = require('url');
const fs = require('fs');
const PUERTO = 8080

//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  console.log("----------> Peticion recibida")
  let q = url.parse(req.url, true);

  if (q.pathname == '/') {
    filename = 'index.html';
  } else {
    filename = ('.' + q.pathname);
  }
  // Extraccion de extension
  urlArray = filename.split('.');
  extension = urlArray[urlArray.length-1];
  console.log(filename);
  //-- Leer fichero
  fs.readFile(filename, function(err, data) {

    //-- Fichero no encontrado. Devolver mensaje de error
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }

    //-- Tipo mime por defecto: html
    let mime = "text/html"

    if (extension == 'css') {
      mime = 'text/css';
    }
    if (extension == 'jpeg') {
        mime = 'img/jpeg';
    }
    if (extension == 'png') {
        mime = 'img/png';
    }
    if (extension == 'jpg') {
      mime = 'img/jpg';
    }
    if (extension == 'png') {
      mime = 'img/png';
    }

    //-- Generar el mensaje de respuesta
    res.writeHead(200, {'Content-Type': mime});
    res.end(data);
  });

}).listen(PUERTO);

console.log("Servidor corriendo...")
console.log("Puerto: " + PUERTO)
