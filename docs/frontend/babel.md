# babel

> Babel is a JavaScript compiler.

`---- Use next generation JavaScript, today.`

* ES新标准的火箭助推器
* 很牛逼的东西
* 程序员的`福音`，代码编写和浏览器运行环境独立开来，即使浏览器不支持，也不影响使用新语法编写程序
* `docs`: <http://babeljs.io/docs/usage/babelrc/>

## 初识


### Install

    npm install --save-dev babel-cli



### 配置文件

`.babelrc`或者`package.json`皆可：

    {
        presets: []
    }




### ES2015 and beyond

    npm install --save-dev babel-preset-es2015


### Stage-X

    npm install --save-dev babel-preset-stage-0
    npm install --save-dev babel-preset-stage-1
    npm install --save-dev babel-preset-stage-2
    npm install --save-dev babel-preset-stage-3




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





