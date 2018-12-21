# fp

> Functional Programming - 函数式编程

## Resources

* [ 170222 ] 函数式编程入门教程 <http://www.ruanyifeng.com/blog/2017/02/fp-tutorial.html>
* JS函数式编程指南 <https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/>
* Functor.js <https://gist.github.com/buzzdecafe/5721205>
* 函数式编程 <https://baike.baidu.com/item/函数式编程/4035031>
* Bad Engineering Properties of Object-Oriented Languages <http://doc.cat-v.org/programming/bad_properties_of_OO>


## Features

* 闭包及高阶函数
* 惰性计算
* 递归
* 五个特点：函数是第一等公民；只用表达式，不用语句；没有副作用；不修改状态；引用透明性（可重入性）
* 起源于范畴论 - Category Theory
* 函数合成及柯里化（只接收一个参数）
* 函子( Functor ): 一般约定，`函子`的标志就是容器具有`map`方法。该方法将容器里面的每一个值，映射到另一个容器
    * Maybe
    * Either
    * ap
    * Monad


## 例子

### Monad函子的应用

> IO操作

    var fs = require("fs");

    var readFile = function(filename) {
        return new IO(function() {
            return fs.readFileSync(filename, "utf-8");
        });
    };

    var print = function(x) {
        return new IO(function() {
            console.log(x);
            return x;
        });
    };

上面代码中，读取文件和打印本身都是不纯的操作，但是readFile和print却是`纯函数`，因为它们总是返回 IO 函子。
