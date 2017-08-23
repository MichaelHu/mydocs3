# canvas-network



<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
.canvas-wrapper {
    height: 500px;
}
</style>
<script src="http://258i.com/static/build/babel/babel.min.js"></script> 
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>


## 基础方法

### createCanvas()

    @[data-script="babel-loose"]function createCanvas( container, options ){
        var width, height, canvas
            , opt = options || {}
            ;

        if ( typeof container == 'string' ) {
            if ( document.querySelector ) {
                container = document.querySelector( container );
            }
            else {
                container = document.getElementById( container );
            }
        }

        width = container.offsetWidth;
        height = container .offsetHeight;
        canvas = document.createElement( 'canvas' );
        container.appendChild( canvas );
        adaptDevice( canvas, { w: width, h: height } );
        return canvas;
    }

### adaptDevice()

    @[data-script="babel-loose"]function adaptDevice( canvas, cssSize ){
        var ratio = window.devicePixelRatio
            , ctx = canvas.getContext( '2d' )
            ;
        canvas.width = cssSize.w * ratio;
        canvas.height = cssSize.h * ratio;
        canvas.style.width = cssSize.w + 'px';
        canvas.style.height = cssSize.h + 'px';
        ctx.scale( ratio, ratio );
    }


## 绘制基本图谱

### 阶段性验证

<div id="test_basic_network" class="test">
<div class="test-container">
<div class="canvas-wrapper"></div>

    @[data-script="javascript"](function(){

        var containerId = 'test_basic_network';
        var s = fly.createShow( '#' + containerId );
        var canvas = createCanvas( '#' + containerId + ' .canvas-wrapper' );
        var context = canvas.getContext( '2d' );

        context.strokeRect( 0, 0, 200, 200 );
        s.show(1);
        s.append_show(2);

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>






