# SFTP Memo


SFTP是`Secure File Transfer Protocol`的缩写，安全文件传送协议。可以为传输文件提供一种安全的加密方法。

SFTP 与 FTP 有着几乎一样的语法和功能。

SFTP 为 `SSH`的一部分，是一种传输档案至 Blogger 伺服器的安全方式。

其实在SSH软件包中，已经包含了一个叫作SFTP(Secure File Transfer Protocol)的安全文件传输子系统，
SFTP本身没有单独的守护进程，它必须使用`sshd守护进程（端口号默认是22）`来完成相应的连接操作，
所以从某种意义上来说，SFTP并不像一个服务器程序，而更像是一个客户端程序。

SFTP同样是使用加密传输认证信息和传输的数据，所以，`使用SFTP是非常安全的`。
但是，由于这种传输方式使用了加密/解密技术，所以`传输效率比普通的FTP要低得多`，如果您对网络安全性要求更高时，可以使用SFTP代替FTP。
