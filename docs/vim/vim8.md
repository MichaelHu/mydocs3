# vim8


## 新特性


### 查看新特性

    :help
    在`Versions`节中可以查看changelog，`ctrl-]`打开`version8`文件即可。

    或者直接输入以下命令：
    :help version8



### 兼容性问题

* 默认情况下`backspace=""`，即使已经设置了`set nocompatible`也一样，所以会影响回退键的使用。需要显式设置：

        set backspace=indent,eol,start







## 安装


### 编译过程

`源码`安装，毕竟是一个轻量级的编辑器，编译速度也很快。

    git clone https://github.com/vim/vim.git
    cd vim
    ./configure --prefix=/Users/hudamin/softwares/vim8 \
        --with-lua-prefix=/usr/local \
        --enable-luainterp=yes
    make
    make install
    make test

其中，lua（相关安装见`lua目录`）相关选项用于vim插件`neocomplete`，该插件是`neocomplcache`的取代。安装好以后，通过：

    vim --version

或者

    :version

可以看到`+lua`选项。


### 环境配置

修改`~/.bash_profile`，满足vim7和vim8同时存在，但是想`优先`使用`vim8`的要求。

    PATH=~/softwares/vim8/bin:$PATH
    export PATH

