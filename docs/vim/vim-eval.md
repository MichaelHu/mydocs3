# Vim programing

hudamin - 转载请注明出处

> 来自`:help eval`


## 一、六种变量类型

### 1.1 类型

* Number
* Float
* String: 

        "ab\txx\"--"
        'x-z''a,c'

* Funcref: 

        function("strlen")

* List: 

        [1, 2, ['a', 'b']]

* Dictionary: 

        {'blue': '#0000ff', 'red': "#ff0000"}


Number和String之间依据使用场景自动转换。



### 1.2 命名空间

> 开始于`let`， 销毁于`unlet`

* `无前缀`，若在函数内，则为函数局部变量；否则就是全局变量
* `b:`前缀，当前缓冲区变量
* `w:`前缀，当前窗口变量
* `t:`前缀，当前tag page变量
* `g:`前缀，全局变量
* `l:`前缀，函数局部变量
* `s:`前缀，vim script局部变量
* `a:`前缀，函数参数，仅在函数内部
* `v:`前缀，全局变量，Vim预定义



## 二、Command-line

> 注意命令行与函数的区别

    :let
    :unlet
    :set
    :echo
    :call

## 三、Built-in Functions

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

### 3.1 列表常用函数

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

### 3.2 String manipulation

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


### 3.3 List manipulation:

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



### 3.4 Dictionary manipulation

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

   

### 3.5 Floating point computation

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


### 3.6 Variables

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


### 3.7 Cursor and mark position

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


### 3.8 Working with text in the current buffer

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


### 3.9 System functions and manipulation of files

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


### 3.10 Date and Time

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



### 3.11 Buffers, windows and the argument list

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


### 3.12 Command line

    getcmdline()            get the current command line
    getcmdpos()             get position of the cursor in the command line
    setcmdpos()             set position of the cursor in the command line
    getcmdtype()            return the current command-line type 


1. getcmdline()

    返回当前的命令行，仅当命令行正在编辑的时候有效。这时需要使用
    `c_CTRL-\_e` 或者 `c_CTRL-R_=`

    例如：

        :cmap <F7> <C-\>eescape(getcmdline(), ' \')<CR>


### 3.13 Quickfix and location lists

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




### 3.14 Syntax and highlighting

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


### 3.15 Spelling

    spellbadword()          locate badly spelled word at or after cursor
    spellsuggest()          return suggested spelling corrections
    soundfold()             return the sound-a-like equivalent of a word

todo ...


### 3.16 History

    histadd()               add an item to a history
    histdel()               delete an item from a history
    histget()               get an item from a history
    histnr()                get highest index of a history list

todo ...


### 3.17 Interactive

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

`ONLY in` some GUI versions


### 3.18 GUI

    getfontname()           get name of current font being used
    getwinposx()            X position of the GUI Vim window
    getwinposy()            Y position of the GUI Vim window

`ONLY in` some GUI versions


### 3.19 Vim server

    serverlist()            return the list of server names
    remote_send()           send command characters to a Vim server
    remote_expr()           evaluate an expression in a Vim server
    server2client()         send a reply to a client of a Vim server
    remote_peek()           check if there is a reply from a Vim server
    remote_read()           read a reply from a Vim server
    foreground()            move the Vim window to the foreground
    remote_foreground()     move the Vim server window to the foreground

todo ...



### 3.20 Window size and position

    winheight()             get height of a specific window
    winwidth()              get width of a specific window
    winrestcmd()            return command to restore window sizes
    winsaveview()           get view of current window
    winrestview()           restore saved view of current window

1. winheight({nr}

        :echo winheight(0)
        48

todo ...


### 3.21 Various

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


1. getpid()

        :echo getpid()
        874

2. has({feature})

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

3. mode([expr])

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


4. exists()

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

        


5. taglist({expr}) 

6. tagfiles()

        



    













## Examples

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

注意mylist中所有item必须是同一类型的，否则会报错。如果确实存在类型不一致，可以在
循环体尾部，将item `:unlet`掉。

支持`变量列表`，举例如下：

    :for [lnum, col] in [[1,3], [2,8], [3,0]]
    :   call Doit(lnum, col)
    :endfor


变量还支持`剩余项`，举例如下：

    :for [i, j; rest] in listlist
    :   call Doit(i, j)
    :   if !empty(rest)
    :       echo "remainder: " . string(rest)
    :   endif
    :endfor


## Tips





