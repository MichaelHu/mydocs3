# cygwin

> `Get that Linux feeling - on Windows` **在windows上获得linux的体验**

## Features
* 提供Linux系统常用命令集合，可以通过packages的方式**自定义安装**各类GNU以及开源工具
* 提供**Linux风格的终端命令行**
* 支持Windows平台 
* 提供一种在Windows平台下获得Linux命令行操作体验的方式
* 提供在Windows平台下编译跨平台程序的方式，比如提供*gcc/g++*工具，将标准C/C++代码编译成Windows平台使用的程序
* 若想在Windows下，一个终端中使用Linux命令，以及git、vim等命令行工具，可以选择cygwin

## Resources
* site: <http://www.cygwin.com>


## Versions
* *3.0.7*


## Installation
* 在官网下载安装程序，根据系统位数下载 
* 安装程序提供包下载、管理、配置的功能，具体程序包需要通过互联网下载，有很多线上镜像列表可选
* 安装程序**可多次运行**，用于管理安装包的更新、卸载、新装等功能


## Tips 
* 所有的**绝对路径**都是**以cygwin的安装目录为root**
* 使用`/cygdrive/c/`表示C:盘，`/cygdrive/d/`表示D:盘
* 默认HOME为`/home/Administrator`，可以通过**export**命令临时修改，比如：
        export HOME=/cygdrive/d
* 默认HOME目录下，提供以下配置文件
        .bash_history
        .bash_profile
        .bashrc
        .inputrc
        .minttyrc
        .profile

> 关于修改**默认HOME**目录，具体可参考<https://cloud.tencent.com/developer/ask/56114>
* **Cygwin 1.7.34+**的版本，可以在`/etc/nsswitch.conf`文件中修改
    > 具体可参考：<https://cygwin.com/cygwin-ug-net/ntsec.html#ntsec-mapping-nsswitch>
    比如将默认的*/home/Administrator*改成`/cygdrive/d/hudamin`，可在*/etc/nsswitch.conf*文件中如下修改：
        db_home: /cygdrive/d/hudamin
* 低版本的Cygwin，修改方式可以参考如下：
    * cygwin**启动批处理文件**为cygwin安装目录下名为*Cygwin.bat*的文件，其**默认内容**为：
            1 @echo off
            2 setlocal enableextensions
            3 set TERM=
            4 cd /d "%~dp0bin" && .\bash --login -i
    * 可通过修改*Cygwin.bat*文件，修改默认HOME目录：
            ...
            3 set TERM=
            4 set HOME=
            5 cd /d "%~dp0bin" && .\bash --login -i
        
