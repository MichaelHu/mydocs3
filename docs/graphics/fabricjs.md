# fabricjs

## Features

* canvas渲染库
* 支持svg到canvas，以及canvas到svg的转换
* 使用对象来描述图形，可以`序列化`成文本描述。文本描述可`由fabric解析`后渲染
* 支持SVG方式的path定义
* 封装渐变填充
* 支持图形事件、图形拖动、手动图形缩放、手动图形旋转等
* 提供常用内建动画
* 支持图形组合，组合可以作为一个独立的交互对象
* 支持增加图形阴影
* 支持图形翻转( flip )
* 可以对任何图形对象进行clip
* 支持手绘 
* 提供HTTP请求库
* 构建支持`模块自定义`，有如下模块可选
    * text — Adds support for static text (fabric.Text)
    * itext — Adds support for interactive text (fabric.IText, fabric.Textbox)
    * serialization — Adds support for loadFromJSON, loadFromDatalessJSON, and clone methods on fabric.Canvas
    * interaction — Adds support for interactive features of fabric — selecting/transforming objects/groups via mouse/touch devices.
    * parser — Adds support for fabric.parseSVGDocument, fabric.loadSVGFromURL, and fabric.loadSVGFromString
    * image_filters — Adds support for image filters, such as grayscale of white removal.
    * easing — Adds support for animation easing functions
    * node — Adds support for running fabric under node.js, with help of jsdom and node-canvas libraries.
    * freedrawing — Adds support for free drawing
    * gestures — Adds support for multitouch gestures with help of Event.js
    * object_straightening — Adds support for rotating an object to one of 0, 90, 180, 270, etc. depending on which is angle is closer.
    * animation — Adds support for animation (fabric.util.animate, fabric.util.requestAnimFrame, fabric.Object#animate, fabric.Canvas#fxCenterObjectH/#fxCenterObjectV/#fxRemove)


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>

<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/build/fabric/fabric.min.js"></script>


## Resources

* site: <http://fabricjs.com>
* github: <https://github.com/fabricjs/fabric.js>
* demos: <http://fabricjs.com/demos/>


## Installation

    $ bower install fabric
    $ npm install fabric --save


## Demos

### 对象边界矩形

    @[data-script="html"]<canvas id="canvas_bounding_rect" width="500" height="600"></canvas>


<div id="test_bounding_rect" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_bounding_rect');
        s.show(1);
        s.append_show(2);

        var canvas = new fabric.Canvas( "canvas_bounding_rect" );
        fabric.Object.prototype.transparentCorners = false;

        var rect = new fabric.Rect({
            left: 100,
            top: 50,
            width: 100,
            height: 100,
            fill: "green",
            angle: 20,
            padding: 10
        });
        canvas.add(rect);

        fabric.loadSVGFromURL("./svg/squirrel.svg", function(objects, options) {
            var shape = fabric.util.groupSVGElements(objects, options);
            canvas.add(shape.scale(0.6));
            shape.set({ left: 200, top: 100 }).setCoords();
            canvas.renderAll();

            canvas.forEachObject(function(obj) {
                var setCoords = obj.setCoords.bind(obj);
                obj.on({
                    moving: setCoords,
                    scaling: setCoords,
                    rotating: setCoords
                });
            });
        });

        canvas.on("after:render", function() {
            canvas.contextContainer.strokeStyle = "#555";

            canvas.forEachObject(function(obj) {
                var bound = obj.getBoundingRect();

                canvas.contextContainer.strokeRect(
                    bound.left + 0.5,
                    bound.top + 0.5,
                    bound.width,
                    bound.height
                );
            });
        });


    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>
