# js-md5



<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>

<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="./js/blueimp-md5.js"></script>


## blueimp-md5

<https://github.com/blueimp/JavaScript-MD5>


### demo

<div id="test_md5" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_md5');
        s.show( 'testing md5 ...\n' );
        s.append_show( md5('') );
        s.append_show( md5('1') );
        s.append_show( md5('12') );
        s.append_show( md5('123') );
        s.append_show( md5('1234') );
        s.append_show( md5('12345') );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


### performance 


<div id="test_md5_perf" class="test">
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_md5_perf');
        var kase = '';
        var maxTimes = 1000;
        var md5s = [];
        var startTime = new Date();
        var endTime;

        for ( var i = 0; i < maxTimes; i++ ) {
            kase += '' + i;
            md5s.push( {
                str: kase
                , md5: md5( kase )
            } );
        }
        endTime = new Date();

        s.show( 'md5 performance:' );
        s.append_show( 'cases: ' + maxTimes + ', time consumed: ' +  ( endTime - startTime ) );
        s.append_show( '\npart of case output are listed below: ' );

        for ( i = 0; i < maxTimes; i++ ) {
            if ( i < 5 || i > maxTimes - 2 ) {
                s.append_show( md5s[ i ] );
            } 
        }

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



### balance test


<div id="test_md5_balance" class="test">
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_md5_balance');
        var kase = '';
        var maxTimes = 1000;
        var md5s = [];
        var md5Str, mod = 5, modResult, modResults = {};

        for ( var i = 0; i < maxTimes; i++ ) {
            // kase += '' + i;
            kase = Math.random() + '' +  i;
            md5Str = md5( kase );
            modResult = compute( md5Str ) % mod;
            modResults[ modResult ] = modResults[ modResult ] || 0;
            modResults[ modResult ]++;

            md5s.push( {
                str: kase
                , md5: md5Str
                , part: modResult 
            } );
        }

        s.show( 'testing md5 balance: ' );

        for ( i = 0; i < maxTimes; i++ ) {
            if ( i < 5 || i > maxTimes - 2 ) {
                s.append_show( md5s[ i ] );
            }
        }

        s.append_show( 'balance statistics: ' );
        s.append_show( modResults );

        function compute( md5Str ) {
            var part = md5Str.substr( 0 )
                , ret = 0
                ;

            for ( var i = 0; i < part.length; i++ ) {
                ret += part.charCodeAt( i );
            }
            return ret;
        }

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>

