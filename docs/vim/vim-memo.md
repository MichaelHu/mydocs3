# VIM 备忘

2014-11-05 hudamin - 转载请注明出处

> 向编辑神器VIM致敬 

## 拎出来放在前面的内容

1. 编辑模式搞清楚，记住`normal, insert, visual, command-line`
2. `normal`模式下，`单引号'`用于访问mark，`双引号"`用于设置下一delete，yank或者put操作使用的寄存器
3. `normal`以及`command-line`模式下，`@`用于访问寄存器
4. 带`g前缀`的命令原来功能这么强大，比如：`g0, g^, g$, gm, gp, gP, gJ, ge, gE, 
    ga, g8, g CTRL-G, gk, gj`，
    你知道几个？会用几个？
5. `insert`模式下，`CTRL-N`能用于输入补全提示
    


## Help

记住不同模式的help前缀，`:helpgrep`全文查找功能很赞。

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







## External Commands

    :sh[ell]
    :!{command}
    K

## Syntax Highlighting 

    :syntax on
    :syntax off
    :syntax clear
    :highlight clear
    :filetype on


## Folding

    :{range}fold
    zf{motion}

    zd
    zD

    zo
    zO
    zc
    zC
    
    zm
    zM
    zr
    zR

    zn
    zN
    zi

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




## Maps

    :map <F8> <Esc>:g/^#/<CR>




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

    :cw





## Bar

用来分隔命令，不是管道，如果需要用字面量，使用`"\|"`

    :let lines = getline(1, '$') | for i in lines | echo "> " . i | endfor 

但是，以下命令将`|`作为其参数，所以不能用`|`作为命令分隔符。

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

替换整个目录（包含子目录）下的js文件中的`<`为`&lt;`

    :args **/*.js
    :args
    :argdo %s/</&lt;/g | up 

更换当前目录下的c文件的文件格式：

    :args *.c
    :argdo set ff=unix | update


    


## Registers

9种类型的寄存器，共48个：

1. 未命名寄存器`""`
2. 10个数字寄存器`"0` - `"9`
3. 小删除寄存器`"-`
4. 26个命名寄存器`"a` - `"z`或者`"A` - `"Z`
5. 4个只读寄存器`":`, `".`, `"%`, `"#`
6. 表达式寄存器`"=`
7. selection and drop 寄存器`"*`, `"+`, `"~`
8. 黑洞寄存器`"_`
9. 上一检索模式寄存器`"/`

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


    


## VimGrep

    :vimgrep /<script.\+>/ **/*.md
    :cw

    " % stands for current file?
    :vimgrep /^##/ %
    :cw

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

`Examples:`

    :au filetypedetect
    :au filetypedetect BufEnter
    :au filetypedetect BufNewFile




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
    
