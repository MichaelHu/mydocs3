# Nodejs Examples

## webserver

nodejs编写的简易web server，每次请求其返回`Hello World`：

1. webserver.js

        var http = require('http');
        http.createServer(function (req, res) {
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end('Hello World\n');
        }).listen(1337, '127.0.0.1');
        console.log('Server running at http://127.0.0.1:1337/');

2. command line

        % node webserver.js
        Server running at http://127.0.0.1:1337/




## simple TCP Server

1. tcpserver.js

        var net = require('net');

        var server = net.createServer(function (socket) {
          socket.write('Echo server\r\n');
          socket.pipe(socket);
        });

        server.listen(1337, '127.0.0.1');

2. command line

        % node tcpserver.js

