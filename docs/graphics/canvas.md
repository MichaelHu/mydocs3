# Canvas

> The HTML5 `<canvas>` tag is used to draw graphics, on the fly(动态地), via scripting (usually JavaScript). 

* `W3C HTML5`: <https://www.w3.org/TR/html5/scripting-1.html#the-canvas-element>
* `W3C Docs about 2d context`: <http://www.w3.org/TR/2dcontext/>
* `W3C Schools Ref:` <http://www.w3schools.com/tags/ref_canvas.asp>
* `2015-11-19`成为推荐标准


<style type="text/css">
@import url(http://258i.com/static/bower_components/snippets/css/mp/style.css);
.test canvas {
    width: 100%;
    height: 300px;
    border: 1px dashed #bbb;
}
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/bower_components/jquery/dist/jquery.min.js"></script>



## Canvas Performance

### Tips

* `预绘制`。在不可见的Canvas中预先绘制好小的重复对象，再通过drawImage绘制
* 避免使用`浮点坐标`
* 不要在`drawImage`中对图片进行scale
* 复杂场景中，使用`多层画布`
* 静态背景可用`DIV+CSS`方式，作为canvas的下层，避免绘制大图片
* 使用`CSS transforms`对画布进行scaling，这比GPU要快
* `批量`化画布绘制操作，比如折线绘制，先生成路径再一次性stroke
* 避免使用`shadowBlur`属性
* 尽可能减少绘制文本
* 使用`requestAnimationFrame`代替`setInterval`

### Resources

* MDN - Optimizing canvas <https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas>
* html5rocks - Improving HTML5 Canvas Performance <https://www.html5rocks.com/en/tutorials/canvas/performance/>




## Canvas Element基础

> `HTML5`定义的canvas元素，也即`HTMLCanvasElement`支持的接口

* standards: <https://www.w3.org/TR/html5/scripting-1.html#the-canvas-element>


### IDL

	typedef (CanvasRenderingContext2D or WebGLRenderingContext) RenderingContext;

	interface HTMLCanvasElement : HTMLElement {
			   attribute unsigned long width;
			   attribute unsigned long height;

	  RenderingContext? getContext(DOMString contextId, any... arguments);

	  DOMString toDataURL(optional DOMString type, any... arguments);
	  void toBlob(FileCallback? _callback, optional DOMString type, any... arguments);
	};

`3`个主要接口：

* getContext()
* toDataURL()
    * default type - `image/png`，还支持`image/jpeg`
    * 分辨率 - `96dpi`
    * 宽高为0的图：`data:,`
* toBlob()


### 注意事项

通过Javascript API group制定的`HTML Canvas 2D Context`提供的2D上下文接口区别开来。后文着重介绍。





## 2d-context IDL

    typedef (HTMLImageElement or
             HTMLVideoElement or
             HTMLCanvasElement) CanvasImageSource;

    interface CanvasRenderingContext2D {

      // back-reference to the canvas
      readonly attribute HTMLCanvasElement canvas;

      // state
      void save(); // push state on state stack
      void restore(); // pop state stack and restore state

      // transformations (default: transform is the identity matrix)
      void scale(unrestricted double x, unrestricted double y);
      void rotate(unrestricted double angle);
      void translate(unrestricted double x, unrestricted double y);
      void transform(unrestricted double a, unrestricted double b, unrestricted double c, unrestricted double d, unrestricted double e, unrestricted double f);
      void setTransform(unrestricted double a, unrestricted double b, unrestricted double c, unrestricted double d, unrestricted double e, unrestricted double f);

      // compositing
               attribute unrestricted double globalAlpha; // (default: 1.0)
               attribute DOMString globalCompositeOperation; // (default: "source-over")

      // colors and styles (see also the CanvasDrawingStyles interface)
               attribute (DOMString or CanvasGradient or CanvasPattern) strokeStyle; // (default: "black")
               attribute (DOMString or CanvasGradient or CanvasPattern) fillStyle; // (default: "black")
      CanvasGradient createLinearGradient(double x0, double y0, double x1, double y1);
      CanvasGradient createRadialGradient(double x0, double y0, double r0, double x1, double y1, double r1);
      CanvasPattern createPattern(CanvasImageSource image, [TreatNullAs=EmptyString] DOMString repetition);

      // shadows
               attribute unrestricted double shadowOffsetX; // (default: 0)
               attribute unrestricted double shadowOffsetY; // (default: 0)
               attribute unrestricted double shadowBlur; // (default: 0)
               attribute DOMString shadowColor; // (default: "transparent black")

      // rects
      void clearRect(unrestricted double x, unrestricted double y, unrestricted double w, unrestricted double h);
      void fillRect(unrestricted double x, unrestricted double y, unrestricted double w, unrestricted double h);
      void strokeRect(unrestricted double x, unrestricted double y, unrestricted double w, unrestricted double h);

      // path API (see also CanvasPathMethods)
      void beginPath();
      void fill();
      void stroke();
      void drawFocusIfNeeded(Element element);
      void clip(); // Further constrains the clipping region to the current path.
      boolean isPointInPath(unrestricted double x, unrestricted double y);

      // text (see also the CanvasDrawingStyles interface)
      void fillText(DOMString text, unrestricted double x, unrestricted double y, optional unrestricted double maxWidth);
      void strokeText(DOMString text, unrestricted double x, unrestricted double y, optional unrestricted double maxWidth);
      TextMetrics measureText(DOMString text);

      // drawing images
      void drawImage(CanvasImageSource image, unrestricted double dx, unrestricted double dy);
      void drawImage(CanvasImageSource image, unrestricted double dx, unrestricted double dy, unrestricted double dw, unrestricted double dh);
      void drawImage(CanvasImageSource image, unrestricted double sx, unrestricted double sy, unrestricted double sw, unrestricted double sh, unrestricted double dx, unrestricted double dy, unrestricted double dw, unrestricted double dh);

      // hit regions
      void addHitRegion(HitRegionOptions options);
      void removeHitRegion(DOMString id);
      void clearHitRegions();

      // pixel manipulation
      ImageData createImageData(unrestricted double sw, unrestricted double sh);
      ImageData createImageData(ImageData imagedata);
      ImageData getImageData(double sx, double sy, double sw, double sh);
      void putImageData(ImageData imagedata, double dx, double dy);
      void putImageData(ImageData imagedata, double dx, double dy, double dirtyX, double dirtyY, double dirtyWidth, double dirtyHeight);
    };
    CanvasRenderingContext2D implements CanvasDrawingStyles;
    CanvasRenderingContext2D implements CanvasPathMethods;

    [NoInterfaceObject]
    interface CanvasDrawingStyles {
      // line caps/joins
               attribute unrestricted double lineWidth; // (default: 1)
               attribute DOMString lineCap; // "butt", "round", "square" (default: "butt")
               attribute DOMString lineJoin; // "round", "bevel", "miter" (default: "miter")
               attribute unrestricted double miterLimit; // (default: 10)

      // dashed lines
      void setLineDash(sequence<unrestricted double> segments); // (default: empty)
      sequence<unrestricted double> getLineDash();
               attribute unrestricted double lineDashOffset;


      // text
               attribute DOMString font; // (default: "10px sans-serif")
               attribute DOMString textAlign; // "start", "end", "left", "right", "center" (default: "start")
               attribute DOMString textBaseline; // "top", "hanging", "middle", "alphabetic", "ideographic", "bottom" (default: "alphabetic")
    };

    [NoInterfaceObject]
    interface CanvasPathMethods {
      // shared path API methods
      void closePath();
      void moveTo(unrestricted double x, unrestricted double y);
      void lineTo(unrestricted double x, unrestricted double y);
      void quadraticCurveTo(unrestricted double cpx, unrestricted double cpy, unrestricted double x, unrestricted double y);
      void bezierCurveTo(unrestricted double cp1x, unrestricted double cp1y, unrestricted double cp2x, unrestricted double cp2y, unrestricted double x, unrestricted double y);
      void arcTo(unrestricted double x1, unrestricted double y1, unrestricted double x2, unrestricted double y2, unrestricted double radius); 
      void rect(unrestricted double x, unrestricted double y, unrestricted double w, unrestricted double h);
      void arc(unrestricted double x, unrestricted double y, unrestricted double radius, unrestricted double startAngle, unrestricted double endAngle, optional boolean counterclockwise = false); 

      };

    interface CanvasGradient {
      // opaque object
      void addColorStop(double offset, DOMString color);
    };

    interface CanvasPattern {
      // opaque object
    };

    interface TextMetrics {
      readonly attribute double width;
    };

    dictionary HitRegionOptions {
      // dictionary to allow expansion on Hit Regions in Canvas Context 2D Level 2
      DOMString id = "";
      // for control-backed regions:
      Element? control = null;
    };

    interface ImageData {
      readonly attribute unsigned long width;
      readonly attribute unsigned long height;
      readonly attribute Uint8ClampedArray data;
    };




## 前置基本要点

### piexl adaptive

> 物理像素自适应，高分屏和普通屏的适应

`参数`说明：

    @param {dom} canvas
    @param {object} cssSize css尺寸（或逻辑尺寸）

    cssSize = { w: 300, h: 300 };


1. 逻辑尺寸（css尺寸）
2. 以2倍retina屏幕为例的适配过程：画布尺寸扩大一倍，canvas绘制通过scale也扩大一倍。


以下是`代码`实现：

    @[data-script="javascript"]function adaptDevice(canvas, cssSize){
        var ratio = window.devicePixelRatio
            , ctx = canvas.getContext('2d')
            ;
        canvas.width = cssSize.w * ratio;
        canvas.height = cssSize.h * ratio;
        ctx.scale(ratio, ratio);
    }


### block drawing 

> 块绘制，指定绘制区域的`左上顶点`，以及绘制区域`尺寸`，通过传入`ondraw回调`函数执行绘制行为

#### 代码实现

    @[data-script="javascript"]function doBlockDrawing( context, options ) {
        var opt = options || {}
            , topleft = opt.topleft || { x: 0, y: 0 }
            , size = opt.size || {
                w: context.canvas.offsetWidth
                , h: context.canvas.offsetHeight
            }
            , ondraw = opt.ondraw || function() {}
            ;

        context.save();
        context.rect( topleft.x, topleft.y, size.w, size.h );
        context.clip();
        context.setTransform( 1, 0, 0, 1, topleft.x, topleft.y );
        ondraw( context, size );
        context.restore();
    } 

#### 使用提示

* `ondraw()`回调中，不使用`context.save()`, `context.restore()`，避免将剪辑区重置
* `ondraw()`回调中，可调用`context.beginPath()`，重新开始路径绘制
* `ondraw()`回调中，size规定区域的`左上点为(0, 0)`



### canvas的尺寸限制

<http://fex.baidu.com/blog/2015/11/convert-svg-to-png-at-frontend/>

Canvas 的 W3C 的标准上没有提及 canvas 的`最大高/宽度和面积`，但是每个厂商的浏览器出于浏览器性能的考虑，在不同的平台上设置了最大的高/宽度或者是渲染面积，超过了这个阈值渲染的结果会是`空白`。测试了几种浏览器的 canvas 性能如下：

* chrome (版本 46.0.2490.80 (64-bit))
    * 最大面积：268, 435, 456 px^2 = 16, 384 px * 16, 384 px
    * 最大宽/高：32, 767 px

* firefox (版本 42.0)
    * 最大面积：32, 767 px * 16, 384 px
    * 最大宽/高：32, 767px

* safari (版本 9.0.1 (11601.2.7.2))
    * 最大面积： 268, 435, 456 px^2 = 16, 384 px * 16, 384 px

* ie 10(版本 10.0.9200.17414)
    * 最大宽/高： 8, 192px * 8, 192px

在一般的 web 应用中，可能很少会超过这些限制。但是，如果超过了这些限制，则会导致导出为空白或者由于内存泄露造成浏览器崩溃。

而且从另一方面来说，导出 png 也是一项很消耗内存的操作，粗略估算一下，导出 16, 384 px * 16, 384 px 的 svg 会消耗 16384 * 16384 * 4 / 1024 / 1024 = 1024 M 的内存。所以，在接近这些极限值的时候，浏览器也会反应变慢，能否导出成功也跟系统的可用内存大小等等都有关系。

对于这个问题，有如下两种解决方法：

    1. 将数据发送给后端，在后端完成转换；
    2. 前端将 svg 切分成多个图片导出；

第一种方法可以使用 PhantomJS、inkscape、ImageMagick 等工具，相对来说比较简单，这里我们主要探讨第二种解决方法。





## Canvas Context基础


### Tips

* 默认`左上角`为坐标`( 0, 0 )`，x轴和y轴分别向右和向下递增


### drawing state 

context维护一个绘制`状态栈`，该状态栈包含：

1. 当前`变换矩阵`(tranforming matrix)
2. 当前`剪辑区`(clipping region)
3. 以下`15个属性`(attributes)的当前值：

        1.  strokeStyle fillStyle globalAlpha lineWidth lineCap 
        6.  lineJoin miterLimit shadowOffsetX shadowOffsetY shadowBlur 
        11. shadowColor globalCompositeOperation font textAlign textBaseline

> 注意，`path`和`bitmap`不属于绘制状态栈的一部分。
* `path`只能通过`beginPath()`来重置；
* `bitmap`是属于`canvas`的一个property，而不属于context。

APIs:

    context.save()
    context.restore()





### Fill and Stroke styles

#### APIs

    value = CSS color | canvasGradient | canvasPattern 
    context.fillStyle [ = value ]
    context.strokeStyle [ = value ]
    gradient = context.createLinearGradient( x0, y0, x1, y1 )
    gradient = context.createRadialGradient( x0, y0, r0, x1, y1, r1 )

    // offset: [ 0, 1 ]; color: CSS color
    gradient.addColorStop( offset, color )
    // image: HTMLElement img, ImageData Object
    pattern = context.createPattern( image, repetition )

* `createRadialGradient`: <https://www.w3.org/TR/2dcontext/#dom-context-2d-createradialgradient>


#### createRadialGradient()

> 以下重要tips有助于理解

 <img src="./svg/canvas-radial-gradient-190127.svg" style="max-height: 260px">

* `6个`参数，分别代表`起始圆(x0, y0, r0)`和`终止圆(x1, y1, r1)`
* 起始圆与终止圆相同，则不进行绘制
* x0到x1进行差值，y0到y1进行差值，r0到r1进行差值，颜色在color stop的配置上，根据w的值从0到1进行差值，分别绘制`( x(w), y(w), r(w) )`指定的颜色为c(w)的`圆周`
* 满足`r(w) > 0`的所有圆周都会被绘制，也就是说，并不仅仅绘制w为0到1的部分，只要保证r(w)为正，都会绘制。绘制过程中，w小于0的部分，颜色同c(0)；w大于1的部分，颜色同c(1)
* `绘制圆周`的过程中，`已经绘制过的部分不再绘制`
* 最终绘制的是一个`渐变的圆锥体`，圆周绘制（untouched）不到的地方为透明黑色


#### Examples

<div id="test_fill_and_stroke_style" class="test">
<div class="test-container">
<canvas></canvas>

    @[data-script="javascript editable"](function(){

        var containerId = 'test_fill_and_stroke_style';
        var s = fly.createShow( '#' + containerId );
        var canvas = document.querySelector( '#' + containerId + ' canvas' );
        var context = canvas.getContext( '2d' );
        var cssWidth = canvas.offsetWidth;
        var cssHeight = canvas.offsetHeight;

        // pixel adaptive
        adaptDevice( canvas, { w: cssWidth, h: cssHeight } );

        function doDrawing( topleft, ondraw ) {
            doBlockDrawing( context, {
                topleft: topleft
                , size: { w: cssWidth / 6, h: cssHeight / 2 }
                , ondraw: ondraw
            } );
        }

        function createDraw( getGradient ) {
            return function( context, size ) {
                var gradient = getGradient( context, size.w, size.h );
                gradient.addColorStop( 0, '#16420c' );
                gradient.addColorStop( 0.5, '#da8e31' );
                gradient.addColorStop( 1, '#fefeb8' );
                context.fillStyle = gradient;
                context.fillRect( 0, 0, size.w, size.h );
            }
        }

        // [ 0, 0 ]
        doDrawing( 
            { x: 0, y: 0 }
            , createDraw( function( context, w, h ) {
                return context.createLinearGradient( 0, 0, w, h );
            } )
        );

        // [ 1, 0 ]
        doDrawing( 
            { x: cssWidth / 6, y: 0 }
            , createDraw( function( context, w, h ) {
                return context.createLinearGradient( 0, 0, w / 2, h / 2 );
            } )
        );

        // [ 2, 0 ]
        doDrawing( 
            { x: cssWidth / 6 * 2, y: 0 }
            , createDraw( function( context, w, h ) {
                return context.createLinearGradient( w / 2, h / 2, w, h );
            } )
        );

        // [ 3, 0 ]
        doDrawing( 
            { x: cssWidth / 6 * 3, y: 0 }
            , createDraw( function( context, w, h ) {
                return context.createRadialGradient( 
                        w / 4, h / 2, 0 
                        , w / 4 * 3, h / 2, Math.max( w, h ) / 2 
                    );
            } )
        );

        // [ 4, 0 ]
        doDrawing( 
            { x: cssWidth / 6 * 4, y: 0 }
            , createDraw( function( context, w, h ) {
                return context.createRadialGradient( 
                        w / 4, h / 2, Math.max( w, h ) / 2 
                        , w / 4 * 3, h / 2, Math.max( w, h ) / 2 
                    );
            } )
        );

        // [ 5, 0 ]
        doDrawing( 
            { x: cssWidth / 6 * 5, y: 0 }
            , createDraw( function( context, w, h ) {
                return context.createRadialGradient( 
                        w / 4, h / 2, Math.max( w, h ) / 2 
                        , w / 4 * 3, h / 2, 0
                    );
            } )
        );

        // [ 0, 1 ]
        doDrawing( 
            { x: 0, y: cssHeight / 2 }
            , createDraw( function( context, w, h ) {
                return context.createRadialGradient( 
                        w / 2, h / 2, 0
                        , w / 2, h / 2, Math.max( w, h )
                    );
            } )
        );

        // [ 1, 1 ]
        doDrawing( 
            { x: cssWidth / 6, y: cssHeight / 2 }
            , createDraw( function( context, w, h ) {
                return context.createRadialGradient( 
                        0, 0, 0
                        , w, h, Math.min( w, h ) / 2 * 1.5
                    );
            } )
        );

        // [ 2, 1 ]
        doDrawing( 
            { x: cssWidth / 6 * 2, y: cssHeight / 2 }
            , createDraw( function( context, w, h ) {
                return context.createRadialGradient( 
                        0, 0, 0
                        , w, h, Math.max( w, h )
                    );
            } )
        );

        // [ 3, 1 ]
        doDrawing( 
            { x: cssWidth / 6 * 3, y: cssHeight / 2 }
            , createDraw( function( context, w, h ) {
                return context.createRadialGradient( 
                        w / 4, h / 2, 0
                        , w / 4 * 3, h / 2, Math.max( w, h ) / 2 * 1.5
                    );
            } )
        );

        // [ 4, 1 ]
        doDrawing( 
            { x: cssWidth / 6 * 4, y: cssHeight / 2 }
            , createDraw( function( context, w, h ) {
                return context.createRadialGradient( 
                        w, h, Math.max( w, h )
                        , 0, 0, 0
                    );
            } )
        );

        // [ 5, 1 ]
        doDrawing( 
            { x: cssWidth / 6 * 5, y: cssHeight / 2 }
            , createDraw( function( context, w, h ) {
                return context.createRadialGradient( 
                        w, h, Math.max( w, h )
                        , 0, 0, Math.max( w, h ) / 2
                    );
            } )
        );

        s.show( 'testing ...' );
        s.append_show( cssWidth, cssHeight );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



### clip region

> 剪辑区

    // Further constrains the clipping region to the current path.
    context.clip();

* 默认`剪辑区`为`矩形区域( 0, 0, w, h )`
* `context.save()`恢复默认剪辑区，`context.clip()`创建新的剪辑区，创建新的剪辑区后，无法通过再次调用context.clip()修改剪辑区，也就是说clip()只能在准备path后`调用一次`，后续的多次调用不生效
* 剪辑区从`路径`创建



### line styles

#### lineWidth
#### lineCap

线帽样式。取值`butt`, `round`, `square`之一

#### lineJoin

线接样式。取值`bevel`, `round`, `miter`之一


#### miterLimit

与`lineJoin`配合，当lineJoin设置为`miter`时，才起作用。当两线条交角为`锐角`时，限制斜面的最大长度。单位为线宽的倍数。下图展示过大的miterLimit带来的不协调的交角效果：

 <img src="./img/large-miterlimit.png">

可参考`MDN`：<https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/miterLimit>


#### setLineDash()
#### getLineDash()
#### lineDashOffset

#### Examples

<div id="test_lineJoin" class="test">
<div class="test-container">
<canvas></canvas>

    @[data-script="javascript"](function(){

        var containerId = 'test_lineJoin';
        var s = fly.createShow( '#' + containerId );
        var canvas = document.querySelector( '#' + containerId + ' canvas' );
        var context = canvas.getContext( '2d' );
        var cssWidth = canvas.offsetWidth;
        var cssHeight = canvas.offsetHeight;

        // pixel adaptive
        adaptDevice( canvas, { w: cssWidth, h: cssHeight } );

        function doDrawing( topleft, ondraw ) {
            doBlockDrawing( context, {
                topleft: topleft
                , size: { w: cssWidth / 6, h: cssHeight / 2 }
                , ondraw: ondraw
            } );
        }

        function createDraw( setStyle ) {
            return function( context, size ) {
                setStyle( context, size );
                context.beginPath();
                context.moveTo( 10, 10 );
                context.lineTo( size.w / 4, size.h / 2 );
                context.lineTo( size.w / 2, size.h / 4 );
                context.lineTo( size.w / 2 * 1.1, size.h / 4 * 3 );
                context.lineTo( size.w - 10, size.h - 10 );
                context.stroke();
            };
        }

        var lineWidth = 8;
        // [ 0, 0 ]
        doDrawing(
            { x: 0, y: 0 }
            , createDraw( function( context, size ) {
                context.lineWidth = lineWidth;
                context.lineCap = 'butt';
            } ) 
        );

        // [ 1, 0 ]
        doDrawing(
            { x: cssWidth / 6, y: 0 }
            , createDraw( function( context, size ) {
                context.lineWidth = lineWidth;
                context.lineCap = 'round';
            } ) 
        );

        // [ 2, 0 ]
        doDrawing(
            { x: cssWidth / 6 * 2, y: 0 }
            , createDraw( function( context, size ) {
                context.lineWidth = lineWidth;
                context.lineCap = 'square';
            } ) 
        );

        // [ 3, 0 ]
        doDrawing(
            { x: cssWidth / 6 * 3, y: 0 }
            , createDraw( function( context, size ) {
                context.lineWidth = lineWidth;
                context.lineCap = 'butt';
                context.lineJoin = 'bevel';
            } ) 
        );

        // [ 4, 0 ]
        doDrawing(
            { x: cssWidth / 6 * 4, y: 0 }
            , createDraw( function( context, size ) {
                context.lineWidth = lineWidth;
                context.lineCap = 'round';
                context.lineJoin = 'round';
            } ) 
        );

        // [ 5, 0 ]
        doDrawing(
            { x: cssWidth / 6 * 5, y: 0 }
            , createDraw( function( context, size ) {
                context.lineWidth = lineWidth;
                context.lineCap = 'square';
                context.lineJoin = 'miter';
                context.miterLimit = 3;
            } ) 
        );


        // ============= line 2 ===============

        var lineDash = [ lineWidth, lineWidth * 2 ];
        // [ 0, 1 ]
        doDrawing(
            { x: 0, y: cssHeight / 2 }
            , createDraw( function( context, size ) {
                context.lineWidth = lineWidth;
                context.lineCap = 'butt';
                context.setLineDash( lineDash );
            } ) 
        );

        // [ 1, 1 ]
        doDrawing(
            { x: cssWidth / 6, y: cssHeight / 2 }
            , createDraw( function( context, size ) {
                context.lineWidth = lineWidth;
                context.lineCap = 'round';
                context.setLineDash( lineDash );
            } ) 
        );

        // [ 2, 1 ]
        doDrawing(
            { x: cssWidth / 6 * 2, y: cssHeight / 2 }
            , createDraw( function( context, size ) {
                context.lineWidth = lineWidth;
                context.lineCap = 'square';
                context.setLineDash( lineDash );
            } ) 
        );

        // [ 3, 1 ]
        doDrawing(
            { x: cssWidth / 6 * 3, y: cssHeight / 2 }
            , createDraw( function( context, size ) {
                context.lineWidth = lineWidth;
                context.lineCap = 'butt';
                context.lineJoin = 'bevel';
                context.setLineDash( lineDash );
            } ) 
        );

        // [ 4, 1 ]
        doDrawing(
            { x: cssWidth / 6 * 4, y: cssHeight / 2 }
            , createDraw( function( context, size ) {
                context.lineWidth = lineWidth;
                context.lineCap = 'round';
                context.lineJoin = 'round';
                context.setLineDash( lineDash );
            } ) 
        );

        // [ 5, 1 ]
        doDrawing(
            { x: cssWidth / 6 * 5, y: cssHeight / 2 }
            , createDraw( function( context, size ) {
                context.lineWidth = lineWidth;
                context.lineCap = 'square';
                context.lineJoin = 'miter';
                context.miterLimit = 3;
                context.setLineDash( lineDash );
            } ) 
        );


        s.show(1);
        s.append_show(2);

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




### text styles

#### font

取值同CSS font

#### textAlign

文本水平排列。取值`start`, `end`, `left`, `right`, `center`，默认值`start`。
其中`start`, `end`与文本`direction`有关。

#### textBaseline 

文本基线（竖直排列）。
取值`top`, `hanging`, `middle`, `alphabetic`, `ideographic`, `bottom`，默认值`alphabetic`

 <img src="./img/text-baselines.png">






### building paths

构建路径。

#### beginPath

`context.beginPath()`
清空当前路径的`子路径列表`(subpath list)，使得`当前路径`(context's current path)重新从0条子路径开始。

#### moveTo

`context.moveTo(x, y)`
新启一条子路径，子路径以`x, y`为起点。

#### closePath

`context.closePath()`
关闭当前`子路径`，新启一条子路径，新的子路径的`起点`与当前关闭的子路径的起点`一致`。
closePath()并`不会清空`当前路径的子路径列表。

#### lineTo

`context.lineTo(x, y)`
添加一个新点至当前子路径，新点于上一点用直线相连。

#### quadraticCurveTo

`context.quadraticCurveTo(cpx, cpy, x, y)`

#### bezierCurveTo

`context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`

#### arcTo

`context.arcTo(x1, y1, x2, y2, radius)`
添加一条弧线至当前子路径。

子路径的最后一个点`x0, y0`（记为A）开始，
控制点1为`x1, y1`（记为B）， 控制点2为`x2, y2`（记为C）。绘制一条半径为`radius`的圆弧，
该圆弧与AB和BC`相切`。第一个切点用直线与A相连。第二个切点若与C不重合，也不会自动相连。

`A`必须存在，若不存在，则不绘制。


<div id="test_arcTo" class="test">
<div class="test-container">
<canvas></canvas>

    @[data-script="javascript editable"](function(){

        var wrapperId = 'test_arcTo'
            , sharpWrapperId = '#' + wrapperId
            ;

        var s = fly.createShow(sharpWrapperId);
        var $wrapper = $(sharpWrapperId);
        var canvas = $wrapper.find('canvas')[0]
            , ctx = canvas.getContext('2d')
            ;

        function point(ctx, center, options){
            var opt = options || {}
                , r = opt.radius || 3
                ;

            ctx.beginPath();
            ctx.rect(center.x - r, center.y - r, 2 * r + 1, 2 * r + 1);

            ctx.save();
            ctx.fillStyle = opt.fillStyle || '#ff7f0e';
            ctx.fill();
            ctx.strokeStyle = opt.strokeStyle || '#e377c2';
            ctx.stroke()
            ctx.restore();
        }
        function line(ctx, from, to, options){
            var opt = options || {};

            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);

            ctx.save();
            ctx.strokeStyle = opt.strokeStyle || '#000';
            ctx.strokeWidth = opt.strokeWidth || 1;
            ctx.stroke();
            ctx.restore();
        }
        function arcTo(ctx, from, cp1, cp2, radius, options){
            var opt = options || {};

            if(from){
                ctx.beginPath();
                ctx.moveTo(from.x, from.y);
            }
            ctx.arcTo(cp1.x, cp1.y, cp2.x, cp2.y, radius);

            ctx.save();
            ctx.strokeStyle = opt.strokeStyle || '#000';
            ctx.stroke();
            ctx.restore();
        }

        adaptDevice(canvas, {w: $wrapper.find('.test-container').width(), h: 300});

        line(ctx, {x:10, y:10}, {x:80, y:80});
        line(ctx, {x:80, y:80}, {x:180, y:180}, {strokeStyle:'#aaa', strokeWidth:0.1});
        line(ctx, {x:100, y:150}, {x:200, y:150}, {strokeStyle:'#aaa', strokeWidth:0.1});
        line(ctx, {x:200, y:150}, {x:330, y:150}, {strokeStyle:'#aaa', strokeWidth:0.1});
        line(ctx, {x:280, y:100}, {x:280, y:280}, {strokeStyle:'#aaa', strokeWidth:0.1});

        arcTo(ctx, {x:80, y:80}, {x:150, y:150}, {x:200, y:150}, 100, {strokeStyle:'#1f77b4'});
        arcTo(ctx, {x:200, y:150}, {x:280, y:150}, {x:280, y:210}, 80, {strokeStyle:'#ff0'});

        point(ctx, {x:80, y:80}, {fillStyle: '#0f0', strokeStyle: '#0f0'});
        point(ctx, {x:150, y:150}, {fillStyle: '#00f', strokeStyle: '#00f'});
        point(ctx, {x:200, y:150});
        point(ctx, {x:280, y:150}, {fillStyle: '#00f', strokeStyle: '#00f'});
        point(ctx, {x:280, y:210}, {fillStyle: '#00f', strokeStyle: '#00f'});

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


#### arc

`context.arc(x, y, radius, startAngle, endAngle [, counterclockwise ])`

#### rect

`context.rect(x, y, w, h)`












## 有用的属性

`devicePixelRatio`：<http://www.html5rocks.com/en/tutorials/canvas/hidpi/>

a window extension by `CSSOM`:

1. If there is no output device, return 1 and abort these steps.
2. Let `CSS pixel size` be the size of a CSS pixel at the current `page zoom` scale factor and at a `pinch zoom` scale factor of 1.0.
3. Let `device pixel size` be the vertical size of a device pixel of the output device.
4. Return the result of dividing `CSS pixel size` by `device pixel size`.


绘制不失真的Canvas： High DPI Canvas

    @[data-script="javascript"]/**
     * Writes an image into a canvas taking into
     * account the backing store pixel ratio and
     * the device pixel ratio.
     *
     * @author Paul Lewis
     * @param {Object} opts The params for drawing an image to the canvas
     */
    function drawImage(opts) {

        if(!opts.canvas) {
            throw("A canvas is required");
        }
        if(!opts.image) {
            throw("Image is required");
        }

        // get the canvas and context
        var canvas = opts.canvas,
            context = canvas.getContext('2d'),
            image = opts.image,

        // now default all the dimension info
            srcx = opts.srcx || 0,
            srcy = opts.srcy || 0,
            srcw = opts.srcw || image.naturalWidth,
            srch = opts.srch || image.naturalHeight,
            desx = opts.desx || srcx,
            desy = opts.desy || srcy,
            desw = opts.desw || srcw,
            desh = opts.desh || srch,
            auto = opts.auto,

        // finally query the various pixel ratios
            devicePixelRatio = window.devicePixelRatio || 1,
            backingStoreRatio = context.webkitBackingStorePixelRatio ||
                                context.mozBackingStorePixelRatio ||
                                context.msBackingStorePixelRatio ||
                                context.oBackingStorePixelRatio ||
                                context.backingStorePixelRatio || 1,

            ratio = devicePixelRatio / backingStoreRatio;

        // ensure we have a value set for auto.
        // If auto is set to false then we
        // will simply not upscale the canvas
        // and the default behaviour will be maintained
        if (typeof auto === 'undefined') {
            auto = true;
        }

        // upscale the canvas if the two ratios don't match
        if (auto && devicePixelRatio !== backingStoreRatio) {

            var oldWidth = canvas.width;
            var oldHeight = canvas.height;

            canvas.width = oldWidth * ratio;
            canvas.height = oldHeight * ratio;

            canvas.style.width = oldWidth + 'px';
            canvas.style.height = oldHeight + 'px';

            // now scale the context to counter
            // the fact that we've manually scaled
            // our canvas element
            context.scale(ratio, ratio);

        }

        context.drawImage(image, srcx, srcy, srcw, srch, desx, desy, desw, desh);
    }




<div id="test_10" class="test">
<div class="test-container">
<canvas width="200" height="200" style="display:block;"></canvas>

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_10');
        var canvas = $('#test_10 canvas').get(0);
        canvas.width = 200;
        canvas.height = 200;
        canvas.style.width = 200 + 'px';
        canvas.style.height = 200 + 'px';

        var image = new Image();
        image.src = './img/arcto_radius-100.png';
        image.onload = function(){
            drawImage({
                canvas: canvas 
                , image: image 
                , srcw: 192
                , srch: 190
            });
        };

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



Android 4.1.x Stock Browser Canvas Solution

https://medium.com/@dhashvir/android-4-1-x-stock-browser-canvas-solution-ffcb939af758

    canvas.width = canvas.width;


    canvas.clearRect(0, 0, w, h);
    canvas.style.visibility = ‘hidden’; // Force a change in DOM
    canvas.offsetHeight; // Cause a repaint to take play
    canvas.style.visibility = ‘inherit’; // Make visible again


    canvas.clearRect(0, 0, w, h);
    canvas.style.display = ‘none’;// Detach from DOM
    canvas.offsetHeight; // Force the detach
    canvas.style.display = ‘inherit’; // Reattach to DOM


CORS与Canvas图片toDataURL

http://www.web-tinker.com/article/20687.html



WebView: animation issues with Java Script, JQuery Mobile and Phonegap

https://code.google.com/p/android/issues/detail?id=35474



context.toDataURL() only support on android 3.2 or above version.

http://stackoverflow.com/questions/10488033/todataurl-not-working-on-android-browsers

android 2.3.3的原生浏览器是不支持的，虽然该函数可以正常调用。但不代表该平台上其他浏览器不支持，实际上该平台上
安装的UC浏览器都支持。

不过可以认为webview是不支持的。




## transform matrix

> 变换矩阵


### 齐次坐标

#### 定义

齐次坐标是指一个用于`投影几何`里的坐标系统，如同`欧氏几何`里的笛卡儿坐标一样。它将一个原本是`n`维的向量用一个`n+1`维向量来表示。

如向量：

    ( x1, x2, x3, ..., xn )

的`齐次坐标`表示为：

    [ hx1, hx2, hx3, ..., hxn, h ]

其中`h`是一个实数。一个向量的齐次表示不是唯一的，齐次坐标中的`h`取`不同`的值都`表示`的是`同一个点`，因此一个点的齐次坐标有`无限种`表示法。
例如，齐次坐标`[2, 4, 2]`与`[1, 2, 1]`表示的都是二维点`[1, 2]`。

#### 特征

> ref: <https://baike.baidu.com/item/齐次坐标/511284>

* 投影平面上的任何点都可以表示成一个三元组`(X, Y, Z)`，称为该点的齐次坐标或投影坐标，其中X、Y、Z`不全为0`
* 以齐次坐标表示的点，若该坐标内的数值全乘上一个相同的`非零实数`，仍会表示该点
* 相反的，两个齐次坐标表示同一点，当前仅当其中一个齐次坐标可由另一个齐次坐标乘上一个相同的`非零常数`获得
* 当Z不为0，则该点表示欧式平面上的点`(X/Z, Y/Z)`
* 当Z为0，则该点表示一个`无穷远点`


`todo`：二维齐次坐标变换。


### transform( a, b, c, d, e, f )

#### 变换矩阵

 <img src="./img/canvas_transform.png">

变换矩阵会`叠加`，不同于`setTransform`的重置

参考：
* <http://sumsung753.blog.163.com/blog/static/146364501201281311522752/>
* <http://shawphy.com/2011/01/transformation-matrix-in-front-end.html>

#### 平移

    matrix(1, 0, 0, 1, tx, ty)

    x' = 1x + 0y + tx = x + tx
    y' = 0x + 1y + ty = y + ty 

等价于：

    translate(tx, ty)


#### 缩放

    matrix(sx, 0, 0, sy, 0, 0)

    x' = sx * x + 0 * y + 0 = sx * x
    y' = 0 * x + sy * y + 0 = sy * y

等价于：

    scale(sx, sy)


#### 旋转

> `顺时针`旋转θ，更多参考三角函数：<ref://../math/basics.md.html>

    matrix( cosθ, -sinθ, sinθ, cosθ, 0, 0 )

    x'  = x * cosθ + y * sinθ + 0  
        = x * cosθ + y * sinθ
    y'  = x * -sinθ + y * cosθ + 0 
        = y * cosθ - x * sinθ

等价于：

    rotate( θ )

若是`逆时针`旋转θ，相当于顺时针旋转`-θ`，此时：

    matrix( cos( -θ ), -sin( -θ ), sin( -θ ), cos( -θ ), 0, 0 )
        = matrix( cosθ, sinθ, -sinθ, cosθ, 0, 0 )

    x'  = x * cosθ - y * sinθ
    y'  = y * cosθ + x * sinθ


等价于：

    rotate( -θ )


#### 切变

    matrix(1, tan(θy), tan(θx), 1, 0, 0)

    x' = x + y * tan(θx)
    y' = x * tan(θy) + y

θx和θy分别代表往x轴正方向和往y轴正方向倾斜的角度，两者是相互独立的。

比如：

    matrix(1, 0, tan(45deg), 1, 0, 0)

    x' = x + y * tan(45deg)
    y' = y

表示向x轴倾斜45度。

`镜像反射`：todo






## createPattern

`语法：`

    context.createPattern(image,"repeat|repeat-x|repeat-y|no-repeat");

`例子：`

    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    var img=document.getElementById("lamp");
    var pat=ctx.createPattern(img,"repeat");
    ctx.rect(0,0,150,100);
    ctx.fillStyle=pat;
    ctx.fill();


## createLinearGradient

`语法：`

    context.createLinearGradient(x0,y0,x1,y1);

x0,y0为渐变起始点，x1,y1为渐变结束点。

`例子：`

    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    var my_gradient=ctx.createLinearGradient(0,0,0,170);
    my_gradient.addColorStop(0,"black");
    my_gradient.addColorStop(1,"white");
    ctx.fillStyle=my_gradient;
    ctx.fillRect(20,20,150,100);



## createRadialGradient 

`语法：`

    context.createRadialGradient(x0,y0,r0,x1,y1,r1);





## drawImage

> `s`代表`source`，`d`代表`destination`

1. 画布上定位( dx, dy )图像

        context.drawImage( img, dx, dy );

2. 画布上定位图像( dx, dy )，并规定图像的宽度和高度( dw, dh )

        context.drawImage( img, dx, dy, dw, dh );

3. 剪切图像( sx, sy, sw, sh )，并在画布上定位( dx, dy )被剪切的部分，并规定图像的宽度和高度( dw, dh )

        context.drawImage( img, sx, sy, sw, sh, dx, dy, dw, dh );

 <img src="./img/canvas-drawImage.png">


### Image Sources

> 2d context能处理的来源，也即`img`对应的对象

* HTMLImageElement对象，也即`<img>`对应的DOM对象
* HTMLVideoElement对象，也即`<video>`对应的DOM对象
* HTMLCanvasElement对象，也即`<canvas>`对应的DOM对象


### 绘制视频帧

<http://blog.csdn.net/qq_16559905/article/details/53234610>




## Pixel Manipulation

> 像素操作

    // 1. in CSS sizes
    // 2. all the pixels in the returned object are transparent black ( rgba( 0, 0, 0, 0 ) )
    imagedata = context.createImageData( sw, sh )
    imagedata = context.createImageData( imageData )

    // in canvas coordinate space units
    imagedata = context.getImageData( sx, sy, sw, sh )

    // returns the actual dimensions of the data in the ImageData object, in device pixels.
    imageData.width
    imageData.height

    // returns the one-dimensional array containing the data in RGBA order, as
    // integers in the range 0 to 255.
    imageData.data

    // 1. Paints the data from the given imageData object onto the canvas
    // 2. If a dirty rectangle is provided, only the pixels from that rectangle are painted
    imageData.putImageData( imageData, dx, dy[, dirtyX, dirtyY, dirtyWidth, dirtyHeight] )

* 新建imageData（通过`createImageData()`创建）的默认像素值为`透明黑色`，也即`rgba( 0, 0, 0, 0 )`
* 通过`getImageData()`获得的像素值，`初始部分`的像素值为`透明黑色`



## Shadows

> 4个全局阴影属性。

1. 不能被转换成CSS值的value将被忽略

### shaowColor
### shadowOffsetX
### shadowOffsetY
### shadowBlur








## 紧贴直线的文本

todo



## globalCompositeOperation

该属性`设置或返回`如何将一个`源（新的）`图像绘制到`目标（已有）`的图像上。

可取以下`12`个值：

    source-over source-atop source-in source-out 
    destination-over destination-atop destination-in destination-out 
    lighter darker copy xor

对应效果如下，下图中`目标`为`红色`正方形，`源`为`绿色`圆形。：

<img src="./img/canvas-gco.png">





## Small Canvas Lib below

* `getContext`: function()
* `getTextWidth`: function(text)

    底层使用`context.measureText( text )`，返回的值是一个`TextMetrics`类型的对象。有一个`width`属性。

* `getWidth`: function()
* `getHeight`: function()

* `strokeStyle`: function(s)

    属性，设置或者返回用于笔触的颜色、渐变或模式。

        context.strokeStyle=color|gradient|pattern;

    `color:`

        var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");
        ctx.strokeStyle="#0000ff";
        ctx.strokeRect(20,20,150,100); 

    `gradient:`

        var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");

        var gradient=ctx.createLinearGradient(0,0,170,0);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1.0","red");

        // 用渐变进行填充
        ctx.strokeStyle=gradient;
        ctx.lineWidth=5;
        ctx.strokeRect(20,20,150,100);



* `fillStyle`: function(s)
    
    设置或返回用于填充绘画的颜色、渐变或模式。

        context.fillStyle = color | gradient | pattern;

    1. `color`：css颜色值，默认#000000
    2. `gradient`: 渐变对象（linear or radial） 
    3. `pattern`: pattern对象 


* `lineCap`: function(lc)
* `lineJoin`: function(lj)
* `lineWidth`: function(lw)

* `rect`: function(x, y, width, height)
* `fillRect`: function(x, y, width, height)
* `strokeRect`: function(x, y, width, height)
* `clearRect`: function(x, y, width, height)

* `fill`: function()
* `stroke`: function()
* `beginPath`: function()
* `closePath`: function()
* `moveTo`: function(x, y)
* `lineTo`: function(x, y)
* `clip`: function()
* `arc`: function(x, y, r, sAngle, eAngle, counterclickwise)

    `圆弧绘制`

    <img src="./img/img_arc.gif">

    * Center: arc(`100, 75`, 50, 0*Math.PI, 1.5*Math.PI)
    * Radius: arc(100, 75, `50`, 0*Math.PI, 1.5*Math.PI)
    * Start angle:  arc(100, 75, 50, `0*Math.PI`, 1.5*Math.PI)
    * End angle:  arc(100, 75, 50, 0*Math.PI, `1.5*Math.PI`) 

* `quadraticCurveTo`: function(cpx, cpy, x, y)

    `1个控制点`

    <img src="./img/img_quadraticcurve.gif">

    * Start point: moveTo(`20, 20`) 
    * Control point: quadraticCurveTo(`20, 100`, 200, 20)
    * End point: quadraticCurveTo(20, 100, `200, 20`)

* `bezierCurveTo`: function(cp1x, cp1y, cp2x, cp2y, x, y)

    `2个控制点`

    <img src="./img/img_beziercurve.gif">

    * Start point: moveTo(`20, 20`) 
    * Control point 1: bezierCurveTo(`20, 100`, 200, 100, 200, 20)
    * Control point 2: bezierCurveTo(20, 100, `200, 100`, 200, 20)
    * End point: bezierCurveTo(20, 100, 200, 100, `200, 20`)

* `arcTo`: function(x1, y1, x2, y2, r)
    
    `两条切线间绘制圆弧：`
    The arcTo() method creates an arc/curve between two tangents(切线) on the canvas.

    以`@[style="color:#ff0; background:#000"](200, 100)`为控制点，
    从`@[style="color:#0f0; background:#000"](100, 100)`
    到`@[style="color:#0f0; background:#000"](200, 200)`绘制一条圆弧，半径分别为100，50， 150，
    如下图所示：

    1. 目标点刚好为切点 

        <img src="./img/arcto_radius-100.png">

    2. 半径太小，圆弧不过目标点 

        <img src="./img/arcto_radius-50.png">

    3. 半径太大，圆弧不过目标点 

        <img src="./img/arcto_radius-150.png">


* `isPointInPath`: function(x, y)

    如果指定点位于当前路径中，返回true，否则false：

        var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");
        ctx.rect(20,20,150,100);
        if (ctx.isPointInPath(20,50)){
            ctx.stroke();
        }

* `scale`: function(scaleWidth, scaleHeight)

    实为`坐标放大`。

    <img src="./img/canvas_scale.png">

    `例子：`绘制一个矩形；放大到 200%，再次绘制矩形；放大到 200%，
    然后再次绘制矩形；放大到 200%，再次绘制矩形：

        var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");
        ctx.strokeRect(5,5,25,15);
        ctx.scale(2,2);
        ctx.strokeRect(5,5,25,15);
        ctx.scale(2,2);
        ctx.strokeRect(5,5,25,15);
        ctx.scale(2,2);
        ctx.strokeRect(5,5,25,15);

* `rotate`: function(angle)

    * `angle`是`顺时针``弧度数`，`负弧度`为`逆时针`。
    * 旋转以`( 0, 0 )`为中心
    * `坐标系转换`函数，`在绘制前调用`，才能影响绘制函数。

    <img src="./img/canvas_rotate.png">

    旋转坐标系，比如旋转20度：

        var c = document.getElementById( "myCanvas" );
        var ctx = c.getContext( "2d" );
        ctx.rotate( 20 * Math.PI/180 );
        ctx.fillRect( 50, 20, 100, 50 );        

    * `宽`度为`120`, `高`度为`20`的文本，`顺时针`旋转`45度`，需要绘制在`宽高`为`200 * 200`的正方形内，且水平、垂直居中。

        <img src="./img/canvas-rotated-text.png" height="200">

        做法为（以下代码可以`参数化`）：

            context.textBaseline = 'middle';
            context.textAlign = 'start';
            context.rotate( 45 * Math.PI / 180 );
            context.translate( 200 / 2, 200 / 2 );
            context.strokeText( text, -120 / 2, -20 / 2, 200 );



* `translate`: function(tx, ty)
    
    `坐标系平移`

* `transform`: function(a, b, c, d, e, f)
    ，见`变换矩阵( transform matrix )`部分。

* `setTransform`: function(a, b, c, d, e, f)

    重置并重新创建新的变换矩阵

* `font`: function(cssFont)

    `CSS Font:` 

        font-style font-variant font-weight font-size/line-height font-family

    `举例：`

        italic small-caps bold 12px arial,sans-serif
        normal normal normal  

    `关于font-variant：`

    设置小型大写字母的字体显示文本，所有小写字母会被转换为大写，但是相比其余字幕，尺寸更小。

        normal | small-caps | inherit

    `关于font-style：`

        normal | italic | oblique | inherit

    `关于font-weight：`

        normal | bold | bolder | lighter | inherit | 100 - 900

        400 = normal
        700 = bold


* `textAlign`: function(align)
* `textBaseline`: function(align)
* `fillText`: function(text, x, y, maxWidth)
* `strokeText`: function(text, x, y, maxWidth)
* `globalAlpha`: function(alpha)

    alpha = 0.0 ~ 1.0

* `globalCompositeOperation`: function(gco)

    `refer`: <https://www.w3.org/TR/2dcontext/#compositing>，11种类型，外加一种扩展类型。

        1.  source-atop source-in srouce-out source-over ( default ) destination-atop 
        6.  destination-in destination-out destination-over lighter copy 
        11. xor vendorName-operationName

* `save`: function()
* `restore`: function()
* `width`: function(w)
* `height`: function(h)
* `css`: function()



## Demos

### github

* Interesting canvas <https://github.com/whxaxes/canvas-test> <iframe src="http://258i.com/gbtn.html?user=whxaxes&repo=canvas-test&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* canvas-special <https://github.com/bxm0927/canvas-special> <iframe src="http://258i.com/gbtn.html?user=bxm0927&repo=canvas-special&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* sketch of three.js <http://ykob.github.io/sketch-threejs/> <https://github.com/ykob/sketch-threejs> <iframe src="http://258i.com/gbtn.html?user=ykob&repo=sketch-threejs&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* 小游戏 - 看你有多色 <http://www.lovebxm.com/canvas-special/look-def-color/index.html> <https://github.com/bxm0927/canvas-special>



### html5tricks

* 射线效果 <http://www.html5tricks.com/demo/html5-canvas-radian/index.html>
* 180203 16个富有创意的HTML5 Canvas / SVG动画特效集合 <http://www.html5tricks.com/16-html5-canvas-animation.html>
    * 高空瀑布 <http://www.html5tricks.com/demo/html5-canvas-waterfall-lake/index.html>
    * 雷达<http://www.html5tricks.com/demo/html5-css3-3d-radar-animation/index2.html>
    * 沙漏 <http://www.html5tricks.com/demo/html5-canvas-image-flow-time/index2.html>
    * 火焰 <http://www.html5tricks.com/demo/html5-canvas-fire-text-animation/index.html>
    * 粒子爆炸 <http://www.html5tricks.com/demo/html5-webgl-particle-animation/index2.html>
    * 蝴蝶飞舞 <http://www.html5tricks.com/demo/html5-canvas-butterfly/index2.html>
    * 天体运行 <http://www.html5tricks.com/demo/html5-canvas-3d-planet/index.html>
    * 3D房间模型，玩游戏的人 <http://www.html5tricks.com/demo/html5-canvas-3d-model-camera/index2.html>
    * 光束效果 <http://www.html5tricks.com/demo/html5-canvas-beam-explosion/index2.html>
    * 粒子时钟 <http://www.html5tricks.com/demo/html5-canvas-pixel-clock/index2.html>
    * 圆形进度 <http://www.html5tricks.com/demo/html5-canvas-circle-percentage/index.html>
    * 心电图 <http://www.html5tricks.com/demo/html5-canvas-electrocardiogram/index.html>
    * 梦幻树 <http://www.html5tricks.com/demo/html5-canvas-dream-tree/index.html>
    * CSS3五彩3D动画 <http://www.html5tricks.com/demo/css3-colorful-3d-ball/index2.html>
    * 闪烁的蓝宝石 <http://www.html5tricks.com/demo/html5-canvas-3d-sapphire/index2.html>
    * 钻石 <http://www.html5tricks.com/demo/html5-canvas-3d-diamond/index2.html>
* 171214 3D立方体波浪动画 <http://www.html5tricks.com/demo/html5-canvas-3d-cube-wave/index.html>
* 171214 2D文字与3D图像粒子转换动画 <http://www.html5tricks.com/demo/html5-canvas-2d-to-3d/index2.html>
* 171229 15个超强悍的CSS3/Canvas/SVG时钟动画赏析 <http://www.html5tricks.com/15-cool-css3-circle-clock.html>
* 171229 纯CSS3乒乓球动画 <http://www.html5tricks.com/demo/pure-css3-ping-pong/index.html>
* 180113 SVG火焰燃烧动画 <http://www.html5tricks.com/demo/svg-fire-stick/index2.html>
* 180114 精美的SVG单选按钮美化插件 <http://www.html5tricks.com/demo/svg-radio-buttons/index.html>
* 18012l 密码解锁动画 <http://www.html5tricks.com/demo/html5-password-animation/index.html>
* 170926 SVG天气预报动画卡片 <http://www.html5tricks.com/demo/html5-svg-weather-card/index.html>
* 180125 炫酷阴影发光文字特效 <http://www.html5tricks.com/demo/html5-css3-shadow-shine-text/index.html>
* 180127 创意表情切换按钮 <http://www.html5tricks.com/demo/pure-css3-face-style-switch/index.html>
* 170729 HTML5点阵列局部放大镜动画特效 <http://www.html5tricks.com/demo/html5-dot-outline/index2.html>
* 180128 CSS3实现的放大镜动画 <http://www.html5tricks.com/demo/jquery-glasses-animation/index2.html>
* 180129 纯CSS3实现仿Mac系统的Dock菜单 <http://www.html5tricks.com/demo/pure-css3-mac-dock/index2.html>
* 151114 CSS3实现大象走路 <http://www.html5tricks.com/demo/pure-css3-elephant-animation/index2.html>
* 161112 炫酷输入框 <http://www.html5tricks.com/demo/html5-text-input-animation/index.html>
* 180204 svg 3选项开关 <http://www.html5tricks.com/demo/svg-3-option-button/index.html>


### other

* 180131 Canvas 实现炫丽的粒子运动效果(粒子生成文字) <https://juejin.im/post/5a707089518825732821b9dd>

        /* 关闭scrollbar */
        body::-webkit-scrollbar{
            display: none;
        }

        #input-text::placeholder{
            color: #ccc;
            line-height: 55px;
            height: 55px;
        }

    Demo: <http://yunkus.com/demo/canvas/canvas-granule-animation-and-build-text/>

