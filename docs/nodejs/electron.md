# electron

> The Electron framework lets you write `cross-platform desktop applications` using `JavaScript`, `HTML` and `CSS`. It is based on `Node.js` and `Chromium` and is used by the `Atom` editor and many other apps. <img src="./img/electron.png" style="border-radius: 5px; max-height: 30px;">

## Description

* 优秀编辑器`Atom`是使用`electron`的主要代表
* 你建立的站点，都可以搬到桌面应用里
* `electron-prebuild`是electron的核心产出
* `Microsoft`, `Facebook`, `Slack`, and `Docker`等公司都在使用

## Resources

* site：<http://electron.atom.io>
* github：<https://github.com/electron/electron> <iframe src="http://258i.com/gbtn.html?user=electron&repo=electron&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>  
* 文档：<http://electron.atom.io/docs/>
* 使用Electron构建的APP（有头有脸的`120+`）：<http://electron.atom.io/apps/>


## Installation

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




