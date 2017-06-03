# WebGL

> Web Graphics Library  <img src="./img/WebGL-Logo.png" height="45">

## Overview

* <https://en.wikipedia.org/wiki/WebGL>
* <https://www.khronos.org/registry/webgl/specs/latest/>
* <https://www.khronos.org/registry/webgl/specs/latest/1.0/>
* <https://www.khronos.org/registry/webgl/specs/latest/2.0/>
* 并不是`w3c`出specs，也可以理解，毕竟WebGL来自`OpenGL`


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
.canvas-cont {
    height: 300px;
}
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/bower_components/jquery/dist/jquery.min.js"></script>


## WebGLRenderingContext

## WebGL Viewport

* canvas的3d context
* contextId为`webgl`

<div id="test_viewport" class="test">
<div class="canvas-cont"><canvas></canvas></div>
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_viewport');
        var $cont = $( '#test_viewport .canvas-cont' );
        var canvas = $cont.find( 'canvas' )[ 0 ]; 
        var gl = canvas.getContext( 'webgl' );

        canvas.width = $cont.width();
        canvas.height = $cont.height();
        gl.viewport( 0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight );

        s.show( 'testing webgl viewport ...' );
        s.append_show( gl.drawingBufferWidth, gl.drawingBufferHeight );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>



