# URL

> The URL Standard defines URLs, domains, IP addresses, the `application/x-www-form-urlencoded` format, and their `API`.

* living standard: <https://url.spec.whatwg.org/> 
* w3c ( discontinued ): <https://www.w3.org/TR/url-1/>
* RFC3986: <https://tools.ietf.org/html/rfc3986>
* RFC3987: <https://tools.ietf.org/html/rfc3987>



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
