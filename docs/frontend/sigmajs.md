# sigmajs


> 致力于在网页中绘制`网状图形`，提供交互接口。图形技术支持Canvas、WebGL和SVG。


## 一、初识

<http://sigmajs.org>

<https://github.com/jacomyal/sigma.js/wiki>





<script src="http://258i.com/static/build/sigma/sigma.min.js"></script>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
</style>






## 二、快速启动

以下代码提供`sigma`实例的生成器，根据`实例ID`在上下文中只保持一个实例，即使`多次调用`也是如此。

    @[data-script="javascript"]
    function getUniqueSigmaInstance(instId, config){

        var instances = (
                arguments.callee.__instances
                    || ( arguments.callee.__instances = [] )
            )
            ;

        if(!instances[instId]) {
            if(!config) {
                instances[instId] = new sigma();
            }
            else {
                instances[instId] = new sigma(
                    $.extend(
                        {}
                        , config
                    ) 
                );
            }
        }

        return instances[instId];
    }

    function getRandomGraph(numOfNodes, numOfEdges, isFixSize){

        var i
            , s
            , N = numOfNodes
            , E = numOfEdges
            , g = { nodes: [], edges: [] }
            ;

        for(i=0; i<N; i++){
            g.nodes.push({
                id: 'n' + i
                , label: '' + i
                , x: Math.random()
                , y: Math.random()
                , size: isFixSize ? 0.05 : Math.random()
                , color: fly.randomColor() 
            });
        }

        for(i=0; i<E; i++){
            g.edges.push({
                id: 'e' + i
                , source: 'n' + (Math.random() * N | 0) 
                , target: 'n' + (Math.random() * N | 0) 
                , size: isFixSize ? 0.01 : Math.random()
                , type: 'curve'
                // , color: fly.randomColor() 
                , color: '#ccc'
                , hover_color: '#f00'
            });
        }

        return g;
    }



## 三、从例子开始

两个节点一条边。

<div id="test_10" class="test">
<div class="test-container">
<div id="test_10_graph" class="test-graph"></div>

    @[data-script="javascript editable"]
    (function(){

        var s = fly.createShow('#test_10');
        
        var sm = getUniqueSigmaInstance(
                    'test_10'
                    , {
                        renderers: [
                            {
                                container: 'test_10_graph'
                                , type: 'canvas'
                            }
                        ]
                    }
                ); 

        sm.graph
            .clear()
            .addNode({
                id: 'n0'
                , label: 'Hello'
                , x: 0.5
                , y: 0.5
                , size: 1
                , color: '#f00'
            }) 
            .addNode({
                id: 'n1'
                , label: 'World!'
                , x: 0.8
                , y: 0.8
                , size: 1
                , color: '#00f'
            }) 
            .addEdge({
                id: 'e0'
                , source: 'n0' 
                , target: 'n1'
                // , type: 'curve'
                , color: '#ccc'
            }) 
            ;

        s.show(1, sm.graph.nodes());
        s.append_show(2, sm.graph.edges());

        sm.refresh();

    })();

</div>
<div class="test-console"></div>
<div class="test-panel"></div>
</div>





@[style="text-align:center"]<img src="./img/sigma-graph-view-camera-renderer.png" width="560">





## 四、Renderers


目前支持Canvas、WebGL、SVG。

canvas绘制，`5`个`layer`：node、edge、labels、捕获鼠标事件层以及显示hover对象层。


### 4.1 自定义renderer插件

自定义节点渲染插件，比如`sigma.canvas.nodes.squares：`

    sigma.canvas.nodes.square = function(node, context, settings) {
        var prefix = settings('prefix') || '',
            size = node[prefix + 'size'];

        context.fillStyle = node.color || settings('defaultNodeColor');
        context.beginPath();
        context.rect(
            node[prefix + 'x'] - size,
            node[prefix + 'y'] - size,
            size * 2,
            size * 2
        );

        context.closePath();
        context.fill();
    };


### 4.2 sigma实例的创建

不带任何参数，只创建graph，不绑定renderer：

    var sm = new sigma();

如果只提供container，会绑定renderer：

    var sm = new sigma(containerId);
    var sm = new sigma(containerDom);





## 五、Settings

非常类似javascript的`prototype chain`。

`三个`层次的settings，组件本身的配置、sigma实例的配置以及全局默认配置，也按照这个顺序逐次往上获取。

三条`规则`：

1. It must be possible to have two running instances of sigma with different parameters.
2. It must be possible to have two running renderers of the same sigma instance with different parameters.
3. The settings of each renderer, of each instance, and the global settings must be modifiable at any time.









<div id="test_20" class="test">
<div class="test-container">
<div id="test_20_graph" class="test-graph"></div>
<div class="test-console"></div>

    @[data-script="javascript editable"]
    (function(){

        var s = fly.createShow('#test_20');
        var g = getRandomGraph(10, 20, true);
        var containerId = 'test_20_graph';

        var sm = getUniqueSigmaInstance(
                    'test_20'
                    , {
                        settings: { 
                            // rescale settings 
                            sideMargin: 0.1 

                            // instance global settings
                            , enableEdgeHovering: true
                            , edgeHoverPrecision: 5
                        }
                        , renderers: [
                            {
                                type: 'canvas' 
                                , container: containerId 
                                , settings: {
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
                                }
                            }
                        ]
                    }
                ); 

        sm
            .graph
            .clear()
            .read(g)
            ;

        sm.refresh();

    })();

</div>
<div class="test-panel"></div>
</div>




## 六、事件绑定




<div id="test_30" class="test">
<div class="test-container">
<div id="test_30_graph" class="test-graph"></div>
<div class="test-console"></div>

    @[data-script="javascript editable"]
    (function(){

        var s = fly.createShow('#test_30');
        var g = getRandomGraph(3, 15, true);
        var containerId = 'test_30_graph';

        var sm = getUniqueSigmaInstance(
                    'test_30'
                    , {
                        settings: { 
                            sideMargin: 0.05 

                            // instance global settings
                            , enableEdgeHovering: true
                            , edgeHoverPrecision: 5
                        }
                        , renderers: [
                            {
                                type: 'canvas' 
                                , container: containerId 
                                , settings: {
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
                                }
                            }
                        ]
                    }
                ); 

        sm
            .graph
            .clear()
            .read(g)
            ;

        var m = 1
            , isSimpleMode = $('#test_30_checkbox').is(':checked')
            ;

        s.show('starting ...');
        sm
            .unbind()
            .bind(
                'click doubleClick'
                , function(e) {
                    s.append_show(m++, e.type, e.data.captor);
                }
            )
            .bind(
                'overNode outNode clickNode doubleClickNode rightClickNode'
                , function(e) {
                    if(isSimpleMode){
                        s.append_show(m++, e.type);
                    }
                    else {
                        s.append_show(m++, e.type, e.data.node.label, e.data.captor);
                    }
                }
            )
            .bind(
                'overEdge outEdge clickEdge doubleClickEdge rightClickEdge'
                , function(e) {
                    if(isSimpleMode){
                        s.append_show(m++, e.type);
                    }
                    else {
                        s.append_show(m++, e.type, e.data.edge, e.data.captor);
                    }
                }
            )
            .bind(
                'clickStage doubleClickStage rightClickStage'
                , function(e) {
                    if(isSimpleMode){
                        s.append_show(m++, e.type);
                    }
                    else {
                        s.append_show(m++, e.type, e.data.captor);
                    }
                }
            )
            .bind(
                'clickNodes clickEdges doubleClickNodes doubleClickEdges rightClickNodes rightClickEdges overNodes overEdges outNodes outEdges'
                , function(e) {
                    if(isSimpleMode){
                        s.append_show(m++, e.type);
                    }
                    else {
                        s.append_show(m++, e.type, e.data.edges || e.data.nodes, e.data.captor);
                    }
                }
            )
            .bind(
                'render'
                , function(e) {
                    s.append_show(m++, e.type);
                }
            )
            ;

        // s.show(sm.renderers);
        // s.show('sm.camaras', sm.cameras);

        sm.refresh();

    })();

</div>
<div class="test-panel container">
<div class="checkbox"><label><input type="checkbox" checked id="test_30_checkbox">精简模式</label></div>
</div>
</div>




## 七、Cameras


决定视角或者坐标系。


<style type="text/css">
#test_40 .test-graph {
    width: 25%;
    float: left;
}
</style>

<div id="test_40" class="test">
<div class="test-container">
<div id="test_40_graph_1" class="test-graph"></div>
<div id="test_40_graph_2" class="test-graph" style="width:75%;"></div>
<div class="test-console"></div>

    @[data-script="javascript editable"]
    (function(){

        var s = fly.createShow('#test_40');
        var g = getRandomGraph(3, 15, true);
        var containerId1 = 'test_40_graph_1';
        var containerId2 = 'test_40_graph_2';

        var sm = getUniqueSigmaInstance(
                'test_40'
            )
            , cam1
            , cam2
            ; 

        if(!sm.rendererAdded){
            cam1 = sm.addCamera('cam1');
            cam2 = sm.addCamera('cam2');

            sm.addRenderer({
                type: 'canvas' 
                , container: containerId1
                , camera: cam1
            });

            sm.addRenderer({
                type: 'canvas' 
                , container: containerId2 
                , camera: cam2
            });
            sm.rendererAdded = 1;
        }
        else {
            cam1 = sm.cameras['cam1'];
            cam2 = sm.cameras['cam2'];
        }

        sm
            .graph
            .clear()
            .read(g)
            ;

        var m = 1
            , isSimpleMode = $('#test_40_checkbox').is(':checked')
            ;

        s.show('camera1', cam1.x, cam1.y, cam1.ratio, cam1.angle);
        s.append_show('camera2', cam2.x, cam2.y, cam2.ratio, cam2.angle);

        cam1.goTo({
            x: Math.random()
            , y: Math.random()
            , ratio: 1.5 
            // , angle: Math.PI / 2
            , angle: Math.PI 
        });

        cam2.goTo({
            x: 0
            , y: 0
            , ratio: 1
            , angle: 0
        });
        s.append_show('camera1', cam1.x, cam1.y, cam1.ratio, cam1.angle);
        s.append_show('camera2', cam2.x, cam2.y, cam2.ratio, cam2.angle);

        $('#test_10_clear')
            .off()
            .on('click', function(){
                sm.graph.clear();
                sm.refresh();
            });

        sm.refresh();

    })();

</div>
<div class="test-panel">
<button id="test_10_clear">sm.clear()</button>
</div>
</div>


## 八、滑块控制缩放

todo











