# base64编码

> 基于`64个可打印字符`来表示`二进制数据`的表示方法。

比如可以将`二进制`数据进行base64编码，从而可以在`URL`中传输。


## Resources

* `wikipedia`: Base64 <https://en.wikipedia.org/wiki/Base64>
* 百度百科: Base64 <http://baike.baidu.com/link?url=5ic0OiXxTO5VgT0gRbw0VcDEj9NmNu6L4Ip1mEvmvAR24u1Fc1d4JHhSJsT9bOD1xdiwJznICl6FUtYLckU5jK>
* 从原理上搞定Base64编码 <http://www.cnblogs.com/luguo3000/p/3940197.html>
* `data URIs`: <https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs>
* w3c URI: <ref://../w3c/URL.md.html>
* js API: <https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding>


## 编码规则

* 把3个字节转成4个字节，`8 * 3 = 4 * 6`
* 最后多出来的字节有两种情况，多出来1个或2个字节，可以分别用`2个Base64字符`或`3个Base64字符`通过后面补0的方式来表示，没有码点的部分用`=`补齐


## Base64码表

 <img src="./img/base64-alphabet.png" style="max-height:500px;">

* 非字母字符： `+` `/`
* 特殊字符，用于补全： `=`
* Base64带`+`和`/`，不能直接在URL中传播，所以存在一些`编码变种`，见文末




## 编码例子1

> 4个Base64字符表示3个字符

    s 1 3                                   # 转前
    115 49 51                               # ASCII
    01110011 00110001 00110011              # 二进制
    011100 110011 000100 110011             # 6个一组（共4组）
    00011100 00110011 00000100 00110011     # 高两位分别补0
    28 51 4 51                              # 对应索引
    c z E z                                 # 转后

## 编码例子2

> 2个Base64字符表示1个字符，无码点部分补2个=

    A                                       # 转前
    65                                      # ASCII
    01000001                                # 二进制
    010000 010000                           # 6个一组（共2组）
    00010000 00010000                       # 高两位分别补0
    16 16                                   # 对应索引
    Q Q = =                                 # 转后


## 编码例子3

> 3个Base64字符表示2个字符，无码点部分补1个=

    B C                                     # 转前
    66 67                                   # ASCII
    01000010 01000011                       # 二进制
    010000 100100 001100                    # 6个一组（共3组）
    00010000 00100100 00001100              # 高两位分别补0
    16 36 12                                # 对应索引
    Q k M =                                 # 转后




## 编码变种

标准代码包含`+`和`/`，在一些场景下可能存在特殊含义，不能直接使用，从而衍生出一些编码变种。

### URL编码变种

将`+` `/`分别用`-` `_`替换


### 正则表达式编码变种

将`+` `/`分别用`!` `-`替换



## 编码方式

### Browser

    window.btoa( stringToEncode )
    window.atob( encodedData )

### Command line

> Linux / Mac OS

    # `-m` - use base64 encoding
    # `remotename` is required, but useless
    $ uuencode -m infile remotename
    $ uudecode -cp infile 
    $ uudecode -i -o outfile infile 

    file a:
    ABC

    # output to standard output
    $ uuencode -m a test
    begin-base64 644 test
    QUJDCg==
    ====

    # output to a file b
    $ uuencode -m -o b a test

    # decode and output to standard output
    $ uudecode -cp b
    ABC

    # decode and output to a new file
    $ uudecode -i -o c b

