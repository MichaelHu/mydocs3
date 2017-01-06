# postcss

> Transforming styles with JS plugins

* site: <http://postcss.org>
* github: <https://github.com/postcss/postcss>


## Features

* 可以运行于服务端，比如Ruby、PHP等
* 静态站点的静态build适用
* `插件`方式在多种框架下可用


## Usage

### webpack

`postcss-loader`

`webpack.config.js`:

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


`postcss.config.js`:

	module.exports = {
	  plugins: [
		require('precss')
		require('autoprefixer')
	  ]
	}



### npm

postcss-cli: <https://github.com/postcss/postcss-cli>

    npm install postcss-cli	

    postcss --use autoprefixer -c options.json -o main.css css/*.css




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


