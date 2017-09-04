# canvas-network


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
.canvas-wrapper {
    height: 500px;
}
</style>
<script src="http://258i.com/static/build/babel/babel.min.js"></script> 
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>


## API设计

    启用ES6语法
    支持移动版
    可以只支持canvas，其他暂不考虑
    场景收集
        new
        destroy
        graph
            clear()
            read()
            addNode()
            addEdge()
        refresh() 
        layers
        event
            onnodeclick
            onnodesclick
            onedgeclick
            onedgesclick

            onnodedbclick
            onnodesdbclick
            onedgedbclick
            onedgesdbclick

            onnodehover
            onnodeshover
            onedgehover
            onedgeshover

            onnodedrag

            onresize
            onmousewheel
            oncontextmenu


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
        height = container.offsetHeight;
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

### drawNode()

    @[data-script="babel-loose"]function drawNode( context, x, y, label, color ) {
        let r = 700;
        context.save();
        context.beginPath();
        context.arc( x, y, r, 0, Math.PI * 2 ); 
        // context.rect( x - r / 2, y - r / 2, r, r ); 
        context.strokeStyle = color || '#2ca02c';
        context.stroke();
        context.restore();
    }


### drawEdge()

    @[data-script="babel-loose"]function drawEdge( context, source, target, label, color ) {
        context.save();
        context.beginPath();
        context.moveTo( source.x, source.y );
        context.lineTo( target.x, target.y );
        context.strokeStyle = color || '#2ca02c';
        context.stroke();
        context.restore();
    }


### 阶段性验证


<div id="test_basic_network" class="test">
<div class="test-container">
<div class="canvas-wrapper"></div>
<div class="test-console"></div>

    @[data-script="babel"](function(){

        let containerId = 'test_basic_network';
        let s = fly.createShow( '#' + containerId );
        let canvas = createCanvas( '#' + containerId + ' .canvas-wrapper' );
        let context = canvas.getContext( '2d' );
        const MAX_NODES_FIRST = 500;
        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        let source, target;

        let startTime = new Date().getTime();
        for( let i = 0; i < MAX_NODES_FIRST; i++ ) {
            source = target;
            let x = width * Math.random();
            let y = height * Math.random();
            target = { x: x, y: y };
            drawNode( context, x, y, 'n' + i );
            if ( source ) {
                drawEdge( context, source, target, 'e' + i, '#fff' );
            }
        }
        let endTime = new Date().getTime();

        s.show( 'testing start ...' );
        s.append_show( MAX_NODES_FIRST + ' nodes, ' + ( endTime - startTime ) / 1000 + 's' );

    })();

</div>
<div class="test-panel">
</div>
</div>






## 性能试验

> 在尺寸为`500*600`的画布上进行性能试验

### Mac Chrome

* `不间断`绘制小圆（360度arc），半径为5，最多只能绘制`大概469072`个小圆，超过该数目以后，画布无任何内容；随着绘制圆的半径增大，能绘制的数目会增多，绘制速度也明显提升，比如圆半径为400时，其绘制速度大大提高
* 如果要绘制更多数量的半径为5的小圆，则可采用`间断性`绘制，确保每次绘制的数量要`少于`以上数量
* 第一次不间断绘制如果失败，后续绘制也会失败
* 绘制大量小圆时，Chrome的性能低，远低于Safari；但绘制大量大圆（可视区无法完全容纳整个圆）时，情况刚好相反

### Mac Safari

* 在小圆绘制方面，与`Mac Chrome`相反，它能高效率的不间断绘制大量的小圆，但是随着圆的半径的增大，其绘制速度却显著下降，反而远低于Chrome
* 绘制大量小圆时，Safari性能高；但绘制大量大圆（可视区无法完全容纳整个圆）时，情况刚好相反

### 其他

* 总的来说，一个`不成熟`的结论像是：Chrome针对`可视区外`的大量绘制做了优化，相反Safari针对`可视区内`的大量绘制做了优化
* 绘制`line`, `rect`时，两者性能差别不大


<div id="test_canvas_perf" class="test">
<div class="test-container">
<div class="canvas-wrapper" style="height:500px; width:600px;"></div>
<div class="test-console"></div>

    @[data-script="babel"](function(){

        let containerId = 'test_canvas_perf';
        let s = fly.createShow( '#' + containerId );
        let canvas = createCanvas( '#' + containerId + ' .canvas-wrapper' );
        let context = canvas.getContext( '2d' );
        const MAX_NODES_FIRST = 5000;
        const MAX_NODES_SECOND = 469000;
        let allNodes = MAX_NODES_FIRST + MAX_NODES_SECOND;
        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        let source, target;

        let startTime = new Date().getTime();
        console.log( startTime );
        for( let i = 0; i < MAX_NODES_FIRST; i++ ) {
            source = target;
            let x = width * Math.random();
            let y = height * Math.random();
            target = { x: x, y: y };
            drawNode( context, x, y, 'n' + i );
            if ( source ) {
                drawEdge( context, source, target, 'e' + i, '#fff' );
            }
        }
        let endTime = new Date().getTime();
        console.log( endTime );

        s.show( 'testing start ...' );
        s.append_show( MAX_NODES_FIRST + ' nodes, ' + ( endTime - startTime ) / 1000 + 's' );

        // setTimeout( () => {
        //     let startTime = new Date().getTime();
        //     for( let i = 0; i < MAX_NODES_SECOND; i++ ) {
        //         let x = width * Math.random();
        //         let y = height * Math.random();
        //         drawNode( context, x, y, 'n' + i, '#d62728' );
        //     }
        //     let endTime = new Date().getTime();
        //     s.append_show( MAX_NODES_SECOND + ' nodes, ' + ( endTime - startTime ) / 1000 + 's' );
        // }, 5000 ) ;


    })();

</div>
<div class="test-panel">
</div>
</div>
