# gdb

> The GNU Project Debugger

## Resources

* site: <http://www.gnu.org/software/gdb/>
* docs: 
    1. debug with gdb <ref://./docs/gdb/index.html>
    2. gdb annotate <ref://./docs/gdb-annotate/index.html>


## Features

* 允许你在其它程序运行时，查看其内部发生了什么；或者查看程序奔溃时，其做了什么
* 主要能做四种事情：
    1. 启动程序，设置任何可能影响其行为的参数
    2. 使程序在特定条件下暂停运行
    3. 当程序暂停运行使，查看发生了什么 
    4. 改变程序，调试bug
* GDB支持的`平台`：UNIX/Windows/Mac OS X
* GDB支持的`语言`：Ada, Assembly, C, C++, D, Fortran, Go, Objective-C, OpenCL, Modula-2, Pascal, Rust


## Installation

$ brew install gdb


## Mac平台问题

* [ 171112 ] MAC上使用gdb(完美解决) <https://blog.csdn.net/github_33873969/article/details/78511733>
* mac上使用`brew`安装gdb，会有以下提示：

        gdb requires special privileges to access Mach ports.
        You will need to codesign the binary. For instructions, see:

          https://sourceware.org/gdb/wiki/BuildingOnDarwin

        On 10.12 (Sierra) or later with SIP, you need to run this:

          echo "set startup-with-shell off" >> ~/.gdbinit

    需要对gdb程序进行`代码签名`，具体参考：<https://sourceware.org/gdb/wiki/BuildingOnDarwin>


## Versions

* 8.1


## Usage






