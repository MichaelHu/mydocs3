# ES6 new features

> 2015年初发布ES6

 <img src="./img/Ecma_RVB-003.jpg" height="60">

实时转码DEMO：

<http://google.github.io/traceur-compiler/demo/repl.html>




## 箭头操作符

    var array = [1, 2, 3];
    //传统写法
    array.forEach(function(v, i, a) {
        console.log(v);
    });
    //ES6
    array.forEach(v => console.log(v));




## 类支持

    //类的定义
    class Animal {
        //ES6中新型构造器
        constructor(name) {
            this.name = name;
        }
        //实例方法
        sayName() {
            console.log('My name is '+this.name);
        }
    }
    //类的继承
    class Programmer extends Animal {
        constructor(name) {
            //直接调用父类构造器进行初始化
            super(name);
        }
        program() {
            console.log("I'm coding...");
        }
    }
    //测试我们的类
    var animal=new Animal('dummy'),
    wayou=new Programmer('wayou');
    animal.sayName();//输出 ‘My name is dummy’
    wayou.sayName();//输出 ‘My name is wayou’
    wayou.program();//输出 ‘I'm coding...’




## 增强的对象字面量


    //通过对象字面量创建对象
    var human = {
        breathe() {
            console.log('breathing...');
        }
    };
    var worker = {
        __proto__: human, //设置此对象的原型为human,相当于继承human
        company: 'freelancer',
        work() {
            console.log('working...');
        }
    };
    human.breathe();//输出 ‘breathing...’
    //调用继承来的breathe方法
    worker.breathe();//输出 ‘breathing...’


* 可以在对象字面量里面定义原型
* 定义方法可以不用function关键字
* 直接调用父类方法



## 字符串模板

    var num = Math.random();
    console.log(`your num is ${num}`);

支持`backtick`



## 解构

    var [x,y]=getVal(), // 函数返回值的解构
        [name,,age]=['wayou','male','secrect']; // 数组解构

    function getVal() {
        return [ 1, 2 ];
    }

    console.log('x:' + x + ', y:' + y); // 输出：x:1, y:2 
    console.log('name:' + name + ', age:' + age); // 输出： name:wayou, age:secrect 





## 参数默认值，不定参数，拓展参数

    function sayHello2(name='dude'){
        console.log(`Hello ${name}`);
    }


    function add(...x){
        return x.reduce((m,n)=>m+n);
    }


## let与const 关键字

    for (let i=0;i<2;i++)console.log(i); // 输出: 0,1





## for of 值遍历

## iterator, generator


## 模块


## Proxies






## Symbols

<http://www.ecma-international.org/ecma-262/6.0/#sec-symbol-objects>

全局唯一、不可变，常用于对象`key`。
`ES6`新的`内建`类型，JS的7大基本类型之一，Babel等语法转换工具不对它进行转换。

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

Symbol不能赋值给let声明的变量：

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


    //创建promise
    var promise = new Promise(function(resolve, reject) {
        // 进行一些异步或耗时操作
        if ( /*如果成功 */ ) {
            resolve("Stuff worked!");
        } else {
            reject(Error("It broke"));
        }
    });
    //绑定处理程序
    promise.then(function(result) {
        //promise成功的话会执行这里
        console.log(result); // "Stuff worked!"
    }, function(err) {
        //promise失败会执行这里
        console.log(err); // Error: "It broke"
    });


http://www.cnblogs.com/Wayou/p/es6_new_features.html
