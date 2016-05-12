# graph layout

> 网络拓扑图布局算法研究

## 一、综述

### 1.1 参考文献

1. 一种改进的可视化布局算法IGVA; 徐红云,陈志锋
2. VERVIEW OF ALGORITHMS FOR GRAPH DRAWING; Pajntar B.; <http://ailab.ijs.si/dunja/SiKDD2006/Papers/Pajntar.pdf>
3. <http://cs.brown.edu/~rt/gdhandbook/>
4. <http://www.ogdf.net/doku.php>


### 1.2 评价标准

评价标准：`性能`、`美观`并重

`美学标准`：

1. 边交叉数量最小原则。
2. 直线边原则。曲边会增加图的复杂度。
3. 邻接点空间位置接近原则。这样可以减小边的长度。
4. 边平衡布局原则。以相同节点为出发点的多条边应尽量以该节点为中心平衡布局。
5. 节点层次布局原则。引入层的概念，将节点尽量布局在水平或竖直的不同层上。




<script src="http://258i.com/static/build/sigma/sigma.min.js"></script>
<script src="http://258i.com/static/build/sigma/plugins/sigma.plugins.animate.min.js"></script>
<script src="http://258i.com/static/build/sigma/plugins/sigma.layout.noverlap.min.js"></script>
<script src="http://258i.com/static/build/sigma/plugins/sigma.layout.forceAtlas2.min.js"></script>
<script src="http://258i.com/static/bower_components/vivagraphjs/dist/vivagraph.min.js"></script>
<script src="http://258i.com/static/bower_components/lodash/dist/lodash.min.js"></script>
<script src="./js/network.js"></script>
<script src="./js/network-forceAtlas2-0510.js"></script>
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
</style>






## 二、快速启动

以下代码提供`sigma`实例的生成器，根据`实例ID`在上下文中只保持一个实例，即使`多次调用`也是如此。

    @[data-script="javascript editable"]
    function getUniqueSigmaInstance(instId, config, isSearch){

        var instances = (
                arguments.callee.__instances
                    || ( arguments.callee.__instances = [] )
            )
            ;

        if(!instances[instId]) {
            if(isSearch){
                return false;
            }

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
        else {
            if(isSearch == 2) {
                var ret = instances[instId];
                delete instances[instId];
                return ret;
            }
        }

        return instances[instId];
    }

    function isSigmaInstanceExisted(instId){
        return getUniqueSigmaInstance(instId, null, 2);
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
                , size: isFixSize ? 0.01 : Math.random()
                , color: fly.randomColor() 
            });
        }

        for(i=0; i<E; i++){
            var edge = {
                id: 'e' + i
                , source: 'n' + (Math.random() * N | 0) 
                , target: 'n' + (Math.random() * N | 0) 
                , size: isFixSize ? 0.01 : Math.random()
                // , type: 'curve'
                // , color: fly.randomColor() 
                , color: '#ccc'
                , hover_color: '#f00'
            };
            
            if(edgeExists(edge)){
                continue;
            }
            else {
                g.edges.push(edge);
            }
            
        }

        function edgeExists(edge){
            for(var i=0; i<g.edges.length; i++){
                if(g.edges[i].source == edge.source
                    && g.edges[i].target == edge.target) {
                    return true;
                }
            }
            return false;
        }

        return g;
    }



## 三、自动布局





### 3.1 Noverlap算法


静态布局，计算好目标位置后，再进行渲染。可能最终渲染时会添加部分补间动画，但能很快到达目标状态。有稳定的感觉。

擅长解决`节点重叠`的问题。

`无法`达到边的长度均衡，交叉边最少的要求。

以下例子使用sigmajs自带的`noverlap`插件来实现。

<style type="text/css">
.test-graph div {
    float: left;
    height: 100%;
    width: 50%;
}
</style>


<div class="test-container">
<div id="test_10_graph" class="test-graph">
<div class="test-graph-left"></div>
<div class="test-graph-right"></div>
</div>
<div class="test-console"></div>

    @[data-script="javascript editable"]
    (function(){

        var s = fly.createShow('#test_10');
        var g1 = getRandomGraph(200, 200, true);
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





### 3.2 FDA算法

FDA(Force-directed Algorithm)是图布局研究中的重要研究成果，也是最知名的图布局算法之一，在网络
节点布局中占据了主导地位，该算法也称为`弹性模型(Sprint Embedded Model)`。FDA算法中另一个比较著名
的算法是`GVA(Grid Variant Algorithm)`，也叫做`FR算法`。

`动态`布局，计算过程与渲染同时进行。动态效果好，但有不稳定的感觉。

最终布局效果（`依赖`收敛时间）：
1. 每条边`长度`趋于`一致`。
2. 节点`不重合`。

依赖收敛时间，如果收敛时间太长，图形会一直跳动，有种`不稳定`的感觉。

以下例子使用vivagraph来实现，使用了`Viva.Graph.Layout.forceDirected`布局算法。 


<div id="test_20" class="test">
<div class="test-container">
<div id="test_20_graph" class="test-graph"></div>
<div class="test-console"></div>

    @[data-script="javascript editable"]
    (function(){

        var s = fly.createShow('#test_20');
        var g = getRandomGraph(20, 40, true);
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
        renderer = Viva.Graph.View.renderer(
            graph
            , {
                container: $('#' + containerId)[0]
                , layout: layout
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



### 3.3 forceAtlas2算法


`相连`节点间有`引力`，会互相`吸引`；`不相连`节点有`斥力`，会互相`远离`。

* 对于`森林`的展示，效果不是很好
* `收敛`速度慢，或者`长久无法`收敛，导致某些交互效果无法响应，比如hover。这时调用

        sigmaInst.supervisor.stop();

    可能是一个好办法。

以下例子使用sigmajs自带的`forceAtlas2`算法来实现。


<div class="test-container">
<div id="test_30_graph" class="test-graph">
<div class="test-graph-left"></div>
<div class="test-graph-right"></div>
</div>
<div class="test-console"></div>

    @[data-script="javascript editable"]
    (function(){

        var s = fly.createShow('#test_30');
        // var g1 = getRandomGraph(80, 200, true);
        var g1 = networkGraph_FR;
        // var g1 = networkGraph_ForceAtlas2;
        var g2 = {
                nodes: g1.nodes.slice()
                , edges: g1.edges.slice() 
            };
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
                , drawEdges: false
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
        sm2.startForceAtlas2({
            worker: true
            , barnesHutOptimize: false
        }); 

        setTimeout(function(){
            sm2.supervisor.stop();
        }, 5000);

    })();

</div>
<div class="test-panel"></div>
</div>



### 3.4 Yifan Hu算法

使用`Edge Bundling`（边捆绑技术）。Todo





## 四、固定布局


### 4.1 新增常用方法

`sortByNodesDegree()`：按节点度进行排序。

    @[data-script="javascript"]sigma.classes.graph.addMethod(
        'sortByNodesDegree'
        , function(reverse){
        var nodes = this.nodesArray
            , me = this
            ;

        nodes.forEach(function(node){
            node.degree = me.degree(node.id);
        });
        nodes.sort(function(a, b){
            return reverse 
                ? b.degree - a.degree
                : a.degree - b.degree;
        });
    
        return this;
    });

`widthTravel(root)`：从root节点开始对图进行广度遍历，遍历过程中`忽略``父节点`和`兄弟`节点。

    @[data-script="javascript"]sigma.classes.graph.addMethod(
        'widthTravel'
        , function(root, callbacks, excludes){

        var nodes = this.nodesArray
            , edges = this.edgesArray
            , me = this
            , cbs = callbacks || {}
            , queue = []
            , parentAndSiblingNodes = excludes || {}
            , node = root || notes[0]
            , children
            ;

        node._wt_level = 1;
        queue.push(node);
        parentAndSiblingNodes[node.id] = 1;

        while((node = queue.splice(0, 1)).length > 0){
            node = node[0];
            children = getChildren(node); 
            node._wt_children = children;
            queue = queue.concat(children);

            if(typeof cbs['onNode'] == 'function'){
                cbs['onNode'](node);
            }
        }

        function getChildren(node){
            var id = node.id
                , children = []
                , childId
                , child
                ;
            edges.forEach(function(edge){
                if(
                    edge.source == id
                    || edge.target == id
                  ){
                    childId = edge.source;
                    if(childId == id){
                        childId = edge.target;
                    }
                    if(!parentAndSiblingNodes[childId]){
                        parentAndSiblingNodes[childId] = 1;
                        child = me.nodes(childId);
                        child._wt_level = node._wt_level + 1;
                        children.push(child);
                    }
                }
            });
            return children;
        }

        return this;

    });


`getLayoutForest()`：生成布局森林。对图进行`广度`遍历，获得其`遍历树`。

    @[data-script="javascript"]sigma.classes.graph.addMethod(
        'getLayoutForest'
        , function(root){
        var nodes = this.nodesArray
            , me = this
            , nodesVisited = {}
            , forest = []
            , node = root || nodes[0]
            ;

        do {
            this.widthTravel(
                node
                , {
                    onNode: function(node){
                        nodesVisited[node.id] = true;
                    }
                } 
            )
            forest.push(node);
            ;
        } while((node = hasMore()));

        function hasMore(){
            for(var i=0; i<nodes.length; i++){
                if(!nodesVisited[nodes[i].id]){
                    return nodes[i];
                }
            }
            return 0;
        }


        return forest;
    });


`computeLeaves()`：计算布局森林每个节点包含的叶子节点数。

    @[data-script="javascript editable"]function computeLeaves(forest){
        
        forest.forEach(function(tree){

            // if there is a circuit
            if(tree._circuit){
                tree._circuit.forEach(function(node){
                    depthTravel(node);
                });
            }
            else {
                depthTravel(tree);

            }

            function depthTravel(node){
                var children = node._wt_children
                    , _leaves
                    , leaves = 0
                    ;
                if(children.length == 0){
                    _leaves = [1];
                }
                else {
                    _leaves = children.map(function(node){
                        return depthTravel(node);
                    }); 
                }

                _leaves.forEach(function(item){
                    leaves += item;
                });

                return ( node._wt_leaves = leaves );
            }

        });

    }


`depthTravel()`：从root节点开始对图进行深度遍历，遍历过程忽略已经访问过的节点。

    @[data-script="javascript"]sigma.classes.graph.addMethod(
        'depthTravel'
        , function(root, callbacks){

        var nodes = this.nodesArray
            , edges = this.edgesArray
            , me = this
            , cbs = callbacks || {}
            , visitedNodes = {}
            , node = root
            , children
            ;

        node._dt_level = 1;
        _depthTravel(node);

        function _depthTravel(node){
            if(visitedNodes[node.id]){
                return;
            }
            visitedNodes[node.id] = 1;

            if(typeof cbs['onNode'] == 'function'){
                cbs['onNode'](node);
            }

            var children = getChildren(node); 
            if(children.length > 0){
                children.forEach(function(child){
                    _depthTravel(child);
                });
            }
        }

        function getChildren(node){
            var id = node.id
                , children = []
                , childId
                , child
                ;
            edges.forEach(function(edge){
                if(
                    edge.source == id
                    || edge.target == id
                  ){
                    childId = edge.source;
                    if(childId == id){
                        childId = edge.target;
                    }
                    if(!visitedNodes[childId]){
                        child = me.nodes(childId);
                        child._dt_level = node._dt_level + 1;
                        children.push(child);
                    }
                }
            });
            return children;
        }

        return this;

    });


`getCircuits()`：从root节点开始，寻找所有回路。对图进行`深度`遍历，当根节点的一个`非邻接`节点有一条到根节点的边，则构成一条`回路`。

    @[data-script="javascript"]sigma.classes.graph.addMethod(
        'getCircuits'
        , function(root){

        var nodes = this.nodesArray
            , edges = this.edgesArray
            , me = this
            , root = root || nodes[0]
            , visitedNodes = {}
            , children
            , path = []
            , circuits = []
            ;

        root._dt_level = 1;
        _depthTravel(root);
        return circuits;

        function _depthTravel(node){
            if(visitedNodes[node.id]){
                return;
            }
            visitedNodes[node.id] = 1;
            path.push(node);

            var children = getChildren(node); 
            if(children.length > 0){
                children.forEach(function(child){
                    _depthTravel(child);
                });
            }
            path.pop(node);
        }

        function getChildren(node){
            var id = node.id
                , children = []
                , childId
                , child
                ;
            edges.forEach(function(edge){
                if(
                    edge.source == id
                    || edge.target == id
                  ){
                    childId = edge.source;
                    if(childId == id){
                        childId = edge.target;
                    }

                    // non-adjacent node has a link to root, there is a circuit 
                    if(node._dt_level > 2){
                        if(childId == root.id){
                            circuits.push(path.slice());  
                        }                        
                    }

                    if(!visitedNodes[childId]){
                        child = me.nodes(childId);
                        child._dt_level = node._dt_level + 1;
                        children.push(child);
                    }

                }
            });
            return children;
        }

    });

`getCircleForest()`：获得圆形布局森林。

    @[data-script="javascript"]sigma.classes.graph.addMethod(
        'getCircleForest'
        , function(root){

        var nodes = this.nodesArray
            , edges = this.edgesArray
            , me = this
            , circuits
            , circuit
            , tree = root || nodes[0]
            , excludes
            , nodesVisited = {}
            , forest = []
            ;
        
        do {
            circuits = me.getCircuits(tree);
            excludes = {};

            if(circuits.length > 0){
                circuits.sort(function(a, b){
                    return b.length - a.length;
                });
                tree._circuit = circuit = circuits[0]; 

                circuit.forEach(function(_node){
                    excludes[_node.id] = 1;
                });

                circuit.forEach(function(_node){
                    me.widthTravel(
                        _node
                        , {
                            onNode: function(__node){
                                nodesVisited[__node.id] = 1;
                            }
                        }
                        , excludes
                    );
                });
            }
            else {
                me.widthTravel(
                    tree
                    , {
                        onNode: function(__node){
                            nodesVisited[__node.id] = 1;
                        }
                    }
                );
            }

            forest.push(tree);
        } while((tree = hasMore()));

        function hasMore(){
            for(var i=0; i<nodes.length; i++){
                if(!nodesVisited[nodes[i].id]){
                    return nodes[i];
                }
            }
            return 0;
        } 

        return forest;

    });


`computeCircleTreeRect()`：获取`圆形布局树`的`空间`占用，用`矩形`表示。

    @[data-script="javascript"]function computeCircleTreeRect(tree){

        var maxLevel = tree._wt_maxlevel
            , hasCircuit = tree._circuit ? 1 : 0
            , width = hasCircuit ? 2 * maxLevel : maxLevel
            ;

        if(maxLevel){
            return {
                x: 0
                , y: 0 
                , w: width 
                , h: width / 2 
            };
        }

        return null;
    }

    


`Grid工具类`：


    @[data-script="javascript editable"](function(){

        function Grid(xSize, ySize){
            var me = this;

            me.xSize = xSize || 10;
            me.ySize = ySize || 10;
            me.grid = [];
            me.blockList = {};

            me.init();
        }

        var prototype = {

            init: function(){
                var me = this
                    , grid = me.grid
                    ; 

                for(var i=0; i<me.ySize; i++){
                    grid.push([]);
                    for(var j=0; j<me.xSize; j++){
                        grid[i].push(0);
                    }
                }
            }

            , getBlockRect: function(id){
                return this.blockList[id];
            }

            , getMinSquare: function(){
                var me = this
                    , square = null
                    , grid = me.grid
                    , i, j
                    , xMax = 0
                    , yMax = 0
                    , max
                    ;
                
                for(i=0; i<me.xSize; i++){
                    for(j=0; j<me.ySize; j++){
                        if(grid[i][j]){
                            xMax = Math.max(i + 1, xMax);
                            yMax = Math.max(j + 1, xMax);
                        }
                    }
                } 

                if(xMax > 0 && yMax > 0){
                    max = Math.max(xMax, yMax);
                    square = {
                        x: 0, y: 0
                        , w: max
                        , h: max
                    }
                }

                return square;
            }

            , getMaxSpareRect: function(minSquare){
                var me = this
                    , grid = me.grid
                    , square = minSquare || me.getMinSquare()
                    , rect
                    , iStart, jStart
                    , i, j
                    ; 
               
                if(!square){
                    rect = {
                        x: 0 
                        , y: 0
                        , w: me.xSize
                        , h: me.ySize
                    };
                } 
                else {
                    jStart = square.x + square.w - 1;
                    iStart = square.y + square.h - 1;

                    if(grid[iStart][jStart]){
                        if(iStart < me.ySize - 1 && jStart < me.xSize - 1){
                            iStart++;
                            jStart++;
                        }
                        else {
                            rect = null;
                        }
                    }

                    var w
                        , h
                        , wMax = Infinity
                        , areas = [];
                   
                    h = 0;

                    for(i=iStart; i >= 0; i--){
                        h++;
                        w = 0;
                        for(j=jStart; j>=0; j--){
                            w++; 
                            if(grid[i][j]){
                                wMax = Math.min(w - 1, wMax);
                                areas.push({
                                    x: jStart - wMax + 1 
                                    , y: i 
                                    , w: wMax
                                    , h: h
                                    , area: wMax * h  
                                });
                                break;
                            }
                        }
                        if(j < 0){
                            wMax = Math.min(w, wMax);
                            areas.push({
                                x: 0
                                , y: i 
                                , w: wMax
                                , h: h
                                , area: wMax * h  
                            });
                        }
                    }

                    areas.sort(function(a, b){
                        return b.area - a.area;
                    });
                    rect = areas[0];
                }
                
                return rect;
            }

            , placeBlock: function(id, block, debug){
                var me = this
                    , minSquare = me.getMinSquare()
                    , maxSpareRect
                    , pos = {x: 0, y: 0}
                    ;

                if(!minSquare){
                    pos.x = 0;
                    pos.y = 0;
                }
                else {
                    maxSpareRect = me.getMaxSpareRect(minSquare);
                    if(!maxSpareRect) {
                        pos.x = minSquare.x + minSquare.w;
                        pos.y = 0;
                    }
                    else {
                        pos.x = maxSpareRect.x;
                        pos.y = maxSpareRect.y;
                    }
                }
                
                me.addBlock(id, pos, block, debug); 
            } 

            , addBlock: function(id, pos, block, debug){
                var me = this
                    , grid = me.grid
                    ;

                for(var i=pos.y; i<pos.y + block.h && i<me.ySize; i++){
                    for(var j=pos.x; j<pos.x + block.w && j<me.xSize; j++){
                        if(!grid[i][j]){
                            grid[i][j] = debug ? id : 1;
                        }
                        else {
                            throw new Error('grid[' + i + '][' + j + '] is occupied!');
                        }
                    }
                }     
                block.gridPos = pos;
                me.blockList[id] = block; 
            }

        };

        function extend(dest, src){
            for(var i in src){
                dest[i] = src[i];
            }
        }

        extend(Grid.prototype, prototype);

        window.Grid = Grid;
    
    })();




### 4.2 常用方法验证 

以下验证`sortByNodesDegree`, `getLayoutForest`, `computeLeaves`, `widthTravel`以及`depthTravel`等方法：

<div id="test_35" class="test">
<div class="test-console"></div>
<div class="test-container">
<div id="test_35_graph" class="test-graph"></div>

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_35');
        var g = getRandomGraph(5, 10, true);
        var containerId = 'test_35_graph';
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
            };
        var sigmaSettings = {
                // rescale settings 
                sideMargin: 0.1 

                // instance global settings
                , enableEdgeHovering: true
                , edgeHoverPrecision: 5
            };
        var sm;
        if((sm = isSigmaInstanceExisted('test_35'))){
            sm.kill();
        };
    
        sm = getUniqueSigmaInstance(
                'test_35'
                , {
                    settings: sigmaSettings 
                    , graph: g
                    , renderers: [
                        {
                            type: 'canvas' 
                            , container: $('#' + containerId)[0]
                            , settings: rendererSettings
                        }
                    ]
                }
            );

        sm.graph
            .clear()
            .read(g)
            ;
        sm.refresh();

        s.show('start sortByNodesDegree: ');
        s.append_show('Input: ', sm.graph.nodes().map(function(node){return { id: node.id };}));
        sm.graph
            .sortByNodesDegree(1)
            ;
        s.append_show('Output: ', sm.graph.nodes().map(
                function(node){return { id: node.id, degree: node.degree };}
            )
        );

        s.append_show('');
        s.append_show('start getLayoutForest: ');
        var forest = sm.graph
            .getLayoutForest(sm.graph.nodes('n0'))
            ;
        s.append_show(
            'layout forest has ' + forest.length + ' trees'
            , forest
        );

        s.append_show('');
        s.append_show('start computeLeaves: ');
        computeLeaves(forest);
        s.append_show('tree width', forest.map(function(tree){return tree._wt_leaves;}));

        s.append_show('');
        s.append_show('start widthTravel: ');
        forest.forEach(function(tree){
            sm.graph
                .widthTravel(
                    tree
                    , {
                        onNode: function(node){
                            s.append_show(
                                'visit', node.id
                                , 'level: ' + node._wt_level
                                , 'leaves: ' + node._wt_leaves
                                , 'children: ' 
                                    + ( 
                                        node._wt_children
                                        ? node._wt_children.map(function(_node){
                                            return _node.id;
                                        }).join(', ')
                                        : ''
                                    )
                            );
                        }
                    }
                )
                ;
        });
        
        s.append_show('');
        s.append_show('start depthTravel: ');
        sm.graph
            .depthTravel(
                sm.graph.nodes('n0')
                , {
                    onNode: function(node){
                        s.append_show(
                            'visit', node.id
                            , 'level: ' + node._dt_level
                        );
                    }
                }
            )
            ;

    })();

</div>
<div class="test-panel">
</div>
</div>



以下验证`getCircleForest`等方法：

<div id="test_35_5" class="test">
<div class="test-console"></div>
<div class="test-container">
<div id="test_35_5_graph" class="test-graph"></div>

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_35_5');
        var g = getRandomGraph(5, 10, true);
        var containerId = 'test_35_5_graph';
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
            };
        var sigmaSettings = {
                // rescale settings 
                sideMargin: 0.1 

                // instance global settings
                , enableEdgeHovering: true
                , edgeHoverPrecision: 5
            };
        var sm;
        if((sm = isSigmaInstanceExisted('test_35_5'))){
            sm.kill();
        };
    
        sm = getUniqueSigmaInstance(
                'test_35_5'
                , {
                    settings: sigmaSettings 
                    , graph: g
                    , renderers: [
                        {
                            type: 'canvas' 
                            , container: $('#' + containerId)[0]
                            , settings: rendererSettings
                        }
                    ]
                }
            );

        sm.graph
            .clear()
            .read(g)
            ;
        sm.refresh();

        var circuits 
                = sm.graph
                    .getCircuits(sm.graph.nodes('n0'));

        s.show('start getCircuits: ');
        s.append_show(circuits.length + ' circuits.'); 
        circuits.forEach(function(circuit){
            s.append_show(
                circuit.map(
                    function(node){
                        return node.id;
                    }
                )
            );
        });

        var forest = sm.graph.getCircleForest();
        computeLeaves(forest);

        // 控制台中验证
        // console.log(forest);
    })();

</div>
<div class="test-panel">
</div>
</div>


图形化展示，验证从`图形`获得`遍历森林`的过程：

<div id="test_36" class="test">
<div class="test-container">
<div id="test_36_graph" class="test-graph">
<div class="test-graph-left"></div>
<div class="test-graph-right"></div>
</div>
<div class="test-console"></div>

    @[data-script="javascript editable"]
    (function(){

        var s = fly.createShow('#test_36');
        var g1 = getRandomGraph(10, 10, true);
        var g1 = networkGraph_FR;
        // var g1 = networkGraph_ForceAtlas2;
        var g2 = {
                nodes: g1.nodes.slice()
                , edges: g1.edges.slice()
            }
            , g3 = {
                nodes: g1.nodes.slice()
                , edges: [] 
            }
            ;
        var containerId = 'test_36_graph';
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
            };
        var sigmaSettings = {
                // rescale settings 
                sideMargin: 0.1 

                // instance global settings
                , enableEdgeHovering: true
                , edgeHoverPrecision: 5
            };

        var sm1, sm2;

        if((sm1 = isSigmaInstanceExisted('test_36_left'))
            && (sm2 = isSigmaInstanceExisted('test_36_right'))){
            sm1.kill();
            sm2.kill();
        };

        sm1 = getUniqueSigmaInstance(
                    'test_36_left'
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
                    'test_36_right'
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

        var forest = sm2.graph.getLayoutForest()
            , index = 0
            ;

        computeLeaves(forest);
        forest.forEach(function(tree){

            depthTravel(tree);

            function depthTravel(node){
                var children = node._wt_children
                    ;
                if(children.length > 0){
                    children.forEach(function(child){
                        depthTravel(child);
                        g3.edges.push({
                            id: 'e' + index++ 
                            , source: node.id
                            , target: child.id
                            , color: '#ccc'
                        });
                    }); 
                }
            }

        });

        s.show('遍历森林结果：');
        s.append_show(
            forest.length + '棵树'
            , forest.map(function(tree){return tree.id;})
            , '树宽', forest.map(function(tree){return tree._wt_leaves;})
        );

        sm2.graph
            .clear()
            .read(g3)
            ;
        sm2.refresh();

    })();

</div>
<div class="test-panel"></div>
</div>






### 4.2 矩阵布局


将节点按`方阵`排列。

todo:

1. `部分`节点按方阵排列
2. 对于`新加入`的节点按方阵排列

`矩阵布局`算法：

    @[data-script="javascript"]sigma.classes.graph.addMethod('layoutRect', function(){
        var nodes = this.nodesArray
            , r = Math.ceil(Math.sqrt(nodes.length))
            , i = 0
            , j = 0
            , step = nodes[0].size * 3 
            ;

        nodes.forEach(function(node){
            node.rect_x = j * step;
            node.rect_y = i * step; 
            j++;
            if(j >= r) {
                j = 0;
                i++;
            }
        });

        return this;
    });


<div id="test_39" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_39');
        var g = getRandomGraph(5, 10, true);
        var sm = getUniqueSigmaInstance('test_39');
        sm.graph
            .clear()
            .read(g)
            .layoutRect()
            ;
        s.show(sm.graph.nodes());

    })();

</div>
<div class="test-panel">
</div>
</div>


以下为演示区：

<div id="test_40" class="test">
<div class="test-container">
<div id="test_40_graph" class="test-graph">
<div class="test-graph-left"></div>
<div class="test-graph-right"></div>
</div>
<div class="test-console"></div>

    @[data-script="javascript editable"]
    (function(){

        var s = fly.createShow('#test_40');
        // var g1 = getRandomGraph(49, 100, true);
        var g1 = networkGraph_FR;
        // var g1 = networkGraph_ForceAtlas2;
        var g2 = {
                nodes: g1.nodes.slice()
                , edges: g1.edges.slice() 
            };
        var containerId = 'test_40_graph';
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
            };
        var sigmaSettings = {
                // rescale settings 
                sideMargin: 0.1 

                // instance global settings
                , enableEdgeHovering: true
                , edgeHoverPrecision: 5
            };

        var sm1, sm2;

        if((sm1 = isSigmaInstanceExisted('test_40_left'))
            && (sm2 = isSigmaInstanceExisted('test_40_right'))){
            sm1.kill();
            sm2.kill();
        };

        sm1 = getUniqueSigmaInstance(
                    'test_40_left'
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
                    'test_40_right'
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
        sm2.graph.layoutRect();
        sm2.refresh();

        setTimeout(function(){
            sigma.plugins.animate(
                sm2
                , {
                    x: 'rect_x'
                    , y: 'rect_y'
                }
                , {
                    duration: 1000
                    , onComplete: function(){
                        sm2.graph
                            .sortByNodesDegree(1)
                            .layoutRect()
                            ;
                        // s.show(sm2.graph.nodes());
                        setTimeout(function(){
                            sigma.plugins.animate(
                                sm2
                                , {
                                    x: 'rect_x'
                                    , y: 'rect_y'
                                }
                                , {
                                    duration: 1000
                                }
                            );
                        }, 1000);
                    }
                }
            );

        }, 500);

    })();

</div>
<div class="test-panel"></div>
</div>




### 4.2 层次布局

`相关概念`：

1. 选定一个`中心`节点，对图进行`广度遍历`，形成一片`遍历森林`（或者叫做`布局森林`）
2. `布局森林`中每个节点在以它为根的子树上拥有的`叶子节点数`(`node._wt_leaves`)，决定其在层次布局中的`宽度`；每个节点在遍历树中的`层级`(`node._wt_level`)，决定其在层次布局中的`层次`。
3. `布局森林`包含一到多棵`布局树`，对于每棵`布局树`，其`根节点`的`叶子节点数`为`leaves`，其节点的`最大层级`为`level`，在布局的时候将该布局树在尺寸为`leaves*level`的`网格`上进行`均衡`分布。 


`优化策略`：

1. `同层`兄弟节点有边，通过调整让`有边`的兄弟节点`靠近`
2. 两个`上层`节点同时与一个`下层`节点`有边`，通过调整让有边的兄弟节点`靠近`


`层次布局算法`(`无优化`)：

    @[data-script="javascript"]sigma.classes.graph.addMethod('layoutHierarchy', function(){
        var forest = this.getLayoutForest()
            , treeOffsetX = 0
            ;
        computeLeaves(forest);

        forest.forEach(function(tree){

            depthTravel(tree, treeOffsetX);
            treeOffsetX += tree._wt_leaves;

            function depthTravel(node, parentX){
                var children = node._wt_children
                    , leaves = node._wt_leaves
                    , level = node._wt_level - 1
                    , parentX = parentX || 0
                    , currentX = 0
                    ;

                node.hier_x = parentX + leaves / 2;
                node.hier_y = level;

                if(children.length > 0){
                    children.forEach(function(child){
                        depthTravel(child, parentX + currentX);
                        currentX += child._wt_leaves;
                    }); 
                }
            }

        });

        return this;
    });


以下示例展示树状`层次`布局算法：

<div id="test_50" class="test">
<div class="test-container">
<div id="test_50_graph" class="test-graph">
<div class="test-graph-left"></div>
<div class="test-graph-right"></div>
</div>
<div class="test-console"></div>

    @[data-script="javascript editable"]
    (function(){

        var s = fly.createShow('#test_50');
        var g1 = getRandomGraph(10, 18, true);
        // var g1 = networkGraph_FR;
        // var g1 = networkGraph_ForceAtlas2;
        var g2 = {
                nodes: g1.nodes.slice()
                , edges: g1.edges.slice()
            }
            , g3 = {
                nodes: g1.nodes.slice()
                , edges: [] 
            }
            ;
        var containerId = 'test_50_graph';
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
            };
        var sigmaSettings = {
                // rescale settings 
                sideMargin: 0.1 

                // instance global settings
                , enableEdgeHovering: true
                , edgeHoverPrecision: 5
            };

        var sm1, sm2;

        if((sm1 = isSigmaInstanceExisted('test_50_left'))
            && (sm2 = isSigmaInstanceExisted('test_50_right'))){
            sm1.kill();
            sm2.kill();
        };

        sm1 = getUniqueSigmaInstance(
                    'test_50_left'
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
                    'test_50_right'
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

        sm2.graph
            .layoutHierarchy()
            ;
        sm2.refresh();

        setTimeout(function(){
            sigma.plugins.animate(
                sm2
                , {
                    x: 'hier_x'
                    , y: 'hier_y'
                }
                , {
                    duration: 1000
                }
            );

        }, 500);

    })();

</div>
<div class="test-panel"></div>
</div>






### 4.3 块布局

todo


### 4.4 圆形布局


`圆形布局算法`：

从`中心点`root开始，对图进行`圆形`布局。

1. 从`中心点`开始，获取图的`圆形广度遍历森林`。可能包含`多棵`遍历树。
2. 针对每棵遍历树`tree`，计算中心点的`回路`，若`有回路`，`goto 3`，`无回路`，`goto 4`
3. 若`中心点`在一个`回路`中，则选取包含中心点的`最长回路`，将该回路的所有节点分布在`第一层`圆环上，然后将以每个节点为根的`布局树``按层次`排布在`外面`的`圆环`上
4. 若中心点`不在`任何回路中，则中心点放置在图形`中点`，然后将以中心点为根的`布局树`按`层次`排布在`外面`的`圆环`上



`参数`：

* `angleStep`，在圆环上排布节点时的角度增量，该值对于不同层次的圆环不能一致，一般与半径成反比


`圆形布局`算法如下：

    @[data-script="javascript"]sigma.classes.graph.addMethod(
        'layoutCircle'
        , function(){

        var forest = this.getCircleForest()
            , treeOffsetX = 0
            , PI = Math.PI
            , radius = 0.5 
            , radiusStep = radius 
            , initialAngleStep = 20 * PI / 180
            , angleStep = initialAngleStep
            , grid = []
            , gridSize = 33
            ;

        for(var i=0; i<gridSize; i++){
            grid.push([]);
            for(var j=0; j<gridSize; j++){
                grid[i].push(0);
            }
        }

        computeLeaves(forest);

        forest.forEach(function(tree){
            var circuit
                , angle = 0
                , maxLevel = 1
                ; 

            // if there is a circuit, layout it with a circle
            if(tree._circuit){
                circuit = tree._circuit;     
                angleStep = 2 * PI / circuit.length;
                circuit.forEach(function(node){
                    depthTravel(node, angle, radius);
                    angle += angleStep; 
                });
            }
            else {
                depthTravel(tree, angle, 0);
            }
            tree._wt_maxlevel = maxLevel;

            // depthTravel(tree, treeOffsetX);
            // treeOffsetX += tree._wt_leaves;

            function depthTravel(node, angle, radius){
                var children = node._wt_children
                    , leaves = node._wt_leaves
                    , level = node._wt_level
                    , len = children.length
                    , circleX
                    , circleY
                    , angleStep = initialAngleStep / level
                    , angleStart = angle - len * angleStep / 2
                    , _angle = angleStart + angleStep / 2
                    ;

                if(level > maxLevel) {
                    maxLevel = level;
                }

                circleX = radius * Math.cos(angle);
                circleY = radius * Math.sin(angle); 

                node.circle_x = circleX;
                node.circle_y = circleY;

                // console.log(radius, angle, circleX, circleY, angleStep);

                if(len > 0){
                    children.forEach(function(child){
                        depthTravel(child, _angle, radius + radiusStep);
                        _angle += angleStep;
                    }); 
                }
            }

        });

        console.log(forest);

        return this;
    });


使用`均衡布局`优化的`圆形布局`算法如下：

    @[data-script="javascript"]sigma.classes.graph.addMethod(
        'layoutCircle2'
        , function(){

        var forest = this.getCircleForest()
            , treeOffsetX = 0
            , PI = Math.PI
            , radius = 0.5 
            , radiusStep = radius 
            , initialAngleStep = 20 * PI / 180
            , angleStep = initialAngleStep
            , grid = []
            , gridSize = 33
            ;

        for(var i=0; i<gridSize; i++){
            grid.push([]);
            for(var j=0; j<gridSize; j++){
                grid[i].push(0);
            }
        }

        computeLeaves(forest);

        forest.forEach(function(tree){
            var circuit
                , angle = 0
                , maxLevel = 1
                ; 

            // if there is a circuit, layout it with a circle
            if(tree._circuit){
                circuit = tree._circuit;     
                angleStep = 2 * PI / circuit.length;
                circuit.forEach(function(node){
                    depthTravel(node, angle, radius);
                    angle += angleStep; 
                });
            }
            else {
                depthTravel(tree, angle, 0);
            }
            tree._wt_maxlevel = maxLevel;

            // depthTravel(tree, treeOffsetX);
            // treeOffsetX += tree._wt_leaves;

            function depthTravel(node, angle, radius){
                var children = node._wt_children
                    , leaves = node._wt_leaves
                    , level = node._wt_level
                    , len = children.length
                    , circleX
                    , circleY
                    , angleStep = initialAngleStep / level
                    , angleStart = angle - len * angleStep / 2
                    , _angle = angleStart + angleStep / 2
                    ;

                if(level > maxLevel) {
                    maxLevel = level;
                }

                circleX = radius * Math.cos(angle);
                circleY = radius * Math.sin(angle); 

                node.circle_x = circleX;
                node.circle_y = circleY;

                // console.log(radius, angle, circleX, circleY, angleStep);

                if(len > 0){
                    children.forEach(function(child){
                        depthTravel(child, _angle, radius + radiusStep);
                        _angle += angleStep;
                    }); 
                }
            }

        });


        var grid = new Grid(20, 20)
            , debug = 1
            , id = 2
            ;

        forest.sort(function(a, b){
            return b._wt_maxlevel - a._wt_maxlevel;
        });

        forest.forEach(function(tree){
            var spaceBlock = computeCircleTreeRect(tree)
                ;

            grid.placeBlock(tree.id, spaceBlock, debug);
        });

        var output = grid.grid.map(
                function(row){
                    return row.join('  ');
                }
            ).join('\n');

        console.log(output);

        forest.forEach(function(tree){
            var spaceBlock = grid.getBlockRect(tree.id) 
                , hasCircuit = tree._circuit ? 1 : 0
                , dx = ( 
                        spaceBlock.gridPos.x 
                        + ( hasCircuit ? spaceBlock.w / 2 : 0 ) 
                    ) * radius
                , dy = ( 
                        spaceBlock.gridPos.y 
                        + ( hasCircuit ? spaceBlock.h / 2 : 0 ) 
                    ) * radius
                ;

            // if there is a circuit
            if(tree._circuit){
                tree._circuit.forEach(function(node){
                    depthTravel(node);
                });
            }
            else {
                depthTravel(tree);
            }

            function depthTravel(node){
                var children = node._wt_children
                    , _leaves
                    , leaves = 0
                    ;

                if('n0' == node.id)
                    console.log(node.id);

                node.circle_x += dx;
                node.circle_y += dy;

                if(children.length > 0){
                    children.forEach(function(child){
                        depthTravel(child);
                    }); 
                }
            }
        });

        return this;
    });

以下示例展示`圆形`布局算法：

<div id="test_60" class="test">
<div class="test-container">
<div id="test_60_graph" class="test-graph">
<div class="test-graph-left"></div>
<div class="test-graph-right"></div>
</div>
<div class="test-console"></div>

    @[data-script="javascript editable"]
    (function(){

        var s = fly.createShow('#test_60');
        var g1 = getRandomGraph(10, 18, true);
        // var g1 = networkGraph_FR;
        // var g1 = networkGraph_ForceAtlas2;
        var g2 = {
                nodes: g1.nodes.slice()
                , edges: g1.edges.slice()
            }
            , g3 = {
                nodes: g1.nodes.slice()
                , edges: [] 
            }
            ;
        var containerId = 'test_60_graph';
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
            };
        var sigmaSettings = {
                // rescale settings 
                sideMargin: 0.1 

                // instance global settings
                , enableEdgeHovering: true
                , edgeHoverPrecision: 5
            };

        var sm1, sm2;

        if((sm1 = isSigmaInstanceExisted('test_60_left'))
            && (sm2 = isSigmaInstanceExisted('test_60_right'))){
            sm1.kill();
            sm2.kill();
        };

        sm1 = getUniqueSigmaInstance(
                    'test_60_left'
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
                    'test_60_right'
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

        sm2.graph
            .layoutCircle2()
            ;
        sm2.refresh();

        var useNoverlap = 0;
        setTimeout(function(){
            sigma.plugins.animate(
                sm2
                , {
                    x: 'circle_x'
                    , y: 'circle_y'
                }
                , {
                    duration: 1000
                    , onComplete: function(){
                        if(!useNoverlap) return;
                        var noverlapListener = sm2.configNoverlap({
                                nodeMargin: 0.1,
                                scaleNodes: 1.05,
                                gridSize: 20,
                                easing: 'quadraticInOut',
                                duration: 5000
                            });
                        sm2.startNoverlap();
                    }
                }
            );

        }, 500);

    })();

</div>
<div class="test-panel"></div>
</div>




## 五、增量布局





