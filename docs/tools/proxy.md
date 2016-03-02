# 代理工具



## HTTP代理

`HTTP代理如何为HTTPS连接提供代理服务？`

`HTTP代理`，提供网络代理服务，但不局限于HTTP协议的代理，HTTPS甚至FTP都可以使用HTTP代理。
`HTTPS`连接HTTP代理服务器使用的是`HTTP CONNECT`指令。实现提供HTTPS代理服务的HTTP代理只需在响应
CONNECT指令后，进行二进制的数据读取即可。

如果确实需要对HTTPS进行抓包，需要使用`伪证书`。







apache代理

NProxy代理

还是蛮好用的，支持各类responder


Fiddler代理

MacProxy代理
