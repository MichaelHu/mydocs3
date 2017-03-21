# sass

> Syntactically Awesome StyleSheets, 语法上很牛逼的样式表。css扩展语言

1. <http://sass-lang.com>
2. docs: <http://sass-lang.com/documentation/file.SASS_REFERENCE.html>


## Features

* 兼容所有版本的CSS
* 多种特性，比其他扩展语言多
* 成熟，核心团队9年以上的耕耘
* 业界支持，主要的css扩展语言
* 巨大社区
* 框架内建，比如Compass， Bourbon和Susy


## 安装

    gem install sass
    sass style.scss
    sass --help

gem - build on Ruby

独立运行，需要使用`Ruby`环境。但是在`webpack`、`fis`、`gulp`等构建工具下，有很成熟的`node插件`可用。 



## c相关


### libsass

> A C/C++ implementation of a Sass compiler

github: <https://github.com/sass/libsass>



### sassc 

> libsass command line driver

github: <https://github.com/sass/sassc>






## node相关

> Node-sass is a library that provides binding for Node.js to `LibSass`, the `C version` of the popular stylesheet preprocessor, `Sass`.

`node-sass`: <https://github.com/sass/node-sass>

    npm install node-sass



## APIs

### &

> 父选择器引用

    a {
        &:hover { ... }
        body.firefox & { ... }
    }


    #main {
        // 复合selector，必须放在最前面
        &-sidebar { ... }
    }


### 嵌套属性

> 命名空间

    .funky {
        font: {
            family: fantasy;
            size; 30em;
            weight: bold;
        }
    }



### comments

* 标准注释：`/* ... */`
* 单行注释：`//`



### $

> Variables

* 不一定最外层定义
* 有作用域
* 里层定义通过某种方式也可全局使用

#### 嵌套作用域 

    $width: 5em;

    #main {
        width: $width;
    }


#### 全局声明

> `!global`后缀

    #main {
        $width: 5em !global;
        width: $width;
    }

    #sidebar {
        width: $width;
    }


#### 变量名之减号与下划线

> 等价


## #{}

> interpolation


## @mixin

函数


## @include

函数调用

## 其他@-规则和指令

### @import

扩展了css的`@import`指令

### @media
### @extend
### @at-root
### @debug
### @warn
### @error





## 数据类型

> 七种数据类型

* numbers: `1.2, 13, 10px`
* strings
* colors
* booleans
* nulls
* list of values
* maps

### Strings

* 两种类型的string
* 带引号的，如：`"Lucida Grande"` 或 `'http://sass-lang.com'`
* 不带引号的，如: `sans-serif`
* 一般是原封不动输出，不会改变类型（有引号或无引号）
* 特殊情况就是使用`#{}`，如下：

        @mixin firefox-message( $selector ) {
            body.firefox #{$selector}:before {
                content: "Hi, Firefox users!";
            }
        }
        
        @include firefox-message( ".header" );

    输出成：

        body.firefox .header:before {
            content: "Hi, Firefox users!";
        }





## 操作符

### == 以及 !=

> 所有类型都支持


### 数字操作符

* 关系操作符`<, >, <=,`  `>=`
* 除号，css支持的默认不会执行除法（毕竟sass是css的扩展），另外有几种特殊情况会进行除法。

        p {
            font: 10px/8px;                 // Plain CSS，不进行除法
            $width: 1000px;
            width: $width/2;                // 1. Uses a variable
            width: round(1.5)/2;            // 2. Uses a function
            height: (500px/2);              // 3. Uses parentheses
            margin-left: 5px + 8px/2px;     // 4. 使用了其他操作符如 +
            font: (italic bold 10px/8px);   // 在列表中，括号忽略，不进行除法
        }

    编译成：

        p {
            font: 10px/8px;
            width: 500px;
            height: 250px;
            margin-left: 9px;
        }




