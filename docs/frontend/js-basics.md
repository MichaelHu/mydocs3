# js basics



<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>


## references

* ECMA-262: <ref://../ecma/ecma-262.md.html>
* MDN: <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide>
* `awesome-javascript`: 「大而全」的各类js库集合 <https://github.com/sorrycc/awesome-javascript> <iframe src="http://258i.com/gbtn.html?user=sorrycc&repo=awesome-javascript&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>  

## 算符优先级

`单乘加移小，等位与异或，与或三赋逗`


## typeof

`typeof`输出是`字符串`类型，输出为以下`7个`值之一：

* number
* string
* boolean
* object
* function
* undefined
* symbol

<div id="test_10" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_10');
        var items = [
            '1'
            , '"Hello, World!"'
            , 'true'
            , 'null'
            , 'undefined'
            , '[ 1, 2, 3]'
            , 'Array'
            , '{ name: "Michael" }'
            , 'new Object()'
            , 'function(){}'
            , 'new Number(1)'
            , 'new String("Hello")'
            , 'NaN'
            , 'Infinity'
        ];
        var str;
        s.show('typeofs: ');
        for(var i=0; i<items.length; i++){
            str = 'typeof ' + items[i]; 
            s.append_show(
                str
                , eval(str) 
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
    true == 1
    true != 100
    NaN != NaN

`注意`：`NaN`不能做比较，需要判断一个数是否为`非数字`，使用`isNaN()`；若要判断一个数是否为NaN，或许可以这么判断：
    
    function isExactlyNaN( num ) {
        return num !== num;
    }


<div id="test_20" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_20');
        var items = [
                [ 'null', 'undefined' ]
                , [ '0', '""' ]
                , [ 'false', '0' ]
                , [ 'false', '""' ]
                , [ '1', 'true' ]
                , [ '100', 'true' ]
                , [ 'NaN', 'NaN' ]
            ]
            , expr
            ;
        s.show('common equaltions test: \n');
        for(var i=0; i<items.length; i++){
            expr = items[i][0] + ' == ' + items[i][1]; 
            s.append_show(
                expr
                , eval(expr)
            );
        }

    })();

</div>
<div class="test-panel">
</div>
</div>


## null, false的数学计算

`null, false, true`可以`直接`参与数学运算，在计算过程中，它们分别代表：

    null = 0
    false = 0
    true = 1


<div id="test_null_false" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_null_false');
        var items = [
                [ 'null + 3', '3' ]
                , [ 'null - 3', '-3' ]
                , [ 'false + 3', '3' ]
                , [ 'false - 3', '-3' ]
                , [ 'true + 3', '4' ]
                , [ 'true - 3', '-2' ]
                , [ 'typeof( null + 3 )', '"number"' ]
            ]
            , expr
            ;
        s.show('strict equaltions test: \n');
        for(var i=0; i<items.length; i++){
            expr = items[i][0] + ' === ' + items[i][1]; 
            s.append_show(
                expr
                , eval(expr)
            );
        }

    })();

</div>
<div class="test-panel">
</div>
</div>


## use strict

### Resources

* 严格模式 - MDN <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode>
* Strict Mode Code - ES6 <https://www.ecma-international.org/ecma-262/6.0/#sec-strict-mode-code>
* Static Semantics: Early Errors - ES6 <https://www.ecma-international.org/ecma-262/6.0/#sec-identifiers-static-semantics-early-errors>


### Tips

* 是`可选择的`一个限制JavaScript的变体的一种方式，它不仅仅是一个子集：它故意地具有与正常代码不同的语义
* 消除了一些 JavaScript的`静默错误`，通过改变它们来`抛出错误`
* 修复了JavaScript引擎难以执行优化的错误，`提高编译器的效率`：有时候，严格模式代码可以比非严格模式的相同的代码运行得更快
* 严格模式禁用了在ECMAScript的`未来版本`中可能会定义的一些语法，担负`承接未来`的使命

### Features

* 作用域：`script标签`或`函数体`，在所有语句之前放置一个特定的语句：
        "use strict";
        // or
        'use strict';

* `将问题转化为错误`，比如变量拼写失误，而导致新创建了全局变量，这种问题会直接报错

    * 无法再意外创建全局变量

            "use strict";
                                   // 假如有一个全局变量叫做mistypedVariable
            mistypedVaraible = 17; // 因为变量名拼写错误
                                   // 这一行代码就会抛出 ReferenceError

    * 会使`静默失败`( silently failed )的赋值抛出异常

            "use strict";

            // 给不可写属性赋值
            var obj1 = {};
            Object.defineProperty(obj1, "x", { value: 42, writable: false });
            obj1.x = 9; // 抛出TypeError错误

            // 给只读属性赋值
            var obj2 = { get x() { return 17; } };
            obj2.x = 5; // 抛出TypeError错误

            // 给不可扩展对象的新属性赋值
            var fixed = {};
            Object.preventExtensions(fixed);
            fixed.newProp = "ohai"; // 抛出TypeError错误

    * 试图删除`不可删除的属性`，会抛出异常

            "use strict";
            delete Object.prototype; // 抛出TypeError错误

    * `重名属性`抛出异常，实际上这个限制在ES6中已经作为标准了
    * 函数参数名必须唯一，避免书写错误导致的代码问题
    * 禁止使用`"0"`开头的八进制数字，避免错误地使用八进制数。另外ES6中增加了`"0o"`开头的八进制数

            "use strict";
            var sum = 015 + // !!! 语法错误
                      197 +
                      142;
    * 禁止设置primitive值的属性。不采用严格模式，设置属性将会简单忽略(no-op)，采用严格模式，将抛出TypeError错误

            (function() {

                "use strict";

                false.true = "";              //TypeError
                (14).sailing = "home";        //TypeError
                "with".you = "far away";      //TypeError

            })();

* 简化变量的使用
    * 禁用with
    * eval不再为上层作用域引入变量
    * 禁止删除声明变量

            "use strict";

            var x;
            delete x; // !!! 语法错误

            eval("var y; delete y;"); // !!! 语法错误

* 让eval和arguments变得简单
    * eval和arguments不再能作为变量名
    * 不再支持`arguments.callee`

* 更`“安全的”`Javascript
    * `this`关键字，不再默认被封装为对象，除非显式指定，否则都为undefined
    * `func.caller`, `func.arguments`不再可用

* 为未来版本的ECMAScript铺平道路
    * 一部分字符变成了保留关键字，如下：

            implements, interface, let, package, private, protected, public, static和yield

    * 禁止了不在脚本或函数层面上的函数声明

            "use strict";
            if (true){
              function f() { } // !!! 语法错误
              f();
            }

            for (var i = 0; i < 5; i++){
              function f2() { } // !!! 语法错误
              f2();
            }

            function baz() { // 合法
              function eit() { } // 同样合法
            }


## 分号的省略

> JavaScript Semicolon Insertion - Everything you need to know <http://inimino.org/~inimino/blog/javascript_semicolons> 

除了`return, break, continue, throw, postfix increment and decrement`之外，其他的分号都可以放心省略

> `return {expr}` 语句，return和{expr}之间`不能`包含`换行`，否则等价于`return undefined`，如下：

<div id="test_semi_colon" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_semi_colon');

        // problematic
        function divideExactlyBy2_3_error( num ) {
            return 
                num % 3 == 0
                || num % 2 == 0
                ;
        }

        // ok
        function divideExactlyBy2_3_ok( num ) {
            return num % 3 == 0
                || num % 2 == 0
                ;
        }

        s.show( 'start testing ...' );
        s.append_show( 1, typeof divideExactlyBy2_3_error( 1 ) );
        s.append_show( 2, typeof divideExactlyBy2_3_error( 2 ) );
        s.append_show( 9, typeof divideExactlyBy2_3_error( 9 ) );
        s.append_show( 1, divideExactlyBy2_3_ok( 1 ) );
        s.append_show( 2, divideExactlyBy2_3_ok( 2 ) );
        s.append_show( 9, divideExactlyBy2_3_ok( 9 ) );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



## 浮点计算性能


<div id="test_js_float" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_js_float');
        var count = 100;

        s.show( 'integer vs float: ' + count );
        s.append_show( computeInteger( count ) );
        s.append_show( computeFloat( count ) );

        function getIntegers( count ) {
            var arr = [];
            var a, b;

            while ( count-- > 0 ) {
                a = Math.random() * 10000 | 0; 
                b = Math.random() * 10000 | 0;
                arr.push( [ a, b ] );
            }
            return arr;
        }

        function computeInteger( count ) {
            var a, b, i, item;
            var _ts1 = +new Date();
            var arr = getIntegers( count );
            var _ts2 = +new Date();

            _ts1 = _ts2 - _ts1;
            for ( i = 0; i < count; i++ ) {
                item = arr[ i ]; 
                a = item[ 0 ];
                b = item[ 1 ];
                // c = Math.sqrt( Math.pow( a, 2 ) + Math.pow( b, 2 ) );
                c = Math.pow( a, 2 ) + Math.pow( b, 2 );
                // c = a + b;
            }
            return { 
                ts1: _ts1
                , ts2: +new Date() - _ts2
            };
        }

        function getFloats( count ) {
            var arr = [];
            var a, b;

            while ( count-- > 0 ) {
                a = Math.random(); 
                b = Math.random();
                arr.push( [ a, b ] );
            }
            return arr;
        }

        function computeFloat( count ) {
            var a, b, i, item;
            var _ts1 = +new Date();
            var arr = getFloats( count );
            var _ts2 = +new Date();

            _ts1 = _ts2 - _ts1;
            for ( i = 0; i < count; i++ ) {
                item = arr[ i ]; 
                a = item[ 0 ];
                b = item[ 1 ];
                c = Math.sqrt( Math.pow( a, 2 ) + Math.pow( b, 2 ) );
            }
            return { 
                ts1: _ts1
                , ts2: +new Date() - _ts2
            };
        }

    })();

</div>
<div class="test-panel">
</div>
</div>


## try-catch

### 语法

> <https://tc39.github.io/ecma262/#sec-try-statement>

* `catch( e ) { ... }` 部分，类似`callback`定义，e闭包在catch块内的参数

<div id="test_try_catch" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_try_catch');

        var e = 123;
        try {
            e = 456;
            try {
                a.c
            }
            catch( e ) {
                s.append_show( 'inner error' );
                throw e;
            }
        }
        catch( e ) {
            s.append_show( 'outter error' );
        }
        s.append_show( e );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


### try-catch性能

> 循环测试，降低`6%-10%`的性能，并不会大幅拉低性能，所以某些场景下，还是值得大范围使用的

* <https://jsperf.com/try-catch-performance-overhead>
* <https://jsperf.com/try-catch-performance-jls/1>
* <https://jsperf.com/try-catch-performance-jls/2> `提前判断错误性能优于捕获错误`




## 调用堆栈和参数列表的最大长度

> todo

<https://www.cnblogs.com/bhlsheji/p/5377710.html>

    // Maximum Supported Arguments Length
    // CH34 124782
    // FF29 500000
    // SF7  65536

    // Maximum Call Stack Size
    // CH34 20926 in <script>, 20804 in console
    // FF29 21###(varies) in <script>, 49993 in console
    // SF7  43517 in <script>, 43509 in console




## window.onerror

处理`未被捕获`的异常，通过它可以设置一个异常处理函数。该函数接收`三个字符串类型`的参数。

    window.onerror = function( msg, url, line ) {
        console.log( 'ERROR: ' + msg + '\n' + url + ':" + line );
        return false;
    }

    // Mozilla firefox
    window.onerror = function( messageOrEvent, source, lineno, colno, error ) {
        ...
    }

`return false`告知浏览器已经处理完异常；但firefox是`return true`

三个参数的接口是全兼容的接口形式，新型浏览器实际上可以支持五个参数，新增`col`和`error`参数。
关于onerror的详细用法，可以参考<ref://./exception-report.md.html>


### Error

> ref: <http://www.ecma-international.org/ecma-262/6.0/index.html#sec-error-objects>

    Error( message )
        EvalError
        RangeError
        ReferenceError
        SyntaxError
        TypeError
        URIError




## 绝对等式

    typeof null === 'object'
    void 0 === undefined

数字判断：

    num === +num

IE9以下，`hasEnumBug`

<div id="test_25" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_25');
        var items = [
                [ 'typeof null', '"object"' ]
                , [ 'void 0', 'undefined' ]
                , [ '5', '+5' ]
                , [ '1', 'true' ]
                , [ 'Infinity', 'Infinity' ]
            ]
            , expr
            ;
        s.show('absolute equaltions test: \n');
        for(var i=0; i<items.length; i++){
            expr = items[i][0] + ' === ' + items[i][1]; 
            s.append_show(
                expr
                , eval(expr)
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
    !NaN
    !!Infinity




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

        s.append_show(
            '( 3.1415 & 0 )'
            , 3.1415 & 0 
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


## Object.assign

<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign>

    Object.assign( target, ...sources )

* `浅拷贝`
* 可能会有`TypeError`错误，比如目标对象同名属性是只读的


## Object.create

* es6: <http://www.ecma-international.org/ecma-262/6.0/index.html#sec-object.create>

        Object.create( O [, Properties ] )

* `O`必须为`Object或Null`，否则报`TypeError`，该参数作为新对象的`prototype`
* `Properties`为`可选`参数，其格式为：
        {
            fieldName1: filedDescriptor1
            , fieldName2: filedDescriptor2
        }
    其中`fieldDescriptor`同`Object.defineProperty`的第三个参数。
* `Object.create( null )`能确保每次调用，总能生成全新的对象，能避免使用字面量`"{}"`可能会被复用的问题，比如`Windows`下的Chrome


<div id="test_object_create" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_object_create');
        // 无原型链，无属性
        var obj1 = Object.create( null );
        s.show( 'test 1 ...' );
        s.append_show( obj1 );

        s.append_show( '\ntest 2 ...' );
        // 提供原型链继承
        var obj2 = Object.create( 
                { sayHello: function() { s.append_show( 'Hello, I\'m ' + this.name ); } }
                , { name: { value: 'hudamin', enumerable: true } } 
            );
        obj2.sayHello();
        for ( var i in obj2 ) {
            s.append_show( i );
        }

        s.append_show( '\ntest 3 ...' );
        // 继承数组原型链
        var obj3 = Object.create( 
                Array.prototype
                , { name: { value: 'hudamin', enumerable: true } }
            );
        s.append_show( obj3 );
        obj3.push( 'item 1' );
        s.append_show( obj3[ 0 ] );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>

    

## Object.keys

> 返回`EnumerableOwnNames( obj )`，作为一个数组返回。

可枚举属性prop的列表，且满足`obj.hasOwnProperty( prop ) === true`

todo




## Object.defineProperty

<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty>

    Object.defineProperty( obj, prop, descriptor )

### 数据描述符与存取描述符

    配置项              默认值
    ---------------------------------------
    公共：
    configurable        false
    enumerable          false

    数据描述符独有：
    value               undefined
    writable            false

    存取描述符独有：
    get                 undefined
    set                 undefined

### 示例 

* 设置`只读属性`的值，`非严格模式`下不会抛出异常，`严格模式`下则抛出异常

<div id="test_defineProperty" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_defineProperty');
        var obj = {};

        s.show( 'testing defineProperty ...' );

        Object.defineProperty( obj, 'id', { value: 37 } );
        s.append_show( '获取属性id', obj.id );
        obj.id = 2;
        s.append_show( '只读属性id不可改变，只能获取属性id的原值', obj.id );

        Object.defineProperty( obj, 'name', { value: 'Michael', writable: true } );
        s.append_show( '\n获取属性name', obj.name );
        obj.name = 'Even';
        s.append_show( '可写属性name可改变，获取到新值', obj.name );

        obj._age = 0;
        Object.defineProperty( obj, 'age', { 
            set: function( age ) {
                if ( age >=0 && age <= 150 ) {
                    this._age = age;
                }
            }
            , get: function( age ) {
                return this._age;
            }
        } );
        s.append_show( '\n获取属性age值', obj.age );
        obj.age = 35;
        s.append_show( '设置一个合理的值，获取属性age的新值', obj.age );
        obj.age = 350;
        s.append_show( '设置一个不合理的值，只能获取属性age的原值', obj.age );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>






## 匿名函数

> 以下a, b两种写法，目前来看是`等价的`。

<div id="test_anonymous_func" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_anonymous_func');

        var tool = {
                a: function() {
                    return this.value;
                }
                , b: function b() {
                    return this.value;
                }
            }
            , obj = { value: 10 }  
            ;

        s.show( tool.a.apply( obj ) );
        s.append_show( tool.b.apply( obj ) );
        s.append_show( 'typeof b', typeof b );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



## Array sort

    Array.prototype.sort( sortBy )

* sortBy： `sortBy( a, b )`，需要返回一个数字，而不是布尔值
* 如果`返回a - b`，则`由小到大`排序；`返回b - a`，则`由大到小`排序



## arguments是Array-like的

    ( function() {
        console.log( arguments );
    } )();

`output`:

    []


## 正则表达式之转义序列
> 详细查看：<ref://../encoding/character-escape.md.html>

1. `\ooo`: 八进制数ooo规定的字符
2. `\xhh`: 十六进制数hh规定的字符
3. `\uhhhh`:十六进制数hhhh规定的Unicode字符



## CSSOM部分相关扩展 

参考：<ref://../w3c/cssom.md.html>



## JSON.stringify

### Resources

* ecma 262: <https://tc39.github.io/ecma262/#sec-json-object>
* MDN: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify>


### Syntax

    JSON.stringify( value[, replacer[, space]] )

* `value` - object, array, string, boolean, number, null
* `replacer` - function( key, value ) { ... }, array, null
* `space` - number, string

### Tips

* `space`参数`必须作为第三个参数`才会生效
* replacer参数或者为函数，或者为数组，或者为null
    * 作为`函数`时，接收key, value参数，返回对应value的值
    * 作为`数组`时，指定需要输出的字段名称
    * 作为`null`时，表示输出所有字段
* 以下调用：

        JSON.stringigy(document.body.getBoundingClientRect())

    `Safari`能输出`ClientRect`类型对象的内部内容，而`Chrome`只输出空对象`"{}"`。
    这也是上方`objectParse()`方法存在的原因，能保证`Chrome`能输出其内容。

### Examples

    JSON.stringify( value )
    {"nodes":[{"id":1,"name":"node1"},{"id":2,"name":"node2"}],"edges":[{"id":100,"name":"edge1","source":1,"target":2}]}

    JSON.stringify( value, [ 'nodes' ] )
    {"nodes":[{},{}]}

    JSON.stringify( value, [ 'nodes', 'id' ] )
    {"nodes":[{"id":1},{"id":2}]}

    JSON.stringify( value, [ 'nodes', 'id' ], 4 )
    {
        "nodes": [
            {
                "id": 1
            },
            {
                "id": 2
            }
        ]
    }

    JSON.stringify( value, function( key, value ) { if ( typeof value == 'number' ) return 'is a number'; else return value; }, 4 )
    {
        "nodes": [
            {
                "id": "is a number",
                "name": "node1"
            },
            {
                "id": "is a number",
                "name": "node2"
            }
        ],
        "edges": [
            {
                "id": "is a number",
                "name": "edge1",
                "source": "is a number",
                "target": "is a number"
            }
        ]
    }




## hasOwnProperty() 与 in 操作符

> <http://www.ecma-international.org/ecma-262/6.0/#sec-own-property>


### hasOwnProperty()

* `own property`: property that is directly contained by its object
* `inherited property`: property of an object that is not an own property but is a property (either own or inherited) of the object’s prototype

### in operator 

The production RelationalExpression : RelationalExpression in ShiftExpression is evaluated as follows:
1. Let `lref` be the result of evaluating RelationalExpression.
2. Let `lval` be GetValue(lref).
3. Let `rref` be the result of evaluating ShiftExpression.
4. Let `rval` be GetValue(rref).
5. If Type(rval) is not Object, throw a TypeError exception.
6. Return the result of calling the `[[HasProperty]]` `internal` method of rval with argument ToString(lval).

`in`使用的是内部方法`hasProperty()`，包含继承而来的属性。

<div id="test_90" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_90')
            , obj1 = {name: 'hudamin'}
            ;

        s.show('hasOwnProperty(): ');
        s.append_show(obj1.hasOwnProperty('name'));

        function Person(name, age, sex){
            this.name = name;
            this.age = age;
            this.sex = sex;
        }

        Person.prototype.sayHello = function(){
            s.append_show(this.name, this.age, this.sex);
        }

        function Student(name, age, sex, score){
            Person.call(this, name, age, sex);
            this.score = score;
        }

        Student.prototype = new Person();
        Student.prototype.constructor = Student;
        Student.prototype.sayHello = function(){
            Person.prototype.sayHello.apply(this);
            s.append_show(this.score);
        }


        var obj2 = new Student('hudamin', 20, 'male', 100)
            , list = ['name', 'sayHello', 'sayYes']
            , wrapper = {Person: Person, Student: Student}
            ;

        s.append_show('\nsayHello:');
        obj2.sayHello();
        obj2.sayYes = function(){
            s.append_show('YES!');
        };

        s.append_show('\n');
        list.forEach(function(key){
            s.append_show(
                'obj2.hasOwnProperty("' + key + '")'
                , obj2.hasOwnProperty(key)
            );
        });

        s.append_show('\nin operator:');

        var props = []
            , ownProps = [];
        for(var i in obj2){
            props.push(i); 
            if(obj2.hasOwnProperty(i)){
                ownProps.push(i);
            }
        }
        s.append_show('property', props);
        s.append_show('own property', ownProps);

        s.append_show('\ninstanceof operator');
        list = ['Student', 'Person'];
        list.forEach(function(item){
            s.append_show(
                'obj2 instanceof ' + item
                , obj2 instanceof wrapper[item]
            );
        });

    })();

</div>
<div class="test-panel">
</div>
</div>


## Fundamental Objects

<http://www.ecma-international.org/ecma-262/6.0/#sec-fundamental-objects>

    Object.assign(target, ...sources)
    Object.create(O [, Properties ])
    Object.defineProperties(O, Properties)
    Object.defineProperty(), P, Attributes)
    Object.freeze(O)
    Object.getOwnPropertyDescriptor(O, P)
    Object.getOwnPropertyNames(O)
    Object.getOwnPropertySymbols(O)
    Object.getPrototypeOf(O)
    Object.is(value1, value2)
    ...






## blob

    RenderingContext.toBlob()
    FileAPI

## Float32Array



