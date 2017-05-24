# pako

> `zlib` port to javascript, very fast!

* site: <http://nodeca.github.io/pako/>
* github: <https://github.com/nodeca/pako>
* demo: <https://qgy18.com/request-compress/>

<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/bower_components/pako/dist/pako.min.js"></script>
<script src="./json/history-create.json"></script>

## 特点

* 支持`DEFLATE、ZLIB、GZIP`
* 使用广泛，是`jszip`(<ref://./jszip.md.html>)等知名js库的底层库


## 安装

    npm install pako
    bower install pako


## APIs

    pako.deflate( data[, options] ) -> Uint8Array | Array | String
        data -> Uint8Array | Array | String
        options -> Object
            {
                level: ...
                , windowBits: ...
                , memLevel: ...
                , strategy: ...
                , dictionary: ...
                , raw: ...
                , to: ...
            }
    pako.deflateRaw( data[, options] ) -> Uint8Array | Array | String
    pako.gzip( data[, options] ) -> Uint8Array | Array | String

    pako.inflate( data[, options] ) -> Uint8Array | Array | String
        data -> Uint8Array | Array | String
        options -> Object
            {
                windowBits: ...
                , raw: ...
                , to: ...
            }
    pako.inflateRaw( data[, options] ) -> Uint8Array | Array | String
    pako.ungzip( data[, options] ) -> Uint8Array | Array | String



## 基本用法


### 待压缩数据

<div id="test_data" class="test">
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_data');
        window.ascii = 'Hello, world!';
        window.ascii_repeated = 'HHHHH';
        window.ascii_long_repeated = 'HHHHHHHHHHHHHHHHHHHH';
        window.unicode = '超级宇宙飞船变形金刚';
        window.unicode_repeated = '超超超超超';
        window.unicode_long_repeated = '超超超超超超超超超超超超超超超超超超超超';
        window.mixed = 'Hello, 超级宇宙飞船变形金刚';
        window.mixed_repeated = window.ascii_repeated + window.unicode_repeated;
        window.mixed_long_repeated = 
            window.ascii_long_repeated + window.unicode_long_repeated;

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



### deflate

<div id="test_deflate" class="test">
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_deflate');
        s.show( 'start deflating ...' );
        test( window.ascii );
        test( window.ascii_repeated );
        test( window.ascii_long_repeated );
        test( window.unicode );
        test( window.unicode_repeated );
        test( window.unicode_long_repeated );
        test( window.mixed );
        test( window.mixed_repeated );
        test( window.mixed_long_repeated );
        test( window.json_90k, 1 );
        function test( content, ratioOnly ) {
            s.append_show( '\n' );
            if ( !ratioOnly ) {
                s.append_show( 'input', content );
                s.append_show( 'deflated array', pako.deflate( content ) );
                s.append_show( 'deflated string', pako.deflate( content, { to: 'string' } ) );
                s.append_show( 'inflated array', pako.inflate( pako.deflate( content ) ) );
                s.append_show( 'inflated string', pako.inflate( pako.deflate( content ), { to: 'string' } ) );
                s.append_show( 'inflated string'
                    , pako.inflate( pako.deflate( content, { to: 'string' } ), { to: 'string' } ) );
            }
            s.append_show( 'deflated ratio'
                , pako.deflate( content ).length 
                    / pako.inflate( pako.deflate( content ) ).length
            );
        }

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



### gzip

<div id="test_gzip" class="test">
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_gzip');
        s.show( 'start deflating ...' );
        test( window.ascii );
        test( window.ascii_repeated );
        test( window.ascii_long_repeated );
        test( window.unicode );
        test( window.unicode_repeated );
        test( window.unicode_long_repeated );
        test( window.mixed );
        test( window.mixed_repeated );
        test( window.mixed_long_repeated );
        test( window.json_90k, 1 );
        function test( content, ratioOnly ) {
            s.append_show( '\n' );
            if ( !ratioOnly ) {
                s.append_show( 'input', content );
                s.append_show( 'deflated array', pako.gzip( content ) );
                s.append_show( 'deflated string', pako.gzip( content, { to: 'string' } ) );
                s.append_show( 'inflated array', pako.ungzip( pako.gzip( content ) ) );
                s.append_show( 'inflated string', pako.ungzip( pako.gzip( content ), { to: 'string' } ) );
                s.append_show( 'inflated string'
                    , pako.ungzip( pako.gzip( content, { to: 'string' } ), { to: 'string' } ) );
            }
            s.append_show( 'deflated ratio'
                , pako.gzip( content ).length 
                    / pako.ungzip( pako.gzip( content ) ).length
            );
        }

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




### deflateRaw

<div id="test_deflateRaw" class="test">
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_deflateRaw');
        s.show( 'start deflating ...' );
        test( window.ascii );
        test( window.ascii_repeated );
        test( window.ascii_long_repeated );
        test( window.unicode );
        test( window.unicode_repeated );
        test( window.unicode_long_repeated );
        test( window.mixed );
        test( window.mixed_repeated );
        test( window.mixed_long_repeated );
        test( window.json_90k, 1 );
        function test( content, ratioOnly ) {
            s.append_show( '\n' );
            if ( !ratioOnly ) {
                s.append_show( 'input', content );
                s.append_show( 'deflated array', pako.deflateRaw( content ) );
                s.append_show( 'deflated string', pako.deflateRaw( content, { to: 'string' } ) );
                s.append_show( 'inflated array', pako.inflateRaw( pako.deflateRaw( content ) ) );
                s.append_show( 'inflated string', pako.inflateRaw( pako.deflateRaw( content ), { to: 'string' } ) );
                s.append_show( 'inflated string'
                    , pako.inflateRaw( pako.deflateRaw( content, { to: 'string' } ), { to: 'string' } ) );
            }
            s.append_show( 'deflated ratio'
                , pako.deflateRaw( content ).length 
                    / pako.inflateRaw( pako.deflateRaw( content ) ).length
            );
        }

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




## 联调测试


### B端

<div id="test_server" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_server');
        var content = window.mixed_repeated;
        var content = window.json_90k;
        content += content;
        content += content;
        content += content;
        content += content;
        var compressedRaw = pako.deflateRaw( content );
        var compressedDeflate = pako.deflate( content );
        var compressedGzip = pako.gzip( content );

        s.show( 'start testing ...' );
        // s.append_show( 'compressed', compressed );
        send( compressedRaw, 'deflate-raw' );
        send( compressedDeflate, 'deflate' );
        send( compressedGzip, 'gzip' );

        function send( content, encoding ) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                switch( xhr.readyState ) {
                    case 4: 
                        s.append_show( encoding + ' response'
                            , xhr.responseText.length > 500 
                                ? xhr.responseText.substr( 0, 50 ) 
                                    + ' ... '
                                    + xhr.responseText.substr( -100 ) 
                                : xhr.responseText
                        );
                        break;
                }
            };
            xhr.open( 'POST', 'http://258i.com/phpapp/compressed-request.php' );
            xhr.setRequestHeader( 'Content-Encoding', encoding );
            xhr.send( content ); 
        }

    })();

</div>
<div class="test-panel">
</div>
</div>



### S端

    <?php

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Expose-Headers: Content-Encoding');
    header('Access-Control-Allow-Headers: Content-Encoding');

    $encoding = $_SERVER[ 'HTTP_CONTENT_ENCODING' ];
    $raw_body = file_get_contents( 'php://input' );

    $body = '';
    switch( $encoding ) {
        case 'gzip':
            // <https://stackoverflow.com/questions/9801908/php-call-to-undefined-function-gzdecode>
            $body = gzinflate( substr( $raw_body, 10, -8 ) );
            break;
        case 'deflate':
            $body = gzinflate( substr( $raw_body, 2, -4 ) );
            break;
        case 'deflate-raw':
            $body = gzinflate( $raw_body );
    }

    echo '---' . $body . '---' . "\n";
    echo 'raw-body-length: ' . strlen( $raw_body ) . "\n";
    echo 'real-body-length: ' . strlen( $body ) . "\n";




## 浏览器端示例

摘自：<https://imququ.com/post/how-to-compress-http-request-body.html>

	var rawBody = 'content=test';
	var rawLen = rawBody.length;

	var bufBody = new Uint8Array(rawLen);
	for(var i = 0; i < rawLen; i++) {
		bufBody[i] = rawBody.charCodeAt(i);
	}

	var format = 'gzip'; // gzip | deflate | deflate-raw
	var buf;

	switch(format) {
		case 'gzip':
			buf = window.pako.gzip(bufBody);
			break;
		case 'deflate':
			buf = window.pako.deflate(bufBody);
			break;
		case 'deflate-raw':
			buf = window.pako.deflateRaw(bufBody);
			break;
	}

	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/node/');

	xhr.setRequestHeader('Content-Encoding', format);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

	xhr.send(buf);





