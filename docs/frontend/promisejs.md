# promise

> 新型`异步编程`模型，promise意为`承诺`。

> changelog: 170922, 1706, 1612, 1607, 1403

<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/jquery/dist/jquery.min.js"></script>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>


## Resources

* ES6定义：<http://www.ecma-international.org/ecma-262/6.0/index.html#sec-promise-objects>
* MDN: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise>
* 开源实现1: <https://github.com/then/promise> <iframe src="https://ghbtns.com/github-btn.html?user=then&repo=promise&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>  


## Overview

> `MDN`: The Promise object is used for `asynchronous computations`. A Promise `represents a value` which may be available now, or in the future, or never. 

* 为`异步计算`而生
* `简洁优雅`的异步编程方式，看似同步的方式来实现异步的功能，`减少`回调函数的多层`嵌套`
* 在`ES6`中已经作为语言的原生支持的特性
* `node 4.0+`版本，已经默认支持ES6新特性
* 浏览器原生支持： Chrome32+, Edge, Firefox 29+, Opera 19+, Safari 7.1+
* `ES7`中，引入`async/await`，或许会取代promise



## Syntax

    p = new Promise( /* executor */ function( resolve, reject ) { ... } );
    p.then( f, r )
        .then( f1, r1 )
        ;
    Promise.resolve( value )
        .then( f, r )
        ;
    Promise.reject( value )
        .then( f, r )
        ;
    Promise.all( iterable )
        .then( f, r )
        ;
    Promise.race( iterable )
        .then( f, r )
        ;
    

## Keywords

### states

3种状态值：
        
    pending
    fulfilled
    rejected

### settled
> A promise is said to be `settled` if it is not pending, i.e. if it is either fulfilled or rejected.

### resolved
> A promise is `resolved` if it is settled or if it has been "locked in" to match the state of another promise.

需要注意区分`resolved`和`fulfilled`
    


## Features

* `Promise`对象能对`函数`进行封装，该函数（也即`executor`）接收两个回调参数，分别是`fulfill`和`reject`。executor会在同步代码中`立即执行`，比如发起异步请求。

* 通过`.then()`方法，添加`回调`函数，并自动生成新的`Promise`对象，形成`链式`调用

* `fulfill()`和`reject()`方法分别作为成功调用和发生错误情况时的处理函数，
    这两个回调函数可以通过`.then()`方法传递进去，如果不传，则使用`默认`处理函数。
    `fulfill()`会将Promise对象的状态从`pending`设置为`fulfilled`，
    `reject()`则将Promise对象的状态从`pending`设置为`rejected`。
    成功或者失败由用户代码决定，也即什么情况下调用fulfill()和reject()是由用户决定的，
    比如AJAX请求成功则调用fulfill，失败则调用reject。

* `参数`传递：默认情况下，上一个Promise对象的`fulfill()`方法的返回值（非Promise对象），会作为下一个Promise对象的`fulfill()`方法的传入值。

* 如果`fulfill()`和`reject()`方法的`返回值`仍然是一个`Promise对象`，则该对象会取代`.then()`方法自动生成的Promise对象

* 默认情况：如果用户`没有`提供调用reject()或者fulfill()的`条件`（一般由`executor`给出条件），`默认`会调用`fulfill()`。 

* `错误`处理：`.catch()`方法可以捕获error，并且`冒泡`，通过`then()链`传递往后面传




## 一些例子

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
        var s = fly.createShow( '#test_promise_create' );
		var promiseCount = 0;

		function testPromise() {
			var thisPromiseCount = ++promiseCount;
            s.append_show( thisPromiseCount + '. Started ( sync code started )' );

			var p1 = new Promise(
                    function( resolve, reject ) {
                        s.append_show( thisPromiseCount + '. Promise started ( Async code started )' );
                        window.setTimeout(
                            function() {
                                resolve( thisPromiseCount );
                            }
                            , Math.random() * 2000 + 1000
                        );
                    }
                );

			p1.then(
                    function( val ) {
                        s.append_show( val + '. Promise fulfilled ( Async code terminated )' );
                    }
                )
                .catch(
                    function( reason ) {
                        s.append_show( 'Handle rejected promise (' + reason + ') here.' );
                    }
                );

            s.append_show( thisPromiseCount + '. Promise made ( Sync code terminated )' );
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



## Promise.resolve( x )

`Promise.resolve()`可将现有对象`转换成Promise对象`，比如将jQuery的`deferred`对象转换成Promise对象：

    var jsPromise = Promise.resolve( $.ajax( '/whatever.json' ) );

如果该方法的参数`不是`具有`then()方法`的对象，则返回一个新Promise对象，且它的状态为`resolved`，此时的回调函数会立即执行。

<div id="test_promise_resolve" class="test">
<div class="test-container">
<div class="test-console"></div>

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_promise_resolve');
        s.show( 'start testing ...' );

        Promise.resolve( 'Hello' )
            .then( function( value ){
                s.append_show( 'fulfilled', value );
                return 'World';
            } )
            .then( function( value ){
                s.append_show( 'fulfilled', value );
            } )
            ;

        Promise.resolve( $.ajax( 'http://258i.com/phpapp/cors.php', { timeout: 20 } ) )
            .then( function( response ){
                    s.append_show( 'fulfilled', response );
                } 
                , function( xhr ) {
                    s.append_show( 'rejected', xhr );
                }
            )
            ;

    })();

</div>
<div class="test-panel">
</div>
</div>



## Promise.reject( r )

参考ES6：<http://www.ecma-international.org/ecma-262/6.0/index.html#sec-promise.reject>

返回一个Promise对象，且该Promise`直接`进入rejected状态，`传入参数`直接作为rejected callback的参数。


<div id="test_promise_reject" class="test">
<div class="test-container">
<div class="test-console"></div>

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_promise_reject');
        s.show( 'start testing ...' );

        Promise.reject( 'Hello' )
            .then( function( value ){
                    s.append_show( 'fulfilled', value );
                } 
                , function( value ) {
                    s.append_show( 'rejected', value );
                }
            )
            ;

        Promise.reject( $.ajax( 'http://258i.com/phpapp/cors.php', { timeout: 20 } ) )
            .then( function( response ){
                    s.append_show( 'fulfilled', response );
                } 
                , function( xhr ) {
                    s.append_show( 'rejected', xhr );
                }
            )
            ;

    })();

</div>
<div class="test-panel">
</div>
</div>




## Promise.all( iterable )

> 所有都成功才算成功，只要有一个失败就立即宣告失败。

* 参数为多个Promise对象组成的`数组`或iterable对象
* 若每个Promise都进入fulfilled状态，则fulfill callback将接收到每个Promise返回值组成的数组，也即fulfill callback在`所有Promise`都fulfill之后`才被调用`
* 若`有一个Promise`进入rejected状态，则reject callback将`立即`接收到该Promise的返回值，其他Promise（若尚未完成的）将继续执行

以下为试验代码：

<div id="test_promise_all" class="test">
<div class="test-container">
<div class="test-console"></div>

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_promise_all');
        s.show( 'start testing ...' );

        Promise.all( [ 
                new Promise( function( f, r ) {
                    setTimeout( function() {
                        s.append_show( 'a' );
                        var v = Math.random();
                        if ( v < 0.5 ) f( 'a:' + v );
                        else r( 'a:' + v );
                    }, 1000 );
                } )
                , new Promise( function( f, r ) {
                    setTimeout( function() {
                        s.append_show( 'b' );
                        var v = Math.random();
                        if ( v < 0.5 ) f( 'b:' + v );
                        else r( 'b:' + v );
                    }, 2000 );
                } )
            ] )
            .then( function( value ){
                    s.append_show( 'fulfilled', value );
                } 
                , function( value ) {
                    s.append_show( 'rejected', value );
                }
            )
            ;

    })();

</div>
<div class="test-panel">
</div>
</div>



## Promise.race( iterable )

> 竞赛：成功与否，只看第一个。

* 参数同Promise.all()
* 当`第一个`Promise被settled，`fulfill 或 reject`  callback将`立即`接收到该Promise的返回值，其他Promise（若尚未完成的）将继续执行


以下为试验代码：

<div id="test_promise_race" class="test">
<div class="test-container">
<div class="test-console"></div>

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_promise_race');
        s.show( 'start testing ...' );

        Promise.race( [ 
                new Promise( function( f, r ) {
                    setTimeout( function() {
                        s.append_show( 'a' );
                        var v = Math.random();
                        if ( v < 0.5 ) f( 'a:' + v );
                        else r( 'a:' + v );
                    }, 1000 );
                } )
                , new Promise( function( f, r ) {
                    setTimeout( function() {
                        s.append_show( 'b' );
                        var v = Math.random();
                        if ( v < 0.5 ) f( 'b:' + v );
                        else r( 'b:' + v );
                    }, 2000 );
                } )
            ] )
            .then( function( value ){
                    s.append_show( 'fulfilled', value );
                } 
                , function( value ) {
                    s.append_show( 'rejected', value );
                }
            )
            ;

    })();

</div>
<div class="test-panel">
</div>
</div>



## Promise.prototype

### .catch( onRejected )

### .then( onFulfilled, onRejected )

> Appends fulfillment and rejection handlers to the promise, and returns a new promise resolving to the return value of the called handler, or to its original settled value if the promise was not handled (i.e. if the relevant handler onFulfilled or onRejected is not a function).

`onFulfilled`和`onRejected`为回调函数，`.then()`方法为Promise对象`添加`回调函数，并返回新的Promise对象，新对象的解析值为回调函数的返回值，如果提供的两个参数都`不是函数`，则返回original setted value




## async, await

ES7将会实现

