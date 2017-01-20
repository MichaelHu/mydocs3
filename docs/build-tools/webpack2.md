# webpack2

* <https://webpack.js.org>


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



## 四个关键概念

### entry

### output

### loaders

### plugins

