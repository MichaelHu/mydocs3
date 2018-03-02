# hugeapp-apollo


## 目标

* 包罗万象
* 一键搭建
* 精致
* 提供技术实践场
* 体验`积木式`开发


## 全景图

    构建层
        npm / yarn / make
         webpack 2/3/4
        parcel
        rollup
        fis3
        gulp
        grunt
        r.js
    语言转换层
        babel 
        typescript
        flow
        sass
        less
    框架层
         redux + react-router + react
        vuex + vue-router + vue
        san
        angular
    应用层
        canvas
        webgl
        websocket
        webworker
        sigmajs
        ...
    UI层风格
        bootstrap
        ant-design
        material-design
        移动自适应
    UI组件
        iView
        element
        san-mui
        reactstrap
        ...
    基础库
        jQuery
        zepto
        lodash
        ...


## todo

    webpack.config.js配置
    filename的template variables, hash/chunkhash
    extract-text-webpack-plugin
    html-webpack-plugin


### 180117

    npm run dev
    webpack.config.dev.js
    devServer配置
    externals配置
    基础库抽取，避免重复bundle

### 180118

    应用框架抽取，避免重复bundle
    react的运行时错误无法在压缩后展示问题解决，uglifyjs去注释，prettier压缩缩进
    目录结构，采用适用于大型项目的目录组织：

### 180124

    支持Code-Splitting，使用bundle-loader、react-loadable两种方案




### 180202
bootstrap之webpack构建：
<http://getbootstrap.com/docs/4.0/getting-started/webpack/>


### 180207

* 完成`ReactStrap`子项目，尝试使用`reactstrap`/`bootstrap 4`


### 180208

* 使用react-router v4，支持`分布式路由`配置
* react-router v4的path匹配，类似与nginx的location指令的`前缀匹配`


### 180209

* 通过适当的`code-spliting`，支持`大规模`扩展
* 支持项目中针对不同css文件，选择是否启动`css-modules`，components和apps默认都启动css-modules
* 新起`canvas`子项目，后续增加新的酷炫案例实践

### 180301

* MagicBox子项目
* Echarts子项目





