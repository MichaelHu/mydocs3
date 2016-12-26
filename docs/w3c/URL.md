# URL

> The URL Standard defines URLs, domains, IP addresses, the `application/x-www-form-urlencoded` format, and their `API`.

* w3c: <https://www.w3.org/TR/2014/WD-url-1-20141209/>


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>


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

