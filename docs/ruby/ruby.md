# ruby

> todo

## Install

    # 使用brew under MacOS
    $ brew install --debug ruby@2.3



## gem

`ruby`的包管理工具

    $ gem sources -l
    $ gem environment
    $ gem install GEMNAME
    $ gem install GEMNAME -v VERSION


### 安装fontcustom

> 安装`fontcustom`走过的弯路：

    # 安装fontcustom
    # 注意：使用--debug选项，会打出来很多Exception，但实际上是安装成功的  ---- [ 不靠谱的猜测 ]
    $ gem install --debug fontcustom
    $ gem isntall fontcustom

`fontcustom`的执行文件安装在`/usr/local/lib/ruby/gems/2.3.0/bin`，但没有自动添加该目录至Shell Path，需要手动添加。

    $ fontcustom compile
    error  Please install woff2 first. Visit <https://github.com/google/woff2> for instructions.

> `in fact`, 之所以会有以上问题，以及`不靠谱`的猜测，是因为安装的fontcustom版本是`2.0.0`，它是一个2.x的第一个版本，存在一些问题，导致安装时会出错。令人迷惑的是，它会在最后提示安装成功。

`解决方案`是：

    # 安装一个1.x的稳定版本即可
    $ gem install fontcustom -v 1.3.8

