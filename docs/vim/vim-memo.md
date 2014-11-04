# VIM 备忘

## Help

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


    


## Special Register

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
    
