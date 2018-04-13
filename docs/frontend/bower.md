# bower

> A `package manager` for the web.

Web sites are made of lots of things -- frameworks, libraries, assets, and utilities. Bower manage all these things for you.


## Resources

* site: <https://bower.io>


## Tips

* github的package都可通过`bower register`先发布到`http://registry.bower.io`
* 发布成功以后，遵守`semver`规范的`tag`都将作为bower的安装package
* `bower install`的package下会有一个`隐藏`的`.bower.json`文件，该文件记录当前包的详细信息，内容与bower.json不一样



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


### Maintaining Dependencies

    $ bower install <package> --save
    $ bower install <package> --save-dev

### register / unregister

> `发布`bower package，发布成功以后，他人就可以通过`bower install`安装了

    # register
    $ bower register <my-package-name> <git-endpoint>
    $ bower register dom-text-search https://github.com/MichaelHu/dom-text-search.git
    bower dom-text-search#*        resolve https://github.com/MichaelHu/dom-text-search.git#*
    bower dom-text-search#*       download https://github.com/MichaelHu/dom-text-search/archive/0.9.0.tar.gz
    bower dom-text-search#*        extract archive.tar.gz
    bower dom-text-search#*       resolved https://github.com/MichaelHu/dom-text-search.git#0.9.0
    ? Registering a package will make it installable via the registry (https://registry.bower.io), continue? Yes
    bower dom-text-search         register https://github.com/MichaelHu/dom-text-search.git

    Package dom-text-search registered successfully!
    All valid semver tags on https://github.com/MichaelHu/dom-text-search.git will be available as versions.
    To publish a new version, just release a valid semver tag.

    Run bower info dom-text-search to list the available versions.



    # unregister
    $ bower login       # login with GitHub id
    $ bower unregister <package>


### other


    bower update

    bower search

    bower init

    bower info irice-snippets





## 配置文件

配置文件：`bower.json`

其中的`version`字段注意要设置好，并且按version打`tag`，并发布到`github`。



## 更新

命令行使用时，可能会有如下提示

    Update available: 1.7.9 (current: 1.6.5) 
    Run npm install -g bower to update.  

所以，更新bower新版本只需要：

    sudo npm install -g bower


