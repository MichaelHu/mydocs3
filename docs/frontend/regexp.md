# regexp


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
    (?:p)       不计入子模式


### 不支持的特性 

其中有一些`Perl正则`的语法特性并不被`ECMAScript`支持，这些特性包括：

    s               单行模式标记
    x               扩展语法标记
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
    (?<name>p)      命名子模式 



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

#### 关于string.split

    string.prototype.split( separator, limit )

如果separator是一个正则表达式，那么会调用`RegExp.prototype[ @@split ]( string, limit )`

* 如果正则表达式reg为空的表达式，或者能匹配空字符串，那么split的结果为一个和字符串长度相等的数组，每个数组成员为一个字符，这种情况下，reg不会匹配字符串的首尾空串
* Only the first match at a given index of the String is considered, even if backtracking could yield a non-empty-substring match at that index, for example:

        // non-greedy
        /a*?/[ Symbol.split ]( 'ab' )           =>      [ 'a', 'b' ]
        // greedy
        /a*/[ Symbol.split ]( 'ab' )            =>      [ '', 'b' ]

* 如果正则表达式中包含`捕获`，那么每次匹配的反向引用结果也会被插入输出数组中，这个部分的理解很关键，否则对以下例子的理解会出现困难：

        /(a|b)/[ Symbol.split ]( 'abcab' )      =>      [ '', 'a', '', 'b', 'c', 'a', '', 'b', '' ]
        /a|b/[ Symbol.split ]( 'abcab' )        =>      [ '', '', 'c', '', '']
        /<(\/)?([^<>]+)>/[ Symbol.split ]( 'A<B>bold</B>and<CODE>coded</CODE>' )
            => 
        [ 'a', undefined, 'B', 'bold', '/', 'B', 'and', 'undefined, 'CODE', 'coded', '/', 'CODE', '' ]

    以上说明具体参考ECMAScript规范文档 <https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split>



## GREP正则

    # mac
    $ grep -E <pattern>
    # linux
    $ grep -P <pattern>



## AWK正则

### Tips

> todo

* 属于`比较全面`的正则表达式支持，但相比扩展正则表达式，存在一些不支持的特性
* `不支持`常用字符类：`\s`, `\d`等
* 支持：`+`, `*`
* 支持确定重复`a{3}`，但不支持范围重复`a{3,4}`
* 其正则替换函数`sub( r, t, s )`以及`gsub( r, t, s )`不支持子模式匹配串引用




## FIND正则

    $ find . -type f -iregex
    $ find . -type f -regex




## VIM正则

具体参考 <ref://../vim/vim.md.html> 的`Searching and Replacing`节的`pattern`部分。

### Tips

* 分两种模式，分别为`magic模式`以及`nomagic模式`

### magic mode

跟在以下字符后面的表达式，启用某种特定字符模式，在vim中可以通过`:help magic`获取相关帮助

        \v       \m         \M         \V        matches 
    'magic'   'nomagic'
    ============================================================================
        $       $           $         \$        matches end-of-line
        .       .           \.         \.        matches any character
        *       *           \*         \*        any number of the previous atom
        ~       ~           \~         \~        latest substitute string
        ()       \(\)       \(\)     \(\)    grouping into an atom
        |       \|          \|         \|        separating alternatives
        \a       \a         \a         \a        alphabetic character
        \\       \\         \\         \\        literal backslash
        \.       \.         .         .        literal dot
        \{       {          {         {        literal '{'
        a       a           a         a        literal 'a'





## SED正则 

### Tips

* 同`grep`，`find`等，支持`两种正则`，普通正则以及扩展正则

        sed -e 'command'

        # mac
        sed -Ee 'command'

        # linux
        sed -re 'command'

* sed的普通正则，与vim的magic正则类似，但也存在一些小的差别。vim的magic正则更强大一些
* 比如sed的普通正则，不支持`\+`，而需要使用`\{1,\}`来替代



## PHP正则

> PCRE - Regular Expressions ( Perl-Compatible )

    preg_split()
    preg_replace()
    preg_replace_callback()
    preg_match()
    preg_match_all()
    preg_grep()
    preg_filter()



## Nginx配置项正则

* 同是`PCRE`正则
* 支持`命名子模式`，使用括号包围，起始`?`后面用`<name>`指示当前子模式可用`name`获取

        ?<name>	    Perl 5.10 compatible syntax, supported since PCRE-7.0
        ?'name'	    Perl 5.10 compatible syntax, supported since PCRE-7.0
        ?P<name>    Python compatible syntax, supported since PCRE-4.0 

    举例如下：

        server {
            server_name   ~^(www\.)?(?<domain>.+)$;

            location / {
                root   /sites/$domain;
            }
        }


