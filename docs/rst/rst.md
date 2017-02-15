# rst

> reStructuredText ( .rst )

## Overview

`reStructuredText`是一种`轻量级`的文本标记语言，直译为：重构建的文本，为`Python`中`Docutils`项目的一部分。其一般保存的文件以`.rst`为后缀。在必要的时候，`.rst`文件可以被转化成`PDF`或者`HTML`格式，也可以由`Sphinx`转化为`LaTex`, `man`等格式，现在被广泛的用于程序的文档撰写。

* <http://docutils.sourceforge.net/docs/ref/rst/restructuredtext.html>
* <http://blog.useasp.net/archive/2014/09/05/rst-file-restructuredtext-markup-syntax-quikstart.aspx>
* 在线编辑器1( 比较牛逼 )：<http://rst.ninjs.org>
* 在线编辑器2（ 更像是markdown编辑器 ）：<https://www.notex.ch/editor>
* 使用`.rst`写技术文档的项目：<https://github.com/mathjax/MathJax-docs>
* `Sphinx`为Python官方指定的文档撰写工具
* 使用`Sphinx`构建的文档：<https://aria2.github.io/manual/en/html/>
* `github`能直接解析


## 简单语法介绍

* Sphinx语法介绍（官方编辑器）：<http://www.sphinx-doc.org/en/stable/rest.html>
* Markdown与reStructuredText语法比较：<http://fasiondog.cn/archives/698.html>



### 代码块


使用两个连续冒号，后跟一个空行，开始代码块：
	 
	::
	 
		for i in [1,2,3,4,5]:
			print i
		# 代码块测试
	 
代码块需要`有缩进`


### 表格

`网格表格`

	+------------------------+------------+----------+----------+
	| Header row, column 1   | Header 2   | Header 3 | Header 4 |
	| (header rows optional) |            |          |          |
	+========================+============+==========+==========+
	| body row 1, column 1   | column 2   | column 3 | column 4 |
	+------------------------+------------+----------+----------+
	| body row 2             | Cells may span columns.          |
	+------------------------+------------+---------------------+
	| body row 3             | Cells may  | - Table cells       |
	+------------------------+ span rows. | - contain           |
	| body row 4             |            | - body elements.    |
	+------------------------+------------+---------------------+

`简单表格`


	=====  =====  =======
	  A      B    A and B
	=====  =====  =======
	False  False  False
	True   False  False
	False  True   False
	True   True   True
	=====  =====  =======



