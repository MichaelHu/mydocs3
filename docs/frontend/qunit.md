# QUnit Memo

> js单元测试工具，由jQuery团队开发，也是jQuery的官方测试套装。

<a href="http://qunitjs.com/">qunitjs.com</a>

npm: `npm install --save-dev qunitjs`

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
        equals(expr, expr, msg)
        same(expr, expr, msg)


    例子如：

        test('assertions', function() {
            equals( 2, 1, 'one equals one');
        })


        test('test', function() {
            same( {}, {}, 'passes, objects have the same content');
            same( {a: 1}, {a: 1} , 'passes');
            same( [], [], 'passes, arrays have the same content');
            same( [1], [1], 'passes');
        })


3. `结构化你的断言：`

        module(desp)

    例子如：

        module('Module A');
        test('a test', function() {});
        test('an another test', function() {});
         
        module('Module B');
        test('a test', function() {});
        test('an another test', function() {});


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
