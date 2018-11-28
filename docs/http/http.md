# HTTP


## Resources

* HTTP状态码：<https://baike.baidu.com/item/HTTP状态码/5053660>
* nginx: <ref://../webserver/nginx.md.html>


## HTTP

`RFC2616`: <a href="./txt/rfc2616.txt">Hypertext Transfer Protocol -- HTTP/1.1</a>

* 13.3.4 Rules for When to Use Entity Tags and Last-Modified Dates, Page 89


application/x-www-form-urlencoded

X-HTTP-Method-Override

GET, POST, PUT, DELETE, PATCH

    幂等操作：GET, PUT, DELETE
    非幂等：POST




## HTTP 2.0

> <https://http2.akamai.com/>

来自 Google 的 `Chris Bentzel` 2015年2月说：HTTP 是 Web 万维网的基础网络信息，目前广泛使用的是
`HTTP/1.1` 标准，该标准是 `1999` 年在 `RFC2616` 中定义的。但是到了今天 Web 的发展日新月异，同时一个
新版本 `HTTP/2` 也在标准路上不断前行。我们计划在未来数周内发布的`Chrome 40`中支持 HTTP/2 标准。

HTTP 2.0 首个 draft 已于 `2012 年 11 月`发布，已于`2015年初`发布。它保证了与 HTTP 1.1 的完全语义兼容
，最初考虑的是 Google SPDY 协议、微软的 SM 协议和 Network-Friendly HTTP 更新。最终各方推荐了`SPDY`协
议，并在此基础上进行了相应更新。

HTTP 2.0 相比 1.1 的更新大部分集中于：

* 多路复用
* HEAD 压缩
* 服务器推送
* 优先级请求

### RFC

> 目前还是draft，最新进展可在ietf blog查看：<https://www.ietf.org/blog/>

* HTTP/2: <https://tools.ietf.org/html/draft-ietf-httpbis-http2>
* HPACK: <https://tools.ietf.org/html/draft-ietf-httpbis-header-compression>


### 相关布道文章

* <http://www.alloyteam.com/2016/07/httphttp2-0spdyhttps-reading-this-is-enough/>
* HTTP/2.0那些事 <http://www.mamicode.com/info-detail-1199706.html>


## Cache-Control

> RFC 2616: Page 107 - `14.9 Cache-Control`

### Syntax

    Cache-Control   = "Cache-Control" ":" 1#cache-directive

    cache-directive = cache-request-directive
         | cache-response-directive

    cache-request-directive =
           "no-cache"                          ; Section 14.9.1
         | "no-store"                          ; Section 14.9.2
         | "max-age" "=" delta-seconds         ; Section 14.9.3, 14.9.4
         | "max-stale" [ "=" delta-seconds ]   ; Section 14.9.3
         | "min-fresh" "=" delta-seconds       ; Section 14.9.3
         | "no-transform"                      ; Section 14.9.5
         | "only-if-cached"                    ; Section 14.9.4
         | cache-extension                     ; Section 14.9.6

     cache-response-directive =
           "public"                               ; Section 14.9.1
         | "private" [ "=" <"> 1#field-name <"> ] ; Section 14.9.1
         | "no-cache" [ "=" <"> 1#field-name <"> ]; Section 14.9.1
         | "no-store"                             ; Section 14.9.2
         | "no-transform"                         ; Section 14.9.5
         | "must-revalidate"                      ; Section 14.9.4
         | "proxy-revalidate"                     ; Section 14.9.4
         | "max-age" "=" delta-seconds            ; Section 14.9.3
         | "s-maxage" "=" delta-seconds           ; Section 14.9.3
         | cache-extension                        ; Section 14.9.6

    cache-extension = token [ "=" ( token | quoted-string ) ]



## HTTP 3

> HTTP over `QUIC`

### Resources

* [ 181111 ] `HTTP/3` <https://daniel.haxx.se/blog/2018/11/11/http-3/> HTTP/3 is the coming new HTTP version that uses QUIC for transport! The QUIC Working Group in the IETF works on creating the QUIC transport protocol. QUIC is a TCP replacement done over UDP. Originally, QUIC was started as an effort by Google and then more of a "HTTP/2-encrypted-over-UDP" protocol.




