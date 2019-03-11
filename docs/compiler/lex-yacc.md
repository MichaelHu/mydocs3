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

* `接口`方法，需由外部定义：

        extern void yyerror(char *s);
        extern int yywrap (void );


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


