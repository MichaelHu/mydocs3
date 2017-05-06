# webpack2

* site: <https://webpack.js.org>
* webpack 1 and common things: <ref://./webpack.md.html>
* core concepts: <https://webpack.js.org/concepts/>
* configuration: <https://webpack.js.org/configuration/>



## 四个关键概念

> 理解以下`四个关键概念`，有助于理解webpack的运行机制

* entry
* output
* loaders
* plugins

下面分别介绍。


## entry

> webpack会在运行过程中生成`依赖图谱`，简单说`entry`就是`依赖链`的`起点`

### 单入口语法

    {
        entry: string | Array<string>
    }

支持`字符串`和`字符串数组`，只打成一个包

    {
        entry: './path/to/entry/file.js' 
    }

    {
        entry: [
            './path/to/entry/file1.js' 
            , './path/to/entry/file2.js' 
        ]
    }

### 对象语法

`对象`语法，有`两种`用途，一种是`SPA`中分拆`app`和`vendors`；另一种是`MPA`中多个页面独立打包

    {
        entry: {
            [entryChunkName: string]: string|Array<string>
        }
    }

以上`单入口语法`也可写成`单main`方式：

    {
        entry: {
            main: './path/to/entry/file.js' 
        }
    }

    {
        entry: {
            main: [
                './path/to/entry/file1.js' 
                , './path/to/entry/file2.js' 
            ]
       }
    }

#### SPA分拆
SPA中分拆`公共库`与`业务`代码。

    {
        entry: {
            app: './src/app.js' 
            , vendors: './src/vendors.js'
        }
    }

#### MPA分拆
MPA中`按页面`拆分为不同entry。

    {
        entry: {
            pageOne: './src/pageOne/index.js' 
            , pageTwo: './src/pageTwo/index.js' 
            , pageThree: './src/pageThree/index.js' 
        }
    }

> 不管单入口还是对象语法，都可以使用`CommonsChunkPlugin`插件抽取公共代码，通过`自动或者显式`方式打成公共包。具体可查看<ref://./webpack.md.html>中关于`CommonsChunkPlugin`的部分。




## output

> 用于配置将应用`打包到何处`

不同于entry，可以配置多个不同entry point，output配置`只配置一处`。

    {
        output: {
            // ---- basic options ----

            // can use [name], [hash], [chunkhash]
            filename: ...

            // absolute path, like `__dirname + '/build'`, can use [hash] - the hash of the compilation
            , path: ...



            // ---- other options ----

            // for non-entry chunks, relative to `path`
            // [id], [name], [hash], [chunkhash]
            , chunkFilename: ... 

            // default: false
            , crossOriginLoading: ...

            // default: false
            , devtoolLineToLine: ...

            // default: "[id].[hash].hot-update.js" 
            , hotUpdateChunkFilename: ...

            // default: "webpackHotUpdate" 
            , hotUpdateFunction: ...

            // default: "[hash].hot-update.json" 
            , hotUpdateMainFilename: ...

            // default: "webpackJsonp", for multiple webpack instances
            , jsonpFunction: ...

            , library: ...

            // var, this, commonjs, commonjs2, amd, umd
            , libraryTarget: ...

            // default: "[file].map", can use [file], [id], [hash]
            , sourceMapFilename: ... 
        }
    }




## loaders

webpack将每个文件（.css, .html, .scss, .jpg等）都作为一个module，但是，webpack`只懂javascript`！

> loader的`目的`就是将这些`非js module`的文件`转换`成js module

    {
        module: {
            rules: [
                { test: /\.(js|jsx)$/, use: 'babel-loader' }
            ]
        }
    }

以上配置告诉webpack编译器，当在`require()`或`import`语句中引入`.js`或`.jsx`文件时，先用`babel-loader`转换一下再添加到bundle中。 

注意，是在`module.rules`而不是`rules`下定义。




## plugins

> loaders以`文件(js module或非js module)为单位`进行转换，而plugins以编译事件为契机，执行某些自定义的功能。非常强大、可定制。

需要`require`进来，并通过`new`创建新实例。

    {
        plugins: [
            new webpack.optimize.UglifyJsPlugin(),
            new HtmlWebpackPlugin( { template: './src/index.html' } )
        ]
    }







## 迁移到webpack2

迁移指南：<https://webpack.js.org/guides/migrating/>

### resolve.modules

`resolve.root`, `resolve.fallback`, `resolve.modulesDirectories`，合并到`resolve.modules`选项中。


### module.rules

* `module.rules` 取代 `module.loaders`
* `rule.use` 取代 `loader.loaders`
* `loader.options` 取代 `loader.query`

配置详情如下：

    module: {
        // loaders: [
        rules: [
            {
                test: /\.css$/,
                // loaders: [
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        // query: {
                        options: {
                            modules: true
                        }
                    }

                ]
            },
            {
                test: /\.jsx$/,
                loader: "babel-loader",
                options: {
                    // ...
                }
            }
        ]
    }


### loader链

    module: {
        // loaders: {
        rules: {
            test: /\.less$/,
            // loader: "style-loader!css-loader!less-loader"
            use: [
                "style-loader",
                "css-loader",
                "less-loader"
            ]
        }
    }

1. 使用`!`来形成链式的方式，只能在`module.loaders`旧选项里使用
2. `use`选项支持链式只能用`数组方式`，按顺序依次形成链式 



### 移除loader简写方式

    module: {
        rules: [
            {
                use: [
                    // "style",
                    "style-loader",
                    // "css",
                    "css-loader",
                    // "less"
                    "less-loader"
                ]
            }
        ]
    }

如果`仍然想用`loader简写方式，可以使用以下新选项：

    resolveLoader: {
        moduleExtensions: [ "-loader" ]
    }

但这种方式`不建议`。



### todo



