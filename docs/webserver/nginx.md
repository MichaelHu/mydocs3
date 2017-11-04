# nginx

> nginx [engine x] is an HTTP and reverse proxy server, a mail proxy server, and a generic TCP/UDP proxy server, originally written by `Igor Sysoev`.

## Features

* 俄罗斯人出品

## Resources

* site: <http://nginx.org>
* docs: <http://nginx.org/en/docs/>


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

1. location后面进行URI匹配，记`location`的URI参数为`URI-r`

        location URI {
            ...
        }

2. `proxy_pass`指令后面跟被代理服务器的地址(proxied server address)，可以是`域名方式`，也可以是`IP方式`，两者都可以包含端口。也就是对应`location.origin`的部分
3. 被代理服务器的地址还可以后跟URI，记`proxy_pass`里包含的URI参数为`URI-p`
        
        proxy_pass http://www.example.com/link/
                   |____________________| |___|
                   proxied-server-address  URI      

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






