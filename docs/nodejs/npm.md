# npm

> @[style="color:green;font-size:18px"]Node Packaged Modules. 


## Resources

* site: <http://www.npmjs.org>
* docs: <https://docs.npmjs.com>


## 资讯

* 180412 2018 年了，你还是只会 npm install 吗？<https://mp.weixin.qq.com/s/e-_3DN5CzVFDmNZ1W4F9VA>
* 170602 npm 5.0增强了常规性能，据说5倍之快 <https://www.infoq.com/news/2017/05/npm-5-released>
        强化了缓存的作用，提升性能
        --no-save开关，默认会进行save
        可以通过 npm install npm@latest -g 升级到最新版



## 安装方式

### 通过nodejs pkg安装

通过安装新版本的`nodejs`，自动包含`npm`的安装（查看nodejs的安装<ref://./node-install.md.html>）。

自动检测`nodejs`的最新版本（mac适用）：

    curl https://nodejs.org | grep -Eo "Current Version: *v[^<]+"



### 手动升级npm

通过nodejs安装的npm通常版本都`比较低`，有时需要`手动升级`npm版本：

    $ npm -v
    2.15.5
    $ sudo npm update -g npm
    /usr/local/bin/npm -> /usr/local/lib/node_modules/npm/bin/npm-cli.js
    npm@3.9.5 /usr/local/lib/node_modules/npm
    $ nodejs $ npm -v
    3.9.5



### npm包安装问题

#### EACCESS

mac下进行`-g`安装，出现`EACCES`错误，原因是对`/usr/local/lib/node_modules`没有权限导致。
解决办法如下：

    $ cd /usr/local/lib
    $ ls -l
    drwxr-xr-x  32 24561  wheel  1088  8  6 13:08 node_modules
    $ sudo chown -R hudamin /usr/local/lib/node_modules
    $ ls -l
    drwxr-xr-x  32 hudamin  wheel  1088  8  6 13:08 node_modules



#### 自动安装依赖

> Note: npm deprecated `auto-installing` of peerDependencies `since npm@3`, so required peer dependencies like babel-core and webpack must be listed explicitly in your `package.json`.


#### ENOSELF

> npm ERR! Refusing to install react as a dependency of itself

不能install和当前package的name同名的package。

复现方式：

    vim package.json

        ...
        , name: 'react'
        ...

    npm install react react-dom




## nvm

> Node `Version` Manager - Simple `bash script` to manage multiple active node.js versions

* `github`: <https://github.com/creationix/nvm> <iframe src="http://258i.com/gbtn.html?user=creationix&repo=nvm&type=star&count=true" frameborder="0" scrolling="0" width="100px" height="20px"></iframe>   

### versions

    0.33.8
    ...
    0.33.2
    0.33.1
    ...


### install or update

> 可`安装`或`更新`

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
or
    wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

### 使用方式

    nvm install node
    nvm use node
    nvm run node --version
    nvm exec 4.2 node --version
    nvm which 5.0
    nvm use system
    nvm ls
    nvm ls <version>
    nvm ls-remote 
    nvm ls-remote <version>
    nvm alias default <version>           # Set default node version on a shell
    nvm alias default node                # Always default to the latest available 
                                          # node version on a shell
    nvm uninstall <version>
    nvm deactivate

列出`可用命令`，使用`两个tab`:

    $ nvm [tab][tab]
    alias             deactivate        install           ls                  run               unload
    clear-cache       exec              list              ls-remote           unalias           use
    current           help              list-remote       reinstall-packages  uninstall         version

    $ nvm alias [tab][tab]
    default

    $ nvm alias my_alias [tab][tab]
    v0.6.21     v0.8.26     v0.10.28

    $ nvm use [tab][tab]
    my_alias    default     v0.6.21     v0.8.26     v0.10.28


### .nvmrc

项目根路径创建`.nvmrc`文件，内容为使用的node版本号。

    echo "5.9" > .nvmrc

在项目路径下：

    $ nvm use
    Found '/path/to/project/.nvmrc' with version <5.9>
    Now using node v5.9.1 (npm v3.7.3)


### node包手动安装

`nvm`使用`~/.nvm/versions/node/`存放各个版本的node，可将node包释放到该目录下即可。

    $ ls ~/.nvm/versions/node/
    v6.10.1	v7.7.4




## 淘宝npm镜像

<http://npm.taobao.org>

使用淘宝定制的`cnpm`命令代替默认的`npm`。

    $ npm install -g cnpm --registry=https://registry.npm.taobao.org

cnpm支持除`publish`之外的所有命令。

`cnpm`实际上是一个`特殊`配置的`npm`，它还可以通过设置`alias`方式安装：

    alias cnpm="npm --registry=https://registry.npm.taobao.org \
                --cache=$HOME/.npm/.cache/cnpm \
                --disturl=https://npm.taobao.org/dist \
                --userconfig=$HOME/.cnpmrc"

`关键`在于: `--registry`选项的扩展。



## nrm

> Node Registry Manager - `nrm`，Node镜像源管理工具。

    $ npm i -g nrm

    $ nrm --help

    $ nrm ls
    * npm ---- https://registry.npmjs.org/
      cnpm --- http://r.cnpmjs.org/
      taobao - https://registry.npm.taobao.org/
      nj ----- https://registry.nodejitsu.com/
      rednpm - http://registry.mirror.cqupt.edu.cn/
      npmMirror  https://skimdb.npmjs.com/registry/
      edunpm - http://registry.enpmjs.org/

    $ nrm use <registry>





## 包注册与发布

### 包托管地址

* 官方地址：http://registry.npmjs.org/
* 镜像地址：http://skimdb.npmjs.com/registry

服务器使用`CouchDB`数据库，couchapp的代码托管在github上：<http://github.com/npm/npm-registry-couchapp>。
服务器提供好用的`RESTful API`，举例如下：

    $ curl http://registry.npmjs.org
    {"db_name":"registry","doc_count":113003,"doc_del_count":380,"update_seq":450451,"purge_seq":0,"compact_running":false,"disk_size":1045799035,"data_size":407768840,"instance_start_time":"1414070581227712","disk_format_version":6,"committed_update_seq":450451}







### registry决定

* 首先由`scope`来定，scope与registry可以通过以下方式绑定：

        npm config set @scope:registry ...

* 如果没有scope，则使用默认registry。默认registry通过以下方式绑定：

        npm config set registry ...





### 创建私有库

todo





### 包范围（scope）

`2014-09-13`以后，公共地址上的registry开始支持范围限定包。npm客户端自动兼容非范围包与范围包的处理。

命名方式同包名（package name）：`url安全的字符，不以逗号或下划线开头`。

使用的时候，如下格式拼接：

    @somescope/somepackagename

`包安装位置：`
1. 非scope包路径： `node_modules/packagename`
2. 那么，scope包路径为： `node_modules/@myorg/packagename`


`安装方式：`

    npm install @myorg/mypackage

或者在依赖安装中配置：

    "dependencies": {
        "@myorg/mypackage": "^1.3.0"
    }


`require方式：`

    require('@myorg/mypackage')


`scope与registry绑定：`

    npm login --registry=http://reg.example.com --scope=@myco

scope与registry是多对一的关系。绑定还可以使用npm config来进行：

    npm config set @myco:registry http://reg.example.com








### 包发布

    npm publish <tarball> [--tag <tag>]
    npm publish <folder> [--tag <tag>]

> Once a package is published with a given name and version, that specific 
> name and version combination can never be used again, even if it is removed with `npm-unpublish`.

一旦发布，不可再用。

包发布需要先注册`npm账号`，没有提供网页注册，需要`命令行注册`，使用`npm adduser`命令：

    hudamin@local beat-command-release $ npm adduser
    Username: MichaelHu
    npm WARN Username must be lowercase 
    Username: michaelhu
    Password: 
    Email: (this IS public) hdm0571@163.com
    hudamin@local beat-command-release $ git push origin master
    Everything up-to-date
    hudamin@local beat-command-release $ npm whoami
    michaelhu
    hudamin@local beat-command-release $ npm publish
    + beat-command-release@0.0.1


#### 一些问题

> 171014, `npm publish` 总出现`E403`错误，仔细查看有如下提示：

    you must verify your email before publishing a new package: https://www.npmjs.com/email-edit : ...

到提供的站点<https://www.npmjs.com/email-edit>，进行邮箱验证，验证通过后即可正常发布npm package。看来以前不需要验证，现在需要强制进行验证了。

> 180906, 提示未登录

    $ npm adduser

输入用户名、密码以及注册的Email，完成登录。可以使用：

    $ npm whami

查看当前登录账户。





## 使用npm进行开发

### .npmignore与.gitignore

1. 如果没有.npmignore，则使用.gitignore
2. 如果提供.npmignore，则.gitignore被忽略，即使.npmignore是一个空文件

### 默认忽略的文件：

* .*.swp
* ._*
* .DS_Store
* .git
* .hg
* .lock_wscript
* .svn
* .wafpickle-*
* CVS
* npm-debug.log

所有node_modules下的文件也被忽略，除了依赖文件。




### 总是包含的文件

以下文件总是被包含，即使加到ignore文件中，也无法剔除。

* package.json
* README.*






### 发布前验证工作



一定要确保通过安装且工作正常，再进行发布。

1. 测试`全局安装`：

        $ npm install . -g

    或者只用

        $ npm link

    创建全局可用的包的符号链接。然后用`npm ls -g`查看是否存在。

2. 测试`本地安装`：

        $ cd ../some-other-folder
        $ npm install ../my-package



## 开始发布

    npm publish ...





## 常用命令

### npm install, npm i

    npm install
    npm install -g
    npm install <name>
    npm install -g <name>
    npm install --global <name>
    npm install --save <name>
    npm install --production <name>
    npm install --verbose -g <name>
    npm install <folder>
    npm install <tarball file>
    npm install <tarball url>
    npm install [@<scope>/]<name> [--save|--save-dev|--save-optional]
    npm install [@<scope>/]<name>@<tag>
    npm install [@<scope>/]<name>@<version>
    npm install [@<scope>/]<name>@<version range>
    npm install <githubname>/<githubrepo>
    npm install <git remote url>


没有`-g`或`--global`，则总是安装在本地的`node_modules`下，`举例如下：`

将依赖安装在本地node_modules目录下：

    npm install
    npm install .

将当前目录下的包安装到全局：

    npm install -g
    npm install . -g

安装指定目录下的包至当前目录：

    npm install ../node-redis

安装压缩包：

    npm install ./package.tgz



#### 关于git remote url

    <protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish> | #semver:<semver>]

举例如下：

    npm install git+ssh://git@github.com:npm/npm.git#v1.0.27
    npm install git+ssh://git@github.com:npm/npm#semver:^5.0
    npm install git+https://isaacs@github.com/npm/npm.git
    npm install git://github.com/npm/npm.git#v1.0.27
    GIT_SSH_COMMAND='ssh -i ~/.ssh/custom_ident' npm install git+ssh://git@github.com:npm/npm.git

与`git clone`的区别，比如针对仓库 `git@192.168.1.184:fm/ouka-bricks.git`：

    git clone git@192.168.1.184:fm/ouka-bricks.git
    npm install git+ssh://git@192.168.1.184:fm/ouka-bricks.git
    npm install git+ssh://git@192.168.1.184:fm/ouka-bricks.git#master




### npm init

    npm init [-f|--force|-y|--yes]

在包的根目录生成基础`package.json`文件


### npm rm

    npm rm <name>
    npm r <name>
    npm uninstall <name>
    npm un <name>


### npm update

    npm update <name>

    # 更新npm本身
    npm update -g npm

### npm ls
    npm ls
    npm ls -g



### npm root

查看本地包和全局包的安装路径

    npm root
    npm root -g



### npm help

    npm help



### npm config

    npm config list
    npm config set <key> <value> [-g]
    npm config get <key>
    npm config delete <key>
    npm get <key>
    npm set <key> <value> [--global]

npm获取配置信息，来自`六个来源，优先级如下，由高到低`：

1. 命令行参数
    
        --foo bar

    将配置项foo设置为bar

        --flag

    将配置项flag设置为true

2. 环境变量

    任何以`npm_config_`为前缀的环境变量，都会被解析成对应配置值。大小写不敏感，
    也可以是`NPM_CONFIG_`为前缀

3. `npmrc`文件，四个相关文件： 
    * 项目级别配置文件（`/path/to/my/project/.npmrc`）
    * 用户级别配置文件（`~/.npmrc`）
    * 全局配置文件（`$PREFIX/npmrc`）
    * npm内建配置文件（`/path/to/npm/npmrc`）

4. 默认配置

5. 以下简写形式会被自动扩展：

        * -v: --version
        * -h, -?, --help, -H: --usage
        * -s, --silent: --loglevel silent
        * -q, --quiet: --loglevel warn
        * -d: --loglevel info
        * -dd, --verbose: --loglevel verbose
        * -ddd: --loglevel silly
        * -g: --global
        * -C: --prefix
        * -l: --long
        * -m: --message
        * -p, --porcelain: --parseable
        * -reg: --registry
        * -v: --version
        * -f: --force
        * -desc: --description
        * -S: --save
        * -D: --save-dev
        * -O: --save-optional
        * -B: --save-bundle
        * -E: --save-exact
        * -y: --yes
        * -n: --yes false
        * ll and la commands: ls --long

    例如：

        $ npm install -ddd
        # same as:
        $ npm install --loglevel silly

    再如，多个单子符简写形式合并，只要不出现歧义，都会被扩展成响应选项：

        $ npm ls -gpld
        # same as:
        $ npm ls --global --parseable --long --loglevel info

6. 包级别配置项

    比如，`package.json`如下：

        ｛
            "name": "foo"
            , "config": { "port": "8080" }
            , "scripts": { "start": "node server.js" }
        }

    `server.js`如下：

        http.createServer(...).listen(
            process.env.npm_package_config_port
        );

    ，这时，如果运行时需要覆盖port的值，可以如下操作：

        npm config set foo:port 80



### npm link

    npm link (in package folder)
    npm link [@<scope>/]<pkgname>
    npm ln (with any of the previous argument usage)

> 方便`开发调试`，可将另一个包链接到本包的`node_modules`下，另一个包的任意改动，可以直接反映出来。

注意pkgname不是目录名，而是包名，其在`package.json`中定义。


#### Tips

* 当某个package目录下执行`npm link`命令是一个`全局操作`命令，需要有`全局操作权限`
* 通常在发布前，本地进行测试时使用npm link命令进行全局链接，等同于`npm install -g .`命令
* 解除link，需要用`npm unlink` 或 `npm uninstall`命令


#### 包链接

进行`包链接`，包含两个步骤：
1. 当前目录下运行`npm link`，创建`全局安装`的符号链接，从全局`node_modules/package-name`指到当前目录，如下所示：

        hudamin@local turbo-markdown $ sudo npm link
        /Users/hudamin/.nvm/versions/node/v7.7.4/bin/tm -> /Users/hudamin/.nvm/versions/node/v7.7.4/lib/node_modules/turbo-markdown/bin/tm
        /Users/hudamin/.nvm/versions/node/v7.7.4/lib/node_modules/turbo-markdown -> /Users/hudamin/projects/git/turbo-markdown

    同时会链接`bin`目录。

2. 再在另一个目录下，运行`npm link package-name`，在本地的`node_modules`中创建一个符号链接到第一步
    创建的全局符号链接。

举例如下：

    cd ~/projects/node-redis
    npm link
    cd ~/projects/node-bloggy
    npm link redis

也可以简写成：

    cd ~/projects/node-bloggy
    npm link ../node-redis


#### 解除包链接

> 执行`卸载命令`即可

    # un, unlink, uninstall, remove
    $ npm un <package-name>
    $ sudo npm un -g <package-name>


#### Examples

一个`实际例子`如下：

    $ cd hello-node
    $ npm link
    /usr/local/share/npm/lib/node_modules/hello-node -> /Users/hudamin/tmp/hello-node
    $ cd ../test-hello-node
    $ npm link hello-node
    /Users/hudamin/tmp/test-hello-node/node_modules/hello-node -> /usr/local/share/npm/lib/node_modules/hello-node -> /Users/hudamin/tmp/hello-node



## package.json


> 包描述文件，必须有。字段含义可以通过`npm help json`获取


必须是一个`纯JSON`，而不能是JS的object literal。

通过`npm init`命令，可以进行交互式生成。

### 字段说明

* name
* version
* description
* keywords
* homepage
* bugs
        { "url" : "http://github.com/owner/project/issues"
        , "email" : "project@hostname.com"
        }
* license
* author, contributors (数组) 
* files，受.npmignore影响
* main
* `bin`

    * `global install`的时候，npm会将bin配置的文件创建符号链接至`prefix/bin`目录下；
    * `local install`的时候，会将bin配置我的文件创建符号链接至`./node_modules/.bin/`目录下。

    比如，npm包的bin就是这么配置的：

        { "bin" : { "npm" : "./cli.js" } }

    若符号链接名就是包名本身，则可以直接提供字符串，而不是object：

        { "bin" : "./path/to/program" } 

    
    
* man
* directories
* directories.lib
* directories.bin
* directories.man
* directories.doc
* directories.example
* repository

        "repository" :
          { "type" : "git"
          , "url" : "http://github.com/npm/npm.git"
          }

        "repository" :
          { "type" : "svn"
          , "url" : "http://v8.googlecode.com/svn/trunk/"
          }

* scripts: 定义包生命周期中各个阶段调用执行的脚本命令

    * `prepublish`: Run BEFORE the package is published. 
        (Also run on local npm install without any arguments.)
    * `publish, postpublish`: Run AFTER the package is published.
    * `preinstall`: Run BEFORE the package is installed
    * `install, postinstall`: Run AFTER the package is installed.
    * `preuninstall, uninstall`: Run BEFORE the package is uninstalled.
    * `postuninstall`: Run AFTER the package is uninstalled.
    * `preupdate`: Run BEFORE the package is updated with the update command.
    * `update, postupdate`: Run AFTER the package is updated with the update command.
    * `pretest, test, posttest`: Run by the `npm test` command.
    * `prestop, stop, poststop`: Run by the `npm stop` command.
    * `prestart, start, poststart`: Run by the `npm start` command.
    * `prerestart, restart, postrestart`: Run by the `npm restart` command. 
        Note: `npm restart` will run the stop and start scripts if no restart script is provided.

    举例1：

        { 
            "name" : "foo"
            , "config" : { "port" : "8080" }
            , "scripts" : { "start" : "node server.js" } 
        }

    举例2:

        { 
            "scripts" :
            { 
                "install" : "scripts/install.js"
                , "postinstall" : "scripts/install.js"
                , "uninstall" : "scripts/uninstall.js"
            }
        } 

    举例3:

        { 
            "scripts" : { 
                "preinstall" : "./configure"
                , "install" : "make && make install"
                , "test" : "make test"
            }
        }


* config
* dependencies

        { "dependencies" :
          { "foo" : "1.0.0 - 2.9999.9999"
          , "bar" : ">=1.0.2 <2.1.2"
          , "baz" : ">1.0.2 <=2.3.4"
          , "boo" : "2.0.1"
          , "qux" : "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0"
          , "asd" : "http://asdf.com/asdf.tar.gz"
          , "til" : "~1.2"
          , "elf" : "~1.2.3"
          , "two" : "2.x"
          , "thr" : "3.3.x"
          , "lat" : "latest"
          , "dyl" : "~/projects/dyl"
          , "dy2" : "file:../dy2"
          }
        }

    一些版本范围说明，遵循`semver`规范 ( <ref://../arch/semver.md.html> ) ：
        
        version                 Must match version exactly
        >version                Must be greater than version
        >=version               etc
        <version
        <=version
        ~version                "Approximately equivalent to version" See semver
        ^version                "Compatible with version" See semver
        1.2.x                   1.2.0, 1.2.1, etc., but not 1.3.0
        http://...              See 'URLs as Dependencies' below
        *                       Matches any version
        ""                      (just an empty string) Same as *
        version1 - version2     Same as >=version1 <=version2.
        range1 || range2        Passes if either range1 or range2 are satisfied.
        git... See              'Git URLs as Dependencies' below
        user/repo               See 'GitHub URLs' below
        tag A                   specific version tagged and published as tag See npm-dist-tag
        path/path/path          See Local Paths below
    

* devDependencies

    通过在package的根目录下运行`npm link`或者`npm install`，会进行安装开发依赖。

        { "name": "ethopia-waza",
          "description": "a delightfully fruity coffee varietal",
          "version": "1.2.3",
          "devDependencies": {
            "coffee-script": "~1.6.3"
          },
          "scripts": {
            "prepublish": "coffee -o lib/ -c src/waza.coffee"
          },
          "main": "lib/waza.js"
        }

* peerDependencies

        {
          "name": "tea-latte",
          "version": "1.3.5"
          "peerDependencies": {
            "tea": "2.x"
          }
        }

* bundledDependencies
* bundleDependencies
* optionalDependencies
* engines

        { "engines" : { "node" : ">=0.10.3 <0.12" } }

* engineStrict 
* os
        
        "os" : [ "darwin", "linux" ]

    or

        "os" : [ "darwin", "!win32" ]

* cpu

        "cpu": [ "x64", "ia32" ] 

    or

        "cpu": [ "!arm", "!mips" ] 

* preferGlobal，如果希望安装成global的，那么当被安装成local的时候，给出warning 
* private
* publishConfig








## npmcdn

> `npmcdn` is a fast, global content-delivery network for stuff that is published to npm. 

 <https://npmcdn.com/>

路径格式为：

    https://npmcdn.com/package@version/file



## npm-shrinkwrap

> Lock down dependency versions

`锁定`代码`版本`依赖。

<https://docs.npmjs.com/cli/shrinkwrap>

### 说明

    npm shrinkwrap

在根目录生成`npm-shrinkwrap.json`文件，它由命令`npm shrinkwrap`扫描`node_modules`目录下的所有npm package，自动生成锁定版本的配置文件。`npm-shrinkwrap`的优先级高于`package.json`。

对于package.json文件中`devDependencies不生效`，但不代表一个项目的package.json只有devDependencies字段就用不上，因为这些dev阶段的package会调用很多其他的包，`其他包`的版本固化`也`是`需要`的。

### 使用流程

* 开发过程中，引入一个新包:

        npm install xx --save
        npm shrinkwrap


* 升级一个包:

        npm install xx@version --save
        npm shrinkwrap

* 删除一个包:

        npm uninstall xx --save
        npm shrinkwrap


