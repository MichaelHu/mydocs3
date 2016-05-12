# es6



## 一、初识es2015

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




## 二、cbScriptBlock回调

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






## 三、let & const 命令


<div id="test_10" class="test">
<div class="test-container">

    @[data-script="compile-es2015 editable"](function(){
        let a = 5;
        const b = 6;
    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



## 四、Destructuring（解构）


### 4.1 数组解构赋值

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



### 4.2 字符串解构赋值：

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





### 4.3 数字和布尔值的解构

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




### 4.4 函数参数的解构赋值：

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



## 五、解构的用途

### 5.1 交换变量的值：

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



### 5.2 从函数返回多个值：

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



### 5.3 提取JSON数据：

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



### 5.4 函数参数默认值：

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


### 5.5 输入模块的指定方法：

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




## 六、扩展运算符&rest运算符


格式：`...`


### 6.1 扩展运算符

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



### 6.2 rest运算符

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


### 6.3 rest与解构配合使用


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



## 七、import & export

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


## 八、箭头操作符

格式：`=>`，=与>`不能分开`，比如`= >`是不可以的。

常用于`简化函数的编写`。

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
    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>
