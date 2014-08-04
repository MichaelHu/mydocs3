# 提供简单CGI功能的自制Web Server

## 前言

在本地做AJAX应用时，由于`Cross-Domain的限制`，需要将请求内容放在某个Web服务器下，通过HTTP请求来访问。

通常的做法：安装Web Server，`Apache、Lighttpd或Nginx`等服务器，配置htdocs，然后restart。这些方法都能满足需求。

但是，有这样一些情况：
1. 在家中开发，需要请求服务器数据，但是服务器在公司网络
2. 在火车上赶项目，没有网络
这时，如何模拟AJAX请求呢？

当然，可以直接将数据请求并事先保存成文件，放在本地服务器。

不过，`假如数据很复杂，或者数据需要更多的变化以体现真实数据，又或者需要几十套数据`。
那么模拟过程就比较麻烦了。哈哈，对于工程师来说，这些任务不应该是手动的，而应该交给程序来`自动化`完成。

## MC WebServer
这是一个`试验性`的作品，仅供个人用于研究HTTP Web Server的原理，同时增加一些特色小功能，经过封装以后，可以用于辅助前端开发。

她有以下一些特点：
* `轻量`
* `单个`可执行文件，不需安装包
* 随意目录可设置
* 支持`CGI输出缓存`，可以支持脚本语言PHP
* 目前只支持`Linux/Mac`系统
* 目前主要支持简单的资源类型：
    1. text/html
    1. image/jpeg
    1. image/gif
    1. image/png
    1. text/css
    1. text/javascript
    1. audio/basic
    1. audio/wav
    1. video/x-msvideo
    1. video/mpeg
    1. audio/mpeg
    1. application/vnd.android.package-archive
    1. 默认为：text/plain

## FORK ME ON GITHUB
`https://github.com/MichaelHu/capp/tree/master/src/mcwebserver`

## 使用方式
Mac或Linux下：
1. 安装`GCC环境`，MAC需要安装XCode，Linux如果没有的话，Google一下
2. 下载源码，make，获得webserver.out输出文件
        git clone https://github.com/MichaelHu/capp
        cd src/mcwebserver
        make
3. 部署该文件，比如最简单的：
        mv webserver.out ~/bin/webserver
        chmod +x ~/bin/webserver
4. 使用，最简单的方式为将任意一个目录变为htdocs：
        webserver /some/dir 8000

## 高级使用方式
确保本地安装了php-cgi，然后将请求映射到某个php文件，该文件的作用为请求远程内容，并返回。

    export PHP_CGI=/usr/bin/php-cgi
    webserver /some/dir 8900 debug

这时，请求的结果将会被缓存，当第二次发起同样的请求时，不再需要向远程发送请求。
所以，只需要在网络好的时候做一次请求，如果有多种数据，也都请求一遍，web server自动将请求内容缓存住，
那么当你的电脑不能连接网络时，仍然可以使用这些数据。

## Web Server原理
待续
