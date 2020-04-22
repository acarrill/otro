var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer((req, res) => {
  const Products = ["PINKFLOYD", "NEWORDER", "KINGLEON", "KINGCRIMSON"];

  url = ('.' + req.url);
  let cookies = req.headers.cookie;
  console.log(cookies);
  if (url == './') {
    url = './templates/tienda.html'
  }
  console.log(url);
  urlArray = url.split('.');
  extension = urlArray[urlArray.length-1];

  if (extension == 'html' && url != "./login") {
    if (!cookies) {
      url = "./templates/register.html";
    }else if (cookies && !cookies.includes('user')) {
      url = "./templates/register.html";
    }
  }

  if (url == './login'){
    const User = Math.floor((Math.random()*1000) + 1)
    res.setHeader('Set-Cookie', 'user='+User);
    url = './templates/tienda.html';
    extension = 'html';
  }

  // COOKIES CONTROL

  if (extension == "add") { //METER EN function
    let product = urlArray[urlArray.length-2]
    switch (product) {
      case '/PinkFloyd':
        res.setHeader('Set-Cookie', 'product1=PinkFloyd');
        url = './templates/tienda.html';
        extension = 'html';
        break;
      case '/NewOrder':
        res.setHeader('Set-Cookie', 'product2=NewOrder');
        url = './templates/tienda.html';
        extension = 'html';
        break;
      case '/KingLeon':
        res.setHeader('Set-Cookie', 'product3=KingLeon');
        url = './templates/tienda.html';
        extension = 'html';
        break;
      case '/KingCrimson':
        res.setHeader('Set-Cookie', 'product4=KingCrimson');
        url = './templates/tienda.html';
        extension = 'html';
        break;
      default:
    }
  }

  if (req.method == 'POST') {
    let name = "";
    let lastName = "";
    let email = "";
    let payMeth = "";
    req.on('data', chunk => {
      formInfo = chunk.toString().split('&');
      name = formInfo[0].split('=')[1];
      lastName = formInfo[1].split('=')[1];
      email = formInfo[2].split('=')[1].split('%40').join('@');
      payMeth = formInfo[3].split('=')[1];
    })
    req.on('end', () => {
      let content = `
      <!DOCTYPE html>
      <html lang="en" dir="ltr">
        <head>
          <link rel="stylesheet" type="text/css" href="http://localhost:8000/static/portada.css">
          <meta charset="utf-8">
          <title></title>
        </head>
        <body>
          <div class="topnav">
            <div class="menu-col">
              <div class="menu-item">
                <li>
                  <a href="">Contacto</a>
                </li>
              </div>
              <div class="menu-item">
                <li>
                  <a href="#">Productos</a>
                </li>
              </div>
              <div class="menu-item">
                <ul>
                  <form class="search-form" action="http://localhost:8000/search" method="get">
                      <input type="text" autocomplete="off" name="search-box" value="" placeholder="search">
                  </form>
                </ul>
              </div>
            </div>
            <div class="menu-item" style="left:80px;">
              <a href="./templates/compra.html">Comprar</a>
            </div>
            <div class="menu-item">
              <a href="http://localhost:8000/">
                <img src="http://localhost:8000/static/home.png" alt="">
              </a>
            </div>
          </div>

          <div class="cart-mssg">
            <p>Your buy data</p>
            <div>
              <label style="color: black">Name:</label>
              <li type="square">${name}</li>
            </div>
            <div>
            <label style="color: black">LastName:</label>
            <li type="square">${lastName}</li>
            </div>
            <div>
              <label style="color: black">Email:</label>
              <li type="square">${email}</li>
            </div>
            <div>
              <label style="color: black">Payment method:</label>
              <li type="square">${payMeth}</li>
            </div>
          </div>
          `
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.end(content)
    })
  }
  if (url.includes("searching")) {
    let searchValue = url.split('=')[1];
    searchValue = searchValue.split('%20').join('');
    searchValue = searchValue.toUpperCase();
    console.log("searchValue");
    console.log(searchValue);
    let matches = [];
    for (product in Products) { //MAKE IT NO SENSITIVE TO CAPS
      if (Products[product].includes(searchValue)) {
        matches.push(Products[product]);
      }
    }
    console.log(matches);
    let matchesJSON = JSON.stringify(matches)
    res.writeHead(200, {"Content-Type": 'application/json'});
    res.end(matchesJSON);
  }
  if (url.includes("./searched")) {
    let productTemplate = url.split("=")[1].split("&")[0];
    console.log('search');
    console.log(productTemplate);
    url = `./templates/${productTemplate}.html`;
    extension = "html";
    console.log(url);
  }

  fs.readFile(url, (err, resource) => {
    if (err) {
      res.writeHead(404);
      res.end('Content not found')
    }else{
      var mimeType = 'text/html';
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
      if (extension == 'js') {
        mimeType = 'application/javascript';
      }
      res.writeHead(200, mimeType);
      res.end(resource);
    }
  })
}).listen(8000);
