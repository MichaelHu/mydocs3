# lz-string

> Javascript compression, fast!

* 设计目标：支持在`localStorage`中存储大数据量，一种字符串压缩
* site: <http://pieroxy.net/blog/pages/lz-string/index.html>
* github: <https://github.com/pieroxy/lz-string/>
* demo: <http://pieroxy.net/blog/pages/lz-string/demo.html>
* 比较库：LZW, LZMA, GZip

<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/build/lz-string/libs/lz-string.min.js"></script>
<script src="http://258i.com/static/build/lz-string/libs/base64-string.js"></script>


## 安装

    npm install lz-string
    lz-string input.txt > output.txt

or 

    <script src="http://258i.com/static/build/lz-string/libs/lz-string.min.js"></script>
    <script src="http://258i.com/static/build/lz-string/libs/base64-string.js"></script>


## APIs

    LZString.compress( String ) 
    LZString.decompress( compressedString )

    LZString.compressToUint8Array( String )
    LZString.decompressFromUint8Array( Uint8Array )

    LZString.compressToUTF16( String )
    LZString.decompressFromUTF16( String )

    LZString.compressToBase64( String )
    LZString.decompressFromBase64( String )

    LZString.compressToEncodedURIComponent( String )
    LZString.decompressFromEncodedURIComponent( String )

    // 只是用另一种编码，达到更小尺寸
    Base64String.compress( String )
    Base64String.decompress( String )


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





### compress

<div id="test_compress" class="test">
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_compress');
        var content = window.ascii;
        var content = window.ascii_long_repeated;
        var content = window.unicode_long_repeated;
        s.show( 'start compressing ...' );
        var compressed = LZString.compress( content );
        var decompressed = LZString.decompress( compressed );
        s.append_show( 'input', content );
        s.append_show( 'compressed', compressed );
        s.append_show( 'decompressed', decompressed );
        s.append_show( 'compress ratio'
            , compressed.replace( /[^\u0000-\u00ff]/g, 'aa' ).length 
                / content.replace( /[^\u0000-\u00ff]/g, 'aa' ).length 
        );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


### compressToUint8Array

<div id="test_compressToUint8Array" class="test">
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_compressToUint8Array');
        var content = window.ascii;
        var content = window.ascii_long_repeated;
        var content = window.unicode_long_repeated;
        s.show( 'start compressing ...' );
        var compressed = LZString.compressToUint8Array( content );
        var decompressed = LZString.decompressFromUint8Array( compressed );
        s.append_show( 'compressed', compressed );
        s.append_show( 'decompressed', decompressed );
        s.append_show( 'compress ratio'
            , compressed.length 
                / content.length 
        );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




### compressToUTF16

<div id="test_compressToUTF16" class="test">
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_compressToUTF16');
        var content = window.ascii;
        var content = window.ascii_long_repeated;
        var content = window.unicode_long_repeated;
        s.show( 'start compressing ...' );
        var compressed = LZString.compressToUTF16( content );
        var decompressed = LZString.decompressFromUTF16( compressed );
        s.append_show( 'compressed', compressed );
        s.append_show( 'decompressed', decompressed );
        s.append_show( 'compress ratio'
            , compressed.replace( /[^\u0000-\u00ff]/g, 'aa' ).length 
                / content.replace( /[^\u0000-\u00ff]/g, 'aa' ).length 
        );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




### compressToEncodedURIComponent

<div id="test_compressToEncodedURIComponent" class="test">
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_compressToEncodedURIComponent');
        var content = window.ascii;
        var content = window.ascii_long_repeated;
        var content = window.unicode_long_repeated;
        s.show( 'start compressing ...' );
        var compressed = LZString.compressToEncodedURIComponent( content );
        var decompressed = LZString.decompressFromEncodedURIComponent( compressed );
        s.append_show( 'compressed', compressed );
        s.append_show( 'decompressed', decompressed );
        s.append_show( 'compress ratio'
            , compressed.replace( /[^\u0000-\u00ff]/g, 'aa' ).length 
                / content.replace( /[^\u0000-\u00ff]/g, 'aa' ).length 
        );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




### compressToBase64

<div id="test_compressToBase64" class="test">
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_compressToBase64');
        var content = window.ascii;
        var content = window.ascii_long_repeated;
        var content = window.unicode_long_repeated;
        s.show( 'start compressing ...' );
        var compressed = LZString.compressToBase64( content );
        var decompressed = LZString.decompressFromBase64( compressed );
        s.append_show( 'compressed', compressed );
        s.append_show( 'decompressed', decompressed );
        s.append_show( 'compress ratio'
            , compressed.replace( /[^\u0000-\u00ff]/g, 'aa' ).length 
                / content.replace( /[^\u0000-\u00ff]/g, 'aa' ).length 
        );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



## 性能

For performace comparison, I use LZMA level 1 as a comparison point.

* For strings smaller than 750 characters, this program is 10x faster than LZMA level 1. It produces smaller output.
* For strings smaller than 100 000 characters, this program is 10x faster than LZMA level 1. It produces bigger output.
* For strings bigger than 750 000 characters, this program is slower than LZMA level 1. It produces bigger output.


## 其他语言实现

### Java实现
> 只支持lz-string 1.3.3版本
* Diogo Duailibe did an implementation in Java:
	<https://github.com/diogoduailibe/lzstring4j>
* Another implementation in Java, with base64 support and better performances by rufushuang
	<https://github.com/rufushuang/lz-string4java>

### C#实现
* Jawa-the-Hutt did an implementation in C#:
	<https://github.com/jawa-the-hutt/lz-string-csharp>
* kreudom did another implementation in C#, more up to date:
	<https://github.com/kreudom/lz-string-csharp>

### PHP实现
* nullpunkt released a php version:
	<https://github.com/nullpunkt/lz-string-php>

### Python 3实现
* eduardtomasek did an implementation in python 3:
	<https://github.com/eduardtomasek/lz-string-python>

### Go实现
* I helped a friend to write a Go implementation of the decompression algorithm:
	<https://github.com/pieroxy/lz-string-go>

### Elixir实现
* Here is an Elixir version, by Michael Shapiro:
	<https://github.com/koudelka/elixir-lz-string>

### C++实现
* Here is a C++/Qt version, by AmiArt:
	<https://github.com/AmiArt/qt-lzstring>

