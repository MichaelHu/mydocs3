# homebrew

> The missing package manager for macOS

## Resources

* `site`: <https://brew.sh>
* cookbook on github: <https://github.com/Homebrew/brew/blob/master/docs/Formula-Cookbook.md>

## Installation

    /usr/bin/ruby -e \
        "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"



### 相关文件

    ==> This script will install:
    /usr/local/bin/brew
    /usr/local/share/doc/homebrew
    /usr/local/share/man/man1/brew.1
    /usr/local/share/zsh/site-functions/_brew
    /usr/local/etc/bash_completion.d/brew
    /usr/local/Homebrew

    ==> The following new directories will be created:
    /usr/local/Cellar
    /usr/local/Homebrew
    /usr/local/Frameworks
    /usr/local/opt
    /usr/local/share/zsh
    /usr/local/share/zsh/site-functions
    /usr/local/var



## Usage

    # 安装macOS默认没有的wget工具
    $ brew install wget

    # 安装在homebrew指定的目录下，然后在/usr/local/bin下添加符号链接
    $ cd /usr/local
    $ find Cellar
    Cellar/wget/1.16.1
    Cellar/wget/1.16.1/bin/wget
    Cellar/wget/1.16.1/share/man/man1/wget.1  

    $ ls -l bin
    bin/wget -> ../Cellar/wget/1.16.1/bin/wget

    $ brew help
    $ brew --help
    $ brew help <COMMAND>

    brew update

