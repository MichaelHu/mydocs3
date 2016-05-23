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



## CSSOM部分相关扩展 


> <http://www.w3.org/TR/cssom-view-1/>


`window`扩展：

1. [非CSSOM扩展] window.getComputedStyle(element)
2. [viewport] window.innerWidth
3. [viewport] window.innerHeight
4. [viewport scrolling] window.scrollX 
5. [viewport scrolling] window.scrollY 
6. [viewport scrolling] window.pageXOffset 
7. [viewport scrolling] window.pageYOffset 
11. [client] window.screenX
12. [client] window.screenY
13. [client] window.outerWidth
14. [client] window.outerHeight
15. [client] window.devicePixelRatio
8. [viewport scrolling] window.scroll() 
9. [viewport scrolling] window.scrollTo() 
10. [viewport scrolling] window.scrollBy() 



`element`扩展：

1. element.getClientRects()
2. element.getBoundingClientRect()
3. element.scrollIntoView()
7. element.scrollTop
8. element.scrollLeft
9. [readonly] element.scrollWidth
10. [readonly] element.scrollHeight
11. [readonly] element.clientTop
12. [readonly] element.clientLeft
13. [readonly] element.clientWidth
14. [readonly] element.clientHeight
4. element.scroll()
5. element.scrollTo()
6. element.scrollBy()



<div id="test_60" class="test" style="position:relative; border: 1px solid red;">
<div class="test-console" style="border: 1px solid green;"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        setTimeout(function(){

            var s = fly.createShow('#test_60')
                , st = window.getComputedStyle($('#test_60 .test-console')[0])
                , list
                , element
                ;
            s.show('getComputedStyle(): ');
            list = [
                'width'
                , 'height'
                , 'padding-left'
                , 'margin-left'
                , 'position'
                , 'left'
                , 'color'
                , 'background'
                , 'font'
            ];
            list.forEach(function(item){
                s.append_show('st["' + item + '"]', st[item]); 
            });

            list = [
                'innerWidth'
                , 'innerHeight'
                , 'scrollX'
                , 'scrollY'
                , 'pageXOffset'
                , 'pageYOffset'
                , 'screenX'
                , 'screenY'
                , 'outerWidth'
                , 'outerHeight'
                , 'devicePixelRatio'
            ];

            s.append_show('\nwindow extensions: ');
            list.forEach(function(item){
                s.append_show('window.' + item, window[item]); 
            });

            list = [
                'scrollTop'
                , 'scrollLeft'
                , 'scrollWidth'
                , 'scrollHeight'
                , 'clientTop'
                , 'clientLeft'
                , 'clientWidth'
                , 'clientHeight'
            ];

            s.append_show('\nelement extensions: ');
            element = $('#test_60 .test-console')[0];
            list.forEach(function(item){
                s.append_show('element.' + item, element[item]); 
            });


            s.append_show('\ngetClientRects() & getBoundingClientRect(): ');
            s.append_show(
                objectParse($('#test_60 .test-console')[0].getClientRects())
            );
            s.append_show(
                objectParse($('#test_60 .test-console')[0].getBoundingClientRect())
            );

            function objectParse(obj){
                var ret = {};
                if(typeof obj == 'object'){
                    for(var i in obj){
                        ret[i] = objectParse(obj[i]);
                    }
                }
                else {
                    ret = obj;
                }
                return ret;
            }

        }, 1000);

    })();

</div>
<div class="test-panel">
</div>
</div>





## JSON.stringify

    JSON.stringigy(document.body.getBoundingClientRect())

`Safari`能输出`ClientRect`类型对象的内部内容，而`Chrome`只输出空对象`"{}"`。
这也是上方`objectParse()`方法存在的原因，能保证`Chrome`能输出其内容。


