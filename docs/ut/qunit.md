# qunit

> js单元测试工具，由`jQuery`团队开发，也是jQuery的官方测试套装。

## Resources

* site: <http://qunitjs.com/>
* api: <http://api.qunitjs.com>
* github: <https://github.com/qunitjs/qunit> <iframe src="http://258i.com/gbtn.html?user=qunitjs&repo=qunit&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>  


## Versions

* 2.4.0 <https://github.com/qunitjs/qunit/tree/2.4.0>
* 1.23.1 <https://github.com/qunitjs/qunit/tree/1.23.1>
* QUnit 2.x Upgrade Guide <http://qunitjs.com/upgrade-guide-2.x/> 
    * globals只开放`QUnit`，其他相关的方法挂到该namaspace下，比如：
            old                     2.x
            ------------------------------------------
            module()                QUnit.module()
            test()                  QUnit.test()
            stop(), start()         assert.async()
            equal()                 assert.equal()
            deepEqual()             assert.deepEqual()
            ok()                    assert.ok()
            module:setup()          module:beforeEach()
            module:teardown()       module:afterEach()
            QUnit.log = callback    QUnit.log( callback )
            QUnit.push()            QUnit.pushResult()
            QUnit.init()            removed
            QUnit.reset()           removed，需要自行分成多个test
            QUnit.jsDump()          QUnit.dump()
    * 全局断言函数，全都放到了`assert`下面，assert通过`函数参数`传入

            QUnit.test( 'a test', function( assert ) {
                assert.expect( 2 );
                ...
            } );

    * `QUnit.test()`的第二个参数，移至callback内部，用`assert.expect( value )`代替


## Installation

### 浏览器

QUnit单测文件下载：

* 2.4.0 js: <https://code.jquery.com/qunit/qunit-2.4.0.js>
* 2.4.0 css: <https://code.jquery.com/qunit/qunit-2.4.0.css>

或者：

    curl -O https://code.jquery.com/qunit/qunit-2.4.0.js \
        -O https://code.jquery.com/qunit/qunit-2.4.0.css


### 命令行

    $ npm install --save-dev qunitjs
    $ yarn add qunitjs --dev
    $ bower install --save-dev qunit




## 一、测试方法

`脚手架HTML代码：`

    <!DOCTYPE html>
    <html>
    <head>
        <title>QUnit Test Suite</title>
        <link rel="stylesheet" href="http://github.com/jquery/qunit/raw/master/qunit/qunit.css" type="text/css" media="screen">
        <script type="text/javascript" src="http://github.com/jquery/qunit/raw/master/qunit/qunit.js"></script>
        <!-- Your project file goes here -->
        <script type="text/javascript" src="myProject.js"></script>
        <!-- Your tests file goes here -->
        <script type="text/javascript" src="myTests.js"></script>
    </head>
    <body>
        <h1 id="qunit-header">QUnit Test Suite</h1>
        <h2 id="qunit-banner"></h2>
        <div id="qunit-testrunner-toolbar"></div>
        <h2 id="qunit-userAgent"></h2>
        <ol id="qunit-tests"></ol>
    </body>
    </html>

1. 使用以上脚手架
2. 引入项目js文件和test文件
3. 浏览器中访问


## 二、关键测试方法

> test文件中测试用例的写法

1. `建立测试用例：`

        test(desp, func)

    例子如：

        // Let's test this function
        function isEven(val) {
            return val % 2 === 0;
        }
         
        test('isEven()', function() {
            ok(isEven(0), 'Zero is an even number');
            ok(isEven(2), 'So is two');
            ok(isEven(-4), 'So is negative four');
            ok(!isEven(1), 'One is not an even number');
            ok(!isEven(-7), 'Neither is negative seven');
        })
        

2. `断言类型：`

        ok(expr, msg)
        equal(expr, expr, msg)
        notEqual(expr, expr, msg)
        same(expr, expr, msg)
        deepEqual(expr, expr, msg)
        strictEqual(expr, expr, msg)


    `equals`已经废弃，新版本使用`equal`

    `same`已经废弃，新版本使用`deepEqual`


    例子如：

        test('assertions', function() {
            equal( 2, 1, 'one equals one');
        })


        test('test', function() {
            deepEqual( {}, {}, 'passes, objects have the same content');
            deepEqual( {a: 1}, {a: 1} , 'passes');
            deepEqual( [], [], 'passes, arrays have the same content');
            deepEqual( [1], [1], 'passes');
        })


3. `结构化你的断言：`

        module(desp, options)

    例子如：

        module('Module A');
        test('a test', function() {});
        test('an another test', function() {});
         
        module('Module B');
        test('a test', function() {});
        test('an another test', function() {});

        module('History', {
            setup: function(){
                History.start();
            }   
                
            , teardown: function(){
                History.stop();
            } 
        }); 


4. `异步测试`，使用`stop()`和`start()`：

        test('asynchronous test', function() {
            // Pause the test first
            stop();
         
            setTimeout(function() {
                ok(true);
         
                // After the assertion has been called,
                // continue the test
                start();
            }, 100)
        })

    或者使用`asyncTest`:

        asyncTest('asynchronous test', function() {
            // The test is automatically paused
         
            setTimeout(function() {
                ok(true);
         
                // After the assertion has been called,
                // continue the test
                start();
            }, 100)
        })

5. `捕获没有执行的断言`，使用`expect(num)`：

        // A custom function
        function ajax(successCallback) {
            $.ajax({
                url: 'server.php',
                success: successCallback
            });
        }
         
        // Tell QUnit that you expect three assertion to run
        test('asynchronous test', 3, function() {
            // Pause the test
            stop();
         
            ajax(function() {
                ok(true);
            })
         
            ajax(function() {
                ok(true);
                ok(true);
            })
         
            setTimeout(function() {
                start();
            }, 2000);
        })   
