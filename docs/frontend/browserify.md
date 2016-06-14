# browserify memo

> Browserify lets you `require('modules')` in the browser by bundling up all of your dependencies.

<http://browserify.org>

> 不需要定义require，也能在浏览器中运行require('modules')


## 安装

    npm install -g browserify

## 例子

### main.js

    var unique = require('uniq');
    var data = [1, 2, 2, 3, 4, 5, 5, 5, 6];
    console.log(unique(data)); 

### 安装uniq模块

    npm install uniq

### 打包main.js

    browserify main.js -o bundle.js

### 浏览器中直接使用

    <script src="bundle.js"></script>


