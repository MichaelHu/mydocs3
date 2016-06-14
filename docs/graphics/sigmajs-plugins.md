# sigmajs-plugins


> 插件


<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://123.56.89.145/static/build/sigma/sigma.min.js"></script>
<script src="http://123.56.89.145/static/build/sigma/plugins/sigma.renderers.parallelEdges.min.js"></script>


<style type="text/css">

@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";

</style>


## 一、帮助函数


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
                , label: 'N' + i
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
                , type: 'curvedArrow'
                , color: fly.randomColor() 
                , hover_color: '#f00'
                , count: i
            });
        }

        return g;
    }





## 二、平行边插件

1. 引入插件代码：

        <script src="http://123.56.89.145/static/build/sigma/plugins/sigma.renderers.parallelEdges.min.js"></script>
        
2. Edge config: 

        {
            ...
            type: 'curvedArrow'
            , count: i
            ...
        }



展示两个节点间存在多条边的情况，避免多条边重合显示，将多条边平行显示。

<div id="test_10" class="test">
<div class="test-container">
<div id="test_20_graph" class="test-graph"></div>

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_20');
        var g = getRandomGraph(3, 12, true);
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
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>

