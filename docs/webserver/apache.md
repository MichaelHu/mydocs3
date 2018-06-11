# apache

> httpd

## Versions

* 2.4
* 2.2
* 2.0
* 1.3


## core module

### Examples

    # name of the distributed configuration file
    AccessFileName .acl

    AddDefaultCharset utf-8

    AllowOverride None
    AllowOverride All
    AllowOverride AuthConfig Indexes

    AllowOverride None
    AllowOverrideList Redirect RedirectMatch

    # 慎用，有性能问题
    # Content-MD5: AuLb7Dp1rqtRtxz2m9kRpA==
    ContentDigest On
    ContentDigest Off

    DocumentRoot "/var/www/htdocs"

    # use memory-mapping to read files during delivery
    EnableMMAP On
    EnableMMAP Off

    # use the kernel sendfile support to deliver files to the client
    EnableSendfile On
    EnableSendfile Off

    # Abort configuration parsing with custom error message
    Error message

    ErrorDocument error-code document

    ErrorLog "/var/log/httpd/error_log"
    ErrorLog "|/usr/local/bin/httpd_errors"
    ErrorLog syslog:user
    ErrorLog syslog:user:httpd.srv1
    ErrorLog syslog::httpd.srv2

    ErrorLogFormat "[%t] [%l] [pid %P] %F: %E: [client %a] %M"

    # ensure that mod_include is loaded
    <IfModule !include_module>
      Error "mod_include is required by mod_foo.  Load it with LoadModule."
    </IfModule>


    # containers
    <Directory> 
    <DirectoryMatch> 
    <Else>
    <ElseIf>



### Define

    <IfDefine TEST>
      Define servername test.example.com
    </IfDefine>
    <IfDefine !TEST>
      Define servername www.example.com
      Define SSL
    </IfDefine>

    DocumentRoot "/var/www/${servername}/htdocs"


### ErrorDocument

    ErrorDocument 500 http://example.com/cgi-bin/server-error.cgi
    ErrorDocument 404 /errors/bad_urls.php
    ErrorDocument 401 /subscription_info.html
    ErrorDocument 403 "Sorry, can't allow you access today"
    ErrorDocument 403 Forbidden!
    ErrorDocument 403 /errors/forbidden.py?referrer=%{escape:%{HTTP_REFERER}}


### ErrorLogFormat

    ErrorLogFormat "[%t] [%l] [pid %P] %F: %E: [client %a] %M"


#### Modified Token

    Modified Token	    Meaning
    ===========================================================================================
    %-{Referer}i	    Logs a - if Referer is not set.
    %+{Referer}i	    Omits the entire line if Referer is not set.
    %4{Referer}i	    Logs the Referer only if the log message severity is higher than 4.


#### Format String

    Format String	    Description
    ===========================================================================================
    %%                  The percent sign
    %a                  Client IP address and port of the request
    %{c}a               Underlying peer IP address and port of the connection (
                        see the mod_remoteip module)
    %A                  Local IP-address and port
    %{name}e            Request environment variable name
    %E                  APR/OS error status code and string
    %F                  Source file name and line number of the log call
    %{name}i            Request header name
    %k                  Number of keep-alive requests on this connection
    %l                  Loglevel of the message
    %L                  Log ID of the request
    %{c}L               Log ID of the connection
    %{C}L               Log ID of the connection if used in connection scope, empty otherwise
    %m                  Name of the module logging the message
    %M                  The actual log message
    %{name}n            Request note name
    %P                  Process ID of current process
    %T                  Thread ID of current thread
    %{g}T               System unique thread ID of current thread (the same ID as 
                        displayed by e.g. top; currently Linux only)
    %t                  The current time
    %{u}t               The current time including micro-seconds
    %{cu}t              The current time in compact ISO 8601 format, including micro-seconds
    %v                  The canonical ServerName of the current server.
    %V                  The server name of the server serving the request according to 
                        the UseCanonicalName setting.
    \  (backslash space)    Non-field delimiting space
    %  (percent space)        Field delimiter (no output)




## Configuration Sections

### Containers

> 配置容器指令

    Related Modules         Related Directives
    ===================================================
    core                    <Directory>
    mod_version             <DirectoryMatch>
    mod_proxy               <Files>
                            <FilesMatch>
                            <If>
                            <IfDefine>
                            <IfModule>
                            <IfVersion>
                            <Location>
                            <LocationMatch>
                            <MDomainet>
                            <Proxy>
                            <ProxyMatch>
                            <VirtualHost>

#### Examples

    <IfDefine ClosedForNow>
        Redirect "/" "http://otherserver.exapmle.com/"
    </IfDefine>

    # the MimeMagicFile directive will be applied only if mod_mime_magic is available
    <IfModule mod_mime_magic.c>
        MimeMagicFile "conf/magic"
    </IfModule>

    <IfVersion >= 2.4>
        # this happens only in versions greater or
        # equal 2.4.0.
    </IfVersion>
    


#### filesystem containers

> 文件系统容器

    # 目录/var/web/dir1及其子目录，Indexes功能都被开启
    <Directory "/var/web/dir1">
        Options +Indexes
    </Directory>

    # 文件名为private.html的文件，都拒绝访问
    <Files "private.html">
        Require all denied
    </Files>

    # 目录/var/web/dir1及其子目录下，所有名为private.html的文件，都拒绝访问
    <Directory "/var/web/dir1">
        <Files "private.html">
            Require all denied
        </Files>
    </Directory>


#### webspace container

> 网络空间容器

    # 所有以/private开始的请求，都被拒绝，比如：
    # http://yoursite.example.com/private
    # http://yoursite.example.com/private123
    # http://yoursite.example.com/private/dir/file.html
    <LocationMatch "^/private">
        Require all denied
    </LocationMatch>

    <Location "/server-status">
        SetHandler server-status
    </Location>

* Location`和文件系统无关`，以上指令，将网络空间地址/server-status映射到server内部，server内部没必要存在文件/server-status



#### overlapping webspace

> 叠加的网络空间

    <Location "/foo">
    </Location>

    <Location "/foo/bar">
    </Location>

    Alias "/foo/bar" "/srv/www/uncommon/bar"
    Alias "/foo" "/srv/www/common/foo"

    ProxyPass "/special-area" "http://special.example.com" smax=5 max=10
    ProxyPass "/" "balancer://mycluster/" stickysession=JSESSIONID|jsessionid nofailover=On


#### 通配符和正则表达式

* `<Directory>`, `<Files>`以及`<Location>`指令都支持shell风格的`通配符`，正如C标准库中fnmatch的实现：

        符号    描述
        ======================================
        *       任意字符序列，除了"/"
        ?       任意单字符，除了"/"
        [seq]   序列seq中的任意字符

* `<DirectoryMatch>`,`<FilesMatch>`以及` <LocationMatch> `指令则支持Perl兼容正则表达式匹配

举例如下：

    <Directory "/home/*/public_html">
        Options Indexes
    </Directory>

    <FilesMatch "\.(?i:gif|jpe?g|png)$">
        Require all denied
    </FilesMatch>

    # 反向引用
    <DirectoryMatch "^/var/www/combined/(?<SITENAME>[^/]+)">
        require ldap-group "cn=%{env:MATCH_SITENAME},ou=combined,o=Example"
    </DirectoryMatch>

> 其中反向引用部分还有疑问




## MaxRequestLen

最大请求长度，`Apache 2.3.6`开始，`MaxRequestLen`这个参数的默认值从之前的`1GB`调整到了`131072字节`（128KB）。于是上传128KB以下的文件不会出问题，但是超过这个值就会报`500`错误了。 
打开Apache的`httpd.conf`配置文件，增加`全局`配置：

    MaxRequestLen 10240000

单位是`字节`，以上配置最大请求长度为`10MB`。配置完成后重启Apache即可。


## .htaccess files

> 分布式配置文件

* doc: <http://httpd.apache.org/docs/current/howto/htaccess.html>
* `.htaccess`文件名也可自定义：

        AccessFileName ".config"

    此时使用`.config`文件，即可对配置进行分布式更新

* 使用`.htaccess`的利弊：
    * 无root权限的用户，可以自行更新访问目录下的配置
    * 带来`性能问题`，apache需要查找每个目录下的`.htaccess`文件来形成最终的有效配置
    * 更需要注意的是，apache不仅查找每个访问目录下的`.htaccess`，它还需要查找所有高级别的目录，比如判断`/var/www/htdocs/example`目录下的文件的访问配置，apache需要一次查找以下文件的配置，并进行覆盖合并：

            /.htaccess
            /var/.htaccess
            /var/www/.htaccess
            /var/www/htdocs/.htaccess
            /var/www/htdocs/example/.htaccess

* 可以使用以下指令，打开、关闭或自定义.htaccess文件能定义的功能

        AllowOverride None
        AllowOverride All
        AllowOverride AuthConfig Indexes




## mod_headers

### Resources

* Apache Module `mod_headers` - <http://httpd.apache.org/docs/2.4/en/mod/mod_headers.html>
* The directives provided by mod_headers can occur almost anywhere within the server configuration



### Examples

    # Copy all request headers that begin with "TS" to the response headers
    Header echo ^TS

    # Add a header, MyHeader, to the response including a timestamp for when the request was received and how long it took to begin serving the request
    Header set MyHeader "%D %t"

    # 将产生以下response header：
    MyHeader: D=3775428 t=991424704447256

    # Enable DAV to work with Apache running HTTP through SSL hardware (problem description) 
    # by replacing https: with http: in the Destination header:
    RequestHeader edit Destination ^https: http: early

    Header merge Cache-Control no-cache env=CGI
    Header merge Cache-Control no-cache env=NO_CACHE
    Header merge Cache-Control no-store env=NO_STORE

    # Set a test cookie if and only if the client didn't send us a cookie
    Header set Set-Cookie testcookie "expr=-z %{req:Cookie}"

    # Append a Caching header for responses with a HTTP status code of 200
    Header append Cache-Control s-maxage=600 "expr=%{REQUEST_STATUS} == 200"




## mime_module

* doc: <http://httpd.apache.org/docs/current/mod/mod_mime.html>


### Content encoding

    Content-encoding: pkzip

### Character sets and languages

    Content-Language: en, fr
    Content-Type: text/plain; charset=ISO-8859-1

### Examples

    AddLanguage ja .ja

    AddCharset EUC-JP .euc
    AddCharset ISO-2022-JP .jis
    AddCharset SHIFT_JIS .sjis

    AddEncoding x-gzip .gz
    AddEncoding x-compress .Z

    AddEncoding x-gzip .gz
    AddType text/plain .asc
    <Files "*.gz.asc">
        RemoveEncoding .gz
    </Files>

    AddHandler cgi-script .cgi

    # Effective filter "DEFLATE"
    AddOutputFilter DEFLATE shtml
    <Location "/foo">
      # Effective filter "INCLUDES", replacing "DEFLATE"
      AddOutputFilter INCLUDES shtml
    </Location>
    <Location "/bar">
      # Effective filter "INCLUDES;DEFLATE", replacing "DEFLATE"
      AddOutputFilter INCLUDES;DEFLATE shtml
    </Location>
    <Location "/bar/baz">
      # Effective filter "BUFFER", replacing "INCLUDES;DEFLATE"
      AddOutputFilter BUFFER shtml
    </Location>
    <Location "/bar/baz/buz">
      # No effective filter, replacing "BUFFER"
      RemoveOutputFilter shtml
    </Location>

    AddType image/gif .gif
    AddType image/jpeg jpeg jpg jpe
    AddType application/rss+xml;qs=0.8 .xml

    DefaultLanguage en

    RemoveLanguage .ja
    RemoveCharset .html .shtml
    RemoveHandler .cgi
    RemoveType .asc



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



