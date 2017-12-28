# RegExp Memo


> JS, PHP, vim, sed, grep, awk等，都有正则表达式的使用。


## JS正则

JavaScript正则表达式语法是`Perl5`正则的`大型子集`，在字符串处理上已经足够强大。

### Resources

* JS正则表达式：<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions>
* `RegExp`: <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp>


### 特殊字符

    字符        功能描述
    ==================================================
    ^           字符串开头，多行检索中，匹配行首
    $           字符串结尾，多行检索中，匹配行尾
    \o          NUL字符(\u0000)
    \t          制表符(\u0009)
    \v          垂直制表符(\u000B)
    \n          换行符(\u000A)
    \d
    \D
    \w          [a-zA-Z0-9_]
    \W
    \s          [\n\r\f\t\v\x20] 
    \b          单词边界
    \B          非单词边界
    [\b]        退格符
    \xhh
    \0dd 
    \cX         控制字符^X，例如\cJ等价与\n
    (?=p)       零宽正向先行断言
    (?!p)       零宽负向先行断言

### 不支持的特性 

其中有一些`Perl正则`的语法特性并不被`ECMAScript`支持，这些特性包括：

    s           单行模式标记
    x           扩展语法标记
    \a
    \e
    \l
    \u
    \L
    \U
    \E
    \Q
    \A
    \Z
    \z
    \G
    (?<=p)
    (?<!p)
    (?#p)



### 反向引用


#### 反向引用模式


格式：`\1, \2, \3, ..., \9`

不含转义的简单字符串，需要首尾引号匹配：

    /(['"])[^'"]*\1/

字符实体的`\0dd`的存在，也说明了不能使用从0为开始下标的反向引用




#### 反向引用模式匹配串


格式：`$&, $1, $2, $3, ..., $9`

    string.replace(/(<)[^>]+(>)/g, '$1...$2');

    
### API

#### RegExp对象

    reg.exec()
    reg.test()

#### String对象

    str.match()
    str.replace()
    str.search()
    str.split()



## GREP正则

    # mac
    $ grep -E <pattern>
    # linux
    $ grep -P <pattern>



## AWK正则

## FIND正则

    $ find . -type f -iregex
    $ find . -type f -regex

## VIM正则

    magic
        \<
        \>
    non-magic



## SED正则 


## PHP正则

> PCRE - Regular Expressions ( Perl-Compatible )

    preg_split()
    preg_replace()
    preg_replace_callback()
    preg_match()
    preg_match_all()
    preg_grep()
    preg_filter()

