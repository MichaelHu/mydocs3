# ares-hugeapp

> `战神(Ares)`项目( from 170419 )，寓意`前锋、冲锋陷阵`，驰骋在技术实践的战场中！也是`第一个`HugeApp。

changelog: 

## 定位
* 用于架构技术研究
* 适用于PC端
* 可线上部署

## 研究内容
* SPA架构，主要针对`react + react-router + redux`架构
* 前端工程化构建
* 组件化模式




## 开发框架搭建

### 技术选型
* redux + react-router + react + webpack
* node-v7.7.4 npm-v4.1.2

### 目录搭建

使用适合大型项目团队使用的`fractal`结构，依照`特性`而不是文件类型分组。参考 
* <https://github.com/asd0102433/blog/blob/master/前端/file_structure_for_react.md>
* <https://github.com/bodyno/react-starter-kit>

结构如下：

    src                             # 源码目录
        components                  # 全局可复用的表现型组件，使用子目录来组织
        containers                  # 全局可复用的容器型组件
        layouts
        store
        routes
            index.js
            Root.js
            Home
                index.js
                assets
                components
                container
                modules
                routes **
    script                          # 辅助脚本
    dist                            # 发布目录
    test                            # 单测目录



### 基础代码框架搭建

    echo "7.7.4" > .nvmrc
    nvm use
    npm init
    npm install --save react react-dom react-router
    npm install --save redux react-redux react-router-redux

    npm install --save-dev babel-core babel-preset-react babel-preset-es2015
    npm install --save-dev webpack webpack-dev-server
    npm install --save-dev babel-loader
    npm install --save-dev node-sass sass-loader css-loader style-loader
    npm install --save-dev file-loader url-loader


### 验证基础功能

* webpack基础模块打包功能


### webpack config
> webpack version 2.x

* 源码目录src
* 发布目录
        dist/index.html
        dist/static
        dist/js
        dist/css
* 支持公共模块抽取
* 模块支持按需加载
* 支持常用css预处理器`.less, .sass`
* 支持`条件data-uri`

配置如下：




### npm版本固化

    vim package.json
    :s/"^\([^"]\+"\)/"\1/g
    npm shrinkwrap


## 子项目1 todomvc

通过`todomvc`子项目，主要研究react的`生命周期`，redux的数据流，以及react的一些`基本特性`等。

### 研究问题

1. actions是全局的吗？
1. props下传，全部下传还是选择性下传？
1. `深层次`的component，需要派发action，封装了dispatch的action是逐级下传还是让其直接成为container
1. 私有components分拆
1. jsx中添加`&nbsp;`的处理方式，类似`<!-- react-text: 8 -->`
1. reduer传入`state`的`immutable`特性
1. `libs不分级`，定位于common
1. `utils分级`，定位于common和specific
1. `DOM-Diff`研究 <http://www.infoq.com/cn/articles/react-dom-diff>
    * `O(n)`复杂度
    * 两种比较：节点`类型`的比较，节点`属性`的比较
    * 列表节点的`key`关键字，提高diff`性能`
    * `canvas`标签，`DOM`属性等
    
1. 支持ctrl-z的架构
1. props或state，该用哪个？
1. `componentWillReceiveProps`事件中调用图谱渲染（非action行为）
1. `componentWillReceiveProps`事件中派发`同步action`，可能会导致`无限循环`
1. 深入浅出生命周期：
    * `两阶段`（mounting, updating）
    * `Trackable`类
1. 弄清楚`componentWillReceiveProps`与`componentWillUpdate`的区别与联系
    * 都属于`updaing`阶段，执行时`this.props`都尚`未发生变化`
    * `参数不同`，前者只针对nextProps，后者针对nextProps和nextState
    * `前者能调用setState`，后者不行（新的state已经生成，虽然尚未生效）
    * 无法阻止对前者的调用，但可以通过shouldComponentUpdate返回false阻止对后者的调用
    * `组件内部`来讲，`setState`会触发后者，但不触发前者
1. react程序`规范`，目录规范、编码规范等
1. `componentWillReceiveProps`的派发，在`redux`体系下，`只派发`给那些关心的`数据发生`变化了的component
1. redux数据流做了优化，`多个action`引发的动作可能会`合并`




## 子项目2 大数据图谱

* props向下传递是全量传递还是按需传递？
* 是否允许container嵌套？
* 箭头函数使用的场景，不能完全等同与匿名函数






