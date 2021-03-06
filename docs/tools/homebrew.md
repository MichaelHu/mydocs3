# homebrew

> The missing package manager for macOS

## Resources

* `site`: <https://brew.sh>
* `github`: <https://github.com/Homebrew/brew> <iframe src="http://258i.com/gbtn.html?user=Homebrew&repo=brew&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
* `docs`: <https://github.com/Homebrew/brew/docs>
* `cookbook`: <https://github.com/Homebrew/brew/blob/master/docs/Formula-Cookbook.md>


## Concepts

* `formula`: A formula is a `package definition` written in Ruby. 可以通过`brew create <URL>`创建，使用`brew install <formula>`安装
* `tap`: third-party repositories, <https://github.com/Homebrew/brew/blob/master/docs/brew-tap.md>
    ，通过`brew tap <user/repo>`添加新的第三方库，增加brew查找formula的可选范围。
        $ brew tap                  # 列出当前可用tap库
        homebrew/core               # 默认为homebrew/core



## Tips

* 安装方式为在线安装，安装前会拉取最新版本安装
* 不提供回到旧版本功能，也不提供安装指定版本的功能
* `2018年9月`左右开始，新版的brew开始`关闭安装选项`的支持，而将安装选项较优formula本身来管理。具体参考<https://github.com/Homebrew/homebrew-core/issues/31510>

        # 以下在新版的brew中会提示`invalid options`而无法安装
        $ brew install yarn --without-node
        $ brew install fontforge --with-python

    新版brew中，只能把额外的options去掉才能正常安装。但如果formula没有更新的话，可能就无法安装了




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

    $ brew update
    $ brew update --verbose

    # 安装ruby 2.3
    $ brew search ruby
    $ brew install ruby@2.3
    $ brew install --debug fontforge --with-python

    # 以下命令提示，表明没有指定的安装包
    $ brew search woff2
    No formula found for "woff2".
    $ brew tap
    homebrew/core
    # 添加新的tap
    $ brew tap bramstein/webfonttools
    $ brew tap
    bramstein/webfonttools
    homebrew/core
    # 添加新的tap后，找到对应formula
    $ brew search woff2
    ==> Searching local taps...
    bramstein/webfonttools/woff2
    ...

    $ brew create <URL>         # URL为zip包或tarball
    $ brew install <formula>    # 安装



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



## Misc

关于安装`fontforge`使用`--with-python`选项的一些有用提示：

    $ brew install --debug fontforge --with-python
    ...
    Python modules have been installed and Homebrew's site-packages is not
    in your Python sys.path, so you will not be able to import the modules
    this formula installed. If you plan to develop with these modules,
    please run:
      mkdir -p /Users/hudamin/.local/lib/python2.7/site-packages
      echo 'import site; site.addsitedir("/usr/local/lib/python2.7/site-packages")' >> /Users/hudamin/.local/lib/python2.7/site-packages/homebrew.pth
    ...




