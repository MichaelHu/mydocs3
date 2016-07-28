# babel

> Babel is a JavaScript compiler.

`---- Use next generation JavaScript, today.`



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



