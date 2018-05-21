# cmd

> Common Module Definition - 通用模块定义

## Resources

* CMD模块定义规范 <https://github.com/seajs/seajs/issues/242> 
* seajs <https://github.com/seajs/seajs> <iframe src="http://258i.com/gbtn.html?user=seajs&repo=seajs&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* amd <ref://./amd.md.html>
* umd <ref://./umd.md.html>

## Features

* `seajs`在推广过程中对`模块定义`的规范化产出


## 规范

* 一个模块就是一个文件
* `define`是一个`全局函数`，用于定义模块

        define( id?, deps?, factory )
        define( factory )

* factory可以是一个函数，也可以是一个对象或字符串
    
        define( { 'foo': 'bar' } )
        define( 'I am a template. My name is {{name}}.' )

* factory为函数时，接收三个参数：`require`, `exports`, `module`

        define( function( require, exports, module ) {
            // 模块代码
        } );

* `define.cmd`，是一个空对象，用于判定当前页面是否有CMD模块加载器

        if ( typeof define === 'function' && define.cmd ) {
            ...
        }

* `require`方法，是factory函数默认接收的第一个参数，接收模块标识为唯一参数，用来获取其他模块提供的接口

        define( function( require, exports ) {
            var a = require( './a' );
            a.doSomething();
        } );

* `require.async`方法

        require.async( id, callback? )

* `require.resolve`方法，用于解析并返回模块的绝对路径，该函数不会加载模块。

        define( function( require, exports ) {
            console.log( require.resolve( './b' ) );
            // ==> http://example.com/path/to/b.js
        } );

* `exports`对象，作为factory函数默认接收的第二个参数，用于向外提供模块接口。除了使用exports向外提供接口，还可以使用return直接向外提供接口。
