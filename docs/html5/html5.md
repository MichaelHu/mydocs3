# html5

> 广义上，html5是`新一代Web技术`的`统称`，包括HTML5、CSS3、New JS APIs。


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>


## Overview

w3c html5 标准文档: <https://www.w3.org/TR/html/>

* 非常全面的文档，可当reference
* 值得全面通读一下


## ARIA Role attribute

> Accessible Rich Internet Applications ( WAI-ARIA )

    <li role="menuitem">Open file…</li>

* wai-aria: <https://www.w3.org/TR/wai-aria/>
* role attribute: <https://www.w3.org/TR/2011/WD-role-attribute-20110113/>
* HTML allowed roles: <https://www.w3.org/TR/2016/REC-html51-20161101/dom.html#allowed-aria-roles-states-and-properties>
* XHTML role Vocabulary: <https://www.w3.org/1999/xhtml/vocab>

Every HTML element `may` have an `ARIA role attribute` specified. This is an ARIA Role attribute as defined by [WAI-ARIA].

The attribute, `if specified`, must have a value that is a set of `space-separated tokens`; each token must be a non-abstract role defined in the WAI-ARIA specification [WAI-ARIA].

The `WAI-ARIA role` that an HTML element has assigned to it is `the first non-abstract role` found in the list of values generated when the role attribute is split on spaces.



## Form

<ref://./form.md.html>


## CORS 

<ref://./cors.md.html>


## Fetch API

> 引入两个更通用的概念：Request, Response。

Support: Chrome 42+, Safari 10.1+

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





## Blob





## service workers
todo



## Cache API
todo

