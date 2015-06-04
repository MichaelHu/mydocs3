# FIS Memo



## 本地服务器

有几种方式：

1. 无java，只用node
2. 有java无php-cgi，用jsp
3. 有java，有php-cgi，使用php

本地服务器，使用`server-conf/server.conf`配置rewrite，rewrite配置如下：

    rewrite ^\/pinche\/oneyuan\/bingcoupon oneyuan/data/news.php 

需使用`php-cgi`来启动php脚本运行，Mac系统本身的php安装版本只是作为Apache的一个Module
安装，没有php-cgi版本，需要自行安装，选用无污染安装（可以参考<a
href="
/docs/php/php-configure.md.html
">PHP configure and install</a>）。

同时，新版本的Mac OS并没有java命令行，需要安装`JDK`，不要轻信Mac弹出窗口，去下载`JRE`，因为
安装了JRE，是没有命令行工具的。JDK的官方下载地址经常抽风，不过可以使用`百度软件中心`的版本也可以。

启动本地服务器，如下方式：

    fis server start -p 8300 --php_exec=/Users/hudamin/softwares/php/bin/php-cgi \
        --rewrite

需要注意的是，`--php_exec`选项必须使用绝对路径，使用
`~/softwares/php/bin/php-cgi`无效，会提示php-cgi不支持信息。
另，和`--rewrite`配套的，还需要安装rewrite组件：

    cd ~/.fis-tmp/www
    fis server intall rewrite

同时，在项目根目录下提供`index.php`文件，使用该文件进行文件转发。

