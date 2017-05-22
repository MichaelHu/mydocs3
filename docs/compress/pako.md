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

## 特点

* 支持`DEFLATE、ZLIB、GZIP`
* 使用广泛，是`jszip`(<ref://./jszip.md.html>)的底层库


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



## Demo


<div id="test_PH" class="test">
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_PH');
        var content = 'Hello, world!';
        s.show( 'start deflating ...' );
        test( 'HHHHHHHHHHHHHHHHHHHHH' );
        test( '好好好好好好好好好好好' );
        function test( content ) {
            s.append_show( '\ninput', content );
            s.append_show( 'deflated array', pako.deflate( content ) );
            s.append_show( 'deflated string', pako.deflate( content, { to: 'string' } ) );
            s.append_show( 'inflated array', pako.inflate( pako.deflate( content ) ) );
            s.append_show( 'inflated string', pako.inflate( pako.deflate( content ), { to: 'string' } ) );
            s.append_show( 'inflated string'
                , pako.inflate( pako.deflate( content, { to: 'string' } ), { to: 'string' } ) );
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



## 浏览器端示例

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



