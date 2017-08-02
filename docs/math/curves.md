# curves

> 常用数学曲线


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
.graph-wrapper {
    width: 100%;
    height: 300px;
}
</style>
<script src="http://258i.com/static/bower_components/jquery/dist/jquery.min.js"></script>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>


## Resources

* 《高等数学》第六版 同济大学出版社 上册 附录二 P359

<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
        extensions: ["tex2jax.js"],
        TeX: { extensions: ["AMSmath.js"]},
        jax: ["input/TeX","output/HTML-CSS"],
        tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]}
    });
</script>
<script src="http://258i.com/static/bower_components/MathJax/MathJax.js"></script>

## 常用曲线

todo: 绘制出来

### 三次抛物线

<script type="math/tex; mode=display">
y=ax^3
</script>

<div id="test_cubical_parabola" class="test">
<div class="test-container">
<div class="graph-wrapper"></div>

    @[data-script="javascript"](function(){

        var containerId = 'test_cubical_parabola';
        var s = fly.createShow( '#' + containerId );
        var $container = $( '#' + containerId );
        var $canvasWrapper = $container.find( '.graph-wrapper' );
        var $canvas = $( '<canvas>' ).appendTo( $canvasWrapper );
        var ctx = $canvas[ 0 ].getContext( '2d' );
        var dpr = window.devicePixelRatio || 1;

        draw();
        $( window ).on( 'resize', draw );

        function draw() {
            var width = $canvasWrapper.width()
                , height = $canvasWrapper.height()
                ;
            $canvas.width( width )
                .height( height )
                .attr( 'width', width * dpr )
                .attr( 'height', height * dpr )
                ;
            ctx.scale( dpr, dpr );

            var coords = [];
            for ( var i = -5; i <= 5; i += 0.2 ) {
                var coord = [];
                coord[ 0 ] = i;
                coord[ 1 ] = Math.pow( i, 3 );
                coords.push( coord );
            }

            ctx.translate( width / 2, height / 2 ); 
            ctx.moveTo( -200, 0 );
            ctx.lineTo( 200, 0 );
            ctx.moveTo( 0, -145 );
            ctx.lineTo( 0, 145 );
            var graphRatio = 20;
            for ( var i = 0; i < coords.length - 1; i++ ) {
                ctx.moveTo( coords[ i ][ 0 ] * graphRatio, - coords[ i ][ 1 ] * graphRatio );
                ctx.lineTo( coords[ i + 1 ][ 0 ] * graphRatio, - coords[ i + 1 ][ 1 ] * graphRatio );
            }
            ctx.stroke();
        }

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




### 半立方抛物线

<script type="math/tex; mode=display">
y^2=ax^3
</script>

<div id="test_semi_cubical_parabola" class="test">
<div class="test-container">
<div class="graph-wrapper"></div>

    @[data-script="javascript"](function(){

        var containerId = 'test_semi_cubical_parabola';
        var s = fly.createShow( '#' + containerId );
        var $container = $( '#' + containerId );
        var $canvasWrapper = $container.find( '.graph-wrapper' );
        var $canvas = $( '<canvas>' ).appendTo( $canvasWrapper );
        var ctx = $canvas[ 0 ].getContext( '2d' );
        var dpr = window.devicePixelRatio || 1;

        draw();
        $( window ).on( 'resize', draw );
        
        function draw() {
            var width = $canvasWrapper.width()
                , height = $canvasWrapper.height()
                ;
            $canvas.width( width )
                .height( height )
                .attr( 'width', width * dpr )
                .attr( 'height', height * dpr )
                ;
            ctx.scale( dpr, dpr );

            var coords = [];
            for ( var y = -10; y <= 10; y += 0.5 ) {
                var coord = [];
                coord[ 0 ] = Math.pow( y * y, 1 / 3 );
                coord[ 1 ] = y;
                coords.push( coord );
            }

            ctx.translate( width / 2, height / 2 ); 
            ctx.moveTo( -200, 0 );
            ctx.lineTo( 200, 0 );
            ctx.moveTo( 0, -145 );
            ctx.lineTo( 0, 145 );
            var graphRatio = 12;
            for ( var i = 0; i < coords.length - 1; i++ ) {
                ctx.moveTo( coords[ i ][ 0 ] * graphRatio, - coords[ i ][ 1 ] * graphRatio );
                ctx.lineTo( coords[ i + 1 ][ 0 ] * graphRatio, - coords[ i + 1 ][ 1 ] * graphRatio );
            }
            ctx.stroke();
        }

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>





### 概率曲线

<script type="math/tex; mode=display">
y=e^{-x^2}
</script>

<div id="test_probability_curve" class="test">
<div class="test-container">
<div class="graph-wrapper"></div>

    @[data-script="javascript"](function(){

        var containerId = 'test_probability_curve';
        var s = fly.createShow( '#' + containerId );
        var $container = $( '#' + containerId );
        var $canvasWrapper = $container.find( '.graph-wrapper' );
        var $canvas = $( '<canvas>' ).appendTo( $canvasWrapper );
        var ctx = $canvas[ 0 ].getContext( '2d' );
        var dpr = window.devicePixelRatio || 1;

        draw();
        $( window ).on( 'resize', draw );
        
        function draw() {
            var width = $canvasWrapper.width()
                , height = $canvasWrapper.height()
                ;
            $canvas.width( width )
                .height( height )
                .attr( 'width', width * dpr )
                .attr( 'height', height * dpr )
                ;
            ctx.scale( dpr, dpr );

            var coords = [];
            for ( var x = -2.2; x <= 2.2; x += 0.2 ) {
                var coord = [];
                coord[ 0 ] = x;
                coord[ 1 ] = Math.pow( Math.E, -Math.pow( x, 2 ) );
                coords.push( coord );
            }

            ctx.translate( width / 2, height / 2 ); 
            ctx.moveTo( -200, 0 );
            ctx.lineTo( 200, 0 );
            ctx.moveTo( 0, -145 );
            ctx.lineTo( 0, 145 );
            var graphRatio = 50;
            for ( var i = 0; i < coords.length - 1; i++ ) {
                ctx.moveTo( coords[ i ][ 0 ] * graphRatio, - coords[ i ][ 1 ] * graphRatio );
                ctx.lineTo( coords[ i + 1 ][ 0 ] * graphRatio, - coords[ i + 1 ][ 1 ] * graphRatio );
            }
            ctx.stroke();
        }

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>

### 箕舌线

<script type="math/tex; mode=display">
y=\frac{8a^3}{x^2+4a^2}
</script>

### 蔓叶线

<script type="math/tex; mode=display">
y^2(2a-x)=x^3
</script>

### 笛卡儿叶形线

<script type="math/tex; mode=display">
x^3+y^3-3axy=0 \\
x=\frac{3at}{1+t^3}, y=\frac{3at^2}{1+t^2}
</script>

    星形线（内摆线的一种）
    摆线
    心形线（外摆线的一种）
    阿基米德螺线
    对数螺线
    双曲螺线
    伯努利双纽线
    三叶玫瑰线
    四叶玫瑰线
