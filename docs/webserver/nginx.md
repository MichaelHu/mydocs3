# nginx

> <img src="./img/nginx-180113.png" style="height: 20px;"> [ `engine x` ] is an HTTP and reverse proxy server, a mail proxy server, and a generic TCP/UDP proxy server, originally written by `Igor Sysoev`.

## Features

* 俄罗斯人出品
* 支持`HTTP`以及`反向代理`服务器
* 支持`邮件代理`服务器
* 通用`TCP/UDP代理`服务器
* 不支持在命令行提供`端口`参数，多端口监听使用新开`虚拟主机`的方式
* 支持`WebSocket`代理


## Resources

* site: <http://nginx.org>
* nginx blog: <https://www.nginx.com/blog/>
* docs: <http://nginx.org/en/docs/>
* `指令`列表：<http://nginx.org/en/docs/dirindex.html>
* `变量`列表：<http://nginx.org/en/docs/varindex.html>
* pcre - <ref://../linux/pcre.md.html>
* openssl - <ref://../linux/openssl.md.html>


## Installation

    # mac
    $ brew install nginx

    # CentOS，需要root权限，若无root权限，可选择源码安装
    $ yum install nginx

    # install by source
    $ curl -O http://nginx.org/download/nginx-1.13.8.tar.gz
    $ tar zxvf nginx-1.13.8.tar.gz
    $ cd nginx-1.13.8
    $ ./configure --help
    $ ./configure --prefix=/home/admin/soft/nginx-1.13.8 \
            --with-file-aio \
            --with-http_ssl_module \
            --with-http_v2_module \
            --with-http_realip_module \
            --with-http_addition_module \
            --with-pcre=/home/admin/download/pcre-8.41 \
            --with-openssl=/home/admin/download/openssl-1.0.2n \
            --with-debug \
            --with-http_dav_module

* 源码安装，依赖一些`基础库`，比如`pcre` <ref://../linux/pcre.md.html>
* 如果需要启用`https`支持，则需要依赖`openssl` <ref://../linux/openssl.md.html>
*  `pcre`和`openssl`等依赖，都是`源码依赖`，而不是依赖已经安装好的pcre和openssl，也就是在`--with-pcre`和`--with-openssl`选项后面提供相关依赖的`源码路径`即可，而不是提供安装以后的路径
* 不能依赖太新的版本，比如`pcre2`在`nginx1.13`上不支持
* 涉及`路径选项`，都使用`绝对路径`，避免走不必要的弯路
* 本次成功安装的`源码包组合`为：

        nginx-1.13.8.tar.gz  
            openssl-1.0.2n.tar.gz  
            pcre-8.41.tar.gz


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
                    stop    - shut down quickly
                    quit    - shut down gracefully
                    reload  - reload configuration, start the new worker process with a new
                              configuration, gracefully shut down old work processes
                    reopen  - reopen log files
      -p prefix     : set prefix path (default: /usr/local/Cellar/nginx/1.12.2_1/)
      -c filename   : set configuration file (default: /usr/local/etc/nginx/nginx.conf)
      -g directives : set global directives out of configuration file

    # 通过`-p`传递nginx应用根路径
    $ nginx -p /usr/hudamin/softwares/nginx

    # 通过`-g`传递全局配置项
    $ nginx -g "pid /var/run/nginx.pid; worker_precesses `sysctl -n hw.ncpu`;"

    $ nginx -s <stop|quit|reload|reopen>
    $ kill -s QUIT <pid>


## nginx.conf

配置文件`大体框架`如下：

    # main part
    ...
    # events part
    events {
        ...
    }
    # http part
    http {
        include ...;
        server {
            listen 8080;
            server_name localhost;
            location /apollo/ {
                alias /Users/hudamin/projects/git/hugeapp-apollo/dist/;
            }
            ...
        }
        ...
    }



## Tips

* 配置命令必须以`;`结束，或者以`}`结束；若`正则表达式`包含它们，需要用`单引号`或`双引号`包围；注释使用`#`
* `多虚拟机`可通过获取请求头的`Host`字段，并基于`server_name`进行路由；如果不含该字段，或者该字段没有匹配到任何server，则会使用`listen <port> default_server;`的server，如果不存在，则使用第一个server。

* 可以多个虚拟机，监听`同一端口`，使用`不同server_name`进行路由

* `error_log`是全局配置，`access_log`是server级别的配置

* 基于性能考虑，location匹配会先进行`非正则`的匹配，`不管其定义顺序`；非正则匹配不成功以后，才会`按定义顺序`进行`正则模式`匹配

* `root`与`alias`的路径处理都按`append`方式进行；`alias`往本地映射，`proxy_pass`是往远程映射；但`alias`只支持`同类型`映射，目录到目录，文件到文件的映射，而`proxy_pass`可将目录映射至具体文件

* `root`未配置情况下，默认为`root html;`，也就是默认nginx程序根目录下的`html`目录；
    `相对路径`配置的root，会接在程序根目录后；`绝对路径`配置的root，则不会以程序根目录作为前缀

* `rewrite`是对uri进行修改，文档参考 <http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#rewrite>
    * `rewrite`和`proxy_pass`同处于一个location下，若rewrite匹配，则`proxy_pass`将被忽略
    * `rewrite`至`本地地址`，默认`不作重定向`，除非设置redirect或permanent flag；rewrite至`远程地址`，会进行重定向

*  `proxy_pass`配置时，需要注意location uri与proxed uri`尾部保持一致`，除非所有请求都导向一个具体文件：

        # /api/login => http://172.22.1.102/login
        location /api/ {
            proxy_pass http://172.22.1.102/;
        }

        # /api/login => http://172.22.1.102//login
        location /api {
            proxy_pass http://172.22.1.102/;
        }

    以上第二种情况，会导致proxyed uri多了一个`/`，这种uri会导致请求失败。当然，也有这种需求，希望某个模式的请求，都返回某个页面，比如：

        # /abc/ => http://127.0.0.1:8000/index.html
        # /abc/dfdf => http://127.0.0.1:8000/index.html
        location /abc/ {
            proxy_pass http://127.0.0.1:8000/index.html;
        }

* 配置一个使用`Push-State-History`特性的SPA，通常有以下方法：

        # 1. 使用try_files指令
        location ~^/favicon\.ico {
        }
        location / {
            try_files $uri $uri/ /index.html;
        }

        # 2. 使用rewrite方式，需要多步
        location ~* \.(html|js|css|png|jpe?g|gif|ttf|woff2?|eot|svg|ico)$ {
        }
        location / {
            rewrite ^.*$ / break;
            index index.html;
        }





## Alias

`alias`指令将location uri映射成`本地获取路径`，以类似`proxy_pass`的方式进行路径替换：

### Syntax

    alias path;

* 只在`location`指令内部出现，其path部分可使用变量，除了`$document_root`, `$realpath_root`不能用
* `root`与`alias`的路径处理都按`append`方式进行，也就是匹配的URI会拼接到root或alias指定的路径后面，需要注意`同类型`映射
* `alias`往本地映射，`proxy_pass`是往远程映射；但`alias`只支持`同类型`映射，目录到目录，文件到文件的映射，而`proxy_pass`可将目录映射至具体文件
* `alias`主要作用是改变`本地资源查找的路径`


### Examples

    server {
        ...
        location /apollo {
            alias /data/dist;
        }
        ...
    }

例子：

    /apollo => /data/dist 
    /apollo/index.html => /data/dist/index.html



## Location

`location`指令对标准化后的URI进行匹配，由其内部的指令进行后续的处理。

### Syntax

    location [ = | ~ | ~* | ^~ ] uri { ... }
    location @name { ... }

* 能出现在`server`和`location`指令内部，也即支持`location嵌套`
* `匹配语法`支持多种类型，`语法说明`如下：

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

    其中，`^~`后跟的表达式并不是正则，而是prefix strings，它的含义是如果后方的匹配串是当前最长前缀匹配串，那么就不启动正则匹配了。
* 使用过程中，发现`^~`的以下用法会导致服务器`502`错误：

        # error: 502
        location ^~ / {
            rewrite ^.*$ / break;
        }

    原因在于location内部使用了rewrite指令，而以下用法是可以的：

        # ok
        location ^~ / {
            root /path/to/docroot;
            index index.html;
        }


### 标准化URI

`normalized URI`，location处理的uri是`标准化URI`，原始URI先经过以下处理，才形成标准化URI：

* 解码类似`%xx`格式的字符串
* 解析包含`.`或`..`的相对路径
* 压缩多个`/`（目录分隔符）


### 路径匹配

* 所有类型( 精确匹配字符串、正则匹配字符串等 )的location测试，都`只测试pathname`部分，而不包含query string部分，原因在于query string部分有多种表达形式，因顺序、参数个数而异：
        /index.php?user=john&page=1
        /index.php?page=1&user=john
        /index.php?page=1&something+else&user=john
*  基于`性能`的考虑，匹配过程先使用`精确匹配`，再使用`前缀匹配`，最后才考虑使用`正则匹配`，如果前缀匹配中的最长匹配前面使用了`^~`，则将不使用正则匹配



## TryFiles

    try_files file ... uri;
    try_files file ... =code;


### Examples

    location /images/ {
        try_files $uri /images/default.gif;
    }

    location = /images/default.gif {
        expires 30s;
    }




## Rewrite

`rewrite`指令对`URI`进行`正则匹配`和`更改`

### Syntax

    rewrite regex replacement [flag];
    rewrite_log on | off;
    server_name_in_redirect on | off;
    port_in_redirect on | off;

* 能出现在`server, location, if`指令内部
* `rewrite`指令按其在配置文件中出现的顺序，`顺次执行`
* 有`两种`方式可以`停止顺次执行链`，一种为`[flag]`参数，一种为特殊前缀的`replacement`字段，如下条说明。
* 如果`replacement`为`http://`, `https://`或`$scheme`，则停止执行链，直接进行重定向
* 如果`replacement`为本地地址，默认情况下为`服务器重写`，而不需要客户端重定向
* `flag`参数的可选值：

        last        停止当前rewrite执行链，开始进行新的location匹配    
        break       同`break`指令
        redirect    使用302重定向对新地址进行处理，可支持本地地址修改后并重定向
        permanent   使用301重定向对新地址进行处理，可支持本地地址修改后并重定向

* 以下配置：

        server {
            ...
            rewrite ^(/download/.*)/media/(.*)\..*$ $1/mp3/$2.mp3 last;
            rewrite ^(/download/.*)/audio/(.*)\..*$ $1/mp3/$2.ra  last;
            return  403;
            ...
        }

    如果是在`location`指令内，则`last`需要替换成`break`：

        location /download/ {
            rewrite ^(/download/.*)/media/(.*)\..*$ $1/mp3/$2.mp3 break;
            rewrite ^(/download/.*)/audio/(.*)\..*$ $1/mp3/$2.ra  break;
            return  403;
        }

* `replacement`中，可以通过在`末尾`添加`?`来阻止将原始请求的参数跟在最后面

        rewrite ^/users/(.*)$ /show?user=$1? last;

* 如果正则表达式中包含`}`或者`;`，则整个正则表达式都需要用`单引号`或者`双引号`包围




## Reverse Proxy

> 反向代理：<https://www.nginx.com/resources/admin-guide/reverse-proxy/>

### Tips

* 支持的Context：`location`, `if in location`, `limit_except`
* 常用指令：`proxy_pass`, `proxy_set_header`, `proxy_buffer`
* 使用到的一些概念的说明：

        URI     对应location.pathname部分，而不包含location.origin部分

* `location.*`可参考<ref://../frontend/bom.md.html>
* 其他指令：`fastcgi_pass, uwsgi_pass, scgi_pass, memcached_pass`
* `错误`信息： 

        nginx: [emerg] "proxy_pass" cannot have URI part in location given by regular 
        expression, or inside named location, or inside "if" statement, or 
        inside "limit_except" block
        
     若使用正则匹配，那么`proxy_pass`配置的path部分`不能包含URI`，比如以下配置是`错误`的：

        # error config
        location ~ / {
            proxy_pass http://127.0.0.1:8000/index.html;
        }

    因为proxy_pass的path部分包含了URI: `/index.html`，所以是错误的。这一限制可以理解为：使用正则匹配的proxy_pass在路径处理时，`只允许`使用`append方式`。另外，虽然不能包含URI，但可以接`变量`：

        location ~ / {
            proxy_pass http://127.0.0.1:8000/$request_uri;
        }

    不过这个的作用与下方是等价的，下方的性能还更好：

        location / {
            proxy_pass http://127.0.0.1:8000/;
        }



### Examples

    # 所有请求`/some/path/*`转发到`http://www.example.com/link/*`：
    location /some/path/ {
        proxy_pass http://www.example.com/link/;
    }

    # 所有`*.php`请求转发到`http://127.0.0.1:8000/*.php`
    location ~ \.php {
        proxy_pass http://127.0.0.1:8000;
    }

    # 所有`/api/*`的请求都转发到`http://172.22.1.102/*`
    location /api/ {
        proxy_pass http://172.22.1.102/;
    }




### proxy_pass规则

充分理解`proxy_pass`规则是反向代理的关键

1. location后面进行`URI匹配`，记`location`的URI参数为`URI-p` ( URI pattern )

        location URI {
            ...
        }

2. `proxy_pass`指令后面跟的被代理服务器地址( proxied server address )，可以是`域名方式`，也可以是`IP方式`，两者都可以包含端口。也就是对应`location.origin`的部分
3. 被代理服务器的地址还可以`后跟URI`，记`proxy_pass`里包含的URI参数为`URI-r` ( URI replacement )
        
        proxy_pass http://www.example.com/link/
                   |____________________||____|
                   proxied-server-address  URI      
                   
4. 代理过程将`URI-r`替换成`URI-p`，再接到`location.origin`部分后面

        URI-p *
        => proxied-server-address URI-r *

    如果`URI-p`不存在或者无法确定，则替换规则为：

        URI-p *
        => proxied-server-address URI-r *

    如果`URI-r`是一个具体的资源，比如指向`/path/to/index.html`，则不做替换和拼接：

        URI-p *
        => proxied-server-address URI-r

    注意，被代理`服务器地址`符合`location.origin`规则，它不包含`/`，URI总是以`/`开头，以下两个规则具有明显区别：

        # /api/123 => http://www.example.com/api/123
        location /api/ {
            proxy_pass http://www.example.com;
        }

        # /api/123 => http://www.example.com/123
        location /api/ {
            proxy_pass http://www.example.com/;
        }


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


## Listen

设置监听地址、监听端口、协议等。

### Syntax

    listen address[:port] [default_server] [ssl] [http2 | spdy] [proxy_protocol] [setfib=number] [fastopen=number] [backlog=number] [rcvbuf=size] [sndbuf=size] [accept_filter=filter] [deferred] [bind] [ipv6only=on|off] [reuseport] [so_keepalive=on|off|[keepidle]:[keepintvl]:[keepcnt]];
    listen port [default_server] [ssl] [http2 | spdy] [proxy_protocol] [setfib=number] [fastopen=number] [backlog=number] [rcvbuf=size] [sndbuf=size] [accept_filter=filter] [deferred] [bind] [ipv6only=on|off] [reuseport] [so_keepalive=on|off|[keepidle]:[keepintvl]:[keepcnt]];
    listen unix:path [default_server] [ssl] [http2 | spdy] [proxy_protocol] [backlog=number] [rcvbuf=size] [sndbuf=size] [accept_filter=filter] [deferred] [bind] [so_keepalive=on|off|[keepidle]:[keepintvl]:[keepcnt]];




## If

`if`指令进行条件判断

### Syntax

    if ( condition ) { ... }

### Examples

    if ( $http_user_agent ~ MSIE ) {
        rewrite ^(.*)$ /msie/$1 break;
    }

    if ( $http_cookie ~* "id=([^;]+)(?:;|$)" ) {
        set $id $1;
    }

    if ( $request_method = POST ) {
        return 405;
    }

    if ( $slow ) {
        limit_rate 10k;
    }

    if ( $invalid_referer ) {
        return 403;
    }


## Return

停止处理，并将指定状态码返回给客户端。

### Syntax

    return code [text];
    return code URL;
    return URL;


## Set

### Syntax

    set $variable value;

* Context：`server, location, if`

todo



## Other

### Etag

    etag on | off;
    
* Default: `etag on;`
* Context: `http, server, location`

### Expires

通过`expires`指令，添加或者修改`Expires`、`Cache-Control`响应头。

    expires [modified] time;
    expires epoch | max | off;

* Default: `expires off;`
* Context: `http, server, location, if in location`
* 作用于状态码：`200, 201( 1.3.10 ), 204, 206, 301, 302, 304, 307( 1.1.16, 1.0.13 ), or 308( 1.13.0 )` 
* `time`可为正值也可为负值

        # Expires = current + time
        expires 60s;            Cache-Control: max-age=60
                                Expires: current + 60s
        expires 90m;
        expires -30m;           Cache-Control: no-cache
                                Expires: current - 30m

        # Expires = file modified time + time
        expires modified 30m;

        # Expires = time of day, using `@` prefix
        expires @15h30m;

* 设置`绝对时间`，使用`epoch`或`max`参数

        expires epoch;          Cache-Control: no-cache
                                Expires: Thu, 01 Jan 1970 00:00:01 GMT
        expires max;            Cache-Control: max-age=315360000 
                                Expires: Thu, 31 Dec 2037 23:55:55 GMT

* 设置`off`，避免增加或者修改`Expires`、`Cache-Control`响应头
* expires可以`后跟变量`，如下例子：

        map $sent_http_content_type $expires {
            default         off;
            application/pdf 42d;
            ~image/         max;
        }

        expires $expires;

* `location`内，如果`rewrite`命中，对应的expires设置将被`忽略`：

        location /abc {
            expires epoch;
            rewrite ^\/abc(.*) /apollo$1;
        }



### Addition

> module: `ngx_http_addition_module`

    add_before_body uri;
    add_after_body uri;
    addition_types mime-type ...;

    location / {
        add_before_body /before_action;
        add_after_body /after_body;
    }


        

## Headers

    add_header name value [always];

    auth_http_header
    auth_jwt_header_set
    client_header_buffer_size
    client_header_timeout
    fastcgi_hide_header
    fastcgi_ignore_headers
    fastcgi_pass_header
    fastcgi_pass_request_headers
    http2_max_header_size
    ignore_invalid_headers
    large_client_header_buffers
    proxy_headers_hash_bucket_size
    proxy_headers_hash_max_size
    proxy_hide_header
    proxy_ignore_headers

    proxy_pass_header field;
    proxy_pass_request_headers on | off;
    proxy_set_header field value;

    real_ip_header field | X-Real-IP | X-Forwarded-For | proxy_protocol;

    scgi_hide_header
    scgi_ignore_header
    scgi_pass_header
    scgi_pass_request_headers
    spdy_headers_comp
    underscores_in_headers
    uwsgi_hide_header
    uwsgi_ignore_headers
    uwsgi_pass_header
    uwsgi_pass_request_headers
    
        




## WebSocket Proxy

参考：<http://nginx.org/en/docs/http/websocket.html>

例子1:

    location /chat/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

例子2:

    http {

        map $http_upgrade $connection_upgrade {
            default upgrade;
            ''      close;
        }

        server {
            ...

            location /chat/ {
                proxy_pass http://backend;
                proxy_http_version 1.1;
                proxy_set_header Host $http_host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_connect_timeout 60s;
                proxy_read_timeout 1200s;
                proxy_send_timeout 1200s;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection $connection_upgrade;
            }
        }

    }



## FastCGI

    location / {
        fastcgi_pass  localhost:9000;
        fastcgi_index index.php;

        fastcgi_param SCRIPT_FILENAME /home/www/scripts/php$fastcgi_script_name;
        fastcgi_param QUERY_STRING    $query_string;
        fastcgi_param REQUEST_METHOD  $request_method;
        fastcgi_param CONTENT_TYPE    $content_type;
        fastcgi_param CONTENT_LENGTH  $content_length;
    }




## Variables

    $request                    full original request file
    $request_ 
        body
        body_file               name of a temporary file with the request body
        completion
        filename
        id
        length
        method
        time
        uri                     full original request URI ( with arguments )
    $sent_http_
        content_type
        cache_control
        ...

    ...
    $uri                        current URI in request, normalized

* 以`$`开头




## Modules

### ngx_http_proxy_module

    proxy_bind
    proxy_buffer_size
    proxy_buffering
    proxy_buffers
    proxy_busy_buffers_size
    proxy_cache
    proxy_cache_background_update
    proxy_cache_bypass
    proxy_cache_convert_head
    proxy_cache_key
    proxy_cache_lock
    proxy_cache_lock_age
    proxy_cache_lock_timeout
    proxy_cache_max_range_offset
    proxy_cache_methods
    proxy_cache_min_uses
    proxy_cache_path
    proxy_cache_purge
    proxy_cache_revalidate
    proxy_cache_use_state
    proxy_connect_timeout
    proxy_cookie_domain
    proxy_cookie_path
    proxy_force_ranges
    proxy_headers_hash_bucket_size
    proxy_headers_hash_max_size
    proxy_hide_header
    proxy_http_version
    proxy_ignore_client_abort
    proxy_ignore_headers
    proxy_intercept_errors
    proxy_limit_rate
    proxy_max_temp_file_size
    proxy_method
    proxy_next_upstream
    proxy_next_upstream_timeout
    proxy_next_upstream_tries
    proxy_no_cache
    proxy_pass
    proxy_pass_header
    proxy_pass_request_body
    proxy_pass_request_headers
    proxy_read_timeout
    proxy_redirect
    proxy_request_buffering
    proxy_send_lowat
    proxy_send_timeout
    proxy_set_body
    proxy_set_header
    proxy_ssl_certificate
    proxy_ssl_certificate_key
    proxy_ssl_ciphers
    proxy_ssl_crl
    proxy_ssl_name
    proxy_ssl_password_file
    proxy_ssl_server_name
    proxy_ssl_session_reuse
    proxy_ssl_protocols
    proxy_ssl_trusted_certificate
    proxy_ssl_verify
    proxy_ssl_verify_depth
    proxy_store
    proxy_store_access
    proxy_temp_file_write_size
    proxy_temp_path


### ngx_http_fastcgi_module

    fastcgi_bind
    fastcgi_buffer_size
    fastcgi_buffering
    fastcgi_buffers
    fastcgi_busy_buffers_size
    fastcgi_cache
    fastcgi_cache_background_update
    fastcgi_cache_bypass
    fastcgi_cache_key
    fastcgi_cache_lock
    fastcgi_cache_lock_age
    fastcgi_cache_lock_timeout
    fastcgi_cache_max_range_offset
    fastcgi_cache_methods
    fastcgi_cache_min_uses
    fastcgi_cache_path
    fastcgi_cache_purge
    fastcgi_cache_revalidate
    fastcgi_cache_use_stale
    fastcgi_cache_valid
    fastcgi_catch_stderr
    fastcgi_connect_timeout
    fastcgi_force_ranges
    fastcgi_hide_header
    fastcgi_ignore_client_abort
    fastcgi_ignore_headers
    fastcgi_index
    fastcgi_intercept_errors
    fastcgi_keep_conn
    fastcgi_limit_rate
    fastcgi_max_temp_file_size
    fastcgi_next_upstream
    fastcgi_next_upstream_timeout
    fastcgi_next_upstream_tries
    fastcgi_no_cache
    fastcgi_param
    fastcgi_pass
    fastcgi_pass_header
    fastcgi_pass_request_body
    fastcgi_pass_request_headers
    fastcgi_read_timeout
    fastcgi_request_buffering
    fastcgi_send_lowat
    fastcgi_send_timeout
    fastcgi_split_path_info
    fastcgi_store
    fastcgi_store_access
    fastcgi_temp_file_write_size
    fastcgi_temp_path


### ngx_http_spdy_module

    spdy_chunk_size
    spdy_headers_comp
