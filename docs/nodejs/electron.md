# electron

> The Electron framework lets you write `cross-platform desktop applications` using `JavaScript`, `HTML` and `CSS`. It is based on `Node.js` and `Chromium` and is used by the `Atom` editor and many other apps. <img src="./img/electron.png" style="border-radius: 5px; max-height: 30px;">



## Description

* 优秀编辑器`Atom`是使用`electron`的主要代表，还有MS的`Visual Studio Code`
* `electron-prebuild`是electron的核心产出
* `Microsoft`, `Facebook`, `Slack`, and `Docker`等公司都在使用



## Features

* 使用Electron，你建立的站点，都可以搬到桌面应用里
* 一处编写，跨平台部署。对于Windows系统来说，Electron不支持XP系统，将来也不会支持
* 同类应用`nwjs`，可以参考 <ref://./nwjs.md.html>



## Resources

* site：<http://electron.atom.io>
* github：<https://github.com/electron/electron> <iframe src="http://258i.com/gbtn.html?user=electron&repo=electron&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>  
* 文档：<http://electron.atom.io/docs/>
* 使用Electron构建的APP（有头有脸的`120+`）：<http://electron.atom.io/apps/>
* [ 180404 ] New in Electron 2: In-App Purchases <https://electronjs.org/blog/in-app-purchases>



## Tips

* 本质是一个`node应用`，node相关topic都适用
* `渲染进程`可以直接用Chromium的`开发者工具`；`主进程`可以用node的`--inspect`开启调试
* Electron不支持XP平台，将来也不会支持。若你的桌面应用必须要支持XP平台，那么或许可以选择`NW.js` <ref://./nwjs.md.html>





## Versions

> releases: <https://electron.atom.io/releases/>

### 4.x

    2018-10-19 4.0.0-beta.4
    ...
    2018-10-11 4.0.0-beta.1

### 3.x

    2018-10-19 3.0.5
    ...
    2018-09-19 3.0.0
    ...
    2018-06-21 3.0.0-beta.1

### 2.x

    2018-10-19 2.0.12
    ...
    ...
    2018-05-02 2.0.0

### 1.x

    2018-04-27 1.8.6 
    ...
    2017-10-10 1.7.9
    ...
    2016-05-09 1.0.0 
    ...
    2015-12-25 0.35.5




## Installation

    # latest version
    $ npm install --save-dev electron 
    $ ./node_modules/.bin/electron .

    # older versions
    $ npm install electron-prebuild -g



## Command Line Usage

    $ ./node_modules/.bin/electron --help
    $ ./node_modules/.bin/electron -v

    # run app
    $ ./node_modules/.bin/electron app/main.js

    # debugger mode
    $ ./node_modules/.bin/electron --inspect app/main.js






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



### mini-code-editor

#### Tips

* 使用`code-mirror`前端开源编辑器
* 使用了以下主要的electron APIs：

        remote.Menu
            menu = new Menu()
            menu.append()
            menu.popup()
        remote.MenuItem
        remote.dialog
        remote.dialog.showOpenDialog()
        remote.dialog.showSaveDialog()
        remote.getCurrentWindow()

        clipboard.writeText()
        clipboard.readText()


#### main code

    var newButton, openButton, saveButton;
    var editor;
    var menu;
    var fileEntry;
    var hasWriteAccess;

    const { remote, clipboard } = require("electron");
    const { Menu, MenuItem, dialog } = remote;
    const fs = require("fs");

    function handleDocumentChange(title) {
        var mode = "javascript";
        var modeName = "JavaScript";
        if (title) {
            title = title.match(/[^/]+$/)[0];
            document.getElementById("title").innerHTML = title;
            document.title = title;
            if (title.match(/.json$/)) {
                mode = { name: "javascript", json: true };
                modeName = "JavaScript (JSON)";
            } else if (title.match(/.html$/)) {
                mode = "htmlmixed";
                modeName = "HTML";
            } else if (title.match(/.css$/)) {
                mode = "css";
                modeName = "CSS";
            }
        } else {
            document.getElementById("title").innerHTML = "[no document loaded]";
        }
        editor.setOption("mode", mode);
        document.getElementById("mode").innerHTML = modeName;
    }

    function newFile() {
        fileEntry = null;
        hasWriteAccess = false;
        handleDocumentChange(null);
    }

    function setFile(theFileEntry, isWritable) {
        fileEntry = theFileEntry;
        hasWriteAccess = isWritable;
    }

    function readFileIntoEditor(theFileEntry) {
        fs.readFile(theFileEntry.toString(), function(err, data) {
            if (err) {
                console.log("Read failed: " + err);
            }

            handleDocumentChange(theFileEntry);
            editor.setValue(String(data));
        });
    }

    function writeEditorToFile(theFileEntry) {
        var str = editor.getValue();
        fs.writeFile(theFileEntry, editor.getValue(), function(err) {
            if (err) {
                console.log("Write failed: " + err);
                return;
            }

            handleDocumentChange(theFileEntry);
            console.log("Write completed.");
        });
    }

    var onChosenFileToOpen = function(theFileEntry) {
        console.log(theFileEntry);
        setFile(theFileEntry, false);
        readFileIntoEditor(theFileEntry);
    };

    var onChosenFileToSave = function(theFileEntry) {
        setFile(theFileEntry, true);
        writeEditorToFile(theFileEntry);
    };

    function handleNewButton() {
        if (false) {
            newFile();
            editor.setValue("");
        } else {
            window.open("file://" + __dirname + "/index.html");
        }
    }

    function handleOpenButton() {
        dialog.showOpenDialog({ properties: ["openFile"] }, function(filename) {
            onChosenFileToOpen(filename.toString());
        });
    }

    function handleSaveButton() {
        if (fileEntry && hasWriteAccess) {
            writeEditorToFile(fileEntry);
        } else {
            dialog.showSaveDialog(function(filename) {
                onChosenFileToSave(filename.toString(), true);
            });
        }
    }

    function initContextMenu() {
        menu = new Menu();
        menu.append(
            new MenuItem({
                label: "Copy",
                click: function() {
                    clipboard.writeText(editor.getSelection(), "copy");
                }
            })
        );
        menu.append(
            new MenuItem({
                label: "Cut",
                click: function() {
                    clipboard.writeText(editor.getSelection(), "copy");
                    editor.replaceSelection("");
                }
            })
        );
        menu.append(
            new MenuItem({
                label: "Paste",
                click: function() {
                    editor.replaceSelection(clipboard.readText("copy"));
                }
            })
        );

        window.addEventListener(
            "contextmenu",
            function(ev) {
                ev.preventDefault();
                menu.popup(remote.getCurrentWindow(), ev.x, ev.y);
            },
            false
        );
    }

    onload = function() {
        initContextMenu();

        newButton = document.getElementById("new");
        openButton = document.getElementById("open");
        saveButton = document.getElementById("save");

        newButton.addEventListener("click", handleNewButton);
        openButton.addEventListener("click", handleOpenButton);
        saveButton.addEventListener("click", handleSaveButton);

        editor = CodeMirror(document.getElementById("editor"), {
            mode: { name: "javascript", json: true },
            lineNumbers: true,
            theme: "lesser-dark",
            extraKeys: {
                "Cmd-S": function(instance) {
                    handleSaveButton();
                },
                "Ctrl-S": function(instance) {
                    handleSaveButton();
                }
            }
        });

        newFile();
        onresize();
    };

    onresize = function() {
        var container = document.getElementById("editor");
        var containerWidth = container.offsetWidth;
        var containerHeight = container.offsetHeight;

        var scrollerElement = editor.getScrollerElement();
        scrollerElement.style.width = containerWidth + "px";
        scrollerElement.style.height = containerHeight + "px";

        editor.refresh();
    };






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



## 应用打包

### Resources

* electron-packager <https://github.com/electron-userland/electron-packager> <iframe src="http://258i.com/gbtn.html?user=electron-userland&repo=electron-packager&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>


### electron-packager

    # build an app for windows target, if you are on mac os, wine 1.6 or later should be installed
    $ brew install wine

    $ ./node_modules/.bin/electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch> [optional flags...]

    # use package.json
    $ cd /path/to/app/source
    $ npm install electron-packager --save-dev
    
    # 生成windows平台32位版本 
    $ ./node_modules/.bin/electron-packager . --platform=win32 --arch=ia32

    # 生成windows平台64位版本 
    $ ./node_modules/.bin/electron-packager . --platform=win32 --arch=ia64


### electron-forge

### electron-builder

### asar

* 缓解Windows下路径名过长
* 略微加快一下require的速度
* 隐藏源代码


## 应用安装包

### windows-installer

> electron/windows-installer

#### Features

* 帮助跨平台地构建electron app的`windows安装包`
* 依赖`mono` <ref://../tools/mono.md.html>





### MAS发布相关

> `MAS` - Mac App Store

* Mac App Store 应用程序提交指南 <https://electronjs.org/docs/tutorial/mac-app-store-submission-guide>



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




