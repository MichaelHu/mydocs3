# es6 new features

> `2015年初`发布ES6( ES2015 )

 <img src="./img/Ecma_RVB-003.jpg" height="60">

## Resources

* es6: <http://www.ecma-international.org/ecma-262/6.0/index.html>
* `ecma-262`: <ref://../ecma/ecma-262.md.html>
* mozilla es6: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla>
* 160103 ECMAScript compatiblity table <http://kangax.github.io/compat-table/es6/> github: <https://github.com/kangax/compat-table> <iframe src="http://258i.com/gbtn.html?user=kangax&repo=compat-table&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
* 161116 A Rundown of JavaScript 2015 features - Auth0 <https://auth0.com/blog/a-rundown-of-es6-features/>
* 180316 Check out these useful ECMAScript 2015 (ES6) tips and tricks <https://medium.freecodecamp.org/check-out-these-useful-ecmascript-2015-es6-tips-and-tricks-6db105590377> ES6新特性使用提示和技巧
* 实时转码DEMO：<http://google.github.io/traceur-compiler/demo/repl.html>


## es6 outline 

    Scope
    Conformance
    Normative references
    Overview
    Notational Conventions
    ECMAScript Data Types and Values
    Abstract Operations
    Executable Code and Execution Contexts
    Ordinary and Exotic Objects Behaviours
     ECMAScript Language: Source Code
     ECMAScript Language: Lexical Grammar
     ECMAScript Language: Expressions 
        Identifiers
        Primary Expression
        Left-Hand-Side Expressions
        Update Expressions
        Unary Operators
        Exponentiation Operator
        Multiplicative Operators
        Additive Operators
        Bitwise Shift Operators
        Relational Operators
        Equality Operators
        Binary Bitwise Operators
        Conditional Operator ( ?: )
        Assignment Operators
        Comma Operator ( , )
     ECMAScript Language: Statements and Declarations 
     ECMAScript Language: Functions and Classes
     ECMAScript Language: Scripts and Modules
    Error Handling and Language Extensions
    ECMAScript Standard Built-in Objects
    The Global Object
    Fundamental Objects
    Numbers and Dates
    Text Processing
    Indexed Collections
    Keyed Collection
    Structured Data
    Control Abstraction Objects
    Reflection
    Annex A Grammar Summary
    Annex B Additional ECMAScript Features for Web Browsers
    Annex C The Strict Mode of ECMAScript
    Annex D Corrections and Clarifications in ECMAScript 2015 with Possible Compatibility Impact
    Annex E Additions and Changes That Introduce Incompatibilities with Prior Editions



## import & export

参考： <http://www.ecma-international.org/ecma-262/6.0/index.html#sec-imports>

### Syntax

    import { sex, echo } from './a';
    import * as utils from './a';
    import utils from './a';
    import { sex, echo as ECHO } from './a';
    import React, {Component, PropTypes} from 'react';


    // Export Directly
    export * from './abc';
    export { sex } from './abc';

    // VARDECLARATION
    export var a = 12306;

    // LexicalDeclaration
    export const a = 12306;
    export let a = 12306;

    // FunctionDeclaration
    export function echo( ... ) { ... };

    // GeneratorDeclaration
    export function *() { ... };



    /**********************
     * DEFAULT
     */
    var sex = 'female';
    export default sex;

    export default {
        [ key1 ] () { ... }
        [ key2 ] () { ... }
    };

    // Assignment
    var name = 'Hudamin';
    export default name = 'Even';

    // ClassDeclaration
    export default class ABC extends DEF { ... };

    // FunctionDeclaration
    export default function echo( ... ) { ... };

    // GeneratorDeclaration
    export default function *() { ... };



    // ExportClause
    export {};
    export { sex, echo };
    export { sex as a, echo as e };



### Definition

    Declaration[Yield] :
        HoistableDeclaration[?Yield]
        ClassDeclaration[?Yield]
        LexicalDeclaration[In, ?Yield]
    HoistableDeclaration[Yield, Default] :
        FunctionDeclaration[?Yield,?Default]
        GeneratorDeclaration[?Yield, ?Default]




### Tips

* `from`后的`路径描述`，不以`./`或`../`开头的，默认从`node_modules`查找路径中查找
* `import utils from './a';`，utils等同于`exports.default`
* `import * as utils from './a';`，utils等同于`exports`
* `import a from 'abc';`，如果a为undefined，表明`exports.default`未定义
* `错误`写法：

        var sex = 'female';
        export sex;

    而应该是：

        export var sex = 'female';

    let, const同上。

* export`不支持`此种类型的输出：`export { name: varB, sex: varA };`，
    但支持：`export { varB, varA };`或`export { varB as name, varA as sex };`
* import`不支持`此种类型的解构：`import { name, sex: varA } from './a';`
* 直接export语法可以达到`简写`效果：

        import A from './a';
        export default A;

    简写成 =>

        export { default } from './a';

* `function, class`支持`default export`，`var/const/let`则不支持

        // OK
        export default function abc() { .... }
        export default class Abc() { .... }

        // Error
        export default var abc;
        export default const abc;
        export default let abc;

* `拓展参数`只支持`default export`，而不支持`object export`

        import * as utils from './utils';
        // ok
        export default {
            ...utils
        };

        // error
        export {
            ...utils
        };


### Examples

a.js:

    var a = 1;
    function b() {}
    export { a, b }

b.js:

    var a = 1;
    function b() {}
    export default { a, b }

c.js:

    export { a: 1, b: 2 };

import.js: 

    import { a, b } from 'a.js';
    import m from 'b.js'; // default可以随意取名



## 箭头函数

> 参考：<http://www.ecma-international.org/ecma-262/6.0/index.html#sec-arrow-function-definitions>

    var array = [ 1, 2, 3 ];
    // 传统写法
    array.forEach( function( v, i, a ) {
        console.log( v );
    } );
    // ES6
    array.forEach( v => console.log( v ) );

* 参数部分与`=>`之间不能有换行
* `this`关键字在函数体中能直接体现当前上下文的this，不同于function内的this
* `arguments, super, new.target`也同this关键词类似，它们都指向父scope的对应对象
* 简单情况下`()`与`{}`可以省略。省略`{}`时，`return`关键字也可省略（实际上`必须省略`）
        
        a => a + 5                          // (), {}, return都省略
        a => return a + 5                   // 此处的return是不合法的，必须省略
        ( a, b ) => a + b                   // 省略{}, return
        ( a, b ) => { name: a, age: b }     // 错误写法：返回值包含{}，不能省略{}以及return
        ( a, b ) => {                       // 正确写法，都不能省略
            return { name: a, age: b }; 
        }
        



## 类支持

> `class, extends, super`关键字

    // 类的定义
    class Animal {
        // ES6中新型构造器
        constructor(name) {
            this.name = name;
        }

        // getter
        get name() {
            return name;
        }

        // 实例方法
        sayName() {
            console.log('My name is '+this.name);
        }
    }
    // 类的继承
    class Programmer extends Animal {
        constructor(name) {
            // 直接调用父类构造器进行初始化
            super(name);
            // this关键词必须在super()调用后才能使用
            ...
        }
        program() {
            console.log("I'm coding...");
        }
        sayName() {
            // 调用父类实例方法
            super.sayName();
            console.log( 'I am a programmer'  );
        }
    }
    // 测试我们的类
    var animal=new Animal('dummy'),
    wayou=new Programmer('wayou');
    animal.sayName();// 输出 ‘My name is dummy’
    wayou.sayName();// 输出 ‘My name is wayou’
    wayou.program();// 输出 ‘I'm coding...’


* 浅谈ES6中`super`关键字 <http://www.cnblogs.com/liutie1030/p/5997446.html>
* `Note`: `class`也是具有`块级作用域`的关键字
* 如果带`extends`关键词进行`继承`，那么在`constructor`中，`super()`需在`this`关键词可用`之前`完成调用
* 如果类没有继承自其他类，那么就`不能`在constructor中使用`super()`
* 类字段 - class field ( babel presets: `stage-0` )



## 增强的对象字面量

    // 通过对象字面量创建对象
    var human = {
        breathe() {
            console.log( 'breathing...' );
        }
    };
    function getKey() {
        return 'some key';
    }
    var worker = {
        // Prototypes can be set this way
        __proto__: human, 
        // key === value, shorthand for someObject: someObject
        someObject,
        // Methods can now be defined this way
        work() {
            console.log( 'working...' );
        },
        // Dynamic values for keys
        [ getKey() ]: 'some value'
    };
    human.breathe();    // 输出 ‘breathing...’
    //调用继承来的breathe方法
    worker.breathe();   // 输出 ‘breathing...’


* 可以在对象字面量里面定义`原型`（`__proto__`）
* 定义方法可以不用`function`关键字
* 直接调用父类方法



## 计算属性名

> Computed property names

<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names>

    var i = 0;
    var a = {
        [ 'foo' + ++i ]: i
        , [ 'foo' + ++i ]: i
        , [ 'foo' + ++i ]: i
    };

    console.log(a.foo1); // 1
    console.log(a.foo2); // 2
    console.log(a.foo3); // 3


    var param = 'size';
    var config = {
        [ param ]: 12
    };

    console.log( config ); // { size: 12 }



## 字符串模板

    var num = Math.random();
    console.log( `your num is ${num}` );

支持`backtick`



## 解构

    var [ x, y ] = getVal(), // 函数返回值的解构
        [ name, , age ] = [ 'wayou', 'male', 'secrect' ]; // 数组解构

    function getVal() {
        return [ 1, 2 ];
    }

    console.log( 'x:' + x + ', y:' + y ); // 输出：x:1, y:2 
    console.log( 'name:' + name + ', age:' + age ); // 输出： name:wayou, age:secrect 





## 参数默认值，不定参数，拓展参数

<https://tc39.github.io/ecma262/#sec-argument-lists>

    function sayHello2( name = 'dude' ){
        console.log( `Hello ${name}` );
    }


    function add( ...x ){
        return x.reduce( ( m, n ) => m + n );
    }


    // `babel-preset-stage-2` 支持
    var keys = () => {
            return { k1(){} };
        };

    export default {
        ...keys({})
    };

    import * as utils from './utils';
    // ok
    export default {
        ...utils
    };

    // error
    export {
        ...utils
    };


## let与const 关键字

    for ( let i=0; i<2; i++ )
        console.log( i );   // 输出: 0,1

* let支持`块级`作用域 
* 不允许`重复`声明





## for of 值遍历

* 与`for .. in`区别在于for in包含对象`所有`可枚举值，for of只包含对象`自身`的可枚举值，例如原型链的属性将不被包含




## iterator, generator


## 模块


## Proxies




## Map

* es6: <http://www.ecma-international.org/ecma-262/6.0/index.html#sec-map-objects>
* mozilla: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values>

### APIs

#### size
#### clear()
#### delete()
#### entries()

    var myMap = new Map();
    myMap.set("0", "foo");
    myMap.set(1, "bar");
    myMap.set({}, "baz");

    var mapIter = myMap.entries();

    console.log(mapIter.next().value); // ["0", "foo"]
    console.log(mapIter.next().value); // [1, "bar"]
    console.log(mapIter.next().value); // [Object, "baz"]


#### forEach()
#### get()
#### has()
#### keys()
#### set()
#### values()

    var myMap = new Map();
    myMap.set("0", "foo");
    myMap.set(1, "bar");
    myMap.set({}, "baz");

    var mapIter = myMap.values();

    console.log(mapIter.next().value); // "foo"
    console.log(mapIter.next().value); // "bar"
    console.log(mapIter.next().value); // "baz"




## Symbols

<http://www.ecma-international.org/ecma-262/6.0/#sec-symbol-objects>

`全局唯一、不可变`，常用于对象`key`。`ES6`新的`内建`类型，JS的`7大基本类型之一`，Babel等语法转换工具不对它进行转换。

> Properties are identified using key values. A property key value is either an `ECMAScript String` value or a `Symbol value`. All String and Symbol values, including the `empty string`, are `valid` as property keys. A property `name` is a property key that is a `String value`.

所有字符串（包括空串）以及Symbol value，都是合法的属性key。属性名是字符串类型的属性key。

Symbol构造函数，特殊之处在于`不使用``new`关键字来创建。

`Object.getOwnPropertyNames()`来获取对象的所有Symbol键值的属性。

    Symbol([[description]])

    // false
    Symbol(123) == Symbol(123)

    const key = Symbol(123);

    // symbol
    typeof key

Symbol不能赋值给`let`声明的`变量`：

    // error
    let key = Symbol(123);

同时可参考：<http://es6.ruanyifeng.com/#docs/symbol>

    

    


## Math，Number，String，Object 的新API

    Number.EPSILON
    Number.isInteger(Infinity) // false
    Number.isNaN("NaN") // false

    Math.acosh(3) // 1.762747174039086
    Math.hypot(3, 4) // 5
    Math.imul(Math.pow(2, 32) - 1, Math.pow(2, 32) - 2) // 2

    "abcde".contains("cd") // true
    "abc".repeat(3) // "abcabcabc"

    Array.from(document.querySelectorAll('*')) // Returns a real Array
    Array.of(1, 2, 3) // Similar to new Array(...), but without special one-arg behavior
    [0, 0, 0].fill(7, 1) // [0,7,7]
    [1,2,3].findIndex(x => x == 2) // 1
    ["a", "b", "c"].entries() // iterator [0, "a"], [1,"b"], [2,"c"]
    ["a", "b", "c"].keys() // iterator 0, 1, 2
    ["a", "b", "c"].values() // iterator "a", "b", "c"

    Object.assign(Point, { origin: new Point(0,0) }) 




## Promises

<ref://../frontend/promisejs.md.html>

    // 创建promise
    var promise = new Promise(function(resolve, reject) {
        // 进行一些异步或耗时操作
        if ( /*如果成功 */ ) {
            resolve("Stuff worked!");
        } else {
            reject(Error("It broke"));
        }
    });

    // 绑定处理程序
    promise.then(function(result) {
        // promise成功的话会执行这里
        console.log(result); // "Stuff worked!"
    }, function(err) {
        // promise失败会执行这里
        console.log(err); // Error: "It broke"
    });


<http://www.cnblogs.com/Wayou/p/es6_new_features.html>
