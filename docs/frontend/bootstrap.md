# bootstrap

> @[style="color:green;font-size:18px"]The most popular HTML, CSS, and JavaScript 
> framework for developing responsive, mobile first projects on the web.

`github`: <a href="https://github.com/twbs/bootstrap">https://github.com/twbs/bootstrap</a>

`docs`: <a href="http://getbootstrap.com">http://getbootstrap.com</a>

> 为每一人每一处而设计

CSS`预处理器`［Sass和less］；`一个框架任何设备`；拥有`各类特性`：文档、组件以及jQuery插件

## CSS

> Global CSS settings, fundamental HTML elements styled and enhanced with extensible classes, and an advanced grid system.

`全局CSS`设置，通过扩展类强化了的`基础HTML元素`，高级`栅格系统`。

`CSS体系说明`：<a href="http://getbootstrap.com/css">http://getbootstrap.com/css</a>

### HTML规范

1. DOCTYPE

        <!DOCTYPE html>
        <html>
          ...
        </html>

2. Mobole First，使移动设备更友好展示和zooming，加上以下meta：

        <meta name="viewport" content="width=device-width, initial-scale=1">

    如若不允许缩放，加上以下meta：

        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

3. 排版和链接，参考less文件：`scaffolding.less`

4. 跨浏览器渲染，使用reset css： <a href="http://necolas.github.io/normalize.css/">Normalize.css</a>

5. 容器，两个类：`.container`和`.container-fluid`
    
    `固定宽度`容器：
        
        <div class="container">
          ...
        </div>

    `流式（全宽度）`容器：
    
        <div class="container-fluid">
          ...
        </div>  

### 栅格系统

Bootstrap包含一套响应式、移动优先的流式栅格系统，随着设备或者视窗尺寸的增加适当地按比例增加到12列。

包含预定义CSS类，以及功能强大的mixin。

* 行必须放在`.container`或者`.container-fluid`中
* 使用行来创建水平列组
* 内容必须放在列中，只有列能作为行的最近孩子节点
* 预定义栅格类，诸如`.row`和`.col-xs-4`可以帮助迅速建立栅格布局；同时，使用less mixin
    也可以用来创建更多语义化的布局
* 列通过`padding`创建间距
* 负margin使内容外凸
* 栅格列通过指定跨越列的个数来创建，比如4个跨越列的样式类：`.col-xs-4`
* 如果一行里放了超过12个列，那么超出的列会作为一个单位放到下一行中
* 某一尺寸的栅格类会影响大于或等于该尺寸的设备，会覆盖小于该尺寸的栅格类
    比如`.col-md-`类不仅影响中间尺寸的设备，同时还会影响大尺寸的设备，如果`.col-lg-`未指定的话


### 栅格举例


