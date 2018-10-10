# lua

> 一门小巧的脚本语言。

## Resources

* Site：<http://www.lua.org/home.html>
* Docs: <http://www.lua.org/manual/5.1/>
* baike: <http://baike.baidu.com/link?url=i6NZ-wTfUpm97SikRqab5VPDxrPt_MhXMTM5VXSCLyhv6lL-CKkhjlwTC81b_QGEW5DGEG_8PaLIhspJRgolb_>


## 简介

Lua[1]  是一个小巧的`脚本语言`。是巴西里约热内卢天主教大学（Pontifical Catholic University of Rio de Janeiro）里的一个研究小组，由Roberto Ierusalimschy、Waldemar Celes 和 Luiz Henrique de Figueiredo所组成并于1993年开发。 

其设计目的是为了`嵌入`应用程序中，从而为应用程序提供灵活的扩展和定制功能。Lua由标准C编写而成，几乎在所有操作系统和平台上都可以编译，运行。Lua并没有提供强大的库，这是由它的定位决定的。所以Lua不适合作为开发独立应用程序的语言。Lua 有一个同时进行的`JIT`项目，提供在特定平台上的即时编译功能。

Lua的目标是成为一个`很容易嵌入其它语言中使用的语言`。大多数程序员也认为它的确做到了这一点。
很多应用程序、游戏使用LUA作为自己的`嵌入式脚本语言`，以此来实现可配置性、可扩展性。这其中包括魔兽世界、博德之门、愤怒的小鸟、VOCALOID3、太阳神三国杀 等。


### 特点

* 轻量级
* 可扩展
* 其他特性


### 应用场景

* 游戏开发
* 独立应用脚本
* Web 应用脚本
* 扩展和数据库插件如：MySQL Proxy 和 MySQL WorkBench
* 安全系统，如入侵检测系统


## 安装

    curl -R -O http://www.lua.org/ftp/lua-5.3.3.tar.gz
    tar zxf lua-5.3.3.tar.gz
    cd lua-5.3.3
    # for linux
    make linux test
    # for mac
    make macosx test

    make install

`macos`默认安装在`/usr/local`下面，需要`sudo`执行。



## Hello World

新建文本文件，输入以下内容：

    print "Hello, World!"

保存为`hello-world.lua`，运行以下命令：

    lua hello-world.lua

输出：`Hello, World!`








