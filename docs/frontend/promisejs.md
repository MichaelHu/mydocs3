# Promisejs

2016-12-14, 
2016-07-06, 2014-03-06

> 新型异步编程模型

* 在`ES6`中已经作为语言的原生支持的特性
* `node 4.0+`版本，已经默认支持ES6新特性
* 浏览器原生支持： Chrome32+, Edge, Firefox 29+, Opera 19+, Safari 7.1+


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/jquery/dist/jquery.min.js"></script>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>



## Syntax

> MDN: The Promise object is used for `asynchronous computations`. A Promise represents a value which may be available now, or in the future, or never.

<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise>

    new Promise( /* executor */ function( resolve, reject ) { ... } );

* 为`异步计算`而生。
* `简介优雅`的异步编程方式，看似同步的方式来实现异步的功能，`减少`回调函数的多层`嵌套`





## Features & Demos

* `Promise`对象能对函数进行封装，该函数（也即`executor`）接收两个参数，分别是`resolve`和`reject`。executor会在同步代码中`立即执行`，比如发起异步请求。

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



### Demo 1

* `executor`函数在同步代码中立即执行，比如发起定时器，发起异步请求等


<div id="test_promise_create" class="test">
<div class="test-panel">
<button>Start Testing</button>
</div>
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript"](function(){

		'use strict';
		var promiseCount = 0;

		function testPromise() {
			var thisPromiseCount = ++promiseCount;

			// var log = document.getElementById('log');
			var log = $( '#test_promise_create .test-console' ).get( 0 );
			log.insertAdjacentHTML('beforeend', thisPromiseCount +
				') Started (<small>Sync code started</small>)<br/>');

			// We make a new promise: we promise a numeric count of this promise, starting from 1 (after waiting 3s)
			var p1 = new Promise(
				// The resolver function is called with the ability to resolve or
				// reject the promise
				function(resolve, reject) {
					log.insertAdjacentHTML('beforeend', thisPromiseCount +
						') Promise started (<small>Async code started</small>)<br/>');
					// This is only an example to create asynchronism
					window.setTimeout(
						function() {
							// We fulfill the promise !
							resolve(thisPromiseCount);
						}, Math.random() * 2000 + 1000);
				}
			);

			// We define what to do when the promise is resolved/fulfilled with the then() call,
			// and the catch() method defines what to do if the promise is rejected.
			p1.then(
				// Log the fulfillment value
				function(val) {
					log.insertAdjacentHTML('beforeend', val +
						') Promise fulfilled (<small>Async code terminated</small>)<br/>');
				})
			.catch(
				// Log the rejection reason
				function(reason) {
					console.log('Handle rejected promise ('+reason+') here.');
				});

			log.insertAdjacentHTML('beforeend', thisPromiseCount +
				') Promise made (<small>Sync code terminated</small>)<br/>');
		}

		$( '#test_promise_create button' ).on( 'click', function() {
			testPromise();	
		} );

    })();

</div>
</div>




### Demo 2


<div id="test_promise_demo" class="test">
<div class="test-console"></div>
<div class="test-panel">
</div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_promise_demo');

        s.show( 'Start testing ...' );
        var p = new Promise( function( onFulfilled, onRejected ) {
            s.append_show( 'Promise 1 started ( Async code started )' );
            setTimeout( function() {
                var r = Math.random();
                if ( r < 0.5 ) {
                    onRejected( r );
                }
                else {
                    onFulfilled( r );
                }
            }, 2000 ); 
        } );

        p.then( 
            function( v ) {
                s.append_show( 'Promise 1 fulfilled ( Async code terminated )', v ); 
                return 'OK';
            } 
            , function( v ) {
                s.append_show( 'Promise 1 rejected', v ); 
                return 'Fail';
            }
        )
        // Promise 2 is always fulfilled
        .then(
            function( v ) {
                s.append_show( 'Promise 2 fulfilled', v );
                return new Promise( function( onFulfilled, onRejected ) {
                    s.append_show( 'Promise 3 started ( Async code started )' );
                    setTimeout( function() {
                        var r = Math.random();
                        if ( r < 0.5 ) {
                            onRejected( r );
                        }
                        else {
                            onFulfilled( r );
                        }
                    } );
                } );
            }
            , function( v ) {
                s.append_show( 'Promise 2 rejected', v );
            }
        )
        // Promise 3
        .then( 
            function( v ) {
                s.append_show( 'Promise 3 fulfilled ( Async code terminated )', v ); 
            }
            , function( v ) {
                s.append_show( 'Promise 3 rejected', v ); 
            }
        )
        ;

    })();

</div>
</div>



## Promise.resolve()

`Promise.resolve()`可将现有对象转换成Promise对象，比如将jQuery的`deferred`对象转换成Promise对象：

    var jsPromise = Promise.resolve($.ajax('/whatever.json'));

如果该方法的参数`不是`具有`then()方法`的对象，则返回一个新Promise对象，且它的状态为resolved。

    Promise.resolve('Hello')
        .then(function(s){
            console.log(s);
        });

上面代码会生成一个新的`Promise`对象，它的状态为`fulfilled`，所以回调函数会`立即`执行，
`Promise.resolve()`方法的`参数`就是回调函数的参数。




## Promise.prototype

### .catch( onRejected )

### .then( onFulfilled, onRejected )

> Appends fulfillment and rejection handlers to the promise, and returns a new promise resolving to the return value of the called handler, or to its original settled value if the promise was not handled (i.e. if the relevant handler onFulfilled or onRejected is not a function).

关于返回值：

* 如果onFulfilled或onRejected都不是函数，则返回original setted value
* 否则，返回被调用handler的返回值




## async, await

ES7将会实现

