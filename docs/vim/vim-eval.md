# vim-eval

> vim programming

## Resources

* 帮助：`:help eval`
* vim - <ref://./vim.md.html>


## 编译选项

    +eval


## 变量类型

### 六种普通类型

    Number
        A 32 or 64 bit signed number. +num64
        -123 0x10 0177 0b1011

    Float
        123.456 1.15e-6 -1.1e3

    String 
        NUL-terminated 8-bit unsigned characters
        "ab\txx\"--"  " 双引号内可以使用反斜线转义，可转义'\t', '\n'等
        'x-z''a,c'    " 单引号内不可以使用反斜线转义，单引号本身用两个单引号进行转义


    List 
        有序序列
        [1, 2, ['a', 'b']]

    Dictionary - 与js object非常类似
        关联无序序列
        {'blue': '#0000ff', 'red': "#ff0000"}

    Funcref 
        function("strlen")
        " 函数绑定
        function("callback", [arg], myDict)

        :let Cb = function('Callback', [ 'foo' ], myDict )
        :call Cb
        " 等同于以下调用
        :call myDict.Callback( 'foo' )


`Number`和`String`之间依据使用场景自动转换。

    Number 123      =>      String "123"
    Number 0        =>      String "0"
    Number -1       =>      String "-1"

    String "456"    =>      Number 456
    String "6ab"    =>      Number 6
    String "aab"    =>      Number 0
    String "0100"   =>      Number 64

    :echo "0100" + 0
    64
    :echo str2nr( '0100' )
    100
    :echo str2nr( '0100', 8 )
    64

    :if "foo"
    :" NOT executed

    :if "8foo"
    :" executed

    :if !empty( "foo" )

注意`Float`与`String`之间不会进行自动转换。


#### String

> 获得帮助： `:help string`

* 双引号字符串"string"
        \...
        \..
        \.
        \x..
        \x.
        \X..
        \X.
        \u....
        \U....
        \b
        \e
        \f
        \n
        \r
        \t
        \\
        \"
        \<xxx>

* 单引号字符串'string'
    


### 三种特殊类型

    Special
        v:false v:true v:none v:null

    Job
        用于job

    Channel
        用于channel


### Funcref

`函数引用`的`目的`，就是用一个其他的变量来保存对该函数的引用，后续可以像函数名一样使用

    " 定义dict的子方法init，内部self指向dict本身，dict必须是已经存在的对象
    " 如果init key已经存在，会报错，但可以通过添加`!`进行强行覆盖
    :function dict.init() dict
    :   let self.val = 0
    :endfunction

    :call dict.init()

    :let func = string( Fn )    " 通过string()函数获得函数name
    :let func

    :let Fn = function( "MyFunc" )
    :echo Fn()
    :let r = call( Fn, mylist )


#### Tips

* 函数引用变量必须以`大写字母`, `s:`, `w:`, `t:` 或 `b:`开头，最后两种已经不支持（todo）
* 命令语句用换行分隔，如在单行内，则用`|`分隔；类比一下，shell语句也用换行分隔，单行内，使用`;`分隔
* `:fu`或`:function`列出所有函数及其参数
* 使用`range`函数，处理需要在每行之间`共享上下文`的情况，可参考`~/.vimrc`中`F_prefix_line_number`的实现
* 使用`setline()`, `append()`等往缓冲区输出内容
* 使用`getline()`从缓冲区获取内容
* 使用`:echo`命令往控制台输出内容
* 使用`system()`执行shell命令，并获取返回结果
* 使用`:normal`, `:silent`等，扩展command line模式，可以在该模式下运行`normal模式`下的命令。但目前所知，这些命令只能在`命令行模式下生效`，而在`函数中`调用则`不生效`。或许`:exe {expr1} ...`命令会更强大，可以在函数内调用
* 使用寄存器传递数据
* 使用特殊寄存器`触发`事件，比如`@/`



#### 函数定义

如下格式进行定义：

    " range   - 接收range参数，如"a:firstline", "a:lastline"
    " abort   - 有错误发生则退出函数
    " dict    - 函数必须通过Dict的一个entry来调用，内部的self会设置为Dict本身
    " closure - 闭包模式，内部函数能使用外部scope的变量
    " !       - 是否强行覆盖已有函数名
    :fu[!] {name}([arguments]) [range] [abort] [dict] [closure]

* 参数引用，使用`a:`前缀，比如`a:name`, `a:age`


#### 函数参数

* 获取帮助：`:help function-argument`
* 可以用`名称`命名函数参数
* 内部使用`a:`前缀引用函数参数，`本地变量`定义后可直接使用，如果引用`全局变量`，需要用`g:`前缀
* 最多支持`20`个参数
* 支持`可选参数列表`，用`...`表示

        引用        含义
        =================================
        a:0         可选参数个数
        a:1         第一个可选参数
        a:000       可选参数列表

以下例子输出所有的可选参数：

    for item in a:000
        echo item
    endfor



#### 普通函数

    :fu! Addd( a, b )
    :   return a:a + a:b
    :endfu

    :echo Addd( 1, 3 )
    4

    :let F_Addd = function( 'Addd' )
    :echo F_Addd( 4, 5 )
    9


#### 闭包函数

    :function! Foo()
    :   let x = 0
    :   function! Bar() closure
    :       let x+= 1
    :       return x
    :   endfunction 
    :   return funcref( 'Bar' )
    :endfunction

    :let F = Foo()
    :echo F()
    1
    :echo F()
    2
    :echo F()
    3


#### range函数

    " 将每一行的字节数输出到标准输出
    :fu! CharCount()
    :   echo strlen( getline( '.' ) )
    :endfu

    " 将每一行替换成字节数
    :fu! CharCount_w()
    :   call setline( '.', strlen( getline( '.' ) ) )
    :endfu

    " todo：自处理range的函数
    :fu! CharCount() range
    :    echo a:firstline
    :endfu

参考`~/.vimrc`的`F_prefix_line_number()`实现
         

#### 函数调用

    :[range]call {name}([arguments])

* 最多支持`20`个参数
* 返回值会被`忽略`
* 调用某些`有返回值`的函数，`必须获取`其返回值，否则报错

        " 会报错
        append( line( '.' ), l:line )
        " 正确方式为用变量获取返回值
        let failed = append( line( '.' ), l:line )


#### Examples

##### 读取文件指定的行

    " get lines from file, and append to the position after the cursor
    " @param {string} file      - absolute file path
    " @param {number} start     - the start line number which starts from 1, it
    "                             can be negative
    " @param {number} count     - the count of lines to read in, '$' stands for
    "                             `total - start + 1`
    " @usage    :call F_r( '/path/to/file', 5, 10 )
    "           :call F_r( '/path/to/file', -30, 10 )
    "           :call F_r( '/path/to/file', 20, '$' )
    "           :call F_r( '/path/to/file', -5, '$' )
    fu F_r( file, start, count ) abort
        " let lines = readfile( a:file, '', 10000 )
        let lines = readfile( a:file )
        let start_line = a:start
        let line_count = a:count
        let cur_read_line = 1
        let cur_append_line = line( '.' )
        let total = len( lines )
        echo 'total lines: ' . total

        " normalize start_line
        " if start is negative, from the last `0 - start` line
        if start_line < 0
            let start_line = start_line % total
            let start_line = total + start_line + 1
        elseif start_line == 0
            let start_line = 1
        endif

        " normalize line_count
        if line_count == '$' || line_count > total - start_line + 1
            let line_count = total - start_line + 1 
        endif



        for l:line in lines
            if cur_read_line >= start_line && cur_read_line < start_line + line_count
                " echo cur_read_line . l:line
                call append( cur_append_line, l:line )
                let cur_append_line += 1
            endif
            if cur_read_line >= start_line + line_count
                break
            endif
            let cur_read_line += 1
        endfor
        echo 'read lines: ' . ( cur_read_line - start_line ) 
    endfu



##### 获取当前buffer全路径

    " get the full path of current buffer, and put it into mac clipboard 
    " @usage :call F_current_buffer_fullpath()
    fu F_current_buffer_fullpath() abort
        let curFile = getreg( '%' )
        if match( curFile, "^/" ) != 0
            let curFile = getcwd() . '/' . curFile
        endif
        echo 'Path: ' . curFile
        call system( 'echo -n ' . curFile . ' | pbcopy' )
    endfu


##### 将选中文本复制到mac剪贴板

> 针对当前`缓冲区`的操作

    " copy the selected text under visual mode into mac clipboard
    " @usage "zy:call F_copy_selected_text()
    fu F_copy_selected_text() abort
        let text = getreg( 'z' )
        let tmpFile = '/tmp/vim-selected-text'
        let text = substitute( text, '\%x00', '\r', 'g' )
        let lineCount = len( split( text, '\r', 1 ) )
        " compute accurate linecount
        if strridx( text, "\r" ) == strlen( text ) - 1
            let lineCount = lineCount - 1
        endif
        call writefile( [ text ], tmpFile, 'b' )
        call system( 'cat ' . tmpFile . ' | pbcopy' )
        echo 'copy ' . lineCount .' lines successfully'
    endfu



##### 将选中文本增量复制到mac剪贴板

    " increment-copy selected text under visual mode into mac clipboard 
    " @usage "zy:call F_inc_copy_selected_text()
    fu F_inc_copy_selected_text( ... ) abort
        let text = getreg( 'z' )
        let tmpFile = '/tmp/vim-inc-selected-text'
        let text = substitute( text, '\%x00', '\r', 'g' )
        let lineCount = len( split( text, '\r', 1 ) )
        " compute accurate linecount
        if strridx( text, "\r" ) == strlen( text ) - 1
            let lineCount = lineCount - 1
        endif
        let flag = 'a'
        if a:0 > 0 && a:1 == 1
            let flag = ''
        endif
        call writefile( [ text ], tmpFile, flag )
        call system( 'cat ' . tmpFile . ' | pbcopy' )
        echo 'inc copy ' . lineCount .' lines successfully'
    endfu




##### 为有序列表添加数字下标

    " prefix line number for selected lines, like '<line number>. xxxx'
    fu F_prefix_line_number() range abort
        let cur_line = a:firstline
        let item_index = 1
        while cur_line <= a:lastline 
            let text = getline( cur_line )
            let new_text = substitute( text, '^[0-9]\+\. ', '', 'g' )
            let need_substitute = match( new_text, '^[^ \t]' ) == 0
            if need_substitute
                let new_text = substitute( new_text, '^\([^ \t]\)', item_index . '. \1', 'g' )
                call setline( cur_line, new_text )
                let item_index += 1
            endif
            let cur_line += 1 
        endwhile
    endfu




##### 根据文件类型获取注释标记

    " get comment label according to filetype of current buffer
    fu F_get_comment_label() abort
        " get filetype option
        let filetype = &ft
        if filetype == 'javascript' 
            return '// '
        elseif filetype == 'sh'
            return '# '
        elseif filetype == 'vim'
            return '" '
        else
            return ''
        endif
    endfu



##### 根据文件类型去除注释标记 

    " uncomment according to filetype of current buffer
    fu F_uncomment() abort
        let commentLabel = F_get_comment_label() 
        let lineText = getline( '.' )
        if match( lineText, '^[\t ]*' . commentLabel ) == 0 
            let lineText = substitute( lineText, commentLabel, '', 'g' )
            call setline( '.', lineText )
        endif
    endfu







### 变量前缀 - 命名空间

> 开始于`let`， 销毁于`unlet`

* `无前缀`，若在函数内，则为函数局部变量；否则就是全局变量
* `b:`前缀，当前缓冲区变量
* `w:`前缀，当前窗口变量
* `t:`前缀，当前tag page变量
* `g:`前缀，全局变量
* `l:`前缀，函数局部变量
* `s:`前缀，vim script局部变量
* `a:`前缀，`函数参数`，仅在函数内部
* `v:`前缀，全局变量，Vim预定义


### let命令
    
    " 列出所有变量
    :let

    :let {var-name} = {expr1}
    :let {var-name}[{idx}] = {expr1}
    ...

    :let [{name}, ..., ; {lastname}] = {expr1}  
    :let [{name}, ..., ; {lastname}] .= {expr1}  
    :let [{name}, ..., ; {lastname}] += {expr1}  
    :let [{name}, ..., ; {lastname}] -= {expr1}  

    " 环境变量
    :let ${env-name} = {expr1}
    :let ${env-name} .= {expr1}

    " 寄存器
    :let @{reg-name} = {expr1}
    :let @{reg-name} .= {expr1}

    " option
    :let &{option-name} = {expr1}
    :let &{option-name} .= {expr1}
    :let &{option-name} += {expr1}
    :let &{option-name} -= {expr1}

    " local-option
    :let &l:{option-name} = {expr1}
    :let &l:{option-name} .= {expr1}
    :let &l:{option-name} += {expr1}
    :let &l:{option-name} -= {expr1}

    " global-option
    :let &g:{option-name} = {expr1}
    :let &g:{option-name} .= {expr1}
    :let &g:{option-name} += {expr1}
    :let &g:{option-name} -= {expr1}


    " 例子
    :let i=5
    :let [a, b] = [1, 10]
    :let [a, b] += [ 100, 200 ]
    :echo a
    :echo b


## 操作符

    操作符      描述
    ==============================
    +           算术运算 - 加
    .           字符串连接
    .=          字符串连接并赋值 
    +=          算数运算 - 加
    -=
    %=
    /=
    *=
    %
    ==
    <=
    >=
    <
    >
    !=
    &&
    ||
    |           命令分隔符，可将多行合并成一行

* 不存在`++`, `--`等，每次赋值都需要用`let`命令


### 例子

    :echo 123 + 456
    579
    :echo 123 . 456
    123456



## Command-line

### Tips

*  每一行都是一个`命令`，`都以命令行命令开始`，在行内可以调用内建函数
*  `:`前缀与命令中间可以带空格

> 注意`命令行`与`函数`的区别

    :let
    :unlet
    :set
    :echo
    :call

以上皆为命令行命令，以`冒号开头`，而函数并不以冒号开头。当然call除了有命令格式`:call`之外，还有函数格式`call()`。以下为一些`内建`函数：

    line()
    col()
    append()


### 命令列表

#### 表达式命令

总共`25`个表达式命令，用在每一行的`首部`。

    :let
    :unlet
    :lockvar
    :unlockvar
    :if
    :endif
    :else
    :elseif
    :while
    :endwhile
    :for {var} in {list}
    :endfor
    :continue
    :break
    :try
    :endtry
    :catch
    :finally
    :throw
    :echo
    :echon
    :echohl
    :echomsg
    :echoerr
    :execute

* 注意，没有提供`:switch`命令


##### execute命令

> 获得帮助：`:help :exe`

    :exe[cute] {expr1} ..

将`{expr1}`表达式获得的字符串作为Ex command执行
* 多个expr`组装`成字符串时，自动使用`空格`隔开；如果不希望有空格，则使用`.`将多个字符串连接起来
* 可用于封装那些不接受`|`的命令，使得可在这些命令后添加其他命令
        :exe '!ls' | echo 'theend'
        :exe '!ps aux' | echo 'success'
    以上命令可以在执行完外部命令，还可以执行vim命令
* `:exe`还能提供一种便利，使得你在vim脚本中执行`:normal`命令时不需要输入控制字符
        :exe "normal ixxx\<Esc>"
* 使用时，需要注意字符串在特定场景中的转义，比如`文件名`，在Command-line或外部shell命令行环境下的转义：`fnameescape`与`shellescape()`
        :exe "e " . fnameescape( filename )
        :exe "!ls " . shellescape( filename, 1 )
* `:exe`, `:echo`, `:echon`都不能直接跟注释，但可以在先跟上`|`，再跟注释
         :echo "foo" | "this is a comment



#### 函数相关

`5个`函数相关命令。

    :function
    :endfunction
    :delfunction
    :return
    :call

#### 其他命令

更多可以参考<ref://./vim.md.html>


### 条件语句

    :if {expr1}
    : ...
    :el[se]
    : ...
    :en[dif]

    :if {expr1}
    : ...
    :elsei[f] {expr2}
    : ...
    :en[dif]

    " 例子
    :if version >= 500
    : echo 'Correct version'
    :endif


### 循环语句

    :wh[ile] {expr1}
    : ... 
    :endw[hile]

    :for {var} in {list}
    : ...
    :endfo[r]

    " 支持解构
    :for [{var1}, {var2}, ...] in {listlist}
    :   if {expr1}
    :       con[tinue]
    :   endif
    :endfo[r]

    " 例子
    :let i = 1
    :while i <= 10 
    :   echo i
    :   let i=i+1
    :endwhile


## Built-in Functions

> 查询内建函数概要用法：`:help functions`<br>
> 查询内建函数具体用法：`:help funcname()`<br>
> 查询内建函数列表：`:help function-list`

`call()函数`使用函数引用作为第一个参数，函数引用需要使用`function()`来获取。

函数引用必须`首字母大写`。

    :let F_max = function("max")
    :echo F_max([1, 2, 3, 4])

同时还有`:call命令`，注意这两者的区别：

    :call F_max([1,2,3])
    :let m = call(F_max, [ [10,5] ])

注意`不是以下写法`：

    :let m = call(F_max, [10, 5])

第二个参数是一个列表，按序存储参数，call函数的格式：

    call({func}, {arglist} [, {dict} ])

比如要计算列表mylist的最大值，应该这么调用：

    :let m = call(F_max, [ mylist ])  
    :let m = call(function('max'), [ mylist ])


* len
* strlen
* empty
* string
* 字符串拼接符：`.`





### Working with text in the current buffer

    getline()               get a line or list of lines from the buffer
    setline()               replace a line in the buffer
    append()                append line or list of lines in the buffer
    indent()                indent of a specific line
    cindent()               indent according to C indenting
    lispindent()            indent according to Lisp indenting 
    nextnonblank()          find next non-blank line
    prevnonblank()          find previous non-blank line
    search()                find a match for a pattern
    searchpos()             find a match for a pattern
    searchpair()            find the other end of a start/skip/end
    searchpairpos()         find the other end of a start/skip/end
    searchdecl()            search for the declaration of a name


#### getline()

    getline({lnum} [, {end}])

    :echo getline(1)
    :echo getline('.')
    :echo getline('$')
    :echo getline('.', '$')
    :echo getline(1, '$')


    :let start = line('.')
    " search the last non-blank line
    :let end = search("^$") - 1
    :let lines = getline(start, end)


#### search()

    search({pattern} [, {flags} [, {stopline} [, {timeout}]]])

pattern是一个regexp，其开启`ignorecase`, `smartcase` and `magic`

以下代码循环参数列表中列出的所有文件，并做替换更新。

    :let n = 1
    :while n <= argc()      " loop over all files in arglist
    :  exe "argument " . n
    :  " start at the last char in the file and wrap for the
    :  " first search to find match at start of file
    :  normal G$
    :  let flags = "w"
    :  while search("foo", flags) > 0
    :    s/foo/bar/g
    :    let flags = "W"
    :  endwhile
    :  update               " write the file if modified
    :  let n = n + 1
    :endwhile




### String manipulation

    nr2char()               get a character by its ASCII value
    char2nr()               get ASCII value of a character
    str2nr()                convert a string to a Number
    str2float()             convert a string to a Float
    printf()                format a string according to % items
    escape()                escape characters in a string with a '\'
    shellescape()           escape a string for use with a shell command
    fnameescape()           escape a file name for use with a Vim command
    tr()                    translate characters from one set to another
    strtrans()              translate a string to make it printable
    tolower()               turn a string to lowercase
    toupper()               turn a string to uppercase
    match()                 position where a pattern matches in a string
    matchend()              position where a pattern match ends in a string
    matchstr()              match of a pattern in a string
    matchlist()             like matchstr() and also return submatches
    stridx()                first index of a short string in a long string
    strridx()               last index of a short string in a long string
    strlen()                length of a string
    substitute()            substitute a pattern match with a string
    submatch()              get a specific match in a ":substitute"
    strpart()               get part of a string
    expand()                expand special keywords
    iconv()                 convert text from one encoding to another
    byteidx()               byte index of a character in a string
    repeat()                repeat a string multiple times
    eval()                  evaluate a string expression



#### strridx()

    strridx({haystack}, {needle} [, {start}]) 

* 注意：`needle`是字符串，`不是pattern`，所以要查找回车符，需要用`"\r"`而不是`'\r'`
* `split()`, `match()`等都是使用pattern的


#### stridx()


#### match()

    match({expr}, {pat}[, {start}[, {count}]]) 

比如`取消注释`的函数实现：

    " uncomment according to filetype of current buffer
    fu F_uncomment() abort
        let commentLabel = F_get_comment_label() 
        let lineText = getline( '.' )
        if match( lineText, '^[\t ]*' . commentLabel ) == 0 
            let lineText = substitute( lineText, commentLabel, '', 'g' )
            call setline( '.', lineText )
        endif
    endfu



#### eval()

    " Numbers
    :echo string( 123 )
    :echo eval( '123' )
    123

    " Floats
    :echo eval( '123.456' )
    123.456

    " Funcref
    :let F_comment_label = function( 'F_get_comment_label' )
    :echo eval( 'F_comment_label' )
    F_get_comment_label

* 是`string()`的反函数，支持Numbers, Floats, Strings以及它们的组合，同时支持Funcref
* 与`:exe`的区别，一个是命令，一个是函数；而且它们的功能也迥异






### Cursor and mark position

    col()                   column number of the cursor or a mark
    virtcol()               screen column of the cursor or a mark
    line()                  line number of the cursor or mark
    wincol()                window column number of the cursor
    winline()               window line number of the cursor
    cursor()                position the cursor at a line/column
    getpos()                get position of cursor, mark, etc.
    setpos()                set position of cursor, mark, etc.
    byte2line()             get line number at a specific byte count
    line2byte()             byte count at a specific line
    diff_filler()           get the number of filler lines above a line

#### col()

    :echo col('.')      " the cursor position
    :echo col('$')      " the end of the cursor line
    :echo col("'x")     " position of mark x

#### line()

    :echo line('.')     " the cursor position
    :echo line('$')     " the last line in the current buffer
    :echo line("'x")    " position of mark x
    :echo line('w0')    " first line visible in current window
    :echo line('w$')    " last line visible in current window
    :echo line('v')     " the start of the Visual area in visual mode, and the
                        " cursor position when not in visual mode 






### List manipulation

    get()                   get an item without error for wrong index     
    len()                   number of items in a List
    empty()                 check if List is empty
    insert()                insert an item somewhere in a List            
    add()                   append an item to a List
    extend()                append a List to a List
    remove()                remove one or more items from a List          
    copy()                  make a shallow copy of a List                 
    deepcopy()              make a full copy of a List
    filter()                remove selected items from a List             
    map()                   change each List item 
    sort()                  sort a List
    reverse()               reverse the order of a List
    split()                 split a String into a List
    join()                  join List items into a String                 
    range()                 return a List with a sequence of numbers
    string()                String representation of a List
    call()                  call a function with List as arguments
    index()                 index of a value in a List
    max()                   maximum value in a List
    min()                   minimum value in a List
    count()                 count number of times a value appears in a List
    repeat()                repeat a List multiple times


#### 列表函数用法

    :let r = call(funcname, list)
    :if empty(list)
    :let l = len(list)
    :let big = max(list)
    :let small = min(list)
    :let xs = count(list, 'x')
    :let i = index(list, 'x')
    :let lines = getline(1, 10)
    :call append('$', lines)
    :let list = split("a b c")
    :let string = join(list, ', ')
    :let s = string(list)
    :call map(list, '">> " . v:val')

将列表数据相加的简单办法：

    :exe 'let sum = ' . join(list, ' + ')
    :echo sum



#### split()

将`字符串`按指定模式分隔符进行分割，返回`List`结构。

    split( {expr} [, {pattern} [, {keepempty}]])

* 未提供pattern，默认使用空白符分割
* `pattern`同vim search，是一个字符串
* 布尔`keepempty`参数，能保留空匹配项

举例如下：

    :echo split( ':b:c', ':' )
    [ 'b', 'c' ]
    :echo split( ':b:c', ':', 1 )
    [ '', 'b', 'c' ]


#### map()
        
    :call map(mylist, '"> " . v:val . " <"')



### Dictionary manipulation

    get()                   get an entry without an error for a wrong key
    len()                   number of entries in a Dictionary
    has_key()               check whether a key appears in a Dictionary
    empty()                 check if Dictionary is empty
    remove()                remove an entry from a Dictionary
    extend()                add entries from one Dictionary to another
    filter()                remove selected entries from a Dictionary
    map()                   change each Dictionary entry
    keys()                  get List of Dictionary keys
    values()                get List of Dictionary values
    items()                 get List of Dictionary key-value pairs
    copy()                  make a shallow copy of a Dictionary
    deepcopy()              make a full copy of a Dictionary
    string()                String representation of a Dictionary
    max()                   maximum value in a Dictionary
    min()                   minimum value in a Dictionary
    count()                 count number of times a value appears

   

### Floating point computation

    float2nr()              convert Float to Number
    abs()                   absolute value (also works for Number)
    round()                 round off
    ceil()                  round up
    floor()                 round down
    trunc()                 remove value after decimal point
    log10()                 logarithm to base 10
    pow()                   value of x to the exponent y
    sqrt()                  square root
    sin()                   sine
    cos()                   cosine
    atan()                  arc tangent  


### Variables

    type()                  type of a variable
    islocked()              check if a variable is locked
    function()              get a Funcref for a function name
    getbufvar()             get a variable value from a specific buffer
    setbufvar()             set a variable in a specific buffer
    getwinvar()             get a variable from specific window
    gettabvar()             get a variable from specific tab page
    gettabwinvar()          get a variable from specific window & tab page
    setwinvar()             set a variable in a specific window
    settabvar()             set a variable in a specific tab page
    settabwinvar()          set a variable in a specific window & tab page
    garbagecollect()        possibly free memory

#### type()

    type( {expr} )

    value               type
    ==========================================
    0                   Number
    1                   String
    2                   Funcref
    3                   List
    4                   Dictrionary
    5                   Float


### System functions and manipulation of files

    glob()                  expand wildcards
    globpath()              expand wildcards in a number of directories
    findfile()              find a file in a list of directories
    finddir()               find a directory in a list of directories
    resolve()               find out where a shortcut points to
    fnamemodify()           modify a file name
    pathshorten()           shorten directory names in a path
    simplify()              simplify a path without changing its meaning
    executable()            check if an executable program exists
    filereadable()          check if a file can be read
    filewritable()          check if a file can be written to
    getfperm()              get the permissions of a file
    getftype()              get the kind of a file
    isdirectory()           check if a directory exists
    getfsize()              get the size of a file
    getcwd()                get the current working directory
    haslocaldir()           check if current window used |:lcd|
    tempname()              get the name of a temporary file
    mkdir()                 create a new directory
    delete()                delete a file
    rename()                rename a file
    system()                get the result of a shell command
    hostname()              name of the system
    readfile()              read a file into a List of lines
    writefile()             write a List of lines into a file


#### readfile()

> 将文件fname的内容按行读入到list中
    
    " @param {string} fname
    " @param {string} binary
    " @param {number} max
    readfile({fname} [, {binary} [, {max}]])

* 读取时所有的`0x00`会被替换成`换行符NL`
* 若`binary`参数`包含'b'`：
    * 若最后一行以`换行符NL( 0x0a )`结尾，则会额外增加一个空列表项
    * `回车符CR( 0x0c )`不会被移除
* 若`binary`参数`不包含'b'`：
    * `CR NL`会被替换成`NL`
    * 最后一行是否以`换行符NL( 0x0a )`结尾，都不会额外增加一个空列表项
    * When 'encoding' is Unicode any UTF-8 byte order mark is removed from the text.
    


    


#### writefile()

> 将列表list的内容写入到fname文件中

    writefile( {list}, {fname} [, {flags}])

* 列表的每一项必须为`string`或`number`，组装时每一项之间用`换行符( 0x0a )`分隔，写文件时将所有`换行符`替换成`NUL( 0x00 )`
* 若flags为`'b'`，则组装时最后一个列表项不会添加换行符；否则，最后一项也会添加换行符
* 写入文件时，如果需要每个列表项分行展示，需要为提前为每个列表项插入`回车符( 0x0c )`
* 寄存器的包含的多行内容，是用`换行符( 0x0a )`分隔的，若将寄存器内容作为`一个列表项`写到文件中，所有的`换行符`将被替换成`NUL( 0x00 )`，导致获取文件内容时，发现换行丢失

以下将包含`多行文本`的寄存器z的内容写到文件，确保不出现换行丢失，详细参考我的`.vimrc`文件中将选择内容增加到剪贴板部分，在函数`F_copy_selected_text`中实现：

    let text = getreg( 'z' )
    " 手动插入回车符，注意不是换行符
    let text = substitute( text, '\%x00', '\r', 'g' )
    call writefile( [ text ], '/tmp/vim-reg-file', 'b' )


#### glob()

    glob({expr} [, {flag}])

    :echo glob( "*.md" )
        

#### globpath()

    globpath( {path}, {expr} [, {flag}] )

    :echo globpath( ".", "**/*.md" )


#### system()

    system( {expr} [, {input}] )

    :echo system( "date" )




### Date and Time

    getftime()              get last modification time of a file
    localtime()             get current time in seconds
    strftime()              convert time to a string
    reltime()               get the current or elapsed time accurately
    reltimestr()            convert reltime() result to a string

#### getftime()

    getftime({fname})

    :echo getftime( @% )
    1415090230


#### strftime()

    strftime({format} [, {time}])

`{format}`乍一看与shell之date的format一样。

    :let t = getftime(@%)
    :echo strftime("%c", t)
    :echo strftime("%Y%m%d %T", t)

#### localtime()
    
    :echo localtime()
    1510573684






### Buffers, windows and the argument list

    argc()                  number of entries in the argument list
    argidx()                current position in the argument list
    argv()                  get one entry from the argument list
    bufexists()             check if a buffer exists
    buflisted()             check if a buffer exists and is listed
    bufloaded()             check if a buffer exists and is loaded
    bufname()               get the name of a specific buffer
    bufnr()                 get the buffer number of a specific buffer
    tabpagebuflist()        return List of buffers in a tab page
    tabpagenr()             get the number of a tab page
    tabpagewinnr()          like winnr() for a specified tab page
    winnr()                 get the window number for the current window
    bufwinnr()              get the window number of a specific buffer
    winbufnr()              get the buffer number of a specific window
    getbufline()            get a list of lines from the specified buffer


#### bufname()

    bufname({expr})

    " name of current buffer
    :echo bufname("")
    :echo bufname("%")

    " name of the alternate buffer
    :echo bufname("#")

    " name of buffer whose id is 3
    :echo bufname(3)

    " name of buffer match the pattern
    :echo bufname( 'eval' )

* 若是string，则进行模式匹配，返回匹配的buffer name，若有多个项匹配，则返回空字符串


#### bufnr()

    bufnr({expr} [, {create}]))

    :echo bufnr(bufname(""))


#### getbufline()

    getbufline({expr}, {lnum} [, {end}])

    :echo getbufline("", 10, 20)

* `{expr}`同bufname()
* 针对`已加载`的buffer，若未加载，则返回空List
* `已加载`的含义为：已在窗口中打开




### Command line

    getcmdline()            get the current command line
    getcmdpos()             get position of the cursor in the command line
    setcmdpos()             set position of the cursor in the command line
    getcmdtype()            return the current command-line type 


#### getcmdline()

返回当前的命令行，仅当命令行正在编辑的时候有效。这时需要使用
`c_CTRL-\_e` 或者 `c_CTRL-R_=`

例如：

    :cmap <F7> <C-\>eescape(getcmdline(), ' \')<CR>

帮助参考：`:help getcmdline()`, `:help c_CTRL-\_e`

    :cmap <F7> <C-\>eAppendSome()<CR>
    :func AppendSome()
       :let cmd = getcmdline() . " Some()"
       :" place the cursor on the )
       :call setcmdpos(strlen(cmd))
       :return cmd
    :endfunc

> todo，尚未看懂



### Quickfix and location lists

    getqflist()             list of quickfix errors
    setqflist()             modify a quickfix list 
    getloclist()            list of location list items
    setloclist()            modify a location list


#### getqflist()

    :echo getqflist()

#### getloclist({nr}) 

returns a list with all the entries in the location list for window {nr}.
when {nr} is zero the current window is used.

    :echo getloclist(0)




### Syntax and highlighting

    clearmatches()          clear all matches defined by |matchadd()| and
                            the |:match| commands
    getmatches()            get all matches defined by |matchadd()| and
                            the |:match| commands
    hlexists()              check if a highlight group exists
    hlID()                  get ID of a highlight group
    synID()                 get syntax ID at a specific position
    synIDattr()             get a specific attribute of a syntax ID
    synIDtrans()            get translated syntax ID
    diff_hlID()             get highlight ID for diff mode at a position
    matchadd()              define a pattern to highlight (a "match")
    matcharg()              get info about |:match| arguments
    matchdelete()           delete a match defined by |matchadd()| or a
                            |:match| command
    setmatches()            restore a list of matches saved by
                            |getmatches()| 

todo ...


### Spelling

    spellbadword()          locate badly spelled word at or after cursor
    spellsuggest()          return suggested spelling corrections
    soundfold()             return the sound-a-like equivalent of a word

todo ...


### History

    histadd()               add an item to a history
    histdel()               delete an item from a history
    histget()               get an item from a history
    histnr()                get highest index of a history list

todo ...


### Interactive

    browse()                put up a file requester
    browsedir()             put up a directory requester
    confirm()               let the user make a choice
    getchar()               get a character from the user
    getcharmod()            get modifiers for the last typed character
    feedkeys()              put characters in the typeahead queue
    input()                 get a line from the user
    inputlist()             let the user pick an entry from a list
    inputsecret()           get a line from the user without showing it
    inputdialog()           get a line from the user in a dialog
    inputsave()             save and clear typeahead
    inputrestore()          restore typeahead

`ONLY in` some `GUI` versions





### GUI

    getfontname()           get name of current font being used
    getwinposx()            X position of the GUI Vim window
    getwinposy()            Y position of the GUI Vim window

`ONLY in` some GUI versions




### Vim server

    serverlist()            return the list of server names
    remote_send()           send command characters to a Vim server
    remote_expr()           evaluate an expression in a Vim server
    server2client()         send a reply to a client of a Vim server
    remote_peek()           check if there is a reply from a Vim server
    remote_read()           read a reply from a Vim server
    foreground()            move the Vim window to the foreground
    remote_foreground()     move the Vim server window to the foreground

todo ...






### Window size and position

    winheight()             get height of a specific window
    winwidth()              get width of a specific window
    winrestcmd()            return command to restore window sizes
    winsaveview()           get view of current window
    winrestview()           restore saved view of current window

#### winheight()

    winheight({nr})

    :echo winheight(0)
    48

todo ...


### Various

    mode()                  get current editing mode
    visualmode()            last visual mode used
    hasmapto()              check if a mapping exists
    mapcheck()              check if a matching mapping exists 
    maparg()                get rhs of a mapping
    exists()                check if a variable, function, etc. exists
    has()                   check if a feature is supported in Vim
    changenr()              return number of most recent change
    cscope_connection()     check if a cscope connection exists
    did_filetype()          check if a FileType autocommand was used
    eventhandler()          check if invoked by an event handler 
    getpid()                get process ID of Vim 
            
    libcall()               call a function in an external library
    libcallnr()             idem, returning a number

    getreg()                get contents of a register
    getregtype()            get type of a register
    setreg()                set contents and type of a register

    taglist()               get list of matching tags
    tagfiles()              get a list of tags files

    mzeval()                evaluate |MzScheme| expression


#### getpid()

    getpid()

    :echo getpid()
    874


#### has()

    has({feature})

the result is a Number, which is 1 if the feature {feature} is supported, zero otherwise.
    
    " show feature list, type:
    :help feature-list


    " example 1
    :if has("multi_byte")
    :    digraph oe 339
    :elseif &encoding == "iso-8859-15"
    :    digraph oe 189
    :endif 


    " example 2
    :if v:version > 602 || v:version == 602 && has("patch148")

    " example 3: setting-guifont
    :if has("gui_running")
    :    if has("gui_gtk2")
    :        :set guifont=Luxi\ Mono\ 12
    :    elseif has("x11")
    :        " Also for GTK 1
    :        :set guifont=*-lucidatypewriter-medium-r-normal-*-*-180-*-*-m-*-*
    :    elseif has("gui_win32")
    :        :set guifont=Luxi_Mono:h12:cANSI
    :    endif       
    :endif 

    " example 4
    :if has("multi_byte_encoding")
    ...


#### mode([expr])

    mode([expr])

    :echo mode() 
    n

##### mode lists

    value   mode
    =================================
    n       Normal
    no      Operator-pending        
    v       Visual by character
    V       Visual by line 
    CTRL-V  Visual blockwise
    s       Select by character
    S       Select by line          
    CTRL-S  Select blockwise 
    i       Insert 
    R       Replace |R|
    Rv      Virtual Replace |gR|
    c       Command-line
    cv      Vim Ex mode |gQ|
    ce      Normal Ex mode |Q|
    r       Hit-enter prompt
    rm      The -- more -- prompt
    r?      A |:confirm| query of some sort
    !       Shell or external command is executing


#### exists()

    exists()

the result is a Number, which is non-zero if {expr} is defined, zero otherwise.

{expr}是字符串，可以包含以下内容：

    format              description
    ==============================================
    &option-name        判断option是否存在 
    +option-name        判断option是否生效
    $ENVNAME
    *funcname
    varname


    " Example 1: if function exists
    :if exists('*funcname') 
    : ...
    :endif

    " toggle syntax highlight 
    :if exists("g:syntax_on") | syntax off | else | syntax enable | endif

    " use a map
    :nmap <F9> :if exists("g:syntax_on") <Bar>
            \   syntax off <Bar>
            \ else <Bar>
            \   syntax enable <Bar>
            \ endif <CR>


    " To test for presence of buffer-local autocommands use the |exists()| function
    :if exists("#CursorHold#<buffer=12>") | ... | endif
    :if exists("#CursorHold#<buffer>") | ... | endif    " for current buffer

    " Other 1
    :if exists("did_load_filetypes")
    :  finish
    :endif

    " Other 2
    :if exists("g:loaded_typecorr")
    :   finish
    :endif
    :let g:loaded_typecorr = 1

        
#### taglist()

    taglist({expr})



#### tagfiles()

#### getreg()

    :redi @a | sil ls | redi END | echo getreg('a')

`静默`执行列出当前buffers，并将列表输入`寄存器a`，最终`输出`寄存器a的内容。

        



    













## Examples

### 循环指定次数

    :let index = 0
    :while index < len(mylist)
    :   let item = mylist[index]
    :   call Doit(item)
    :   let index = index + 1
    :endwhile

or

    :for item in mylist
    :   call Doit(item)
    :endfor

注意mylist中所有item`必须是同一类型`的，否则会报错。如果确实存在类型不一致，可以在
循环体尾部，将item `:unlet`掉。

### for参数支持解构

支持`变量列表`，举例如下：

    :for [lnum, col] in [[1,3], [2,8], [3,0]]
    :   call Doit(lnum, col)
    :endfor


变量还支持`剩余项`，用`分号";"`分隔，举例如下：

    :for [i, j; rest] in listlist
    :   call Doit(i, j)
    :   if !empty(rest)
    :       echo "remainder: " . string(rest)
    :   endif
    :endfor


### 循环插入格式化行 

    :let cur = line( '.' )
    :let [i, total] = [1, 43]
    :while i <= total
    :   let line = printf("%s%d%s", 'a', i, 'b')
    :   call append( cur, line )
    :   let [i, cur] += [1, 1]
    :endwhile

    " 单行模式
     :let cur = line( '.' ) | let [i, total] = [1, 43] | while i <= total | let line = printf("%s%d%s", 'a', i, 'b') | call append( cur, line ) | let [i, cur] += [1, 1] | endwhile




## Tips





