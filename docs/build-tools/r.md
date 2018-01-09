# r

> 在`Node`或者Rhino环境下运行使用requirejs模块( `AMD` )的代码



## Features

* 提供在Node下使用`AMD`模块的能力
* 支持`插件`扩展，用于运行`RequireJS Optimizer`，提供浏览器运行环境的优化支持
* 支持将`CommonJS`模块`转换`成AMD模块
* requirejs出品


## Resources

* `github`: <https://github.com/requirejs/r.js> <iframe src="http://258i.com/gbtn.html?user=requirejs&repo=r.js&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* RequireJS `Optimizer`: <http://requirejs.org/docs/optimization.html>
* plugins: <http://requirejs.org/docs/plugins.html>
* Browserify: <ref://./browserify.md.html>


## Installation

    $ npm install -g requirejs
    $ npm install requirejs


## Usage

    # running AMD-based projects under Node
    $ r.js main.js

    # optimizer
    $ r.js -o path/to/buildconfig.js

    # print version 
    $ r.js -v 

    # convert commonjs modules 
    $ r.js -convert path/to/commonjs/dir output/dir 
