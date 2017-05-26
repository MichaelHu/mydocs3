# lzma

> Lempel-Ziv-Markov ( LZMA ) chain compression algorithm

* github: <https://github.com/LZMA-JS/LZMA-JS>
* `异步方式`执行压缩

<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/build/lzma/lzma-min.js"></script>



## 安装

    npm install lzma
    bower install lzma

or 
    
    <script src="http://258i.com/static/build/lzma/lzma-min.js"></script>


## APIs

    var lzma = new LZMA();

    // asynchronously
    lzma.compress( 
        String | Uint8Array
        , mode // 1-9 ( 1 is fast and pretty good, 9 is slower and probably much better )
        , on_finish( result, error ) {}
        , on_progress( percent ) {} 
    )
    lzma.decompress( 
        Uint8Array
        , on_finish( result, error ) {}
        , on_progress( percent ) {} 
    )

    // synchronously
    result = lzma.compress( String | Uint8Array, mode )
    result = lzma.decompress( Uint8Array )


若需要使用非webworker方式，只需直接将`lzma_worker.js`引入，此时会创建一个`LZMA`对象，可`直接调用`LZMA对象的两个方法`compress, decompress`，接口同上。

    
## 基本用法

### 异步 + worker模式

<div id="test_PH" class="test">
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_PH');
        var lzma = new LZMA( 'http://258i.com/static/build/lzma/lzma_worker.js' );
        var content = 'Hello, world!';
        var content = 'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH';
        var content = '好好好好好好好好好好好好好好好好好好好好';
        var compressed, decompressed;

        lzma.compress( content, 1, function( result, error ){
            compressed = result;
            s.append_show( compressed );
            lzma.decompress( compressed, function( result, error ) {
                decompressed = result;
                s.append_show( decompressed );
                s.append_show( 
                    'compress ratio'
                    , compressed.length 
                        / content.replace( /[^\u0000-\u00ff]/g, 'aa' ).length 
                );
            } );
        } );

        s.show(1);
        s.append_show(2);

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




