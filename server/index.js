const http = require('http');
const url = require('url');

const hostname = '172.18.19.75';
const port = 3020;
const clientPort = 3010;

const server = http.createServer((req, res) => {
    const URL = url.parse(req.url);
    if (URL.pathname === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Access-Control-Allow-Origin', `http://${hostname}:${clientPort}`);
        res.end("Hi, I am from server~");
    } else if (URL.pathname === '/jsonp') {
        res.statusCode = 200;
        res.end(`${URL.query.split('=')[1]}({name:"Jonge"})`);
    } else if (URL.pathname === '/msg') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(`
        <body>
        <h1>This is Another Page~ </h1>
        <p id="msg"></p>
        <p id="error" style="color:red;"></p>
        <script>
            window.parent.postMessage('hi~ outer', 'http://${hostname}:${clientPort}');
            window.onmessage = function (event) {
                sayHi(event.origin, event.data);
              };
              
              function sayHi(origin, data) {
                document.querySelector('#msg').innerText = 'MSG(from '+origin+'): ' + data;
              }
        </script>
        </body>
        `);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});