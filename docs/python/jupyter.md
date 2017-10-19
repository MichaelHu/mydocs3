# jupyter

## Features

* 有助于帮助使用者构建很多可读的分析，你可以在里面同时保留代码，图片，评论，公式和绘制的图像
* `.ipynb`文件，支持在web页面中进行写作式编程，通过安装新的kernel，可以支持除Python之外的其他语言
* 编辑器功能，支持`sublime模式、vim模式、emacs模式`
* 适合Python初学者进行学习、简单实践的工具
* 适合进行简单数据处理并输出报告

## Resources

* site: <http://jupyter.readthedocs.io>
* github docs: <https://github.com/jupyter/jupyter>
* 左手程序员，右手作家：你必须会的Jupyter Notebook <http://python.jobbole.com/87527>
* 文学编程／写作式编程 - Literate Programming <http://www.literateprogramming.com>
* [译]27 个Jupyter Notebook的小提示与技巧 <http://liuchengxu.org/pelican-blog/jupyter-notebook-tips.html>
* 输出成slides：<http://www.slideviper.oquanta.info/tutorial/slideshow_tutorial_slides.html>


## Installation

安装`Anaconda`，参考<ref://./anaconda.md.html>，自动安装`jupyter`

	$ jupyter --version  


## Build Docs

github上下载jupyter文档仓库，进行`构建`后，启动服务器在浏览器中查看。

	$ git clone https://github.com/jupyter/jupyter.git
	$ cd jupyter/docs
    $ conda env create -f environment.yml
    $ . activate jupyter_docs
    $ make clean
    $ make html
    $ python3 -m http.server

## Usage

	$ cd <DIR>
	$ jupyter -h
	$ jupyter notebook  


## Kernels

* Jupyter kernels: <https://github.com/jupyter/jupyter/wiki/Jupyter-kernels>
* IJavascript kernel: <https://github.com/n-riesco/ijavascript>

		ruby -e "$(curl -fsSL <https://raw.githubusercontent.com/Homebrew/install/master/install)">
		brew install pkg-config node zeromq
		sudo easy_install pip
		sudo pip install --upgrade pyzmq jupyter
		sudo npm install -g ijavascript 

todo: 安装更多的kernel
