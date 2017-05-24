# apache

> httpd

## 配置说明

> todo




## MaxRequestLen

最大请求长度，`Apache 2.3.6`开始，`MaxRequestLen`这个参数的默认值从之前的`1GB`调整到了`131072字节`（128KB）。于是上传128KB以下的文件不会出问题，但是超过这个值就会报`500`错误了。 
打开Apache的`httpd.conf`配置文件，增加`全局`配置：

    MatRequestLen 10240000

单位是`字节`，以上配置最大请求长度为`10MB`。配置完成后重启Apache即可。


## 2.2到2.4升级备忘

> 2.2到2.4的升级，变化不少，需要查看changelog来进行修改

<http://httpd.apache.org/docs/2.4/en/upgrading.html>

1. User需要mod_unixd
2. DefaultType警告，先简单改成`DefaultType none`
3. 出现`Authz_core:error Client Denied by Server Configuration`错误
    ，需要将：

        <Directory /path/to/directory>
            Options FollowSymlinks
            AllowOverride none
            Order allow, deny
            Allow from all
        </Directory>

    改成：

        <Directory /path/to/directory>
            Options FollowSymlinks
            AllowOverride none
            Require all granted
        </Directory>

    还有

        Require all denied
        
    等，具体可参考： 
    1. https://mikegriffin.ie/blog/20140130-authz-core-error-client-denied-by-server-configuration/
    2. http://www.hksilicon.com/kb/cn/articles/409729/Apache-2224Conf

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



