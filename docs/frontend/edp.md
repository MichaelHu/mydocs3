# EDP Memo


文档： http://ecomfe.github.io/edp/doc/initialization/install/


## 1 使用


安装

    $ npm install -g edp

一次性安装更多的命令

    $ npm i -g edp edp-build edp-webserver edp-bcs

查看已经安装的package

    $ edp -v

查看命令帮助

    $ edp webserver --help


WebServer功能

    $ edp webserver start

查看当前支持的命令列表

    $ edp

项目构建

    $ edp build

指定输出目录

    $ edp build --output ../myproject-dist

输出目录覆盖，执行前会清空输出目录下所有文件

    $ edp build -f

指定build配置文件

    $ edp build --config my-build-conf.js



