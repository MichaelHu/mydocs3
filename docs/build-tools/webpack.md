# webpack

> CommonJS Module Bundler

对`SPA`有`天生`很好的支持，但是也支持`AMD`。通过复用模块拆分，也能很好的支持`MP`。

* <https://webpack.github.io>
* <http://webpack.github.io/docs/>
* <http://webpack.github.io/docs/tutorials/getting-started/>

相关阅读： Browserify : <http://browserify.org>

## 印象

* 两个很关键的抽象：`loader`, `plugin`
* `loader`和`plugin`很丰富，还支持自行扩展。有些功能是重叠的，不同配置可能达到同样的效果。
* js模块`复用`，`自动`支持复用模块提取
* `SPA`和`MP`有对应的适合的loader或plugin，建议项目更加`纯粹`，要么都使用SPA，要么就是用MP，因为混合容易造成冲突。



## 安装

### webpack

安装webpack主程序。

    npm install -g webpack
    npm install webpack


### loaders

`npm@3.x`开始，`npm install`不会自动安装依赖，所以在新版中以上安装时需要写全。



#### babel-loader

    npm install --save-dev babel-loader babel-core babel-preset-es2015 babel-preset-react

解析`es2015`, `react`等新式语法。


#### style/css loader

    npm install --save-dev style-loader css-loader

* `css-loader`: 对css文件的`@import`， `url(...)`等进行require解析
* `style-loader`: 将css文件添加至Document



#### css preprocessor loader

    npm install --save-dev sass-loader less less-loader

css预处理语法解析。



#### file-loader

    npm install --save-dev file-loader

文件`打包`发送至输出目录。




#### url-loader

    npm install --save-dev url-loader

同file-loader，同时还新增支持`Data URI`功能，适合图片资源的处理。




#### html-loader

    npm install --save-dev html-loader

html文件的解析，输出为`字符串`。它能对`html`文件的`标签属性`进行`require`解析。
还可以对输出做html`压缩`。



#### extract-loader

    npm install --save-dev extract-loader

提取功能。从bundle中将require请求的css提取出来；从html中将img，css引用提取出来。适合用于发布版本的优化处理。





### third plugins

第三方插件。

#### html-webpack-plugin

    npm install --save-dev html-webpack-plugin

html文件自动生成，或者按模板生成。


#### extract-text-webpack-plugin

    npm install --save-dev extract-text-webpack-plugin

提取插件。有`extract-loader`的功能，同时还会将提取的文件`追加`到HTML文件中。 








## 命令行使用

    webpack ./entry.js bundle.js


### loader相关命令行参数 

`global`安装的webpack会存在找不到`preset`的问题，解决方案是将webpack安装在`当前项目`。

`babel-loader`: <https://github.com/babel/babel-loader>

    npm install webpack
    ../node_modules/webpack/bin/webpack.js \
        --module-bind 'js=babel?presets[]=react,presets[]=es2015' \
        --progress --colors \
        ./index.js bundle.js



### 带进度条，颜色

    webpack --progress --colors ./entry.js bundle.js



### 伺服模式

    webpack --progress --colors --watch ./entry.js bundle.js






### Library输出

共有`6种`库输出方式，分别为：`var`, `this`, `commonjs`, `commonjs2`, `amd`, `umd`

<https://webpack.github.io/docs/configuration.html#output-library>
    
#### var方式

    webpack --output-library leafletImage --output-library-target var index.js leaflet-image.js

输出为：

    var leafletImage = xxx;


#### cmd package

    webpack --output-library-target cmd index.js projzh.js

输出为：

    define(...);


#### umd package

    webpack --output-library-target umd index.js projzh.js

#### this package

    webpack --output-library-target this index.js projzh.js

输出为：

    this["Library"] = xxx;






## 使用配置文件

使用配置文件后，就不需要在`webpack`的命令行调用中添加`过多`参数，虽然配置项也可以通过命令行参数传递。

配置文件默认为`webpack.config.js`。以下为一个例子：


    var dir = __dirname;
    var webpack = require('webpack');
    var HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
        entry: {
            vendor: [ 'jquery' ] 
            , app: dir + "/src/index"
        }
        , output: {
            path: dir + '/dist'
            , filename: "[name].js"
        }
        , module: {
            loaders: [
                {
                    test: /\.css$/
                    , loader: 'style!css'
                }
                , { 
                    test: /\.jsx?$/
                    , loader: 'babel?presets[]=es2015,presets[]=react'
                }
            ]
        }
        , plugins: [
            new HtmlWebpackPlugin()
            , new HtmlWebpackPlugin({
                title: 'Todos App'
                , filename: 'todos.html' 
                , template: dir + '/src/index.html'
                , inject: 'head'
            })
            , new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
            , new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'
                , minChunks: Infinity
            })
        ]
    }; 



### html文件处理


#### html文件自动生成

需要使用`plugins`配置项来引入插件`HtmlWebpackPlugin`

plugins相关文档说明：<https://webpack.github.io/docs/list-of-plugins.html>

HtmlWebpackPlugin插件: <https://github.com/ampedandwired/html-webpack-plugin>

相关配置文件：

    ...
    var HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
        ...
        , plugins: [
            new HtmlWebpackPlugin()
        ]
        ...
    };

以上配置会在dist目录下自动生成`index.html`文件，并在`body`中引用`bundle.js`。脚本默认都是插入到body末尾，通过设置`inject`配置项，可以将脚本插入到`head`部分。


#### 提供html模板

比如`./src/index.html`内容如下：

    <!DOCTYPE html>
    <html>
    <head>
    <title><%= htmlWebpackPlugin.options.title %></title>
    <meta name="viewport" 
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    </head>
    <body>
    </body>
    </html>

在title标签处使用`模板`语法将`title`配置项引入：

    <title><%= htmlWebpackPlugin.options.title %></title>

并在配置文件`webpack.config.js`中的`plugins`中添加一个`新的`HtmlWebpackPlugin`实例`：
    
    ...
    , plugins: [
        new HtmlWebpackPlugin()
        , new HtmlWebpackPlugin({
            filename: 'todos.html'          // 输出文件名
            , title: 'Todos App'            // 模板标题字段
            , template: './src/index.html'  // 模板文件，支持loader
        })
    ]
    ...
    

`注意`：HtmlWebpackPlugin的`首字母`大小写在配置文件和模板中不一样。

同时，`template`字段`支持``loader`，可以在解析模板前做其他解析。但是如果使用了loader，那么`title`替换就`不生效`了。



#### html优化

webpack支持html文件的自动生成，非常方便。但是项目中也避免不了存在自行编写的html文件，因为它比较轻量级，不需要由js来加载，这种html文件如何处理呢？

答案是： `extract-loader`

> webpack loader to extract `HTML` and `CSS` from the bundle.

通过该loader，可以对html文件进行提取，将html文件内引用的`css`，`img`等资源按发布后的格式来引用，比如替换路径，添加hash等。

举例如下：

`输入`：

    <html>
    <head>
        <link href="main.css" type="text/css" rel="stylesheet">
    </head>
    <body>
        <img src="hi.jpg">
    </body>
    </html>

`输出`：

    <html>
    <head>
        <link href="7c57758b88216530ef48069c2a4c685a.css" type="text/css" rel="stylesheet">
    </head>
    <body>
        <img src="6ac05174ae9b62257ff3aa8be43cf828.jpg">
    </body>
    </html>


`配置文件`：

    var path = require('path');
    var indexHtml = path.join(__dirname, 'app', 'index.html');

    module.exports = {
        entry: [
            ...
            , indexHtml
        ],
        ...
        module: {
            loaders: [
                {
                    test: indexHtml,
                    loaders: [
                        "file?name=[name].[ext]",
                        "extract",
                        "html?" + JSON.stringify({
                            attrs: ["img:src", "link:href"]
                        })
                    ]
                },
                {
                    test: /\.css$/,
                    loaders: [
                        "file",
                        "extract",
                        "css"
                    ]
                },
                {
                    test: /\.jpg$/,
                    loader: "file"
                }
            ]
        }

    };









### css文件处理

css文件可能需要在js代码中`require`；也可能是用sass编写，还可能使用less编写。
处理过程可以使用`style-loader`, `css-loader`, `less-loader`, `sass-loader`等loaders。

#### css编译

`css-loader`： 解析`@import`, `url(...)`之类的语法。

    ...
    , loaders: [
        {
            test: /\.css$/,
            , loader: 'style!css?root=.'

            // 打开压缩
            // , loader: 'style!css?minimize'

            // 关闭压缩
            // , loader: 'style!css?-minimize'

            // 关闭url(...)处理逻辑
            // , loader: 'style!css?-url'

            // 关闭@import处理逻辑
            // , loader: 'style!css?-import'

            // 开启驼峰类名 
            // , loader: 'style!css?camelCase'

        }
    ]
    ...

其他相关功能：
* Local Scope: <https://github.com/webpack/css-loader#local-scope>
* CSS Modules: <https://github.com/webpack/css-loader#css-modules>


#### css预编译

* `less-loader`: 解析`.less`文件
* `sass-loader`: 解析`.sass`文件



#### css优化

发布版本的css，特别是公共样式，如果都由js来加载，会影响展现速度和效果。希望可以`单独打包`成一个`文件`通过`link`标签加载，达到与js的`并发`加载。

可以使用`extract-loader`或者`extract-text-webpack-plugin`



`1. extract-loader`:

从bundle里提取html或者css，所以`前提`是html和css在bundle中被引用。

    ...
    , loaders: [
        {
            test: /\.css$/
            , loader: 'file?name=[name].[ext]!extract!css' 
        }
    ]
    ...

以上配置针对在js中使用`require()`引用的css文件有效。如果css文件只在某个独立的html文件中引用，是不会被提取的。 



`2. extract-text-webpack-plugin`:

功能基本上同extract-loader，`不同`的是，该plugin可以将得到的独立文件`inject`到引用的html文件中。

配置文件：

    var ExtractTextPlugin = require("extract-text-webpack-plugin");
    module.exports = {
        module: {
            loaders: [
                { 
                    test: /\.css$/
                    , loader: ExtractTextPlugin.extract("style-loader", "css-loader") 
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin("styles.css")
        ]
    }





### js文件处理



#### js编译 

js文件可能有`es2015`或者`react`的语法，这些情况都可以通过配置相应loader来解决 —— `babel-loader` 

`babel-loader options`: <http://babeljs.io/docs/usage/options/>

并且在配置文件中添加`loaders`配置，具体参考上文的config文件`loaders`部分。






#### js压缩

使用webpack自带的`UglifyJsPlugin`插件，该插件使用了`UglifyJS2`: <https://github.com/mishoo/UglifyJS2#usage>

    ...
    , plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
            , mangle: [
                '$'
                , 'exports'
            ]
        })
    ]
    ...






#### js模块复用

相关插件： `CommonsChunkPlugin`，是webpack自带插件。

`1. 自动抽取复用模块`：

    ...
    , plugins: [
        ...
        , new webpack.optimize.CommonsChunkPlugin({
            name: 'commons'
            // , filename: 'different-name.js'

            // Modules must be shared between 3 entries 
            , minChunks: 3
        })
        ...
    ]
    ...

自动统计模块的引用计数，至少被3个模块引用的模块，单独打包成`common.js`文件。


`2. 显式指定复用模块`：

在`entry`字段中显式设置，并在`plugins`字段中做对应配置：   

    , entry: {
        vendor: [ 'jquery' ]
        , app: './src/index'
    }
    ...
    , plugins: [
        ...
        , new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
            // , filename: 'different-name.js'
            // （ with more entries, this ensures that no other module
            //  goes into the vendor chunk )
            , minChunks: Infitity
        })
        ...
    ]
    ...
    
`3. 异步复用模块`：

todo







### 图片等文件的处理


#### 路径处理

使用以下loader：

* `file-loader`
* `url-loader`

配置文件举例：

    ...
    , loaders: [
        {
            test: /\.jpg$/
            , loader: 'file'
        }
        , {
            test: /\.png$/
            , loader: 'url?mimetype=image/png&limit=4000'
        }
    ]
    ...



#### 其他优化

压缩？

todo



### 垫片模块处理

shimming




## 针对SPA和MPA的优化

主要关键点在于复用模块的拆分。插件`CommonsChunkPlugin`起到了很关键的作用。

参考： <https://webpack.github.io/docs/optimization.html>








## loader技术

> `加载器`是webpack很关键的抽象之一

### 参考：

* <https://webpack.github.io/docs/using-loaders.html>
* <https://webpack.github.io/docs/list-of-loaders.html>


### 三种使用方式：

1. `inline`，`!`分隔loader与资源
2. `configuration`
3. `CLI`参数， `--module-bind`



### loader命名规范： 

`style-loader`, `style`，两者`皆可`，后者为`缩写`方式。



### 有用的loader：

#### basic类
1. script: <https://github.com/webpack/script-loader>
2. base64: <https://github.com/antelle/base64-loader>
3. to-string: <https://github.com/gajus/to-string-loader>


#### packaging类
1. file: <https://github.com/webpack/file-loader>
2. url: <https://github.com/webpack/url-loader>
3. extract: <https://github.com/peerigon/extract-loader>


#### templating类
1. html: <https://github.com/webpack/html-loader>
2. markdown: <https://github.com/peerigon/markdown-loader>


#### style类
1. style: <https://github.com/webpack/style-loader>
2. css: <ihttps://github.com/webpack/css-loader>
3. less: <>
4. sass: <>






## plugin技术



### 参考：

* <https://webpack.github.io/docs/using-plugins.html>
* <https://webpack.github.io/docs/how-to-write-a-plugin.html>





## APIs

<http://webpack.github.io/docs/api-in-modules.html>

使用webpack编译的代码，支持的`方法`和`变量`。


### Basic

#### require

    require(dependency: String)

同步依赖，不会向服务器发请求。`编译器`会保证依赖的`同步性`。CJS风格。

#### define，带factory

同步调用，不会向服务器发请求。AMD风格。


#### module.exports

CJS风格。

#### exports

CJS风格。

#### define，带value

AMD风格。






### Advanced

#### require.cache

多次require，只会执行一次factory，以及只有一个export，所以必然会有cache机制。

以下等式：

    var d1 = require("dependency");
    require("dependency") === d1
    delete require.cache[require.resolve("dependency")];
    require("dependency") !== d1

    // in file.js
    require.cache[module.id] === module
    require("./file.js") === module.exports
    delete require.cache[module.id];
    require.cache[module.id] === undefined
    require("./file.js") !== module.exports // in theory; in praxis this causes a stack overflow
    require.cache[module.id] !== module



#### require.context

#### require.ensure

    require.ensure(dependencies: String[], callback: function([require]), [chunkName: String])

`按需(on demand)`下载额外依赖。

    // in file.js
    var a = require("a");
    require.ensure(["b"], function(require) {
        var c = require("c");
    });
    require.ensure(["d"], function() {
        var e = require("e");
    }, "my chunk");
    require.ensure([], function() {
        var f = require("f");
    }, "my chunk");
    /* This results in:
        * entry chunk
            - file.js
            - a
        * anonymous chunk
            - b
            - c
        * "my chunk"
            - d
            - e
            - f
    */


#### require

    require(dependencies: String[], [callback: function(...)])

与`require.ensure`类似。区别在于`依赖模块`会作为回调函数的`参数`传递进去，同时`不支持`chunk名指定。

    // in file.js
    var a = require("a");
    require(["b"], function(b) {
      var c = require("c");
    });
    /* This results in:
        * entry chunk
            - file.js
            - a
        * anonymous chunk
            - b
            - c
    */







## 开发服务器

    npm install -g webpack-dev-server

    webpack-dev-server --progress --colors



