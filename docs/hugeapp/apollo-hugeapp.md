# hugeapp-apollo


## 目标

* 包罗万象
* 一键搭建
* 精致

## 全景图

    构建层
        npm / yarn / make
         webpack
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







