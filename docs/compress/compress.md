# compress

## HTTP下行压缩

todo


## HTTP上行压缩

如何压缩HTTP请求正文：<https://imququ.com/post/how-to-compress-http-request-body.html>

讨论三种数据压缩格式：

* `DEFLATE`，是一种使用 Lempel-Ziv 压缩算法（LZ77）和哈夫曼编码的压缩格式。详见RFC 1951，实现方案：
    * <ref://./lz-string.md.html>
    * <ref://./lzw.md.html>
    * <ref://./lzma.md.html>
* `ZLIB`，是一种使用`DEFLATE`的压缩格式，对应 HTTP 中的`Content-Encoding: deflate`。详见RFC 1950，实现方案：
    * <ref://./pako.md.html>
* `GZIP`，也是一种使用`DEFLATE`的压缩格式，对应 HTTP 中的`Content-Encoding: gzip`。详见 RFC 1952
    * <ref://./gzip.md.html>
