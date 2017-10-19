# anaconda

## Features

* 包管理工具：Python Packages Management
* 快速安装`1000+`个数据分析包
* `anaconda`之于`python`正像`npm`之于`nodejs`，或者更精确的，`nvm`之于`npm`和`nodejs`


## Resources

* site: <https://www.anaconda.com/>
* downloads: <https://www.anaconda.com/download>
* Getting started: <https://docs.anaconda.com/anaconda/user-guide/getting-started>
* 致Python初学者们 - Anaconda入门使用指南 <http://www.jianshu.com/p/169403f7e40c>

## Installation

1. 下载适合平台的安装包，图形界面安装以及命令行安装，命令行安装少下载几十M的内容，但还是有500+M（好大的shell脚本，😱）
2. 安装，图形界面的不用多少，命令行的就是执行500+M的shell脚本：

        $ sh ~/Downloads/Anaconda2-5.0.0-MacOSX-x86_64.sh


## Usage

    $ conda install <package-name>
    $ conda install <package-list>
    $ conda install <package-name=version>
    $ conda remove <package-name>
    $ conda update <package-name>
    $ conda list
    $ conda search <search-term>


## 运行环境

默认运行环境是`root`，如果系统是Python 3，默认环境就是Python 3环境。如果需要新开一个Python 2环境，并且安装pandas，则可以新创建一个环境，使用以下命令：

    $ conda env create -n py2 python=2.7 pandas
    # 进入新环境
    $ conda env activate py2
    # 退出当前环境
    $ conda env deactivate

    # 其他
    $ conda env remove -n <env-name>
    $ conda env list
    $ conda env export > environment.yaml
    $ conda env create -f environment.yaml

