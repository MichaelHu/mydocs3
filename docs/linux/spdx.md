# spdx

> The `Software Package Data Exchange®` (`SPDX®`) specification is a standard format for communicating the components, licenses and copyrights associated with a software package.


* 主页：<https://spdx.org>
* SPDX协议列表：<https://spdx.org/licenses/>

SPDX工作组


## 相关

### npm报错问题

npm `v2.15.5`，为nodejs `v4.4.5`附带安装。运行`npm init`命令时，log文件有如下输出：

    npm init

    log file: 

    0 info it worked if it ends with ok
    1 verbose cli [ '/usr/local/bin/node', '/usr/local/bin/npm', 'init' ]
    2 info using npm@2.15.5
    3 info using node@v4.4.5
    4 silly package data undefined
    5 info init written successfully
    6 verbose stack Error: Cannot find module 'spdx'
    7 ...

是npm本身的问题，背景是npm为nodejs pkg安装附带的，所以可能是安装的问题，也可能是版本的问题。这个问题可以通过`升级npm`版本解决。具体查看npm相关文档。
