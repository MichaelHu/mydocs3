# lex-yacc

> 编译器生成工具

## Resources

* flex: <ref://./pdf/flex.pdf>
* bison: <ref://./pdf/bison.pdf>
* LexAndYaccTutorial: <ref://./pdf/LexAndYaccTutorial.pdf>


## Features

* `lex, flex`: A fast scanner generator，是快速`扫描器`的生成器
* `yacc`: yacc ( Yet Another Compiler Compiler )，是一个经典的生成`语法分析器`的工具
* `bison`: The Yacc-compatible Parser Generator，`yacc兼容的`解析器生成器，能取代yacc
* 是一种`高阶`编译器，编译器的编译器


## Tips

* `flex`生成`Scanner`，`bison`生成`Parser`
* 相关文件扩展名：`.lex` - 词法分析配置文件，`.y` - 语法分析配置文件
* 旧版本是`lex-yacc`工具集，新版本是`flex-bison`工具集
* flex和bison编译器，会生成一些`全局`的变量、宏或者函数
* `.lex`文件中可用变量、宏、函数等：

        /* defined in itself */
        int yylineno; 
        char *yytext;
        int yylex(void);

        /* from parser */
        extern YYSTYPE yylval;
        extern YYLTYPE yylloc;

        int yywrap() {
            return 1;
        }

        /* make sure bison switch `-t --locations` is on*/

* `.y`文件中可用变量、宏、函数等：

        extern int yylex(void);
        extern void yyerror(char *s);

        int yyparse();
        yyerrok;
        yyclearin;

        /* The look-ahead symbol.  */
        int yychar;

        /* The semantic value of the look-ahead symbol.  */
        YYSTYPE yylval;

        /* Number of syntax errors so far.  */
        int yynerrs;

        /* Location data for the look-ahead symbol.  */
        YYLTYPE yylloc;

* `接口`方法，需由外部定义：

        extern void yyerror(char *s);
        extern int yywrap (void );


## yyloc

> 定义在Parser中

    typedef struct YYLTYPE
    {
        int first_line;
        int first_column;
        int last_line;
        int last_column;
    } YYLTYPE;

    YYLTYPE yylloc;


## yylex()

> 定义在Scanner中，实现`词法分析引擎`的功能

    #define YY_DECL int yylex (void)
    #endif

### Tips

* `YY_DECL`是yylex`函数原型`的宏
* `yylex()`函数体是由flex`自动`生成的
* 在`.lex.c`中定义
* 包含各类`状态转移`相关的逻辑


## yyparse()

> 定义在Parser中，实现`语法分析引擎`的功能

* `yyparse()`函数体是由bison`自动`生成的
* 在`.y.c`中定义
* 包含各类`状态转移`相关的逻辑，包含yyreduce



flex/bison

c, markdown

php


## markdown-slides

markdown.lex

markdown.y

yyparse

yyloc

yytext

$$, $1, $2

%{

%}


