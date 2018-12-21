# python

> Python is a programming language that lets you `work quickly` and `integrate systems more effectively`. 

<img src="./img/python-logo.png" height="50">

## Features

* 高效
* 强大的整合能力


## Resources

* `site`: <https://www.python.org>
* language reference - 3: <https://docs.python.org/3/reference/index.html>
* library reference - 3: <https://docs.python.org/3/library/index.html>
* built-in types -3: <https://docs.python.org/3/library/stdtypes.html>
* built-in functions - 3: <https://docs.python.org/3/library/functions.html>
* `Python 3`提供许多新特性
* 第一个使用`scrapy`爬虫项目：<http://cuiqingcai.com/990.html> todo
* `Anaconda`: <ref://./anaconda.md.html>
* `Jupyter`: <ref://./jupyter.md.html>


## Tips

* 布尔值使用`True/False`；null使用`None`
* 注释使用`#`为前缀后跟注释内容
* 字符串可以使用`单引号`或者`双引号`
* 命令行参数获取，在`sys`模块，sys.argv[ 0 ], sys.argv[ 1 ], ...；`没有sys.argc属性`，可以用`len( sys.argv )`代替
* 获取`管道输入`，可以使用`sys.stdin.read()`，获取的值为`块文本`
* python默认编码如果是ascii，那么如果处理非ascii编码时，可能出现以下错误提示：
        UnicodeEncodeError: 'ascii' codec can't encode character u'\u53c8' in position 358: ordinal not in range(128)





## 命令行工具

### python & pip

    python [option] ... [-c cmd | -m mod | file | -] [arg] ...
    pip command [options]


### 常用命令

    $ python main.py
    $ python -m jieba ...



## Built-in Types

    str
        class str( object='' )
        class str( object=b'', encoding='utf-8', errors='strict' )

    ...


## Built-in Functions

    abs()
    all()
    any()
    ascii()
    bin()
    ...
    dict()
    help()
    min()
    setattr()
    all()
    ...
    open()
    ord()
    pow()
    print()
    property()
    range()
    repr()
    reversed()
    round()
    set()
    slice()
    sorted()
    staticmethod()
    str()
    sum()
    sum()
    super
    tuple()
    type()
    vars()
    zip()
    __import__()



## CLI

    hudamin@local python $ python
    Python 2.7.10 (default, Jul 30 2016, 19:40:32)
    [GCC 4.2.1 Compatible Apple LLVM 8.0.0 (clang-800.0.34)] on darwin
    Type "help", "copyright", "credits" or "license" for more information.
    >>>

## Demos

    # Python 3: Fibonacci series up to n
    >>> def fib(n):
    >>>     a, b = 0, 1
    >>>     while a < n:
    >>>         print(a, end=' ')
    >>>         a, b = b, a+b
    >>>     print()
    >>> fib(1000)
    0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987

    # Python 3: List comprehensions
    >>> fruits = ['Banana', 'Apple', 'Lime']
    >>> loud_fruits = [fruit.upper() for fruit in fruits]
    >>> print(loud_fruits)
    ['BANANA', 'APPLE', 'LIME']
    
    # List and the enumerate function
    >>> list(enumerate(fruits))
    [(0, 'Banana'), (1, 'Apple'), (2, 'Lime')]


