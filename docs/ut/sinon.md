# sinon

> Standalone test `spies`, `stubs` and `mocks` for JavaScript. No dependencies, works with any unit testing framework.

> 加桩，模拟XMLHttpRequest等

## Resources

* github: <https://github.com/sinonjs/sinon> <iframe src="https://ghbtns.com/github-btn.html?user=sinonjs&repo=sinon&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>  
* website: <http://sinonjs.org>
* releases: <http://sinonjs.org/releases/>
* docs: <http://sinonjs.org/docs/>


## Versions

    3.2.1
    3.2.0
    3.1.0
    3.0.0 
        sinon.stub( obj, 'method' ).callsFake( func );
    2.4.1
    ...
    1.17.6



## Installations

    npm install sinon
    npm install --save-dev sinon


## Start

    sinon.spy()
    sinon.stub()


## Spies

### test spy

> A `test spy` is a function that `records` `arguments`, `return value`, the value of `this` and `exception` thrown (if any) for all its calls. A test spy can be an `anonymous` function or it can `wrap` an existing function.

* 是一个函数，带记录功能
* 能记录参数、返回值、this值以及异常 


### wrap existing

    {
        setUp: function () {
            sinon.spy(jQuery, "ajax");
        },

        tearDown: function () {
            jQuery.ajax.restore(); // Unwraps the spy
        },

        "test should inspect jQuery.getJSON's usage of jQuery.ajax": function () {
            jQuery.getJSON("/some/resource");

            assert(jQuery.ajax.calledOnce);
            assertEquals("/some/resource", jQuery.ajax.getCall(0).args[0].url);
            assertEquals("json", jQuery.ajax.getCall(0).args[0].dataType);
        }
    }


### APIs

    var spy = sinon.spy();
    var spy = sinon.spy( myFunc );
    var spy = sinon.spy( object, 'method' );

    spy.withArgs( arg1 [, arg2, ...] );
    spy.callCount
    spy.called
    spy.calledOnce
    spy.calledTwice
    spy.calledThrice
    spy.firstCall
    spy.secondCall
    spy.thirdCall
    spy.lastCall
    spy.calledBefore( anotherSpy )
    spy.calledAfter( anotherSpy )
    spy.calledOn( obj )
    spy.alwaysCalledOn( obj )
    spy.calledWith( arg1, arg2, ... )
    spy.returned( obj )
    ...

还有不少其他API，待补充。


## Stubs

### stubs

> Test stubs are functions (spies) with pre-programmed behavior. They support `the full test spy API` in addition to methods which can be used to alter the stub’s behavior.

* 是带有预编程行为的spy，支持所有spy的API
* 较之spy，还多了能够`修改行为`的方法

### 使用场景

* 控制一个方法的行为，使代码按指定的路径执行
* 阻止某个方法被直接调用，比如发起`XMLHttpRequest`的方法


### APIs

    var stub = sinon.stub();
    var stub = sinon.stub( object, 'method' );
    // v3.0.0开始已被移除
    var stub = sinon.stub( object, 'method', func );
    // v3.0.0开始使用以下方式
    var stub = sinon.stub( object, 'method' ).callsFake func );
    var stub = sinon.stub( obj );

    var stub = sinon.createStubInstance( MyConstructor );

    stub.withArgs( arg1[, arg2, ...] );
    stub.onCall( n );
    stub.onFirstCall();
    stub.onSecondCall();
    stub.onThirdCall();
    stub.returns( obj );
    stub.returnsArg( index );
    stub.returnsThis();
    stub.throws();
    stub.throws( 'TypeError' );
    stub.throws( obj );
    ...


还有挺多其他API，待补充


### Examples

	"test should stub method differently based on arguments": function () {
		var callback = sinon.stub();
		callback.withArgs(42).returns(1);
		callback.withArgs(1).throws("TypeError");

		callback(); // No return value, no exception
		callback(42); // Returns 1
		callback(1); // Throws TypeError
	}


## Mocks

> Mocks (and mock expectations) are fake methods (like spies) with pre-programmed behavior (like stubs) as well as pre-programmed expectations. A mock will fail your test if it is not used as expected.

1. 有预编程行为（类似stub）的虚拟方法（类似spy）
2. 同时还有预编程的期望（expectations）
3. mock若未按预期使用，会使测试失败
4. `expectations`同时实现了stub和spy的API
5. 一个测试用例`至多`使用`一个`mock
6. 附带一个可能让test失败（比如抛出异常）的内建预期，所以强制要求具体的实现细节。如果你不为一个特定调用加assertion的话，那么就不要mock，转而使用stub就行。


### APIs


#### Mocks

    var mock = sinon.mock( obj );
    var expectation = mock.expects( 'method' );

    mock.restore();

	// Verifies all expectations on the mock.
    mock.verify();

    sinon.mock( jQuery ).expects( 'ajax' ).atLeast( 2 ).atMost( 5 );
    jQuery.ajax.verify();


#### Expectations

    var expectation = sinon.expectation.create( [methodName] );
    var expectation = sinon.mock();
    expectation.atLeast( number );
    expectation.atMost( number );
    expectation.never();
    expectation.once();
    expectation.twice();
    expectation.thrice();
    expectation.exactly( number );
    expectation.withArgs( arg1, arg2, ... );
    expectation.withExactArgs( arg1, arg2, ... );
    expectation.on( obj );

	// Verifies the expectation and throws an exception if it's not met.
    expectation.verify();






## Fake timers

## Fake XMLHttpRequest

## ...
