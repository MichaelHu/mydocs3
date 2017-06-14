# uglifyjs

> JavaScript parser / mangler / compressor / beautifier library for NodeJS.

## features

* 解析器、混淆器、压缩器、美化器
* site: <http://marijn.haverbeke.nl/uglifyjs>
* github1: <https://github.com/mishoo/UglifyJS>
* github2: <https://github.com/mishoo/UglifyJS2>
* API Refs: <https://github.com/mishoo/UglifyJS2#api-reference>
* 可运行于`node`，也可运行于`browser`
* `uglifyjs 3`是精简API版本，并`不向后兼容`版本2和版本1，`慎用!`


## install

    npm install uglify-js@3
    npm install uglify-js@2
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


## webpack插件

webpack`内建`插件，`webpack-optimize-UglifyJsPlugin`: <https://github.com/webpack/webpack/blob/master/lib/optimize/UglifyJsPlugin.js>
可以以该插件为范本，编写扩展功能的webpack插件。


## 深入uglifyjs

> JS编写的JS压缩器

`7个`重要概念：
* parser

        // 1. simple
        var ast = UglifyJS.parse( 'function sum( x, y ) { return x + y; }' );

        // 2. multiple files
        var ast = UglifyJS.parse(
                code
                , {
                    strict: true
                    , filename: 'input file name'
                    , toplevel: ast
                }
            );

        // 3. multiple files
        var ast = UglifyJS.parse( file1_content, { filename: 'file1.js' } );
        ast = UglifyJS.parse( file2_content, { filename: 'file2.js', toplevel: ast } );
        ast = UglifyJS.parse( file3_content, { filename: 'file3.js', toplevel: ast } );

        // 4. multiple files
        var ast = null;
        files.forEach( function( file ) {
            var code = fs.readFileSync( file, 'utf8' );
            ast = UglifyJS.parse( code, { filename: file, ast: ast } );
        } );


* code generator
    
        var stream = UglifyJS.OutputStream( { ...options... } );
        ast.print( stream );
        console.log( stream.toString() );

    * 代码生成器，针对ast执行`递归过程`重新生成代码
    * 每个AST节点都有一个`print()`方法，该方法必须接受`UglifyJS.OutputStream`的实例stream，并将结果保存在stream对象中，代码可通过`stream.toString()`方法输出。
    * 通过options的`beautify`选项，可以`将压缩代码格式化`

    stream的`options`：

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



* compressor ( optimizer )
* mangler
* scope analyzer

        toplevel.figure_out_scope();

    * 作用域分析器，只定义在`AST_Toplevel`节点中
    * 需要`手动调用`，调用结束会在某些类型的节点中补充`作用域相关`字段的值

* tree walker
* tree transformer


## AST类层次

* `AST_NOde`是基类，包含`start`, `end`属性
* 解析器( parser )只会实例化`最精确的子类`，所以在ast中你将发现总是`不存在AST_Node`类的实例，同样也没有`AST_Statement`类的实例
* `AST_Token`不属于AST类层次，它是`tokenizer`进行`词法分析`时输出的一个对象，包含以下有用信息：
        type
        file
        value
        line
        col
        pos
        endpos
        nlb                     // short for "newline before"
        comments_before


### 类层次图

    AST_Node (start end) "Base class of all AST nodes" {
        AST_Statement "Base class of all statements" {
            AST_Debugger "Represents a debugger statement"
            AST_Directive (value scope) 'Represents a directive, like "use strict";'
            AST_SimpleStatement (body) "A statement consisting of an expression, i.e. a = 1 + 2"
            AST_Block (body) "A body of statements (usually bracketed)" {
                AST_BlockStatement "A block statement"
                AST_Scope (directives variables functions uses_with uses_eval parent_scope enclosed cname) "Base class for all statements introducing a lexical scope" {
                    AST_Toplevel (globals) "The toplevel scope"
                    AST_Lambda (name argnames uses_arguments) "Base class for functions" {
                        AST_Function "A function expression"
                        AST_Defun "A function definition"
                    }
                }
                AST_Switch (expression) "A `switch` statement"
                AST_SwitchBranch "Base class for `switch` branches" {
                    AST_Default "A `default` switch branch"
                    AST_Case (expression) "A `case` switch branch"
                }
                AST_Try (bcatch bfinally) "A `try` statement"
                AST_Catch (argname) "A `catch` node; only makes sense as part of a `try` statement"
                AST_Finally "A `finally` node; only makes sense as part of a `try` statement"
            }
            AST_EmptyStatement "The empty statement (empty block or simply a semicolon)"
            AST_StatementWithBody (body) "Base class for all statements that contain one nested body: `For`, `ForIn`, `Do`, `While`, `With`" {
                AST_LabeledStatement (label) "Statement with a label"
                AST_DWLoop (condition) "Base class for do/while statements" {
                    AST_Do "A `do` statement"
                    AST_While "A `while` statement"
                }
                AST_For (init condition step) "A `for` statement"
                AST_ForIn (init name object) "A `for ... in` statement"
                AST_With (expression) "A `with` statement"
                AST_If (condition alternative) "A `if` statement"
            }
            AST_Jump "Base class for “jumps” (for now that's `return`, `throw`, `break` and `continue`)" {
                AST_Exit (value) "Base class for “exits” (`return` and `throw`)" {
                    AST_Return "A `return` statement"
                    AST_Throw "A `throw` statement"
                }
                AST_LoopControl (label) "Base class for loop control statements (`break` and `continue`)" {
                    AST_Break "A `break` statement"
                    AST_Continue "A `continue` statement"
                }
            }
            AST_Definitions (definitions) "Base class for `var` or `const` nodes (variable declarations/initializations)" {
                AST_Var "A `var` statement"
                AST_Const "A `const` statement"
            }
        }
        AST_VarDef (name value) "A variable declaration; only appears in a AST_Definitions node"
        AST_Call (expression args) "A function call expression" {
            AST_New "An object instantiation.  Derives from a function call since it has exactly the same properties"
        }
        AST_Seq (car cdr) "A sequence expression (two comma-separated expressions)"
        AST_PropAccess (expression property) 'Base class for property access expressions, i.e. `a.foo` or `a["foo"]`' {
            AST_Dot "A dotted property access expression"
            AST_Sub 'Index-style property access, i.e. `a["foo"]`'
        }
        AST_Unary (operator expression) "Base class for unary expressions" {
            AST_UnaryPrefix "Unary prefix expression, i.e. `typeof i` or `++i`"
            AST_UnaryPostfix "Unary postfix expression, i.e. `i++`"
        }
        AST_Binary (left operator right) "Binary expression, i.e. `a + b`" {
            AST_Assign "An assignment expression — `a = b + 5`"
        }
        AST_Conditional (condition consequent alternative) "Conditional expression using the ternary operator, i.e. `a ? b : c`"
        AST_Array (elements) "An array literal"
        AST_Object (properties) "An object literal"
        AST_ObjectProperty (key value) "Base class for literal object properties" {
            AST_ObjectKeyVal "A key: value object property"
            AST_ObjectSetter "An object setter property"
            AST_ObjectGetter "An object getter property"
        }
        AST_Symbol (scope name thedef) "Base class for all symbols" {
            AST_SymbolDeclaration (init) "A declaration symbol (symbol in var/const, function name or argument, symbol in catch)" {
                AST_SymbolVar "Symbol defining a variable" {
                    AST_SymbolFunarg "Symbol naming a function argument"
                }
                AST_SymbolConst "A constant declaration"
                AST_SymbolDefun "Symbol defining a function"
                AST_SymbolLambda "Symbol naming a function expression"
                AST_SymbolCatch "Symbol naming the exception in catch"
            }
            AST_Label (references) "Symbol naming a label (declaration)"
            AST_SymbolRef "Reference to some symbol (not definition/declaration)" {
                AST_LabelRef "Reference to a label symbol"
            }
            AST_This "The `this` symbol"
        }
        AST_Constant "Base class for all constants" {
            AST_String (value) "A string literal"
            AST_Number (value) "A number literal"
            AST_RegExp (value) "A regexp literal"
            AST_Atom "Base class for atoms" {
                AST_Null "The `null` atom"
                AST_NaN "The impossible value"
                AST_Undefined "The `undefined` value"
                AST_Infinity "The `Infinity` value"
                AST_Boolean "Base class for booleans" {
                    AST_False "The `false` atom"
                    AST_True "The `true` atom"
                }
            }
        }
    }


## TreeWalker

`UglifyJS.TreeWalker`类提供一种对ast进行遍历的方案，该类的构造器接收一个叫作`visitor`的函数作为参数。

### visitor访问器

    visitor: function( node, descend ) {
        ...
        return Boolean;
    }

* `node`: 当前访问的节点
* `descend`：是传入的一个访问器，用于对当前节点进行手工向下访问时调用，调用descend以后，visitor通常需要返回true来阻止继续向下遍历
* `return value`：如果返回true，TreeWalker本身将不再对node节点进行向下访问


### walker APIs

    walker.parent( n )
    walker.stack
    walker.find_parent( constructor )
    walker.in_boolean_context()
    walker.loopcontrol_target( label )
    walker.has_directive( dir )


### 示例

#### 打印函数名

> 打印ast中定义的函数名

    var code = "function foo() {\n\
            function x() {}\n\
            function y() {}\n\
        }\n\
        function bar() {}\
        ";
    var toplevel = UglifyJS.parse( code );
    var walker = new UglifyJS.TreeWalker( function( node ) {
        if ( node instanceof UglifyJS.AST_Defun ) {
            // string_template is a cute little function that UglifyJS uses for warnings
            console.log( 
                UglifyJS.string_template( 
                    "Found function {name} at {line},{col}"
                    , {
                        name: node.name.name,
                        line: node.start.line,
                        col: node.start.col
                    }
                )
            );
        }
    } );
    toplevel.walk( walker );

输出为：

    Found function foo at 1,0
    Found function x at 2,8
    Found function y at 3,8
    Found function bar at 5,4


#### 打印参数列表中的字符串 

> 打印函数调用参数列表中的字符串 

    var code = "function f(){}\n\
            var x = 'a string';\n\
            y = 'foo' + 'bar' + x;\n\
            f('a', 'b', (x + 'z'), y, 'c');\n\
        ";
    var toplevel = UglifyJS.parse( code );
    var walker = new UglifyJS.TreeWalker( function( node ) {
        if ( node instanceof UglifyJS.AST_String ) {
            var p = walker.parent();
            if ( p instanceof UglifyJS.AST_Call && node !== p.expression ) {
                console.log( 
                    "Found string: %s at %d,%d"
                    , node.getValue()
                    , node.start.line, node.start.col
                );
            }
        }
    });
    toplevel.walk( walker );

输出为：

    Found string: a at 4,10
    Found string: b at 4,15
    Found string: c at 4,34

如果要将`z`也输出，使用`walker.find_parent( contructor )`：

    var code = "function f(){}\n\
            var x = 'a string';\n\
            y = 'foo' + 'bar' + x;\n\
            f('a', 'b', (x + 'z'), y, 'c');\n\
        ";
    var toplevel = UglifyJS.parse( code );
    var walker = new UglifyJS.TreeWalker( function( node ) {
        if ( node instanceof UglifyJS.AST_String ) {
            var p = walker.find_parent( UglifyJS.AST_Call );
            if ( p && node !== p.expression ) {
                console.log(
                    "Found string: %s at %d,%d"
                    , node.getValue()
                    , node.start.line, node.start.col
                );
            }
        }
    });
    toplevel.walk( walker );

这是的输出变为：

    Found string: a at 4,10
    Found string: b at 4,15
    Found string: z at 4,25
    Found string: c at 4,34





## TreeTransformer

    function before( node, descend ) { ... };
    function after( node ) { ... };
    var tt = new UglifyJS.TreeTransformer( before, after );
    var new_ast = ast.transform( tt );


