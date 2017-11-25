# 代理工具



## HTTP代理

`HTTP代理如何为HTTPS连接提供代理服务？`

`HTTP代理`，提供网络代理服务，但不局限于HTTP协议的代理，HTTPS甚至FTP都可以使用HTTP代理。
`HTTPS`连接HTTP代理服务器使用的是`HTTP CONNECT`指令。实现提供HTTPS代理服务的HTTP代理只需在响应
CONNECT指令后，进行二进制的数据读取即可。

如果确实需要对HTTPS进行抓包，需要使用`伪证书`。



## squid

vps服务器：虚拟专享服务器

    http://www.squid-cache.org/Versions/v3/3.3/squid-3.3.13.tar.bz2

    http://www.squid-cache.org/Versions/v3/3.4/
    http://www.squid-cache.org/Versions/v3/3.4/squid-3.4.14-20160509-r13240.tar.bz2
    http://www.squid-cache.org/Versions/v3/3.4/cfgman/

    $ ./configure --help
    $ ./configure --prefix=/home/hudamin/softwares/squid
    $ make
    $ make install



## apache代理

## NProxy代理

还是蛮好用的，支持各类responder


## Fiddler代理

MacProxy代理

## Charles


