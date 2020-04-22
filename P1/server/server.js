var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer((req, resp) => {
  url = ('.' + req.url);

  if (url == './') {
    url = 'tienda.html'
  }

  urlArray = url.split('.');
  extension = urlArray[urlArray.length-1];
  console.log(extension);

  fs.readFile(url, (err, resource) => {
    if (err) {
      console.log('mal');
      resp.writeHead(404);
      resp.end('Content not found')
    }else{
      var mimeType = 'text/html';
      console.log(resource);
      // if (extension == 'html') {
      //   resp.writeHead(200, {'Content-Type': 'text/html'});
      //   resp.end(resource);
      // }
      console.log("holi");
      if (extension == 'css') {
        mimeType = 'text/css';
      }
      if (extension == 'jpeg') {
          mimeType = 'img/jpeg';
      }
      if (extension == 'png') {
          mimeType = 'img/png';
      }
      if (extension == 'jpg') {
        mimeType = 'img/jpg';
      }

      resp.writeHead(200, mimeType);
      resp.end(resource);
    }
  })
}).listen(8080);
