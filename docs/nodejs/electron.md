# electron

> The Electron framework lets you write `cross-platform desktop applications` using `JavaScript`, `HTML` and `CSS`. It is based on `Node.js` and `Chromium` and is used by the `Atom` editor and many other apps. <img src="./img/electron.png" style="border-radius: 5px; max-height: 30px;">



## Description

* 优秀编辑器`Atom`是使用`electron`的主要代表，还有MS的`Visual Studio Code`
* 你建立的站点，都可以搬到桌面应用里
* `electron-prebuild`是electron的核心产出
* `Microsoft`, `Facebook`, `Slack`, and `Docker`等公司都在使用




## Resources

* site：<http://electron.atom.io>
* github：<https://github.com/electron/electron> <iframe src="http://258i.com/gbtn.html?user=electron&repo=electron&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>  
* 文档：<http://electron.atom.io/docs/>
* 使用Electron构建的APP（有头有脸的`120+`）：<http://electron.atom.io/apps/>
* [ 180404 ] New in Electron 2: In-App Purchases <https://electronjs.org/blog/in-app-purchases>



## Versions

> releases: <https://electron.atom.io/releases/>

* 2018-05-02 2.0.0
* 2018-04-27 1.8.6 
* ...
* 2017-10-10 1.7.9
* ...
* 2016-05-09 1.0.0 
* ...
* 2015-12-25 0.35.5




## Installation

    # latest version
    $ npm install --save-dev electron 
    $ ./node_modules/.bin/electron .

    # older versions
    $ npm install electron-prebuild -g



## Examples

### file-explorer

> 简易文件浏览器，目录打开、文件调用对应程序预览

#### Tips

* 文件浏览器，通过electron提供的API，以及`address_bar`, `folder_view`等模块，实现一个简易的文件浏览器
* 涉及的API，简单罗列如下：

        nativeMenuBar = new Menu();
        nativeMenuBar.createMacBuiltin 
            && nativeMenuBar.createMacBuiltin("FileExplorer");

        aboutWindow = new BrowserWindow(params);
        aboutWindow.loadURL("file://" + __dirname + "/about.html");

        folder = new folder_view.Folder($("#files"));
        addressbar = new abar.AddressBar($("#addressbar"));

        folder.open(process.cwd());
        addressbar.set(process.cwd());


#### Code
        
具体代码实现如下：

    global.$ = $;

    const { remote } = require("electron");
    const { Menu, BrowserWindow, MenuItem, shell } = remote;

    var abar = require("address_bar");
    var folder_view = require("folder_view");

    // append default actions to menu for OSX
    var initMenu = function() {
        try {
            var nativeMenuBar = new Menu();
            if (process.platform == "darwin") {
                nativeMenuBar.createMacBuiltin &&
                    nativeMenuBar.createMacBuiltin("FileExplorer");
            }
        } catch (error) {
            console.error(error);
            setTimeout(function() {
                throw error;
            }, 1);
        }
    };

    var aboutWindow = null;
    var App = {
        // show "about" window
        about: function() {
            var params = {
                toolbar: false,
                resizable: false,
                show: true,
                height: 150,
                width: 400
            };
            aboutWindow = new BrowserWindow(params);
            aboutWindow.loadURL("file://" + __dirname + "/about.html");
        },

        // change folder for sidebar links
        cd: function(anchor) {
            anchor = $(anchor);

            $("#sidebar li").removeClass("active");
            $("#sidebar i").removeClass("icon-white");

            anchor.closest("li").addClass("active");
            anchor.find("i").addClass("icon-white");

            this.setPath(anchor.attr("nw-path"));
        },

        // set path for file explorer
        setPath: function(path) {
            if (path.indexOf("~") == 0) {
                path = path.replace("~", process.env["HOME"]);
            }
            this.folder.open(path);
            this.addressbar.set(path);
        }
    };

    $(document).ready(function() {
        initMenu();

        var folder = new folder_view.Folder($("#files"));
        var addressbar = new abar.AddressBar($("#addressbar"));

        folder.open(process.cwd());
        addressbar.set(process.cwd());

        App.folder = folder;
        App.addressbar = addressbar;

        folder.on("navigate", function(dir, mime) {
            if (mime.type == "folder") {
                addressbar.enter(mime);
            } else {
                shell.openItem(mime.path);
            }
        });

        addressbar.on("navigate", function(dir) {
            folder.open(dir);
        });

        // sidebar favorites
        $("[nw-path]").bind("click", function(event) {
            event.preventDefault();
            App.cd(this);
        });
    });




## 问题

* 如何禁用Chrome的快捷键，比如刷新、调起开发者工具等
* 如何使用tab打开新窗口


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

### nodec

todo: 编译成二进制文件

* `nodec` - node代码转换成二进制可执行文件 <https://github.com/pmq20/node-compiler> 支持windows/mac/linux平台，需要预装依赖软件，一些`应用场景`：知识产权保护、向非技术用户发布node应用、商业软件发布等



## APIs

### BrowserWindow

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




