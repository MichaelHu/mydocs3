# gzip

> `GZIP` implemented in pure JavaScript

* github: <https://github.com/beatgammit/gzip-js>
* 目的是把GZIP算法搬到浏览器端
* 下层调用了`crc32`, `deflate-js`，依赖库较大
* 主要面向node，而不是browser


## Installation

    npm install gzip-js


## Usage

    var gzip = require('gzip-js'),
        options = {
            level: 3,
            name: 'hello-world.txt',
            timestamp: parseInt(Date.now() / 1000, 10)
        };

    // out will be a JavaScript Array of bytes
    var out = gzip.zip('Hello world', options);


