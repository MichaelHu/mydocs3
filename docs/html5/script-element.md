# script element



<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/jquery/dist/jquery.min.js"></script>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>


* w3c: <https://www.w3.org/TR/html/semantics-scripting.html#the-script-element>


## Features

* When inserted using the `document.write()` method, script elements execute (typically blocking further script execution or HTML parsing), but when inserted using `innerHTML` and `outerHTML` attributes, they `do not execute` at all.
* `src为空`、或者`url解析失败`等，会在script element本身触发一个`simple event`：`error`，该事件不会冒泡
* 外部脚本执行成功，会触发`load`
* `ie6-8`不触发`error`事件，readystatechange事件也只有loading/loaded事件，无法捕获error
* 用原生方法进行事件注册以及DOM元素添加与jQuery方法存在一些差异


## 检测常规事件

script检测`ERR:NETWORK_CONNECTION_CLOSED`以及`ERR:INSECURE_RESPONSE`，使用`error`事件。非IE浏览器。

### 原生方式注册

先append再注册事件、设置src，或者先注册事件、设置src，再append，都正常。

<div id="test_script_error" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_script_error');
        s.show( 'Start testing ...' );

        var script1 = document.createElement( 'script' );
        document.getElementsByTagName( 'head' )[ 0 ].appendChild( script1 );
        script1.addEventListener( 'load', function( e ) {
            s.append_show( 'script1 onload' );
            script1.parentNode.removeChild( script1 );
        } );
        script1.addEventListener( 'error', function( e ) {
            s.append_show( 'script1 onerror' );
            script1.parentNode.removeChild( script1 );
        } );
        script1.src = 'http://news.baidu.com?v=1';

        var script2 = document.createElement( 'script' );
        document.getElementsByTagName( 'head' )[ 0 ].appendChild( script2 );
        script2.addEventListener( 'load', function( e ) {
            s.append_show( 'script2 onload' );
            script2.parentNode.removeChild( script2 );
        } );
        script2.addEventListener( 'error', function( e ) {
            s.append_show( 'script2 onerror' );
            script2.parentNode.removeChild( script2 );
        } );
        script2.src = 'http://abc.def.com';

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>

### jQuery方式注册

> 先append再注册事件、设置src，正常；但先注册事件、设置src，再append，就无法捕获事件。原因待查。

<div id="test_script_error2" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_script_error2');
        var $script = $( '<' + 'script' + '/>' );
        s.show( 'Start testing ...' );

        $script.appendTo( 'head' );
        $script.on( 'load', function( e ) {
            s.append_show( 'script onload' );
            $script.remove();
        } );
        $script.on( 'error', function( e ) {
            s.append_show( 'script onerror' );
            $script.remove();
        } );
        $script.attr( 'src', 'http://news.baidu.com?v=2' );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


## 参考

* `script`的`onload`与`src`的设置顺序，以及使用jQuery实现时的问题：<http://stackoverflow.com/questions/16230886/trying-to-fire-onload-event-on-script-tag>
