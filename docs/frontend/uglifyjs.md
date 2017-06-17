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
* `TreeTransformer`在`v2.6.2开始`有一个较大变化，不进行隐式节点clone


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

`UglifyJS.TreeWalker`类提供一种对ast进行遍历的方案，该类的构造器接收一个叫作`visitor`的函数作为参数。使用AST节点的`walk()`方法。

    function visitor( node, descend ) { ... }
    var walker = new UglifyJS.TreeWalker( visitor );
    ast.walk( walker );

### visitor访问器

    visitor: function( node, descend ) {
        ...
        return Boolean;
    }

* `node`: 当前访问的节点
* `descend`：是传入的一个访问器，不接收参数，用于对`当前节点`进行手工向下访问时调用，调用descend以后，visitor通常需要返回true来阻止继续向下遍历
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

这时的输出变为：

    Found string: a at 4,10
    Found string: b at 4,15
    Found string: z at 4,25
    Found string: c at 4,34





## TreeTransformer

> 是`TreeWalker`的一种特殊形式。使用AST节点的`transform()`方法。

### visitor访问器

    function before( node, descend ) { ... };
    function after( node ) { ... };
    var tt = new UglifyJS.TreeTransformer( before, after );
    var new_ast = ast.transform( tt );

* `before`访问器在节点的孩子节点被访问前执行，接收两个参数，`当前节点node`以及`descend函数`。
* `after`访问器接收一个参数，若`after`返回一个`非undefined`的值，则该值将用于取代当前节点
* `before`与`after`都是`可选参数`，但任何时刻都必须`至少提供一个`参数
* `descend`访问器函数接收两个参数，要访问的节点node以及`TreeWalker实例`

### before & after

情况1，如果`before访问器`返回一个`定义的值（新节点）`，则当前节点将被替换成该新节点，当前节点的孩子节点将不会再被处理，此时`after访问器`也不会被调用，有无定义after访问器都一样。


情况2，如果`before访问器`返回`undefined`或未提供（也即`null`），此时，分两种情况：
1. `after访问器存在`，根据uglify的版本，有两种情况：
    * `< 2.6.2`，将为当前节点`clone`一个新节点，遍历处理新节点的孩子节点，然后用`新节点`作为参数`调用after访问器`
    * `>= 2.6.2`，遍历处理当前节点的孩子节点，将当前节点作为参数`调用after访问器`，改变在于不再隐式进行clone
    代码变化具体参考，`去除隐式clone`，应该是使代码更容易理解：
    * <https://github.com/mishoo/UglifyJS2/blob/v2.6.1/lib/transform.js#L67>
    * <https://github.com/mishoo/UglifyJS2/blob/v2.6.2/lib/transform.js#L67>
2. `after访问器不存在`，将直接处理当前节点的孩子节点，而不clone之。





### 示例

#### clone ast

> 对`ast`进行`克隆`，获得新的ast

    var ast = UglifyJS.parse( "a = 1 + 2" );
    var deep_clone = new UglifyJS.TreeTransformer( function( node, descend ) {
            node = node.clone();
            // the descend function expects two arguments:
            // the node to dive into, and the tree walker
            // `this` here is the tree walker (=== deep_clone).
            // by descending into the *cloned* node, we keep the original intact
            descend( node, this );
            return node;
        });

    var ast2 = ast.transform( deep_clone );
    ast.body[ 0 ].body.left.name = "CHANGED";

    console.log( ast.print_to_string( { beautify: true } ) );
    console.log( ast2.print_to_string( { beautify: true } ) );

* 显式使用`node.clone()`以及`node.print_to_string()`
* `descend`方法的第二个参数，使用`this`代表walker示例本身

clone`方案二`，从上方before与after的关系可知，before未提供、after存在的情况下，会自动进行clone（`仅适用于v2.6.1及以下`版本）：

    ast.transform( new UglifyJS.TreeTransformer( null, function() {} ) );




#### 字符串复用

> 注：以下代码只适用于uglify-js v2.6.1及以下版本，新版本`不会隐式`进行`节点clone`。

    // in this hash we will map string to a variable name
    var strings = {};

    // here's the transformer:
    var consolidate = new UglifyJS.TreeTransformer( null, function( node ) {
        if ( node instanceof UglifyJS.AST_Toplevel ) {
            // since we get here after the toplevel node was processed,
            // that means at the end, we'll just create the var definition,
            // or better yet, "const", and insert it as the first statement.
            var defs = new UglifyJS.AST_Const( {
                definitions: Object.keys(strings).map(function(key){
                    var x = strings[ key ];
                    return new UglifyJS.AST_VarDef( {
                        name  : new UglifyJS.AST_SymbolConst( { name: x.name } ),
                        value : x.node, // the original AST_String
                    } );
                })
            });
            node.body.unshift( defs );
            return node;
        }
        if ( node instanceof UglifyJS.AST_String ) {
            // when we encounter a string, we give it an unique
            // variable name (see the getStringName function below)
            // and return a symbol reference instead.
            return new UglifyJS.AST_SymbolRef( {
                start : node.start,
                end   : node.end,
                name  : getStringName(node).name,
            } );
        }
    } );

    var count = 0;
    function getStringName( node ) {
        var str = node.getValue(); // node is AST_String
        if ( strings.hasOwnProperty( str ) ) return strings[ str ];
        var name = "_" + ( ++count );
        return strings[ str ] = { name: name, node: node };
    }

    // now let's try it.
    var ast = UglifyJS.parse( function foo() {
        console.log( "This is a string" );
        console.log( "Another string" );
        console.log( "Now repeat" );
        var x = "This is a string", y = "Another string";
        var x = x + y + "Now repeat";
        alert( "Now repeat".length );
        alert( "Another string".length );
        alert( "This is a string".length );
    }.toString() );

    // transform and print
    var ast2 = ast.transform( consolidate );
    console.log( ast2.print_to_string( { beautify: true } ) );

    // also, the change is non-destructive; the original AST remains the same:
    console.log( "Original:" );
    console.log( ast.print_to_string( { beautify: true } ) );



    


