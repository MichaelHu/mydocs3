# webpack

> Module Bundler

<https://webpack.github.io>

<http://webpack.github.io/docs/tutorials/getting-started/>


安装：

    npm install -g webpack

安装loader：

    npm install style-loader css-loader url-loader babel-loader sass-loader file-loader --save-dev

配置文件：webpack.config.js

    module.exports = {
        entry: "./entry.js",
        output: {
            path: __dirname,
            filename: "bundle.js"
        },
        module: {
            loaders: [
                { test: /\.css$/, loader: "style!css" }
            ]
        }
    };

运行：

    webpack


