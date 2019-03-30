# yum

> `Yellow dog Updater, Modified` - 黄狗包管理器

## Features

* `yum`是一个在`Fedora`、`RedHat`、`SUSE`以及`CentOS`中的Shell前端软件包管理器。
* 基於`RPM`包管理，能够从指定的服务器自动下载RPM包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软体包，无须繁琐地一次次下载、安装。
* `yum`提供了`查找、安装、删除`某一个、一组甚至全部软件包的命令，而且命令简洁而又好记。


## Tips

* `yum list`与`yum search`，前者搜索包名级别的信息，后者能搜索包内部细节信息。
* `.repo`文件包含了yum包的源配置信息，该文件可以通过两种方式来更新
    1. `国内源镜像`，只需将国内源对应的`.repo`配置文件内容替换`/etc/yum.repo.d/CentOS-Base.repo`
    2. `特殊源`，比如`devtoolset`，可以通过下载安装该源对应的`.rpm`安装包，并在本地安装，安装成功后，会在`/etc/yum.repo.d/`目录下添加新的`.repo`文件，这样就可以使用yum安装了。具体可参考`「  Examples -  gcc升级 」`: <ref://#anchor_79acb>
* 国内源镜像：
    * linux上yum镜像源切换 <https://blog.csdn.net/wdy_2099/article/details/70578529>
    * 阿里云 <https://opsx.alibaba.com/mirror>
    * 中科大 <http://centos.ustc.edu.cn/help/>


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


## yum repolist

查看可用repo列表


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



## yum search

    Usage: yum search <STRING>
    Search package details for the given string

    # 查找package所包含的内容细节
    $ yum search devtoolset-3 | grep gcc



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



## Examples

### gcc升级

* 在`CentOS 7`上通过yum来升级gcc从`4.8.5`到`4.9.2`
* 使用各种源镜像，更改`/etc/yum.repo.d/CentOS-Base.repo`，并不包含`devtoolset`软件包
* devtoolset软件包需要使用单独的源镜像，该源镜像需要通过rpm安装包安装

具体操作如下：

    $ cat /etc/redhat-release
    CentOS Linux release 7.3.1611 (Core)
    $ wget https://www.softwarecollections.org/repos/rhscl/devtoolset-3/epel-7-x86_64/noarch/rhscl-devtoolset-3-epel-7-x86_64-1-2.noarch.rpm
    $ sudo rpm -ivh rhscl-devtoolset-3-epel-7-x86_64-1-2.noarch.rpm
    $ yum search devtoolset-3
    $ yum install devtoolset-3-gcc
    $ yum install devtoolset-3-gcc-c++
    $ yum install devtoolset-3-toolchain

* 通过devtooset安装的gcc，存放在`/opt/rh/devtooset-*/下`，比如

        /opt/rh/devtoolset-3/root/usr/bin/gcc
        /opt/rh/devtoolset-3/root/usr/bin/cpp
        /opt/rh/devtoolset-3/root/usr/bin/c++






