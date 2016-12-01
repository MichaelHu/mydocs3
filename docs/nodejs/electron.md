# electron

> The Electron framework lets you write `cross-platform desktop applications` using `JavaScript`, `HTML` and `CSS`. It is based on `Node.js` and `Chromium` and is used by the `Atom` editor and many other apps.

<img src="./img/electron.png" width="80" style="border-radius: 5px;">

* 主页：<http://electron.atom.io>
* github：<https://github.com/electron/electron>
* 文档：<http://electron.atom.io/docs/>
* 使用Electron构建的APP（有头有脸的120+）：<http://electron.atom.io/apps/>


优秀编辑器`Atom`是主要代表。你建立的站点，都可以搬到桌面应用里。`electron-prebuild`是electron的核心产出。Microsoft, Facebook, Slack, and Docker 等公司都在使用。

    npm install electron-prebuild -g


## 问题

* 如何禁用Chrome的快捷键，比如刷新、调起开发者工具等


## Quick Start

以下两个例子，能帮助你快速了解`electron`。

* app: Electron API demos
* electron-quick-start

        # Clone the Quick Start repository
        $ git clone https://github.com/electron/electron-quick-start

        # Go into the repository
        $ cd electron-quick-start

        # Install the dependencies and run
        $ npm install && npm start



## Installer



## BrowserWindow

    new BrowserWindow( [ options ] )

> @param {object} options

    title: ...
    , icon: ...
    , closable: ...
    , alwaysOnTop: ...
    , fullscreen: ...
    , fullscreenable: ...
    , skipTaskbar: ...
    , kiosk: ...
    , show: ...
    , frame: ...
    , parent: ...
    , modal: ...

    // Whether the web view accepts a single mouse-down event that simultaneously activates the window. Default is false
    , acceptFirstMouse: ...




