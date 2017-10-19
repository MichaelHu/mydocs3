# amd

> Asynchronous Module Definition，`异步`模块定义


## Resources

* `amdjs-api`: <https://github.com/amdjs/amdjs-api> <iframe src="http://258i.com/gbtn.html?user=amdjs&repo=amdjs-api&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
* `AMD-api` doc: <https://github.com/amdjs/amdjs-api/blob/master/AMD.md>
* `commonjs`: <ref://./commonjs.md.html>
* `umd`: <ref://./umd.md.html>


## AMD api

### define()

    define( [ id , ] [ dependencies , ] factory );

#### 3参数

    define("alpha", ["require", "exports", "beta"], function (require, exports, beta) {
        exports.verb = function() {
            return beta.verb();
            // Or:
            return require("beta").verb();
        }
    });


#### 2参数

    define(["alpha"], function (alpha) {
        return {
            verb: function(){
                return alpha.verb() + 2;
            }
        };
    });

#### 1参数

    define({
        add: function(x, y){
            return x + y;
        }
    });


#### 简化版commonjs封装

    define(function (require, exports, module) {
        var a = require('a')
            , b = require('b')
            ;

        exports.action = function () {};
    });



### define.amd属性

对外指示`全局`的define函数是否支持`AMD API`：

    define.amd

可以是：
    
    define.amd = { multiversion: true };
    define.amd = {};




## r.js

能很好的进行模块打包，但`不支持md5版本号`




## fis-amd

不像官网所说那么可用，使用的时候存在不少坑，fis-amd demo实际也是带bug的，最明显的是重复加载问题。
<https://github.com/fex-team/fis-postprocessor-amd>

