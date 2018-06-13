# interview exams


17-10-19,
16-09-21,
16-08-06,
16-07-29,
2015


> 面试要严谨，对结果的`客观性`负责




<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>



## 考察代码能力


### 实现trim函数

`要求`：
1. 编写trim函数: `function trim( s ) { ... }`
2. 返回值类型为`string`
3. 要求`bug-free`

`分析`：
1. 有`缜密`思考的，表明编写代码有较强的健壮性，质量可以保证。比如对非字符串的判断
2. 使用`正则方式`还是只会使用基于索引查找再做字符串方法调用 
3. 知道对`&ensp;`, `&emsp;`以及`全角空格`也能过滤，分别是`&#8194;`, `&#8195;`和`&#12288;`
4. jQuery的一个实现：

        // Support: Android <=4.0 only
        // Make sure we trim BOM and NBSP
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g


`简单例子`：

<div id="test_js_trim" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_js_trim');

        function trim ( s ) {
            if ( 'string' == typeof s
                || s instanceof String ) {
                return s.replace(/^\s*|\s*$/g, '');
            }
            return '';
        }


        var testCases = [
            ' abc '
            , new String('    def     ')
            , {a:1, b:2}
            , ' + '
            , '　+　'
        ];
        s.show('Start testing ...');
        for ( var i = 0; i < testCases.length; i++ ) {
            s.append_show(
                testCases[i]
                , '_' + trim(testCases[i]) + '_'
            );
        }

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



### 实现query函数


    @[data-script="javascript"]( function() {

        function query( key, queryString ) {
            var reg = new RegExp( '[&?]' + key + '=([^&]*)', 'g' );
            if ( reg.test( queryString ) ) {
                return decodeURIComponent( RegExp.$1 );
            } 
            return '';
        }

        window.testQuery = query;

    } ) ();



<div id="test_PH" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_PH');
        s.show( 'start testing `query`:\n' );
        s.append_show( testQuery( 'a', '?a=5&b=6' ) );
        s.append_show( testQuery( 'b', '?a=5&b=%E7%BB%BF%E6%B9%BE&c=12345' ) );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




### 代码纠错能力

1. 纠错1

        function IsPC() { 
            var userAgentInfo = navigator.userAgent; 
            var Agents = new Array(
                    "Android", "iPhone", "SymbianOS"
                    , "Windows Phone", "iPad", "iPod", "iOS"
                ); 
            var flag = true; 
            for (var v = 0; v < Agents.length; v++) { 
                if ( userAgentInfo.indexOf(Agents[v]) > 0 ) { 
                    flag = false; 
                    break; 
                } 
            } 
            return flag; 
        }

2. 纠错2

        function max( a, b ) {
            if ( a > b ) {
                return 
                    a;
            }
            else {
                return 
                    b;
            }
        }




## 考察基础知识


### 正则表达式

1. `/\b/`与`/[\b]/`的区别: `单词边界` & `退格符`
2. 正则表达式的修饰符：`g` & `i`
3. 贪婪匹配与非贪婪匹配，默认是哪种模式？
4. 反向引用 
5. `String.prototype.split`考察

        let str = 'abcab';
        str.split( /a|b/ );
        str.split( /(a|b)*/ );
        str.split( /(a|b)*?/ );

    详细可参考 <ref://../frontend/regexp.md.html>



### 数组操作

1. 数组操作`splice`，a = [1, 2, 3]，通过调用splice方法，a = [1, 1.5, 2, 3] 

        a.splice(1, 0, 1.5);

2. sort

3. slice, concat



### 类型判断

#### isXXX

实现`isString`, `isDate`, `isArray`, `isFunction`, `isNumber`的通用方式
        
    function isXXX(s) { return Object.prototype.toString.call(s) === '[object XXX]'; }

分析：

1. `isString`，需要区别字面量和通过new String创建的两种变量的判断都要满足。
    会使用通用方式，表明有一定代码积累；但是需要会使用`typeof`结合`instanceof`的方式，
    如果不知道，表明基础还是有一定问题。

2. 让应试者编写`工厂`方案，需要知道`闭包`的使用方式。可以使用非闭包方案来让应试者发现问题。


<div id="test_isXXX" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        function isXXX() {
            var types = [ 'String', 'Date', 'Array', 'Function', 'Number' ]
                , obj = {}
                ;

            for ( var i = 0; i < types.length; i++ ) {
                ( function () {
                    var type = types[ i ];
                    obj[ 'is' + type ] = function( inst ) {
                        return Object.prototype.toString.call( inst )
                            === '[object ' + type + ']'; 
                    }; 
                } )();
            }

            return obj;
        }

        var T = isXXX();

        var s = fly.createShow('#test_isXXX');
        var items = [
                new String( 'abc' )
                , new Date()
                , new Array()
                , function() {}
                , 12345
                , 'Hello, World!'
            ];
        s.show('start testing ...');
        for ( var i = 0; i < items.length; i++ ) {
            s.append_show(
                T.isString( items[ i ] )
                , T.isDate( items[ i ] )
                , T.isArray( items[ i ] )
                , T.isFunction( items[ i ] )
                , T.isNumber( items[ i ] )
            );
        }

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>





### js类与继承


2. 用js实现类的定义、继承、包含类属性、实例属性、类方法、实例方法、公共属性、私有属性

3. 用js（`ES5`的方式）定义一个`Person`类，包含属性name和age，方法sayHello，输出name和age；再定义一个子类Student，包含属性grade，方法sayHello，除了输出父类相关属性外，再输出grade。
    
        function Person(name, age) {
            this.name = name;
            this.age = age;
        }

        Person.prototype.sayHello = function(){
            console.log(this.name, this.age);
        };

        function Student(name, age, grade) {
            // 体现复用思想
            Person.call(this, name, age);
            this.grade = grade;
        }

        Student.prototype = new Person();

        // 体现对constructor属性的理解 
        Student.prototype.constructor = Student;

        Student.prototype.sayHello = function(){
            // 体现复用思想
            Person.prototype.sayHello.apply(this, arguments);
            console.log(this.grade);
        };

4. 以上js类，使用`ES6`方式实现，注意`super`关键词的使用（<ref://../es/es6-new-features.md.html>）。


4. 调用与父类同名方法的方式有多种，如果希望用`this._super()`方式调用，应该怎么实现

    参考：<a href="../frontend/class_extend.md.html">js类扩展方式</a>


7. `typeof x`有几种结果？

        // 6种
        number
        string
        boolean
        function
        object
        undefined

    另外，知道`es6`中增加了`symbol`类型，可以加分。

        null        'object'
        []          'object'
        undefined   'undefined'

8. 谈谈`Promise`，最好包含其产生背景、技术细节、常用方法等
    * 回调地狱
    * 状态( pending, fulfilled, rejected ) ，参数传递
    * 常用方法：
            Promise.resolve( value )
            Promise.reject( value )
            Promise.all( iterable )
            Promise.race( iterable )
            Promise.prototype.then()
            Promise.prototype.catch()
    * 其他衍生：
            async/await
            Generator

9. `use strict`指令

10. ES6新特性

11. Koa/Express

12. new关键字的作用

        new func1(); // 创建对象，并设置原型链
        func1();     // 执行函数

13. 在浏览器的地址栏输入URL到网页展现完毕，这期间都发生了什么？
    
    * DNS解析
    * 浏览器缓存
    * HTML文档返回
    * 解析link、style、script，阻塞特性
    * 服务端发生什么


14. 橡皮擦效果，关键使用了哪个关键的Canvas属性？

        context.globalCompositeOperation = 'destination-out';

15. 谈谈`AMD`、`CMD`、`UMD`

16. Function之apply与call的区别？

19. 编写`UMD`方案，参考<ref://../frontend/umd.md.html>



## 应用框架

1. backbone
2. react
    * 定位
    * 生命周期方法
3. vue
4. virtual-dom  
5. 前端mvc, mvvm, mvp ( todo )
6. redux定位、运行原理；redux的middleware



## 前沿知识

> 谈谈对以下概念，你所掌握的基础知识，应用场景，开发经验

1. webworker
2. service worker
3. workerlet
4. webassembly
5. websocket
6. webGL
7. pwa






## 智力题

1. 一根不均匀的绳子，烧完1个小时，如何计算半小时
2. 以你现有的资源和能力，估算一下中国有多少私家车




## 综合知识

1. 编译原理：lex/yacc, flex/bison
2. 前端性能优化
3. 如何看待`单元测试`，有没有为自己的项目写过`单测用例`，用过哪些`单测框架`？
4. 如何实现`前端全文查找`
    * DOM树遍历，查找TextNode
    * 如何实现查找文本结果高亮
5. 如何实现print样式
    * `@media`指令
    * 使用`! important`提升优先级
    * `@page`指令等
6. `canvas`性能优化
    * `drawImage()`
    * path汇集，统一绘制
    * 分层渲染
    * 文本性能低
    * 矩形比圆形性能高
7. webpack, fis, grunt, gulp



## shell编程

1. 删除当前目录下（包含子目录）所有以`.png`为后缀的文件

        # example
        find . -type f -iregex '.*\.png$' -exec rm -rf {} \;

2. 过滤指定目录下（包含子目录）所有文本文件`*.md`中，哪些文件包含关键词`react`

        # examples
        grep -r 'react' .
        grep -ri 'react' .
        grep -r --include '*.md' 'react' .
        grep -ri --include '*.md' 'react' .
        grep -rI 'react' .
        grep -rIi 'react' .
        grep -rI --include '*.md' 'react' .
        grep -rIi --include '*.md' 'react' .



## css面试

1. 垂直居中 
2. 二列布局：左固定，右固定
    * margin - float
    * absolute position
3. flex-box
4. css-grid
5. `start / end`与`left / right`的区别



## 学校阶段

1. 毕业课题
2. 专业课



## 基础算法

1. 图的遍历：广度优先遍历、深度优先遍历
2. 二叉树遍历：前序、中序、后序遍历





## 架构能力

1. 实现一个web业务系统，包含以下几个主要功能：
    * `关系`展示，使用图来展示人与人之间的关系 
    * `位置`信息展示，在地图上展示点；并且可以在地图上发起基于`区域`的`搜索`
    * `文档`展示，能展示pdf、txt、doc、xls等文档信息

    假设你作为前端技术leader，你谈谈实现该系统所需要的`前端技术`，以及你将会`如何`来`实现`该系统。

    * 需要用到哪些前端技术，需要发起哪些技术调研？
    * 前端程序架构上，有什么考虑，怎样去推进？

## 团队管理能力

1. 谈谈团队管理中，你觉得最重要的`三个关键词`
    * 以身作则
    * 定期review
    * 坚持以身作则、定期review



## 其他参考

* github（之一）:  <https://github.com/helloqingfeng/Awsome-Front-End-learning-resource>
* github（之二）:  <https://github.com/qiu-deqing/FE-interview>
* 知乎：<https://zhuanlan.zhihu.com/p/25266542>


