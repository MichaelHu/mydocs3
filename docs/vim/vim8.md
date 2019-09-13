# vim8

> changelog: 1812, 1706, 1703, 1612, 1610

## Resources

* github: <https://github.com/vim/vim>
* latest version ( 2018-12-17 ): `v8.1.0606`
* releases: <https://github.com/vim/vim/releases>
* vim7: <ref://./vim7.md.html>
* vim: <ref://./vim.md.html>



## 新特性


### 查看新特性

    :help
    在`Versions`节中可以查看changelog，`ctrl-]`打开`version8`文件即可。

    或者直接输入以下命令：
    :help version8



### 兼容性问题

* 默认情况下`backspace=""`，即使已经设置了`set nocompatible`也一样，所以会影响回退键的使用。需要显式设置：

        set backspace=indent,eol,start


### 版本更新特性
        
* `8.1`: The main new feature of Vim 8.1 is support for running a `terminal in a Vim window`.
    * The `Terminal debugging plugin` can be used to debug a program with gdb and view the source code in a Vim window.




## Terminal

### Tips

* 支持在vim窗口中使用终端
* 支持两种模式，`Job模式`用于命令运行；`Normal模式`，可浏览命令输出，相当于将命令输出读取到vim中，并开启`只读模式`。此功能对于捕获命令输出非常有用
* 通过配置，可以支持在vim中进行`多窗口程序调试`
* 可通过`[range]`方便地将编辑窗口的内容传送到将要在term中运行的命令


### 常用命令

    # syntax
    :[range]ter[minal] [options] [command]

    # 常用命令
    :help :term
    :term
    :term bash
    :term make myprogram
    :term gdb vim

### 常用操作

    操作                功能
    ======================================================
    CTRL-w CTRL-c       关闭term窗口
    or CTRL-d



### Command Options

> Command Options，使用`++`作为前缀
    
    ++close         The terminal window will close
                    automatically when the job terminates.
    ++noclose       The terminal window will NOT close
                    automatically when the job terminates.
    ++open          When the job terminates and no window
                    shows it, a window will be opened.
                    Note that this can be interruptive.
                    The last of ++close, ++noclose and ++open
                    matters and rules out earlier arguments.

    ++curwin        Open the terminal in the current
                    window, do not split the current
                    window.  Fails if the current buffer
                    cannot be |abandon|ed.
    ++hidden        Open the terminal in a hidden buffer,
                    no window will be used.
    ++norestore     Do not include this terminal window
                    in a session file.
    ++kill={how}    When trying to close the terminal
                    window kill the job with {how}.  See
                    |term_setkill()| for the values.
    ++rows={height} Use {height} for the terminal window
                    height.  If the terminal uses the full
                    Vim height (no window above or below
                    the terminal window) the command line
                    height will be reduced as needed.
    ++cols={width}  Use {width} for the terminal window
                    width. If the terminal uses the full
                    Vim width (no window left or right of
                    the terminal window) this value is
                    ignored.
    ++eof={text}    when using [range]: text to send after
                    the last line was written. Cannot
                    contain white space.  A CR is
                    appended.  For MS-Windows the default
                    is to send CTRL-D.
                    E.g. for a shell use "++eof=exit" and
                    for Python "++eof=exit()".  Special
                    codes can be used like with `:map`,
                    e.g. "<C-Z>" for CTRL-Z.



### Setting Options

> Setting Options，使用`:set`命令可get或set

    termwinsize
    termwinkey
    termwinscroll



### 模式

* 有两种模式：`Terminal Job`模式和`Terminal Normal`模式
* 模式切换：

        操作                目标模式        只读模式  
        =========================================================================
        CTRL-w N            Normal Mode     Yes
        or CTRL-\ CTRL-n   
        i, a                Job Mode        实时显示命令输出的内容，可认为写模式






## 安装


### 编译过程

`源码`安装，毕竟是一个`轻量级`的编辑器，编译速度也很快。

    git clone https://github.com/vim/vim.git
    cd vim
    ./configure --prefix=/Users/hudamin/softwares/vim8.0.0402 \
        --with-lua-prefix=/usr/local \
        --enable-luainterp=yes
    make
    make install
    make test

其中，lua（相关安装见<ref://../lua/lua.md.html>）相关选项用于vim插件`neocomplete`，该插件是`neocomplcache`的取代。安装好以后，通过：

    vim --version

或者

    :version

可以看到`+lua`选项。


### 环境配置

修改`~/.bash_profile`，满足vim7和vim8同时存在，但是想`优先`使用`vim8`的要求。

    PATH=~/softwares/vim8.0.0402/bin:$PATH
    export PATH




## Tips

> **CentOS 6.5** ( my ecs )安装的问题
1. CentOS 7.6 编译vim8.1报错no terminal library found <https://www.jianshu.com/p/0ae0747a2d04>
2. Error: expecting string instruction after 'rep' 问题解决 <https://blog.csdn.net/hongweigg/article/details/72956992>




