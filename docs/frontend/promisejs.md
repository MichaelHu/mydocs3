# Promisejs Memo


> 新型异步编程模型

在ES6中已经作为语言的原生支持的特性

`node 4.0+`版本，已经默认支持ES6新特性

co


## Promise的一些理解


* 通过`.then`方法，自动生成新的Promise对象，形成链式调用
* `resolve`和`reject`方法分别作为成功调用和发生错误情况时的处理函数，
    这两个回调函数可以通过`.then`方法传递进去，如果不传，则使用默认处理函数。
    resolve会将Promise对象的状态从pending设置为resolved，
    reject则将Promise对象的状态从pending设置为rejected。
    成功或者失败由用户代码决定，也即什么情况下调用resolve和reject是由用户决定的，
    比如AJAX请求成功则调用resolve，失败则调用reject。
* 如果`resolve`和`reject`方法的返回值仍然是一个`Promise对象`，则该对象会取代`.then`方法自动生成的Promise对象
* 默认情况：如果用户没有提供调用reject或者resolve的条件，`默认会调用resolve`。 
* 参数传递：默认情况下，上一个Promise对象的resolve方法的返回值，会作为下一个Promise对象的resolve方法的传入值。
* 错误处理：`.catch`方法可以捕获error，并且冒泡，通过then链传递往后面传


## Promise.resolve方法

`Promise.resolve`可将现有对象转换成Promise对象，比如将jQuery的deferred对象转换成Promise对象：

    var jsPromise = Promise.resolve($.ajax('/whatever.json'));

如果该方法的参数不是具有then方法的对象，则返回一个新Promise对象，且它的状态为resolved。

    Promise.resolve('Hello')
        .then(function(s){
            console.log(s);
        });

上面代码会生成一个新的Promise对象，它的状态为fulfilled，所以回调函数会立即执行，Promise.resolve方法的
参数就是回调函数的参数。




## async, await

ES7将会实现
