# HTTPS协议

> 我们都知道HTTPS能够加密信息，以免敏感信息被第三方获取。所以很多银行网站或电子邮箱等等安全级别较高的服务都会采用HTTPS协议。


HTTPS其实是由两部分组成：`HTTP + SSL / TLS`，也就是在HTTP上又加了一层处理加密信息的模块。服务端和客户端的信息传输都会通过TLS进行加密，所以传输的数据都是加密后的数据。具体是如何进行加密，解密，验证的，且看下图。

<img src="./img/https.png">

## HTTPS请求过程简介

### 客户端发起HTTPS请求

这个没什么好说的，就是用户在浏览器里输入一个`https`网址，然后连接到server的`443`端口。

### 服务端的配置

采用`HTTPS`协议的服务器必须要有一套`数字证书`，可以自己制作，也可以向组织申请。

区别就是自己颁发的证书需要客户端验证通过，才可以继续访问，而使用受信任的公司申请的证书则不会弹出提示页面(`startssl`就是个不错的选择，有1年的免费服务)。

这套证书其实就是`一对公钥和私钥`。如果对公钥和私钥不太理解，可以想象成`一把钥匙和一个锁头`，只是全世界只有你一个人有这把钥匙，你可以把锁头给别人，别人可以用这个锁把重要的东西锁起来，然后发给你，因为只有你一个人有这把钥匙，所以只有你才能看到被这把锁锁起来的东西。

### 传送证书

这个证书其实就是`公钥`，只是包含了很多信息，如证书的`颁发机构`、`过期时间`等等。


### 客户端解析证书

这部分工作是由`客户端`的`TLS`来完成的，首先会验证公钥是否有效，比如颁发机构，过期时间等等，如果发现异常，则会弹出一个警告框，提示证书存在问题。如果证书没有问题，那么就生成一个`随机值`。然后用`证书（公钥）`对该随机值进行加密。就好像上面说的，把随机值用`锁头（公钥）`锁起来，这样除非有`钥匙（私钥）`，不然看不到被锁住的内容。

### 传送加密信息

> `随机值`的存在，使得一对私钥和公钥就足矣

这部分传送的是用证书加密后的`随机值`，目的就是让服务端得到这个随机值，以后客户端和服务端的通信就`可以通过这个随机值来进行加密解密`了。


### 服务端解密信息

> 外层`非对称加密`，内层使用随机值`对称加密`

服务端用`私钥解密`后，得到了`客户端`传过来的`随机值(客户端私钥)`，然后把内容通过该值进行对称加密。所谓对称加密就是，将信息和私钥通过某种算法混合在一起，这样除非知道私钥，不然无法获取内容，而正好客户端和服务端都知道这个私钥，所以只要加密算法够彪悍，私钥够复杂，数据就够安全。

### 传输加密后的信息

这部分信息是服务端用`客户端私钥`加密后的信息，可以在客户端被还原。

### 客户端解密信息

客户端用之前生成的私钥解密服务端传过来的信息，于是获取了解密后的内容。整个过程第三方即使监听到了数据，也束手无策。




## 协议说明

SSL协议使用了`公钥加密`和`对称加密`两种加密技术。

* `服务端证书`，包含公钥和私钥，`公钥`会下发，`私钥`只在服务器使用

* 客户端拿到并验证公钥的有效性以后，生成的随机值用公钥加密（`公钥加密技术`），传送给服务端，该加密信息只有拥有私钥的服务端能解开，这样服务端就拿到了客户端生成的随机值了

* 后续的通信都是用上一步骤生成的`随机值`进行`对称加密／解密`（`对称加密技术`）



## 代理服务器如何进行HTTPS代理


## 涉及相关文件

* `.crt`：证书文件
* `.csr`：
* `.key`



## HTTPS和HTTP的区别

超文本传输协议HTTP协议被用于在Web浏览器和网站服务器之间传递信息。HTTP协议以明文方式发送内容，不提供
任何方式的数据加密，如果攻击者截取了Web浏览器和网站服务器之间的传输报文，就可以直接读懂其中的信息，
因此HTTP协议不适合传输一些敏感信息，比如信用卡号、密码等。

为了解决HTTP协议的这一缺陷，需要使用另一种协议：安全套接字层超文本传输协议HTTPS。为了数据传输的安全
，HTTPS在HTTP的基础上加入了SSL协议，SSL`依靠证书来验证服务器的身份，并为浏览器和服务器之间的通信加密
`。

1. https协议需要到ca申请证书，一般免费证书很少，需要交费。
2. http是超文本传输协议，信息是明文传输，https 则是具有安全性的ssl加密传输协议。
3. http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。
4. http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。





## HTTPS代理

普通HTTPs代理只是充当了`转发`的功能，比如服务器在收到

    CONNECT www.xxx.com:443 HTTP/1.0

请求后返回   

    HTTP/1.0 200 Connection established

通知客户端建立了连接，之后只负责把客户端的数据转发到相关端口。
不过`goagent`那种是属于通过假证书再与两边连接的。 

比如内部网络的主机不能直接连接外网，只能通过HTTP Proxy，例如`squid`，访问外部网站，而且通常
只允许访问`80、443、8080`这样的端口。当你通过HTTP代理访问外网服务时，如果你请求的是http协议的数据，
代理会先接收你的请求，然后发送请求到服务器，获得响应后先在本地建立缓存，并将缓存返回给客户端。
这个过程中，你发出的数据会被HTTP代理解析、修改。

但是如果你请求的是`https协议`的数据，由于https协议本身是加密的，`只有在你的请求没有受到任何修改的情况下（HTTP头也不能被修改），客户端才能正确获得响应`。
因此，HTTP代理不会修改你的请求，只会在客户端和服务器之间建立一个HTTP的CONNECT连接，
连接建立成功后，客户端可以将此连接当作普通的`socks`连接，用它传输任何内容，例如用作端口转发。
很多木马都会使用这种技术作`内网穿透`，效果也非常好。

HTTPS/SSL连接在连接代理服务器时，发送了`CONNECT  Address:Port` 的请求，你就`直接连接Address:Port`就好了。连接成功返回个成功消息。随后整个连接直接发送/接收二进制流，不需要关心它里面到底是ssl还是别的什么。





## 握手过程

为了便于更好的认识和理解SSL 协议，这里着重介绍SSL 协议的握手协议。SSL 协议既用到了公钥加密技术又用到了对称加密技术，对称加密技术虽然比公钥加密技术的速度快，可是公钥加密技术提供了更好的身份认证技术。SSL 的握手协议非常有效的让客户和服务器之间完成相互之间的身份认证，其主要过程如下：

1. 客户端的浏览器向服务器传送客户端SSL 协议的版本号，加密算法的种类，产生的随机数，以及其他服务器和客户端之间通讯所需要的各种信息。

2. 服务器向客户端传送SSL 协议的版本号，加密算法的种类，随机数以及其他相关信息，同时服务器还将向客户端传送自己的证书。

3. 客户利用服务器传过来的信息验证服务器的合法性，服务器的合法性包括：证书是否过期，发行服务器证书的CA 是否可靠，发行者证书的公钥能否正确解开服务器证书的“发行者的数字签名”，服务器证书上的域名是否和服务器的实际域名相匹配。如果合法性验证没有通过，通讯将断开；如果合法性验证通过，将继续进行第四步。

4. 用户端随机产生一个用于后面通讯的“对称密码”，然后用服务器的公钥（服务器的公钥从步骤②中的服务器的证书中获得）对其加密，然后将加密后的“预主密码”传给服务器。

5. 如果服务器要求客户的身份认证（在握手过程中为可选），用户可以建立一个随机数然后对其进行数据签名，将这个含有签名的随机数和客户自己的证书以及加密过的“预主密码”一起传给服务器。

6. 如果服务器要求客户的身份认证，服务器必须检验客户证书和签名随机数的合法性，具体的合法性验证过程包括：客户的证书使用日期是否有效，为客户提供证书的CA 是否可靠，发行CA 的公钥能否正确解开客户证书的发行CA 的数字签名，检查客户的证书是否在证书废止列表（CRL）中。检验如果没有通过，通讯立刻中断；如果验证通过，服务器将用自己的私钥解开加密的“预主密码”，然后执行一系列步骤来产生主通讯密码（客户端也将通过同样的方法产生相同的主通讯密码）。

7. 服务器和客户端用相同的主密码即“通话密码”，一个对称密钥用于SSL 协议的安全数据通讯的加解密通讯。同时在SSL 通讯过程中还要完成数据通讯的完整性，防止数据通讯中的任何变化。

8. 客户端向服务器端发出信息，指明后面的数据通讯将使用的步骤⑦中的主密码为对称密钥，同时通知服务器客户端的握手过程结束。

9. 服务器向客户端发出信息，指明后面的数据通讯将使用的步骤⑦中的主密码为对称密钥，同时通知客户端服务器端的握手过程结束。

10. SSL 的握手部分结束，SSL 安全通道的数据通讯开始，客户和服务器开始使用相同的对称密钥进行数据通讯，同时进行通讯完整性的检验。

