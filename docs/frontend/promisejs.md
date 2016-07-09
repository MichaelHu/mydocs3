# Promisejs

2016-07-06, 2014-03-06

> 新型异步编程模型

在`ES6`中已经作为语言的原生支持的特性

`node 4.0+`版本，已经默认支持ES6新特性


## Promise Features


* 通过`.then()`方法，自动生成新的`Promise`对象，形成`链式`调用

* `resolve()`和`reject()`方法分别作为成功调用和发生错误情况时的处理函数，
    这两个回调函数可以通过`.then()`方法传递进去，如果不传，则使用`默认`处理函数。
    `resolve()`会将Promise对象的状态从`pending`设置为`resolved`，
    `reject()`则将Promise对象的状态从`pending`设置为`rejected`。
    成功或者失败由用户代码决定，也即什么情况下调用resolve()和reject()是由用户决定的，
    比如AJAX请求成功则调用resolve，失败则调用reject。

* 如果`resolve()`和`reject()`方法的返回值仍然是一个`Promise对象`，则该对象会取代`.then()`
    方法自动生成的Promise对象

* 默认情况：如果用户没有提供调用`reject()`或者`resolve()`的条件，`默认会调用resolve()`。 

* `参数`传递：默认情况下，上一个Promise对象的`resolve()`方法的返回值，会作为下一个Promise对象的`resolve()`方法的传入值。

* `错误`处理：`.catch()`方法可以捕获error，并且`冒泡`，通过`then()链`传递往后面传






## Promise.resolve()

`Promise.resolve()`可将现有对象转换成Promise对象，比如将jQuery的`deferred`对象转换成Promise对象：

    var jsPromise = Promise.resolve($.ajax('/whatever.json'));

如果该方法的参数`不是`具有`then()方法`的对象，则返回一个新Promise对象，且它的状态为resolved。

    Promise.resolve('Hello')
        .then(function(s){
            console.log(s);
        });

上面代码会生成一个新的`Promise`对象，它的状态为`fulfilled`，所以回调函数会`立即`执行，
`Promise.resolve()`方法的参数就是回调函数的参数。




## async, await

ES7将会实现

