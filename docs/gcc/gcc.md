# gcc


* 官网：<http://gcc.gnu.org>
* gcc下载镜像：<https://gcc.gnu.org/mirrors.html>


## gcc 4.5+ 源码安装( failed )

> 最终`没有`安装`成功`，文档记录失败的安装过程。

在阿里ecs云主机上安装gcc高版本（目的是支持`c11`），本来是想安装`4.9+`，但后来从`4.5`一直尝试到了`5.4`都没有安装成功。以下是一小部分参考文章，虽然都无法复制他们的成功，但也列一下。

* Centos 源码编译安装gcc 4.7.0: <http://www.stamhe.com/?p=991>
* CentOS 5上编译安装 GCC: <http://kodango.com/compile-gcc-on-centos-5>


### 安装包说明

> 使用源码安装


`主文件`：<http://gcc.parentingamerica.com/releases/gcc-4.9.4/gcc-4.9.4.tar.bz2>

其他版本可以在这里选择：<http://gcc.parentingamerica.com/releases/>

`安装依赖`：

> Building GCC requires GMP 4.2+, MPFR 2.4.0+ and MPC 0.8.0+

* gmp-4.3.2 ( 2010-02-01 ): <http://gcc.parentingamerica.com/infrastructure/gmp-4.3.2.tar.bz2>
* gmp-6.1.0 ( 2015-11-01 ): <http://gcc.parentingamerica.com/infrastructure/gmp-6.1.0.tar.bz2>

* mpfr-2.4.2 ( 2009-11-30 ): <http://gcc.parentingamerica.com/infrastructure/mpfr-2.4.2.tar.bz2>
* mpfr-3.1.4 ( 2016-03-06 ): <http://gcc.parentingamerica.com/infrastructure/mpfr-3.1.4.tar.bz2>

* mpc-0.8.1 ( 2009-12-18 ): <http://gcc.parentingamerica.com/infrastructure/mpc-0.8.1.tar.gz>
* mpc-1.0.3 ( 2016-04-28 ): <http://gcc.parentingamerica.com/infrastructure/mpc-1.0.3.tar.gz>

* ppl: <http://gcc.parentingamerica.com/infrastructure/ppl-0.11.tar.gz>
* cloog: <http://gcc.parentingamerica.com/infrastructure/cloog-0.18.1.tar.gz>

依赖下载，可以使用 `./contrib/download_prerequisites` 脚本自动下载，也可打开自行下载。


### 安装步骤

#### 系统说明

    $ lsb_release -a
    LSB Version:    :base-4.0-amd64:base-4.0-noarch:core-4.0-amd64:core-4.0-noarch
    Distributor ID: CentOS
    Description:    CentOS release 6.5 (Final)
        Release:    6.5
        Codename:   Final

云主机当前有g++编译器，版本号是`4.4.7`。


#### 下载

下载`gcc-4.9.4`, `gmp-4.3.2`, `mpfr-2.4.2`, `mpc-0.8.1`，够用原则，不要一下子升级太高。

    cd ~/downloads
    mkdir gcc
    cd gcc
    curl -O http://gcc.parentingamerica.com/infrastructure/gmp-4.3.2.tar.bz2
    curl -O http://gcc.parentingamerica.com/infrastructure/mpfr-2.4.2.tar.bz2
    curl -O http://gcc.parentingamerica.com/infrastructure/mpc-0.8.1.tar.gz
    curl -O http://gcc.parentingamerica.com/infrastructure/ppl-0.11.tar.gz


#### 解压文件
    
    for i in `ls *.bz2 *.gz`; do tar axvf $i; done




#### 安装gmp-4.3.2

    mkdir -p ~/softwares/gcc/deps/gmp-4.3.2 \
    && cd gmp-4.3.2 \
    && ./configure --prefix=/home/irice/softwares/gcc/deps/gmp-4.3.2 \
        --enable-cxx \
    && make \
    && make install


#### 安装ppl-1.1

> 未安装成功

    mkdir -p ~/softwares/gcc/deps/ppl-1.1 \
    && cd ppl-1.1 \
    && ./configure --prefix=/home/irice/softwares/gcc/deps/ppl-1.1 \
        --with-gmp-include=/home/irice/softwares/gcc/deps/gmp-4.3.2/include \
        --with-gmp-lib=/home/irice/softwares/gcc/deps/gmp-4.3.2/lib \
    && make \
    && make install


#### 安装isl-0.12.2

> 未安装成功

    mkdir -p ~/softwares/gcc/deps/isl-0.12.2 \
    && cd isl-0.12.2 \
    && ./configure --prefix=/home/irice/softwares/gcc/deps/isl-0.12.2 \
        --with-gmp-prefix=/home/irice/softwares/gcc/deps/gmp-4.3.2 \
    && make \
    && make install


#### 安装mpfr-2.4.2

    mkdir -p ~/softwares/gcc/deps/mpfr-2.4.2 \
    && cd mpfr-2.4.2 \
    && ./configure --prefix=/home/irice/softwares/gcc/deps/mpfr-2.4.2 \
        --with-gmp=/home/irice/softwares/gcc/deps/gmp-4.3.2 \
    && make \
    && make install


#### 安装mpc-0.8.1

    mkdir -p ~/softwares/gcc/deps/mpc-0.8.1 \
    && cd mpc-0.8.1 \
    && ./configure --prefix=/home/irice/softwares/gcc/deps/mpc-0.8.1 \
        --with-gmp=/home/irice/softwares/gcc/deps/gmp-4.3.2 \
        --with-mpfr=/home/irice/softwares/gcc/deps/mpfr-2.4.2 \
    && make \
    && make install


#### 安装gcc-4.9.4

> 未安装成功，尝试过4.5.4, 4.6.4, 4.7.4, 4.8.2, 4.8.4, 4.9.2, 4.9.5，5.4.0，无一成功。感叹也哉，难怪都说gcc不好安装。

    mkdir -p ~/softwares/gcc/gcc-5.4.0 \
    && cd gcc-5.4.0 \
    && ./configure --prefix=/home/irice/softwares/gcc/gcc-5.4.0 \
        --with-gmp=/home/irice/softwares/gcc/deps/gmp-4.3.2 \
        --with-mpfr=/home/irice/softwares/gcc/deps/mpfr-2.4.2 \
        --with-mpc=/home/irice/softwares/gcc/deps/mpc-0.8.1 \
        --enable-languages=c,c++ \
        --disable-multilib \
    && make \
    && make install

因为系统默认`未提供`32位库，所以选择只`输出64位`程序，使用`--disable-multilib`


#### 各类configure error

ppl

    1. 
    gmp找不到问题最棘手

    2. 
    conftest.cpp:12: error: 'choke' does not name a type
    configure:5411: $? = 1
    configure: failed program was:
    | /* confdefs.h */
    | #define PACKAGE_NAME "the Parma Polyhedra Library"

    3. 
    conftest.cpp:10:28: error: ac_nonexistent.h: No such file or directory
    configure:5741: $? = 1
    configure: failed program was:
    | /* confdefs.h */
    | #define PACKAGE_NAME "the Parma Polyhedra Library"

    ...


gcc

    g++: unrecognized option '-static-libstdc++'
    conftest.cpp:11:2: error: #error -static-libstdc++ not implemented
    configure:4990: $? = 1
    configure: failed program was:
    | /* confdefs.h */
    | #define PACKAGE_NAME ""
    | #define PACKAGE_TARNAME ""
    | #define PACKAGE_VERSION ""
    | #define PACKAGE_STRING ""
    | #define PACKAGE_BUGREPORT ""
    | #define PACKAGE_URL ""
    | /* end confdefs.h.  */
    |
    | #if (__GNUC__ < 4) || (__GNUC__ == 4 && __GNUC_MINOR__ < 5)
        | #error -static-libstdc++ not implemented
        | #endif
        | int main() {}






## yum安装

这是成功的安装，默认的`yum repo`无`4.8`的安装包，需要自行添加repo。步骤如下：


    su root
    cd /etc/yum.repos.d
    curl -O https://people.centos.org/tru/devtools-2/devtools-2.repo
    yum search devtoolset-2-gcc

    Loaded plugins: security
    ========================================================= N/S Matched: devtoolset-2-gcc =========================================================
    devtoolset-2-gcc.x86_64 : GCC version 4.8
    devtoolset-2-gcc-c++.x86_64 : C++ support for GCC version 4.8
    devtoolset-2-gcc-gfortran.x86_64 : Fortran support for GCC 4.8
    devtoolset-2-gcc-plugin-devel.x86_64 : Support for compiling GCC plugins

    yum install devtoolset-2-gcc-c++ 


