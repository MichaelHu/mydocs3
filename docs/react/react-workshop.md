# react workshop

> 使用react开发前端项目的记录


## 项目创建


### 手工创建

使用`npm`来安装相关代码包。

    npm init
    
    # react
    npm install --save react react-dom
    
    # babel compiler
    npm install --save-dev babel-core babel-loader babel-preset-react babel-preset-es2015
    
    # webpack
    npm install --save-dev webpack

    # webpack plugins
    npm install --save-dev html-webpack-plugin

    # webpack-dev-server
    npm install --save-dev webpack-dev-server


创建`webpack.config.js`，初始内容如下，随着项目的进展再行更新：

	var path = require( 'path' );

	var appRootDir = __dirname;
	var srcDir = appRootDir + '/src'; 
	var buildDir = appRootDir + '/build'; 

	var webpack = require( 'webpack' );
	var HtmlWebpackPlugin = require( 'html-webpack-plugin' );

	module.exports = {
		entry: srcDir + '/app.js'
		, output: {
			path: buildDir
			, filename: '[name].js'
		}
		, module: {
			loaders: [
				{
					test: /\.jsx?$/
					, loader: 'babel?presets[]=es2015,presets[]=react'
				}
			]
		}
		, plugins: [
			new HtmlWebpackPlugin( {
				filename: 'index.html'
				, template: srcDir + '/index.html'
			} )
		]
		, devServer: {
			contentBase: buildDir
			, host: '0.0.0.0'
			, port: 9100
			, historyApiFallback: true
			, proxy: {
				'/notes': {
					target: 'http://127.0.0.1:8700'
					// , pathRewrite: { '^/notes': '/abc/def' }
				}
				, '/note': {
					target: 'http://127.0.0.1:8700'
					// , pathRewrite: { '^/notes': '/abc/def' }
				}
			}
		}

	};

    

    




### 使用create-react-app

> `fb`开发的快速构建SPA的脚手架工具

`github`: <https://github.com/facebookincubator/create-react-app.git>

    npm install create-react-app
    ./node_modules/.bin/create-react-app hello-world

安装成功的提示：

	Success! Created abc at /Users/hudamin/projects/git/inspire/react/abc
	Inside that directory, you can run several commands:

	  npm start
		Starts the development server.

	  npm run build
		Bundles the app into static files for production.

	  npm test
		Starts the test runner.

	  npm run eject
		Removes this tool and copies build dependencies, configuration files
		and scripts into the app directory. If you do this, you can’t go back!

	We suggest that you begin by typing:

	  cd abc
	  npm start

	Happy hacking!


* `create-react-app`项目有一个子package，叫`react-scripts`，提供相关的脚本和配置。

    github: <https://github.com/facebookincubator/create-react-app/tree/master/packages/react-scripts>

* 没有明显的能看到`webpack`, `Babel`和`EsLint`的影子，原因是`react-scripts`进行了封装
* `react-scripts`这个`subpackage`，提供了很全的`SPA`的配置模板，也算是`解决方案`的一种



## 问题

### this -> undefined

由`箭头函数`导致，本质原因是`babel-preset-react`对以下写法的不兼容，所以要避免以下写法。

    var ArticleList = React.createClass( {

        ...
     
        , render: () => {           // render: function render() {
            console.log( this );    //    console.log( undefined ); // 被解析成了字符串undefined
            return (
                <ul>
                {
                    this.state.items.map( function( item) {
                        return <li>{item.title}</li>;
                    } )
                }
                </ul>
            );
        }

        ...

    } );


### getInitialState()

> Warning: getInitialState was defined on IndexPage, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?

    带有`getInitialState`方法的React类，不要使用`class`关键字来定义


### constructor and super

	ERROR in ./src/components/ArticleList/index.js
	Module build failed: SyntaxError: missing super() call in constructor

	   6 | class ArticleListItem extends Component {
	   7 |
	>  8 |     constructor() {
		 |     ^
	   9 |     }
	  10 |
	  11 |     render() {

`constructor`构造函数，必须调用`super()`来调用父类构造函数，否则编译报错。


### shouldComponentUpdate()

如果重写，`必须返回`true或false。




## 对接数据请求

使用webpack-dev-server的`proxy`





## 使用ajax

> `jQuery`，新版支持自定义打包

### CLI 

    npm install --save jquery

### js

    import $ from 'jquery';



## 使用css [ todo ]

sass, less


### react-bootstrap

* site: <https://react-bootstrap.github.io>
* github: <https://github.com/react-bootstrap/react-bootstrap>
* components: <https://react-bootstrap.github.io/components.html>

`react-bootstrap`: 使用react方式重新实现的bootstrap组件库，不依赖bootstrap.js

    npm install --save react-bootstrap

    
#### usage

1. CommonJS

        var Alert = require( 'react-bootstrap/lib/Alert' );
        var Alert = require( 'react-bootstrap' ).Alert;
    
2. ES6

        import Button from 'react-bootstrap/lib/Button';
        import { Button } from 'react-bootstrap';

3. AMD

        define( [ 'react-bootstrap' ], function( ReactBootstrap ) {
            var Alert = ReactBootstrap.Alert;
            ...
        } );


#### 引入css

> 没有包含css文件，所以需要自行引入。

有两种方案：

1. 使用cdn

		<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">

		<!-- Optional theme -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css">

2. 自定义下载：<http://getbootstrap.com/customize/>

todo



### style, css, sass

    npm install --save-dev style-loader css-loader node-sass sass-loader 

* 文件扩展名：`.scss`

#### css-loader

* 由css-modules提供的`:local`, `:global`等功能
* 以及`composes` rule的使用 

具体可以参考`webpack`, `css-modules`文章。




## 使用路由

理论上讲，就是如何将URL的变化反映到组件的展示上。

这种效果的实现，可以有多种办法，可以手写，也可以使用Backbone之类提供路由机制的框架，还可以使用配套的`react-router`。

    npm install --save react-router


### browserHistory

	import { browserHistory } from 'react-router';

	...
	browserHistory.push( location );
	...










