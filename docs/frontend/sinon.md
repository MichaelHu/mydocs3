# sinon

> Standalone test `spies`, `stubs` and `mocks` for JavaScript. No dependencies, works with any unit testing framework.

> 加桩，模拟XMLHttpRequest等

* github: <https://github.com/sinonjs/sinon>
* website: <http://sinonjs.org>
* docs: <http://sinonjs.org/docs/>

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
    var stub = sinon.stub( object, 'method', func );
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


## Mocks


### APIs

    var mock = sinon.mock( obj );
    var expectation = mock.expects( 'method' );

    mock.restore();
    mock.verify();

    sinon.mock( jQuery ).expects( 'ajax' ).atLeast( 2 ).atMost( 5 );
    jQuery.ajax.verify();


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
    expectation.verify();




## Fake timers

## Fake XMLHttpRequest

## ...
