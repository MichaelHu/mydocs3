# lerna

> A tool for managing JavaScript projects with multiple packages.


## Resources

* <https://github.com/lerna/lerna> <iframe src="http://258i.com/gbtn.html?user=lerna&repo=lerna&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
* <https://lernajs.io>


## features

大型项目拆分成多个`子仓库`能利于代码的共享，但是管理起来却有不少麻烦，光`切换不同仓库的成本`就已经非常之大，更何况还要在不同仓库进行统一的其他的操作，比如运行单测、统一更新版本、统一发布一个版本。

使用`lerna`，将获得以下便利：

1. `一个仓库`管理多个独立package，将`子仓库`作为独立`package`来对待，每个package可以独立发布至npm；可以在git仓库中将所有packages一起按项目版本打tag。
2. 提供工具统一管理packages，打印package列表，跟踪package的更新，根据包更新进行项目版本发布。
3. 提供packages的`标准版本号`升级提示：

        hudamin@local package-a $ lerna publish
        lerna info version 2.0.0-rc.5
        lerna info current version 0.4.5
        lerna info Checking for updated packages...
        lerna info Comparing with tag v0.4.5
        ? Select a new version (currently 0.4.5) (Use arrow keys)
        ❯ Patch (0.4.6)
          Minor (0.5.0)
          Major (1.0.0)
          Prepatch (0.4.6-0)
          Preminor (0.5.0-0)
          Premajor (1.0.0-0)
          Prerelease
          Custom

4. 支持gitlab等`私有`git repo


## lerna users

* babel: <https://github.com/babel/babel>
* react-router: <https://github.com/ReactTraining/react-router>
* element: <https://github.com/ElemeFE/element>
* ...


## usage

### initialization

    npm install -g lerna@^2.0.0-beta.0
    git init lerna-repo && cd lerna-repo
    lerna init


### dirctory structure

    package.json
    lerna.json
    packages/
        package-a/
            index.js
        package-b/
            index.js
            package.json
        package-c/
            index.js
            package.json

* `lerna.json`为配置文件，`packages`目录为子package的容器目录
* 包含三个包，package-a包随父项目发版，`package-b`和`package-c`可单独发版至npm，也可随父项目一起发版。


### common commands

#### 命令列表

    lerna init
    lerna init -i
    lerna init --independent

    # 安装所有package的dependencies，并且链接交叉依赖，使代码中的require()总是可用，
    # 就像依赖已经在node_modules中了一样
    lerna bootstrap

    # 根据上一publish的版本号提示选择新版本号，打tag，并提交远程仓库
    lerna publish

    # 将指定tag（默认为最新tag）发布到npm，暂未测试成功
    lerna publish --npm-tag [tagname]

    lerna publish --canary

    # 同lerna publish，只是不进行git相关操作
    lerna publish --skip-git
    lerna --force-publish [packages] # 逗号分隔或者使用通配符*

    # 列出从上一次lerna publish以来更新过的package
    # 注意不是lerna update
    lerna updated

    # 与上一次lerna publish时的版本而不是上一次git commit进行diff比较
    lerna diff [package]

    lerna run [script]

    lerna ls


#### 命令使用注意

* `lerna publish`执行新版本号设置、更新package对应的package.json，同时`提交`这些`只包含package.json的改动`至远程仓库，其他文件的改动不会进行提交。
* `lerna publish`应避免在没有updated的情况下执行，因为这种情况会产生一个`vundefined`的tag






## lerna.json

    {
        "lerna": "2.0.0-rc.5",
        "packages": [
            "packages/*"
        ],
        "version": "independent or version"
    }

* 指定所使用`lerna的版本号`
* 设定packages列表
* 配置package版本管理方式，可选`独立管理`还是`统一管理`


### version

`version`字段有两种类型的值，可以设置`具体版本号`（通过`lerna init`），或者`independent`（通过`lerna init -i`）。

    "version": "0.0.0"

设置具体版本号情况下，执行`lerna publish`，所有更新的packages都参照该具体版本号进行升级。

    hudamin@local lerna-t2 $ lerna publish
    lerna info version 2.0.0-rc.5
    lerna info current version 0.3.0
    lerna info Checking for updated packages...
    lerna info Comparing with tag package-b@0.3.4
    ? Select a new version (currently 0.3.0) Patch (0.3.1)

    Changes:
     - package-b: 0.3.4 => 0.3.1
     - package-c: 0.3.2 => 0.3.1    


设置`independent`情况下，执行`lerna publish`，所有更新的packages会参照各自上一版本号进行升级。

    hudamin@local packages $ lerna publish
    lerna info version 2.0.0-rc.5
    lerna info versioning independent
    lerna info Checking for updated packages...
    lerna info Comparing with tag package-b@0.3.3
    ? Select a new version for package-b (currently 0.3.3) Patch (0.3.4)
    ? Select a new version for package-c (currently 0.3.1) Patch (0.3.2)

    Changes:
     - package-b: 0.3.3 => 0.3.4
     - package-c: 0.3.1 => 0.3.2



