# lex-yacc

> 编译器生成工具

## Resources

* flex: <ref://./pdf/flex.pdf>
* bison: <ref://./pdf/bison.pdf>
* LexAndYaccTutorial: <ref://./pdf/LexAndYaccTutorial.pdf>
* site: <http://dinosaur.compilertools.net> 
* gnu bison page: <https://www.gnu.org/software/bison/>


## Features

* `lex, flex`: A fast scanner generator，是快速`扫描器`的生成器
* `yacc`: yacc ( Yet Another Compiler Compiler )，是一个经典的生成`语法分析器`的工具
* `bison`: The Yacc-compatible Parser Generator，`yacc兼容的`解析器生成器，能取代yacc
* 是一种`高阶`编译器，编译器的编译器


## Tips

> 语法规则相关

* `语法规则`的解析过程，`从起始规则开始演进`，一开始状态栈是空的。每一条语法规则`可用于归约`，其`前提是`从起始规则开始演进，在某一输入条件下，栈顶出现该规则的右侧模式
* 某一语法规则，`不能脱离`从起始规则开始`演进`的`路径或上下文`，也就是说语法规则不会凭空出现在状态栈顶，而是需要在特定上下文满足后才会出现，比如：

        line:
            H headertext LINEBREAK  { ... }

        headertext:
            headertext TEXT         { ... }
            | headertext link       { ... }
            | %empty                { ... }
            ;

    根据语法演进规则，`headertext`不会凭空出现在栈顶，其出现的栈顶的`前提条件`是通过演化，栈中已经存在`H`。也就是`不能`脱离语法规则的演进，而`孤立`的来`看待`每一条语法规则。


> 实现细节相关

* `flex`生成`Scanner`，`bison`生成`Parser`
* 相关文件扩展名：`.lex` - 词法分析配置文件，`.y` - 语法分析配置文件
* 旧版本是`lex-yacc`工具集，新版本是`flex-bison`工具集
* flex和bison编译器，会生成一些`全局`的变量、宏或者函数
* 通过提供`宏定制`、`外部函数定义`来提供功能扩展
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

* `接口`方法，必须由`外部定义`：

        extern void yyerror(char *s);
        extern int yywrap (void );

    `yyerror()`错误提示以后，解析器会进行`错误恢复`。

* `YYERROR_VERBOSE`宏可以打开详细错误提示，打开方式为在`.y`文件定义该宏即可：

        #define YYERROR_VERBOSE 

* `错误处理`相关宏：

        yyerrok;
        yyclearin;
        YYABORT;
        YYACCEPT;
        YYERROR;

        YYEMPTY
        YYEOR

        YYRECOVERING()

* 错误处理`相关token`：`error`，该token是一个`预定义`的token，当归约过程发生错误时，Parser会`自动产生`一个`名为error`的token，并可以使用已定义的包含error token的归约规则进行规约。这样就可以`精细化控制`各种可能发生的错误情况下的处理方式。比如markdown解析器对于`BACKTICK`相关归约规则的错误处理，如下：

        ...
        | BACKTICK codespan error  {
                blocknode_create(TAG_EOF, -2, 1, str_concat( "`", $2 ));
                blocklist_parse();
                YYABORT;
            }
        ...

        



## yylloc 和 yylval

> 定义在Parser中

    /**
     * 1. Parser.h中定义
     * 2. 固定定义 
     */
    typedef struct YYLTYPE
    {
        int first_line;
        int first_column;
        int last_line;
        int last_column;
    } YYLTYPE;

    /**
     * 1. Parser.h中定义
     * 2. 由.y文件的%union生成 
     */
    typedef union YYSTYPE
    {
        char *text;
        t_blocknode *node;
    } YYSTYPE;

    // Parser.c中定义yylloc及yylval
    YYLTYPE yylloc;
    YYSTYPE yylval;


## yylex()

> 定义在Scanner中，实现`词法分析引擎`的功能

    #define YY_DECL int yylex (void)
    #endif

### Tips

* `YY_DECL`是yylex`函数原型`的宏
* `yylex()`函数体是由flex`自动`生成的
* 在`.lex.c`中定义
* 包含各类`状态转移`相关的逻辑




## Lexer

> lex/flex

### Tips

* `输入文件格式`（3段）：定义段、规则段、用户代码段，段与段之间用`单行首列`开始的`%%`分隔

         definitions
         %%
         rules
         %%
         user code

* `定义段`和`规则段`中，任何缩进文本或者包含在`%{`和`%}`内的文本都会直接复制到输出中。需要注意的是，其中的`%{`和`%}`必须行首开始。
* 前两个段中，可以使用`%{`和`%}`包含的文本，用于直接拷贝至生成的代码文件（`*.lex.c`）中
* `最简单`的flex输入文件，只包含一个段分隔符：
        %%
    该输入生成的词法分析器，只是简单的将`输入拷贝至输出`。
* 规则的格式：

        pattern action

    每一条规则由`模式-行为对`组成。
* 规则模式，支持`扩展正则`（extended regular expression），正则功能非常完善，提供了`强大`的文本匹配能力，其他正则参考这里<ref://../frontend/regexp.md.html>
* `规则匹配方式`：
    1. 任何未匹配规则的文本`默认复制`到输出，不管是否在特定开始条件下，未匹配文本照样直接复制到输出。认为在扫描过程中，`存在扫描死锁`的情况，是一种理解误区，这是使用者非常容易犯的错误
    2. `最长匹配优先`，匹配文本最多的规则优先选中，与规则先后定义的`顺序无关`
    3. 达到`最长匹配`的规则`有多条`的情况下，定义顺序优先，`先定义的规则优先`选中
    4. 支持匹配状态管理，可以通过`BEGIN state;`进入一种新的匹配状态；如果需要支持状态栈，可`自行实现状态栈`来管理
* 表示文件结束的规则，使用`<<EOF>>`

        <<EOF>>                 文件结束符
        <s1, s2><<EOF>>         条件s1或s2下的文件结束符

* `r/s`，前向匹配
* trailing context( `/`或者`$` )，在一条规则中`至多出现一次`，比如：

        foo/bar         前向匹配规则，匹配后跟bar的foo
        foo/bar$        尾部上下文/和$同时出现，是不合法的！要求两者至多只出现一次

    同时，两者都`不能包含在组合`中，否则将`只表示其字面意义`，比如：

        (foo/bar)
        foo|(bar$)

* 开始条件`<s>`、行首`^`、文件结束符`<<EOF>>`只能出现在pattern首部，行尾`$`只能出现在末尾，否则都将只表示其字面意义

        a<s>
        foo|^abc
        foo<<EOF>>
        (foo$)

    以上例子中，`<s>`, `^`, `<<EOF>>`, `$`只表示其字面意义，而不是开始条件、行首、文件结束符、行尾。只能如下用法：

        <s>a
        ^abc|foo
        <<EOF>>
        foo$

* `|`可以支持pattern跨行，表示两个规则有一个满足即可执行对应action

        foo     |
        bar$            action

    以上使用`多条复杂规则跨行`编写。但如果规则不复杂，可以直接写成`正则表达式`的方式：

        foo|bar$        action

* 变量或者函数多以`yy_`或`yy`为前缀








### 整型定义

    /* Limits of integral types. */
    #ifndef INT8_MIN
    #define INT8_MIN               (-128)
    #endif
    #ifndef INT16_MIN
    #define INT16_MIN              (-32767-1)
    #endif
    #ifndef INT32_MIN
    #define INT32_MIN              (-2147483647-1)
    #endif
    #ifndef INT8_MAX
    #define INT8_MAX               (127)
    #endif
    #ifndef INT16_MAX
    #define INT16_MAX              (32767)
    #endif
    #ifndef INT32_MAX
    #define INT32_MAX              (2147483647)
    #endif
    #ifndef UINT8_MAX
    #define UINT8_MAX              (255U)
    #endif
    #ifndef UINT16_MAX
    #define UINT16_MAX             (65535U)
    #endif
    #ifndef UINT32_MAX
    #define UINT32_MAX             (4294967295U)
    #endif


### 所需类型

    typedef unsigned char YY_CHAR;
    typedef int yy_state_type;


### 所需变量

    FILE *yyin, *yyout;         // 输入输出文件句柄
    int lineno;                 // 当前行号
    char *yytext;               // 当前token文本
    int yy_flex_debug;          // 是否开启调试，使用yyset_debug( int debug_flag )来设置

    // 状态迁移数组
    yy_acclist
    yy_accept
    yy_ec
    yy_meta
    yy_base
    yy_def
    yy_nxt
    yy_chk


    // 静态全局变量
    static yy_state_type *yy_state_buf=0, *yy_state_ptr=0;
    static char *yy_full_match;
    static int yy_lp;
    static int yy_looking_for_trail_begin = 0;
    static int yy_full_lp;
    static int *yy_full_state;


### 所需函数

    // 静态函数
    static yy_state_type yy_get_previous_state (void );
    static yy_state_type yy_try_NUL_trans (yy_state_type current_state  );
    static int yy_get_next_buffer (void );
    static void yy_fatal_error (yyconst char msg[]  );

    static int yy_init_globals (void );

    // 提供全部变量的存取函数
    /* Accessor methods to globals.
       These are made visible to non-reentrant scanners for convenience. */
    int yylex_destroy (void );
    int yyget_debug (void );
    void yyset_debug (int debug_flag  );
    YY_EXTRA_TYPE yyget_extra (void );
    void yyset_extra (YY_EXTRA_TYPE user_defined  );
    FILE *yyget_in (void );
    void yyset_in  (FILE * in_str  );
    FILE *yyget_out (void );
    void yyset_out  (FILE * out_str  );
    yy_size_t yyget_leng (void );
    char *yyget_text (void );
    int yyget_lineno (void );
    void yyset_lineno (int line_number  );


### yy_buffer_state

* 使用宏`YY_BUFFER_STATE`来表示buffer状态所需的`数据类型`
* 包含以下字段：

        yy_input_file       FILE *          输入文件引用
        yy_ch_buf           char *          输入buffer
        yy_buf_pos          char *          输入buffer当前位置
        yy_buf_size         yy_size_t       输入buffer的字节尺寸
        yy_n_chars          yy_size_t       读入yy_ch_buf的字符数，不包含EOB字符
        yy_is_our_buffer    int             是否为该buffer的所有者
        yy_is_interactive   int             是否为一个交互式输入源，确保能在遇到换行后暂停获取输入
        yy_at_bol           int             是否应该在行首( beginning of a line )，是的话，`^`规则将会生效
        yy_bs_lineno        int             行号
        yy_bs_column        int             列号
        yy_fill_buffer      int             到达buffer末尾时，是否尝试填充
        yy_buffer_status    int             

* `EOB` - End Of Buffer?


> 相关代码如下：

    #ifndef YY_STRUCT_YY_BUFFER_STATE
    #define YY_STRUCT_YY_BUFFER_STATE
    struct yy_buffer_state
    	{
    	FILE *yy_input_file;
    
    	char *yy_ch_buf;		/* input buffer */
    	char *yy_buf_pos;		/* current position in input buffer */
    
    	/* Size of input buffer in bytes, not including room for EOB
    	 * characters.
    	 */
    	yy_size_t yy_buf_size;
    
    	/* Number of characters read into yy_ch_buf, not including EOB
    	 * characters.
    	 */
    	yy_size_t yy_n_chars;
    
    	/* Whether we "own" the buffer - i.e., we know we created it,
    	 * and can realloc() it to grow it, and should free() it to
    	 * delete it.
    	 */
    	int yy_is_our_buffer;
    
    	/* Whether this is an "interactive" input source; if so, and
    	 * if we're using stdio for input, then we want to use getc()
    	 * instead of fread(), to make sure we stop fetching input after
    	 * each newline.
    	 */
    	int yy_is_interactive;
    
    	/* Whether we're considered to be at the beginning of a line.
    	 * If so, '^' rules will be active on the next match, otherwise
    	 * not.
    	 */
    	int yy_at_bol;
    
        int yy_bs_lineno; /**< The line count. */
        int yy_bs_column; /**< The column count. */
    
    	/* Whether to try to fill the input buffer when we reach the
    	 * end of it.
    	 */
    	int yy_fill_buffer;
    
    	int yy_buffer_status;
    
    #define YY_BUFFER_NEW 0
    #define YY_BUFFER_NORMAL 1
    	/* When an EOF's been seen but there's still some text to process
    	 * then we mark the buffer as YY_EOF_PENDING, to indicate that we
    	 * shouldn't try reading from the input source any more.  We might
    	 * still have a bunch of tokens to match, though, because of
    	 * possible backing-up.
    	 *
    	 * When we actually see the EOF, we change the status to "new"
    	 * (via yyrestart()), so that the user can continue scanning by
    	 * just pointing yyin at a new input file.
    	 */
    #define YY_BUFFER_EOF_PENDING 2
    
    	};
    #endif /* !YY_STRUCT_YY_BUFFER_STATE */

    #ifndef YY_TYPEDEF_YY_BUFFER_STATE
    #define YY_TYPEDEF_YY_BUFFER_STATE
    typedef struct yy_buffer_state *YY_BUFFER_STATE;
    #endif




## Parser

### 使用的变量

    /* The look-ahead symbol.  */
    int yychar;

    /* The semantic value of the look-ahead symbol.  */
    YYSTYPE yylval;

    /* Number of syntax errors so far.  */
    int yynerrs;
    /* Location data for the look-ahead symbol.  */
    YYLTYPE yylloc;

### yyparse()

> 定义在Parser中，实现`语法分析引擎`的功能

* `yyparse()`函数体是由bison`自动`生成的
* 在`.y.c`中定义
* 包含各类`状态转移`相关的逻辑，包含yyreduce


### 预定义的宏

    #define yyerrok		(yyerrstatus = 0)
    #define yyclearin	(yychar = YYEMPTY)

    #define YYEMPTY		(-2)
    #define YYEOF		0
    
    #define YYACCEPT	goto yyacceptlab
    #define YYABORT		goto yyabortlab
    #define YYERROR		goto yyerrorlab

    #define YYFAIL		goto yyerrlab
    #define YYRECOVERING()  (!!yyerrstatus)





### 可定制的宏

#### YYLEX_PARAM

> 通过宏定义`YYLEX_PARAM`，可以支持`带参数的yylex()`函数调用

    #ifdef YYLEX_PARAM
    # define YYLEX yylex (YYLEX_PARAM)
    #else
    # define YYLEX yylex ()
    #endif

#### YYDEBUG

若提供宏定义`YYDEBUG`，内部将提供以下用于调试信息输出的`4个预定义宏`

    YYDPRINTF(Args)
    YY_SYMBOL_PRINT(Title, Type, Value, Location)
    YY_STACK_PRINT(Bottom, Top)
    YY_REDUCE_PRINT(Rule)


具体代码如下：

    /* Enable debugging if requested.  */
    #if YYDEBUG
    
    # ifndef YYFPRINTF
    #  include <stdio.h> /* INFRINGES ON USER NAME SPACE */
    #  define YYFPRINTF fprintf
    # endif
    
    # define YYDPRINTF(Args)			\
    do {						\
      if (yydebug)					\
        YYFPRINTF Args;				\
    } while (YYID (0))
    
    # define YY_SYMBOL_PRINT(Title, Type, Value, Location)			  \
    do {									  \
      if (yydebug)								  \
        {									  \
          YYFPRINTF (stderr, "%s ", Title);					  \
          yy_symbol_print (stderr,						  \
    		  Type, Value, Location); \
          YYFPRINTF (stderr, "\n");						  \
        }									  \
    } while (YYID (0))
    
    
    /*--------------------------------.
    | Print this symbol on YYOUTPUT.  |
    `--------------------------------*/
    
    /*ARGSUSED*/
    #if (defined __STDC__ || defined __C99__FUNC__ \
         || defined __cplusplus || defined _MSC_VER)
    static void
    yy_symbol_value_print (FILE *yyoutput, int yytype, YYSTYPE const * const yyvaluep, YYLTYPE const * const yylocationp)
    #else
    static void
    yy_symbol_value_print (yyoutput, yytype, yyvaluep, yylocationp)
        FILE *yyoutput;
        int yytype;
        YYSTYPE const * const yyvaluep;
        YYLTYPE const * const yylocationp;
    #endif
    {
      if (!yyvaluep)
        return;
      YYUSE (yylocationp);
    # ifdef YYPRINT
      if (yytype < YYNTOKENS)
        YYPRINT (yyoutput, yytoknum[yytype], *yyvaluep);
    # else
      YYUSE (yyoutput);
    # endif
      switch (yytype)
        {
          default:
    	break;
        }
    }
    
    
    /*--------------------------------.
    | Print this symbol on YYOUTPUT.  |
    `--------------------------------*/
    
    #if (defined __STDC__ || defined __C99__FUNC__ \
         || defined __cplusplus || defined _MSC_VER)
    static void
    yy_symbol_print (FILE *yyoutput, int yytype, YYSTYPE const * const yyvaluep, YYLTYPE const * const yylocationp)
    #else
    static void
    yy_symbol_print (yyoutput, yytype, yyvaluep, yylocationp)
        FILE *yyoutput;
        int yytype;
        YYSTYPE const * const yyvaluep;
        YYLTYPE const * const yylocationp;
    #endif
    {
      if (yytype < YYNTOKENS)
        YYFPRINTF (yyoutput, "token %s (", yytname[yytype]);
      else
        YYFPRINTF (yyoutput, "nterm %s (", yytname[yytype]);
    
      YY_LOCATION_PRINT (yyoutput, *yylocationp);
      YYFPRINTF (yyoutput, ": ");
      yy_symbol_value_print (yyoutput, yytype, yyvaluep, yylocationp);
      YYFPRINTF (yyoutput, ")");
    }
    
    /*------------------------------------------------------------------.
    | yy_stack_print -- Print the state stack from its BOTTOM up to its |
    | TOP (included).                                                   |
    `------------------------------------------------------------------*/
    
    #if (defined __STDC__ || defined __C99__FUNC__ \
         || defined __cplusplus || defined _MSC_VER)
    static void
    yy_stack_print (yytype_int16 *bottom, yytype_int16 *top)
    #else
    static void
    yy_stack_print (bottom, top)
        yytype_int16 *bottom;
        yytype_int16 *top;
    #endif
    {
      YYFPRINTF (stderr, "Stack now");
      for (; bottom <= top; ++bottom)
        YYFPRINTF (stderr, " %d", *bottom);
      YYFPRINTF (stderr, "\n");
    }
    
    # define YY_STACK_PRINT(Bottom, Top)				\
    do {								\
      if (yydebug)							\
        yy_stack_print ((Bottom), (Top));				\
    } while (YYID (0))
    
    
    /*------------------------------------------------.
    | Report that the YYRULE is going to be reduced.  |
    `------------------------------------------------*/
    
    #if (defined __STDC__ || defined __C99__FUNC__ \
         || defined __cplusplus || defined _MSC_VER)
    static void
    yy_reduce_print (YYSTYPE *yyvsp, YYLTYPE *yylsp, int yyrule)
    #else
    static void
    yy_reduce_print (yyvsp, yylsp, yyrule)
        YYSTYPE *yyvsp;
        YYLTYPE *yylsp;
        int yyrule;
    #endif
    {
      int yynrhs = yyr2[yyrule];
      int yyi;
      unsigned long int yylno = yyrline[yyrule];
      YYFPRINTF (stderr, "Reducing stack by rule %d (line %lu):\n",
    	     yyrule - 1, yylno);
      /* The symbols being reduced.  */
      for (yyi = 0; yyi < yynrhs; yyi++)
        {
          fprintf (stderr, "   $%d = ", yyi + 1);
          yy_symbol_print (stderr, yyrhs[yyprhs[yyrule] + yyi],
    		       &(yyvsp[(yyi + 1) - (yynrhs)])
    		       , &(yylsp[(yyi + 1) - (yynrhs)])		       );
          fprintf (stderr, "\n");
        }
    }
    
    # define YY_REDUCE_PRINT(Rule)		\
    do {					\
      if (yydebug)				\
        yy_reduce_print (yyvsp, yylsp, Rule); \
    } while (YYID (0))
    
    /* Nonzero means print parse trace.  It is left uninitialized so that
       multiple parsers can coexist.  */
    int yydebug;
    #else /* !YYDEBUG */
    # define YYDPRINTF(Args)
    # define YY_SYMBOL_PRINT(Title, Type, Value, Location)
    # define YY_STACK_PRINT(Bottom, Top)
    # define YY_REDUCE_PRINT(Rule)
    #endif /* !YYDEBUG */


#### YYINITDEPTH

> 解析栈初始大小

    /* YYINITDEPTH -- initial size of the parser's stacks.  */
    #ifndef	YYINITDEPTH
    # define YYINITDEPTH 200
    #endif


#### YYMAXDEPTH

    /* YYMAXDEPTH -- maximum size the stacks can grow to (effective only
       if the built-in stack extension method is used).
    
       Do not make this value too large; the results are undefined if
       YYSTACK_ALLOC_MAXIMUM < YYSTACK_BYTES (YYMAXDEPTH)
       evaluated with infinite-precision integer arithmetic.  */
    
    #ifndef YYMAXDEPTH
    # define YYMAXDEPTH 10000
    #endif


#### YYERROR_VERBOSE

    #if YYERROR_VERBOSE
    
    # ifndef yystrlen
    #  if defined __GLIBC__ && defined _STRING_H
    #   define yystrlen strlen
    #  else
    /* Return the length of YYSTR.  */
    #if (defined __STDC__ || defined __C99__FUNC__ \
         || defined __cplusplus || defined _MSC_VER)
    static YYSIZE_T
    yystrlen (const char *yystr)
    #else
    static YYSIZE_T
    yystrlen (yystr)
        const char *yystr;
    #endif
    {
      YYSIZE_T yylen;
      for (yylen = 0; yystr[yylen]; yylen++)
        continue;
      return yylen;
    }
    #  endif
    # endif
    
    # ifndef yystpcpy
    #  if defined __GLIBC__ && defined _STRING_H && defined _GNU_SOURCE
    #   define yystpcpy stpcpy
    #  else
    /* Copy YYSRC to YYDEST, returning the address of the terminating '\0' in
       YYDEST.  */
    #if (defined __STDC__ || defined __C99__FUNC__ \
         || defined __cplusplus || defined _MSC_VER)
    static char *
    yystpcpy (char *yydest, const char *yysrc)
    #else
    static char *
    yystpcpy (yydest, yysrc)
        char *yydest;
        const char *yysrc;
    #endif
    {
      char *yyd = yydest;
      const char *yys = yysrc;
    
      while ((*yyd++ = *yys++) != '\0')
        continue;
    
      return yyd - 1;
    }
    #  endif
    # endif
    
    # ifndef yytnamerr
    /* Copy to YYRES the contents of YYSTR after stripping away unnecessary
       quotes and backslashes, so that it's suitable for yyerror.  The
       heuristic is that double-quoting is unnecessary unless the string
       contains an apostrophe, a comma, or backslash (other than
       backslash-backslash).  YYSTR is taken from yytname.  If YYRES is
       null, do not copy; instead, return the length of what the result
       would have been.  */
    static YYSIZE_T
    yytnamerr (char *yyres, const char *yystr)
    {
      if (*yystr == '"')
        {
          YYSIZE_T yyn = 0;
          char const *yyp = yystr;
    
          for (;;)
    	switch (*++yyp)
    	  {
    	  case '\'':
    	  case ',':
    	    goto do_not_strip_quotes;
    
    	  case '\\':
    	    if (*++yyp != '\\')
    	      goto do_not_strip_quotes;
    	    /* Fall through.  */
    	  default:
    	    if (yyres)
    	      yyres[yyn] = *yyp;
    	    yyn++;
    	    break;
    
    	  case '"':
    	    if (yyres)
    	      yyres[yyn] = '\0';
    	    return yyn;
    	  }
        do_not_strip_quotes: ;
        }
    
      if (! yyres)
        return yystrlen (yystr);
    
      return yystpcpy (yyres, yystr) - yyres;
    }
    # endif
    
    /* Copy into YYRESULT an error message about the unexpected token
       YYCHAR while in state YYSTATE.  Return the number of bytes copied,
       including the terminating null byte.  If YYRESULT is null, do not
       copy anything; just return the number of bytes that would be
       copied.  As a special case, return 0 if an ordinary "syntax error"
       message will do.  Return YYSIZE_MAXIMUM if overflow occurs during
       size calculation.  */
    static YYSIZE_T
    yysyntax_error (char *yyresult, int yystate, int yychar)
    {
      int yyn = yypact[yystate];
    
      if (! (YYPACT_NINF < yyn && yyn <= YYLAST))
        return 0;
      else
        {
          int yytype = YYTRANSLATE (yychar);
          YYSIZE_T yysize0 = yytnamerr (0, yytname[yytype]);
          YYSIZE_T yysize = yysize0;
          YYSIZE_T yysize1;
          int yysize_overflow = 0;
          enum { YYERROR_VERBOSE_ARGS_MAXIMUM = 5 };
          char const *yyarg[YYERROR_VERBOSE_ARGS_MAXIMUM];
          int yyx;
    
    # if 0
          /* This is so xgettext sees the translatable formats that are
    	 constructed on the fly.  */
          YY_("syntax error, unexpected %s");
          YY_("syntax error, unexpected %s, expecting %s");
          YY_("syntax error, unexpected %s, expecting %s or %s");
          YY_("syntax error, unexpected %s, expecting %s or %s or %s");
          YY_("syntax error, unexpected %s, expecting %s or %s or %s or %s");
    # endif
          char *yyfmt;
          char const *yyf;
          static char const yyunexpected[] = "syntax error, unexpected %s";
          static char const yyexpecting[] = ", expecting %s";
          static char const yyor[] = " or %s";
          char yyformat[sizeof yyunexpected
    		    + sizeof yyexpecting - 1
    		    + ((YYERROR_VERBOSE_ARGS_MAXIMUM - 2)
    		       * (sizeof yyor - 1))];
          char const *yyprefix = yyexpecting;
    
          /* Start YYX at -YYN if negative to avoid negative indexes in
    	 YYCHECK.  */
          int yyxbegin = yyn < 0 ? -yyn : 0;
    
          /* Stay within bounds of both yycheck and yytname.  */
          int yychecklim = YYLAST - yyn + 1;
          int yyxend = yychecklim < YYNTOKENS ? yychecklim : YYNTOKENS;
          int yycount = 1;
    
          yyarg[0] = yytname[yytype];
          yyfmt = yystpcpy (yyformat, yyunexpected);
    
          for (yyx = yyxbegin; yyx < yyxend; ++yyx)
    	if (yycheck[yyx + yyn] == yyx && yyx != YYTERROR)
    	  {
    	    if (yycount == YYERROR_VERBOSE_ARGS_MAXIMUM)
    	      {
    		yycount = 1;
    		yysize = yysize0;
    		yyformat[sizeof yyunexpected - 1] = '\0';
    		break;
    	      }
    	    yyarg[yycount++] = yytname[yyx];
    	    yysize1 = yysize + yytnamerr (0, yytname[yyx]);
    	    yysize_overflow |= (yysize1 < yysize);
    	    yysize = yysize1;
    	    yyfmt = yystpcpy (yyfmt, yyprefix);
    	    yyprefix = yyor;
    	  }
    
          yyf = YY_(yyformat);
          yysize1 = yysize + yystrlen (yyf);
          yysize_overflow |= (yysize1 < yysize);
          yysize = yysize1;
    
          if (yysize_overflow)
    	return YYSIZE_MAXIMUM;
    
          if (yyresult)
    	{
    	  /* Avoid sprintf, as that infringes on the user's name space.
    	     Don't have undefined behavior even if the translation
    	     produced a string with the wrong number of "%s"s.  */
    	  char *yyp = yyresult;
    	  int yyi = 0;
    	  while ((*yyp = *yyf) != '\0')
    	    {
    	      if (*yyp == '%' && yyf[1] == 's' && yyi < yycount)
    		{
    		  yyp += yytnamerr (yyp, yyarg[yyi++]);
    		  yyf += 2;
    		}
    	      else
    		{
    		  yyp++;
    		  yyf++;
    		}
    	    }
    	}
          return yysize;
        }
    }
    #endif /* YYERROR_VERBOSE */



#### YYPARSE_PARAM

> `YYPARSE_PARAM`宏，支持带参数的`yyparse()`函数调用

    #ifdef YYPARSE_PARAM
    #if defined __STDC__ || defined __cplusplus
    int yyparse (void *YYPARSE_PARAM);
    #else
    int yyparse ();
    #endif
    #else /* ! YYPARSE_PARAM */
    #if defined __STDC__ || defined __cplusplus
    int yyparse (void);
    #else
    int yyparse ();
    #endif
    #endif /* ! YYPARSE_PARAM */



## shift/reduce conflicts

> 移进/归约冲突

### 典型移进/规约冲突

    if_stmt:
        "if" expr "then" stmt
        | "if" expr "then" stmt "else" stmt
        ;

以上两条规则，存在以下冲突：

    rule 1: "if" expr "then" stmt .
    rule 2: "if" expr "then" stmt . "else" stmt

`.`表示当前所处位置，此时栈顶为`stmt`。根据语法规则，按`rule 1`归约，或按`rule 2`移进下一个token，都是合法的选择。

对于以上可规约也可移进的情况，我们称之为`移进规约冲突`。


### Tips

* 对于`移进归约冲突`，bison的默认解决方式是`选择移进`
* 除非指定算符优先级：

        %left           yacc定义
        %righ           yacc定义
        %nonassoc       yacc定义
        %precedence     bison新增

* 同一行优先级一样，后定义的行比先定义的行优先级更高 
* 将一个算符的优先级赋予一条语法规则

        ...
        %left '+' '-'
        %left '*'
        %left UMINUS

        exp:
            ...
            | exp '-' exp
                ...
            | '-' exp %prec UMINUS


### output文件解析

    state 39

        7 block: block_p .
       18 block_p: block_p . line_p

        TEXT              shift, and go to state 6
        SPECIALCHAR       shift, and go to state 7
        LINK              shift, and go to state 16
        BACKTICK          shift, and go to state 17
        EXCLAMATION       shift, and go to state 24
        LEFTSQUARE        shift, and go to state 25
        UNDERSCORE        shift, and go to state 26
        STAR              shift, and go to state 27
        DOUBLESTAR        shift, and go to state 30
        DOUBLEUNDERSCORE  shift, and go to state 31

        TEXT              [reduce using rule 7 (block)]
        SPECIALCHAR       [reduce using rule 7 (block)]
        LINK              [reduce using rule 7 (block)]
        BACKTICK          [reduce using rule 7 (block)]
        EXCLAMATION       [reduce using rule 7 (block)]
        LEFTSQUARE        [reduce using rule 7 (block)]
        UNDERSCORE        [reduce using rule 7 (block)]
        STAR              [reduce using rule 7 (block)]
        DOUBLESTAR        [reduce using rule 7 (block)]
        DOUBLEUNDERSCORE  [reduce using rule 7 (block)]
        $default          reduce using rule 7 (block)

        line_p          go to state 109
        inlineelements  go to state 60
        inlineelement   go to state 61
        link            go to state 62

* 当前状态为`state 39`
* `规则7`和`规则18`发生移进/归约冲突
* 冲突后，`默认`采取`移进`措施




## reduce/reduce conflicts

> 归约/归约冲突

### Tips

* `归约/归约冲突`，需要避免，通常预示语法规则存在问题
* 对于此类冲突，bison的默认解决方式是`选择先出现的规则`进行归约
* 可以通过指定规则优先级（`%prec`）的方式来明确指出`规约优先级`







## 其他


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


