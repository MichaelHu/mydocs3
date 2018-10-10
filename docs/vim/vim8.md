# vim8

> changelog: 1706, 1703, 1612, 1610

## Resources

* github: <https://github.com/vim/vim>
* latest version: `v8.1.0468`



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
    * 常用命令：
            :help :term
            :term
            :term bash
            :term make myprogram
            :term gdb vim






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

