# graph layout 2


> 网络拓扑图布局算法研究2，续`graph layout`


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
.test-graph {
    height: 400px;
}
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/build/sigma/sigma.min.js"></script>
<script src="http://258i.com/static/build/sigma/plugins/sigma.plugins.animate.min.js"></script>

<script src="./js/graph-layout/utils.js"></script>
<script src="./js/graph-layout/sigma-utils.js"></script>
<script src="./js/graph-layout/sigma-graph.js"></script>
<script src="./js/graph-layout/sigma-prototype.js"></script>

<script src="./js/network.js"></script>
<script src="./js/network-0520.js"></script>
<script src="./js/networkGraph0520-allEdges.js"></script>
<script src="./js/network-grid-0521.js"></script>
<script src="./js/networkGraph-tree-0521.js"></script>
<script src="./js/network-forceAtlas2-0510.js"></script>
<script src="./js/network-2circle-0523.js"></script>
<script src="./js/network-edges-between-the-same-level-nodes-0524.js"></script>
<script src="./js/network-edges-between-the-same-level-nodes-2-0524.js"></script>
<script src="./js/network-tree-0524.js"></script>
<script src="./js/network-edges-between-levels-0526.js"></script>
<script src="./js/network-many-children-0526.js"></script>
<script src="./js/network-forest-0527.js"></script>


## 五、增量布局


### 5.1 构建新节点

新节点的特点是x, y, size未设置确定的值。

    @[data-script="javascript editable"]function createRawGraphData(
        nodeCount
        , edgeCount
        , existedNodes
        ){

        var graph = {nodes: [], edges: []}
            , nodeIds = []
            , len1, len2
            , idSeed = 100000
            , existedNodes = existedNodes || []
            , _nodes = []
            ;

        for(var i=0; i<nodeCount; i++){
            var id = 'n' + idSeed++;
            nodeIds.push(id);
            graph.nodes.push({
                id: id 
                , label: id
                , x: null
                , y: null
                , size: 10
                , color: fly.randomColor()
            });
        }

        _nodes = _nodes.concat(graph.nodes, existedNodes); 
        len1 = graph.nodes.length;
        len2 = _nodes.length;
        for(i=0; i<edgeCount; i++){
            id = 'e' + idSeed++;
            graph.edges.push({
                id: id 
                , source: graph.nodes[len1 * Math.random() | 0].id
                , target: _nodes[len2 * Math.random() | 0].id
                , color: '#ccc' 
                , hoverColor: '#c00'
            });
        }

        return graph;
    }


### 5.2 矩阵增量布局


    @[data-script="javascript editable"]sigma.utils.incLayoutGrid
        = function(nodes, newNodes, options){

        if(!newNodes || !newNodes.length
            || !nodes || !nodes.length){
            return;
        }

        var opt = options || {} 
            , rect
            , center
            , newCenter
            , newWidth = ( Math.ceil(Math.sqrt(newNodes.length)) - 1 ) * ( opt.space || 50 ) 
                + ( newNodes[0].size || + 20 )
            ;

        rect = sigma.utils.getNodesRect(nodes, opt);
        center = {
            x: rect.x + rect.w / 2
            , y: rect.y + rect.h / 2
        };
        newCenter = {
            x: rect.x + rect.w + newWidth * 1.5
            , y: rect.y + rect.h / 3
        };


        opt.center = newCenter;

        // from center point 
        newNodes.forEach(function(node){
            node.x = center.x; 
            node.y = center.y;
        });
        sigma.utils.getGridLayout(newNodes, opt);

        nodes.forEach(function(node){
            node.grid_x = node.x;
            node.grid_y = node.y;
        });
    };



    sigma.prototype.incLayoutGrid = function(
        newNodes, options) {
        var me = this
            ;

        sigma.utils.incLayoutGrid(
            me.graph.nodes()
            , newNodes
            , options
        );

        return me;
    };






<div id="test_10" class="test">
<div class="test-container">
<div id="test_10_graph" class="test-graph">
</div>
<div class="test-console"></div>

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_10');
        var g1 = getRandomGraph(200, 200, 1);
        var g1 = networkGraph_FR;
        var g1 = networkGraph_ForceAtlas2;
        var g1 = networkGraph0520_allEdges;
        var g1 = networkGraph_grid_0521; 
        var g1 = networkGraph_tree_0521;
        var g1 = networkGraph_2circles_0523;
        var g1 = networkGraph_edges_between_the_same_level_nodes;
        var g1 = networkGraph_edges_between_the_same_level_nodes_2;
        var g1 = networkGraph_many_children_0526;
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
                sideMargin: 10 

                // instance global settings
                , enableEdgeHovering: true
                , edgeHoverPrecision: 5
            };

        var sm;

        if((sm = isSigmaInstanceExisted(containerId))){
            sm.kill();
        };

        sm = getUniqueSigmaInstance(
                    containerId
                    , {
                        settings: sigmaSettings 
                        , graph: g1
                        , renderers: [
                            {
                                type: 'canvas' 
                                , container: containerId
                                , settings: rendererSettings
                            }
                        ]
                    }
                ); 

        sm.refresh();

        setTimeout(function(){
            var newData = createRawGraphData(
                    18
                    , 15
                    , sm.graph.nodes()
                )
                , newNodes = newData.nodes
                , newEdges = newData.edges
                ; 

            sm.incLayoutGrid(
                newNodes
                , {
                    space: 10
                }
            )
            ;

            newNodes.forEach(function(node){
                sm.graph.addNode(node);
            });

            newEdges.forEach(function(edge){
                sm.graph.addEdge(edge);
            });

            sm.refresh();

            console.log(sm.graph.nodes());

            sigma.plugins.animate(
                sm
                , {
                    x: 'grid_x'
                    , y: 'grid_y'
                }
                , {
                    duration: 500
                }
            );

        }, 1000);

    })();

</div>
<div class="test-panel">
</div>
</div>






