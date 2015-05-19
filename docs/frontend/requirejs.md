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
    // use dependency list
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

    `注意`：有依赖定义情况下，requirejs会认为所有的依赖已经写明在依赖列表中，不会再对
    factory函数进行解析，获取其中require行所标示的依赖模块进行提前加载。所以有依赖列表
    情况下，必须把所有依赖都写出来。有依赖列表的方式能省去factory函数的解析。


    
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







## 关于r.js

> Runs RequireJS in Node and Rhino, and used to run the RequireJS optimizer

`两个功能`：

1. 在Node或Rhino等环境下运行`AMD规范`的项目
2. 优化器作用：`r.js`能对使用requirejs构建的前端项目进行部署优化，可将多个文件合并成单个文件，
    并进行压缩，从而避免大量对小文件的请求。



### 1. 作为优化器的使用方法

1. 下载`r.js`至项目根目录，一般来说与源码目录和发布目录同级，其github地址为：

        https://github.com/jrburke/r.js

2. 可以有两种方法来调用`r.js`，第一种为纯命令行方式：

        node r.js -o baseUrl=. paths.jquey=some/other/jquery name=main out=main-build.js    

    第二种为使用配置文件的方式，例如build.js，与r.js同级目录：

        node r.js -o build.js

    使用`-o`开启优化模式。一般项目推荐使用第二种方式。




### 2. build.js文件 


举例如下：


1. todo mvc的优化案例：

    可以在这里
    `
    http://www.webdeveasy.com/code/optimize-requirejs-projects/todo-mvc-optimized.zip
    `
    下载项目查看。


        ({
            appDir: './',
            baseUrl: './js',
            dir: './dist',
            modules: [
                {
                    name: 'main'
                }
            ],
            fileExclusionRegExp: /^(r|build)\.js$/,
            optimizeCss: 'standard',
            optimize: 'none',
            removeCombined: true,
            paths: {
                jquery: 'lib/jquery',
                underscore: 'lib/underscore',
                backbone: 'lib/backbone/backbone',
                backboneLocalstorage: 'lib/backbone/backbone.localStorage',
                text: 'lib/require/text'
            },
            shim: {
                underscore: {
                    exports: '_'
                },
                backbone: {
                    deps: [
                        'underscore',
                        'jquery'
                    ],
                    exports: 'Backbone'
                },
                backboneLocalstorage: {
                    deps: ['backbone'],
                    exports: 'Store'
                }
            }
        })



2. 其他案例： 


        {
            baseUrl: "../js",
            dir: "../dist",
            optimize: "uglify",
            optimizeCss: "standard.keepLines",
            mainConfigFile: "../js/main.js",
            removeCombined: true,
            fileExclusionRegExp: /^\./,
            modules: [
                {
                    name: "app/dispatcher",
                },
                {
                    name: "app/in-storage",
                    exclude: [
                        "jquery",
                        "app/common",
                        "pkg/DatePicker/app"
                    ]
                }
            ]
        }


3. 优化选项说明

* appDir

    应用程序的最顶层目录。可选的，如果设置了的话，r.js 会认为脚本在这个路径的子目录中，应用程序的文件都会被拷贝到输出目录（dir 定义的路径）。如果不设置，则使用下面的 baseUrl 路径。

* baseUrl

    默认情况下，所有的模块都是相对于这个路径的。如果没有设置，则模块的加载是相对于 build 文件所在的目录。另外，如果设置了appDir，那么 baseUrl 应该定义为相对于 appDir 的路径。

* dir

    输出目录的路径。如果不设置，则默认为和 build 文件同级的 build 目录。

* optimize

    JavaScript 代码优化方式。可设置的值：

    * "uglify：使用 UglifyJS 压缩代码，默认值；
    * "uglify2"：使用 2.1.2+ 版本进行压缩；
    * "closure"： 使用 Google's Closure Compiler 进行压缩合并，需要 Java 环境；
    * "closure.keepLines"：使用 Closure Compiler 进行压缩合并并保留换行；
    * "none"：不做压缩合并；

* optimizeCss

    CSS 代码优化方式，可选的值有：

    * "standard"：标准的压缩方式；
    * "standard.keepLines"：保留换行；
    * "standard.keepComments"：保留注释；
    * "standard.keepComments.keepLines"：保留换行；
    * "none"：不压缩；

* mainConfigFile

    如果不想重复定义的话，可以使用这个参数配置 RequireJS 的配置文件路径。

* removeCombined

    删除之前压缩合并的文件，默认值 false。

* fileExclusionRegExp

    要排除的文件的正则匹配的表达式。

* modules

    定义要被优化的模块数组。每一项是模块优化的配置，常用的几个参数如下：

    * name：模块名；
    * create：如果不存在，是否创建。默认 false；
    * include：额外引入的模块，和 name 定义的模块一起压缩合并；
    * exclude：要排除的模块。有些模块有公共的依赖模块，在合并的时候每个都会压缩进去，
        例如一些基础库。使用 exclude 就可以把这些模块在压缩在一个更早之前加载的模块中，
        其它模块不用重复引入。    






### 3. 优化原理

多个文件合并成一个文件，文件内由多个define方法构成，使用模块ID的方式：


    define('ID', [...], function(){});



比如合并好的文件如下：

    ...
    // 第一部分
    define("backboneLocalstorage", ["backbone"], (function (global) {
        return function () {
            var ret, fn;
            return ret || global.Store;
        };    
    }(this)));

    // 第二部分
    define('models/todo',['require','underscore','backbone'],function(require) {

        var _ = require('underscore');
        var Backbone = require('backbone');
    ...

    // 第三部分
    define('collections/todos',[
        'underscore',
        'backbone',
        'backboneLocalstorage',
        'models/todo'
    ], function( _, Backbone, Store, Todo ) {
      
        var TodosCollection = Backbone.Collection.extend({
            // Reference to this collection's model.
            model: Todo, 
    ...


其中，第二部分的代码在合并前为：

    define(function(require) {          
                                        
        var _ = require('underscore');  
        var Backbone = require('backbone');  

        ...


第三部分代码在合并前为：

    define([
        'underscore',
        'backbone',
        'backboneLocalstorage',
        'models/todo'
    ], function( _, Backbone, Store, Todo ) { 

        var TodosCollection = Backbone.Collection.extend({
            // Reference to this collection's model.
            model: Todo,
    ...

第一部分代码是新生成的，由于backbone.Localstorage.js没有使用AMD方式编写，所以使用shim（垫片）方式。





### 4. 参考资料

1. `前端优化：RequireJS Optimizer 的使用和配置方法`：
    http://www.cnblogs.com/lhb25/p/requirejs-ptimizer-using.html 

2. 翻译版：http://blog.jobbole.com/39205/

    原版： http://www.webdeveasy.com/optimize-requirejs-projects/


    
