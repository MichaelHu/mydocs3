# pcre

> Perl Compatible Regular Expressions

## Features

* 包含实现了与`Perl 5`正则同样语法的正则表达式匹配的一套函数集
* 它有自己的本地API，同时提供封装，以匹配`POSIX正则表达式`的API
* 作为`基础库`，被多个上层应用所使用，比如`php`, `nginx`等，php已经在源码包中集成，但nginx需要额外下载pcre源码包，它们都是`源码依赖`

## Resources

* PCRE site: <http://www.pcre.org>
* Download: <https://ftp.pcre.org/pub/pcre/>


## Versions

* `PCRE2`，最新版发布于2015年，版本为`10.30`
* `PCRE`，最早发布于1997年，版本号为`8.41`，是最为广泛使用的版本

## Installation

    $ curl -O https://ftp.pcre.org/pub/pcre/pcre2-10.30.tar.gz
    $ tar zxvf pcre2-10.30.tar.gz
    $ cd pcre2-10.30
    $ ./configure --help
    # `--prefix`需为绝对路径
    $ ./configure --prefix=/home/admin/soft/pcre2 --enable-jit
    $ make 
    $ make install


