# chartjs

> Simple yet flexible JavaScript charting for designers & developers

## Resources
* site: <http://www.chartjs.org>
* github: <https://github.com/chartjs/Chart.js>
* docs: <http://www.chartjs.org/docs/latest/>
* samples: <http://www.chartjs.org/samples/latest/>

## Features
* `8种`类型的图表
* 使用`Canvas`技术绘制
* 自适应，针对resize等进行自适应重绘
* 相比`ECharts`、`D3`等，`chart`的功能比较单一，`封装级别`较低，更接近`原生用法`


## Tips
* `<canvas>`的尺寸`不能设置为相对值`，例如以下方式设置将得不到最佳展示效果：
        <canvas height="40vh" width="80vw">
        <canvas style="height:40vh; width:80vw">
        <canvas style="height:300px; width:100%">

    


## Versions

* latest: `v2.6.0` 2017-05
* `v1.x`


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
.test .canvas {
    height: 300px;
}
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/build/chart.js/2.6.0/Chart.min.js"></script>

## Samples

### the first sample

<div id="test_the_first" class="test">
<div class="test-container">
<canvas class="canvas"></canvas>

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_the_first');
        var ctx = document.querySelector( '#test_the_first .canvas' ).getContext( '2d' );
        var chart = new Chart( ctx, {
                type: 'line'
                , data: {
                    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ],
                    datasets: [{
                        label: "My First dataset"
                        , backgroundColor: 'rgb(145, 194, 251)'
                        , borderColor: 'rgb(67, 114, 224)'
                        , data: [ 0, 10, 5, 2, 20, 30, 45 ]
                    }] 
                }
                , options: {}
            } );

        s.show( 'line chart' );
    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>
