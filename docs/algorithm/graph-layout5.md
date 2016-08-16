# graph layout 5

> 网络拓扑图布局算法研究5



<script src="http://258i.com/static/build/sigma/sigma.min.js"></script>
<script src="http://258i.com/static/build/sigma/plugins/sigma.plugins.animate.min.js"></script>
<script src="http://258i.com/static/build/sigma/plugins/sigma.layout.noverlap.min.js"></script>
<script src="http://258i.com/static/build/sigma/plugins/sigma.layout.forceAtlas2.min.js"></script>
<script src="http://258i.com/static/bower_components/vivagraphjs/dist/vivagraph.min.js"></script>
<script src="http://258i.com/static/bower_components/lodash/dist/lodash.min.js"></script>

<script src="./js/graph-layout/utils.js"></script>
<script src="./js/graph-layout/sigma-utils.js"></script>
<script src="./js/graph-layout/sigma-prototype.js"></script>
<script src="./js/sigma-extend/enable-drag.js"></script>

<script src="./js/graph-data/all.js"></script>

<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
.test-graph {
    height: 400px;
}
.test-graph svg {
    width: 100%;
    height: 100%;
}
.test-graph div {
    float: left;
    height: 100%;
    width: 50%;
    border: 1px dotted #666;
}
.test-graph div.test-graph-left-top,
.test-graph div.test-graph-right-top,
.test-graph div.test-graph-left-bottom,
.test-graph div.test-graph-right-bottom {
    height: 50%;
}
</style>




## 自动布局


### Noverlap算法


静态布局，计算好目标位置后，再进行渲染。可能最终渲染时会添加部分补间动画，但能很快到达目标状态。有稳定的感觉。

擅长解决`节点重叠`的问题。

`无法`达到边的长度均衡，交叉边最少的要求。

以下例子使用sigmajs自带的`noverlap`插件来实现。

<div id="test_10">
<div class="test-container">
<div id="test_10_graph" class="test-graph">
<div class="test-graph-left"></div>
<div class="test-graph-right"></div>
</div>
<div class="test-console"></div>

    @[data-script="javascript editable"]
    (function(){

        var s = fly.createShow('#test_10');
        var g1 = getRandomGraph(200, 200, 1);
        // var g1 = getLineGraph(20, 20, {nodeSize: 1});
        var g2 = {
                nodes: g1.nodes.slice()
                , edges: g1.edges.slice() 
            };
        var containerId = 'test_10_graph';
        var rendererSettings = {
                // captors settings
                doubleClickEnabled: true
                , mouseWheelEnabled: false

                // rescale settings
                , minEdgeSize: 0.5
                , maxEdgeSize: 1
                , minNodeSize: 1 
                , maxNodeSize: 5

                // renderer settings
                , edgeHoverColor: fly.randomColor() 
                , edgeHoverSizeRatio: 1
                , edgeHoverExtremities: true
                , drawLabels: false
            };
        var sigmaSettings = {
                // rescale settings 
                sideMargin: 0.1 

                // instance global settings
                , enableEdgeHovering: true
                , edgeHoverPrecision: 5
            };

        var sm1, sm2;

        if((sm1 = isSigmaInstanceExisted('test_10_left'))
            && (sm2 = isSigmaInstanceExisted('test_10_right'))){
            sm1.kill();
            sm2.kill();
        };

        sm1 = getUniqueSigmaInstance(
                    'test_10_left'
                    , {
                        settings: sigmaSettings 
                        , graph: g1
                        , renderers: [
                            {
                                type: 'canvas' 
                                , container: $('#' + containerId + ' .test-graph-left')[0]
                                , settings: rendererSettings
                            }
                        ]
                    }
                ); 

        sm2 = getUniqueSigmaInstance(
                    'test_10_right'
                    , {
                        settings: sigmaSettings 
                        , graph: g2
                        , renderers: [
                            {
                                type: 'canvas' 
                                , container: $('#' + containerId + ' .test-graph-right')[0]
                                , settings: rendererSettings
                            }
                        ]
                    }
                ); 

        sm1.refresh();
        var noverlapListener = sm2.configNoverlap({
                nodeMargin: 0.1,
                scaleNodes: 1.05,
                gridSize: 20,
                easing: 'quadraticInOut',
                duration: 5000
            });

        sm2.startNoverlap();


    })();

</div>
<div class="test-panel"></div>
</div>





### FDA算法

`FDA`(Force-directed Algorithm)是图布局研究中的重要研究成果，也是最知名的图布局算法之一，在网络
节点布局中占据了主导地位，该算法也称为`弹性模型(Sprint Embedded Model)`。FDA算法中另一个比较著名
的算法是`GVA(Grid Variant Algorithm)`，也叫做`FR算法`。

`动态`布局，计算过程与渲染同时进行。动态效果好，但有不稳定的感觉。

最终布局效果（`依赖`收敛时间）：
1. 每条边`长度`趋于`一致`。
2. 节点`不重合`。

依赖收敛时间，如果收敛时间太长，图形会一直跳动，有种`不稳定`的感觉。

以下例子使用vivagraph来实现，使用了`Viva.Graph.Layout.forceDirected`布局算法。 

相关： 
* <https://github.com/anvaka/ngraph.physics.simulator>
* <https://github.com/anvaka/ngraph.forcelayout>


<div id="test_20" class="test">
<div class="test-container">
<div id="test_20_graph" class="test-graph"></div>
<div class="test-console"></div>

    @[data-script="javascript editable"]
    (function(){

        var s = fly.createShow('#test_20');
        var g = getRandomGraph(20, 40, 1);
        // var g = getLineGraph(20, 40, {nodeSize: 1});
        var containerId = 'test_20_graph';
        var graph, renderer;

        if($('#' + containerId).data('viva-graph')){
            graph = $('#' + containerId).data('viva-graph'); 
        }
        else {
            var graphGenerator = Viva.Graph.generator();
            graph = graphGenerator.grid(8, 8);
            // graph = Viva.Graph.graph();
            $('#' + containerId).data('viva-graph', graph); 
        }

        /*
        graph.clear();
        g.nodes.forEach(function(node){
            graph.addNode(node.id, {x: node.x, y: node.y});
        });
        g.edges.forEach(function(edge){
            graph.addLink(edge.source, edge.target);
        });
        */

        renderer = $('#' + containerId).data('viva-renderer'); 
        renderer && renderer.dispose();

        var layout = Viva.Graph.Layout.forceDirected(
            graph
            , {
                springLength: 10
                , springCoeff: 0.0005
                , dragCoeff: 0.02
                , gravity: -1.2
            }
        );

        // https://github.com/anvaka/VivaGraphJS/blob/master/src/View/renderer.js
        renderer = Viva.Graph.View.renderer(
            graph
            , {
                container: $('#' + containerId)[0]
                , layout: layout
                , interactive: false
            }
        );
        $('#' + containerId).data('viva-renderer', renderer); 

        renderer.run();

        setTimeout(function(){
            renderer.pause();
        }, 5000);

    })();

</div>
<div class="test-panel"></div>
</div>



### forceAtlas2算法

> `ForceAtlas2`, a `continuous graph layout` algorithm for handy network visualization designed for the `Gephi` software.


`参考`：<http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0098679>


`相连`节点间有`胡克引力`，会互相`吸引`；`不相连`节点有`库仑斥力`，会互相`远离`。以及所有节点都有`重力`，会向中心靠拢。

* 对于`森林`的展示，效果不是很好。先进行节点`归类`比较好
* `收敛`速度慢，或者`长久无法`收敛，导致某些交互效果无法响应，比如hover。这时调用

        sigmaInst.killForceAtlas2();

    可能是一个好办法。

整个算法以一个`模拟``物理系统`的方式进行多次迭代，需要配置`合适`的`参数`来获得较好的布局效果。这个可能比较费时间。目前比较有效的几个参数如下：

    {
        worker: true
        , barnesHutOptimize: false
        , scalingRatio: 260
        , slowDown: 3
        , outboundAttractionDistribution: 1
        , gravity: 15
    }


另外，`整个`系统能量的最小化比较容易达到，但是`局部`能量的最小化却比较不确定，容易出现`局部`节点`抖动`的情况。不过节点抖动也有一定的`规律`可循，通过增加新的优化选项字段`preventShaking`来避免。

    {
        preventShaking: true
    }


相关代码如下，思路为发现抖动的节点，则将其`设为静止`不再参与物理系统的运行：

    ...
    var shakingThreshold = W.settings.shakingThreshold || 0.05;
    var dx = NodeMatrix[np(n, 'dx')];
    var oldDx = NodeMatrix[np(n, 'old_dx')];
    var dy = NodeMatrix[np(n, 'dy')];
    var oldDy = NodeMatrix[np(n, 'old_dy')];

    if(W.settings.preventShaking){
      if(Math.abs(Math.abs(dx) - Math.abs(oldDx)) / Math.abs(dx) < shakingThreshold
          && Math.abs(dx - oldDx) / ( 2 * Math.abs(dx) ) > 1 - shakingThreshold
        || Math.abs(Math.abs(dy) - Math.abs(oldDy)) / Math.abs(dy) < shakingThreshold
          && Math.abs(dy - oldDy) / ( 2 * Math.abs(dy) ) > 1 - shakingThreshold) {
        NodeMatrix[np(n, 'fixed')] = 1;
      }
    }
    ...


在项目中，我们将这种算法获得的布局称为`Organic layout`（`有机体布局`）。该布局显示出一种`内在`的`平衡感`、`簇布局`、`少交叉边`等特点。本质上还是`力导向`布局算法的衍生。

<http://docs.yworks.com/yfiles/doc/demo/layout/module/SmartOrganicLayoutModule.java.html>


以下例子使用sigmajs自带的`forceAtlas2`算法来实现。


<div id="test_30">
<div class="test-container">
<div id="test_30_graph" class="test-graph">
<div class="test-graph-left"></div>
<div class="test-graph-right"></div>
</div>
<div class="test-console"></div>

    @[data-script="javascript editable"]
    (function(){

        var s = fly.createShow('#test_30');
        // var g1 = getRandomGraph(80, 200, 1);
        // var g1 = getLineGraph(80, 200, {nodeSize: 1});
        // var g1 = networkGraph_FR;
        // var g1 = networkGraph_ForceAtlas2;
        var g1 = networkGraph0520_allEdges;
        // var g1 = networkGraph_circle_0628;
        // var g1 = networkGraph_mesh_0628;
        // var g1 = networkGraph_grid_0521; 
        // var g1 = networkGraph_tree_0521;
        // var g1 = networkGraph_2circles_0523;
        // var g1 = networkGraph_edges_between_the_same_level_nodes;
        // var g1 = networkGraph_edges_between_the_same_level_nodes_2;
        // var g1 = networkGraph_many_children_0526;
        // var g1 = networkGraph_simple_0604_1;
        var g2 = {
                nodes: g1.nodes.slice()
                , edges: g1.edges.slice() 
            };
        var clusterPreprocessing = 0;
        var containerId = 'test_30_graph';
        var rendererSettings = {
                // captors settings
                doubleClickEnabled: true
                , mouseWheelEnabled: false

                // rescale settings
                , minEdgeSize: 0.5
                , maxEdgeSize: 1
                , minNodeSize: 1 
                , maxNodeSize: 5

                // renderer settings
                , edgeHoverColor: fly.randomColor() 
                , edgeHoverSizeRatio: 1
                , edgeHoverExtremities: true
                , drawEdges: true
                , drawLabels: false
            };
        var sigmaSettings = {
                // rescale settings 
                sideMargin: 0.1 

                // instance global settings
                , enableEdgeHovering: true
                , edgeHoverPrecision: 5
            };

        var sm1, sm2;

        if((sm1 = isSigmaInstanceExisted('test_30_left'))
            && (sm2 = isSigmaInstanceExisted('test_30_right'))){
            sm1.kill();
            sm2.kill();
        };

        sm1 = getUniqueSigmaInstance(
                    'test_30_left'
                    , {
                        settings: sigmaSettings 
                        , graph: g1
                        , renderers: [
                            {
                                type: 'canvas' 
                                , container: $('#' + containerId + ' .test-graph-left')[0]
                                , settings: rendererSettings
                            }
                        ]
                    }
                ); 

        sm2 = getUniqueSigmaInstance(
                    'test_30_right'
                    , {
                        settings: sigmaSettings 
                        , graph: g2
                        , renderers: [
                            {
                                type: 'canvas' 
                                , container: $('#' + containerId + ' .test-graph-right')[0]
                                , settings: rendererSettings
                            }
                        ]
                    }
                ); 

        sm1.refresh();

        clusterPreprocessing && sm2.layoutCluster({
                distanceCoefficient: 1.1
                , radiusStep: 50
                , randomRadius: 1
            })
            .applyLayoutInstantly({
                readPrefix: 'cluster_'
            })
            ;
        sm2.startForceAtlas2({
            worker: true
            , barnesHutOptimize: false
            , scalingRatio: 260
            , slowDown: 1
            , outboundAttractionDistribution: 1
            , gravity: 15
            , preventShaking: 1
            , shakingThreshold: 0.1
        }); 

        setTimeout(function(){
            sm2.killForceAtlas2();
            var noverlapListener = sm2.configNoverlap({
                    nodeMargin: 5,
                    scaleNodes: 1.05,
                    gridSize: 20,
                    easing: 'quadraticInOut',
                    duration: 1000
                });
            sm2.startNoverlap();
        }, 5000);

    })();

</div>
<div class="test-panel"></div>
</div>



