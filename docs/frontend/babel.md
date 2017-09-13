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


## 初识


### Installation

    $ npm install --save-dev babel-cli
    $ ./node_modules/.bin/babel -h
    $ npm install babel-preset-es2015
    $ ./node_modules/.bin/babel --presets es2015 main.js


### Configurations

`.babelrc`或者`package.json`皆可：

    {
        presets: []
    }

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





