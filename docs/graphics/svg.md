# svg

> SVG 意为`可缩放矢量图形`（Scalable Vector Graphics）。


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
.svg-container {
    border: 1px dashed #bbb;
}
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>



## Resources

* w3c: <https://www.w3.org/TR/SVG11/>
* 理解SVG viewport, viewBox, preserveAspectRatio缩放 <https://www.zhangxinxu.com/wordpress/2014/08/svg-viewport-viewbox-preserveaspectratio/>


## Overview

SVG于`2003年1月14日`成为W3C推荐标准。目前最新推荐标准为`2011年8月16日`的`SVG1.1`推荐标准。

参与定义 SVG 的组织有：`太阳微系统、Adobe、苹果公司、IBM 以及柯达`。


### 优势

与其他图像格式相比，使用 SVG 的`优势`在于：

* 可被非常多的工具读取和修改（比如记事本）
* 与`JPEG`和`GIF`图像比起来，`尺寸`更小，且`可压缩性`更强。
* 是`可伸缩`的
* 图像可在任何的分辨率下被`高质量`地打印
* 可在图像质量不下降的情况下被放大
* 图像中的`文本是可选的`，同时`也是可搜索的`（很适合制作地图）
* 是一种开放的标准
* 文件是纯粹的`XML`
* 可以与 Java 技术一起运行

SVG 的主要竞争者是`Flash`。与 Flash 相比，SVG 最大的优势是与其他标准（比如 XSL 和 DOM）相兼容。而 Flash 则是未开源的私有技术。


## Basics

todo

### Properties

* Property列表 <https://www.w3.org/TR/SVG11/propidx.html>



### Styles

* styles - <https://www.w3.org/TR/SVG11/styling.html#StyleAttribute>
* 部分与CSS2共享的属性，部分特有属性

#### 共享属性

    Font properties:
        ‘font’
        ‘font-family’
        ‘font-size’
        ‘font-size-adjust’
        ‘font-stretch’
        ‘font-style’
        ‘font-variant’
        ‘font-weight’
    Text properties:
        ‘direction’
        ‘letter-spacing’
        ‘text-decoration’
        ‘unicode-bidi’
        ‘word-spacing’
    Other properties for visual media:
        ‘clip’, only applicable to outermost svg element.
        ‘color’, used to provide a potential indirect value (currentColor) for the ‘fill’, ‘stroke’, ‘stop-color’, ‘flood-color’ and ‘lighting-color’ properties. (The SVG properties which support color allow a color specification which is extended from CSS2 to accommodate color definitions in arbitrary color spaces. See Color profile descriptions.)
        ‘cursor’
        ‘display’
        ‘overflow’, only applicable to elements which establish a new viewport.
        ‘visibility’

#### 特有属性

    Clipping, Masking and Compositing properties:
        ‘clip-path’
        ‘clip-rule’
        ‘mask’
        ‘opacity’
    Filter Effects properties:
        ‘enable-background’
        ‘filter’
        ‘flood-color’
        ‘flood-opacity’
        ‘lighting-color’
    Gradient properties:
        ‘stop-color’
        ‘stop-opacity’
    Interactivity properties:
        ‘pointer-events’
    Color and Painting properties:
        ‘color-interpolation’
        ‘color-interpolation-filters’
        ‘color-profile’
        ‘color-rendering’
        ‘fill’
        ‘fill-opacity’
        ‘fill-rule’
        ‘image-rendering’
        ‘marker’
        ‘marker-end’
        ‘marker-mid’
        ‘marker-start’
        ‘shape-rendering’
        ‘stroke’
        ‘stroke-dasharray’
        ‘stroke-dashoffset’
        ‘stroke-linecap’
        ‘stroke-linejoin’
        ‘stroke-miterlimit’
        ‘stroke-opacity’
        ‘stroke-width’
        ‘text-rendering’
    Text properties:
        ‘alignment-baseline’
        ‘baseline-shift’
        ‘dominant-baseline’
        ‘glyph-orientation-horizontal’
        ‘glyph-orientation-vertical’
        ‘kerning’
        ‘text-anchor’
        ‘writing-mode’



## viewBox & perserveAspectRatio 

### Tips

* 定义`视野范围`，使用viewBox属性：`viewBox="<min-x> <min-y> <width> <height>"`
* 与viewBox配合，定义视野匹配过程中scale的行为，使用`preserveAspectRatio`属性: `preserveAspectRatio="[defer] <align> [<meetOrSlice>]"`
    
    `align`可选值：

        none            进行非常规视野匹配，不保持长宽比
        xMinYMin
        xMidYMin
        xMaxYMin
        xMinYMid
        xMidYMid        default
        xMaxYMid
        xMinYMax
        xMidYMax
        xMaxYMax

    `meetOrSlice`可选值：

        meet            default
        slice

* 视野范围与viewport的匹配的过程，是将视野范围`等比缩放`至整体刚好包含在viewport所包围的可视区域内，缩放完毕后，视野范围在水平或竖直方向上`至少有一个方向的边界与viewport重合`
* 视野范围与viewport的匹配过程，效果等同于对svg内部元素做了transform，使得`坐标系`发生了scale
* 在视野范围与viewport边界重合所在的方向（水平或竖直）上，`无法再扩展`，此时Min/Mid/Max在效果上没有区别，都等同与Min
* svg标签的宽高尺寸定义了一个viewport，svg内部的元素按


### Demos

#### 视野范围同viewport

> 默认情况下，视野范围同viewport在水平和竖直方向上都重合

    @[data-script="html editable"]<svg width="400" height="200" style="border: 1px solid #0f0">
        <rect x="0" y="0" width="400" height="200" fill="#ccc" />
        <rect x="150" y="80" width="100" height="40" fill="#f00" />
    </svg>


#### 视野范围小于viewport 1

* 视野范围与viewport`等比例`，匹配后，水平和竖直方向都重合，都无法再扩展
* 由于水平和竖直方向都无法再扩展，所以`Min/Mid/Max无区别`，都等同与Min
* 视野范围是viewport的四分之一，svg内部元素的坐标系相当于做了`scale(2)`，整体上只能看到内部元素的位于左上角的那四分之一

代码示例如下：

    @[data-script="html editable"]<svg width="400" height="200" 
        viewBox="0 0 200 100"
        style="border: 1px solid #0f0">
        <rect x="0" y="0" width="400" height="200" fill="#ccc" />
        <rect x="150" y="80" width="100" height="40" fill="#f00" />
    </svg>


#### 视野范围小于viewport 2

* 视野范围与viewport`不成比例`，匹配后，水平和竖直方向只有一个方向重合，在该方向上无法再扩展
* 视野范围是原坐标范围的一半，匹配后，原坐标范围左半部分可见，由于`水平方向可扩展，在viewport内的部分也可见`
* 在未重合的方向上，Min/Mid/Max有不同的效果，本例中水平方向可扩展，所以水平方向上`Min/Mid/Max`生效；而竖直方向不再可扩展，故竖直方向不生效

代码示例如下：

> 左对齐

    @[data-script="html editable"]<svg width="400" height="200" 
        viewBox="0 0 200 200"
        preserveAspectRatio="xMinYMin"
        style="border: 1px solid #0f0">
        <rect x="0" y="0" width="400" height="200" fill="#ccc" />
        <rect x="150" y="80" width="100" height="40" fill="#f00" />
    </svg>

> 中对齐

    @[data-script="html editable"]<svg width="400" height="200" 
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMin"
        style="border: 1px solid #0f0">
        <rect x="0" y="0" width="400" height="200" fill="#ccc" />
        <rect x="150" y="80" width="100" height="40" fill="#f00" />
    </svg>

> 右对齐

    @[data-script="html editable"]<svg width="400" height="200" 
        viewBox="0 0 200 200"
        preserveAspectRatio="xMaxYMin"
        style="border: 1px solid #0f0">
        <rect x="0" y="0" width="400" height="200" fill="#ccc" />
        <rect x="150" y="80" width="100" height="40" fill="#f00" />
    </svg>



#### 视野范围大于viewport 1

* 视野范围大于viewport`，且等比例`，匹配后，视野范围与viewport在水平和竖直方向重合，所以都不可以再扩展
* 由于水平和竖直方向都无法再扩展，所以`Min/Mid/Max无区别`，都等同与Min
* 视野范围是viewport的四倍，svg内部元素的坐标系相当于做了`scale(0.5)`，整体上，内部元素的位于viewport的左上角的四分之一部分

代码示例如下：

    @[data-script="html editable"]<svg width="400" height="200" 
        viewBox="0 0 800 400"
        style="border: 1px solid #0f0">
        <rect x="0" y="0" width="400" height="200" fill="#ccc" />
        <rect x="150" y="80" width="100" height="40" fill="#f00" />
    </svg>



#### 视野范围大于viewport 2

* 视野范围大于viewport`，且不成比例`，匹配后，视野范围与viewport在水平或竖直方向上至少一个方向重合
* 匹配完成后，竖直方向重合，不可再扩展，水平方向可以再扩展，所以`xMid`生效
* 视野范围是viewport的2倍，svg内部元素的坐标系相当于做了`scale(0.5)`，整体上，内部元素的位于viewport的左上角的四分之一部分，另外xMid生效，故使用了xMid能使内部元素居中于viewport显示

代码示例如下：

    @[data-script="html editable"]<svg width="400" height="200" 
        viewBox="0 0 400 400"
        style="border: 1px solid #0f0">
        <rect x="0" y="0" width="400" height="200" fill="#ccc" />
        <rect x="150" y="80" width="100" height="40" fill="#f00" />
    </svg>


#### 视野范围大于viewport 3

* 视野范围大于viewport`，且不成比例`，匹配后，视野范围与viewport在水平或竖直方向上至少一个方向重合
* 匹配完成后，竖直方向重合，不可再扩展，`水平方向可以再扩展`，由于使用了`非等比例缩放`，故在水平方向上内部元素将拉伸至整个viewport

代码示例如下：

    @[data-script="html editable"]<svg width="400" height="200" 
        viewBox="0 0 400 400"
        preserveAspectRatio="none"
        style="border: 1px solid #0f0">
        <rect x="0" y="0" width="400" height="200" fill="#ccc" />
        <rect x="150" y="80" width="100" height="40" fill="#f00" />
    </svg>









## 简单例子

svg文件，以下文本内容保存成文件名为`circle.svg`的文件，就成为svg文件，可以直接打开预览了：

    <?xml version="1.0" standalone="no"?>

    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
    "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

    <svg width="100%" height="100%" version="1.1"
    xmlns="http://www.w3.org/2000/svg">

    <circle cx="100" cy="50" r="40" stroke="black"
    stroke-width="2" fill="red"/>

    </svg>


浏览器中展示圆形的svg：

<div id="test_100" class="test">
<div class="test-container">

    @[data-script="html editable"]<svg width="100%" height="100%">
    <circle 
        cx="100" 
        cy="50" 
        r="40" 
        stroke="#ff7f0e" 
        stroke-width="5" 
        fill="#2ca02c"
        />
    </svg>

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>






## 预定义形状（shapes）

SVG 有一些预定义的形状元素，可被开发者使用和操作：

* 矩形 rect
* 圆形 circle
* 椭圆 ellipse
* 线 line
* 折线 polyline
* 多边形 polygon
* 路径 path




### 矩形

#### 常规矩形

<div id="test_110" class="test">
<div class="test-container">

    @[data-script="html editable"]<svg width="100%" height="100%">
    <rect width="300" height="100" x="200" y="20"
        style="
            fill: #8c564b;
            fill-opacity: 0.5;
            stroke-width: 1;
            stroke: rgb(0,0,0);
            stroke-opacity: 0.5;
        " />
    </svg>

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



#### 圆角矩形

<div id="test_120" class="test">
<div class="test-container">

    @[data-script="html editable"]<svg width="100%" height="100%">
    <rect width="300" height="100" x="200" y="20"
        rx="50" ry="20"
        style="
            fill: #8c564b;
            fill-opacity: 0.5;
            stroke-width: 1;
            stroke: rgb(0,0,0);
            stroke-opacity: 0.5;
        " />
    </svg>

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>





### 圆形

`cx`，`cy`的值默认为0。

<div id="test_130" class="test">
<div class="test-container">

    @[data-script="html editable"]<svg width="100%" height="100%">
    <circle 
        r="100" 
        stroke="#ff7f0e" 
        stroke-width="5" 
        fill="#2ca02c"
        />
    </svg>

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



### 椭圆

#### 单个椭圆

<div id="test_140" class="test">
<div class="test-container">

    @[data-script="html editable"]<svg width="100%" height="100%">
    <ellipse 
        cx="200" 
        cy="80" 
        rx="100" 
        ry="40"
        style="
            fill:#74c476;
            stroke:rgb(0,0,100);
            stroke-width:1;
        "/>
    </svg>

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


#### 椭圆叠加

<div id="test_150" class="test">
<div class="test-container">

    @[data-script="html editable"]<svg width="100%" height="100%">
    <ellipse cx="240" cy="100" rx="220" ry="30" style="fill:#9ecae1"/>
    <ellipse cx="220" cy="70" rx="190" ry="20" style="fill:#fdae6b"/>
    <ellipse cx="210" cy="45" rx="170" ry="15" style="fill:#9e9ac8"/>
    </svg>

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



#### 椭圆组合

<div id="test_160" class="test">
<div class="test-container">

    @[data-script="html editable"]<svg width="100%" height="100%">
    <ellipse cx="240" cy="100" rx="220" ry="30" style="fill:#7b4173"/>
    <ellipse cx="220" cy="100" rx="190" ry="20" style="fill:white"/>
    </svg>

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>






### 线条

<div id="test_170" class="test">
<div class="test-container">

    @[data-script="html editable"]<svg width="100%" height="100%">
    <line 
        x1="30" y1="10" 
        x2="300" y2="100"
        style="
            stroke: #31a354;
            stroke-width: 4;
            stroke-opacity: 0.7;
        "/>
    </svg>

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




### 折线

<div id="test_180" class="test">
<div class="test-container">

    @[data-script="html editable"]<svg width="100%" height="100%">
    <polyline 
        points="5,0 5,20 25,20 25,40 45,40 45,60"
        style="
            fill:transparent;
            stroke:#637939;
            stroke-width:2;
        "/>
    <polyline 
        points="20,0 100,10 200,40 150,70"
        style="
            fill:transparent;
            stroke:#a55194;
            stroke-width:2;
        "/>
    </svg>

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>





### 多边形

<div id="test_190" class="test">
<div class="test-container">

    @[data-script="html editable"]<svg width="100%" height="100%">
    <polygon 
        points="220,10 300,120 170,140 120,30"
        style="
            fill:#cccccc;
            stroke:#000000;
            stroke-width:1;
        "/>
    </svg>

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>





### 文本

> <https://www.w3.org/TR/SVG11/text.html>


<div id="test_200" class="test">
<div class="test-container">

    @[data-script="html editable"]<svg width="100%" height="100%">
    <text 
        x="100"
        y="10"
        dx="10"
        dy="60"
        rotate="15"
        textLength="600"
        lengthAdjust="spacing"
        style="
            fill:#ff7f0e;
            stroke:#1f77b4;
            stroke-width:1;
            font-size:60px;
        ">SVG text
    </text>

    <text 
        x="100"
        y="80"
        dx="10"
        dy="60"
        rotate="15"
        textLength="600"
        lengthAdjust="spacingAndGlyphs"
        style="
            fill:#ff7f0e;
            stroke:#1f77b4;
            stroke-width:1;
            font-size:60px;
        ">SVG text
    </text>

    <rect
        x="97"
        y="7"
        width="7"
        height="7"
        style="
            fill: #8c564b;
            cursor: move;
            fill-opacity: 1;
            stroke-width: 1;
            stroke: rgb(0,0,0);
            stroke-opacity: 1;
        " />

    </svg>

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



关键属性：
* textLength：文本长度
* lengthAdjust属性取值：`spacing|spacingAndGlyphs`，以上Demo正是展示了两种的不同。
* (x, y)： `(left, bottom)`的坐标，`y属性`是文字`基线`到容器顶部的像素值
* dx, dy：偏移量

svg的text标签没有以下类似的属性（<http://stackoverflow.com/questions/15500894/background-color-of-text-in-svg>）：

    border:1px solid #c5b0d5;
    background-color:red;

如果确实需要，只能模拟。比如绘制一个下层的矩形，并填充颜色。






### 路径

> <http://www.w3.org/TR/SVG11/paths.html>

指令：

* M = moveto
* L = lineto
* H = horizontal lineto
* V = vertical lineto
* C = curveto，三次贝塞尔曲线到
* S = smooth curveto，光滑三次贝塞尔曲线到
* Q = quadratic Belzier curve，二次贝塞尔曲线到
* T = smooth quadratic Belzier curveto，光滑二次贝塞尔曲线到
* A = elliptical Arc
* Z = closepath

指令`大写`表示`绝对`定位，`小写`表示`相对`定位




#### M指令、H指令和L指令

`注意L的小写l与1的区别`，仔细看是`横勾(l)与斜勾(1)的区别`。自动生成工具使用精简方式，容易造成误解。


<div id="test_210" class="test">
<div class="test-container">

    @[data-script="html editable"]<svg width="100%" height="100%">
    <path d="M30 30
        H300
        h2.786l8.179,7.089l9.633,4.544l8.725,2.182l9.814-0.909
            l1.636,1.091
        "
        style="
            fill:#eee;
            stroke:green;
            stroke-width:1
            "
        />
    </svg>

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


<img src="./img/courier-l-1.png" width="260">


#### C 三阶贝塞尔

从当前点绘制三次贝塞尔曲线到节点(x, y)。起点控制点为(x1, y1)，终点控制点为(x2, y2)。

参数： 

    x1 y1 x2 y2 x y

以下例子展示了`三阶`贝塞尔曲线，可以拖动起终点和控制点改变曲线形状。

<div id="test_220" class="test">
<div class="test-container">
<svg id="test_220_svg" class="svg-container" width="100%" height="200"></svg>

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_220');
        var svg = document.getElementById('test_220_svg')
            , config = {
                startPoint: {
                    x: 60
                    , y: 30
                }
                , endPoint: {
                    x: 380
                    , y: 175
                }
                , controlPoint1: {
                    x: 60
                    , y: 175
                }
                , controlPoint2: {
                    x: 380
                    , y: 30
                }
                , rect: {
                    width: 7
                    , height: 7
                }
            }
            ;

        function extend(dest, source){
            if(!source || !dest) return;
            for(var i in source){
                dest[i] = source[i]; 
            }
            return dest;
        }

        function render(data){
            var arr;

            extend(config, data);
           
            arr = [
                '<path d="'
                , '    M' + config.startPoint.x + ' ' + config.startPoint.y
                , '    C' + [ config.controlPoint1.x, config.controlPoint1.y
                            , config.controlPoint2.x, config.controlPoint2.y
                            , config.endPoint.x, config.endPoint.y ].join(' ')
                , '    "'

                , '    style="'
                , '        fill:white;'
                , '        stroke:red;'
                , '        stroke-width:2'
                , '        "'
                , '     />'

                , '<path d="'
                , '    M' + config.startPoint.x + ' ' + config.startPoint.y 
                    + ' L' + config.controlPoint1.x + ' ' + config.controlPoint1.y
                , '    M' + config.endPoint.x + ' ' + config.endPoint.y 
                    + ' L' + config.controlPoint2.x + ' ' + config.controlPoint2.y
                , '    "'

                , '    style="'
                , '        fill:white;'
                , '        stroke:#98df8a;'
                , '        stroke-width:1'
                , '        "'
                , '     />'

                , '<rect data-role="start-point"'
                    + ' width="' + config.rect.width + '" height="' + config.rect.height + '"'
                    + ' x="' + ( config.startPoint.x - Math.floor( config.rect.width / 2 ) )+ '"' 
                    + ' y="' + ( config.startPoint.y - Math.floor( config.rect.height / 2 ) )+ '"' 
                , '    style="'
                , '        fill: #8c564b;'
                , '        cursor:move;'
                , '        fill-opacity: 1;'
                , '        stroke-width: 1;'
                , '        stroke: rgb(0,0,0);'
                , '        stroke-opacity: 1;'
                , '    " />'

                , '<text'
                    + ' x="' + ( config.startPoint.x + config.rect.width ) + '"' 
                    + ' y="' + ( config.startPoint.y + config.rect.height )+ '"' 
                , '    style="'
                , '        fill: #8c564b;'
                , '        font-size: 12px;'
                , '        fill-opacity: 1;'
                , '        stroke-width: 0.5;'
                , '        stroke: #637939;'
                , '        stroke-opacity: 1;'
                , '        -webkit-user-select:none;'
                , '    ">'
                , '[ ' 
                    + config.startPoint.x
                    + ', '
                    + config.startPoint.y
                    + ' ]'
                , '</text>'

                , '<rect data-role="end-point"'
                    + ' width="' + config.rect.width + '" height="' + config.rect.height + '"'
                    + ' x="' + ( config.endPoint.x - Math.floor( config.rect.width / 2 ) )+ '"' 
                    + ' y="' + ( config.endPoint.y - Math.floor( config.rect.height / 2 ) )+ '"' 
                , '    style="'
                , '        fill: #8c564b;'
                , '        cursor:move;'
                , '        fill-opacity: 1;'
                , '        stroke-width: 1;'
                , '        stroke: rgb(0,0,0);'
                , '        stroke-opacity: 1;'
                , '    " />'

                , '<text'
                    + ' x="' + ( config.endPoint.x + config.rect.width ) + '"' 
                    + ' y="' + ( config.endPoint.y + config.rect.height )+ '"' 
                , '    style="'
                , '        fill: #8c564b;'
                , '        font-size: 12px;'
                , '        fill-opacity: 1;'
                , '        stroke-width: 0.5;'
                , '        stroke: #637939;'
                , '        stroke-opacity: 1;'
                , '        -webkit-user-select:none;'
                , '    ">'
                , '[ ' 
                    + config.endPoint.x
                    + ', '
                    + config.endPoint.y
                    + ' ]'
                , '</text>'

                , '<rect data-role="start-control"'
                    + ' width="' + config.rect.width + '" height="' + config.rect.height + '"'
                    + ' x="' + ( config.controlPoint1.x - Math.floor( config.rect.width / 2 ) )+ '"' 
                    + ' y="' + ( config.controlPoint1.y - Math.floor( config.rect.height / 2 ) )+ '"' 
                , '    style="'
                , '        fill: #8c564b;'
                , '        cursor:move;'
                , '        fill-opacity: 1;'
                , '        stroke-width: 1;'
                , '        stroke: rgb(0,0,0);'
                , '        stroke-opacity: 1;'
                , '    " />'

                , '<text'
                    + ' x="' + ( config.controlPoint1.x + config.rect.width ) + '"' 
                    + ' y="' + ( config.controlPoint1.y + config.rect.height )+ '"' 
                , '    style="'
                , '        fill: #8c564b;'
                , '        font-size: 12px;'
                , '        fill-opacity: 1;'
                , '        stroke-width: 0.5;'
                , '        stroke: #637939;'
                , '        stroke-opacity: 1;'
                , '        -webkit-user-select:none;'
                , '    ">'
                , '[ ' 
                    + config.controlPoint1.x
                    + ', '
                    + config.controlPoint1.y
                    + ' ]'
                , '</text>'

                , '<rect data-role="end-control"' 
                    + ' width="' + config.rect.width + '" height="' + config.rect.height + '"'
                    + ' x="' + ( config.controlPoint2.x - Math.floor( config.rect.width / 2 ) )+ '"' 
                    + ' y="' + ( config.controlPoint2.y - Math.floor( config.rect.height / 2 ) )+ '"' 
                , '    style="'
                , '        fill: #8c564b;'
                , '        cursor:move;'
                , '        fill-opacity: 1;'
                , '        stroke-width: 1;'
                , '        stroke: rgb(0,0,0);'
                , '        stroke-opacity: 1;'
                , '    " />'

                , '<text'
                    + ' x="' + ( config.controlPoint2.x + config.rect.width ) + '"' 
                    + ' y="' + ( config.controlPoint2.y + config.rect.height )+ '"' 
                , '    style="'
                , '        fill: #8c564b;'
                , '        font-size: 12px;'
                , '        fill-opacity: 1;'
                , '        stroke-width: 0.5;'
                , '        stroke: #637939;'
                , '        stroke-opacity: 1;'
                , '        -webkit-user-select:none;'
                , '    ">'
                , '[ ' 
                    + config.controlPoint2.x
                    + ', '
                    + config.controlPoint2.y
                    + ' ]'
                , '</text>'


            ]; 

            svg.innerHTML = arr.join('');
        }

        render();

        var dragging = 0;
        var initialData = null
            , offsetData = null
            , role = null
            ;

        function update(){
            switch(role){
                case 'start-control':
                    render({
                        controlPoint1: {
                            x: initialData.config.controlPoint1.x + offsetData.x
                            , y: initialData.config.controlPoint1.y + offsetData.y
                        }
                    });
                    break;
                case 'end-control':
                    render({
                        controlPoint2: {
                            x: initialData.config.controlPoint2.x + offsetData.x
                            , y: initialData.config.controlPoint2.y + offsetData.y
                        }
                    });
                    break;
                case 'start-point':
                    render({
                        startPoint: {
                            x: initialData.config.startPoint.x + offsetData.x
                            , y: initialData.config.startPoint.y + offsetData.y
                        }
                    });
                    break;
                case 'end-point':
                    render({
                        endPoint: {
                            x: initialData.config.endPoint.x + offsetData.x
                            , y: initialData.config.endPoint.y + offsetData.y
                        }
                    });
                    break;
            }
        }

        svg.addEventListener('mousedown', function(e){
            var target = e.target;
            if('rect' == target.tagName.toLowerCase()){
                dragging = 1; 
                role = target.getAttribute('data-role'); 
                initialData = {
                    x: e.screenX
                    , y: e.screenY
                    , config: extend({}, config)
                };
            }
        }, false);

        svg.addEventListener('mouseup', function(e){
            dragging = 0; 
            initlalData = offsetData = null;
            role = null;
        }, false);

        svg.addEventListener('mousemove', function(e){
            var target = e.target;
            offsetData = {
                x: e.screenX - initialData.x
                , y: e.screenY - initialData.y
            }; 
            update();
        }, false);


    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>





#### S 三阶平滑贝塞尔

从当前点绘制一条三次贝塞尔曲线至指定点，使用上一节点的控制点的`镜像节点`作为控制点。参数为：

    x2 y2 x y

将以上的Demo再扩展一下，允许`常规编辑`功能：

* 添加新点（`按住win-Alt或mac-option点击空白处`）
* 删除点（`按住shift点击指定点`）


<div id="test_230" class="test">
<div class="test-panel">
<label><input type="checkbox" id="test_230_checkbox_1" checked="checked"> 显示辅助线</label>
<label><input type="checkbox" id="test_230_checkbox_2"> 显示坐标</label>
<label><input type="checkbox" id="test_230_checkbox_3" checked> 平滑模式</label>
</div>
<div class="test-container">
<svg id="test_230_svg" width="100%" height="400"></svg>

    @[data-script="javascript editable"](function(){

        var svg = document.getElementById('test_230_svg')
            , graph = {
                data: [
                    {
                        p: {
                            x: 60
                            , y: 30
                        }
                        , cp: {
                            x: 20
                            , y: 160
                        }
                    }
                    , {
                        p: {
                            x: 230
                            , y: 190
                        }
                        , cp: {
                            x: 198
                            , y: 70
                        }
                    }
                    , {
                        p: {
                            x: 650
                            , y: 103
                        }
                        , cp: {
                            x: 397
                            , y: 42
                        }
                    }

                ]

                , config: {

                    showAuxiliaryLine: 1
                    , showCoordinates: 0
                    , smoothly: 1
                    , rect: {
                        width: 7
                        , height: 7
                        , style: {
                            p: {
                                fill: '#8c564b'
                                , cursor: 'move'
                                , 'fill-opacity': 1
                                , 'stroke-width': 1
                                , stroke: 'rgb(0,0,0)'
                                , 'stroke-opacity': 1
                            }

                            , cp: {
                                fill: '#fd8d3c'
                                , cursor: 'move'
                                , 'fill-opacity': 1
                                , 'stroke-width': 1
                                , stroke: 'rgb(0,0,0)'
                                , 'stroke-opacity': 1
                            }
                        }
                    }

                    , curve: {
                        style: {
                            fill: 'white'
                            , stroke: 'red'
                            , 'stroke-width':2
                        }
                    }

                    , line: {
                        style: {
                            'fill': 'white'
                            , 'stroke': '#98df8a'
                            , 'stroke-width': 1
                        }
                    }
                    
                    , text: {
                        style: {
                            'fill': '#8c564b'
                            , 'font-size': '12px'
                            , 'fill-opacity': 1
                            , 'stroke-width': 0.5
                            , 'stroke': '#637939'
                            , 'stroke-opacity': 1
                            , '-webkit-user-select':'none'
                        }
                    }

                }
            }
            ;

        function extend(dest, source){
            if(!source || !dest) return;
            for(var i in source){
                dest[i] = source[i]; 
            }
            return dest;
        }

        function clear() {
            svg.innerHTML = '';
        }

        function render(){

            var arr
                , points = graph.data
                , config = graph.config
                ;

            clear();
            drawCurve(points);

            if(!config.showAuxiliaryLine
                && !config.showCoordinates) 
                return;

            for(var i=0; i<points.length; i++){

                if(config.showAuxiliaryLine) {
                    rect(points[i].p, i + 'p');
                    lineTo(points[i].p, points[i].cp);
                    rect(points[i].cp, i + 'cp');
                }

                if(config.showCoordinates){
                    text(points[i].p);
                    text(points[i].cp);
                }
            }

        }

        function rect(point, index) {

            var rect
                , config = graph.config.rect
                ;

            rect = [
                '<rect'
                , ' data-index="'
                , index
                , '" width="'
                , config.width 
                , '" height="'
                , config.height 
                , '" x="'
                , point.x - Math.floor(config.width / 2)
                , '" y="'
                , point.y - Math.floor(config.height / 2)
                , '" style="'
                , getStyle(/cp/.test(index) ? config.style.cp : config.style.p)
                , '" />'
            ];

            svg.innerHTML += rect.join('');

        }

        function text(point) {

            var text
                , rectConfig = graph.config.rect
                , config = graph.config.text
                ;

            text = [
                '<text'
                , ' x="'
                , point.x + rectConfig.width
                , '" y="'
                , point.y
                , '" style="'
                , getStyle(config.style)
                , '">[ '
                , point.x 
                , ', '
                , point.y
                , ' ]</text>'
            ];

            svg.innerHTML += text.join('');

        }

        function lineTo(from, to){

            var def
                ;

            def = [
                'M'
                , from.x
                , from.y
                , 'L'
                , to.x
                , to.y
            ];

            addPath(def, graph.config.line.style); 

        }

        function drawCurve(points) {

            if(points.length < 2) return;

            var def
                , smoothly = graph.config.smoothly
                , from = points[0]
                , to = points[1]
                ;

            def = [
                'M'
                , from.p.x
                , from.p.y
                , 'C'
                , from.cp.x
                , from.cp.y
                , to.cp.x
                , to.cp.y
                , to.p.x
                , to.p.y
            ];

            for(var i=2; i<points.length; i++){

                from = points[i-1];
                to = points[i];

                if(smoothly) {
                    def = def.concat([
                        'S'
                        , to.cp.x
                        , to.cp.y
                        , to.p.x
                        , to.p.y
                    ]);
                }
                else {
                    def = def.concat([
                        'C'
                        , from.cp.x
                        , from.cp.y
                        , to.cp.x
                        , to.cp.y
                        , to.p.x
                        , to.p.y
                    ]);
                }
            }

            addPath(def, graph.config.curve.style); 

        }

        function curveTo(from, to) {

            var def
                ;

            def = [
                'M'
                , from.p.x
                , from.p.y
                , 'C'
                , from.cp.x
                , from.cp.y
                , to.cp.x
                , to.cp.y
                , to.p.x
                , to.p.y
            ];

            addPath(def, graph.config.curve.style); 

        }

        function getStyle(style) {
            var arr = [];
            for(var i in style) {
                arr.push(i + ':' + style[i]);
            }
            return arr.join(';');
        }

        function addPath(def, style){
            var path
                ;

            path = [
                '<path'
                , ' d="'
                , def.join(' ')
                , '" style="'
                , getStyle(style)
                , '" />'
            ];

            svg.innerHTML += path.join('');
        }



        // Initial render
        render();


        (function(){

            var dragging = 0;
            var initialData = null
                , offsetData = null
                , index = null
                ;

            function update(){
                setPointConfig(index, {
                    x: initialData.config.x + offsetData.x
                    , y: initialData.config.y + offsetData.y
                });
                render();
            }

            function getPointConfig(index) {
                var result = index.match(/^(\d+)(p|cp)$/);
                var config = graph.data[result[1]][result[2]];
                return config;
            }

            function setPointConfig(index, config) {
                var result = index.match(/^(\d+)(p|cp)$/);
                graph.data[result[1]][result[2]] = config;
            }

            function removePointConfig(index) {
                var result = index.match(/^(\d+)(p|cp)$/);
                graph.data.splice(result[1], 1);
            }

            function addPointConfig(config) {
                graph.data.push(config);
            }

            svg.addEventListener('mousedown', function(e){

                var target = e.target;
                if('rect' == target.tagName.toLowerCase()){
                    index = target.getAttribute('data-index'); 

                    if(e.shiftKey){
                        removePointConfig(index);
                        render();
                    }
                    else {
                        dragging = 1; 
                        initialData = {
                            x: e.screenX
                            , y: e.screenY
                            , config: extend({}, getPointConfig(index))
                            , index: index
                        };
                    }
                }
                else if(e.altKey){
                    var x = e.pageX -svg.offsetLeft
                        , y = e.pageY - svg.offsetTop
                        ;
                    addPointConfig(
                        {
                            p: {
                                x: x
                                , y: y 

                            }

                            , cp: {
                                x: x 
                                , y: y - 20 

                            }
                        }
                    );
                    render();
                }

            }, false);

            svg.addEventListener('mouseup', function(e){
                dragging = 0; 
                initlalData = offsetData = null;
                index = null;
            }, false);

            svg.addEventListener('mousemove', function(e){
                var target = e.target;
                offsetData = {
                    x: e.screenX - initialData.x
                    , y: e.screenY - initialData.y
                }; 
                update();
            }, false);

            document.getElementById('test_230_checkbox_1').addEventListener('click', function(e){
                var target = e.target;
                if(target.checked) {
                    graph.config.showAuxiliaryLine = 1;
                }
                else {
                    graph.config.showAuxiliaryLine = 0;
                }
                render();
            });

            document.getElementById('test_230_checkbox_2').addEventListener('click', function(e){
                var target = e.target;
                if(target.checked) {
                    graph.config.showCoordinates = 1;
                }
                else {
                    graph.config.showCoordinates = 0;
                }
                render();
            });

            document.getElementById('test_230_checkbox_3').addEventListener('click', function(e){
                var target = e.target;
                if(target.checked) {
                    graph.config.smoothly = 1;
                }
                else {
                    graph.config.smoothly = 0;
                }
                render();
            });

        })();
    })();

</div>
<div class="test-console"></div>
</div>







#### Q 二阶贝塞尔

从当前点绘制`二次贝塞尔曲线`至目标点(x, y)，使用(x1, y1)为控制点。参数为：

    x1 y1 x y


以下例子展示了二阶贝塞尔曲线，可以拖动起终点和控制点改变曲线形状。

<div id="test_235" class="test">
<div class="test-container">
<svg id="test_235_svg" class="svg-container" width="100%" height="200"></svg>

    @[data-script="javascript editable"](function(){

        var svg = document.getElementById('test_235_svg')
            , config = {
                startPoint: {
                    x: 50
                    , y: 177
                }
                , endPoint: {
                    x: 200
                    , y: 177
                }
                , controlPoint1: {
                    x: 50
                    , y: 30
                }
                , rect: {
                    width: 7
                    , height: 7
                }
            }
            ;

        function extend(dest, source){
            if(!source || !dest) return;
            for(var i in source){
                dest[i] = source[i]; 
            }
            return dest;
        }

        function render(data){
            var arr;

            extend(config, data);
           
            arr = [
                '<path d="'
                , '    M' + config.startPoint.x + ' ' + config.startPoint.y
                , '    Q' + [ config.controlPoint1.x, config.controlPoint1.y
                            , config.endPoint.x, config.endPoint.y ].join(' ')
                , '    "'

                , '    style="'
                , '        fill:white;'
                , '        stroke:red;'
                , '        stroke-width:2'
                , '        "'
                , '     />'

                , '<path d="'
                , '    M' + config.startPoint.x + ' ' + config.startPoint.y 
                    + ' L' + config.controlPoint1.x + ' ' + config.controlPoint1.y
                , '    "'

                , '    style="'
                , '        fill:white;'
                , '        stroke:#98df8a;'
                , '        stroke-width:1'
                , '        "'
                , '     />'

                , '<rect data-role="start-point"'
                    + ' width="' + config.rect.width + '" height="' + config.rect.height + '"'
                    + ' x="' + ( config.startPoint.x - Math.floor( config.rect.width / 2 ) )+ '"' 
                    + ' y="' + ( config.startPoint.y - Math.floor( config.rect.height / 2 ) )+ '"' 
                , '    style="'
                , '        fill: #8c564b;'
                , '        cursor:move;'
                , '        fill-opacity: 1;'
                , '        stroke-width: 1;'
                , '        stroke: rgb(0,0,0);'
                , '        stroke-opacity: 1;'
                , '    " />'

                , '<text'
                    + ' x="' + ( config.startPoint.x + config.rect.width ) + '"' 
                    + ' y="' + ( config.startPoint.y + config.rect.height )+ '"' 
                , '    style="'
                , '        fill: #8c564b;'
                , '        font-size: 12px;'
                , '        fill-opacity: 1;'
                , '        stroke-width: 0.5;'
                , '        stroke: #637939;'
                , '        stroke-opacity: 1;'
                , '        -webkit-user-select:none;'
                , '    ">'
                , '[ ' 
                    + config.startPoint.x
                    + ', '
                    + config.startPoint.y
                    + ' ]'
                , '</text>'

                , '<rect data-role="end-point"'
                    + ' width="' + config.rect.width + '" height="' + config.rect.height + '"'
                    + ' x="' + ( config.endPoint.x - Math.floor( config.rect.width / 2 ) )+ '"' 
                    + ' y="' + ( config.endPoint.y - Math.floor( config.rect.height / 2 ) )+ '"' 
                , '    style="'
                , '        fill: #8c564b;'
                , '        cursor:move;'
                , '        fill-opacity: 1;'
                , '        stroke-width: 1;'
                , '        stroke: rgb(0,0,0);'
                , '        stroke-opacity: 1;'
                , '    " />'

                , '<text'
                    + ' x="' + ( config.endPoint.x + config.rect.width ) + '"' 
                    + ' y="' + ( config.endPoint.y + config.rect.height )+ '"' 
                , '    style="'
                , '        fill: #8c564b;'
                , '        font-size: 12px;'
                , '        fill-opacity: 1;'
                , '        stroke-width: 0.5;'
                , '        stroke: #637939;'
                , '        stroke-opacity: 1;'
                , '        -webkit-user-select:none;'
                , '    ">'
                , '[ ' 
                    + config.endPoint.x
                    + ', '
                    + config.endPoint.y
                    + ' ]'
                , '</text>'

                , '<rect data-role="start-control"'
                    + ' width="' + config.rect.width + '" height="' + config.rect.height + '"'
                    + ' x="' + ( config.controlPoint1.x - Math.floor( config.rect.width / 2 ) )+ '"' 
                    + ' y="' + ( config.controlPoint1.y - Math.floor( config.rect.height / 2 ) )+ '"' 
                , '    style="'
                , '        fill: #8c564b;'
                , '        cursor:move;'
                , '        fill-opacity: 1;'
                , '        stroke-width: 1;'
                , '        stroke: rgb(0,0,0);'
                , '        stroke-opacity: 1;'
                , '    " />'

                , '<text'
                    + ' x="' + ( config.controlPoint1.x + config.rect.width ) + '"' 
                    + ' y="' + ( config.controlPoint1.y + config.rect.height )+ '"' 
                , '    style="'
                , '        fill: #8c564b;'
                , '        font-size: 12px;'
                , '        fill-opacity: 1;'
                , '        stroke-width: 0.5;'
                , '        stroke: #637939;'
                , '        stroke-opacity: 1;'
                , '        -webkit-user-select:none;'
                , '    ">'
                , '[ ' 
                    + config.controlPoint1.x
                    + ', '
                    + config.controlPoint1.y
                    + ' ]'
                , '</text>'


            ]; 

            svg.innerHTML = arr.join('');
        }

        render();

        var dragging = 0;
        var initialData = null
            , offsetData = null
            , role = null
            ;

        function update(){
            switch(role){
                case 'start-control':
                    render({
                        controlPoint1: {
                            x: initialData.config.controlPoint1.x + offsetData.x
                            , y: initialData.config.controlPoint1.y + offsetData.y
                        }
                    });
                    break;
                case 'end-control':
                    render({
                        controlPoint2: {
                            x: initialData.config.controlPoint2.x + offsetData.x
                            , y: initialData.config.controlPoint2.y + offsetData.y
                        }
                    });
                    break;
                case 'start-point':
                    render({
                        startPoint: {
                            x: initialData.config.startPoint.x + offsetData.x
                            , y: initialData.config.startPoint.y + offsetData.y
                        }
                    });
                    break;
                case 'end-point':
                    render({
                        endPoint: {
                            x: initialData.config.endPoint.x + offsetData.x
                            , y: initialData.config.endPoint.y + offsetData.y
                        }
                    });
                    break;
            }
        }

        svg.addEventListener('mousedown', function(e){
            var target = e.target;
            if('rect' == target.tagName.toLowerCase()){
                dragging = 1; 
                role = target.getAttribute('data-role'); 
                initialData = {
                    x: e.screenX
                    , y: e.screenY
                    , config: extend({}, config)
                };
            }
        }, false);

        svg.addEventListener('mouseup', function(e){
            dragging = 0; 
            initlalData = offsetData = null;
            role = null;
        }, false);

        svg.addEventListener('mousemove', function(e){
            var target = e.target;
            offsetData = {
                x: e.screenX - initialData.x
                , y: e.screenY - initialData.y
            }; 
            update();
        }, false);

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>







#### T 二阶平滑贝塞尔

从当前节点绘制`二次贝塞尔曲线`至目标点(x, y)，使用上一节点控制点的`镜像节点`作为控制点。

    x y

以下展示`二次`贝塞尔曲线，支持编辑操作同上：

<div id="test_240" class="test">
<div class="test-panel">
<label><input type="checkbox" id="test_240_checkbox_1" checked> 显示辅助线</label>
<label><input type="checkbox" id="test_240_checkbox_2"> 显示坐标</label>
<label><input type="checkbox" id="test_240_checkbox_3" checked> 平滑模式</label>
</div>
<div class="test-container">
<svg id="test_240_svg" class="svg-container" width="100%" height="400"></svg>

    @[data-script="javascript editable"](function(){

        var svg = document.getElementById('test_240_svg')
            , graph = {
                data: [
                    {
                        p: {
                            x: 60
                            , y: 200
                        }
                        , cp: {
                            x: 220
                            , y: 390
                        }
                    }
                    , {
                        p: {
                            x: 380
                            , y: 200
                        }
                        , cp: {
                            x: 198
                            , y: 70
                        }
                    }
                    , {
                        p: {
                            x: 700
                            , y: 200
                        }
                        , cp: {
                            x: 397
                            , y: 42
                        }
                    }

                ]

                , config: {

                    showAuxiliaryLine: 1
                    , showCoordinates: 0
                    , smoothly: 1

                    , rect: {
                        width: 7
                        , height: 7
                        , style: {
                            p: {
                                fill: '#8c564b'
                                , cursor: 'move'
                                , 'fill-opacity': 1
                                , 'stroke-width': 1
                                , stroke: 'rgb(0,0,0)'
                                , 'stroke-opacity': 1
                            }

                            , cp: {
                                fill: '#fd8d3c'
                                , cursor: 'move'
                                , 'fill-opacity': 1
                                , 'stroke-width': 1
                                , stroke: 'rgb(0,0,0)'
                                , 'stroke-opacity': 1
                            }
                        }
                    }

                    , curve: {
                        style: {
                            fill: 'white'
                            , stroke: 'red'
                            , 'stroke-width':2
                        }
                    }

                    , line: {
                        style: {
                            'fill': 'white'
                            , 'stroke': '#98df8a'
                            , 'stroke-width': 1
                        }
                    }
                    
                    , text: {
                        style: {
                            'fill': '#8c564b'
                            , 'font-size': '12px'
                            , 'fill-opacity': 1
                            , 'stroke-width': 0.5
                            , 'stroke': '#637939'
                            , 'stroke-opacity': 1
                            , '-webkit-user-select':'none'
                        }
                    }

                }
            }
            ;

        function extend(dest, source){
            if(!source || !dest) return;
            for(var i in source){
                dest[i] = source[i]; 
            }
            return dest;
        }

        function clear() {
            svg.innerHTML = '';
        }

        function render(){

            var arr
                , points = graph.data
                , config = graph.config
                ;

            clear();
            drawCurve(points);

            if(!config.showAuxiliaryLine
                && !config.showCoordinates) 
                return;

            for(var i=0; i<points.length; i++){

                rect(points[i].p, i + 'p');

                if(config.showAuxiliaryLine) {
                    if(config.smoothly) {
                        if(i == 0) {
                            lineTo(points[i].p, points[i].cp);
                            rect(points[i].cp, i + 'cp');
                        }
                    }
                    else {
                        if(i < points.length - 1){
                            lineTo(points[i].p, points[i].cp);
                            rect(points[i].cp, i + 'cp');
                        }
                    }
                }

                if(config.showCoordinates){
                    text(points[i].p);
                    if(config.smoothly) {
                        if(i == 0) {
                            text(points[i].cp);
                        }
                    }
                    else {
                        if(i < points.length - 1){
                            text(points[i].cp);
                        }
                    }
                }
            }

        }

        function rect(point, index) {

            var rect
                , config = graph.config.rect
                ;

            rect = [
                '<rect'
                , ' data-index="'
                , index
                , '" width="'
                , config.width 
                , '" height="'
                , config.height 
                , '" x="'
                , point.x - Math.floor(config.width / 2)
                , '" y="'
                , point.y - Math.floor(config.height / 2)
                , '" style="'
                , getStyle(/cp/.test(index) ? config.style.cp : config.style.p)
                , '" />'
            ];

            svg.innerHTML += rect.join('');

        }

        function text(point) {

            var text
                , rectConfig = graph.config.rect
                , config = graph.config.text
                ;

            text = [
                '<text'
                , ' x="'
                , point.x + rectConfig.width
                , '" y="'
                , point.y
                , '" style="'
                , getStyle(config.style)
                , '">[ '
                , point.x 
                , ', '
                , point.y
                , ' ]</text>'
            ];

            svg.innerHTML += text.join('');

        }

        function lineTo(from, to){

            var def
                ;

            def = [
                'M'
                , from.x
                , from.y
                , 'L'
                , to.x
                , to.y
            ];

            addPath(def, graph.config.line.style); 

        }

        function drawCurve(points) {

            if(points.length < 2) return;

            var def
                , smoothly = graph.config.smoothly
                , from = points[0]
                , to = points[1]
                ;

            def = [
                'M'
                , from.p.x
                , from.p.y
                , 'Q'
                , from.cp.x
                , from.cp.y
                , to.p.x
                , to.p.y
            ];

            for(var i=2; i<points.length; i++){

                from = points[i-1];
                to = points[i];

                if(smoothly) {
                    def = def.concat([
                        'T'
                        , to.p.x
                        , to.p.y
                    ]);
                }
                else {
                    def = def.concat([
                        'Q'
                        , from.cp.x
                        , from.cp.y
                        , to.p.x
                        , to.p.y
                    ]);
                }
            }

            addPath(def, graph.config.curve.style); 

        }

        function curveTo(from, to) {

            var def
                ;

            def = [
                'M'
                , from.p.x
                , from.p.y
                , 'C'
                , from.cp.x
                , from.cp.y
                , to.cp.x
                , to.cp.y
                , to.p.x
                , to.p.y
            ];

            addPath(def, graph.config.curve.style); 

        }

        function getStyle(style) {
            var arr = [];
            for(var i in style) {
                arr.push(i + ':' + style[i]);
            }
            return arr.join(';');
        }

        function addPath(def, style){
            var path
                ;

            path = [
                '<path'
                , ' d="'
                , def.join(' ')
                , '" style="'
                , getStyle(style)
                , '" />'
            ];

            svg.innerHTML += path.join('');
        }



        // Initial render
        render();


        (function(){

            var dragging = 0;
            var initialData = null
                , offsetData = null
                , index = null
                ;

            function update(){
                setPointConfig(index, {
                    x: initialData.config.x + offsetData.x
                    , y: initialData.config.y + offsetData.y
                });
                render();
            }

            function getPointConfig(index) {
                var result = index.match(/^(\d+)(p|cp)$/);
                var config = graph.data[result[1]][result[2]];
                return config;
            }

            function setPointConfig(index, config) {
                var result = index.match(/^(\d+)(p|cp)$/);
                graph.data[result[1]][result[2]] = config;
            }

            function removePointConfig(index) {
                var result = index.match(/^(\d+)(p|cp)$/);
                graph.data.splice(result[1], 1);
            }

            function addPointConfig(config) {
                graph.data.push(config);
            }

            svg.addEventListener('mousedown', function(e){

                var target = e.target;
                if('rect' == target.tagName.toLowerCase()){
                    index = target.getAttribute('data-index'); 

                    if(e.shiftKey){
                        removePointConfig(index);
                        render();
                    }
                    else {
                        dragging = 1; 
                        initialData = {
                            x: e.screenX
                            , y: e.screenY
                            , config: extend({}, getPointConfig(index))
                            , index: index
                        };
                    }
                }
                else if(e.altKey){
                    var x = e.pageX -svg.offsetLeft
                        , y = e.pageY - svg.offsetTop
                        ;
                    addPointConfig(
                        {
                            p: {
                                x: x
                                , y: y 

                            }

                            , cp: {
                                x: x 
                                , y: y - 20 

                            }
                        }
                    );
                    render();
                }

            }, false);

            svg.addEventListener('mouseup', function(e){
                dragging = 0; 
                initlalData = offsetData = null;
                index = null;
            }, false);

            svg.addEventListener('mousemove', function(e){
                var target = e.target;
                offsetData = {
                    x: e.screenX - initialData.x
                    , y: e.screenY - initialData.y
                }; 
                update();
            }, false);

            document.getElementById('test_240_checkbox_1').addEventListener('click', function(e){
                var target = e.target;
                if(target.checked) {
                    graph.config.showAuxiliaryLine = 1;
                }
                else {
                    graph.config.showAuxiliaryLine = 0;
                }
                render();
            });

            document.getElementById('test_240_checkbox_2').addEventListener('click', function(e){
                var target = e.target;
                if(target.checked) {
                    graph.config.showCoordinates = 1;
                }
                else {
                    graph.config.showCoordinates = 0;
                }
                render();
            });

            document.getElementById('test_240_checkbox_3').addEventListener('click', function(e){
                var target = e.target;
                if(target.checked) {
                    graph.config.smoothly = 1;
                }
                else {
                    graph.config.smoothly = 0;
                }
                render();
            });


        })();

    })();

</div>
</div>





#### 路径绘枪

    @[data-script="html editable"]<svg width="100%" height="300">
    <path 
        stroke="#996" fill="#636363" stroke-miterlimit="10" d="
            M53.861,99.117h2.786l8.179,7.089l9.633,4.544l8.725,2.182l9.814-0.909
            l1.636,1.091c0,0,2-3.817,5.09-4.908c3.09-1.09,8.542-5.997,10.542-8.724c2-2.727,2.729-20.063,2.729-20.063l-14.723-9.27
            l-4.727-8.472c0,0-1.451-5.412,1.456-9.522s11.085-4.11,11.085-4.11L117.9,54.88l3.271-5.998l-1.273-6.473l0.181-25.264
            l6.583,0.459l2.143,7.286l18.54,0.545l4.907,3.817l55.072,0.545l8.725,6.543v2.726l45.803,0.545l8.179,1.091l3.271,5.998
            l56.709,1.091l8.179-7.089l178.304,1.091l3.271-8.725l20.175,3.817v1.636l2.727,3.817l4.361,8.179l2.727,0.545l4.362,12.269v14.995
            l-2.727,18.539l-1.636,20.175l-0.545,3.271h-3.816l-2.727,6.544l-88.879,2.727l-2.727,4.907l-95.789-0.837
            c0,0-7.634,1.817-11.269,4.726s-8.543,12.177-8.543,12.177l-0.975,21.271c0,0-4.477,10.719-7.568,14.898
            c-3.089,4.181-12.723,9.998-17.631,11.634c-4.906,1.635-49.071-0.618-49.071-0.618c-28.9,0.546-32.717,5.998-32.717,5.998
            l-43.621,135.772l1.09,23.447l-7.634,4.907l-82.881-10.905l-3.271-6.543l-29.99-8.18l0.545-14.178l-5.453-7.088l42.348-99.531
            l1.272-3.091c0,0-3.272,0.364-5.453-0.363c-2.181-0.727-4.905-4.141-4.906-6.614c-0.002-2.475,8.724-17.994,8.724-17.994
            s4.633-0.335,7.087-3.2c2.106-2.46,3.297-7.322,5.816-12.359c5.453-10.905-1.998-24.79-1.998-24.79l-11.088-9.198l-16.175-7.705
            c0,0-20.175-7.089-25.628-19.63S53.861,99.117,53.861,99.117z"/>
    </svg>







## 滤镜

> 滤镜效果 fe - ( `Filter Effects` )

### Tips

* 滤镜效果使用`filter`标签来定义，滤镜可以包含多个孩子元素，每个孩子元素代表一个`滤镜原语`( filter primitive )，比如blur或光照效果等
* 可以在`graphics element`或`container element`的`filter`属性中应用滤镜效果
* 如果在container element，比如`g`上应用filter，则是对整个group应用滤镜效果
* 滤镜原语实际上是某种`图片处理算法`，一个原语的处理输出可以作为另一个的输入。通过`in`属性指定输入，通过`result`属性指定输出
* 通过关键词`SourceGraphic`或`SourceAlpha`指定输入为原始图形或原始的Alpha
* 通过对滤镜原语的`顺次组合`，使用`in`, `result`进行输入输出对接，达到不同的滤镜效果




### filter

<div id="test_filter" class="test">
<div class="test-container">

    @[data-script="html editable"]<svg width="100%" height="100%">
    <defs>
        <filter id="filter">
            <!--feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" /-->
            <feOffset in="SourceGraphic" dx="2" dy="2" result="offset1" />
            <feOffset in="SourceGraphic" dx="4" dy="4" result="offset2" />
            <!--feOffset in="SourceGraphic" dx="6" dy="6" result="offset3" /-->
            <feMerge>
                <!--feMergeNode in="offset3" /-->
                <feMergeNode in="offset2" />
                <feMergeNode in="offset1" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
    </defs>
    <circle 
        cx="100" 
        cy="50" 
        r="40" 
        stroke="#ff7f0e" 
        stroke-width="5" 
        fill="#2ca02c"
        filter="url(#filter)"
        />
    </svg>

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



### 滤镜指令

    feBlend
    feColorMatrix
    feComponentTransfer
    feComposite
    feConvolveMatrix
    feDiffuseLighting
    feDisplacementMap
    feFlood
    feGaussianBlur
    feImage
    feMerge
    feMorphology
    feOffset
    feSpecularLighting
    feTile
    feTurbulence



### 高斯模糊

`高斯模糊`的椭圆形：


    @[data-script="html editable"]<svg width="100%" height="160">
    <defs>
    <filter id="Gaussian_Blur">
    <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
    </filter>
    </defs>
    <ellipse 
        cx="100" cy="80" rx="70" ry="40"
        style="
            fill:#666;
            stroke:#8ca252;
            stroke-width:1;
            filter:url(#Gaussian_Blur)
        "/>
    </svg>



### 滤镜组合


    @[data-script="html editable"]<svg width="200" height="120">
        <defs>
            <filter
                id="MyFilter"
                filterUnits="userSpaceOnUse"
                x="0" y="0" width="200" height="120"
            >
                <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
                <feOffset in="blur" dx="4" dy="4" result="offsetBlur" />
                <feSpecularLighting
                    in="blur"
                    surfaceScale="5"
                    specularConstant=".75"
                    specularExponent="20"
                    lighting-color="#bbbbbb"
                    result="specOut"
                >
                    <fePointLight x="-5000" y="-10000" z="20000" />
                </feSpecularLighting>
                <feComposite
                    in="specOut"
                    in2="SourceAlpha"
                    operator="in"
                    result="specOut"
                />
                <feComposite
                    in="SourceGraphic"
                    in2="specOut"
                    operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint"
                />
                <feMerge>
                    <feMergeNode in="offsetBlur" />
                    <feMergeNode in="litPaint" />
                </feMerge>
            </filter>
        </defs>
        <rect x="1" y="1" width="198" height="118" fill="#888888" stroke="blue" />
        <g filter="url(#MyFilter)">
            <g>
                <path fill="none" stroke="#D90000" stroke-width="10"
                    d="M50,90 C0,90 0,30 50,30 L150,30 C200,30 200,90 150,90 z" />
                <path fill="#D90000"
                    d="M60,80 C30,80 30,40 60,40 L140,40 C170,40 170,80 140,80 z" />
                <g fill="#FFFFFF" stroke="black" font-size="45" font-family="Verdana" >
                    <text x="52" y="76">SVG</text>
                </g>
            </g>
        </g>
    </svg>




## 动画

    elements:
        animate
        set
        animateMotion
        animateColor - deprecated，完全可用animate替代

    extensions:
        animateTransform
        path
        mpath
        keyPoints
        rotate





### animate

案例：<http://dwz.cn/6gn0rq>

### 短半径变化 

> `点击椭圆`，启动动画

    @[data-script="html editable"]<svg width="100%" height="160">
    <ellipse 
        cx="100" cy="80" rx="70" ry="40">
        <animate attributeName="ry"
            begin="click" dur="3s" values="40; 20; 40" />
    </ellipse>
    </svg>


### 动画序列

* SVG animate: <https://www.w3.org/TR/SVG11/animate.html>
* SMIL Animation: <https://www.w3.org/TR/smil-animation/>

> 支持id`定义和引用`

    <animate id="A" begin="10s" .../>
    <animate id="B" begin="A.begin+5s" .../>
    <animate id="C" begin="click" .../>
    <animate id="D" begin="C.begin+5s" .../>

双半径`依次`变化，两个动画形成`序列`：

    @[data-script="html editable"]<svg width="100%" height="160">
    <ellipse 
        cx="100" cy="80" rx="70" ry="40">
        <animate id="ani_1" attributeName="ry"
            begin="click" dur="1s" values="40; 20; 40" />
        <animate id="ani_2" attributeName="rx"
            begin="ani_1.end" dur="1s" values="70; 35; 70" />
    </ellipse>
    </svg>

其他例子：

    begin=" x.load "        : Begin when "load" is observed on "x"
    begin="x.focus+3s"      : Begin 3 seconds after an "focus" event on "x"
    begin="x.endEvent+1.5s" : Begin 1 and a half seconds after an "endEvent" event on "x"
    begin="x.repeat"        : Begin each time a repeat event is observed on "x"


### 其他

> todo

    to="two.png"


