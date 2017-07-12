# postcss

> Transforming styles with JS plugins

## Resources

* site: <http://postcss.org>
* github: <https://github.com/postcss/postcss>


## Features

* 提高代码可读性，支持vender前缀自动添加
* 使用`cssnext`插件，支持提前使用最新语法，而不需要浏览器支持
* 使用`css modules`，永远不用担心类名过于通用化，导致互相覆盖 
* 使用`stylelint`，编译时提示代码错误
* 使用`LostGrid`，支持强大的网格信息
* 可以运行于服务端，比如Ruby、PHP等
* 静态站点的静态build适用
* `插件`方式在多种框架下可用


## Usage

### webpack

#### postcss-loader

> `webpack.config.js`:

	module.exports = {
		module: {
			loaders: [
				{
					test: /\.css$/,
					loaders: [
						'style-loader',
						'css-loader?importLoaders=1',
						'postcss-loader'
					]
				}
			]
		}
	}


> `postcss.config.js`:

	module.exports = {
	  plugins: [
		require('precss')
		require('autoprefixer')
	  ]
	}



### npm

postcss-cli: <https://github.com/postcss/postcss-cli>

    $ npm install postcss-cli	
    $ postcss --use autoprefixer -c options.json -o main.css css/*.css


### gulp

...



## Runners

* Grunt: `grund-postcss`
* HTML: `posthtml-postcss`
* Stylus: `poststylus`
* Rollup: `rollup-plugin-postcss`
* Brunch: `postcss-brunch`
* Broccoli: `broccoli-postcss`
* Meteor: `postcss`
* ENB: `enb-postcss`
* Fly: `fly-postcss`
* Start: `start-postcss`
* Connect/Express: `postcss-middleware`



## 插件

> more than 200 plugins.


### 插件列表

plugins: <https://github.com/postcss/postcss#plugins>


### postcss-modules

> A PostCSS plugin to use CSS Modules everywhere. Not only at the client side.

<https://github.com/css-modules/postcss-modules>



### cssnext

> Use tomorrow's CSS syntax, today.

postcss-cssnext: <https://github.com/MoOx/postcss-cssnext>

有点像babel


