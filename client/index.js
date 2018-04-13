const http = require('http');
const url = require('url');

const hostname = '192.168.1.9';
const port = 3010;
const serverPort = 3020;

const server = http.createServer((req, res) => {
    const URL = url.parse(req.url);
    if (URL.pathname === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(`
        <body>
        <h1>This is Client~</h1>
        <p id="msg"></p>
        <p id="error" style="color:red;"></p>
        <script>
        fetch('http://${hostname}:${serverPort}',{
            headers: {'Origin':'http://${hostname}:${port}'}
        }).then((resp)=>{
            return resp.text();
        }).then((resp)=>{
            document.querySelector('#msg').innerText = resp;
        }).catch(function(resp) {
            document.querySelector('#error').innerText = resp;
        });
        </script>
        </body>
        `);
    } else if (URL.pathname === '/jsonp') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(`
        <body>
        <h1>This is Client~ JSONP DEMO</h1>
        <p id="msg"></p>
        <p id="error" style="color:red;"></p>
        <script>
        function addScript(src) {
            var script = document.createElement('script');
            script.src = src;
            document.body.appendChild(script);
          }
          
          window.onload = function () {
            addScript('http://${hostname}:${serverPort}/jsonp?callback=sayHi');
          };
          
          function sayHi(data) {
            document.querySelector('#msg').innerText = 'Hi~' + data.name;
          }
        
        </script>
        </body>
        `);
    } else if (URL.pathname === '/msg') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(`
        <body>
        <h1>This is Client~ postMessage() DEMO</h1>
        <p id="msg"></p>
        <iframe id="mFrame" src="http://${hostname}:${serverPort}/msg"></iframe>
        <script>
          window.onmessage = function (event) {
            sayHi(event.origin, event.data);
            event.source.postMessage('hello~ iframe', 'http://${hostname}:${serverPort}');
          };

          
          function sayHi(origin, data) {
            document.querySelector('#msg').innerText = 'MSG(from '+ origin +'): ' + data;
          }
        </script>
        </body>
        `);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});