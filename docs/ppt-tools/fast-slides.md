# fast-slides

## Resources

* github: <https://github.com/MichaelHu/fast-slides> <iframe src="http://258i.com/gbtn.html?user=MichaelHu&repo=fast-slides&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* markdown compiler: <ref://../markdown/markdown-slides.md.html>
* turbo-markdown: <ref://../markdown/turbo-markdown.md.html>


## Features

* 编译markdown语法，输出成`reveal.js`友好的文档
* 支持`@s, @vs, @[...]`等扩展语法，方便生成reveal.js所需的`section`, `vertical section`，以及`属性自定义`
* 扩展reveal.js的`快捷键`支持：

        ALT-T      循环切换Theme
        ALT-P      引入PDF样式，后续可用于PDF导出
        ALT-R      切换转场动画


## Install

    $ npm i -g fast-slides


## Usage

    $ fast-slides <file> [--no-preview]


## Todo

* 来自<https://fonts.gstatic.com>站点的文件被墙的问题


