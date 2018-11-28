# carlo

> headful Node app framework

## Features

* Web rendering surface for Node applications - 目的是为Node应用提供Web渲染的能力
* 内部使用Puppeteer ( <ref://./puppeteer.md.html> )，利用`DevTools协议`与Chrome浏览器进行通信
* 不同于`Electron`( <ref://./electron.md.html> )，carlo不绑定特定版本的Chrome，而是使用系统安装的Chrome
* 定位于node程序的`web渲染界面`，而不是桌面应用程序界面，与Electron在定位上并不冲突
* 想为你的node程序定制一个渲染界面，比如显示系统的硬件统计信息，可以用carlo
* 想用node编写桌面应用程序，那还是选择主流的`Electron`或者`nwjs` ( <ref://./nwjs.md.html> )


## Resources

* github: <https://github.com/GoogleChromeLabs/carlo>


## Tips

* node版本要求：version 8+


## Install

    $ npm install carlo


## Get Start

### main.js

    const carlo = require("carlo");

    (async () => {
        // Launch the browser.
        const app = await carlo.launch();

        // Terminate Node.js process on app window closing.
        app.on("exit", () => process.exit());

        // Tell carlo where your web files are located.
        app.serveFolder(__dirname);

        // Expose 'env' function in the web environment.
        await app.exposeFunction("env", _ => process.env);

        // Navigate to the main page of your app.
        await app.load("example.html");
    })();

### example.html

    <script>
    async function run() {
        // Call the function that was exposed in Node.
        const data = await env();
        for (const type in data) {
            const div = document.createElement("div");
            div.textContent = `${type}: ${data[type]}`;
            document.body.appendChild(div);
        }
    }
    </script>
    <body onload="run()">

### run

    $ node main.js



