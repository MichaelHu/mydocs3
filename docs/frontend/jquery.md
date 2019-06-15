# jquery

> Write less, do more! A great js library - <img src="./img/jquery-logo.png" style="background-color:#333; border-radius:3px;height: 20px"> 

<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>
<script src="http://258i.com/static/bower_components/jquery/dist/jquery.min.js"></script>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>


## Features

* 前端**基础库**
* 分模块设计开发，支持**自定义**构建
* **UMD**输出：支持**CommonJS**, **AMD**和**Global**多种模块类型输出，**AMD**在文件末尾实现


## Resources

* `site`: <https://jquery.com>
* `github`: <https://github.com/jquery/jquery> <iframe src="http://258i.com/gbtn.html?user=jquery&repo=jquery&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* `API`: <https://api.jquery.com>
* 中文API：
    * <http://jquery.cuishifeng.cn>
    * <http://www.css88.com/jqapi-1.9/>
* `zeptojs` - <ref://./zepto.md.html>
* browser-support: <https://jquery.com/browser-support/>


## Versions

latest: `3.4.1` <https://github.com/jquery/jquery/releases>

* **3.x**
    * 3.4.1 - 2019-05-02
    * ...
    * 3.2.1 - 2017-03-21
* **2.x**
    * 不再支持 *IE6/IE7/IE8* 浏览器
* **1.x**


## Installation

`npm` packages:

    $ npm install jquery

or `download`: <https://jquery.com/download/>



## Build

### Clone

    $ git clone https://github.com/jquery/jquery.git
    $ cd jquery
    $ npm install

### All-in构建

    $ grunt

### 自定义构建

> 参考: <https://github.com/jquery/jquery#modules>

    $ grunt custom:-ajax,-css,-sizzle,-deprecated
    $ grunt custom:-exports/amd

构建后，相关`自定义参数`会在`version`字段中体现，比如：

    var version = "3.2.2-pre -exports/amd"




## Modules

> 分模块设计，支持`自定义`构建，共`20`个module

    ajax                All AJAX functionality: $.ajax(), $.get(), $.post(), $.ajaxSetup(), .load(), 
                        transports, and ajax event shorthands such as .ajaxStart().
    ajax/xhr            The XMLHTTPRequest AJAX transport only.
    ajax/script         The <script> AJAX transport only; used to retrieve scripts.
    ajax/jsonp          The JSONP AJAX transport only; depends on the ajax/script transport.
    css                 The .css() method. Also removes all modules depending on 
                        css (including effects, dimensions, and offset).
    css/showHide        Non-animated .show(), .hide() and .toggle(); can be excluded if you 
                        use classes or explicit .css() calls to set the display 
                        property. Also removes the effects module.
    deprecated          Methods documented as deprecated but not yet removed.
    dimensions          The .width() and .height() methods, including inner- and outer- variations.
    effects             The .animate() method and its shorthands such as .slideUp() or .hide("slow").
    event               The .on() and .off() methods and all event functionality. Also 
                        removes event/alias.
    event/alias         All event attaching/triggering shorthands like .click() or .mouseover().
    event/focusin       Cross-browser support for the focusin and focusout events.
    event/trigger       The .trigger() and .triggerHandler() methods. Used by alias 
                        and focusin modules.
    offset              The .offset(), .position(), .offsetParent(), .scrollLeft(), 
                        and .scrollTop() methods.
    wrap                The .wrap(), .wrapAll(), .wrapInner(), and .unwrap() methods.
    core/ready          Exclude the ready module if you place your scripts at the end of the 
                        body. Any ready callbacks bound with jQuery() will simply be called 
                        immediately. However, jQuery(document).ready() will not be a function 
                        and .on("ready", ...) or similar will not be triggered.
    deferred            Exclude jQuery.Deferred. This also removes jQuery.Callbacks. Note that 
                        modules that depend on jQuery.Deferred(AJAX, effects, core/ready) will not 
                        be removed and will still expect jQuery.Deferred to be there. Include 
                        your own jQuery.Deferred implementation or exclude those modules as 
                        well ( grunt custom:-deferred,-ajax,-effects,-core/ready ).
    exports/global      Exclude the attachment of global jQuery variables ($ and jQuery) to the window.
    exports/amd         Exclude the AMD definition.

    As a special case, you may also replace Sizzle by using a special flag grunt custom:-sizzle.

    sizzle              The Sizzle selector engine. When this module is excluded, it is replaced 
                        by a rudimentary selector engine based on the browser's querySelectorAll 
                        method that does not support jQuery selector extensions or enhanced 
                        semantics. See the selector-native.js file for details.


## Examples

### find()

> `find( selector )`方法仅用于查找`子孙节点`中匹配selector的元素，`不包含当前元素本身`（即使当前元素匹配selector）。

以下为测试所用的DOM结构：

    @[data-script="html"]<style type="text/css">
        .test-content {
            margin-bottom: 20px;
        }

        .test-content, .test-content-inner {
            padding: 10px;
            border: 1px dashed #999;
        }
    </style>
    <div id="test_find_dom" class="test-content">
        .test-content
        <div class="test-content-inner">.test-content-inner</div>
    </div>


以下代码用于测试`find()`方法：

<div id="test_find" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_find');
        s.show( 'find( selector )方法仅用于查找子孙节点中匹配selector的元素' );

        s.append_show( $( '#test_find_dom' ).find( '.test-content' ).length );
        s.append_show( $( '#test_find_dom' ).find( '.test-content-inner' ).length );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>
