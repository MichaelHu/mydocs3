# character escape

> 字符转义方式汇总

> changelog: 170602, 170504, 170418

<style type="text/css">
.highlight { background-color: #ff0; }
</style>

## ascii table

> ascii码表，可以通过终端输入`man ascii`快速获得

### 八进制 ( octal ) 

     000 nul  001 soh  002 stx  003 etx  004 eot  005 enq  006 ack  007 bel
     010 bs   011 ht   012 nl   013 vt   014 np   015 cr   016 so   017 si
     020 dle  021 dc1  022 dc2  023 dc3  024 dc4  025 nak  026 syn  027 etb
     030 can  031 em   032 sub  033 esc  034 fs   035 gs   036 rs   037 us
     040 sp   041  !   042  "   043  #   044  $   045  %   046  &   047  '
     050  (   051  )   052  *   053  +   054  ,   055  -   056  .   057  /
     060  0   061  1   062  2   063  3   064  4   065  5   066  6   067  7
     070  8   071  9   072  :   073  ;   074  <   075  =   076  >   077  ?
     100  @   101  A   102  B   103  C   104  D   105  E   106  F   107  G
     110  H   111  I   112  J   113  K   114  L   115  M   116  N   117  O
     120  P   121  Q   122  R   123  S   124  T   125  U   126  V   127  W
     130  X   131  Y   132  Z   133  [   134  \   135  ]   136  ^   137  _
     140  `   141  a   142  b   143  c   144  d   145  e   146  f   147  g
     150  h   151  i   152  j   153  k   154  l   155  m   156  n   157  o
     160  p   161  q   162  r   163  s   164  t   165  u   166  v   167  w
     170  x   171  y   172  z   173  {   174  |   175  }   176  ~   177 del

### 十六进制 ( hexadecimal )

     00 nul   01 soh   02 stx   03 etx   04 eot   05 enq   06 ack   07 bel
     08 bs    09 ht    0a nl    0b vt    0c np    0d cr    0e so    0f si
     10 dle   11 dc1   12 dc2   13 dc3   14 dc4   15 nak   16 syn   17 etb
     18 can   19 em    1a sub   1b esc   1c fs    1d gs    1e rs    1f us
     20 sp    21  !    22  "    23  #    24  $    25  %    26  &    27  '
     28  (    29  )    2a  *    2b  +    2c  ,    2d  -    2e  .    2f  /
     30  0    31  1    32  2    33  3    34  4    35  5    36  6    37  7
     38  8    39  9    3a  :    3b  ;    3c  <    3d  =    3e  >    3f  ?
     40  @    41  A    42  B    43  C    44  D    45  E    46  F    47  G
     48  H    49  I    4a  J    4b  K    4c  L    4d  M    4e  N    4f  O
     50  P    51  Q    52  R    53  S    54  T    55  U    56  V    57  W
     58  X    59  Y    5a  Z    5b  [    5c  \    5d  ]    5e  ^    5f  _
     60  `    61  a    62  b    63  c    64  d    65  e    66  f    67  g
     68  h    69  i    6a  j    6b  k    6c  l    6d  m    6e  n    6f  o
     70  p    71  q    72  r    73  s    74  t    75  u    76  v    77  w
     78  x    79  y    7a  z    7b  {    7c  |    7d  }    7e  ~    7f del

### 十进制 ( decimal )

       0 nul    1 soh    2 stx    3 etx    4 eot    5 enq    6 ack    7 bel
       8 bs     9 ht    10 nl    11 vt    12 np    13 cr    14 so    15 si
      16 dle   17 dc1   18 dc2   19 dc3   20 dc4   21 nak   22 syn   23 etb
      24 can   25 em    26 sub   27 esc   28 fs    29 gs    30 rs    31 us
      32 sp    33  !    34  "    35  #    36  $    37  %    38  &    39  '
      40  (    41  )    42  *    43  +    44  ,    45  -    46  .    47  /
      48  0    49  1    50  2    51  3    52  4    53  5    54  6    55  7
      56  8    57  9    58  :    59  ;    60  <    61  =    62  >    63  ?
      64  @    65  A    66  B    67  C    68  D    69  E    70  F    71  G
      72  H    73  I    74  J    75  K    76  L    77  M    78  N    79  O
      80  P    81  Q    82  R    83  S    84  T    85  U    86  V    87  W
      88  X    89  Y    90  Z    91  [    92  \    93  ]    94  ^    95  _
      96  `    97  a    98  b    99  c   100  d   101  e   102  f   103  g
     104  h   105  i   106  j   107  k   108  l   109  m   110  n   111  o
     112  p   113  q   114  r   115  s   116  t   117  u   118  v   119  w
     120  x   121  y   122  z   123  {   124  |   125  }   126  ~   127 del




## javascript

### js RegExp

特殊字符转义序列：`\ooo`, `\xhh`, `\uhhhh` 

    // Support: Android <=4.0 only
    // Make sure we trim BOM and NBSP
    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g

模式引用：`\1-\9`

    console.log( /(['"])[^'"]*\1/.test( '"string"' ) )
    true
    console.log( /(['"])[^'"]*\1/.test( "'string'" ) )
    true


模式空间引用：`$&, $1-$9`

    if ( /[?&]name=([^&]*)/.test( location.href ) ) {
        return {
            key: RegExp.$1
            , all: RegExp[ '$&' ]
        }; 
    }


### 字符串转义字符

同RegExp，支持`\ooo`, `\xhh`, `\uhhhh`，如下所示：

    // %的三种表示方法
    console.log( '\045\x25\u0025' )
    %%%

    // HTML字符 - 上角标数字字符
    console.log( '\xb9\xb2\xb3' )
    ¹²³

    // HTML字符 - 比例字符
    console.log( '\xbc\xbd\xbe' )
    ¼½¾

    // HTML字符 - 其他一些特殊字符
    console.log( '\x99\xa5\xa7\xa9\xae\xb1' )
    ¥§©®±




### js escape

> 对字符串按`Unicode-16`编码进行`%xx`或`%uxxxx`转义

    console.log( escape( 'a百度' ) );
    a%u767E%u5EA6

* ecma-262: <https://tc39.github.io/ecma262/#sec-escape-string>
* 生成新版本的`十六进制`表示的转义字符串，输入也是一个字符串
* 码点`不大于0xFF`的，且不包含以下字串中任一字符的，使用`%xx`；码点`大于0xFF`的，使用`%uxxxx`；以下字串包含的任一字符原样输出
        ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@*_+-./
    不转义字符为：`字母、数字，以及7个特殊字符`。
* 默认string的内部表示为`Unicode-16`编码



### js encodeURI

> URI encoding，对字符串按`UTF-8`编码进行`%xx`转义

    console.log( encodeURIComponent( '百度' ) );
    %E7%99%BE%E5%BA%A6

* 使用`utf-8`编码




## awk regexp

> `\ooo`, `\xhh`，或原字符

    awk '/\141/{print}'
    awk '/\x61/{print}'
    awk '/百/{print}'

貌似不支持`\uhhhh`




## vim magic

> 以下转义序列可以出现在`search pattern`和`substitue pattern`中

    \%d	    match specified decimal character (eg \%d123)
    \%x	    match specified hex character (eg \%x2a)
    \%o	    match specified octal character (eg \%o040)
    \%u	    match specified multibyte character (eg \%u20ac)
    \%U	    match specified large multibyte character (eg \%U1234abcd)

    \%[]    A sequence of optionally matched atoms 
            /r\%[ead]           matches 'r', 're', 'rea', 'read'
            /\<r\%[[eo]ad]\>    matches 'r', 're', 'ro', 'rea', 'roa', 'read', 'road'

    ...

如果需要在substitute的`replacement string`中使用码点表示的字符，可以使用`\= expression`方式，比如：

    " 将两个半角空格替换成一个全角空格
    :s/\%d32\%d32/\= "\u3000"/g

更多具体内容，参考<ref://../vim/vim.md.html>的`Searching and Replacing`节的`pattern`部分。
而其中`全角空格`等特殊字符，参考本文的`html entity`节。


## sed

> `无码点转义序列`，需要`直接输入`，只提供常用的特殊转义

    backslash          \\
    alert              \a
    form-feed          \f
    carriage-return    \r
    newline            \n
    tab                \t
    vertical tab       \v


### s command

    [2addr]s/regular expression/replacement/flags

#### pattern

`regular expression`部分有两种模式：`简单正则`，`扩展正则`。
* `简单正则`：默认情况下为简单正则。比如`+`, `{n,m}`等都是不支持的
* `扩展正则`：扩展正则基本上可以使用`Perl正则兼容`的格式，但需要添加以下`开关选项`

        platform        switch option
        ================================
        Mac             -E
        Linux           -r, --regexp-extended

#### replacement

其中的`replacement`部分：
    
    &       匹配正则的整个字符串
    \1-\9   匹配正则子模式（序号为1-9）的字符串

`replacement`中，如果需要输入换行符，则需要在`实际`换行符前加`反斜线`，比如

    # Perl正则模式，mac下用-E，linux下用-r
    sed -Ee '1s/^.*$/"use catch";\
    &/' file

将对文件的第一行前面添加一行，该新行的内容为`"use catch";`





## html entity

### space entity

    name        id ( decimal )      escape ( hex )  description
    -----------------------------------------------------------------------------
    &nbsp;      &#160;              %u20            non-breaking space
    &ensp;      &#8194;             %u2002          en space
    &emsp;      &#8195;             %u2003          em space
    &thinsp;    &#8201;             %u2009          thin space
                &#12288;            %u3000          full-width space( 全角空格 )

* `non-breaking space`:|<span class="highlight">&#160;</span>|
* `en space`:|<span class="highlight">&#8194;</span>|
* `em space`:|<span class="highlight">&#8195;</span>|
* `thin space`:|<span class="highlight">&#8201;</span>|
* `全角空格`：|<span class="highlight">&#12288;</span>|


### other entity

    &zwnj;      &#8204;             zero width non-joiner
    &zwj;       &#8205;             zero width joiner
    &ndash;     &#8211;             en dash
    &mdash;     &#8212;             em dash
    &trade;     &#8482;


另外可参考：<ref://../other/common-characters.md.html>

## css

    font-family: "Hiragino Sans GB","Microsoft Yahei",'\5B8B\4F53';



