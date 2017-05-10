# js-source-map

> 记录处理后的代码（比如压缩代码）与源码的对应关系

<http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html>


* 方便代码报错后的追查，可以对应到源码位置
* Chrome开启Source Map
* 处理后代码通过`注释指令`指明sourcemap文件

        // @ sourceMappingURL=/path/to/file.js.map


