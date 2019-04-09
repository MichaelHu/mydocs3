# markdown-slides

## Features

* 基于`lex/yacc`编写的markdown编译器
* 支持`@s, @vs, @[...]`语法，能输出`reveal.js`兼容的代码
* 为`trubo-markdown` ( <ref://./turbo-markdown.md.html> ) 以及`fast-slides` ( <ref://../ppt-tools/fast-slides.md.html> ) 提供解析器


## Resources

* github: <https://github.com/MichaelHu/markdown-slides>
* turbo-markdown: <ref://./turbo-markdown.md.html>


## Versions

    v2.0
        支持抽象语法树，以便支持多种格式输出
        所有标签（包括块级、行级以及内联级节点）节点化
        提升代码可维护性
        更强的错误处理和恢复能力
        支持更多语法
            Hn支持链接、图片
            blockquote支持多级

        todo:
            代码空行保留
            @s/@vs支持
            增加支持标准a/img/hr/em/strong
            增加支持``
            内存优化

    v1.0
        支持更多语法，如table, ```等
        增强错误处理和恢复能力
    v0.1.x
        支持部分语法



## 原理

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


## 处理过程 

> 程序 = 数据结构 + 算法

### 数据结构

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


### 数据结构解析

* 使用`二维双向链表`，兄弟节点链表用`next`, `prev`形成`同级双链`，父子节点间通过`children`, `parent`形成`上下双链`
* 链表结构，在存储需求上能有更大的可扩展性
* `双向链表`能大大提升节点处理过程中邻接信息的获取效率
* `level`代表节点的`缩进级别`，最终节点树中，父子节点的缩进级别`不一定完全遵循父小子大`的原则。特例为`TAG_INLINE_TEXT`节点类型，总是将其的缩进级别设置为0
* `nops`与`ops`配合，支持节点`属性的扩展`



### 语法解析

通过一遍语法解析，形成如下`节点树`。其中`所有块节点`形成一维列表，作为根节点（`TAG_ROOT`）的`一级孩子节点列表`。

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


#### Tips

* 由于没有按缩进级别生成特定的token，`不同缩进级别`的标签可能`划归同一个块`。上述标签中，`行12-行13`的缩进级别不同，但划归了同一个块；`行15-行23`有`3种`不同缩进级别，但都划归了同一个块。
* 解释一下，如果`按缩进级别生成特定的token`，能解决标签划归的问题，但是由于特定token是固定集合，对于`支持无限缩进层级`的特性，就不好实现了。
* 实际实现的时候，采取不安缩进级别生成特定token的方案，以便`支持无限缩进层级`
* 语法解析`粗分类`，必然导致生成的节点树存在`层级混乱`的问题，我们需要在拿到节点树后，对其进行`二次修正`
* 不同缩进级别划归同一块的问题，通常出现在`缩进型`节点（也就是level大于0的节点）组成的列表中
* 目前`缩进型节点`主要为：`TAG_INDENT_UL`, `TAG_INDENT_OL`, `TAG_INDENT_TEXT`, `TAG_INDENT_PRE`
* 另外很重要的一点需要注意的是，实际场景中，作为缩进型节点的`TAG_INDENT_PRE`，是不会出现划归问题的


#### 面临的问题

* 由于划归混乱，导致节点树上缺少了必要的块节点，需要补全缺失的块节点，使得一个块节点只包含同级的行节点
* `补全块节点`，需要扫描行节点列表，兄弟行节点间如果出现level不一致，则需新增一个块节点
* 语法解析得到的节点树，所有块节点都是同一个级别的，都作为根节点的孩子节点。但对于缩进的情况，块节点可能成为其他节点的孩子节点。还需要对`块节点列表进行分级`。
* 另外，针对`空行隔开`的`同一类型块节点`，需要进行`合并`

> 因此，需要对语法解析获得的节点树进行`二次修正`


### 补全块节点 - 修正1

#### 算法

    深度先序遍历节点树
        记遍历过程的当前节点为node，node的父亲节点为parent
        若node为非块节点
            若node.level与parent.level不匹配
                新建一个与node.level匹配的对应类型的block节点，记为new_uncle，并追加在parent后面
                将node作为首孩子节点挂载到last_uncle下（注：只更新node的prev及parent链接，保持其next和children链接不变）

#### Tips

* 只针对`非块节点`组成的`兄弟列表`，真正`需要修正`的是以上提到的`缩进型节点`
* 列表中，level不匹配的节点，需要挂载到`新创建`的块节点下
* 挂载过程，会将`节点及其后接兄弟节点`一起挂载到新的块节点下
* `重要`：补全块节点在第一次生成节点树后执行，此时所有的块节点都作为`TAG_ROOT节点`的`一级孩子节点`，`不存在`块节点作为行节点的孩子节点的情况
* `但是`，进行后续的块节点分级以后，是存在块节点作为行节点孩子节点的情况的
* 补全块节点的过程中，会`实时更新树结构`，新创建的块节点会在后续遍历过程中被访问到
* node作为首孩子节点挂载，后跟节点也一起挂载，而不是先把node节点先从原列表摘出来，再挂载，`严格来说是不太推荐的`，不过在这里并无影响。但`后方块节点分级`（`「  处理过程  -  块节点分级 - 修正2 」`: <ref://#anchor_fe38c>）却不能这么操作，它可能会导致`循环引用`


### 块节点分级 - 修正2

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


* 到目前为止，节点树中，块级节点总是作为`TAG_ROOT`的`一级孩子节点`存在，并`没有`真正体现节点之间的`层次关系`
* `但是`，块节点与其下属的行级节点之间的层次关系已经在前一步补全块节点中完成
* `所以`，调整过程`只需考虑块节点`，将其`挂载`至对应的父级节点（一般为行级节点）即可
* 实际上，`0级块节点`是不需要调整的，只需针对`1级及以上`的块节点进行调整
* 针对以上遍历输出，需作出以下调整：

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
        47          TAG_ROOT        40




#### 算法

    深度先序遍历节点树
        记遍历过程的当前节点为node，上一节点为prev_node（一般为行级节点）
        若node为块节点（因为该算法只需调整块节点）
            若node.level大于0
                查找离prev_node节点最近的且level为node.level-1的祖先行级列表节点，记为p1
                若p1暂无孩子节点，则将node作为p1的孩子节点列表首节点（注意：只移动node节点，其后面为其他块级节点需要与node前方的节点拼接）
                若p1存在孩子节点，则将node移动到p1孩子节点列表的末尾（注意：只移动node节点，其后面为其他块级节点需要与node前方的节点拼接）

#### Tips

* markdown中，能`容纳其他块级节点`的节点主要有：`列表节点`、`引用节点`等，所以上方算法当node.level大于0时，需查找前一节点的`祖先行级列表节点`
* 以上算法中，`prev_node不能为空白行节点`，因为空白行节点是特殊节点，其level为0，`无法通过其找到`所属的祖先行级列表节点。如上代码的`45、46两行`对应的空白节点`不能`作为`prev_node`


### 块节点合并 - 修正3

某些相邻兄弟块节点，需要合并成一个块节点；某些兄弟块节点，即使中间隔了一或多个空行节点，也需要合并成一个块节点。以下列表是块节点分级后的得到的结果，其中`03和10`需合并成一个块节点，`20、24、36`也需要合并成一个节点

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

* `行级节点`在语法解析阶段已经完成合并，`不再需要`做合并。`需要合并的是块级节点`

#### 块节点合并需求

> A类块节点：`相邻不合并`
    TAG_ROOT
    TAG_H
    TAG_TABLE
    TAG_LINES
    TAG_BLOCK_P
    TAG_BLOCK_INDENT_TEXT

> B类块节点：`相邻需合并`
    TAG_BLOCK_UL
    TAG_BLOCK_OL
    TAG_BLOCK_INDENT_UL
    TAG_BLOCK_INDENT_OL
    TAG_BLOCK_BLANK
    TAG_BLOCK_QUOTE_UL
    TAG_BLOCK_QUOTE_OL

> C类块节点：`即使隔了一或多个空白行，也需要合并`
    TAG_BLOCK_PRE
    TAG_BLOCK_INDENT_PRE

    
#### 算法

    深度先序遍历节点树
        记遍历过程的当前节点为node
        若node为块节点（因为该算法只需调整块节点）
            若node为B类块节点
                若node.tag与node.prev.tag相同
                    node.children追加到node.prev.children尾部
                    移除node节点
            若node为C类块节点
                若node在其所在的兄弟列表上，经过一或多个空白行节点能到达与其tag相同的节点p1
                    node.children追加到p1.children尾部
                    移除node节点


#### Tips

* 根据语法解析规则，`块级列表节点总存在孩子节点`






