# python

> Python is a programming language that lets you `work quickly` and `integrate systems more effectively`. 

<img src="./img/python-logo.png" height="50">


## Overview

* site: <https://www.python.org>
* Python 3提供许多新特性

### CLI

    hudamin@local python $ python
    Python 2.7.10 (default, Jul 30 2016, 19:40:32)
    [GCC 4.2.1 Compatible Apple LLVM 8.0.0 (clang-800.0.34)] on darwin
    Type "help", "copyright", "credits" or "license" for more information.
    >>>

### Demos

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


