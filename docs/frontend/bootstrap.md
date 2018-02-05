# bootstrap

> @[style="color:green;font-size:18px"]The most popular HTML, CSS, and JavaScript 
> framework for developing `responsive`, `mobile-first` projects on the web.

> 为每一人每一处而设计



## Features

* CSS`预处理器`，推荐使用`sass`，其他的［ less, postcss ］
* 提供`开发SDK`：包括`Sass variables`, `mixins`, `responsive grid system`, `extensive prebuild components`, `powerful plugins built on jQuery`等
* 提供官方`Themes`，有些特定Theme是收费的
* 一个框架`任何设备`
* 拥有`各类特性`：文档、组件以及jQuery插件



## Resources

* `site`: <http://getbootstrap.com>
* `github`: <https://github.com/twbs/bootstrap> <iframe src="http://258i.com/gbtn.html?user=twbs&repo=bootstrap&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe> 
* used in `webpack`: <https://getbootstrap.com/docs/4.0/getting-started/webpack/>


## Versions

* v4.x <https://getbootstrap.com/docs/4.0/getting-started/introduction/>
    * `Reboot.css`： 默认box-sizing为`border-box`，使用rem，干掉多数元素的`margin-top`，`touch-action: manipulation`来加速移动端点击等，测试页面很好的展示了区别：<https://codepen.io/ncerminara/pen/RLMwmy>
    * `Theme`部分使用`Sass`构建，可由开发者将bootstrap源码作为项目源码引入，可以`自定义`包含的模块
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
* 使用`.row`来创建水平列组
* 内容必须放在`.col`中，只有`.col`能作为`.row`的最近孩子节点
* 预定义栅格类，诸如`.row`和`.col-xs-4`可以帮助迅速建立栅格布局；同时，使用less mixin
    也可以用来创建更多语义化的布局
* 列通过`padding`创建间距，可以使用为`.row`元素添加`.no-gutters`删除所有间距

        <div class="row no-gutters">
            ...
        </div>

* 负margin使内容外凸
* 栅格列通过指定`跨越列`的个数来创建，比如4个跨越列的样式类：`.col-xs-4`
* 如果一行里放了超过12个列，那么超出的列会作为一个单位放到下一行中
* 某一尺寸的栅格类会影响大于或等于该尺寸的设备，会覆盖小于该尺寸的栅格类
    比如`.col-md-`类不仅影响中间尺寸的设备，同时还会影响大尺寸的设备，如果`.col-lg-`未指定的话
* `列垂直`布局，有两种方式：

        /* 在`.row`元素上使用`.align-items-*` */
        .align-items-start
        .align-items-center
        .align-items-end

        /* 在`.col`元素本身使用`.align-self-*` */`
        .align-self-start
        .align-self-content
        .align-self-end

* `列水平`布局：

        /* 在`.row`元素上使用`.justify-content-*` */
        .justify-content-start
        .justify-content-center
        .justify-content-end
        .justify-content-around
        .justify-content-between



### Components

#### Badge

> `徽章`组件


#### Nav

    .nav
        .nav-item
            .nav-link
    .nav-tabs
    .nav-pills
    .nav-fill
    .nav-justified
    .flex-column


#### Forms

为input设置`合适的type`，例如email, number等

    .form-inline
    .form-group
    .form-control
    .form-control-lg
    .form-control-sm
    .form-control-file
    .form-control-plaintext
    .form-text

    /* checkboxes or radios */
    .form-check
    .form-check-inline
    .form-check-input
    .form-check-label

    readonly
    disabled
    .disabled


    /* Layout */
    Form groups
        .form-group
            .form-control
    Form grid
        .row
            .col
                .form-control
    Form row
        .form-row
            .col
                .form-control
        .form-row
            .form-group
                .form-control


    .col-x
    .col-auto

    /* Help text */
    .form-text      /* v4 */
    .help-blcck     /* v3 */


##### Validation

* 两个css伪类：`:invalid`和`:valid`，可用于` <input>, <select>, <textarea> `元素
* 这两个伪类在父类`.was-validated`作用域下有效，该类一般添加在` <form> `元素上
* `.is-invalid`, `.is-valid`类可用于服务端验证情况下使用，这两个类不需要`.was-validated`父类
* 现代浏览器支持的`constraint validation API` <https://www.w3.org/TR/html5/sec-forms.html#the-constraint-validation-api>
* `回馈消息`的显示可能使用`浏览器默认`提供的样式，也可以使用`自定义`样式
* 可以使用`setCustomValidity()`提供自定义的验证回馈消息
* 为`<form>`添加`novalidate`布尔属性，启用自定义回馈消息样式，它关闭了浏览器默认回馈消息样式，但仍然可以使用js的validation APIs
* 相关类：

        .valid-feedback
        .invalid-feedback

    在布局支持的情况下，可以使用`tooltip`：

        .valid-tooltip
        .invalid-tooltip

* 也适用于`自定义`的form表单

        .custom-control
        .custom-control-inline
        .custom-control-input
        .custom-control-label
        .custom-checkbox
        .custom-radio
        .custom-select
        .custom-file
        .custom-file-input

* 自定义表单使用了`~`兄弟选择器





