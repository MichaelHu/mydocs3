# nodejs安装

## Resources

* `site`: <http://nodejs.org>
* `site cn`: <http://nodejs.cn>
* `releases`: <https://nodejs.org/download/release/>


## Installation

现在nodejs安装已经很方便，`windows`和`mac os`都已经提供`二进制包`，基本上是`一键安装`了。安装nodejs`同时`会安装对应版本的`npm`。

Linux上，早期需要源码安装，如果有`gcc`环境，源码安装也非常方便，基本没什么问题。

    tar zxvf node-v0.12.4.tar.gz
    cd node-v0.12.4
    ./configure --prefix=PREFIX
    make && make install

目前已经分平台提供`二进制包`，下载后可`直接`运行。


