# WebSocket调研


W3C信息：`Web Applications Working Group`的草案，2012-09-20版的`The WebSocket API`。


对HTTP协议的补充，支持全双工通信，减少HTTP请求Header的冗余信息。


## 1. interface IDL

    [Constructor(DOMString url, optional (DOMString or DOMString[]) protocols)]
    interface WebSocket : EventTarget {
        readonly attribute DOMString url;

        // ready state
        const unsigned short CONNECTING = 0;
        const unsigned short OPEN = 1;
        const unsigned short CLOSING = 2;
        const unsigned short CLOSED = 3;
        readonly attribute unsigned short readyState;
        readonly attribute unsigned long bufferedAmount;

        // networking
                 attribute EventHandler onopen;
                 attribute EventHandler onerror;
                 attribute EventHandler onclose;
        readonly attribute DOMString extensions;
        readonly attribute DOMString protocol;
        void close([Clamp] optional unsigned short code, optional DOMString reason);

        // messaging
                 attribute EventHandler onmessage;
                 attribute DOMString binaryType;
        void send(DOMString data);
        void send(Blob data);
        void send(ArrayBuffer data);
        void send(ArrayBufferView data);
    };



## 2. 应用


网页聊天室，`socket.io`是比较知名的封装。基于`nodejs`，启动支持websocket协议的server，
通常与Express框架配合，当然也可以独立运行。




### 2.1 独立运行


    var server = require('http').createServer();
    var io = require('socket.io')(server);
    io.on('connection', function(socket){
      socket.on('event', function(data){});
      socket.on('disconnect', function(){});
    });
    server.listen(3000);





### 2.2 与Express配合

    var app = require('express')();
    var server = require('http').createServer(app);
    var io = require('socket.io')(server);
    io.on('connection', function(){ /* … */ });
    server.listen(3000);



### 2.3 快速使用example

安装node和npm，然后：

    git clone git@github.com:Automattic/socket.io.git
    cd socket.io
    npm install
    cd example/chat
    npm install
    node .

启动成功node server，默认监听`3000`端口。可以用浏览器访问了。





## 3. 原生用法

提供的API：

    var ws = new WebSocket("ws://localhost:8080");
    ws.onopen = function() {
        console.log("open");
        ws.send("hello");
    };
    ws.onmessage = function(evt) {
        console.log(evt.data)
    };
    ws.onclose = function(evt) {
        console.log("WebSocketClosed!");
    };
    ws.onerror = function(evt) {
        console.log("WebSocketError!");
    };



## 4. Ping and Pong frames

用于`keep-alive`， `hear-beats`， `network status probing`等。检测网络连接是否正常，显示连接延迟信息等。





