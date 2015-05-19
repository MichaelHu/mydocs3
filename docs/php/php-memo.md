# PHP备忘

> 2015年以前的关于PHP的文章不在此处



## 2015-03-19

* 关于magic quotes
    1. 开关打开以后，所有的`', ", \, NULL`字符之前都会加上一个`\ `
    2. 有三种magic quotes：
        * `magic_quotes_gpc`: 影响请求数据（GET， POST， 以及COOKIE）。默认打开
        * `magic_quotes_runtime`: 影响大部分从外部返回数据的函数，包括数据库或文本文件。默认关闭
        * `magic_quotes_sybase`: 单引号前添加单引号，即`'` => `''`，仅单引号会被转义。此开关打开以后，
            `magic_quotes_gpc`将失效
    3. 版本说明：
        
        5.3.0已经DEPRECATED，5.4.0开始，不再使用

    4. fe2上面的fis2在运行news.php数据代理时，请求数据中添加了反斜线转义。原因为fe2机器上
        使用的是PHP5.3，没有提供php.ini文件，使用了默认值（默认打开）。解决方法为在使用的php.ini文件中添加：

            magic_quotes_gpc = off

        另一解决方案为升级PHP至5.4及以上版本

    5. `magic_quotes_gpc`选项不能在运行时通过ini_set函数设置生效，必须在php.ini文件中设置。如果是fast-cgi
        方式，需要在修改php.ini文件以后，重启fast-cgi
