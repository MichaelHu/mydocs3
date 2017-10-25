# vim-eval

> 来自`:help eval`

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

    Dictionary
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
* `:fu`或`:function`列出所有函数及其参数
* 使用`setline()`往缓冲区输出内容
* 使用`getline()`从缓冲区获取内容
* 使用`:echo`命令往控制台输出内容
* 使用`system()`执行shell命令，并获取返回结果
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
         

#### 函数调用

    :[range]call {name}([arguments])

* 最多支持`20`个参数
* 返回值会被`忽略`
* 调用有返回值的函数，`必须获取`其返回值，否则报错

        " 会报错
        append( line( '.' ), l:line )
        " 正确方式为用变量获取返回值
        let failed = append( line( '.' ), l:line )


#### Examples

##### 读取文件指定的行

    " get lines from file, and append to the position after the cursor
    " @param {string} file      - absolute file path
    " @param {number} start     - the start line number
    " @param {number} count     - the count of lines to read in
    " @usage :call F_r( '/path/to/file', 5, 10 )
    fu F_r( file, start, count ) abort
        let lines = readfile( a:file, '', 10000 )
        let i = 0
        let cur = line( '.' )
        echo 'total lines: ' . len( lines ) 
        for l:line in lines
            let i += 1
            if i >= a:start && i < a:start + a:count
                " echo i . l:line
                let failed = append( cur, l:line )
                let cur += 1
            endif
            if i >= a:start + a:count
                break
            endif
        endfor
        echo 'read lines: ' . ( i - a:start ) 
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

1. getline({lnum} [, {end}])

        :echo getline(1)
        :echo getline('.')
        :echo getline('$')
        :echo getline('.', '$')
        :echo getline(1, '$')


        :let start = line('.')
        " search the last non-blank line
        :let end = search("^$") - 1
        :let lines = getline(start, end)

2. search({pattern} [, {flags} [, {stopline} [, {timeout}]]])

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

1. col()

        :echo col('.')      " the cursor position
        :echo col('$')      " the end of the cursor line
        :echo col("'x")     " position of mark x

2. line()

        :echo line('.')     " the cursor position
        :echo line('$')     " the last line in the current buffer
        :echo line("'x")    " position of mark x
        :echo line('w0')    " first line visible in current window
        :echo line('w$')    " last line visible in current window
        :echo line('v')     " the start of the Visual area in visual mode, and the
                            " cursor position when not in visual mode 





### 列表常用函数

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



### List manipulation:

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

1. map()
        
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

1. type()
    * Number: 0
    * String: 1
    * Funcref: 2
    * List: 3
    * Dictionary: 4
    * Float: 5


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

1. glob({expr} [, {flag}])

        :echo glob("*.md")
        

2. globpath({path}, {expr} [, {flag}])

        :echo globpath(".", "**/*.md")

3. system({expr} [, {input}])

        :echo system("date")

4. readfile({fname} [, {binary} [, {max}]])

    return value: `List`

        :for line in readfile(fname, '', 10)
        :   if line =~ 'Date' | echo line | endif
        :endfor


### Date and Time

    getftime()              get last modification time of a file
    localtime()             get current time in seconds
    strftime()              convert time to a string
    reltime()               get the current or elapsed time accurately
    reltimestr()            convert reltime() result to a string

1. getftime({fname})

        :echo getftime(@%)
        1415090230

2. strftime({format} [, {time}])

    {format}乍一看与shell之date的format一样。

        :let t = getftime(@%)
        :echo strftime("%c", t)
        :echo strftime("%Y%m%d %T", t)

3. localtime()
    
        :echo localtime()



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


1. bufname({expr})

        " name of current buffer
        :bufname("")
        :bufname("%")

        " name of the alternate buffer
        :bufname("#")

        :bufname(3)

2. bufnr({expr} [, {create}]))

        :echo bufnr(bufname(""))

3. getbufline({expr}, {lnum} [, {end}])

    {expr}同bufname

        :echo getbufline("", 10, 20)


### Command line

    getcmdline()            get the current command line
    getcmdpos()             get position of the cursor in the command line
    setcmdpos()             set position of the cursor in the command line
    getcmdtype()            return the current command-line type 


1. getcmdline()

    返回当前的命令行，仅当命令行正在编辑的时候有效。这时需要使用
    `c_CTRL-\_e` 或者 `c_CTRL-R_=`

    例如：

        :cmap <F7> <C-\>eescape(getcmdline(), ' \')<CR>


### Quickfix and location lists

    getqflist()             list of quickfix errors
    setqflist()             modify a quickfix list 
    getloclist()            list of location list items
    setloclist()            modify a location list


1. getqflist()

        :echo getqflist()

2. getloclist({nr}) 

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

1. winheight({nr}

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


1. `getpid()`

        :echo getpid()
        874

2. `has({feature})`

    the result is a Number, which is 1 if the feature {feature} is supported, zero otherwise.
    
    show feature list, type:

        :help feature-list

    `example 1:`

        :if has("multi_byte")
        :    digraph oe 339
        :elseif &encoding == "iso-8859-15"
        :    digraph oe 189
        :endif 


    `example 2:`

        :if v:version > 602 || v:version == 602 && has("patch148")

    `example 3: setting-guifont`

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

    `example 4:`

        :if has("multi_byte_encoding")
        ...

3. `mode([expr])`

        :echo mode() 
        n

    mode lists:

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


4. `exists()`

    the result is a Number, which is non-zero if {expr} is defined, zero otherwise.

    {expr}是字符串，可以包含以下内容：

    * &option-name ：判断option是否存在 
    * +option-name ：判断option是否生效
    * $ENVNAME
    * *funcname
    * varname

    判断函数是否存在：

        :if exists('*funcname') 
        : ...
        :endif

    切换语法高亮功能：
    
        :if exists("g:syntax_on") | syntax off | else | syntax enable | endif

    将该功能制作成map：
        
        :nmap <F9> :if exists("g:syntax_on") <Bar>
                \   syntax off <Bar>
                \ else <Bar>
                \   syntax enable <Bar>
                \ endif <CR>


    To test for presence of buffer-local autocommands use the |exists()| function
    as follows:

        :if exists("#CursorHold#<buffer=12>") | ... | endif
        :if exists("#CursorHold#<buffer>") | ... | endif    " for current buffer

        :if exists("did_load_filetypes")
        :  finish
        :endif

    判断：

        :if exists("g:loaded_typecorr")
        :   finish
        :endif
        :let g:loaded_typecorr = 1

        


5. `taglist({expr})`

6. `tagfiles()`

7. `getreg()`

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





