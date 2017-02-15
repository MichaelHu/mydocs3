# aria2

> The next generation download utility.

* 多平台支持，Mac, windows, android
* 命令行形式
* 支持HTTP/HTTPS, FTP, SFTP, BitTorrent, Metalink
* 支持`JSON-RPC`， `XML-RPC`接口
* github: <https://github.com/aria2/aria2>
* site: <https://aria2.github.io>
* MAC下的二进制可以自己从源码编译，也可以从一些基于aria2开发的开源项目中获取，比如`Aria2GUI`: <https://github.com/yangshun1029/aria2gui> ，点击<a href="./app/aria2c">这里下载</a>

## 特点

* 多链接下载
* 轻量
* 全支持BitTorrent
* Metalink
* RPC控制，比如可以通过`浏览器`使用`aria2.js`来控制下载。

## 使用

> 命令行使用方式

* Download from WEB:

        $ aria2c http://example.org/mylinux.iso

* Download from 2 sources:

        $ aria2c http://a/f.iso ftp://b/f.iso

* Download using 2 connections per host:

        $ aria2c -x2 http://a/f.iso

* BitTorrent:

        $ aria2c http://example.org/mylinux.torrent

* BitTorrent Magnet URI:

        $ aria2c 'magnet:?xt=urn:btih:248D0A1CD08284299DE78D5C1ED359BB46717D8C'

* Metalink:

        $ aria2c http://example.org/mylinux.metalink

* Download URIs found in text file:

        $ aria2c -i uris.txt


## 其他

### 第三方的UI封装

* `webui-aria2`: 浏览器界面
* `yaaw`: <https://github.com/binux/yaaw>，aria2的浏览器端控制界面
* uGet: <http://ugetdm.com>，Linux平台下的下载工具


### 相关项目

* apt-metalink
* powerpill
* puthon3-aria2jsonrc
* aria2.js: <https://github.com/sonnyp/aria2.js>，在浏览器或者nodejs环境中，通过RPC控制运行中的aria2
    

