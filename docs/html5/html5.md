# html5

> 广义上，html5是`新一代Web技术`的`统称`，包括HTML5、CSS3、New JS APIs。


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>


## Resources

* `html 5`: <https://www.w3.org/TR/html/>
* `html 5.1`: <https://www.w3.org/TR/html51>
* `html历史`：<https://www.w3.org/TR/html51/introduction.html#introduction-history> 
* 非常全面的文档，可当`reference`，值得全面通读一下


## ARIA Role attribute

> Web Accessibility Initiative - Accessible Rich Internet Applications ( WAI-ARIA )

### Resources

* Overview: <https://www.w3.org/WAI/intro/aria>
* wai-aria: <https://www.w3.org/TR/wai-aria/>
* role attribute: <https://www.w3.org/TR/2011/WD-role-attribute-20110113/>
* HTML allowed roles: <https://www.w3.org/TR/2016/REC-html51-20161101/dom.html#allowed-aria-roles-states-and-properties>
* XHTML role Vocabulary: <https://www.w3.org/1999/xhtml/vocab>


### Description

    <li role="menuitem">Open file…</li>

Every HTML element `may` have an `ARIA role attribute` specified. This is an ARIA Role attribute as defined by [WAI-ARIA].

The attribute, `if specified`, must have a value that is a set of `space-separated tokens`; each token must be a non-abstract role defined in the WAI-ARIA specification [WAI-ARIA].

The `WAI-ARIA role` that an HTML element has assigned to it is `the first non-abstract role` found in the list of values generated when the role attribute is split on spaces.



## Form

<ref://./form.md.html>


## CORS 

<ref://./cors.md.html>


## Fetch API

> 引入两个更通用的概念：`Request`, `Response`。

* Support: Chrome `42+`, Safari `10.1+`
* `r2`: HTTP client. `新款`轻量级请求客户端，支持node和浏览器，全面使用fetch API  <https://github.com/mikeal/r2> <iframe src="http://258i.com/gbtn.html?user=mikeal&repo=r2&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>   
* `request`: 🏊🏾 Simplified HTTP request client<https://github.com/request/request> <iframe src="http://258i.com/gbtn.html?user=request&repo=request&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>  

<div id="test_PH" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_PH');
        s.show( '检测fetch API...' );

        if ( !window.fetch ) {
            s.append_show( 'fetch API尚不支持' );
            return;
        }

        fetch( 'http://258i.com/phpapp/cors.php' )
            .then( function( resp ) {
                resp.body.getReader()
                    .read()
                    .then( function ( result ) {
                        // A gbk-encoded stream
                        var uint8arr = result.value;
                        s.append_show( new TextDecoder( 'gb2312' ).decode( uint8arr ) );
                    } )
                    ;
                // console.log( resp.body );
            } );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>





## Base64 Utils

> atob(), btoa()

todo: `escape, unescape`

* <https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa>
* <https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob>
* 编码只针对`字节流`字符串

1. The `WindowOrWorkerGlobalScope.btoa()` method creates a base-64 encoded ASCII string `from a String object in which each character in the string is treated as a byte of binary data`.
2. The `WindowOrWorkerGlobalScope.atob()` function decodes a string of data which has been encoded using base-64 encoding. You can use the btoa() method to encode and transmit data which may otherwise cause communication problems, then transmit it and use the atob() method to decode the data again.
3. In most browsers, `calling btoa() on a Unicode string` will cause an `InvalidCharacterError` exception. One option is to `escape any extended characters` so that the string you actually encode is an ASCII representation of the original. -- 比如unicode字符串需要特殊处理


<div id="test_base64" class="test">
<div class="test-container">
<input type="file"><button>get</button>

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_base64');
        var str = 'Hello';
        var encodeStr = btoa( str );

        s.show( 'encode ascii...' );
        s.append_show( encodeStr );
        s.append_show( 'decode to ascii ...' );
        s.append_show( atob( encodeStr ) );

        var ustr = 'Hello, 胡大民';
        var encodeUStr = utoa( ustr );

        s.append_show( 'encode unicode ...' );
        s.append_show( encodeUStr );
        s.append_show( 'decode to unicode ...' );
        s.append_show( atou( encodeUStr ) );

        $( '#test_base64 button' ).on( 'click', function( e ) {
            var file = $( '#test_base64 input[type="file"]' )[ 0 ].files[ 0 ];
            if ( file ) {
                s.append_show( btoa ( file ) );
            }
        } );

        function utoa ( str ) {
            return btoa( unescape( encodeURIComponent( str ) ) );
        }

        function atou ( str ) {
            return decodeURIComponent( escape( atob( str ) ) );
        }


    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



## MutationObserver

> todo

    var mo = new MutationObserver( callback );
    mo.observe( domTarget, { characterData: true, attribute: true } );

* 170306 Vue源码详解之`nextTick`：`MutationObserver`只是浮云，`microtask`才是核心！<https://segmentfault.com/a/1190000008589736>


## Microtask

`Promise`内部的回调在当前Event Loop的`microtask`中执行；`setTimeout`的回调在下一个Event Loop中执行

* `Event loop`: <https://www.w3.org/TR/html/webappapis.html#event-loops>
* `task queue processing model` - 任务队列处理模型: <https://www.w3.org/TR/html/webappapis.html#event-loops>
* 每个`Event loop`有一个或多个`task queue`，每个task对应这样一些工作：`Events`, `Parsing`, `Callbacks`, `Using a resource`, `Reacting to DOM manipulation`
* 每个`Event loop`还对应一个`microtask queue`，一个microtask就是放在microtask queue上的task，有两种类型的microtask：`solitary callback microtasks`以及`compound microtasks`
* 150817 Tasks, microtasks, queues and schedules <https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/> setTimeout, Promise, MutationObserver相关的的`微任务`的执行顺序在不通浏览器上可能存在不通表现，结论为：
* 170220 Excuse me？这个前端面试在搞事！<https://zhuanlan.zhihu.com/p/25407758> `microtask`相关概念

    




## Blob





## service workers
todo



## Cache API
todo


