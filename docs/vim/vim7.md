# vim7

## Resources

* vim8: <ref://./vim8.md.html>
* vim: <ref://./vim.md.html>


## Installation

通过SecureCRT在Linux主机上安装vim74，使其支持`X11-Server`，可以和本地进行`剪贴板`交互
    
    $ git clone https://github.com/vim/vim.git
    $ cd vim
    $ git tag
    ...
    v7.4.999
    ...
    v8.0.1428
    $ git checkout -b v7.4.999 v7.4.999
    $ ./configure --help
    $ ./configure --prefix=/home/fe/soft/vim74 \
            --enable-gui=auto \
            --enable-xim \
            --with-x \
            --with-features=huge \
            --enable-multibyte
    $ make
    $ make install

* 如果Linux主机不支持X features，那么将无法安装clipboard功能：

        $ ./soft/vim74/bin/vim --version | grep clip
        -clipboard       +iconv           +path_extra      -toolbar
        +eval            +mouse_dec       +startuptime     -xterm_clipboard

* 不过编译选项中支持：`--x-includes=DIR`, `--x-libraries=DIR`，后续可以尝试一下
