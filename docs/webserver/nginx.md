# nginx

> nginx [ engine x ] is an HTTP and reverse proxy server, a mail proxy server, and a generic TCP/UDP proxy server, originally written by `Igor Sysoev`.

## Features

* 俄罗斯人出品
* 不支持在命令行提供`端口`参数，多端口监听使用新开`虚拟主机`的方式

## Resources

* site: <http://nginx.org>
* docs: <http://nginx.org/en/docs/>
* 变量列表：<http://nginx.org/en/docs/varindex.html>
* 命令列表：<http://nginx.org/en/docs/dirindex.html>


## Installation

    # mac
    $ brew install nginx

    # CentOS，需要root权限，若无root权限，可选择源码安装
    $ yum install nginx


## Usage

    $ nginx -h
    nginx version: nginx/1.12.2
    Usage: nginx [-?hvVtTq] [-s signal] [-c filename] [-p prefix] [-g directives]

    Options:
      -?,-h         : this help
      -v            : show version and exit
      -V            : show version and configure options then exit
      -t            : test configuration and exit
      -T            : test configuration, dump it and exit
      -q            : suppress non-error messages during configuration testing
      -s signal     : send signal to a master process: stop, quit, reopen, reload
      -p prefix     : set prefix path (default: /usr/local/Cellar/nginx/1.12.2_1/)
      -c filename   : set configuration file (default: /usr/local/etc/nginx/nginx.conf)
      -g directives : set global directives out of configuration file

    # 通过`-p`传递nginx应用根路径
    $ nginx -p /usr/hudamin/softwares/nginx

    # 通过`-g`传递全局配置项
    $ nginx -g "pid /var/run/nginx.pid; worker_precesses `sysctl -n hw.ncpu`;"

    $ nginx -s <stop|quit|reload|reopen>
    $ kill -s QUIT <pid>


## Tips

* 配置命令必须以`;`结束，或者以`}`结束
* `多虚拟机`可通过获取请求头的`Host`字段，并基于`server_name`进行路由；如果不含该字段，或者该字段没有匹配到任何server，则会使用`listen <port> default_server;`的server，如果不存在，则使用第一个server。
* 所有类型( 精确匹配字符串、正则匹配字符串等 )的location测试，都`只测试pathname`部分，而不包含query string部分，原因在于query string部分有多种表达形式，因顺序、参数个数而异：
        /index.php?user=john&page=1
        /index.php?page=1&user=john
        /index.php?page=1&something+else&user=john
* `root`未配置情况下，默认未`root html;`，也就是默认nginx程序根目录下的`html`目录；
    `相对路径`配置的root，会接在程序根目录后；`绝对路径`配置的root，则不会以程序根目录作为前缀
* `error_log`是全局配置，`access_log`是server级别的配置
* 基于性能考虑，location匹配会先进行`非正则`的匹配，`不管其定义顺序`；非正则匹配不成功以后，才会`按定义顺序`进行`正则模式`匹配
* `location` 语法:

        location [ = | ~ | ~* | ^~ ] uri { ... }

    `语法说明`：

                prefix strings
        =       exact match prefix strings
        ^~      to find location matching a given request, nginx first checks
                locations defined using the prefix strings (prefix locations). Among
                them, the location with the longest matching prefix is selected and remembered.
                if the longest matching prefix location has the `^~` modifier
                , then regular expressions are not checked.
        ~       case-sensitive regular expression
        ~*      case-insensitive regular expression
        !~      no match case-sensitive regular expression
        !~*     no match case-insensitive regular expression

    `标准化URI`，location处理的uri是先经过以下处理，形成标准化URI后的：

    * 解码类似`%xx`格式的字符串
    * 解析包含`.`或`..`的相对路径
    * 压缩多个`/`（目录分隔符）
* 基于性能的考虑，会尽可能使用`精确匹配`，再使用`前缀匹配`，最后才考虑使用`正则匹配`
* `alias`将location uri映射成`本地获取路径`path
* `rewrite`是对uri进行修改 [ todo ] <http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#rewrite>
    * `rewrite`和`proxy_pass`同处于一个location下，若rewrite匹配，则`proxy_pass`将被忽略





## server

    server {
        listen 7080;
        server_name 192.168.1.100;
        keepalive_timeout 0;

        location ... { 
            ... 
        }

        ...
    }


## Reverse Proxy

> 反向代理：<https://www.nginx.com/resources/admin-guide/reverse-proxy/>

* 在`location`内部编写`指令`进行配置
* 常用指令：`proxy_pass`, `proxy_set_header`, `proxy_buffer`
* 使用到的一些概念的说明：

        URI     对应location.pathname部分，而不包含location.origin部分

* `location.*`可参考<ref://../frontend/bom.md.html>
* 其他指令：`fastcgi_pass, uwsgi_pass, scgi_pass, memcached_pass`



### 举例说明

    # 所有请求`/some/path/*`转发到`http://www.example.com/link/*`：
    location /some/path/ {
        proxy_pass http://www.example.com/link/;
    }

    # 所有`*.php`请求转发到`http://127.0.0.1:8000/*.php`
    location ~ \.php {
        proxy_pass http://127.0.0.1:8000;
    }

    # 所有请求转发到`http://127.0.0.1:8000/index.html`，适合`SPA push-state`方案
    location ~ / {
        proxy_pass http://127.0.0.1:8000/index.html;
    }



### proxy_pass规则

充分理解`proxy_pass`规则是反向代理的关键

1. location后面进行`URI匹配`，记`location`的URI参数为`URI-r`

        location URI {
            ...
        }

2. `proxy_pass`指令后面跟被代理服务器的地址(proxied server address)，可以是`域名方式`，也可以是`IP方式`，两者都可以包含端口。也就是对应`location.origin`的部分
3. 被代理服务器的地址还可以后跟URI，记`proxy_pass`里包含的URI参数为`URI-p`
        
        proxy_pass http://www.example.com/link/
                   |____________________||____|
                   proxied-server-address  URI      
                   
    注意，被代理`服务器地址`符合`location.origin`规则，它不包含`/`，URI总是以`/`开头，以下两个规则具有明显区别：

    # /api/123 => http://www.example.com/api/123
    location /api/ {
        proxy_pass http://www.example.com;
    }

    # /api/123 => http://www.example.com/123
    location /api/ {
        proxy_pass http://www.example.com/;
    }

4. 代理过程将`URI-r`替换成`URI-p`，再接到`location.origin`部分后面

        URI-r *
        => proxied-server-address URI-p *

    如果`URI-p`不存在或者无法确定，则替换规则为：

        URI-r *
        => proxied-server-address URI-r *

    如果`URI-p`是一个具体的资源，比如指向`/path/to/index.html`，则不做替换和拼接：

        URI-r *
        => proxied-server-address URI-p

上方规则属`临时整理`，尚未全部实地验证通过。


### proxy_set_header

    # 添加Host, X-Real-IP头信息
    location /some/path/ {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://localhost:8000;
    }


    # 不传递Accept-Encoding头信息，清空即可
    location /some/path/ {
        proxy_set_header Accept-Encoding "";
        proxy_pass http://localhost:8000;
    }






