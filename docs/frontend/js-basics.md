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
            s.append_show(items[i], typeof items[i]);
        }

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


## 一般等式

    null == undefined
    0 == ''
    false == 0
    false == ''


## TRUE表达式

    !null
    !void 0
    !undefined
    !0
    !''


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


