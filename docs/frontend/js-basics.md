# js basics



<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>


## 绝对等式

    typeof null === 'object'
    void 0 === undefined

数字判断：

    num === +num

IE9以下，hasEnumBug


## typeof

`typeof`输出是`字符串`类型，有以下一些值：

* number
* string
* boolean
* object
* function
* undefined

<div id="test_10" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_10');
        var items = [
            1
            , 'Hello, World!'
            , true 
            , null
            , undefined
            , [ 1, 2, 3]
            , Array
            , { name: 'Michael' }
            , new Object()
            , function(){}
            , new Number(1) 
            , new String('Hello')
        ];
        s.show('typeofs: ');
        for(var i=0; i<items.length; i++){
            s.append_show(
                'typeof ' + (
                    typeof items[i] == 'function' 
                    ? items[i].toString() 
                        : JSON.stringify( items[i] ) 
                )
                , typeof items[i]
            );
        }

    })();

</div>
<div class="test-panel">
</div>
</div>


## 一般等式

    null == undefined
    0 == ''
    false == 0
    false == ''


<div id="test_20" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_20');
        var items = [
            [null, undefined]
            , [0, '']
            , [false, 0]
            , [false, '']
        ];
        s.show('common equations: ');
        for(var i=0; i<items.length; i++){
            s.append_show(
                items[i][0] + ' == ' + JSON.stringify(items[i][1])
                , items[i][0] == items[i][1] 
            );
        }

    })();

</div>
<div class="test-panel">
</div>
</div>


## TRUE表达式

    !null
    !void 0
    !undefined
    !0
    !''


## 位运算符

`~a`相当于

    var b = -a;
    b = b -1;

<div id="test_30" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_30');
        s.show('bit-wise operations: ');

        s.append_show(
            '~5'
            , ~5    
        );

        s.append_show(
            '~0'
            , ~0    
        );

        s.append_show(
            '~-1'
            , ~-1    
        );

        s.append_show(
            '( 3.1415 | 0 )'
            , 3.1415 | 0 
        );

    })();

</div>
<div class="test-panel">
</div>
</div>


## Object.prototype.toString.call(obj)

注意`不是Object.toString`，该toString来自`Function.prototype.toString`

    function(){}    [object Function]
    []              [object Array]
    10              [object Number]



## arguments是Array-like的

    (function(){
        console.log(arguments);
    })();

`output`:

    []


## 正则表达式之转义序列

1. `\xxx`: 八进制数xxx规定的字符
2. `\xdd`: 十六进制数dd规定的字符
3. `\uxxxx`:十六进制数xxxx规定的Unicode字符


