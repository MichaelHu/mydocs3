# webpack-plugins

## copy-webpack-plugin

### Tips

* github: <https://github.com/webpack-contrib/copy-webpack-plugin>
* install: `npm i copy-webpack-plugin`
* usage - `webpack.config.js`:

        const CopyWebpackPlugin = require( 'copy-webpack-plugin' );

        const config = {
            plugins: [
                new CopyWebpackPlugin( [ ...patterns ], options )
            ]
        }

* flatten拷贝，目标目录必须存在
* 默认拷贝，会截取`公共父目录`
* 支持直接的目录拷贝，使用`toType: 'dir'`选项


### Examples

#### 目录结构

后续案例所使用的`目录结构`说明如下：

    /app
        src
            img
                img-a.png
                img-b.gif
                img-c.jpg
        build


#### 扁平化拷贝

> flatten - 扁平化拷贝，作用类似：`cp from/* to`

    new CopyWebpackPlugin( [
        {
            from: '/app/src/img/*',
            to: '/app/build/assets',
            flatten: true
        }
    ] );

效果如下：

    /app
        src
            img
                img-a.png
                img-b.gif
                img-c.jpg
        build
            assets
                img-a.png
                img-b.gif
                img-c.jpg



#### 默认拷贝

> 除了from、to，不添加其他选项字段

    new CopyWebpackPlugin( [
        {
            from: '/app/src/img/*',
            to: '/app/build/assets',
        }
    ] );

效果如下：

    /app
        src
            img
                img-a.png
                img-b.gif
                img-c.jpg
        build
            assets
                src
                    img
                        img-a.png
                        img-b.gif
                        img-c.jpg

#### 目录拷贝

> 将目录from拷贝成to

    new CopyWebpackPlugin( [
        {
            from: '/app/src/img/',
            to: '/app/build/assets/',
            toType: 'dir'
        }
    ] );

效果如下：

    /app
        src
            img
                img-a.png
                img-b.gif
                img-c.jpg
        build
            assets
                img-a.png
                img-b.gif
                img-c.jpg

