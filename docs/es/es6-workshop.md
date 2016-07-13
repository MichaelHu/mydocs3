# es6 workshop


 <img src="./img/Ecma_RVB-003.jpg" height="60">

## 初识es2015

6.0版： <http://www.ecma-international.org/ecma-262/6.0/>

5.0及以前版本： <http://www.ecmascript.org>

教程： <http://es6.ruanyifeng.com>

在线js编译： <https://babeljs.io/repl/>

Babel-core options说明： <http://babeljs.io/docs/usage/options/>



<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
textarea {
    width: 100%;
    height: 200px;
}
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/build/babel/babel.min.js"></script>




## cbScriptBlock回调

以下代码针对`compile-es2015`代码块提供编辑后的处理逻辑，将es2015代码块进行编译输出。

    @[data-script="javascript"]function cbScriptBlock(block, scriptType) {
        var $block = $(block)
            , wrapperID = $block.closest('.test').attr('id')
            , s = fly.createShow('#' + wrapperID)
            ;
        
        if(scriptType.indexOf('compile-es2015') > -1
            || scriptType.indexOf('compile-react') > -1){
            try {
                var code = Babel.transform(
                        $block.text()
                        , {presets: ['es2015', 'react']}
                    ).code;
                s.show('compiled to es5: ');
                s.append_show('');
                s.append_show(code);
            }
            catch (e) {
                s.show(e);
            }
        } 
    }






## let & const 命令


<div id="test_10" class="test">
<div class="test-container">

    @[data-script="compile-es2015 editable"](function(){
        let a = 5;
        const b = 6;

        const d = Symbol(123);
    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



## Destructuring（解构）


### 数组解构赋值

对象解构赋值：变量必须与属性同名，才能取到正确的值

<div id="test_20" class="test">
<div class="test-container">

    @[data-script="compile-es2015 editable"](function(){

        var { bar, foo } = { foo: "aaa", bar: "bbb" };
        foo // "aaa"
        bar // "bbb"

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>

如果变量名与属性名不一致，必须写成下面这样：

<div id="test_30" class="test">
<div class="test-container">

    @[data-script="compile-es2015 editable"](function(){

        var { foo: baz } = { foo: "aaa", bar: "bbb" };
        baz // "aaa"

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



### 字符串解构赋值：

<div id="test_40" class="test">
<div class="test-container">

    @[data-script="compile-es2015 editable"](function(){
        const [a, b, c, d, e] = 'hello';
        a // "h"
        b // "e"
        c // "l"
        d // "l"
        e // "o"
    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>





### 数字和布尔值的解构

解构过程中，如果等号右边是数值和布尔值，则会先转为对象

<div id="test_50" class="test">
<div class="test-container">

    @[data-script="compile-es2015 editable"](function(){
        let {toString: a} = 123;
        a === Number.prototype.toString // true

        let {toString: b} = true;
        b === Boolean.prototype.toString // true
    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




### 函数参数的解构赋值：

<div id="test_60" class="test">
<div class="test-container">

    @[data-script="compile-es2015 editable"](function(){
        function add([x, y]){
              return x + y;
        }

        add([1, 2]) // 3
    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


圆括号的使用： 

* （1）变量声明语句中，不能带有圆括号。
* （2）函数参数中，模式不能带有圆括号。
* （3）赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中。

赋值语句的非模式部分，可以使用圆括号。



## 解构的用途

### 交换变量的值：

<div id="test_70" class="test">
<div class="test-container">

    @[data-script="compile-es2015 editable"](function(){
        [x, y] = [y, x];
    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



### 从函数返回多个值：

<div id="test_80" class="test">
<div class="test-container">

    @[data-script="compile-es2015 editable"](function(){
        function example() {
          return [1, 2, 3];
        }
        var [a, b, c] = example();

        function example() {
          return {
            foo: 1,
            bar: 2
          };
        }
        var { foo, bar } = example();
    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



### 提取JSON数据：

<div id="test_90" class="test">
<div class="test-container">

    @[data-script="compile-es2015 editable"](function(){
        var jsonData = {
          id: 42,
          status: "OK",
          data: [867, 5309]
        }

        let { id, status, data: number } = jsonData;

        console.log(id, status, number)
        // 42, "OK", [867, 5309]
    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



### 函数参数默认值：

<div id="test_100" class="test">
<div class="test-container">

    @[data-script="compile-es2015 editable"](function(){
        jQuery.ajax = function (url, {
          async = true,
          beforeSend = function () {},
          cache = true,
          complete = function () {},
          crossDomain = false,
          global = true,
          // ... more config
        }) {
          // ... do stuff
        };
    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


### 输入模块的指定方法：

<div id="test_110" class="test">
<div class="test-container">

    @[data-script="compile-es2015 editable"](function(){
        const { SourceMapConsumer, SourceNode } = require("source-map");
    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




## 扩展运算符&rest运算符


格式：`...`


### 扩展运算符

`用于数组`：

<div id="test_120" class="test">
<div class="test-container">

    @[data-script="compile-es2015 editable"](function(){
        var foo = function(a, b, c) {
            console.log(a);
            console.log(b);
            console.log(c);
        }
        var arr = [1, 2, 3];
        // 传统写法
        // foo(arr[0], arr[1], arr[2]);

        // 使用扩展运算符
        foo(...arr);

        var arr1 = arr
            , arr2 = [...arr]
            ;

        var str = 'love'
            , arr3 = [...str]
            ;
    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


`用于对象`：

note: es6貌似不支持。

参考Redux的这篇文章：<http://redux.js.org/docs/recipes/UsingObjectSpreadOperator.html>

<div id="test_121" class="test">
<div class="test-container">

    @[data-script="compile-es2015 editable"](function(){
        const a = {name: 1, age: 2};
        const b = {name: 1, age: 2};

        var c = { ...a, ...b };
    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



### rest运算符

<div id="test_130" class="test">
<div class="test-container">

    @[data-script="compile-es2015 editable"](function(){
        var bar = function(...args) {
                for (let el of args) {
                    console.log(el);
                }
            };

        bar(1, 2, 3, 4);
        // 1
        // 2
        // 3
        // 4

        bar = function(a, ...args) {
            console.log(a);
            console.log(args);
        }
        bar(1, 2, 3, 4);        
        // 1
        // [2, 3, 4]

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


### rest与解构配合使用


<div id="test_140" class="test">
<div class="test-container">

    @[data-script="compile-es2015 editable"](function(){
        var [a, ...rest] = [1, 2, 3, 4];
        console.log(a);
        // 1
        console.log(rest);
        // [2, 3, 4]
    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



## import & export

必须出现在模块顶级作用域中。比如它们是不能出现在闭包中的。


<div id="test_150" class="test">
<div class="test-container">

    @[data-script="compile-es2015 editable"]import { createStore } from 'redux'
    import todoApp from './reducers'
    let store = createStore(todoApp)
    export default store;

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



## 箭头操作符

格式：`=>`，=与>`不能分开`，比如`= >`是不可以的。结合律为： `右结合`。

参考：<http://es6.ruanyifeng.com/#docs/function>


### 简化函数编写 

<div id="test_160" class="test">
<div class="test-container">

    @[data-script="compile-es2015 editable"](function(){
        var array = [1, 2, 3];

        // 传统写法
        array.forEach(function(v, i, a) {
            console.log(v);
        });

        // es6
        array.forEach(v => console.log(v));
        array.map((v) => v * v);

        let max = (x, y) => {
            return x > y ? x : y;
        };

        // 返回值为一个新的函数
        let minCreator = (type) => (v1, v2) => {
            console.log(type, v1, v2);
        };

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


### this关键字处理

1. `!!特殊之处`：不同于常规的`this`关键字的运行时绑定，箭头函数体内的this指针(与`嵌套层次`无关)，
    是由`定义时`所在上下文决定
2. 由于此this非常规函数的`this`，所以箭头函数使用有以下限制：
    * 不可以作为`构造`函数
    * 不能使用`arguments`对象，如果要用，可以用`Rest`参数代替
    * 不可以作为Generator函数，无法使用`yield`命令

<div id="test_165" class="test">
<div class="test-container">

    @[data-script="compile-es2015 editable"](function(){

        setTimeout(() => {
            this.aa = 1;
            return () => this.bb = 2;
        }, 0);

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


## 类支持

`super`关键字： <http://www.ecma-international.org/ecma-262/6.0/#sec-super-keyword>

`构造函数`、`继承`等类机制。

<div id="test_170" class="test">
<div class="test-container">

    @[data-script="compile-es2015 editable"](function(){
        class Person {
            constructor(name){
                this.name = name;
            }
            
            sayHello(msg){
                console.log('Hi, I\'m ' + this.name);
            }
        }

        class Student extends Person {
            constructor(name, cls){
                super(name);
                this.cls = cls;
            }

            sayHello(msg){
                super.sayHello(msg);
                console.log(this.cls);
            }
        }
    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>
