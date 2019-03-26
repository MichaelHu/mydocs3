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


