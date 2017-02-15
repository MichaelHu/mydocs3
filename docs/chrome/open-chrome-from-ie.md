# open chrome from ie

> `IE`浏览器中通过`js`调起`Chrome`浏览器，并打开对应地址


## 使用ActiveX技术

> 使用内建的COM组件`WScript.Shell`

    function loadProg( path ) {
        var active = new ActiveXObject( 'WScript.Shell' );
        activeX = active.Run( path );
    }

前提是需要知道Chrome浏览器的程序地址，然后可在某个时机打开：

    window.onload = function() {
        loadProg( chromePath );
    };

参考：<http://stackoverflow.com/questions/9723244/javascript-code-to-force-html-page-to-open-in-chrome-browser>



## 实现方式

### batch file

    rem ie-open-chrome.bat file    
    @echo off
    setlocal enabledelayedexpansion
    pushd c:\ && set c=1&& for /f "tokens=*" %%i in ('dir /s/b chrome.exe') do (( if !c!==1 start "%%i" "http://www.baidu.com") && set c=0) && popd

### WshShell.Run  

* 使用`cmd /v:on /k string`命令
* `/k`或`/c`选项，使得该选项`后方的部分`全部作为`一个命令行`执行

#### cli 直接执行

1. `&`需要转义成`^&`，使得`/k`后面部分作为一个`字符串`
2. `!continue!`要转义成`^!continue^!`，使之在第一次解析中作为字面量（`纯字符串`），不进行变量扩展
3. 命令行解析器需要`先读取一次`（也就是解析一次），所以需要转义

代码如下：

    $ cmd /v:on /k ^
        pushd c:\ ^&^& set continue=1^&^& ^
        for /f "tokens=*" %i in ('dir /s/b chrome.exe') ^
            do (^
                (if ^!continue^!==1 start "%i" "http://www.baidu.com") ^
                ^&^& set continue=0^
        ) ^
        ^&^& popd


#### js脚本调用

1. 不需要转义`&`与`!`
2. 不是从命令行上读取，直接已经是字符串 

代码如下：

    <script>
    function loadProg( path ){
        var shell = new ActiveXObject( 'WScript.Shell' );
        shell.Run( path, 1, false );
    }

    window.onload = function() {
        var cmd =
            'cmd /v:on /c @echo opening chrome ... && pushd c:\\ && set continue=1&& for /f "tokens=*" %i in (\'dir /s/b chrome.exe\') do ( ( if !continue!==1 start "%i" "'
            + 'http://baike.baidu.com/link?url=AEM2chWIdSA3-Ir9QoMJaS76ZVExb8n2LFj1xHML4f9gHxNWYvQKy_GGV0_3gt1HgQ787qJOtzUxeT6yiVOV6q'
            + '") && set continue=0) && popd'
            ;
        loadProg( cmd );
    };
    </script>


