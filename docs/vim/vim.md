# vim

2017-10, 2017-02-10, 2016-10-22, 2016-07-23
, 2016-07-07, 2014-11-05 hudamin - 转载请注明出处

> 向编辑神器`VIM`致敬！ 


## Resources

* site: <http://www.vim.org/>
* vim scripts: <https://vim.sourceforge.io/scripts/index.php>
* vim-scripts: <http://vim-scripts.org/vim/scripts.html> 
* github vim-scripts: <https://github.com/vim-scripts>
* vim-eval: <ref://./vim-eval.md.html>
* `vim-tuning` - vim脚本、插件等编写 <ref://./vim-tuning.md.html>
* `VimAwesome` - 插件聚合站点 <https://vimawesome.com>


## Features

> vim - the ubiquitous text editor

* persistent, multi-level undo tree
* extensive plugin system
* support for hundreds of programming languages and file formats
* powerful search and replace
* integrates with many tools


## Starting Vim

### command line

    vim filename
    cat file | vim -
    vim -q {errorfile}

### options

    --help, -h
    --version
    --noplugin
    --startuptime {fname}
    --literal
    +[num]
    +/{pat}
    +{command}
    -c {command}
        vim "+set si" main.c
        vim -c "set ff=dos" -c wq mine.mak
    --cmd {command}
    -S {file}                                   -c "source {file}"
    -r, -L                                      Recovery mode
    -R                                          Readonly mode
    -m                                          Modifications not allowed to be written 
    -M                                          Modifications not allowed
    -Z                                          Restricted mode. All commands that make use of an external
                                                shell are disabled
    -g                                          Start Vim in GUI mode
    -v                                          Start Ex in Vi mode
    -e                                          Start Vim in Ex mode Q
    -E                                          Start Vim in improved Ex mode gQ
    -s                                          Silent or batch mode. :print, :list, :number, :set is
                                                displayed to stdout 
    -b                                          Binary mode
    -l                                          Lisp mode
    -A                                          Arabic mode
    -F                                          Farsi mode
    -H                                          Hebrew mode
    -V[N]                                       Verbose
    -v[N]{filename}
    -D                                          Debuging
    -C                                          Compatible mode
    -N                                          Not compatible mode
    -y                                          Easy mode.
    -n                                          No swap file will be used
    -o[N]
    -O[N]
    -p[N]
    -T {terminal}                               Set the terminal type to "terminal"
    --not-a-term
    --ttyfail
    -d                                          Start in diff mode
    -d {device}
    -dev {device}
    -f
    --nofork
    -u {vimrc}
    -U {gvimrc}
    -i {viminfo}
    -x
    -X
    -s {scriptin}                               The script file "scriptin" is read. the same as 
                                                ":source! {scriptin}
    -w {number}
    -w{number}                                  Set the window option to {number}
    -w {scriptout}                              All the characters that you type are recorded in the file 
                                                "scriptout", until you exit vim.

    todo ...





## Useful Tips

1. 主要编辑模式搞清楚，记住`normal, insert, visual, command-line`
2. `normal`模式下，`单引号'`用于访问bookmark，`双引号"`用于设置下一delete，yank或者put操作使用的寄存器
3. `normal`以及`command-line`模式下，`@`用于访问寄存器
4. 带`g前缀`的命令原来功能这么强大，比如：`g0, g^, g$, gm, gp, gP, gJ, ge, gE, 
    ga, g8, g CTRL-G, gk, gj, gq, gqq, CTRL-W gf, CTRL-W gF`，
    你知道几个？会用几个？
5. `insert`模式下，`CTRL-N`或者`CTRL-P`能用于输入`补全`提示
6. `command line`模式下，`CTRL-V`能用于输入特殊字符，比如`<C-V><Enter> `将输入`回车符<CR>`，命令行上显示`^M`
7. `:help`在线帮助，很对不同查询对象使用不同语法，比如查询`options`，则将option用`单引号`包起来。
8. `normal`模式，`CTRL-L`刷新屏幕
9. 一些`特殊字符`的展示：

        ^M      x0d，也就是carriage-return，回车符
        ^@      x00





## Modes

> 获取帮助：`:help vim-modes`

### 6种主要模式

* Normal Mode
* Visual Mode
* Select Mode
* Insert Mode
* Command-line Mode
* Ex mode，与Normal Mode类似，主要区别在于该模式执行完一行命令后，仍然停留在当前模式中，要退出该模式，需输入`:visual`命令

### 6种额外模式

* Operator-pending Mode
* Replace Mode
* Virtual Replace Mode
* Insert Normal Mode
* Insert Visual Mode
* Insert Select Mode
    


## Help

记住不同模式的help前缀，`:helpgrep`全文查找功能很`赞`。

    :help

    :helpgrep {word}
    :helpgrep :if exists

    " jump
    CTRL-]
    " jump back
    CTRL-T or CTRL-O 

    " normal mode command
    :help x

    " visual mode command
    :help v_x

    " insert mode command
    :help i_x

    " command-line command
    :help :x

    " command-line editing
    :help c_x

    " vim command argument
    :help -x

    " option
    :help 'x'

    " key board
    :help key-notation
    :help key-codes



## Inserting Commands


`特殊insert：`

    :r {file}
    :r! command

关于`++opt`：

> The [++opt] argument can be used to force the value of 'fileformat',
> 'fileencoding' or 'binary' to a value for one command, and to specify the
> behavior for bad characters.

格式为：

    ++{optname}
    ++{optname}={value}

`{optname}`可以是以下值：

    ff     or  fileformat   overrides 'fileformat'
    enc    or  encoding     overrides 'fileencoding'                                                              
    bin    or  binary       sets 'binary'               
    nobin  or  nobinary     resets 'binary'
    bad                     specifies behavior for bad characters
    edit                    for |:read| only: keep option values as if editing
                            a file

举例如下：

    :e ++ff=unix
    :w ++enc=latin1 newfile



## Left-right motions

常用的：`h, l, 0, ^, t{char}, T{char}`

值得注意的：`g0, g^, g$, gm, |, f{char}, F{char}`


    [N]h            left (also: CTRL-H, <BS>, or <Left> key)
    [N]l            right (also: <Space> or <Right> key)
    0               to first character in the line (also: <Home> key)
    ^               to first non-blank character in the line
    [N]$            to the last character in the line (N-1 lines lower) (also: <End> key)
    g0              to first character in screen line (differs from "0" when lines wrap)
    g^              to first non-blank character in screen line (differs from "^" when lines wrap)
    [N]g$           to last character in screen line (differs from "$" when lines wrap)
    gm              to middle of the screen line
    [N}|            to column N (default: 1)

    [N]f{char}      to the Nth occurrence of {char} to the right
    [N]F{char}      to the Nth occurrence of {char} to the left
    [N]t{char}      till before the Nth occurrence of {char} to the right
    [N]T{char}      till before the Nth occurrence of {char} to the left
    [N];            repeat the last "f", "F", "t", or "T" N times
    [N],            repeat the last "f", "F", "t", or "T" N times in opposite direction





## Up-down motions
    

常用的：`k, j, gg, G, H, M, L, %`

值得注意的：`-, +, _, G, N%, gk, gj`

    
    [N]k            up N lines (also: CTRL-P and <Up>)
    [N]j            down N lines (also: CTRL-J, CTRL-N, <NL>, and <Down>
    [N]-            up N lines, on the first non-blank character
    [N]+            down N lines, on the first non-blank character (also: CTRL-M and <CR>)

    [N}_            down N-1 lines, on the first non-blank character
    [N]G            goto line N (default: last line), on the first non-blank character 
    [N]gg           goto line N (default: first line), on the first non-blank character
    N%              goto line N percentage down in the file; N must be given, otherwise 
                    it is the "%" command
    [N]gk           up N screen lines (differs from "k" when line wraps) 
    [N]gj           down N screen lines (differs from "j" when line wraps)
    
    H               To line [count] from top of window (default: first line
                    on the window) on the first non-blank character.
    M               to Middle line of window, on the first non-blank character.
    L               to line [count] from bottom of window (default: last line
                    on the window) on the first non-blank character

    %               Find the next item in this line after or under the cursor and
                    jump to its match. Items can be: ([{}]), /* */
    CTRL-Y          











## Syntax Highlighting 

    :syntax on
    :syntax off
    :syntax clear
    :highlight clear
    :filetype on


### 设置颜色主题

    :colorscheme desert
    " for short
    :colo desert
    :colo

    :echo g:colors_name

可用的`color scheme`主题文件存在于`/usr/share/vim/vim73/colors`，有以下主题可选：

    blue
    darkblue
    default
    delek
    desert
    elflord
    evening
    koehler
    morning
    murphy
    pablo
    peachpuff
    ron
    shine
    slate
    torte
    zellner

`default`类型的注释为蓝色，比较难以看清楚，`desert`主题个人比较喜欢。




## Searching and Replacing


### 增量查询

输入的同时就进行查找定位，而不是按回车后进行查找。可以迅速预览查询结果。

    :set incsearch
    :set noincsearch


### 查询高亮

    :set hlsearch
    :nohlsearch

注意关闭方法不是`:set nohlsearch`

### Searching 

    /{pattern}




### Replacing

    :[range]s/{pattern}/{substitute}/[modifier] 

对于`回车 - carriage return`(0x0c)、`换行 - newline`(0x0a)的处理：
* 换行符在pattern中用`\n`表示，在substitute中用`\r`或`<CR>`表示，用`C-V <Enter>`输入`<CR>`，命令行上显示`^M`，这与`sed`的`s命令`存在区别，sed中换行符使用`\n`
* 回车符在pattern中用`\%x0d`表示，在sutstitute中用`\<CR>`表示，用`C-V <Enter>`输入`<CR>`，命令行上显示`\^M`
* substitute中的`\n`实际上是`<NL>`，代表0x00, vim中显示`^@`


#### substitution

> 获取帮助： `:help sub-replace-special` , `:help sub-replace-expression`

    magic       action
    ================================================================
    &           全匹配串( the whole matched pattern )
    \0          idem（同上）
    \1          第一个子模式匹配串
    \2          第二个子模式匹配串
    ...
    \9          第九个子模式匹配串
    ~           使用上一个替换串来替换（待验证）
    \\          反斜线
    \u          下一个字符变成大写
    \U          后面的字符都变成大写，直到\e或\E
    \l          下一个字符变成大写
    \L          后面的字符都变成大写，直到\e或\E
    \e, \E      \u, \U, \l, \L的结尾
    \=          替换成表达式执行的结果，匹配串的内容通过submatch( [0-9] )获得
                ，也可以用在substitute()函数的substitute部分中
    <CR>        替换成换行符，使用`<C-v> <Enter>`输入
    \r          同<CR>
    \<CR>       替换成回车符
    \n          替换成<NL>字符，!!注意不是换行符
    \t          <Tab>
    \b          <BS>

举例：

    " 将换行符替换成新行，且包含$HOME变量的值  
    :s@\n@\="\r" . expand( "$HOME" ) . "\r"@

    " 将所有的`####`替换成`#4`
    :%s@#\+@\="#" . strlen( submatch( 0 ) )@g
    :%s/#\+/\="#" . strlen( submatch( 0 ) )/g

    " 将<NL>替换成换行符
    :%s/\%x00/\r/g

注意：使用`\=`时，替换的分隔符不能出现在表达式中，可用`@`或`/`



#### modifiers

可通过`:help :s_flags`获取详细帮助。

    flag    description
    ======================================
    &       必须作为第一个flag，用于保持上一次的flag
    c       confirm each substitution
    e       查询模式失败，不显示错误信息
    i       ignore case for the pattern
    I       case-sensitive
    g       replace all occurrences in the line
    n       仅显示匹配数，不执行替换
    p       显示最后替换行
    #       显示最后替换行，并前置行号



#### Examples

    :%s/^\(#\+\) \(\d\+\.*\)\+/\1/g 

将类似`## 1 ...`, `## 2.3 ...`, `### 3.3.3 ...`中的数字索引部分去掉，获得`## ...`, `### ...`





## Folding

`foldmethod`，`folemarker`，`foldlevel`等选项。

    :{range}fold
    zf{motion}

    # Normal mode
    zd
    zD

    # open and close
    zo
    zO
    zc
    zC
    
    # foldlevel
    zm
    zM
    zr
    zR

    zn
    zN
    zi

    # Navigation
    zj
    zk

## Visual Mode

    v
    CTRL-V
    v_o



## Options

    :se[t]                  
    :se[t] all
    :se[t] termcap

    :se[t] {option}
    :se[t] no{option}
    :se[t] inv{option}

    :se[t] {option}={value}
    :se[t] {option}+={value}
    :se[t] {option}-={value}

    :se[t] {option}?
    :se[t] {option}&
    
    :setl[ocal]
    :setg[lobal]

    :fix[del]
    :opt[ions]


### formatoptions

简写为`fo`，自动换行，支持中文自动换行。可以使用`gq`启动自动格式化。

    # default
    :set fo=tcq

    # wrap Multi-Byte text line
    :set fo+=mM tw=60 wrap
    {Visual}gq
    gq{motion}

    # format current line
    gqq
    gqgq


### 多行合并

    {Visual}J
    J
    {Visual}gJ
    gJ



## Maps

### Resources

通过以下方式获取常用帮助资源：

    " map overview
    :help map-overview

    " 快捷按键推荐
    :help map-which-keys

    " 按键引用帮助
    :help key-notation
    :help :map-special-keys
    :help :map-special-chars

    " 比如<M-...>的快捷键，这种触发多字节快捷键的情况
    :help map-multibyte

    " Alt-组合键的使用
    :help :map-alt-keys

    " 字符按键引用
    :help <Char>
    :help <Char->

* Mapping keys in Vim - Tutorial (Part 1) <http://vim.wikia.com/wiki/Mapping_keys_in_Vim_-_Tutorial_(Part_1)>
* Mapping keys in Vim - Tutorial (Part 2) <http://vim.wikia.com/wiki/Mapping_keys_in_Vim_-_Tutorial_(Part_2)>
* Mapping keys in Vim - Tutorial (Part 3) <http://vim.wikia.com/wiki/Mapping_keys_in_Vim_-_Tutorial_(Part_3)>


### Usage

    " 列出所有map指令
    :map

    " make sure function key 8 does nothing at all 
    :map <F8> <Nop>
    :map! <F8> <Nop>

    :map <F8> <Esc>:g/^#/<CR>

    " 多字节情况的解决办法，暂无法调通，可能由于:help map-alt-keys的问题
    :set enc=latin1
    :map! <M-C> <Esc>:reg<CR>
    :set enc=utf-8

    " 字符数字编码方式
    :map <Char-0xdf> <Esc>:echo 1.23e5<CR>
    :map <S-Char-0x72> <Esc>:echo 'shift-r'<CR>

    " use mapleader variablR
    :let mapleader = ","
    :map <Leader>A <Esc>:reg<CR>


### Examples

    " visual mode下，对选中文本进行查询，特别是中文查询，省去输入中文
    " 通过yank中转选中内容，注意@z不要用大写
    :vmap ,s "zy:let @/ = @z<CR>

    " visual mode下，对选中内容注释/去注释
    " 1. range部分的`'<,'>`会自动带上，不要重复输入
    " 2. 末尾的`/clear search successfully!<CR>`用于清空搜索条件
    :vmap ,c :s/^\([ \t]*\)\(.*\)$/\1\/\/ \2/g<CR>/clear search successfully!<CR>
    " 3. 更优雅的清空搜索条件
    :vmap ,c :s/^\([ \t]*\)\(.*\)$/\1\/\/ \2/g<CR>:let @/ = ''<CR>
    :vmap ,C :s/^\([ \t]*\)\/\/ \(.*\)$/\1\2/g<CR>:let @/ = ''<CR>
    " 4. 支持文件类型判断
    vmap <Leader>c :s/^\([ \t]*\)\(.*\)$/\= submatch(1) . F_get_comment_label() . submatch(2)/g<CR>:let @/ = ''<CR>


    " visual / normal / Select mode下，清空搜索条件
    :map ,<Char-0x20> :let @/ = ''<CR>

    " v1. normal mode下，获取当前buffer的全路径
    :nmap ,f :echo getcwd() . '/' . getreg( '%' )<CR>
    " v2. normal mode下，获取当前buffer的全路径，解决非当前目录下buffer本就是绝对路径的问题
    :nmap ,f :let curFile = getreg( '%' ) \| let index = match( curFile, "^/" ) \| if index != 0 \| let curFile = getcwd() . '/' . curFile \| endif \| echo curFile<CR> 
    " v3. normal mode下，获取当前buffer的全路径，并复制到mac剪贴板
    :nmap ,f :let curFile = getreg( '%' ) \| if match( curFile, "^/" ) != 0 \| let curFile = getcwd() . '/' . curFile \| endif \| echo 'Path: ' . curFile \| call system( 'echo -n ' . curFile . ' \| pbcopy' )<CR> 
    " v4. 使用function的方式，避免变量污染，代码可读性也更强，函数实现在<ref://./vim-eval.md.html>
    :nmap ,f :call F_current_buffer_fullpath()<CR>

    " normal mode下，在资源管理器中打开当前目录
    :nmap ,o :call system( 'open `pwd`' )<CR>

    " normal mode下，读取文件指定行
    :nmap ,r :call F_r( '


### Tips

* `CTRL-K`用于自动识别快捷键按键引用
* `Alt` ( `Options` )组合键在`Terminal`下的兼容性问题，导致`<M-..>`或`<A-..>`可能无法使用
* 比如`Alt-s`实际上在Mac下输出`ß`，可以直接使用该字符来map

        " 可能不可用
        :map <M-s> foo
        " 换成这种方式
        :map ß foo
    或者使用`字符数字编码`方式：
        :map <Char-0xdf> foo

* `mapleader`模式，可以启用`统一快捷键前缀`，扩展性很好，推荐使用。推荐`,`, `_`作为前缀。
* map命令的映射部分，如果是一系列用`|`分隔的命令，则注意需要对`|`进行`转义`。 
* map命令的映射部分，创建的变量默认为`全局变量`，有污染的可能，推荐用`function`
* map命令尽量`避免`一个命令是另一个命令字符串的`前缀`：

        :map <Leader>a ...
        :map <Leader>aa ...

    以上map能work，但是会导致第一个map的`反应变慢`
* vmap，若通过visual mode选中文本行，在触发快捷键，这时会传入range，如果对应命令不支持range，则会报错：`E481: No range allowed`，比如：
        :vmap <Leader>l :let g_inc_num = 0
* 按行处理文本，推荐的思路是使用`函数`：简单方式，直接处理当前行，更新当前行；复杂一点但也功能更强大的方式，引入range支持，在函数内自行处理range，这样各行之间可以共用上下文信息，比如递增行号。参考：`~/.vimrc`的`F_prefix_line_number()`实现




## Abbreviate

`缩写`，`!`表示在`insert`和`command`模式下都可用。

    :ab[breviate] #a /***********************  

    :! list all abbreviations
    :ab[breviate]
    ! #b /*********************** 

    :! list abbreviations that start with {lhs}
    :ab[breviate] {lhs}

    :ab <buffer> FF for( i = 0; i < ; i++ )

    :una[bbreviate]


### Tips

1. 映射`目标`部分可以含有`空白`。
2. 简写可以只针对特定buffer，使用`<buffer>`选项

        :ab <buffer> FF for( i = 0; i < ; i++ )

    删除也需要使用`<buffer>`选项。

        :una <buffer> FF

3. 仅限于某种模式的简写，同map一样，支持`:cab[breviate]`, `:iab[breviate]`
4. 简写后面输入`空格`或者`Tab`，会进行替换。如果要`阻止`替换，可以在输入空格或者Tab前输入`CTRL-V` 
        




### 应用：buf list查找

`.vimrc`中添加abbreviation

    :cab #s redi! > /tmp/files \| sil ls \| redi END \| !cat /tmp/files \| grep -E 

在命令行中

    :#s

命令替换以后，输入查询`正则`即可查询。





## Deleting text

常用的如：`x, X, d, dd, D, J`

注意，Mac下的`<Del> ＝ Fn_<Del>`

    [N]x                    delete N characters under and after the cursor
    [N]<Del>                same as "[N]x"
    [N]X                    delete N characters before the cursor
    [N]d{motion}            delete the text that is moved over with {motion}
    {visual}                delete the highlighted text
    [N]dd                   delete N lines
    [N]D                    delete to the end of the line (and N-1 more lines)
    [N]J                    join N-1 lines (delete <EOL>s)
    {visual}J               join the highlighted lines
    [N]gJ                   like "J", but without inserting spaces
    {visual}gJ              like "{visual}J", but without inserting spaces
    [N]:[range]d [x]        delete [range] lines [into register x]

1. `[N]d$` 等价于 `[N]D`
2. `[N]:[range]d [x]`可以将删除文件放入指定寄存器

例子：

    d0                      当前列删除至行首
    d^                      当前列删除至当前行第一个非空白字符 
    d$                      当前列删除至当前行末尾
    d%                      当前列删除至匹配的配对字符






## Copying and moving text

有用的如：`"{char}, :reg, :reg {arg}, y, p, P`

    "{char}             use register {char} ( {a-zA-Z0-9.%#:-"} ) for the next delete, yank, or put
                        (use uppercase character to append with delete and yank)
                        ({.%#:} only work with put)
    :reg                show the contents of all registers
    :reg {arg}          show the contents of registers mentioned in {arg}
    :di[splay]          same as :registers
    :di {arg}           same as :reg {arg}
    [N]["x]y{motion}
    {visual}["x]y
    :[range]y[ank] [x]
    [N]["x]yy
    [N]["x]Y
    [N]["x]p
    [N]["x]P
    [N]["x]]p
    [N]["x][p
    [N]["x]gp
    [N]["x]gP


1. :reg {arg}

        " 查看寄存器", 0, 1, 2的内容
        :reg "012

2. 使用好寄存器解决剪切内容丢失问题：
        
        " show retisters 
        :reg
        " use register 3 for the next delete, yank or put 
        "3
        " put 
        p
         
3. 将指定行保存到寄存器中：

        :10,15y a


## Text Motions

常用的如`w, W, b, B, ), (, }, {`

    [N]w            N words forward
    [N]W            N blank-separated WORDs forward
    [N]e            forward to the end of the Nth word
    [N]E            forward to the end of the Nth blank-separated WORD

    [N]b            N words backward
    [N]B            N blank-separated WORDs backward
    [N]ge           backward to the end of the Nth word
    [N]gE           backward to the end of the Nth blank-separated WORD

    [N])            N sentences forward
    [N](            N sentences backward
    [N]}            N paragraphs forward
    [N]{            N paragraphs backward
    [N]]]           N sections forward, at start of section
    [N][[           N sections backward, at start of section
    [N]][           N sections forward, at end of section
    [N][]           N sections backward, at end of section
    [N][(
    [N][{
    [N][m
    [N][M
    [N]])
    [N]]}
    [N]]m
    [N]]M
    [N][#
    [N]]#
    [N][*           N times back to start of comment "/*"
    [N]]*           N times forward to end of comment "*/"




## Recording

记录操作序列至寄存器，在需要的时候直接输入`@{register}`，操作序列会执行一遍。

    " start recording into register 'a' 
    qa
    :s/</+++/g
    :s/>/---/g
    <CR>
    " stop recording
    q

    " execute register 'a'
    [count]@a



## Quickfix 

idea来自`Manx's Aztec C`编译器，可以将编译的错误信息保存到文件，使用vim`逐个`跳至对应错误进行修改，而无需记住所有的错误信息。

    :cw





## Bar

用来`分隔`命令，`不是管道`，如果需要用字面量，使用`"\|"`

    :let lines = getline(1, '$') | for i in lines | echo "> " . i | endfor 

但是，有些命令则不支持命令分隔符，比如`:argdo`, `:autocmd`, `:function`等。它们将`|`作为其参数，所以不能用`|`作为命令分隔符。有如下命令：

    :argdo
    :autocmd
    :bufdo
    :command
    :cscope
    :debug
    :folddoopen
    :folddoclosed
    :function
    :global
    :help
    :helpfind
    :lcscope
    :make
    :normal
    :perl
    :perldo
    :promptfind
    :promptrepl
    :pyfile
    :python
    :registers
    :read !
    :scscope
    :sign
    :tcl
    :tcldo
    :tclfile
    :vglobal
    :windo
    :write !
    :[range]!


另外，由`!`引入的外部命令，是可以用`|`作为管道的。



## Ranges

> 查看输入：`help :range`

常用的如：`*, '<, '>`

    " from line 4 till match with ":sign" after the cursor line
    :4,/:sign/

    " from line 4 till match with ":sign" after line 5 
    :5;/:sign/

    " from current line to end of file
    :.,$

    " from begin of file to  end of file
    :%

    " from current line to position of mark t
    :.,'t

    " from current line to next line match /^##/
    :.,/^##/

    " from current line to previous line match /^##/
    :.,?^##?

    " from current line to the next line where the previously used search pattern matches
    :.,\/

    " from current line to the previous line where the previously used search pattern matches
    :.,\?

    " from current line to the next line where the previously used substitute pattern matches
    :.,\&


    " visual area
    :*
    :'<,'>





## Args and ArgsDo

### Syntax

    " print the argument list, with the current file in square brackets
    :ar[gs] 

    " this fails when changes have been made and vim does not want to abandon the current buffer
    :ar[gs] [++opt] [+cmd] {arglist}

    " discard any changes to the current buffer
    :ar[gs]! [++opt] [+cmd] {arglist}

    :[range]argdo[!] {cmd}
    :[count]arge[dit][!] [++opt] [+cmd] {name}
    :[count]arga[dd] {name} ..
    " add current buffer name to the argumet list
    :[count]arga[dd]
    :argd[elete] {pattern} ..
    :[range]argd[elete]
        :10,$argd
        :$argd
        :%argd
    :[count]argu[ment] [count] [++opt] [+cmd]
    :[count]argu[ment]! [count] [++opt] [+cmd]
    :[count]n[ext] [++opt] [+cmd]
    :[count]n[ext]! [++opt] [+cmd]
    :[count]N[ext] [++opt] [+cmd]
    :[count]N[ext]! [++opt] [+cmd]
    :[count]prev[ious] [count] [++opt] [+cmd]
    :rew[ind] [++opt] [+cmd]
    :rew[ind]! [++opt] [+cmd]
    :fir[st][!] [++opt] [+cmd]
    :la[st][!] [++opt] [+cmd]
    :[count]wn[ext][!] [++opt] {file}
    :[count]wN[ext][!] [++opt] {file}
    :[count]wp[revious][!] [++opt] {file}


### Examples

替换整个目录（包含子目录）下的js文件中的`<`为`&lt;`

    :args **/*.js
    :args
    :argdo %s/</&lt;/g | up 

更换当前目录下的c文件的文件格式：

    :args *.c
    :argdo set ff=unix | update

将data目录下的`所有.txt文件`全部转换成为`字符串`，并赋值给`var g_case_data`变量：

    :args data/*.txt
    :argdo %d | let lines = @" | let lines = 'var g_case_data = ' . json_encode( lines ) . ';' | call setline( '.', lines ) | up


类似的还有`:bufdo`和`:windo`。




## bufdo and windo

对所有buffer和windows执行命令。

    :bufdo set fenc= | update
    :windo set nolist nofoldcolumn | normal zn

1. 重置所有buffer的`fenc`并更新。结果就是所有buffer将使用`encoding`的编码（编码转换成功的话）。
2. 所有窗口设置`nolist`和`nofoldcolumn`，并关闭折叠`zn`。   





    


## Registers

### Get help

    :help registers


### Registers

`9种`类型的`寄存器`，共`48`个：

1. 未命名寄存器，双引号寄存器`""`，y, d, x等操作的改变内容都会存放在该寄存器中
2. 10个数字寄存器`"0` - `"9`
3. 小删除寄存器，存储`少于一行`的删除：`"-`
4. 26个命名寄存器`"a` - `"z`或者`"A` - `"Z`，尽量使用`小写`。
5. 4个只读寄存器`":`, `".`, `"%`, `"#`
    * `".` - 存储最近插入的内容
    * `"%` - 当前文件名

            " 输出当前文件名寄存器的内容
            :echo @%
            " 输出当前文件的全路径
            :echo getcwd() . '/' . getreg( '%' )

    * `":` - 最近执行的命令行
    * `"#` - alternate file name

6. 表达式寄存器`"=`
7. selection and drop 寄存器`"*`, `"+`, `"~`
    * `"*` - 剪贴板内容
8. 黑洞寄存器`"_`，往其中写内容，什么都不会发生；往外读取是，什么都读不到。用于删除内容，不希望影响其他寄存器的时候，可以指定该寄存器，比如：`"_d`, `"_x`
9. 上一检索模式寄存器`"/`


### Examples

特殊寄存器举例如下：

    " the unnamed register, containing the text of the last delete or yank
    :echo @"

    " the current file name
    :echo @%

    " the alternate file name
    :echo @#

    :echo @*
    :echo @+
    :echo @/

    " the last command-line
    :echo @:

    :echo @-
    :echo @.
    :echo @=



    

## Marks

> `a-z` for buffer markers, `A-Z0-9` for file markers

### Features

* marker不是保存在内存中，而是`持久化到文件`中，所以可以跨`session`、`progress`共享
* register同marker


### Normal mode commands

`Set marker`

    m{a-zA-Z}
    m' or m`    set the previous context mark. this can be jumped to with the "''" or "``"
    m[ or m]    set the "'[" or "']" mark


`Jump to marker`

    '{a-z} or `{a-z}            jump to the mark {a-z} in the current buffer 
    '{A-Z0-9} or `{A-Z0-9}      to the mark {A-Z0-9} in the file where it ws set ( not a motion
                                command when in another file ).
    


比如当前在文档某个位置，希望临时去另外一个位置，然后还回来：

    m'
    123gg
    ...
    ''

用于Visual mode选取，比如：
    
    m'
    v
    CTRL-D
    CTRL-D
    CTRL-D
    CTRL-D
    ''


### command-line mode commands

    :[range]ma[rk] {a-zA-Z'}    set mark {a-zA-Z'} at last line number in [range]
    :[range]k{a-zA-Z'}          same as :mark, but the space before the mark name can be omitted 
    :marks                      list all the marks
    :marks {args}               list all the marks those are mentioned in {args}
    :delm[arks] {marks}         delete the specified marks. Marks that can be deleted include A-Z and 0-9
    :delm[arks]!                delete all marks for the current buffer, but not marks A-Z or 0-9







## Scrolling

滚动屏幕，光标不跟随移动（除非要移出屏幕）：

    CTRL-E                      scroll window [count] lines downwards
    CTRL-D                      scroll window downwards. the number of lines comes from the 
                                `scroll` option (default: half a screen)
    CTRL-Y                      scroll window [count] lines upwards
    CTRL-U                      scroll window upwards. the number of lines comes from the 
                                `scroll` option (default: half a screen)




## CTRL-W相关

> 获取帮助：`:help CTRL-W`

### 获取帮助

* window相关帮助：`:help window`
* CTRL-W命令相关帮助：`:help CTRL-W`，特定命令帮助：`:help CTRL-W_J`
* 默认`窗口切割线`为`水平方向`


### 窗口分割

    # 用水平分割线分割
    CTRL-W s
    CTRL-W S
    :[N]sp[lit] [++opt] [+cmd] [file]

    # 用垂直分割线分割
    CTRL-W v
    :[N]vs[plit] [++opt] [+cmd] [file]

    # 用水平分割线来创建新窗口，且新开空buffer
    CTRL-W n
    :[N]new
    :[N]vne[w]

    # 用垂直分割线来创建新窗口，且新开空buffer
    :[N]sv[iew] [++opt] [+cmd] {file}

    CTRL-W ]

    # 用水平分割线分割，将当前鼠标下的文件名所指的文件在新窗口中打开
    CTRL-W f
    # 用水平分割线分割，将当前鼠标下的文件名所指的文件在新窗口中打开
    # ，且跳转至文件名后所指的行号
    CTRL-W F

    # 见tab
    CTRL-W gf
    CTRL-W gF


### 窗口切换命令

    CTRL-W k        切换至上方窗口
    CTRL-W j        切换至下方窗口
    CTRL-W h        切换至左边窗口
    CTRL-W l        切换至右边窗口


### 窗口移动命令

    CTRL-W r        窗口向右/向下循环切换位置
    CTRL-W R        窗口向左/向上循环切换位置
    CTRL-W x        窗口交换位置
    CTRL-W K        置顶且占用全部宽度
    CTRL-W J        置底且占用全部宽度
    CTRL-W H        置左且占用全部高度
    CTRL-W L        置右且占用全部高度
    CTRL-W T        将当前窗口放到新的Tab中

### 窗口缩放命令

    CTRL-W =        将所有窗口设置成等宽、等高，对设置了winfixheight, winfixwidth的窗口不生效
    CTRL-W _        窗口高度设置成尽可能高，等同`:res[ize]`命令
    CTRL-W |        窗口宽度设置成尽可能宽，等同`:vertical res[ize]`命令
    CTRL-W [N]+     窗口高度增加N
    CTRL-W [N]-     窗口高度减少N
    CTRL-W [N]>     窗口宽度增加N
    CTRL-W [N]<     窗口宽度减少N
    z{N}<CR>        窗口高度设置成N


### todo


### :wincmd

`CTRL-W j`
、`CTRL-W h`
、`CTRL-W l`
等快捷键可以在各个分隔窗口间切换，但是在某些情况下，无法使用快捷键写法的时候，需要使用
`:wincmd`命令来代替，举个例子：

`NERDTree`需要自动打开，并且将焦点设置在右边窗口：

    autocmd vimenter * NERDTree | :wincmd l

这个时候，如果这么写是不可以的：
    
    autocmd vimenter * NERDTree | <Esc><C-w>j

因为这时需要的是一个`Command-line command`，而不是`Normal mode command`。
更复杂的，比如不希望从标准输入读取时也打开NERDTree，可以如下写法：

    autocmd StdinReadPre * let s:std_in=1
    autocmd VimEnter * if argc() == 1 && !exists("s:std_in") | NERDTree | :wincmd l | endif




## Tabs

> 获取帮助：`:help :tab`

### Commands

    # tab新建
    :[count]tabe[dit]
    :[count]tabnew
    :[count]tabe[dit] [++opt] [+cmd] {file}
    :[count]tabnew [++opt] [+cmd] {file}
        :.tabnew
        :+tabnew
        :-tabnew
        :0tabnew
        :$tabnew

    # 在tab中执行命令
    :[count]tab {cmd}
        # 当前buffer在新tab中打开
        :tab split
        # 新tab中打开`help :split`命令对应的文档
        :tab help :split
        :.tab help
        :-tab help
        :+tab help
        :0tab help
        :$tab help

    # 列出所有tab
    :tabs

    # tab关闭
    :tabc[lose][!]
    :tabo[nly][!]

    # tab间切换
    :tabn[ext]
    [count]gt
    :tabp[revious]
    :tabN[ext]
    [count]gT
    :tabr[ewind]
    :tabfir[st]
    :tabl[ast]

    # 新开tab，并将当前鼠标下的文件名所指的文件在新的tab page中编辑
    CTRL-W gf
    # 新开tab，并将当前鼠标下的文件名所指的文件在新的tab page中编辑
    # ，并跳转到文件名后面所示的行号
    CTRL-W gF

    # tab移动
    # 移动到tab N
    :tabm[ove] [N] 
    :[N]tabm[ove]
        :.tabmove
        :-tabmove
        :+tabmove
        :0tabmove
        :tabmove 0
        :tabmove
        :$tabmove
        :tabmove $
    # 向右或向左移动
    :tabm[ove] +[N]
    :tabm[ove] -[N]


### Options

    tabline
    showtabline

todo


## VimGrep

> 全文检索，`:vimgrep`，简写`:vim`

### Syntax

    :vim[grep][!] /{pattern}/[g][j] {file} ...

### Examples

    :vimgrep /<script.\+>/ **/*.md
    :cw

    " % stands for current file?
    :vimgrep /^##/ %
    :cw

    " :vim for short; `\c` is for case-insensitive
    :vim /\cquickview/ */components/**/*.js
    :vim /\cquickview/ **/components/**/*.js
    :cw

`Terminal`与`iTerm2`运行vim的区别，命令`:vimgrep`的起始目录处理不一样，Terminal中可以通过NERDTree中使用cd命令改变全局搜索起始目录，iTerm2只是改变了NERDTree的目录，编辑窗口的搜索起始目录仍未变。

`iTerm2`下的处理办法，就是在编辑窗口下，运行`:cd`命令，显式改变编辑窗口的搜索起始目录。


## Files and Buffers

常用的如：`:f, :ls, :ball`

    :f[ile]             
    :f[ile]!
    {count}CTRL-G
    g CTRL-G
    :f[ile][!] {name}
    :0f[ile][!]

    " list all know buffer and file names
    :buffers
    :files
    :ls

    " edit all buffers
    :ball

    " edit all loaded buffers
    :unhide

    :badd {fname}
    :bunload[!] [N]
    :bdelete[!] [N]

    :bfirst
    :blast

    :[N]bmod [N]


## Automatic Commands

syntax:

    :au [group] {event} {pat} [nested] {cmd}

比较有用的比如：`:au, :au {event}, :au {event} {pat}`

    :rv[iminfo] [file]
    :rv[iminfo]! [file]
    :wv[iminfo] [file]
    :wv[iminfo]! [file]

    " list all autocommands
    :au

    " list all autocommands for {event}
    :au {event}

    " list all autocommands for {event} with {pat}
    :au {event} {pat}

    " enter new autocommands for {event} with {pat}
    :au {event} {pat} {cmd}


    " do removement
    :au!
    :au! {event}
    :au! * {pat}
    :au! {event} {pat}
    :au! {event} {pat} {cmd}

    " autocmd group
    :aug[roup] {name}   " define the autocmd group name for the following ":autocmd" commands

    :au filetypedetect  " define filetypedetect group
    :au filetypedetect BufEnter     " list autocommands for BufEnter event in filetypedetect group 
    :au filetypedetect BufNewFile   " list autocommands for BufNewFile event in filetypedetect group 

### 自动设置文件类型

设置`*.vue`文件的`filetype`为`html`，可用如下autocommand：

    :au BufNewFile,BufRead *.vue setf html








## User-defined commands

    :com[mand]
    :com[mand] {cmd}
    :com[mand][!] [{attr}...] {cmd} {rep}
    :delc[ommand] {cmd}
    :comc[lear]

1. :W命令

        command W w !sudo tee % > /dev/null



## Various Commands

有用的如：`CTRL-L, CTRL-G, ga, g8, :ve`

    CTRL-L                      clear and redraw the screen
    CTRL-G                      show current file name (with path) and cursor position
    ga                          show ascii value of character under cursor in decimal, hex, and octal
    g8                          for utf-8 encoding: show byte sequence for character under cursor
    g CTRL-G                    show cursor column, line, and character position
    CTRL-C                      during searches: Interrupt the search
    <Del>                       while entering a count: delete last character
    :ve[rsion]                  show version information
    :norm[al][!] {commands}     execute Normal mode commands
    Q
    :redir >{file}              [not in Vi] redirect messages to {file}
    :silent[!] {command}
    :confirm {command}
    :browse {command}
    CTRL-Break
    :mode N 



### 打开shell命令行

`子进程`方式打开shell命令行。

    :sh[ell]
    $ ls
    $ ...
    $ exit

可以通过`exit`回到vim。




### 行注释

command line模式的行注释。

    :#!{anything}

所以在vim的command line模式下，`#`是特殊字符，需要`转义`。例如：

    :%!awk '/^\#/'

过滤出所有以`#`开头的行，这里的`\#`




### 执行normal命令 

扩展`command line`，允许`command mode`下执行`normal mode`的命令。

    :norm dd

就像在normal mode下输入`dd`删除当前光标所在行一样。

    :exe "normal \<c-w>\<c-w>"


> 目前所知，在`函数中`调用:norm命令，不生效。参考我的`.vimrc`中`F_copy_selected_text`部分的实现。

#### 与execute的区别

* `:norm`后直接输入`命令`，而不同于`:exe`，输入的是命令`字符串`
* `:norm`允许在Command-line模式下运行Normal模式下的命令；`:exe`允许在将字符串表示的命令作为Ex Commands执行
* [ maybe ]，`:norm`在函数内无法使用，但`:exe`可在函数种使用



### 静默执行

    :sil[ent] {commands}



###  执行外部命令 

当前buffer的内容可以通过`range`选择，`pipe`到外部命令，外部命令的输出结果会`替换`当前buffer中通过range`选中的`内容。

    :[range]!{command}

比如：

    :%!xxd
    :1,100!grep -E '^\#'
    :'<'>!sed -e 's/aaa/111/g'
    :'<'>!sort
    :%!bc -l
    :'<,'>!awk '/^.*$/{printf "\%s = \%d\n",$0,$1 + $3}'
    :'<,'>!sed -e '1\!G;h;$\!d'
    :'<,'>!tail -r
    :'<,'>!prettier --tab-width=4

1. 当前buffer内容用外部`xxd命令`转换后并`替换`
2. 当前buffer第1到100行内容，用外部命令`grep`过滤出以`#`开头的行，并`替换`，注意`#`需要转义
3. 选中内容用外部`sed`命令进行内容替换，并用替换后内容替换
4. 选中内容用外部`sort`命令进行排序，并替换
5. 所有行内容作为数学算式由外部命令`bc`进行计算，并用返回的计算结果替换
6. 选中行的第一个与第三个数`相加`，并`追加`到行末尾，注意`%`需要转义
7. 将选中的所有行`按行号逆序`输出，并替换，注意`!`需要转义。相关参考：<ref://../shell/linuxshell.md.html>中关于`sed`命令的部分。
8. 同上，`更简单`的按行号逆序输出
9. 将选中区域文本使用prettier命令`格式化`



### 命令行print

可快速将当前`buffer`的内容导入到`命令行`中。

    :print
    :pr
    :p
    :P
    :list
    :l
    :number
    :nu
    :#

以上命令支持前导`[range]`



### 命令行重定向

    :redi[r] > file
    :redi[r] >> file
    :redi[r]! > file
    :redi[r]! >> file
    :redi @a
    :redi => var
    :redi END

#### Tips

* 可至`文件`、`寄存器`、`变量`等，有多种选择
* `:redi END`之后，再去获取内容，比如在`:redi END`之前，相关变量内容是取不到的


#### Examples

`例1`，将`buffer list`输出到当前文档中:

    :redi @a | sil ls | redi END | norm "ap


`例2`，将`buffer list`输出到临时`文件`中，再进行文本`查询`:

    :redi! > /tmp/files | sil ls | redi END | !cat /tmp/files | grep abc




### 关键词外部命令查找

    K

使用外部命令（由`keywordprg` option定义）查找当前光标处关键词。

    :set keywordprg
    keywordprg=man -s






    

## 常见问题

1. 使用过程中，方向键无法使用，出现`E388: couldn't find definition`，解决的方法之一，输入

        :!reset

    也可自行查找一下问题，看看键盘映射此时是否有异常，使用以下命令：

        :nmap <Left>
        :nmap <Up>


2. 使用过程中，会出现`neo`自动提示时好时坏，原因很有可能是开启了`paste`模式，使用这个试试：

        :set nopaste

3. Mac下的vim`光标速度`默认情况下，相比Windows而言，`慢`很多，比较影响编辑效率。实际上这是因为键盘设置的问题。只需在键盘设置中调整`按键重复`以及`重复前延迟`两个项。



