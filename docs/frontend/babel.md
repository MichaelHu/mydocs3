# Babel

> Babel is a JavaScript compiler.

`---- Use next generation JavaScript, today.`



## 一、初识


### 1.1 Install

    npm install --save-dev babel-cli



### 1.2 配置文件

`.babelrc`或者`package.json`皆可：

    {
        presets: []
    }




### 1.3 ES2015 and beyond

    npm install --save-dev babel-preset-es2015



### 1.4 Polyfill: 浏览器API抹平

    npm install --save-dev babel-polyfill


### 1.5 JSX and Flow

    npm install --save-dev babel-preset-react


    .babelrc: 

    {
        presets: [ 'react' ]
    }


### 1.6 插件机制 

插件： <http://babeljs.io/docs/plugins/>



