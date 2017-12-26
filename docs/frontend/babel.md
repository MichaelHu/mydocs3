# babel

> Babel is a JavaScript compiler.

`---- Use next generation JavaScript, today.`

## Features

* ES新标准的`火箭`助推器，`cssnext`学习的就是`babel`
* 很牛逼的东西
* 程序员的`福音`，代码编写和浏览器运行环境独立开来，即使浏览器不支持，也不影响使用新语法编写程序


## Resources

* `site`: <http://babeljs.io>
* `docs`: <http://babeljs.io/docs/usage/babelrc/>



## Installation

    $ npm install --save-dev babel-cli
    $ ./node_modules/.bin/babel -h
    $ npm install babel-preset-es2015
    $ ./node_modules/.bin/babel --presets es2015 main.js


## Configurations

`.babelrc`或者`package.json`皆可：

    {
        "presets": [ ... ]
        , "ignore": [ ... ] 
        , "env": {
            "production": {
                "plugins": [ ... ]
            }
        }
    }

### Tips

* 若在`package.json`中配置，只需在`babel字段`下将以上.babelrc内容包含进来

        {
            "name": "my-package"
            , "version": "1.0.0"
            , "babel": {
                // my babel cofig here
            }
            ...
        }

* `env`字段的内容可以在代码中通过`process.env.BABEL_ENV`获得，若不可用，可以通过`process.env.NODE_ENV`获得，如果都不可用，则默认为`development`
* 可以通过`命令行`设置`env`变量：
        
        BABEL_ENV=production YOUR_COMMAND_HERE

    或：

        export BABEL_ENV=production
        YOUR_COMMAND_HERE

* 在`webpack`的配置中，可以使用`webpack.DefinePlugin( ... )`配置`process.env`，参考：<ref://../build-tools/webpack.md.html>



## presets

### babel-presets-env

2016年发布，目的是让`编译器`来做更多的决定，解放繁琐的人工配置。该presets包含了几乎所有的presets，包含：

    babel-preset-es2015
    babel-preset-es2016
    babel-preset-es2017
    babel-preset-latest

以及其他的es20xx，比如

    babel-preset-node5
    babel-preset-es2015-node

等。

### 升级至babel-presets-env

可以使用`babel-preset-env`插件<http://babeljs.io/docs/plugins/preset-env/>，由babel自动决定该使用哪些babel插件。

    $ npm install --save-dev babel-preset-env 

以下配置取代`preset-es2015,16,17,latest`：

    {
        "presets": [ "env" ]
    }

以下配置将按`当前`node版本来决定使用的babel插件，比如在`node 4.x`下，`箭头函数`不转译；而在`node 0.12`下，会转译箭头函数。

    { 
        "presets": [
            [ "env", {
                "targets": {
                    "node": "current"
                }
            }]
        ]
    }





### ES2015 and beyond

> 已过期，可用`babel-presets-env`代替

    npm install --save-dev babel-preset-es2015


### Stage-X

    npm install --save-dev babel-preset-stage-0
    npm install --save-dev babel-preset-stage-1
    npm install --save-dev babel-preset-stage-2
    npm install --save-dev babel-preset-stage-3

<ref://../ecma/ecma-262.md.html>




### Polyfill: 浏览器API抹平

    npm install --save-dev babel-polyfill


### JSX and Flow

    npm install --save-dev babel-preset-react


    .babelrc: 

    {
        presets: [ 'react' ]
    }


### 插件机制 

插件： <http://babeljs.io/docs/plugins/>




## babel-node

> 按某种方式先编译再执行。

    babel-node --preset es2015 script.js





