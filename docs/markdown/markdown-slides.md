# markdown-slides

## Resources

* github: <https://github.com/MichaelHu/markdown-slides> <iframe src="http://258i.com/gbtn.html?user=MichaelHu&repo=markdown-slides&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* turbo-markdown: <ref://./turbo-markdown.md.html>


## Features

* 基于`lex/yacc`编写的markdown编译器
* 支持`@s, @vs, @[...]`语法，能输出`reveal.js`兼容的代码
* 为`trubo-markdown` ( <ref://./turbo-markdown.md.html> ) 以及`fast-slides` ( <ref://../ppt-tools/fast-slides.md.html> ) 提供解析器


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
        支持更多语法，如table等
        增强错误处理和恢复能力
    v0.1.x
        支持部分语法

## 原理

    按行(line)处理
    行组成块(block)
    根据行的indent-level对块进行修正分拆

    第一次扫描，生成块标签
    块标签同属于一个级别，所有块标签构成根标签的孩子列表
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

* 由于没有按缩进级别生成特定的token，`不同缩进级别`的标签可能划归同一个块。上述标签中，`行12-行13`的缩进级别不同，但划归了同一个块；`行15-行23`有`3种`不同缩进级别，但都划归了同一个块。
* 解释一下，如果`按缩进级别生成特定的token`，能解决标签划归的问题，但是由于特定token是固定集合，对于`支持无限缩进层级`的特性，就不好实现了。
* 实际实现的时候，采取不安缩进级别生成特定token的方案，以便`支持无限缩进层级`
* 语法解析`粗分类`，必然导致生成的节点树存在`层级混乱`的问题，我们需要在拿到节点树后，对其进行`二次修正`


### 二次修正

#### 面临的问题

* 由于划归混乱，导致节点树上缺少了必要的块节点，需要补全缺失的块节点，使得一个块节点只包含同级的行节点
* `补全块节点`，需要扫描行节点列表，兄弟行节点间如果出现level不一致，则需新增一个块节点
* 语法解析得到的节点树，所有块节点都是同一个级别的，都作为根节点的孩子节点。但对于缩进的情况，块节点可能成为其他节点的孩子节点。还需要对`块节点列表进行分级`。

#### 补全块节点

#### 块节点分级





> 程序 = 数据结构 + 算法
