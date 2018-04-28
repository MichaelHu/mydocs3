# boost

> 背景：在安装`osrm-backend` <https://github.com/Project-OSRM/osrm-backend> 的时候，需要使用`boost`库

## Resources

* Installation on Linux or MacOS: <https://www.boost.org/doc/libs/1_67_0/more/getting_started/unix-variants.html>


## Features

* 大多数为`仅头依赖`方式
* 全部源码构建，耗时会很长，mac下可以直接`brew install boost`
* Most Boost libraries are `header-only`: they consist entirely of header files containing templates and inline functions, and require no separately-compiled library binaries or special treatment when linking.
* The only Boost libraries that must be built separately are:

        Boost.Chrono
        Boost.Context
        Boost.Filesystem
        Boost.GraphParallel
        Boost.IOStreams
        Boost.Locale
        Boost.Log (see build documentation)
        Boost.MPI
        Boost.ProgramOptions
        Boost.Python (see the Boost.Python build documentation before building and installing it)
        Boost.Regex
        Boost.Serialization
        Boost.Signals
        Boost.System
        Boost.Thread
        Boost.Timer
        Boost.Wave



## Installation

    $ cd path/to/hoost_1_67_0
    $ ./bootstrap.sh --help
    $ ./bootstrap.sh --prefix=path/to/installation/prefix
    $ ./b2 install

    curl -O path/to/.../boost_1_67_0.tar.bz2
    tar xjf boost_1_67_0.tar.bz2
    cd boost_1_67_0
    mkdir -p ~/softwares/boost
    ./bootstrap.sh --help
    ./bootstrap.sh --prefix=/Users/hudamin/softwares/boost
    


