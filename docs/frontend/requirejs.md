# requirejs相关资料

2014-09-30

> @[style="color:green;font-size:18px"]RequireJS implements the 
> Asynchronous Module Definition (formerly Transport/C) proposal.

## 使用方式

### data-main

    <script data-main="scripts/main" src="scripts/require.js"></script>

以上适用于页面只有一个入口脚本的情况。否则使用`内联require`的方式。

### 内联require

    <script src="scripts/require.js"></script>
    <script>
    require(['scripts/config']), function() {
        // Configuration loaded now, safe to do other require calls
        // that depend on that config.
        require(['foo'], function(foo) {

        });
    });
    </script>

## 关于baseUrl

* 所有的脚本都按相对于`baseUrl`的路径进行加载。通常同设置为`data-main`的脚本所在路径。

* 也可以通过`require.config`进行设置：

        require.config({
            baseUrl: "/another/path",
            paths: {
                "some": "some/v1.0"
            },
            waitSeconds: 15
        });

* 例外情况，如果module id存在以下情况，则`baseUrl`不生效：
    * 以`.js`结束
    * 以`/`开始
    * 包含URL协议，比如`http:`或者`https:`
    当然，推荐使用baseUrl

## 定义模块

1. 模块定义恰当处理了作用域，避免污染全局命名空间。
2. 显式列出依赖模块，并且能获得依赖模块的引用，而不需要通过全局对象的方式。使用了
    <a href="http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html">
    模块模式（Module Pattern）</a>
3. 定义方式使得模块能尽可能快的加载，又能按依赖关系顺序执行。
4. 需要了解的Module格式：`CommonJS module`，`RequireJS module`

### 有哪些方式？

1. 简单key/value对象

        // Inside file my/shirt.js:
        define({
            color: "black",
            size: "unisize"
        });

2. 定义函数

        // my/shirt.js now does setup work
        // before returning its module definition.
        define(function () {
            // Do setup work here

            return {
                color: "black",
                size: "unisize"
            }
        });

3. 带有依赖的定义函数

        // my/shirt.js now has some dependencies, a cart and inventory
        // module in the same directory as shirt.js
        define(["./cart", "./inventory"], function(cart, inventory) {
                // return an object to define the "my/shirt" module.
                return {
                    color: "blue",
                    size: "large",
                    addToCart: function() {
                        inventory.decrement(this);
                        cart.add(this);
                    }
                }
            }
        );
    
4. 定义一个模块为函数

    模块不一定必须返回一个对象，任何有效返回值都是可以的，比如函数。

        // A module definition inside foo/title.js. It uses
        // my/cart and my/inventory modules from before,
        // but since foo/title.js is in a different directory than
        // the "my" modules, it uses the "my" in the module dependency
        // name to find them. The "my" part of the name can be mapped
        // to any directory, but by default, it is assumed to be a
        // sibling to the "foo" directory.
        define(["my/cart", "my/inventory"],
            function(cart, inventory) {
                // return a function to define "foo/title".
                // It gets or sets the window title.
                return function(title) {
                    return title ? (window.title = title) :
                           inventory.storeName + ' ' + cart.name;
                }
            }
        );

5. 用简单CommonJS封装定义一个模块

    比如要复用`CommonJS`方式编写的模块，可以用这种方式封装。这种方式全依赖
    `Function.prototype.toString()`，使得requirejs可以通过解析require语句，分析出
    依赖关系。

        define(function(require, exports, module) {
                var a = require('a'),
                    b = require('b');

                // Return the module value
                return function () {};
            }
        );

6. 定义一个带名字的模块

        // Explicitly defines the "foo/title" module:
        define("foo/title",
            ["my/cart", "my/inventory"],
            function(cart, inventory) {
                // Define foo/title object in here.
           }
        );

### 模块定义注意

1. 一个文件只定义一个模块
2. 相对模块名的定义，务必将require作为依赖

        define(["require", "./relative/name"], function(require) {
            var mod = require("./relative/name");
        });
    
    或者更好的方式，可以简写成这样：

        define(function(require) {
            var mod = require("./relative/name");
        });

3. 如何生成相对于模块的路径：

        define(["require"], function(require) {
            var cssUrl = require.toUrl("./style.css");
        });

4. 对于已经通过`require(['module/name'], function(){})`加载了的模块，可以通过以下方式调用其内部函数：

        require("module/name").callSomeFunction()

## 多版本支持

通过`require.config`实现：

    <script src="../require.js"></script>
    <script>
    var reqOne = require.config({
      context: "version1",
      baseUrl: "version1"
    });

    reqOne(["require", "alpha", "beta",],
    function(require,   alpha,   beta) {
      log("alpha version is: " + alpha.version); //prints 1
      log("beta version is: " + beta.version); //prints 1

      setTimeout(function() {
        require(["omega"],
          function(omega) {
            log("version1 omega loaded with version: " +
                 omega.version); //prints 1
          }
        );
      }, 100);
    });

    var reqTwo = require.config({
          context: "version2",
          baseUrl: "version2"
        });

    reqTwo(["require", "alpha", "beta"],
    function(require,   alpha,   beta) {
      log("alpha version is: " + alpha.version); //prints 2
      log("beta version is: " + beta.version); //prints 2

      setTimeout(function() {
        require(["omega"],
          function(omega) {
            log("version2 omega loaded with version: " +
                omega.version); //prints 2
          }
        );
      }, 100);
    });
    </script>


## 关于传统CommonJS模块

传统CommonJS模块转成requirejs支持的格式：

    define(function(require, exports, module) {
        // Put traditional CommonJS module content here
    });


另一种支持的格式，可以通过返回一个值作为module.exports：

    define(function (require) {
        var foo = require('foo');

        //Define this module as exporting a function
        return function () {
            foo.doSomething();
        };
    });

还有一种格式，直接在define函数的参数中提供依赖数组，上一种方式可以改成：

    define(['foo'], function (foo) {
        return function () {
            foo.doSomething();
        };
    });

## todo
