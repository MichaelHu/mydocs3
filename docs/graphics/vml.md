# vml

> Vector Markup Language

## Features

* `Microsoft`于`1999年9月`发布, 同`IE5.0`一起
* 初衷是能在IE浏览器中显示Word中的图形
* `IE9`开始支持具有标准规范的`SVG`，并推荐从VML迁移至SVG，推荐使用`RaphaelJS`库<ref://./raphaeljs.md.html>；`IE10`开始不再支持VML


## Resources

* msdn docs: <https://msdn.microsoft.com/en-us/library/bb263898(VS.85).aspx>
* `IE`下的展示VML的效果图：<http://www.cnblogs.com/peterzb/archive/2009/07/22/1529021.html>
* `IE10`开始，不再支持VML <https://msdn.microsoft.com/library/hh801223>


## APIs

    <v:oval style="width:100pt;height:75pt" fillcolor="red"> </v:oval>

    <v:rect style="width:120pt;height:80pt;"
        fillcolor="yellow" strokecolor="blue"/>

    <v:image style="width:50pt;height:44pt" src="image1.jpg"
        cropbottom="0.45" cropleft="0.5"/>

* 标签格式为：`v:type`
* css的支持比较全面
* `image`类型的元素，支持`图片裁剪`

