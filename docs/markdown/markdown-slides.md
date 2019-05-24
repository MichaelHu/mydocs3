# markdown-slides

## Features

* 基于`lex/yacc`编写的markdown编译器
* 支持`@s, @vs, @[...]`语法，能输出`reveal.js`兼容的代码
* 为`trubo-markdown` ( <ref://./turbo-markdown.md.html> ) 以及`fast-slides` ( <ref://../ppt-tools/fast-slides.md.html> ) 提供解析器
* 只支持`utf-8编码`的文件


## Resources

* **github**: <https://github.com/MichaelHu/markdown-slides>
* **turbo-markdown**: <ref://./turbo-markdown.md.html>
* **lex-yacc**: <ref://../compiler/lex-yacc.md.html>


## Versions

    v3.0
        支持预处理器

    v2.0
        支持抽象语法树，以便支持多种格式输出
        所有标签（包括块级、行级以及内联级节点）节点化
        提升代码可维护性
        更强的错误处理和恢复能力
        支持更多语法
            Hn支持链接、图片
            增加支持标准a/img/em/strong
            table支持缩进
            支持回车转义，反斜线后跟实体换行符，会在文本中插入<br>
        内存优化，提升性能
        支持MacOS/Win/Linux平台

        todo:
            @s/@vs支持
            缩进引用的行间距样式
            去掉index.md页面的特殊处理逻辑
            支持hr
            blockquote支持多级
            blockquote全系支持
            增加支持``
            支持JSON格式输出

    v1.0
        支持更多语法，如table, ```等
        增强错误处理和恢复能力
    v0.1.x
        支持部分语法


## 编译

* Win平台下，使用新版的**Cygwin**来进行编译


## 原理概述

    词法分析器，封装状态栈以提供复杂上下文词法

    逐行(line)处理
    行组成块(block)
    根据行的indent-level对块进行修正及分拆

    第一次扫描生成节点树，以TAG_ROOT为根，块节点为根节点的一级孩子节点
    块标签同属于一个级别，所有块标签构成根标签的一级孩子列表
        tag: TAG_ROOT; level: 0
        tag: TAG_H; level: 0;
        tag: TAG_BLOCK_BLANK; level: 0
        tag: TAG_BLOCK_UL; level: 0
        tag: TAG_UL; level: 0;
        tag: TAG_BLOCK_INDENT_OL; level: 1
        tag: TAG_BLOCK_INDENT_UL; level: 2
        tag: TAG_BLOCK_INDENT_OL; level: 4
        tag: TAG_BLOCK_INDENT_UL; level: 3
        tag: TAG_BLOCK_INDENT_OL; level: 4

    节点树的多次二次修正，得到正确描述文档结构的语法树
    对语法树进行解析输出

    语法错误恢复及处理是一个非常重要的专题
        根据逐行处理逻辑，错误恢复会在行级增加一条语法规则 block: error
        在该语法规则中会生成块级节点TAG_ERROR


## 数据结构

> 程序 = 数据结构 + 算法

以下为节点数据结构：

    typedef struct node {
        t_node_type type;
        t_tag tag;
        char *attr;
        int level;

        /* extended fields */
        int nops;
        char **ops;
        struct node *prev;
        struct node *next;
        struct node *parent;
        struct node *children;
    } t_node;


* 使用`二维双向链表`，兄弟节点链表用`next`, `prev`形成`同级双链`，父子节点间通过`children`, `parent`形成`上下双链`
* 链表结构，在存储需求上能有更大的可扩展性
* `双向链表`能大大提升节点处理过程中邻接信息的获取效率
* `level`代表节点的`缩进级别`，我们使用的节点树中，父子节点的缩进级别`不一定完全遵循父小子大`的原则，比如`TAG_BLOCK_X`与`TAG_X`，以及`TAG_BLOCK_INDENT_X`与`TAG_INDENT_X`，虽然存在父子关系，但它们的level相同
* `nops`与`ops`配合，支持节点`属性的扩展`



## 语法解析

语法解析基于`flex/bison`，通过一遍语法解析后，形成如下`语法树`。其中`所有块节点`形成一维列表，作为根节点（`TAG_ROOT`）的`一级孩子节点列表`。

    01 tag: TAG_ROOT; level: 0
    02 tag: TAG_H; level: 0;
    03 tag: TAG_BLOCK_BLANK; level: 0
    04 tag: TAG_BLANK; level: 0
    05 tag: TAG_BLANK; level: 0
    06 tag: TAG_BLANK; level: 0
    07 tag: TAG_BLOCK_UL; level: 0
    08 tag: TAG_UL; level: 0;
    09     tag: TAG_BLOCK_INDENT_OL; level: 1
    10     tag: TAG_INDENT_OL; level: 1;
    11         tag: TAG_BLOCK_INDENT_UL; level: 2
    12         tag: TAG_INDENT_UL; level: 2;
    13             tag: TAG_INDENT_UL; level: 3;
    14                 tag: TAG_BLOCK_INDENT_OL; level: 4
    15                 tag: TAG_INDENT_OL; level: 4;
    16                     tag: TAG_INDENT_OL; level: 5;
    17                     tag: TAG_INDENT_OL; level: 5;
    18                     tag: TAG_INDENT_OL; level: 5;
    19                         tag: TAG_INDENT_OL; level: 6;
    20                         tag: TAG_INDENT_OL; level: 6;
    21                 tag: TAG_INDENT_OL; level: 4;
    22                 tag: TAG_INDENT_OL; level: 4;
    23                 tag: TAG_INDENT_OL; level: 4;
    24             tag: TAG_BLOCK_INDENT_UL; level: 3
    25             tag: TAG_INDENT_UL; level: 3;
    26                 tag: TAG_BLOCK_INDENT_OL; level: 4
    27                 tag: TAG_INDENT_OL; level: 4;
    28                 tag: TAG_INDENT_OL; level: 4;
    29 tag: TAG_OL; level: 0
    30 tag: TAG_INLINE_ELEMENTS; level: 99999
    31     tag: TAG_INLINE_CODE; level: 99999
    32     tag: TAG_INLINE_TEXT; level: 99999
    33 tag: TAG_BLOCK_INDENT_TEXT; level: 1
    34 tag: TAG_INDENT_TEXT; level: 1
    35     tag: TAG_INLINE_ELEMENTS; level: 99999
    36         tag: TAG_INLINE_TEXT; level: 99999



### Tips

* 由于没有按缩进级别生成特定的token，`不同缩进级别`的标签可能`划归同一个块`。上述标签中，`行12-行13`的缩进级别不同，但划归了同一个块；`行15-行23`有`3种`不同缩进级别，但都划归了同一个块。
* 解释一下，如果`按缩进级别生成特定的token`，比如`TAG_INDENT_UL_1`、`TAG_INDENT_UL_2`、`...`、`TAG_INDENT_UL_n`，是能解决标签划归的问题，但是由于特定token是固定集合，只能支持指定的最高缩进层级，对于`支持无限缩进层级`的特性，就不好实现了。
* 实际实现的时候，采取不按缩进级别生成特定token的方案，以便`支持无限缩进层级`
* 语法解析`粗分类`，必然导致生成的节点树存在`层级混乱`的问题，我们需要在拿到节点树后，对其进行`二次修正`
* 不同缩进级别划归同一块的问题，通常出现在`缩进型`节点（也就是level大于0的节点）组成的列表中
* 目前**缩进型节点**主要为：`TAG_INDENT_UL`, `TAG_INDENT_OL`, `TAG_INDENT_TEXT`, `TAG_INDENT_PRE`, `TAG_QUOTE_P`(_indent level大于0时_)
* 另外很重要的一点需要注意的是，实际场景中，作为缩进型节点的`TAG_INDENT_PRE`，是不会出现划归问题的
* `行29-行36`中，出现了level为`99999`的标签，这就是前文提到的`TAG_INLINE_*`类型标签，因为他们是行内元素，所以他们`最终的level需要由上下文来决定`


### 一次解析后面临的问题

* level为`99999`的特定标签，需要根据上下文来决定，我们通过修正，将这些类型的标签节点的level设置为`父节点level加1`
* 由于划归混乱，导致节点树上缺少了必要的块节点，需要补全缺失的块节点，使得一个块节点只包含同级的行节点
* `补全块节点`，需要扫描行节点列表，兄弟行节点间如果出现level不一致，则需新增一个块节点
* 语法解析得到的节点树，所有块节点都是同一个级别的，都作为根节点的孩子节点。但对于缩进的情况，块节点可能成为其他节点的孩子节点。还需要对`块节点列表进行分级`。
* 另外，针对`空行隔开`的`同一类型块节点`，需要进行`合并`



> 因此，需要对语法解析获得的节点树进行`二次修正`


## 基于语法树的二次修正

> 以下`多个二次修正`步骤之间，可能存在依赖关系。特别是`块节点分级`操作，在`该操作前`，所有的块级节点都在一个列表中，属于根节点的一级孩子节点，而在`该操作后`，缩进型块节点会挂载至父级列表节点下，块节点间并不能保证都在同一级列表。修正步骤需要根据要求，`选择适当执行时机`。

### 修正标签level

语法解析过程中，`TAG_INLINE_*`或`TAG_TD`等类型节点，其缩进级别取决于其所在的上下文，所要在二次修正中做调整。所以在语法解析时，将其level设置为**99999**，以便在修正过程中识别。

#### 算法

    深度先序遍历节点树
        记遍历过程的当前节点为node，node的父亲节点为parent
        若node.level为NODE_LEVEL_SPECIAL
            若parent.level小于0
                node.level设置为0 + 1
            否则
                node.level设置为parent.level + 1


#### Tips

* level为`NODE_LEVEL_SPECIAL`的节点，为行内节点，`肯定存在父级节点`，所以可以省略父级节点存在性判断

以上语法解析处得到的节点列表中，`行29-行36`，经过修正后得到如下输出：

    29 tag: TAG_OL; level: 0
    30     tag: TAG_INLINE_ELEMENTS; level: 1
    31         tag: TAG_INLINE_CODE; level: 2
    32         tag: TAG_INLINE_TEXT; level: 2
    33     tag: TAG_BLOCK_INDENT_TEXT; level: 1
    34     tag: TAG_INDENT_TEXT; level: 1
    35         tag: TAG_INLINE_ELEMENTS; level: 2
    36             tag: TAG_INLINE_TEXT; level: 3





### 补全块节点

> 为非块节点`补全父级块节点`

#### 算法

    深度先序遍历节点树
        记遍历过程的当前节点为node，node的父亲节点为parent
        若node为非块节点
            若node.level与parent.level不匹配
                新建一个与node.level匹配的对应类型的block节点，记为new_uncle，并追加在parent后面
                将node作为首孩子节点挂载到last_uncle下（注：只更新node的prev及parent链接，保持其next和children链接不变）

#### Tips

* 只针对`非块节点`组成的`兄弟列表`，并且这些非块节点中真正`需要修正`的只是以上提到的`缩进型节点`
* 列表中，level不匹配的节点，需要挂载到`新创建`的块节点下
* 挂载过程，会将`节点及其后接兄弟节点`一起挂载到新的块节点下
* `重要`：补全块节点在第一次生成节点树后执行，此时所有的块节点都作为`TAG_ROOT节点`的`一级孩子节点`，`不存在`块节点作为行节点的孩子节点的情况
* `但是`，进行后续的块节点分级以后，是存在块节点作为行节点孩子节点的情况的
* 补全块节点的过程中，会`实时更新树结构`，新创建的块节点会在后续遍历过程中被访问到
* node作为首孩子节点挂载，后跟节点也一起挂载，而不是先把node节点先从原列表摘出来，再挂载，`严格来说是不太推荐的`，不过在这里并无影响。但`后方块节点分级`（`「  基于语法树的二次修正 -  块节点分级 」`: <ref://#anchor_2ca90>）却不能这么操作，它可能会导致`循环引用`






### 块节点分级

以下为补全块节点后的节点遍历输出：

    01 tag: TAG_BLOCK_UL; level: 0
    02 tag: TAG_UL; level: 0
    03     tag: TAG_BLOCK_INDENT_OL; level: 1
    04     tag: TAG_INDENT_OL; level: 1
    05         tag: TAG_BLOCK_INDENT_UL; level: 2
    06         tag: TAG_INDENT_UL; level: 2
    07             tag: TAG_BLOCK_INDENT_UL; level: 3
    08             tag: TAG_INDENT_UL; level: 3
    09                 tag: TAG_BLOCK_INDENT_OL; level: 4
    10                 tag: TAG_INDENT_OL; level: 4
    11                     tag: TAG_BLOCK_INDENT_OL; level: 5
    12                     tag: TAG_INDENT_OL; level: 5
    13                     tag: TAG_INDENT_OL; level: 5
    14                     tag: TAG_INDENT_OL; level: 5
    15                         tag: TAG_BLOCK_INDENT_OL; level: 6
    16                         tag: TAG_INDENT_OL; level: 6
    17                         tag: TAG_INDENT_OL; level: 6
    18                             tag: TAG_BLOCK_INDENT_TEXT; level: 7
    19                             tag: TAG_INDENT_TEXT; level: 7
    20                         tag: TAG_BLOCK_INDENT_TEXT; level: 6
    21                         tag: TAG_INDENT_TEXT; level: 6
    22                     tag: TAG_BLOCK_INDENT_TEXT; level: 5
    23                     tag: TAG_INDENT_TEXT; level: 5
    24                 tag: TAG_BLOCK_INDENT_TEXT; level: 4
    25                 tag: TAG_INDENT_TEXT; level: 4
    26             tag: TAG_BLOCK_INDENT_TEXT; level: 3
    27             tag: TAG_INDENT_TEXT; level: 3
    28             tag: TAG_BLOCK_INDENT_PRE; level: 3
    29             tag: TAG_INDENT_PRE; level: 3
    30             tag: TAG_INDENT_PRE; level: 3
    31             tag: TAG_INDENT_PRE; level: 3
    32             tag: TAG_BLOCK_INDENT_UL; level: 3
    33             tag: TAG_INDENT_UL; level: 3
    34                 tag: TAG_BLOCK_INDENT_OL; level: 4
    35                 tag: TAG_INDENT_OL; level: 4
    36                 tag: TAG_INDENT_OL; level: 4
    37 tag: TAG_BLOCK_BLANK; level: 0
    38 tag: TAG_BLANK; level: 0
    39 tag: TAG_BLOCK_UL; level: 0
    40 tag: TAG_UL; level: 0
    41     tag: TAG_BLOCK_INDENT_TEXT; level: 1
    42     tag: TAG_INDENT_TEXT; level: 1
    43     tag: TAG_INDENT_TEXT; level: 1
    44     tag: TAG_INDENT_TEXT; level: 1
    45 tag: TAG_BLOCK_BLANK; level: 0
    46 tag: TAG_BLANK; level: 0
    47     tag: TAG_BLOCK_INDENT_TEXT; level: 1
    48     tag: TAG_INDENT_TEXT; level: 1
    49     tag: TAG_INDENT_TEXT; level: 1


#### 块节点分级需求

* 到目前为止，节点树中，**块级节点**总是作为`TAG_ROOT`的`一级孩子节点`存在，**并没有真正体现节点之间的层次关系**
* `实际上`，**块节点**与其**下属的行级节点**之间的层次关系已经在前一步补全块节点中完成
* `所以`，**调整过程只需考虑块节点**，将其`挂载`至对应的父级节点（一般为行级节点）即可
* 实际上，除特殊的**空行块节点**以及**错误节点**外，**0级块节点是不需要调整的，只需针对1级及以上的块节点进行调整**。空行节点相关的层级调整，参考`「  基于语法树的二次修正 -  块节点分级 -  关于空行节点 」`: <ref://#anchor_bbc35>


#### 关于空行节点

> 块级节点：`TAG_BLOCK_BLANK`, 行级节点：`TAG_BLANK`；注意：目前**暂不包含引用块级空行节点**

* `空行节点`是一个非常特殊的节点，**在不同上下文有不同作用**
* 语法解析过程中，**较难判断空行所属的父级节点**，所以一次解析后的语法树中，所有的空行块节点的level都`默认设为0`
* 空行节点主要有`两个作用`：**1. 分隔块节点；2. 表示实体空行**
* 作为**块节点分隔**时，空行节点不输出，只用于决定是否开启新的块级节点
* 作为__实体内容__时，空行节点需要输出，比如`缩进代码行之间的空行`
* 可以通过`块节点分级`，对`空行块节点`进行层级归属修正，修正的原则为：__「空行块节点归属于离其最近的块级节点」__，并相应的`修正缩进级别`


> 综合以上分级需求，针对上述遍历输出，我们需作出以下调整：

        原始行      原父节点        新父节点 
        ==================================================
        03          TAG_ROOT        02
        05          TAG_ROOT        04
        07          TAG_ROOT        06
        09          TAG_ROOT        08
        11          TAG_ROOT        10
        15          TAG_ROOT        14
        18          TAG_ROOT        17
        20          TAG_ROOT        14
        22          TAG_ROOT        10
        24          TAG_ROOT        08
        26          TAG_ROOT        06
        28          TAG_ROOT        06
        32          TAG_ROOT        06
        34          TAG_ROOT        33
        41          TAG_ROOT        40
        45          TAG_ROOT        40
        47          TAG_ROOT        40

#### 关于错误节点

> **逐行错误恢复规则**中，会生成`TAG_ERROR`节点，该节点正常情况下不做任何输出，但需要对其层级所属进行调整

    01 TAG_UL; level: 0; parent: TAG_BLOCK_UL; parent-level: 0
    02     TAG_INLINE_ELEMENTS; level: 1; parent: TAG_UL; parent-level: 0
    03         TAG_INLINE_TEXT; level: 2; parent: TAG_INLINE_ELEMENTS; parent-level: 1
    04     TAG_BLOCK_INDENT_UL; level: 1; parent: TAG_ROOT; parent-level: -100
    05     TAG_INDENT_UL; level: 1; parent: TAG_BLOCK_INDENT_UL; parent-level: 1
    06         TAG_INLINE_ELEMENTS; level: 2; parent: TAG_INDENT_UL; parent-level: 1
    07             TAG_INLINE_TEXT; level: 3; parent: TAG_INLINE_ELEMENTS; parent-level: 2
    08         TAG_TABLE; level: 2; parent: TAG_ROOT; parent-level: -100
    09             TAG_TR; level: 3; parent: TAG_TABLE; parent-level: 2
    10                 TAG_TD; level: 4; parent: TAG_TR; parent-level: 3
    11                     TAG_INLINE_ELEMENTS; level: 5; parent: TAG_TD; parent-level: 4
    12                         TAG_INLINE_CODE; level: 6; parent: TAG_INLINE_ELEMENTS; parent-level: 5
    13                 TAG_TD; level: 4; parent: TAG_TR; parent-level: 3
    14                     TAG_INLINE_ELEMENTS; level: 5; parent: TAG_TD; parent-level: 4
    15                         TAG_INLINE_ELEMENTS; level: 6; parent: TAG_INLINE_ELEMENTS; parent-level: 5
    16                             TAG_INLINE_TEXT; level: 7; parent: TAG_INLINE_ELEMENTS; parent-level: 6
    17 TAG_ERROR; level: 0; parent: TAG_ROOT; parent-level: -100
    18 TAG_ERROR; level: 0; parent: TAG_ROOT; parent-level: -100
    19 TAG_ERROR; level: 0; parent: TAG_ROOT; parent-level: -100
    20 TAG_ERROR; level: 0; parent: TAG_ROOT; parent-level: -100
    21 TAG_ERROR; level: 0; parent: TAG_ROOT; parent-level: -100
    22 TAG_ERROR; level: 0; parent: TAG_ROOT; parent-level: -100
    23 TAG_ERROR; level: 0; parent: TAG_ROOT; parent-level: -100
    24 TAG_BLOCK_BLANK; level: 0; parent: TAG_ROOT; parent-level: -100
    25 TAG_BLANK; level: 0; parent: TAG_BLOCK_BLANK; parent-level: 0



#### 算法

> `void rearrange_block_nodes(t_node *root)`

    深度先序遍历节点树
        记遍历过程的当前节点为node，上一节点为prev_node（一般为行级或行内节点）
        若node为块节点（因为该算法只需调整块节点）
            若node.level大于0
                查找离prev_node节点最近的且level为node.level-1的祖先行级列表节点，记为p1
                若p1暂无孩子节点，则将node作为p1的孩子节点列表首节点（注意：只移动node节点，其后面为其他块级节点需要与node前方的节点拼接）
                若p1存在孩子节点，则将node移动到p1孩子节点列表的末尾（注意：同上，只移动node节点）
            若node为空行块级节点或者错误节点
                查找离prev_node节点最近的祖先块级节点、行级列表节点或单元格节点，记为p2
                若p2无孩子节点（比如TAG_ERROR），则不执行任何操作
                若p2为块级引用节点，也不执行任何操作（避免引用节点跨空行合并）
                若p2存在孩子节点，则将node移动到p2孩子节点列表的末尾（同上，只移动node节点），同时修正node的level


#### Tips

* markdown中，能`容纳其他块级节点`的节点主要有：`列表节点`、`引用节点`等，所以上方算法当**node.level大于0**时，需查找前一节点的`祖先行级列表节点`
* 对于空行块节点（**TAG_BLOCK_BLANK**）和错误节点（**TAG_ERROR**），在层级调整的时候，**与其他常规块级节点是存在差别**的，其可以放置到其**前序遍历顺序**的前一节点的最近`祖先块级节点、行级列表节点或者单元格节点`
* `TAG_ERROR`是**特殊**的块级节点，它是__没有孩子节点的块级节点__
* 经过块节点分级修正以后，与之前最大的差别就是，这一步后
    1. 块级节点`按层级挂载`
    2. `空行块节点及其子节点`从默认的level 0调整到`合适的level`





### 块节点合并

某些`相邻兄弟块`节点，需要合并成一个块节点，如`相邻`的两个`同类型列表块节点`，或者`相邻`的两个`同类型代码块节点`。以下列表是块节点分级后的得到的结果，其中`03和10`需合并成一个块节点，`20、24、36`需要合并成一个节点，`42、45、47、49、51`需要合并成一个节点，同时`39、53`也需要合并成一个节点：

    01 tag: TAG_BLOCK_UL; level: 0
    02 tag: TAG_UL; level: 0
    03     tag: TAG_BLOCK_INDENT_OL; level: 1
    04     tag: TAG_INDENT_OL; level: 1
    05         tag: TAG_BLOCK_INDENT_UL; level: 2
    06         tag: TAG_INDENT_UL; level: 2
    07         tag: TAG_INDENT_UL; level: 2
    08         tag: TAG_INDENT_UL; level: 2
    09         tag: TAG_INDENT_UL; level: 2
    10     tag: TAG_BLOCK_INDENT_OL; level: 1
    11     tag: TAG_INDENT_OL; level: 1
    12         tag: TAG_BLOCK_INDENT_UL; level: 2
    13         tag: TAG_INDENT_UL; level: 2
    14         tag: TAG_INDENT_UL; level: 2
    15         tag: TAG_INDENT_UL; level: 2
    16         tag: TAG_INDENT_UL; level: 2
    17 tag: TAG_H; level: 0
    18 tag: TAG_BLOCK_BLANK; level: 0
    19 tag: TAG_BLANK; level: 0
    20 tag: TAG_BLOCK_PRE; level: 0
    21 tag: TAG_PRE; level: 0
    22 tag: TAG_BLOCK_BLANK; level: 0
    23 tag: TAG_BLANK; level: 0
    24 tag: TAG_BLOCK_PRE; level: 0
    25 tag: TAG_PRE; level: 0
    26 tag: TAG_PRE; level: 0
    27 tag: TAG_PRE; level: 0
    28 tag: TAG_PRE; level: 0
    29 tag: TAG_PRE; level: 0
    30 tag: TAG_PRE; level: 0
    31 tag: TAG_PRE; level: 0
    32 tag: TAG_PRE; level: 0
    33 tag: TAG_PRE; level: 0
    34 tag: TAG_BLOCK_BLANK; level: 0
    35 tag: TAG_BLANK; level: 0
    36 tag: TAG_BLOCK_PRE; level: 0
    37 tag: TAG_PRE; level: 0
    38 tag: TAG_PRE; level: 0
    39 tag: TAG_UL; level: 0
    40     tag: TAG_INLINE_ELEMENTS; level: 1
    41         tag: TAG_INLINE_TEXT; level: 2
    42     tag: TAG_BLOCK_INDENT_PRE; level: 1
    43     tag: TAG_INDENT_PRE; level: 1
    44     tag: TAG_INDENT_PRE; level: 1
    45     tag: TAG_BLOCK_BLANK; level: 1
    46     tag: TAG_BLANK; level: 1
    47     tag: TAG_BLOCK_INDENT_PRE; level: 1
    48     tag: TAG_INDENT_PRE; level: 1
    49     tag: TAG_BLOCK_BLANK; level: 1
    50     tag: TAG_BLANK; level: 1
    51     tag: TAG_BLOCK_INDENT_PRE; level: 1
    52     tag: TAG_INDENT_PRE; level: 1
    53 tag: TAG_UL; level: 0
    54     tag: TAG_INLINE_ELEMENTS; level: 1
    55         tag: TAG_INLINE_TEXT; level: 2


#### 块节点合并重要说明

* `行级节点`在语法解析阶段已经完成合并，`不再需要`做合并。`需要合并的是块级节点`
* 上述合并的两个块节点，是`相邻的同类型兄弟块节点`。之所以可以如此简化实现，需要`归功于前方块节点分级`，块节点分析修正中对`空白块节点`进行了分级，使空白块节点挂载到最近的块级节点下，使得原本中间隔着空白块节点的两个同类型兄弟块节点变成相邻的兄弟节点。`「  基于语法树的二次修正 -  块节点分级 」`: <ref://#anchor_2ca90>


#### 块节点合并需求

> A类块节点：`相邻不合并`
    TAG_ROOT
    TAG_H
    TAG_TABLE
    TAG_LINES
    TAG_BLOCK_P
    TAG_BLOCK_INDENT_TEXT
    ...

> B类块节点：`相邻即可合并`
    TAG_BLOCK_PRE
    TAG_BLOCK_INDENT_PRE

> C类块节点：`相邻且前一块节点遍历序最后一个节点不为空行节点，则合并`
    TAG_BLOCK_UL
    TAG_BLOCK_OL
    TAG_BLOCK_INDENT_UL
    TAG_BLOCK_INDENT_OL
    TAG_BLOCK_BLANK
    TAG_BLOCK_QUOTE_UL
    TAG_BLOCK_QUOTE_OL

    
#### 算法

> `void merge_block_nodes(t_node *root)`

    深度先序遍历节点树
        记遍历过程的当前节点为node，节点遍历顺序的上一节点为prev_node
        若node为块节点（因为该算法只需调整块节点，而且是部分块节点）
            若node.tag与node.prev.tag相同
                若node为B类块节点，或node为C类块节点且prev_node不为空行节点，或node为C类块节点且prev_node为唯一空行节点
                    将node.children移出并追加到node.prev.children尾部
                    移除node节点


#### Tips

实际情况中，合并情况如下：

> 案例1：行01和行04需要合并在同一个ul下，空行02属于list 1内部空行

    01 * list 1
    02     
    03     text 1
    04 * list 2


> 案例2：虽然隔了空行04，但行03与行05-07需要合并成一个代码块

    01 # code
    02     
    03     #include <stdio.h>
    04
    05     int main(int argc, char **argv) {
    06         printf("Hello, World!\n");
    07     }

> 案例3：行01和行04`合并`，空行03属于list之间的`唯一空行`

    01 * list 1
    02     test 1 
    03 
    04 * list 2


> 案例4：行01和行04`不合并`，list之间存在`多于一个的空行`

    01 * list 1
    02     test 1 
    03 
    04
    05 * list 2



### quote块节点合并

* 到目前为止，我们没有深入讨论过quote节点的处理
* 对于 **TAG_QUOTE_P , TAG_QUOTE_UL , TAG_QUOTE_OL , TAG_QUOTE_PRE , TAG_QUOTE_BLANK** 等类型的节点，我们通过在语法解析阶段，会将相邻的节点合并成对应的块节点。这些块节点分别为
        TAG_BLOCK_QUOTE_P
        TAG_BLOCK_QUOTE_UL
        TAG_BLOCK_QUOTE_OL
        TAG_BLOCK_QUOTE_PRE
        TAG_BLOCK_QUOTE_BLANK
* 另外一个quote块节点为**TAG_QUOTE_H**
* quote节点的特殊之处在于：**多个相邻的兄弟quote块节点，不管是否为同类型块节点，也需要合并**

以下是经历过**块节点合并**后获得的语法树：

    01 tag: TAG_ROOT; level: -100
    02 tag: TAG_BLOCK_QUOTE_P; level: 0
    03 tag: TAG_QUOTE_P; level: 0
    04     tag: TAG_INLINE_ELEMENTS; level: 1
    05         tag: TAG_INLINE_TEXT; level: 2
    06 tag: TAG_QUOTE_P; level: 0
    07     tag: TAG_INLINE_ELEMENTS; level: 1
    08         tag: TAG_INLINE_TEXT; level: 2
    09 tag: TAG_BLOCK_QUOTE_BLANK; level: 0
    10 tag: TAG_QUOTE_BLANK; level: 0
    11 tag: TAG_BLOCK_QUOTE_P; level: 0
    12 tag: TAG_QUOTE_P; level: 0
    13     tag: TAG_INLINE_ELEMENTS; level: 1
    14         tag: TAG_INLINE_TEXT; level: 2
    15 tag: TAG_BLOCK_QUOTE_BLANK; level: 0
    16 tag: TAG_QUOTE_BLANK; level: 0
    17 tag: TAG_BLOCK_QUOTE_UL; level: 0
    18 tag: TAG_QUOTE_UL; level: 0
    19     tag: TAG_INLINE_ELEMENTS; level: 1
    20         tag: TAG_INLINE_TEXT; level: 2
    21 tag: TAG_QUOTE_UL; level: 0
    22     tag: TAG_INLINE_ELEMENTS; level: 1
    23         tag: TAG_INLINE_TEXT; level: 2
    24 tag: TAG_BLOCK_QUOTE_BLANK; level: 0
    25 tag: TAG_QUOTE_BLANK; level: 0
    26 tag: TAG_BLOCK_QUOTE_OL; level: 0
    27 tag: TAG_QUOTE_OL; level: 0
    28     tag: TAG_INLINE_ELEMENTS; level: 1
    29         tag: TAG_INLINE_TEXT; level: 2
    30 tag: TAG_QUOTE_OL; level: 0
    31     tag: TAG_INLINE_ELEMENTS; level: 1
    32         tag: TAG_INLINE_TEXT; level: 2
    33 tag: TAG_BLOCK_QUOTE_BLANK; level: 0
    34 tag: TAG_QUOTE_BLANK; level: 0
    35 tag: TAG_QUOTE_H; level: 0
    36     tag: TAG_INLINE_ELEMENTS; level: 1
    37         tag: TAG_INLINE_TEXT; level: 2
    38 tag: TAG_QUOTE_H; level: 0
    39     tag: TAG_INLINE_ELEMENTS; level: 1
    40         tag: TAG_INLINE_TEXT; level: 2

以上语法树中，`TAG_BLOCK_QUOTE_P, TAG_BLOCK_QUOTE_BLANK, TAG_BLOCK_QUOTE_UL, TAG_BLOCK_QUOTE_OL, TAG_QUOTE_H`是相邻的兄弟quote块节点。需要将它们一起放到`TAG_BLOCK_QUOTE`节点下。

    01 tag: TAG_ROOT; level: -100
    02 tag: TAG_BLOCK_QUOTE; level: 0
    03 tag: TAG_BLOCK_QUOTE_P; level: 0
    04 tag: TAG_QUOTE_P; level: 0
    05     tag: TAG_INLINE_ELEMENTS; level: 1
    06         tag: TAG_INLINE_TEXT; level: 2
    07 tag: TAG_QUOTE_P; level: 0
    08     tag: TAG_INLINE_ELEMENTS; level: 1
    09         tag: TAG_INLINE_TEXT; level: 2
    10 tag: TAG_BLOCK_QUOTE_BLANK; level: 0
    11 tag: TAG_QUOTE_BLANK; level: 0
    12 tag: TAG_BLOCK_QUOTE_P; level: 0
    13 tag: TAG_QUOTE_P; level: 0
    14     tag: TAG_INLINE_ELEMENTS; level: 1
    15         tag: TAG_INLINE_TEXT; level: 2
    16 tag: TAG_BLOCK_QUOTE_BLANK; level: 0
    17 tag: TAG_QUOTE_BLANK; level: 0
    18 tag: TAG_BLOCK_QUOTE_UL; level: 0
    19 tag: TAG_QUOTE_UL; level: 0
    20     tag: TAG_INLINE_ELEMENTS; level: 1
    21         tag: TAG_INLINE_TEXT; level: 2
    22 tag: TAG_QUOTE_UL; level: 0
    23     tag: TAG_INLINE_ELEMENTS; level: 1
    24         tag: TAG_INLINE_TEXT; level: 2
    25 tag: TAG_BLOCK_QUOTE_BLANK; level: 0
    26 tag: TAG_QUOTE_BLANK; level: 0
    27 tag: TAG_BLOCK_QUOTE_OL; level: 0
    28 tag: TAG_QUOTE_OL; level: 0
    29     tag: TAG_INLINE_ELEMENTS; level: 1
    30         tag: TAG_INLINE_TEXT; level: 2
    31 tag: TAG_QUOTE_OL; level: 0
    32     tag: TAG_INLINE_ELEMENTS; level: 1
    33         tag: TAG_INLINE_TEXT; level: 2
    34 tag: TAG_BLOCK_QUOTE_BLANK; level: 0
    35 tag: TAG_QUOTE_BLANK; level: 0
    36 tag: TAG_QUOTE_H; level: 0
    37     tag: TAG_INLINE_ELEMENTS; level: 1
    38         tag: TAG_INLINE_TEXT; level: 2
    39 tag: TAG_QUOTE_H; level: 0
    40     tag: TAG_INLINE_ELEMENTS; level: 1
    41         tag: TAG_INLINE_TEXT; level: 2

其中`第02行`的**TAG_BLOCK_QUOTE**节点为新增节点，所有的相邻兄弟quote块节点作为**TAG_BLOCK_QUOTE**节点的孩子节点

#### 算法

> `void merge_quote_block_nodes(t_node *root)`

    深度先序遍历节点树
        记遍历过程的当前节点为node
        若node为quote块节点
            从node开始，往后顺次查找其最长兄弟quote块节点列表，记最后一个兄弟quote块节点为node_end
            创建新的TAG_BLOCK_QUOTE节点，记为new_parent，取代node..node_end的位置
            并将node..node_end从当前链表中移出，作为new_node的孩子节点列表
            通过返回t_link节点，指示遍历器：node孩子节点不再访问，开始访问new_node的下一个兄弟节点



## 语法树遍历

* 经过前面的语法解析以及语法树的二次修正，我们得到一棵真实表达语法结构的语法树
* 语法树以**TAG_ROOT**节点为根，根节点只有一个
* 节点分为块级节点、行级节点、行内姐弟三类
* 通过语法树的遍历，我们可以进行不同格式（HTML、JSON等）的输出









