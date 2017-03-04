# 模板引擎

## underscore

> 只是js库提供的一个子功能而已，underscore不是一个纯粹的模板引擎

* github: <https://github.com/jashkenas/underscore>
* site: <http://underscorejs.org/>

### api 

	_.template(templateString, [settings]) 

### Usage

	var compiled = _.template("hello: <%= name %>");
	compiled({name: 'moe'});
	=> "hello: moe"

	var template = _.template("<b><%- value %></b>");
	template({value: '<script>'});
	=> "<b>&lt;script&gt;</b>"

	var compiled = _.template("<% print('Hello ' + epithet); %>");
	compiled({epithet: "stooge"});
	=> "Hello stooge"



## handlebars

* site: <http://handlebarsjs.com>
* github: <https://github.com/wycats/handlebars.js/>
* 和`underscore.js`挺像

模板格式：

	<div class="entry">
	  <h1>{{title}}</h1>
	  <div class="body">
		{{body}}
	  </div>
	</div>





## artTemplate

> `性能卓越`的js模板引擎

* <https://github.com/aui/artTemplate>
* 两种语法使用`不同`的脚本文件。
* `aui`个人作品，`4k+` starts
* `2015年11月`有更新


### 使用

#### 主文件

* 简洁语法版(2.7K)：<https://raw.github.com/aui/artTemplate/master/dist/template.js>
* 原生语法版(2.3K)：<https://raw.github.com/aui/artTemplate/master/dist/template-native.js>


#### 模板

	<script id="test" type="text/html">
	<h1>{{title}}</h1>
	<ul>
		{{each list as value i}}
			<li>索引 {{i + 1}} ：{{value}}</li>
		{{/each}}
	</ul>
	</script>

#### 渲染

	var data = {
		title: '标签',
		list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
	};
	var html = template('test', data);
	document.getElementById('content').innerHTML = html;


### 语法

#### 简洁语法

    {{if admin}}
        {{include 'admin_content'}}

        {{each list}}
            <div>{{$index}}. {{$value.user}}</div>
        {{/each}}
    {{/if}}


#### 原生语法

    <%if (admin){%>
        <%include('admin_content')%>

        <%for (var i=0;i<list.length;i++) {%>
            <div><%=i%>. <%=list[i].user%></div>
        <%}%>
    <%}%>




## baiduTemplate

* github: <https://github.com/BaiduFE/BaiduTemplate>
* docs: <http://baidufe.github.io/BaiduTemplate/>
* fex出品, 最近更新`2013年4月份`

### example

	<!doctype html>
	<html>
	<head>
	<meta charset="utf-8"/>
	<title>test</title>

	<!-- 引入baiduTemplate -->
	<script type="text/javascript" src="./baiduTemplate.js"></script>

	</head>
	<body>
	<div id='result'></div>

	<!-- 模板1开始，可以使用script（type设置为text/html）来存放模板片段，并且用id标示 -->
	<script id="t:_1234-abcd-1" type="text/html">
	<div>
		<!-- 我是注释，语法均为Javascript原生语法，默认分割符为 <% %> ，也可以自定义，参见API部分 -->
		<!-- 输出变量语句，输出title -->
		<h1>title:<%=title%></h1>
		<!-- 判断语句if else-->
		<%if(list.length>1) { %>
			<h2>输出list，共有<%=list.length%>个元素</h2>
			<ul>
				<!-- 循环语句 for-->
				<%for(var i=0;i<5;i++){%>
					<li><%=list[i]%></li>
				<%}%>
			</ul>
		<%}else{%>
			<h2>没有list数据</h2>   
		<%}%>
	</div>  
	</script>
	<!-- 模板1结束 -->

	<!-- 使用模板 -->
	<script type="text/javascript">
	var data={
		"title":'欢迎使用baiduTemplate',
		"list":[
			'test1:默认支持HTML转义，如输出<script>，也可以关掉，语法<:=value> 详见API',
			'test2:',
			'test3:',
			'test4:list[5]未定义，模板系统会输出空'
		]
	};

	//使用baidu.template命名空间
	var bt=baidu.template;

	//可以设置分隔符
	//bt.LEFT_DELIMITER='<!';
	//bt.RIGHT_DELIMITER='!>';

	//可以设置输出变量是否自动HTML转义
	//bt.ESCAPE = false;

	//最简使用方法
	var html=bt('t:_1234-abcd-1',data);

	//渲染
	document.getElementById('result').innerHTML=html;
	</script>

	</body>
	</html>



## Jade

> 已经更名为`Pug`，原因是与商标`Jade`冲突
* <https://segmentfault.com/a/1190000000357534>


## Pug

> Pug – `robust, elegant, feature rich` template engine for Node.js 

* 面向`nodejs`设计
* github: <https://github.com/pugjs/pug>
* `docs`: <https://pugjs.org/api/getting-started.html>
* install: `npm install pug`

### examples

`template.pug`:

	p #{name}'s Pug source code!

`render1.js`:

	const pug = require('pug');

	// Compile the source code
	const compiledFunction = pug.compileFile('template.pug');

	// Render a set of data
	console.log(compiledFunction({
	  name: 'Timothy'
	}));
	// "<p>Timothy's Pug source code!</p>"

	// Render another set of data
	console.log(compiledFunction({
	  name: 'Forbes'
	}));
	// "<p>Forbes's Pug source code!</p>"

`render2.js`:

	const pug = require('pug');

	// Compile template.pug, and render a set of data
	console.log(pug.renderFile('template.pug', {
	  name: 'Timothy'
	}));
	// "<p>Timothy's Pug source code!</p>"


## ETpl

> `Enterprise Template`: ETPL是一个`强复用、灵活、高性能`的JavaScript模板引擎，适用于`浏览器端`或`Node环境`中视图的生成。

* github: <https://github.com/ecomfe/etpl>
* `2016年6月`尚有更新，`357` stars

### Install

	npm install etpl


### Usage

使用`ETPL`模块，对模板源代码进行`编译`，会能得到编译后的`function`

	var etpl = require('etpl');
	var render = etpl.compile('Hello ${name}!');

执行这个`function`，传入`数据对象`，就能得到模板执行的结果了

	var text = render({ name: 'etpl' });






## mustache

* github ( 1w+ stars ): <https://github.com/janl/mustache.js>
* 支持`nodejs`以及`浏览器`中使用
* 也有node命令行工具
        mustache dataView.json myTemplate.mustache > output.html
    写好模板，提供数据，直接命令行输出。
* 安装：
		$ npm install mustache --save
	or install with bower:
		$ bower install --save mustache

### example

#### basics

	<!DOCTYPE HTML>
	<html>
	<body onload="loadUser()">
		<div id="target">Loading...</div>
		<script id="template" type="x-tmpl-mustache">
		Hello {{ name }}!
		</script>
		<script>
		function loadUser() {
		  var template = $('#template').html();
		  Mustache.parse(template);   // optional, speeds up future uses
		  var rendered = Mustache.render(template, {name: "Luke"});
		  $('#target').html(rendered);
		}
		</script>
	</body>
	</html>


#### api

	var view = {
	  title: "Joe",
	  calc: function () {
		return 2 + 4;
	  }
	};

	var output = Mustache.render("{{title}} spends {{calc}}", view);






## Nunjucks

* `mozilla`出品，语法参考了`Jinja2`
* 开源项目`gitbook`使用的模板解决方案
* `github`: <https://github.com/mozilla/nunjucks>
* `node`: `$ npm install numjucks`
* `browser`: <https://mozilla.github.io/nunjucks/files/nunjucks.js> or <https://mozilla.github.io/nunjucks/files/nunjucks-slim.js>


## Jinja2

> Jinja2 is a modern and designer-friendly templating language for `Python`, modelled after `Django’s templates`. 

* `Python`平台使用
* site: <http://jinja.pocoo.org/>
* docs: <http://jinja.pocoo.org/docs/2.9/>

### example

#### basics

	<title>{% block title %}{% endblock %}</title>
	<ul>
	{% for user in users %}
	  <li><a href="{{ user.url }}">{{ user.username }}</a></li>
	{% endfor %}
	</ul>

#### inheritance

	{% extends "base.html" %}
	{% block title %}Index{% endblock %}
	{% block head %}
		{{ super() }}
		<style type="text/css">
			.important { color: #336699; }
		</style>
	{% endblock %}
	{% block content %}
		<h1>Index</h1>
		<p class="important">
		  Welcome to my awesome homepage.
		</p>
	{% endblock %}
