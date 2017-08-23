# bower

> A package manager for the web.

Web sites are made of lots of things -- frameworks, libraries, assets, and utilities. Bower manage all these things for you.


## 常用命令

### bower install

    # installs the project dependencies listed in bower.json
    $ bower install

    # registered package
    $ bower install jquery

    # GitHub shorthand
    $ bower install desandro/masonry

    # Git endpoint
    $ bower install git://github.com/user/package.git

    # URL
    $ bower install http://example.com/script.js

可以从配置文件中安装`依赖包`，可以直接安装`注册包`，可以安装`git简写方式`，可以安装`git包`，还可以直接安装一个`URL`。


    bower update

    bower search

    bower init

    bower info irice-snippets

    bower register 

    bower register irice-snippets https://github.com/MichaelHu/snippets.git





## 配置文件

配置文件：`bower.json`

其中的`version`字段注意要设置好，并且按version打`tag`，并发布到`github`。



## 更新

命令行使用时，可能会有如下提示

    Update available: 1.7.9 (current: 1.6.5) 
    Run npm install -g bower to update.  

所以，更新bower新版本只需要：

    sudo npm install -g bower


