# virtualenv

* virtualenv & virtualenvwrapper
    * 虚拟环境
    * 虚拟环境管理
* python三大神器之virtualenv <https://www.cnblogs.com/freely/p/8022923.html>
* virtualenv安装 <https://virtualenv.pypa.io/en/latest/installation.html#via-pip>
* virtualenvwrapper安装 <https://virtualenvwrapper.readthedocs.io/en/latest/install.html>


## 安装

    $ pip3 install --user virtualenv
    $ pip3 install --user virtualenvwrapper


## 环境初始化

1. 创建虚拟环境目录 
2. `.bash_profile`文件中，添加以下内容，并执行shll文件：

        export WORKON_HOME=~/.virtualenvs
        export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3
        export VIRTUALENVWRAPPER_VIRTUALENV=~/Library/Python/3.8/bin/virtualenv
        source ~/Library/Python/3.8/bin/virtualenvwrapper.sh


## 使用


    $ virtualenvwrapper --help
    $ mkvirtualenv --help
    $ lsvirtualenv --help

    $ mkvirtualenv worktime-env
    $ workon worktime-env
    $ deactivate


