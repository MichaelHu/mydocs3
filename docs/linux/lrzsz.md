# lrzsz

> free X/Y/Zmodem implementation

<https://ohse.de/uwe/software/lrzsz.html>

## Features

* 文件传输协议，提供`Xmodem`, `Ymodem`, `Zmodem`三种文件传输协议
* 高达`8KB`的传输块
* 传输`奔溃恢复`，`校验`功能
* 高性能 


## transfer protocols

在`SecureCRT`下的传输协议有`ASCII`、`Xmodem`、`Ymodem`、`Zmodem`，共4种。

1. `ASCII`：这是最快的传输协议，但只能传送文本文件。
2. `Xmodem`：这种古老的传输协议速度较慢，但由于使用了`CRC`错误侦测方法，传输的准确率可高达`99.6%`。
3. `Ymodem`：这是Xmodem的`改良`版，使用了`1024位区段`传送，速度比Xmodem要快。
4. `Zmodem`：Zmodem采用了`串流式（streaming）`传输方式，传输速度较快，而且还具有`自动改变区段大小`和`断点续传`、`快速错误侦测`等功能。这是目前最流行的文件传输协议。



## Installation

    wget --no-check-certificate https://ohse.de/uwe/releases/lrzsz-0.12.20.tar.gz
    tar xf lrssz-0.12.20.tar.gz
    cd lrzsz-0.12.20
    ./configure && make && make install

以上在较新的编译环境上，已经无法通过编译，可以尝试`yum`命令（CentOS平台）：

    $ yum list lrzsz
    $ sudo yum install lrzsz

编译好以后的文件默认在`/usr/bin`目录下，分别为`rz, sz`命令，比较独立，其他同类型平台可以复制这两个文件过去，直接可用。


## Recent changes

> 老古董一把

* Version `0.12.20` - `December 1998, Uwe Ohse`
    * works on BeOS and stone-aged SCO (sco-3.2v4.2)
    * pubdir-"feature" works again.
    * "make rpm" creates a rpm file.
    * "optimal blklen calculation" was too aggressive, it now does nothing if the user demands fixed blklens.
    * various smaller and medium bug fixes.
    * a more or less important security bug is fixed (stupid use of /tmp in a piece of code which is rarely used).
    * lrz uses umask to make files unreadable which receiving them.
    * "sh systype | mail uwe-generic-counter@ohse.de" sends a success report with a description of the system type.
    * --enable-syslog is now default



