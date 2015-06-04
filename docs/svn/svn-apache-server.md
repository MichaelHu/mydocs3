# SVN服务器搭建


> subversion作为一个开源软件，由Apache Foundation维护




## 一、安装subversion


### 1. 依赖安装

1. apr, apr-util

2. tclsh，源码安装sqlite3需要tclsh，如果系统上没有，需要提前安装，如有，则略过。

    Tcl (Tool Command Language) is a very powerful but easy to learn dynamic programming language, suitable for a very wide range of uses, including web and desktop applications, networking, administration, testing and many more. Open source and business-friendly, Tcl is a mature yet evolving language that is truly cross platform, easily deployed and highly extensible.

    下载：http://www.tcl.tk/software/tcltk/download.html

    8.5.18版本： http://prdownloads.sourceforge.net/tcl/tcl8.5.18-src.tar.gz
    8.6.4版本： http://prdownloads.sourceforge.net/tcl/tcl8.6.4-src.tar.gz

    注意，以上皆为sourceforge链接，不能直接下载，需要先浏览器打开后，再获取实际链接。

    在baselibs.git上面有保存。

        ./configure --prefix=/home/xiaoju/fe/tcl
        make
        make install


3. sqlite

    自包含，无服务，另配置，事务型SQL数据库引擎。是一个软件库。

    SQLite is a software library that implements a self-contained, serverless, zero-configuration, transactional SQL database engine. SQLite is the most widely deployed database engine in the world. The source code for SQLite is in the public domain.

    从这里下载：http://www.sqlite.org/download.html

    `注意：`sqlite作为一个源码库，已经提供amalgamation方式，也即混合方式。把所有C文件都合并成一个文件，而不是
    分散存放，这样在编译的时候，也有利于编译器优化。所以请下载amalgamation包版本，也是推荐的版本：

    * 源码，包含configure：http://www.sqlite.org/2015/sqlite-autoconf-3081001.tar.gz
    * 纯源码：http://www.sqlite.org/2015/sqlite-amalgamation-3081001.zip

    安装：

        ./configure --prefix=/home/xiaoju/fe/sqlite 
        make
        make install

    subversion除了通过指定

        --with-sqlite=PREFIX    Use installed SQLite library or amalgamation file.

    以外，还可以直接将混合源码下载后放到指定编译目录即可，如下说明所示：

        configure: checking sqlite library
        checking sqlite amalgamation... no
        checking sqlite amalgamation... no
        checking sqlite3.h usability... no
        checking sqlite3.h presence... no
        checking for sqlite3.h... no
        checking sqlite library version (via pkg-config)... no

        An appropriate version of sqlite could not be found.  We recommmend
        3.7.15.1, but require at least 3.7.12.
        Please either install a newer sqlite on this system

        or

        get the sqlite 3.7.15.1 amalgamation from:
            http://www.sqlite.org/sqlite-amalgamation-3071501.zip
            unpack the archive using unzip and rename the resulting
            directory to:
            /home/xiaoju/hudamin/softwares/subversion-1.8.13/sqlite-amalgamation






### 2. 正式安装

下载页面： http://subversion.apache.org/download/

1. http://mirror.bit.edu.cn/apache/subversion/subversion-1.8.13.tar.bz2
2. 安装：

        tar xvjf subversion-1.8.13.tar.bz2
        cd subversion-1.8.13
        ./configure \
            --with-apr=/home/xiaoju/fe/apr \
            --with-apr-util=/home/xiaoju/fe/apr-util \
            --with-sqlite=/home/xiaoju/fe/sqlite \
            --with-apxs=/home/xiaoju/fe/apache/bin/apxs \
            --enable-mod-activation \
            --prefix=/home/xiaoju/fe/svn
        make
        make install



    其中`--with-apxs`选项，使编译输出`mod_dav_svn.so`等到apache模块目录下。
    `--enable-mod-activation`选项，在apache的conf文件中添加`LoadModule`配置。


## 二、Apache配置


### 1. DAV配置

通过subversion的安装选项，以下配置已经存在于httpd.conf中：

    LoadModule dav_svn_module     /home/xiaoju/fe/svn/libexec/mod_dav_svn.so
    LoadModule authz_svn_module   /home/xiaoju/fe/svn/libexec/mod_authz_svn.so


### 2. Location配置

在Location中配置DAV，注意`SVNPath`只能配置一个版本库，且末尾不能带目录符号。
`SVNParentPath`是配置版本库父路径，在它下面可以配置多个版本库，末尾带目录符号。

    <Location "/svn_repos/">

    DAV svn
    # SVNPath /home/xiaoju/fe/svn_repos
    SVNParentPath /home/xiaoju/fe/svn_repos/

    </Location>


### 3. 权限配置

以上配置好的svn服务器是没有权限限制的，任何人都可访问。

todo

