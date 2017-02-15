
## cli mode

    $ cmd /v:on /k pushd c:\ ^&^& set continue=1^&^& for /f "tokens=*" %i in ('dir /s/b chrome.exe') do ((if ^!continue^!==1 @echo "%i" "http://www.baidu.com") ^&^& set continue=0) ^&^& popd

## batch file

    rem ie-open-chrome.bat file    
    @echo off
    setlocal enabledelayedexpansion
    pushd c:\ && set c=1&& for /f "tokens=*" %%i in ('dir /s/b chrome.exe') do (( if !c!==1 start "%%i" "http://www.baidu.com") && set c=0) && popd

## WshShell.Run  

    <script>
    function loadProg( path ){
        var shell = new ActiveXObject( 'WScript.Shell' );
        shell.Run( path, 1, false );
    }

    window.onload = function() {
        var cmd =
            'cmd /v:on /c @echo opening chrome ... && pushd c:\\ && set continue=1&& for /f "tokens=*" %i in (\'dir /s/b chrome.exe\') do ( ( if ^!continue^!==1 start "%i" "'
            + 'http://baike.baidu.com/link?url=AEM2chWIdSA3-Ir9QoMJaS76ZVExb8n2LFj1xHML4f9gHxNWYvQKy_GGV0_3gt1HgQ787qJOtzUxeT6yiVOV6q'
            + '") && set continue=0) && popd'
            ;
        loadProg( cmd );
    };
    </script>
