# node-debugger

## Resources

* `node debugger`: <https://nodejs.org/api/debugger.html>
* `debugging-getting-started`: <https://nodejs.org/en/docs/guides/debugging-getting-started/>
* `v8-inspector( node )`: <https://chromedevtools.github.io/devtools-protocol/v8>


## Features

* `websocket`接口，使用`Inspector Protocol`( <https://chromedevtools.github.io/debugger-protocol-viewer/v8/>，该协议允许使用任何遵从该协议的工具进行调试
* 从`node 6.3+`开始支持`--inspect`选项，以便通过Chrome DevTools进行可视化调试


## Usage

### 启动调试服务

    # 启动调试服务
    $ node --inspect <script>
    $ node --inspect[=host:port] <script>
    $ node --inspect-brk <script>
    $ node --inspect-brk[=host:port] <script>


### 启动CLI调试器

    # 启动命令行调试器
    $ node inspect <script>
    # 启动命令行调试器，并监听指定端口（并未开启调试服务器）
    $ node inspect --port=xxx <script>

    # 旧版本使用debug，新版本将用inspect替代
    $ node debug <script>



### 使用调试客户端

在Chrome浏览器中打开以下模式的链接：

    chrome-devtools://devtools/bundled/js_app.html?experiments=true&v8only=true&ws=127.0.0.1:9229/c85478a6-526f-475d-8d90-54a3e6622fcc

以上链接一般会在启动调试服务的命令行中有提示，也可以通过`下方获取调试器信息的HTTP接口`获得，比如以上调试Session的信息可以通过以下命令获得：

    $ curl http://127.0.0.1:9229/json/list



## HTTP接口

### 获取调试器信息

    http://[host:port]/json/list

    {
        "description": "node.js instance",
        "devtoolsFrontendUrl": "chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
        "faviconUrl": "https://nodejs.org/static/favicon.ico",
        "id": "0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
        "title": "node",
        "type": "node",
        "url": "file://",
        "webSocketDebuggerUrl": "ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e"
    }
