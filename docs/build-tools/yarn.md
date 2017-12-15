# yarn

> npm的高级替代品

## Resources

* site: <https://yarnpkg.com/>
* github: <https://github.com/yarnpkg/yarn/>


## Features

* `快速`，通过缓存下载过的包，无需重复下载，支持`离线模式`
* `确定性`，有格式详尽但又简洁的`lockfile`文件以及确定的依赖算法，保证在不同系统尚安装依赖，总能保持一致
* 同样从`npm registry`下载package
* `npm`的替代工具，为解决npm的缺憾而生
* 能针对`package.json`里的`engines`字段做出提示，比如：
        ...
        "engines": {
            "node": "6.10.1",
            "npm": "3.0.0"
        }
        ...

    在运行`$ yarn install`能作出如下提示：

        error SophonWeb@1.0.0: The engine "node" is incompatible with this module. Expected version "6.10.1".
* 运行`yarn`命令，安装依赖的过程中，会自动生成`yarn.lock`文件。后续使用`package.json`以及`yarn.lock`文件，在其他环境上安装依赖的时候，明显提升。整体比npm快很多，非常值得开发团队采用


## Installation

### Commands

    $ brew install yarn
    # 若使用nvm，则添加`--without-node`选项
    $ brew install yarn --without-node

    # 更新
    $ brew upgrade yarn



### Tips

安装yarn，可能需要`翻墙`，有些安装包无法直接下载，比如：

    https://yarnpkg.com/downloads/1.3.2/yarn-v1.3.2.tar.gz


## Usage

### 常用命令

    yarn help
    yarn init

    # adding a dependency
    yarn add <package> 
    yarn add <package>[@<version>]
    yarn add <package>[@<tag>]

    # add to `devDependencies`
    yarn add <package> --dev
    # add to `peerDependencies`
    yarn add <package> --peer
    # add to `optionalDependencies`
    yarn add <package> --optional

    yarn upgrade <package>
    yarn remove <package>

    # installing all the dependencies of project
    yarn
    yarn install

    # generate lockfile
    yarn generate-lock-entry
    yarn generate-lock-entry --use-manifest ./package.json
    yarn generate-lock-entry --resolved local-file.tgz#hash




