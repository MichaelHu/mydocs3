# 代理工具



## HTTP代理

`HTTP代理如何为HTTPS连接提供代理服务？`

`HTTP代理`，提供网络代理服务，但不局限于HTTP协议的代理，HTTPS甚至FTP都可以使用HTTP代理。
`HTTPS`连接HTTP代理服务器使用的是`HTTP CONNECT`指令。实现提供HTTPS代理服务的HTTP代理只需在响应
CONNECT指令后，进行二进制的数据读取即可。

如果确实需要对HTTPS进行抓包，需要使用`伪证书`。

浏览器使用代理服务器以后，会修改`Connection`为`Proxy-Connection`：
<https://www.cnblogs.com/softidea/p/5705939.html> `Proxy-Connection` header




### Linux配置上网代理

<https://www.cnblogs.com/lhwblog/p/6695502.html>

Linux、Mac命令行都支持一下配置：

    http_proxy=proxy.abc.com:8080  
    https_proxy=$http_proxy  
    ftp_proxy=user:password@proxy.abc.com:8080  
    no_proxy=*.abc.com,10.*.*.*,192.168.*.*,*.local,localhost,127.0.0.1  
    export http_proxy https_proxy ftp_proxy no_proxy



## squid

* 在vps服务器（虚拟专享服务器）上搭建squid代理服务器，是比较简单的

    * RedHat非企业版可以直接源码安装：
            $ wget http://www.squid-cache.org/Versions/v3/3.3/squid-3.3.13.tar.bz2
            $ tar xjf squid-3.3.13 && cd squid-3.3.13
            $ ./configure --help
            $ ./configure --prefix=/home/hudamin/softwares/squid
            $ make
            $ make install
    * CentOS可以直接yum安装： 
            $ su
            # yum install squid

* 使用：

        $ vim /etc/squid/squid.conf
            # 可能作以下配置
            http_access allow all
            http_port 8000
        $ squid -N

    `Tips`:

    * `-a port`：该选项不能覆盖`squid.conf`里的`http_port`配置
    * `-N`：避免使用伺服器模式，运行在前台

* 通过在国外服务器搭建代理服务器，提供国内机器翻墙，目前这种方式已经`行不通`了。只要通过代理服务器访问敏感站点，立马被抢，同时该代理连接也受影响，即使你转而访问非墙站点，连接稳定性也大打折扣。基本上需要过一段时间（几分钟）后才能恢复正常

* 目前靠谱的方法，只能是`小众的`vpn了，相比市场价，自己搭建成本更高，不建议自己搭建了


## apache代理

## NProxy代理

还是蛮好用的，支持各类responder


## Fiddler代理

MacProxy代理

## Charles


