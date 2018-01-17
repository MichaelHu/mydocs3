# bootstrap

> @[style="color:green;font-size:18px"]The most popular HTML, CSS, and JavaScript 
> framework for developing `responsive`, `mobile-first` projects on the web.

> 为每一人每一处而设计

## Features

* 提供开发SDK：Sass variables, mixins, responsive grid system, extensive prebuild components, powerful plugins built on jQuery等
* CSS`预处理器`，推荐使用`sass`，其他的［ less, postcss ］
* 提供官方`Themes`，有些特定Theme是收费的
* `一个框架任何设备`
* 拥有`各类特性`：文档、组件以及jQuery插件
* `bootstrap 4`正在预发布版：<https://v4-alpha.getbootstrap.com>


## Resources

* `site`: <http://getbootstrap.com>
* `github`: <https://github.com/twbs/bootstrap> <iframe src="http://258i.com/gbtn.html?user=twbs&repo=bootstrap&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe> 


## Versions

* v4.x <https://getbootstrap.com/docs/4.0/getting-started/introduction/>
    * `Reboot.css`： 默认box-sizing为`border-box`，使用rem，干掉多数元素的`margin-top`，`touch-action: manipulation`来加速移动端点击等，测试页面很好的展示了区别：<https://codepen.io/ncerminara/pen/RLMwmy>
* v3.0.0 - v3.3.7 <https://getbootstrap.com/docs/3.3/>
* v2.0.0 - v2.3.2 <https://getbootstrap.com/2.3.2/>
* v1.0.0 - v1.4.0 


## Installation

`npm` packages:

    $ npm install bootstrap@4
    $ npm install bootstrap@3

or `download`:

* 4.x: <http://getbootstrap.com/docs/4.0/getting-started/download/>
* 3.x: <http://getbootstrap.com/docs/3.3/getting-started/#download>
* 2.x: <https://getbootstrap.com/2.3.2/assets/bootstrap.zip>



## CSS

> Global CSS settings, fundamental HTML elements styled and enhanced with extensible classes, and an advanced grid system.

`全局CSS`设置，通过扩展类强化了的`基础HTML元素`，高级`栅格系统`。

`CSS体系说明`：<http://getbootstrap.com/css>



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

4. 跨浏览器渲染，使用reset css： <http://necolas.github.io/normalize.css/>

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

Bootstrap包含一套响应式、移动优先的流式`栅格系统`，随着设备或者视窗尺寸的增加适当地按比例增加到12列。

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


