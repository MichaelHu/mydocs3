# HTTP2 Basics


来自 Google 的 Chris Bentzel 2015年2月说：HTTP 是 Web 万维网的基础网络信息，
目前广泛使用的是 `HTTP/1.1` 标准，该标准是 `1999` 年在 `RFC2616` 中定义的。
但是到了今天 Web 的发展日新月异，同时一个新版本 `HTTP/2` 也
在标准路上不断前行。我们计划在未来数周内发布的 Chrome 40 中支持 HTTP/2 标准。


HTTP 2.0 首个 draft 已于 `2012 年 11 月`发布，已于`2015年初`发布。它保证了与 HTTP 1.1 的完全语义兼容，最初考虑的是 Google SPDY 协议、微软的 SM 协议和 Network-Friendly HTTP 更新。最终各方推荐了 SPDY 协议，并在此基础上进行了相应更新。

HTTP 2.0 相比 1.1 的更新大部分集中于：

* 多路复用
* HEAD 压缩
* 服务器推送
* 优先级请求

