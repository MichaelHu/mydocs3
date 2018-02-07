# URL

> The URL Standard defines URLs, domains, IP addresses, the `application/x-www-form-urlencoded` format, and their `API`.


## Resources

* living standard: <https://url.spec.whatwg.org/> 
* w3c ( discontinued ): <https://www.w3.org/TR/url-1/>
* RFC3986: <https://tools.ietf.org/html/rfc3986>
* RFC3987: <https://tools.ietf.org/html/rfc3987>
* `data URIs`: <https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs>
* base64: <ref://../encoding/base64.md.html>                   
* `nginx`: <ref://../webserver/nginx.md.html>



<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>


## IDL

    [Constructor(USVString url, optional USVString base),
     Exposed=(Window,Worker)]
    interface URL {
        stringifier attribute USVString href;
        readonly attribute USVString origin;
               attribute USVString protocol;
               attribute USVString username;
               attribute USVString password;
               attribute USVString host;
               attribute USVString hostname;
               attribute USVString port;
               attribute USVString pathname;
               attribute USVString search;
        [SameObject] readonly attribute URLSearchParams searchParams;
               attribute USVString hash;

        USVString toJSON();
    };

## demo


<div id="test_URL" class="test">
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_URL');
        var url = new URL( 'http://hudamin:ddd@example.com:8000/abc?m=3&d=abc#index' );
        s.show( 'testing URL:\n' );
        for ( var i in url ) {
            s.append_show( i + ': ' + url[ i ] );
        }

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


## URLSearchParams class

> 使用方式：`url.searchParams`

### IDL

    [Constructor(optional (sequence<sequence<USVString>> or record<USVString, USVString> or USVString) init = ""),
        Exposed=(Window,Worker)]
    interface URLSearchParams {
        void append(USVString name, USVString value);
        void delete(USVString name);
        USVString? get(USVString name);
        sequence<USVString> getAll(USVString name);
        boolean has(USVString name);
        void set(USVString name, USVString value);

        void sort();

        iterable<USVString, USVString>;
        stringifier;
    };

### Examples

    const url = new URL("https://example.org/?q=🏳️‍🌈&key=e1f7bc78");
    url.searchParams.sort();
    url.search; // "?key=e1f7bc78&q=%F0%9F%8F%B3%EF%B8%8F%E2%80%8D%F0%9F%8C%88"



## data URLs

* `data-URIs` - MDN <https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs>
* RFC 2397 - <https://tools.ietf.org/html/rfc2397>，并不是一个新概念，`1998`年就已经出RFC文档了

### Syntax
    
    data:[<mediatype>][;base64],<data>

### Tips

* 总是使用`data:`作为前缀
* `mediatype`: the optional `MIME` type string, such as `image/jpeg`, `application/xhtml+xml`, etc. Defaults to `text/plain;charset=US-ASCII`
* 可选的base64标识：`;base64`，用于标识后面的数据部分是否为base64格式
* 数据本身，使用`,`与前面的字段分开，如果所在上下文不支持直接的文本格式，则可以使用base64格式

### Examples 

    # Simple text/plain data
    data:,Hello%2C%20World!

    # base64-encoded version of the above
    data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D

    # An HTML document with <h1>Hello, World!</h1>
    data:text/html,%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E

    # An HTML document that executes a JavaScript alert. Note that the closing script tag is required.
    data:text/html,<script>alert('hi');</script>

    # 文本形式的xhtml文档
    data:application/xhtml+xml,<div xmlns="http://www.w3.org/1999/xhtml"><style>:root { background: green; } html { background: red !important; }</style></div>

    # base64形式的xhtml文档
    data:application/xhtml+xml;base64,PGRpdiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCI+PHN0eWxlPjpyb290IHsgYmFja2dyb3VuZDogZ3JlZW47IH0gaHRtbCB7IGJhY2tncm91bmQ6IHJlZCAhaW1wb3J0YW50OyB9PC9zdHlsZT48L2Rpdj4=


以下例子展示在链接中打开data URI的内容：

    @[data-script="html editable"]<a
        href="data:application/xhtml+xml;base64,PGRpdiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCI+PHN0eWxlPjpyb290IHsgYmFja2dyb3VuZDogZ3JlZW47IH0gaHRtbCB7IGJhY2tncm91bmQ6IHJlZCAhaW1wb3J0YW50OyB9PC9zdHlsZT48L2Rpdj4=" 
        target="_blank">
        link to a XHTML file represented by data URI
    </a>


### encode & decode

参考 base64 <ref://../encoding/base64.md.html>: `atob(), btoa(), uuencode/uudecode`


