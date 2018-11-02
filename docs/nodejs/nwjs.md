# nwjs

> `nw`: node-webkit


## Features 

* 支持使用Web技术编写`跨平台`桌面应用，支持Windows( XP, Vista, Win7, ... )、macOS、Linux
* 可在DOM环境下调用Nodejs API
* 支持打包成各平台的应用包或可执行程序
* 新的同类应用`electron` <ref://./electron.md.html>
* electron不支持XP平台，nwjs支持 

## Resources

* github: <https://github.com/nwjs/nw.js> <iframe src="http://258i.com/gbtn.html?user=nwjs&repo=nw.js&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* `Package and Distribute` - 打包及发布: 
    * `v0.13.x及以上`: <http://docs.nwjs.io/en/latest/For%20Users/Package%20and%20Distribute/>
    * `v0.13.0以下`: <https://github.com/nwjs/nw.js/wiki/How-to-package-and-distribute-your-apps>


## Tips

* `0.13.x`版本，是支持XP的最后一个版本，也是一个`分水岭`的版本。0.13.x及以后的版本，与更低的版本有不同的文档地址，需要区分查看文档
* Your profile cannot be used because it is from a newer version of NW.js some features may be unavailable <https://github.com/nwjs/nw.js/issues/6188>



## Versions

### All Builds

* latest nightly build: <https://dl.nwjs.io/live-build/>
* all builds: <https://dl.nwjs.io>

### Verion Lists

    version         node        chromium
    ==============================================
    v0.34.x
    ...
    v0.13.4         5.10.0      49.0.2623.112
    ...
    v0.10.x
    v0.9.x
    v0.8.x



## Install & Run

### 下载各平台安装包

* 下载地址：<https://dl.nwjs.io>
* 下载对应平台的版本，并在包含`package.json`的目录下运行nw命令
        $ nw .


### npm cli方式

    $ npm install --save-dev nwjs
    $ ./node_modules/.bin/nw ls
    $ ./node_modules/.bin/nw install 0.13.4
    $ ./node_modules/.bin/nw .




## Debugging

* Open Developer Tools
* Node.js Modules Debugging
* Remote Debugging
        $ nw --remote-debugging-port=9222
        $ open http://localhost:9222
* Using devtools extensions




## Create Package

### nwjs-builder-phoenix

> 推荐的方式

* 新引入的方式，参考electron的方式，也是`推荐`的方式
* `nwjs-builder-phoenix`: <https://github.com/evshiron/nwjs-builder-phoenix>
* 支持Chrome App，Auto Updater，Icon配置等
* 支持`命令行`或`编程`方式构建
* 通过`wine` ( <ref://../tools/wine.md.html> ) 和`mono` ( <ref://../tools/mono.md.html> ) 等跨平台工具链，支持`跨平台构建`，比如在Mac上构建适用于windows/linux平台的应用包
* 安装：
        $ npm install nwjs-builder-phoenix --save-dev
* 命令行构建：
        $ ./node_modules/.bin/build --tasks win-x32,win-x64,mac-x64 .




### nw-builder

> 不推荐

* nw-builder: <https://github.com/nwjs-community/nw-builder>
* 支持`命令行`或`编程`的方式构建nw应用程序包
* 是一个npm包
* 安装：
        $ npm install nw-builder --save-dev
* 命令行构建：
        $ ./node_modules/.bin/nwbuild -p win32 -o dist .
* 该工具输出的应用包`尺寸过大`，可能是没有prune的功能



详见`package and distribute` your apps: <https://github.com/nwjs/nw.js/wiki/How-to-package-and-distribute-your-apps>

Enigma Virtual Box <https://enigmaprotector.com/en/aboutvb.html>


