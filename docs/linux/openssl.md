# openssl

## Features

* 实现了`TLS`( Transport Layer Security )以及`SSL`( Secure Sockets Layer )协议
* 也是一个通用功能的`加密库`( general-purpose cryptography library )
* 使用`Apache-style`开源证书
* 更新比较活跃，作为一个基础库，被很多上层应用所依赖，比如使用`https`协议的程序


## Resources

* site: <https://www.openssl.org>
* `github`: <https://github.com/openssl/openssl> <iframe src="http://258i.com/gbtn.html?user=openssl&repo=openssl&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* download: <https://www.openssl.org/source/>


## Versions

* 1.1.0g 2017-11-02
* 1.0.2n 2017-12-07
* 1.0.1 
* 1.0.0
* 0.9.x


## Installation

    $ curl -O https://www.openssl.org/source/openssl-1.0.2n.tar.gz
    $ tar zxvf openssl-1.0.2n.tar.gz
    $ cd openssl-1.0.2n
    # INSTALL information
    $ vim INSTALL
    $ ./config --prefix=/home/admin/soft/openssl-1.0.2n zlib

* 使用`源码安装`时，安装帮助在`INSTALL`文件下，使用`./config`进行配置，而不是`./configure`
* `Linux`下安装的环境依赖：
    * make
    * Perl 5
    * an ANSI C compiler
    * a development environment in form of development libraries and C header files
    * a supported Unix operating system


