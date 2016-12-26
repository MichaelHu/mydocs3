# uglifyjs

> JavaScript parser / mangler / compressor / beautifier library for NodeJS.

* 解析器、混淆器、压缩器、美化器

* site: <http://marijn.haverbeke.nl/uglifyjs>
* github1: <https://github.com/mishoo/UglifyJS>
* github2: <https://github.com/mishoo/UglifyJS2>
* API Refs: <https://github.com/mishoo/UglifyJS2#api-reference>


## install

    npm install uglify-js
    npm install uglify-js@1


## CLI usage

参考：<https://github.com/mishoo/UglifyJS2#usage>

	uglifyjs /home/doe/work/foo/src/js/file1.js \
			 /home/doe/work/foo/src/js/file2.js \
			 -o foo.min.js \
			 --source-map foo.min.js.map \
			 --source-map-root http://foo.com/src \
			 -p 5 -c -m

* `--comments`: 保持版权注释。默认为包含`@license`或`@preserve`的注释。还可以是其他值：

	`all`，保留所有注释；`正则表达式`，保持正则匹配的注释。



## API usage

	var UglifyJS = require( 'uglify-js' );

	var result = UglifyJS.minify(
		[ './src/sigma.utils.layoutNew.js' ]
		, {
			output: {
				"comments": /@license/
			}
		}
	);

	console.log( result.code );



## options

### default compressor options

* 详细选项说明： <https://github.com/mishoo/UglifyJS2#compressor-options>
* Compress options: <http://lisperator.net/uglifyjs/compress>

以下为默认选项：

	sequences     : true,  // join consecutive statemets with the “comma operator”
	properties    : true,  // optimize property access: a["foo"] → a.foo
	dead_code     : true,  // discard unreachable code
	drop_debugger : true,  // discard “debugger” statements
	unsafe        : false, // some unsafe optimizations (see below)
	conditionals  : true,  // optimize if-s and conditional expressions
	comparisons   : true,  // optimize comparisons
	evaluate      : true,  // evaluate constant expressions
	booleans      : true,  // optimize boolean expressions
	loops         : true,  // optimize loops
	unused        : true,  // drop unused variables/functions
	hoist_funs    : true,  // hoist function declarations
	hoist_vars    : false, // hoist variable declarations
	if_return     : true,  // optimize if-s followed by return/continue
	join_vars     : true,  // join var declarations
	cascade       : true,  // try to cascade `right` into `left` in sequences
	side_effects  : true,  // drop side-effect-free statements
	warnings      : true,  // warn about potentially dangerous optimizations/code
	global_defs   : {}     // global definitions



### default output options


* 详细选项说明： <https://github.com/mishoo/UglifyJS2#beautifier-options>
* Output options: <http://lisperator.net/uglifyjs/codegen>

以下为默认输出选项：

	indent_start  : 0,     // start indentation on every line (only when `beautify`)
	indent_level  : 4,     // indentation level (only when `beautify`)
	quote_keys    : false, // quote all keys in object literals?
	space_colon   : true,  // add a space after colon signs?
	ascii_only    : false, // output ASCII-safe? (encodes Unicode characters as ASCII)
	inline_script : false, // escape "</script"?
	width         : 80,    // informative maximum line width (for beautified output)
	max_line_len  : 32000, // maximum line length (for non-beautified output)
	ie_proof      : true,  // output IE-safe code?
	beautify      : false, // beautify output?
	source_map    : null,  // output a source map
	bracketize    : false, // use brackets every time?
	comments      : false, // output comments?
	semicolons    : true,  // use semicolons to separate statements? (otherwise, newlines)

