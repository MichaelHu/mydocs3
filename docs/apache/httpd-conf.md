# httpd-conf



## 2.2到2.4升级备忘

> 2.2到2.4的升级，变化不少，需要查看changelog来进行修改

<a href="http://httpd.apache.org/docs/2.4/en/upgrading.html">Upgrading to 2.4 from 2.2</a>

1. User需要mod_unixd
2. DefaultType警告，先简单改成`DefaultType none`
其他更多的参考changelog


## 配置HTTP代理

> 配置proxy，可以实现请求包窥探，特别是对手机的数据请求进行窥探

以下是httpd.conf文件中的相关配置代码：

    LoadModule proxy_module libexec/apache2/mod_proxy.so
    LoadModule proxy_http_module libexec/apache2/mod_proxy_http.so

    <IfModule proxy_http_module>
    ProxyRequests On
    </IfModule>

当然还有以下代理模块可以选择：

    LoadModule proxy_ajp_module libexec/apache2/mod_proxy_ajp.so
    LoadModule proxy_balancer_module libexec/apache2/mod_proxy_balancer.so
    LoadModule proxy_connect_module libexec/apache2/mod_proxy_connect.so
    LoadModule proxy_express_module libexec/apache2/mod_proxy_express.so
    LoadModule proxy_fcgi_module libexec/apache2/mod_proxy_fcgi.so
    LoadModule proxy_fdpass_module libexec/apache2/mod_proxy_fdpass.so
    LoadModule proxy_ftp_module libexec/apache2/mod_proxy_ftp.so
    LoadModule proxy_html_module libexec/apache2/mod_proxy_html.so



