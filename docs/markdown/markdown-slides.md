# markdown-slides

## Features

* 基于`lex/yacc`编写的markdown编译器
* 支持`@s, @vs, @[...]`语法，能输出`reveal.js`兼容的代码
* 为`trubo-markdown` ( <ref://./turbo-markdown.md.html> ) 以及`fast-slides` ( <ref://../ppt-tools/fast-slides.md.html> ) 提供解析器


## Resources

* github: <https://github.com/MichaelHu/markdown-slides>
* turbo-markdown: <ref://./turbo-markdown.md.html>


## Todo

* `错误处理`能力，目前还不能精确指明发生错误所在的行号和列号
* 提升代码易维护性
* 扩展能力


## Versions

    v2.0
        支持抽象语法树
        提升代码可维护性
        更强的错误处理和恢复能力
        支持更多语法
            Hn支持链接、图片
            blockquote支持多级
    v1.0
        支持更多语法，如table, ```等
        增强错误处理和恢复能力
    v0.1.x
        支持部分语法



## 原理

    按行(line)处理
    行组成块(block)
    根据行的indent-level对块进行修正分拆

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


### 语法解析

通过一遍语法解析，形成如下`节点树`。其中`所有块节点`形成一维列表，作为根节点（`TAG_ROOT`）的孩子节点列表。

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
* 不同缩进级别划归同一块的问题，通常出现的标签为：`TAG_INDENT_UL`, `TAG_INDENT_OL`, `TAG_INDENT_TEXT`；而`TAG_INDENT_PRE`则不会出现（`重要`）


### 二次修正

#### 面临的问题

* 由于划归混乱，导致节点树上缺少了必要的块节点，需要补全缺失的块节点，使得一个块节点只包含同级的行节点
* `补全块节点`，需要扫描行节点列表，兄弟行节点间如果出现level不一致，则需新增一个块节点
* 语法解析得到的节点树，所有块节点都是同一个级别的，都作为根节点的孩子节点。但对于缩进的情况，块节点可能成为其他节点的孩子节点。还需要对`块节点列表进行分级`。


#### 补全块节点

##### 算法

    遍历节点树
        记遍历过程的当前节点为node，node的父亲节点为parent
        若node为非块节点
            若node.level与parent.level不匹配
                新建一个与node.level匹配的对应类型的block节点，记为new_uncle，并追加在parent后面
                将node挂载到last_uncle下，注：只更新node的prev及parent链接，保持其next和children链接不变

##### Tips

* 只针对`非块节点`组成的`兄弟列表`，目前需要修正的`非块节点`为以上提到的`三类`
* 列表中，level不匹配的节点，需要挂载到`新创建`的块节点下
* 挂载过程，会将`节点及其后接兄弟节点`一起挂载到新的块节点下
* `重要`：补全块节点在第一次生成节点树后执行，此时所有的块节点都作为`TAG_ROOT节点`的`一级孩子节点`，`不存在`块节点作为行节点的孩子节点的情况
* `但是`，进行后续的块节点分级以后，是存在块节点作为行节点孩子节点的情况的
* 补全块节点的过程中，会`实时更新树结构`，新创建的块节点会在后续遍历过程中被访问到


#### 块节点分级

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

* 到目前为止，节点树中，块级节点总是作为`TAG_ROOT`的`一级孩子节点`存在，并`没有`真正体现节点之间的`层次关系`
* `但是`，块节点与其下属的行级节点之间的层次关系已经在前一步补全块节点中完成
* `所以`，调整过程`只需考虑块节点`，将其`挂载`至对应的父级节点（一般为行级节点）即可
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





> 程序 = 数据结构 + 算法
