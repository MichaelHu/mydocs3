# markdown简介及语法说明


> 工欲善其事，必先利其器。 —— 孔子 《论语・卫灵公》


## 前言

`markdown`作为一种非官方的流行HTML编写语言，有多种实现方案。

本文介绍的markdown解析器是基于`lex-yacc` (flex-bison)编写的C解析器，其解析的语法是<http://daringfireball.net/projects/markdown/>的一个子集。

`GITHUB`：<https://github.com/MichaelHu/markdown-slides>


## Todos

1. 链接扩展，支持`target="_blank"`
2. 支持文件包含，类似`include "file"`
3. bug：以下段落，第二处空格如果只有一个空格正常，如果多一个空格就解析错误。

        jsx不能使用`<!-- ... -->`进行注释
        jsx不能使用`<!-- ...  -->`进行注释

    jsx不能使用`<!-- ... -->`进行注释
4. `icon`支持，比如`[x]`, `[v]`
5. `table`支持
6. `插件支持`



## Features

1. 支持的元素：
    * 主要针对`block-level元素`进行解析，包含`p, h1-h6, ul, ol, blockquote` 
    * inline-level元素只处理了`code` 

2. 常规markdown inline-level元素的支持不包含在此实现中，原因是基于lex & yacc对语法的严格要求，不适合markdown语法的随意性，会出现非常多的syntax error，而error handling很不容易实现。
    比如內联元素a, img等，编写时，直接写其HTML格式，如下：

        <a href="url">title</a>
        <img src="url">

3. 支持`多级嵌套`列表

4. 支持`@s [attr-list]`以及`@vs [attr-list]`语法，用于幻灯片分隔，这部分在本项目根部`README.md`说明。

4. 支持`嵌套代码段`

6. 其他HTML标签，可在`一行上从顶格开始`直接编写，具体查看`4. 原生HTML标签支持`，如：

        <table><tr><td>1</td></tr></table>
        <script type="text/javascript" src="./markdown.js"></script>

7. 支持`"@[...]"`属性字段扩展



## Grammar 

### h1-h6

语法：

    # h1 text 
    ## h2 text
    ### h3 text
    #### h4 text
    ##### h5 text
    ###### h6 text

会产生以下输出：

    <h1>h1 text</h1>
    <h2>h2 text</h2>
    <h3>h3 text</h3>
    <h4>h4 text</h4>
    <h5>h5 text</h5>
    <h6>h6 text</h6>

### 常规段落

语法：

    段落1文本
    段落1文本

    空行开启新的段落
    段落2文本
    段落2文本

会产生以下输出：

    <p>段落1文本
    段落1文本</p>
    <p>空行开启新的段落
    段落2文本
    段落2文本</p>

### 列表


#### 有序列表

有序列表由`*`或`+`开始，后接至少一个空格，再接文本 

语法（有序列表）：

    1. 列表第一项
    2. 列表第二项

会产生以下输出：

    <ol><li>列表第一项</li>
    <li>列表第二项</li></ol>


#### 无序列表

无序列表有`数字.`开始，后接至少一个空格，再接文本

语法（无序列表）：

    * 无序列表第一项
    * 无序列表第二项

会产生以下输出：

    <ul><li>无序列表第一项</li>
    <li>无序列表第二项</li></ul>


#### 嵌套列表

在上级列表的基础上，再次缩进`四个空格`或者`一个制表符` 

语法（嵌套列表）：

    * 无序列表第一项
        1. 嵌套有序列表第一项
        2. 嵌套有序列表第二项
    * 无序列表第二项
        1. 嵌套有序列表第一项
        2. 嵌套有序列表第二项

会产生以下输出：

    <ul><li>无序列表第一项<ol><li>嵌套有序列表第一项</li>
    <li>嵌套有序列表第二项</li></ol>
    </li>
    <li>无序列表第二项<ol><li>嵌套有序列表第一项</li>
    <li>嵌套有序列表第二项</li></ol>
    </li></ul> 



## 原生HTML标签支持 


### 无跨行标签

当编写遵循以下原则时，会作为`块级别``原样`输出：

1. `行首（must）`开始编写标签
2. 标签相关内容在`一行内`完成

例如以下`div`会原样输出：

    <div class="list">....

而以下div(`没有行首开始编写，|_|代表空格`)会被嵌套在p标签内：

    |_|<div class="list">...

输出为：

    <p> <div class="list">...</p>

如果要输出一个table内容，可以这么写：

    <table><tr><td>name</td><td>age</td></tr><tr><td>Michael</td><td>32</td></tr></table>

这样显得可读性不好，也不容易编辑，但是`tr, td`标签也是可以原样输出的，所以可以这么些：

    <table>
    <tr>
    <td>name</td>
    <td>age</td>
    </tr>
    <tr>
    <td>Michael</td>
    <td>32</td>
    </tr>
    </table>

作为块级别原样输出的含义，是指`解析时`按块级别进行，不一定代表标签是块级别的。比如：

    text before link
    <a href="http://258i.com" target="_blank">258i.com</a>
    text after link

输出为：

    <p>text before link</p>
    <a href="http://258i.com" target="_blank">258i.com</a>
    <p>text after link</p>



### 可跨行标签

为了方便在文档中嵌入样式和脚本，`style`与`script`标签的内容是可以跨行的，比如：

    <style type="text/css">
    ... 
    </style>

    <script type="text/javascript">
    ...
    </script> 

只要确保起止标签首列书写即可。


