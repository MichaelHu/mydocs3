# yum

> Yellow dog Updater, Modified - 黄狗包管理器

## 简介

`yum`（全称为 Yellow dog Updater, Modified）是一个在`Fedora`、`RedHat`、`SUSE`以及`CentOS`中的Shell前端软件包管理器。

基於`RPM`包管理，能够从指定的服务器自动下载RPM包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软体包，无须繁琐地一次次下载、安装。

`yum`提供了`查找、安装、删除`某一个、一组甚至全部软件包的命令，而且命令简洁而又好记。


## yum help 

`Usage`: 

    yum help
    yum help list
    yum help info
    yum help update
    yum help upgrade


`Examples`:

    $ yum help update
    Loaded plugins: security
    update [PACKAGE...]

    Update a package or packages on your system

    alias: update-to

    $ yum help upgrade
    Loaded plugins: security
    upgrade PACKAGE...

    Update packages taking obsoletes into account

    alias: upgrade-to



## yum list 

    Usage: yum list [PACKAGE|all|installed|updates|extras|obsoletes|recent]

    # 显示所有已经安装和可以安装的程序包
    $ yum list

    # 显示包package的安装情况
    $ yum list package

    # 显示gcc的包信息
    $ yum list gcc
    Loaded plugins: security
    Installed Packages
    gcc.x86_64    4.4.7-4.el6     @anaconda-CentOS-201311291202.x86_64/6.5
    Available Packages
    gcc.x86_64    4.4.7-17.el6    base

> 可以配合grep进行模糊查找

    $ yum list | grep rzsz
    lrzsz.x86_64    0.12.20-27.1.el6    base



## yum info

    $ yum info lrzsz
    Loaded plugins: security
    Installed Packages
    Name        : lrzsz
    Arch        : x86_64
    Version     : 0.12.20
    Release     : 27.1.el6
    Size        : 159 k
    Repo        : installed
    From repo   : base
    Summary     : The lrz and lsz modem communications programs
    URL         : http://www.ohse.de/uwe/software/lrzsz.html
    License     : GPLv2+
    Description : Lrzsz (consisting of lrz and lsz) is a cosmetically modified
                : zmodem/ymodem/xmodem package built from the public-domain version of
                : the rzsz package. Lrzsz was created to provide a working GNU
                : copylefted Zmodem solution for Linux systems.


## yum deplist
> list dependencies

    $ yum deplist lrzsz
    Loaded plugins: security
    Finding dependencies:
    package: lrzsz.x86_64 0.12.20-27.1.el6
      dependency: libnsl.so.1()(64bit)
       provider: glibc.x86_64 2.12-1.192.el6
      dependency: libc.so.6(GLIBC_2.7)(64bit)
       provider: glibc.x86_64 2.12-1.192.el6
      dependency: rtld(GNU_HASH)
       provider: glibc.i686 2.12-1.192.el6
       provider: glibc.x86_64 2.12-1.192.el6


    
## yum install

> 需要`root权限`才能操作，即使指定`--installroot`也需要root权限

    $ yum list lrzsz
    $ yum install lrzsz
    $ yum install -y lrzsz
    $ yum install --installroot=path -y lrzsz




## yum erase

> 需要`root权限`

    $ yum erase lrzsz







