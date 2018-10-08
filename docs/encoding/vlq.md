# vlq

> `Variable Length Quatity`，可变长度的量，参考wikipedia: <https://en.wikipedia.org/wiki/Variable-length_quantity>

## Features

* 目的是使用少量变长字节编码表示`大整数`，比如：
        decimal                         base63-vlq
        ------------------------------------------
        0                               A
        1                               C
        10                              U
        1234567890123456789012345       ggggggC
* 是一种`通用编码`( universal code )，MIDI音乐就使用该编码
* js中的`sourcemap`，也是使用vlq来进行`位置编码`


## Resources

* 关于`sourcemap`位置编码：<http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html>
* 在线演示网站：<http://murzwin.com/base64vlq.html>


## 编码实现

Mozilla在source-map的一个实现：
<https://github.com/mozilla/source-map/blob/master/lib/base64-vlq.js>
