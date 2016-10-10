# graph layout

> 网络拓扑图布局算法研究

## 综述

### 参考资料

`Github`：
1. <https://github.com/jacomyal/sigma.js>
2. <https://github.com/anvaka/VivaGraphJS>
3. <https://github.com/anvaka/ngraph.forcelayout>
4. <https://github.com/dhotson/springy>


`其他`：
1. ForceAtlas2, a Continuous Graph Layout Algorithm for Handy Network Visualization Designed for the Gephi Software; <http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0098679>
2. 一种改进的可视化布局算法IGVA; 徐红云,陈志锋
3. VERVIEW OF ALGORITHMS FOR GRAPH DRAWING; Pajntar B.; <http://ailab.ijs.si/dunja/SiKDD2006/Papers/Pajntar.pdf>
4. <http://cs.brown.edu/~rt/gdhandbook/>
5. <http://www.ogdf.net/doku.php>
6. 有向无环图的自动布局算法: <http://blog.csdn.net/xoyojank/article/details/8249719>


### 评价标准

评价标准：`性能`、`美观`并重

`美学标准`：

1. `边交叉`数量最小原则。
2. `直线边`原则。曲边会增加图的复杂度。
3. `邻接点`空间位置接近原则。这样可以减小边的长度。
4. `边平衡`布局原则。以相同节点为出发点的多条边应尽量以该节点为中心平衡布局。
5. 节点`层次`布局原则。引入层的概念，将节点尽量布局在水平或竖直的不同层上。

`前置布局`的依赖：受`直线`布局等前置布局的影响程度。 




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






## 快速启动


### getUniqueSigmaInstance

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


### getRandomGraph()

`getRandomGraph()`：获取随机生成的图形数据。

    @[data-script="javascript editable"]function getRandomGraph(numOfNodes, numOfEdges, fixSize){

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
                , size: fixSize || Math.random()
                , color: fly.randomColor() 
            });
        }

        for(i=0; i<E; i++){
            var edge = {
                id: 'e' + i
                , source: 'n' + (Math.random() * N | 0) 
                , target: 'n' + (Math.random() * N | 0) 
                , size: fixSize ? 1 : 1 * Math.random()
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


### getClusterGraph()

`getClusterGraph()`：获取簇图形数据。


    @[data-script="javascript editable"]function getClusterGraph(
        numOfNodes
        , options){

        var opt = options || {} 
            , graph = {nodes: [], edges: []}
            , nid = 1
            , eid = 1
            , xMax = opt.xMax || 300
            , yMax = opt.yMax || 200
            , nodeSize = opt.nodeSize || 1
            ;

        for(var i=0; i<numOfNodes; i++){
            graph.nodes.push({
                id: 'n' + nid
                , label: 'n' + nid++
                , x: xMax * Math.random() 
                , y: yMax * Math.random() 
                , size: nodeSize
                , color: fly.randomColor()
            }); 
        }

        for(i=1; i<numOfNodes; i++){
            graph.edges.push({
                id: 'e' + eid++
                , source: 'n1'
                , target: graph.nodes[i].id
                , color: '#ccc'
                , hoverColor: '#f00'
            });
        }

        return graph;
    }

    // console.log(getClusterGraph(30, {xMax: 300, yMax: 200, nodeSize: 10}));




### getLineGraph

`getLineGraph()`：获取直线图数据。

    @[data-script="javascript editable"]function getLineGraph(
        numOfNodes
        , numOfEdges
        , options){

        var opt = options || {} 
            , graph = {nodes: [], edges: []}
            , nid = 1
            , eid = 1
            , xOffset = opt.xOffset || 0
            , yOffset = opt.yOffset || 0
            , xMax = opt.xMax || 300
            , yMax = opt.yMax || 200
            , nodeSize = opt.nodeSize || 1
            , i
            ;

        for(var i=0; i<numOfNodes; i++){
            graph.nodes.push({
                id: 'n' + nid
                , label: 'n' + nid++
                , x: opt.vertical ? xOffset : xMax * Math.random() 
                , y: opt.vertical ? yMax * Math.random() : yOffset
                , size: nodeSize
                , color: fly.randomColor()
            }); 
        }

        for(i=0; i<numOfEdges; i++){
            var edge = {
                id: 'e' + i
                , source: graph.nodes[Math.random() * numOfNodes | 0].id 
                , target: graph.nodes[Math.random() * numOfNodes | 0].id 
                , size: opt.fixSize ? 1 : 1 * Math.random()
                // , type: 'curve'
                // , color: fly.randomColor() 
                , color: '#ccc'
                , hover_color: '#f00'
            };
            
            if(edgeExists(edge)){
                continue;
            }
            else {
                graph.edges.push(edge);
            }
            
        }

        function edgeExists(edge){
            for(var i=0; i<graph.edges.length; i++){
                if(graph.edges[i].source == edge.source
                    && graph.edges[i].target == edge.target) {
                    return true;
                }
            }
            return false;
        }

        return graph;
    }

    // console.log(getLineGraph(10, 10, {yOffset: 100, nodeSize: 10}));






## 常用方法及验证


### 常用方法


#### sortByNodesDegree

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





#### getNodeById

`getNodeById()`：根据`节点id`获取节点`对象`。

    @[data-script="javascript"]sigma.utils.getNodeById
        = function(nodes, id){
            if(!nodes) {
                return null;
            }
            for(var i=0; i<nodes.length; i++){
                if(nodes[i].id == id){
                    return nodes[i];
                }
            }
            return null;
        }


#### widthTravel

`widthTravel(root)`：从root节点开始对图进行广度遍历，遍历过程中`忽略``父节点`和`兄弟`节点。

`广度`遍历过程可以形成`树形`结构。如下图所示：

@[style="text-align:center"]<img src="./img/graph-width-travel.png" width="900">

    @[data-script="javascript"]sigma.utils.widthTravel
        = function(nodes, edges, root, callbacks, excludes) {

        if(!nodes || !nodes.length){
            return;
        }
    
        var cbs = callbacks || {}
            , edges = edges || []
            , queue = []
            , parentAndSiblingNodes = excludes || {}
            , root = root || nodes[0]
            , node = root
            , children
            , maxLevel = 0
            ;

        node._wt_level = 1;
        maxLevel = Math.max( node._wt_level, maxLevel );
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
        root._wt_maxlevel = maxLevel;

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
                        child = sigma.utils.getNodeById(nodes, childId);
                        child._wt_level = node._wt_level + 1;
                        maxLevel = Math.max( child._wt_level, maxLevel );
                        children.push(child);
                    }
                }
            });
            return children;
        }

    };

    sigma.classes.graph.addMethod(
        'widthTravel'
        , function(root, callbacks, excludes){

        var me = this
            , nodes = me.nodesArray
            , edges = me.edgesArray
            , root = root || nodes[0]
            , cbs = callbacks || {}
            ;

        sigma.utils.widthTravel(
            nodes     
            , edges
            , root
            , cbs
            , excludes
        );

        return me;

    });




#### getSubGraph

`getSubGraph()`：根据指定`过滤`条件获取`子图`（subgraph)。

> @param {object} [options]

    {
        filter: function( node ) { ... }
        , edgeFilter: function( edge ) { ... }

        // 复杂层次布局的虚拟节点和虚拟边
        , dummyRoot: ...
        , dummyEdges: ...
    }

以下为代码实现：

    @[data-script="javascript"]sigma.classes.graph.addMethod(
        'getSubGraph'
        , function(options){
        var opt = options || {}
            , me = this
            , filter = opt.filter
            , edgeFilter = opt.edgeFilter
            , dummyRoot = opt.dummyRoot || null
            , dummyEdges = opt.dummyEdges || []
            , nodes = me.nodesArray.slice( 0 )
            , edges = me.edgesArray.slice( 0 )
            , _node_ids
            ;

        if('function' == typeof filter){
            nodes = [];
            edges = [];
            me.nodesArray.forEach(function(node){
                if(filter(node)){
                    nodes.push(node);
                }
            });
            
            _node_ids = nodes.map(function(node){return node.id;});
            me.edgesArray.forEach(function(edge){
                if(_node_ids.indexOf(edge.source) >= 0 
                    && _node_ids.indexOf(edge.target) >= 0){
                    edges.push(edge);
                }
            });
        }

        if('function' == typeof edgeFilter){
            for(var i=edges.length-1; i>=0; i--){
                if(!edgeFilter(edges[i])){
                    edges.splice(i, 1);
                }
            }
        }

        if ( dummyRoot && dummyEdges.length ) {
            nodes.push( dummyRoot );
            edges = edges.concat( dummyEdges );
        }

        return {
            nodes: nodes
            , edges: edges
        };
    });





#### getLayoutForest


> @param {object} [options]

    {
        root: ...
        , dummyRoot: ...
        , makeMaxDegreeNodeRoot: 0
        , excludes: ...
        , subGraph: ...
    }


`getLayoutForest()`：生成布局森林。对图进行`广度`遍历，获得其`遍历树`。

    @[data-script="javascript"]sigma.utils.getLayoutForest
        = function(nodes, edges, options){

        var opt = options || {}
            , nodesVisited = {}
            , forest = []
            , node = opt.dummyRoot 
                || opt.root 
                || ( 
                    opt.makeMaxDegreeNodeRoot
                        ? sigma.utils.getMaxDegreeNode( nodes.slice( 0 ), edges.slice( 0 ) )
                        : nodes[0]
                )
            , excludes = opt.excludes
            ;

        do {
            sigma.utils.widthTravel(
                nodes
                , edges
                , node
                , {
                    onNode: function(node){
                        nodesVisited[node.id] = true;
                        if ( 'function' == typeof opt.childrenSort ) {
                            node._wt_children.sort( opt.childrenSort );
                        }
                    }
                } 
                , excludes
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
    };


    sigma.classes.graph.addMethod(
        'getLayoutForest'
        , function(options){
        var me = this
            , opt = options || {}
            , g = opt.subGraph || me.getSubGraph(options)
            ;

        return sigma.utils.getLayoutForest(
            g.nodes
            , g.edges
            , options
        ); 
    });




#### computeLeaves

`computeLeaves()`：计算布局`森林`每个节点包含的`叶子`节点数。

    @[data-script="javascript editable"]sigma.utils.computeLeaves
        = function(forest){
        
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




#### computeHeight

`computeHeight()`：计算布局`森林`中每个节点为根的`子树`的`高度`。

    @[data-script="javascript"]sigma.utils.computeHeight 
        = function( forest, options ) {
        var opt = options || {};

        forest.forEach( function( tree ) {
            _depthTravel( tree );
        } );

        function _depthTravel( node ) {
            var subTreeHeight = 0
                , children = node._wt_children
                ;

            children.forEach( function( child ) {
                subTreeHeight = Math.max( subTreeHeight, _depthTravel( child ) );
            } );

            node._wt_height = subTreeHeight + 1;
            if ( 'function' == typeof opt.onNode ) {
                opt.onNode( node );
            }

            return node._wt_height;
        }

    };


<div id="test_computeHeight" class="test">
<div class="test-container">
<div id="test_computeHeight_graph" class="test-graph">
</div>
<div class="test-console"></div>

    @[data-script="javascript editable"]
    (function(){

        var s = fly.createShow('#test_computeHeight');
        // var g1 = getRandomGraph(10, 10, 10);
        // var g1 = networkGraph_complex_hier_160817; 
        // var g1 = networkGraph_complex_hier_160816;
        var g1 = networkGraph_complex_hier_160820; 
        // var g1 = networkGraph_edges_between_the_same_level_nodes_3;
        // var g1 = networkGraph_edges_between_the_same_level_nodes;
        // var g1 = networkGraph_edges_between_the_same_level_nodes_2;
        // var g1 = networkGraph_person_event_event_person_0729;
        // var g1 = networkGraph_person_event_event_person_0801;
        // var g1 = networkGraph_triangle_0801_2;
        var containerId = 'test_computeHeight_graph';
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
                sideMargin: 5 

                // instance global settings
                , enableEdgeHovering: true
                , edgeHoverPrecision: 5
                , autoRescale: 0
            };

        var sm1;

        if((sm1 = isSigmaInstanceExisted('test_computeHeight'))){
            sm1.kill();
        };

        sm1 = getUniqueSigmaInstance(
                    'test_computeHeight'
                    , {
                        settings: sigmaSettings 
                        , graph: g1
                        , renderers: [
                            {
                                type: 'canvas' 
                                , container: $('#' + containerId)[0]
                                , settings: rendererSettings
                            }
                        ]
                    }
                ); 

        sm1
            .alignCenter({rescaleToViewport: 1})
            .refresh()
            ;

        sigmaEnableNodeDrag( sm1 );

        var forest = sm1.graph.getLayoutForest()
            ;

        s.show('show nodes\' height: \n');
        sigma.utils.computeHeight(
            forest
            , {
                onNode: function( node ) {
                    s.append_show( node.id + ': ' + node._wt_height ); 
                }
            } 
        );

    })();

</div>
<div class="test-panel"></div>
</div>








#### depthTravel

`depthTravel()`：从`root`节点开始对图进行深度遍历，遍历过程忽略已经访问过的节点。

    @[data-script="javascript"]sigma.utils.depthTravel
        = function(nodes, edges, root, callbacks) {

        if(!nodes || !nodes.length){
            return;
        }
    
        var cbs = callbacks || {}
            , visitedNodes = {}
            , node = root || nodes[0]
            , children
            ;

        edges = edges || [];

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
                        child = sigma.utils.getNodeById(nodes, childId);
                        child._dt_level = node._dt_level + 1;
                        children.push(child);
                    }
                }
            });
            return children;
        }

    };

    @[data-script="javascript"]sigma.classes.graph.addMethod(
        'depthTravel'
        , function(root, callbacks){

        var me = this 
            , nodes = me.nodesArray
            , edges = me.edgesArray
            ;

        sigma.utils.depthTravel(
            nodes
            , edges
            , root 
            , callbacks
        );

        return me;

    });




#### getCircuits

`getCircuits()`：从root节点开始，寻找所有回路。`方式`为对图进行`深度`遍历，当`root`的一个`非邻接`节点有一条到root的边，则构成一条`回路`。

`注意`：

1. 这个算法需要找出从root开始的`所有`回路，所以算法中使用的深度遍历，`不完全``等同于``depthTravel`，一个节点只访问一次。该算法中，`节点`可能被`多次`访问。
2. 需要`排除`这种回路： `n1` -> `n2` -> `n1`


代码如下：

    @[data-script="javascript"]sigma.utils.getCircuits
        = function(nodes, edges, root) {

        var nLen = nodes.length || 1
            , eLen = edges.length || 1
            ;

        if(eLen <= 50 && eLen / nLen <= 1.25){
            return sigma.utils.getCircuitsSlow(nodes, edges, root); 
        }
        else { 
            return sigma.utils.getCircuitsFast(nodes, edges, root); 
        }
        
    };

    sigma.classes.graph.addMethod(
        'getCircuits'
        , function(root){

        var me = this
            , nodes = me.nodesArray
            , edges = me.edgesArray
            , root = root || nodes[0]
            ;

        return sigma.utils.getCircuits(nodes, edges, root);

    });


提供了两个算法，`getCircuitsSlow`与`getCircuitsFast`，前者速度`快`，但`不一定`找出`所有`回路；后者速度`慢`，能找出`所有`回路。`getCircuits`方法根据`边的数目`来决定使用哪个算法。


    @[data-script="javascript"]sigma.utils.getCircuitsSlow
        = function(nodes, edges, root) {

        if(!nodes || !nodes.length){
            return;
        }

        var me = this
            , root = root || nodes[0]
            , children
            , path = []
            , circuits = []
            , isStop = 0
            ;

        edges = edges || [];

        root._dt_level = 1;
        _depthTravel(root);
        return circuits;

        function _depthTravel(node){
            if(isStop){
                return;
            }

            if(!isNodeInPath(node)){
                path.push(node);

                var children = getChildren(node); 
                if(children.length > 0){
                    children.forEach(function(child){
                        _depthTravel(child);
                    });
                }

                path.pop(node);
            }
            else if(node.id == root.id
                && path.length > 2){
                circuits.push(path.slice());  
                if(circuits.length >= 20){
                    isStop = 1;
                }
            }
        }

        function isNodeInPath(node){
            return ( 
                path.map(function(_node){return _node.id;})
                .indexOf(node.id)
                != -1
            );
        }

        function getChildren(node){
            var id = node.id
                , children = []
                , childId
                , child
                ;

            if(node._tmp_children){
                return node._tmp_children; 
            }

            edges.forEach(function(edge){
                if(
                    edge.source == id
                    || edge.target == id
                  ){
                    childId = edge.source;
                    if(childId == id){
                        childId = edge.target;
                    }

                    child = sigma.utils.getNodeById(nodes, childId);
                    children.push(child);
                }
            });

            return (node._tmp_children = children);
        }

    };



    @[data-script="javascript"]sigma.utils.getCircuitsFast
        = function(nodes, edges, root) {

        if(!nodes || !nodes.length){
            return;
        }

        var me = this
            , root = root || nodes[0]
            , visitedNodes = {}
            , children
            , path = []
            , circuits = []
            ;

        edges = edges || [];

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

                    if(childId == root.id && path.length > 2){
                        circuits.push(path.slice());  
                    }                        

                    if(!visitedNodes[childId]){
                        child = sigma.utils.getNodeById(nodes, childId);
                        children.push(child);
                    }

                }
            });
            return children;
        }

    };




#### getMaxDegreeNode


`getMaxDegreeNode()`：获得图形最大度数节点。

    @[data-script="javascript"]sigma.utils.getMaxDegreeNode
        = function(nodes, edges){

        if(!nodes || !edges) {
            return null;
        }

        var degreeArr = [] 
            , degree
            , node, edge, i, j
            ;
        
        for(i=0; i<nodes.length; i++){
            node = nodes[i];
            degree = {
                id: node.id
                , data: 0
            };
            degreeArr.push(degree);

            for(j=0; j<edges.length; j++){
                edge = edges[j]; 
                if(
                    edge.source  == node.id
                    || edge.target  == node.id
                ){
                    degree.data++;
                }
            }
        }
        degreeArr.sort(function(a, b){
            return b.data - a.data;
        });

        return degreeArr.length
            ? sigma.utils.getNodeById(nodes, degreeArr[0].id)
            : null;

    };

    @[data-script="javascript"]sigma.classes.graph.addMethod(
        'getMaxDegreeNode'
        , function( options ){

        var me = this
            , opt = options || {}
            , g = opt.subGraph || me.getSubGraph( opt )
            ;
        
        return sigma.utils.getMaxDegreeNode( g.nodes, g.edges );        
    });





#### getCircleForest

`getCircleForest()`：获得`环形`布局`森林`。

> @param {object} [options]

    {
        root: null
        , makeMaxDegreeNodeRoot: 0 
        , useComplicatedLoop: 0
    }


以下是代码实现：

    @[data-script="javascript"]sigma.utils.getCircleForest
        = function(nodes, edges, options){

        var opt = options || {} 
            , circuits
            , circuit
            , tree = opt.root 
                || ( opt.makeMaxDegreeNodeRoot 
                    ? sigma.utils.getMaxDegreeNode(nodes, edges) : null )
                || nodes[0]
            , excludes
            , nodesVisited = {}
            , forest = []
            ;
    
        edges = edges || [];

        do {
            if ( opt.useComplicatedLoop ) {
                // todo: performance
                circuits = sigma.utils.getComplicatedLoops( nodes, edges, { root: tree } )
                            .complicated;
            }
            else {
                circuits = sigma.utils.getCircuits(nodes, edges, tree);
            }

            excludes = {};

            if(circuits.length > 0){
                circuits.sort(function(a, b){
                    return b.length - a.length;
                });

                // the longest circuit
                tree._circuit = circuit = circuits[0]; 

                circuit.forEach(function(_node){
                    excludes[_node.id] = 1;
                });

                circuit.forEach(function(_node){
                    sigma.utils.widthTravel(
                        nodes
                        , edges
                        , _node
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
                sigma.utils.widthTravel(
                    nodes
                    , edges
                    , tree
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

    };

    @[data-script="javascript"]sigma.classes.graph.addMethod(
        'getCircleForest'
        , function(options){

        var me = this
            , g = me.getSubGraph(options)
            ;

        return sigma.utils.getCircleForest(
            g.nodes
            , g.edges
            , options
        );
    });




#### computeCircleTreeRect

`computeCircleTreeRect()`：获取`环形布局树`的`空间`占用，用`矩形`表示。

    @[data-script="javascript"]sigma.utils.computeCircleTreeRect
        = function(tree){

        var maxLevel = tree._wt_maxlevel
            , hasCircuit = tree._circuit ? 1 : 0
            , width = hasCircuit ? 2 * maxLevel : maxLevel
            ;

        if(maxLevel){
            return {
                x: 0
                , y: 0 
                , w: width 
                , h: width 
            };
        }

        return null;
    }




#### computeHierarchyTreeRect

`computeHierarchyTreeRect()`：获取`层次布局树`的`空间`占用，用`矩形`表示。

    @[data-script="javascript"]sigma.utils.computeHierarchyTreeRect
        = function(tree, offsetX){

        var maxLevel = tree._wt_maxlevel
            , leaves = tree._wt_leaves
            , height = maxLevel || 1
            , width = leaves || 1
            ;

        if(maxLevel){
            return {
                x: offsetX || 0
                , y: 0 
                , w: width 
                , h: height 
            };
        }

        return null;
    }




#### getNodesRect 

`getNodesRect()`：获取`节点集合`的`空间`占用，用`矩形`表示。

    @[data-script="javascript"]sigma.utils.getNodesRect
        = function(nodes, options){

        var opt = options || {}
            , xMin = Infinity
            , yMin = Infinity
            , xMax = -Infinity
            , yMax = -Infinity
            , readPrefix = opt.readPrefix || ''
            , ignoreNodeSize = typeof opt.ignoreNodeSize == 'undefined'
                ? true : opt.ignoreNodeSize
            , node, i, x, y, size
            ;

        i = nodes.length - 1;
        while(i >= 0){
            node = nodes[i];
            x = node[readPrefix + 'x'] || 0;
            y = node[readPrefix + 'y'] || 0;
            size = ignoreNodeSize 
                ? 0 : node[readPrefix + 'size'] || node['size'] || 0.2;
            if(x - size < xMin){
                xMin = x - size;
            }
            if(x + size > xMax){
                xMax = x + size;
            }
            if(y - size < yMin){
                yMin = y - size;
            }
            if(y + size > yMax){
                yMax = y + size;
            }
            i--;
        }

        if(nodes.length == 0){
            xMin = 0;
            yMin = 0;
            xMax = 0;
            yMax = 0;
        }

        return {
            x: xMin
            , y: yMin
            , w: xMax - xMin
            , h: yMax - yMin
        };
    }



<div id="test_34" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_34');
        var g1 = getRandomGraph(1, 5, 8);
        var g2 = getRandomGraph(10, 5, 8);
        var g3 = createRawGraphData(1, 5);
        s.show(1, sigma.utils.getNodesRect(g1.nodes));
        s.append_show(2, sigma.utils.getNodesRect(g2.nodes));
        s.append_show(3, sigma.utils.getNodesRect(g3.nodes));

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>


#### normailizeSophonNodes 

`normalizeSophonNodes()`：标准化节点。

    @[data-script="javascript"]sigma.utils.normalizeSophonNodes
        = function(nodes, options){

        if(!nodes){
            return null;
        }

        var opt = options || {} 
            , center = opt.center || {x:0, y:0}
            // , size = opt.size || 10
            , prefix = opt.readPrefix || ''
            , rect = sigma.utils.getNodesRect(nodes, opt) 
            , nodesCenter = {
                x: rect.x + rect.w / 2
                , y: rect.y + rect.h / 2
            }
            , dx = center.x - nodesCenter.x
            , dy = center.y - nodesCenter.y
            ;

        nodes.forEach(function(node){
            node[prefix + 'x'] += dx;
            node[prefix + 'y'] += dy;
            // node.size = size;
        });

        return nodes;
    }

    sigma.prototype.normalizeSophonNodes
        = function(options){

        var opt = options || {}
            , me = this
            , filter = opt.filter
            , g = me.graph.getSubGraph(opt)
            , oldSubCenter
            , oldRect
            ;

        if('function' == typeof filter && !opt.center){
            oldRect = sigma.utils.getNodesRect(g.nodes);
            oldSubCenter = {
                x: oldRect.x + oldRect.w / 2
                , y: oldRect.y + oldRect.h / 2
            };
            opt.center = oldSubCenter;
        }

        sigma.utils.normalizeSophonNodes(
            g.nodes
            , opt
        );

        return me;
    };





#### alignCenter

`alignCenter()`：对图形进行`居中全景`布局。

    @[data-script="javascript editable"]sigma.prototype.alignCenter = function(options){
        var opt = options || {} 
            , me = this
            , rect = sigma.utils.getNodesRect(me.graph.nodes(), opt) 
            , cameras = me.cameras
            , camera
            , renderer
            , readPrefix = opt.readPrefix || ''
            , writePrefix = opt.writePrefix || ''
            , ratio
            , height
            , width
            , i
            ;

        for(i in cameras){
            camera = cameras[i];
            renderer = me.renderersPerCamera[camera.id][0];
            ratio = camera.ratio;
            height = renderer.height;
            width = renderer.width;

            if(opt.wholeViewWhenNeed && !opt.wholeView){
                if(rect.w > width || rect.h > height){
                    opt.wholeView = 1;
                }
            }

            // wholeview mode by setting an appropriate camera ratio
            if(opt.wholeView){
                ratio = Math.max(rect.w / width, rect.h / height) * 1.3;
            }
            // another wholeview mode by rescaling coordinates 
            else if(opt.rescaleToViewport){
                sigma.middlewares.rescale.call(
                    me
                    , readPrefix
                    , writePrefix
                    , {
                        width: width
                        , height: height
                        , autoRescale: ['nodePosition']
                        , scalingMode: 'inside'
                        , rescaleIgnoreSize: 1
                        , sideMargin: Math.min(rect.h, rect.w) * 0.2 
                    }
                );
                ratio = 1;
            }

            camera.goTo({
                x: rect.x + rect.w / 2
                , y: rect.y + rect.h / 2
                // prevents `ratio = 0`
                , ratio: ratio || 1
            });
        }

        return me;
    }






#### Grid类


`Grid工具类`：均衡布局所使用的`空间管理`工具类。详细信息和实现可查看<a href="./layout-grid.md.preview.html">layout-grid</a>


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

            , getMinRect: function(){
                var me = this
                    , rect = null
                    , grid = me.grid
                    , i, j
                    , wMax = 0
                    , hMax = 0
                    ;

                for(i=0; i<me.ySize; i++){
                    for(j=0; j<me.xSize; j++){
                        if(grid[i][j]){
                            wMax = Math.max(j + 1, wMax);
                            hMax = Math.max(i + 1, hMax);
                        }
                    }
                } 

                if(wMax > 0 && hMax > 0){
                    rect = {
                        x: 0
                        , y: 0
                        , w: wMax
                        , h: hMax
                    }
                }

                return rect;
            }

            , getMaxSpareRect: function(minRect){
                var me = this
                    , grid = me.grid
                    , minRect = minRect || me.getMinRect()
                    , rect
                    , iStart, jStart
                    , i, j
                    , expandDirection
                    , xRatio, yRatio
                    ; 

                if(!minRect){
                    rect = {
                        x: 0 
                        , y: 0
                        , w: me.xSize
                        , h: me.ySize
                    };
                } 
                else {
                    jStart = minRect.x + minRect.w - 1;
                    iStart = minRect.y + minRect.h - 1;

                    xRatio = minRect.w / me.xSize;
                    yRatio = minRect.h / me.ySize;

                    if(xRatio < yRatio){
                        expandDirection = 'X';
                    }
                    else if(yRatio < xRatio){
                        expandDirection = 'Y';
                    }
                    else {
                        expandDirection = 'XY';
                    }

                    if(grid[iStart][jStart]){
                        if(iStart < me.ySize - 1 && expandDirection != 'X'){
                            iStart++;
                        }

                        if(jStart < me.xSize - 1 && expandDirection != 'Y'){
                            jStart++;
                        }

                        if(iStart == me.ySize - 1 && jStart == me.xSize - 1) {
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

                    if(rect !== null){
                        areas.sort(function(a, b){
                            return b.area - a.area;
                        });
                        rect = areas[0];
                    }
                }

                return rect;
            }

            , placeBlock: function(id, block, debug){
                var me = this
                    , minRect = me.getMinRect()
                    , maxSpareRect
                    , pos = {x: 0, y: 0}
                    ;

                if(!minRect){
                    pos.x = 0;
                    pos.y = 0;
                }
                else {
                    maxSpareRect = me.getMaxSpareRect(minRect);
                    if(!maxSpareRect) {
                        pos.x = minRect.x + minRect.w;
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





#### layoutTreesByGrid

对`布局森林`中的树进行`网格`布局，使之`平均`分布。 


    @[data-script="javascript"]sigma.utils.layoutTreesByGrid
        = function(forest, options){

        var opt = options || {}
            , spaceGrid = opt.spaceGrid || {xSize: 40, ySize: 40}
            , grid = new Grid(spaceGrid.xSize, spaceGrid.ySize)
            , unit = opt.optimalDistance || 100 
            , prefix = opt.readPrefix || opt.writePrefix || ''
            , debug = opt.debug || 0
            ;


        forest.forEach(function(tree){
            _computeTreeRect(tree);
        });

        // sort by tree's area in decreasing order
        forest.sort(function(a, b){
            return b._tmp_rect.w * b._tmp_rect.h
                - a._tmp_rect.w * a._tmp_rect.h
                ;
        });

        forest.forEach(function(tree){
            var spaceBlock = _normalizeTreeRect(tree, unit) 
                ;

            grid.placeBlock(tree.id, spaceBlock, debug);
        });

        forest.forEach(function(tree){
            var spaceBlock = grid.getBlockRect(tree.id) 
                , hasCircuit = tree._circuit ? 1 : 0
                , dx = spaceBlock.gridPos.x * unit - spaceBlock.x
                , dy = spaceBlock.gridPos.y * unit - spaceBlock.y
                ;

            debug && console.log(tree.id, spaceBlock);

            // clear temporary attribures
            if(tree._tmp_rect){
                delete tree._tmp_rect;
            }

            // if there is a circuit
            if(tree._circuit){
                tree._circuit.forEach(function(node){
                    __depthTravel(node);
                });
                delete tree._circuit;
            }
            else {
                __depthTravel(tree);
            }

            function __depthTravel(node){
                var children = node._wt_children
                    ;

                node[prefix + 'x'] += dx;
                node[prefix + 'y'] += dy;

                if(children.length > 0){
                    children.forEach(function(child){
                        __depthTravel(child);
                    }); 
                    // delete node._wt_children;
                }
            }
        });


        function _computeTreeRect(tree){
            var nodes = []
                , circuit = tree._circuit
                , rect
                ; 

            if(circuit){
                circuit.forEach(function(node){
                    __depthTravel(node);
                });
            }
            else {
                __depthTravel(tree);
            }

            rect = sigma.utils.getNodesRect(
                nodes
                , {
                    readPrefix: prefix
                    , ignoreNodeSize: 0
                }
            );
            tree._tmp_rect = rect; 
            tree._node_count = nodes.length;
            nodes.length = 0;
            return rect;

            function __depthTravel(node){
                var children = node._wt_children
                    , len = children.length
                    ;

                if ( !node._isdummy ) {
                    nodes.push(node);
                }
                if(len > 0){
                    children.forEach(function(child){
                        __depthTravel(child); 
                    });
                }
            }
        }

        function _normalizeTreeRect(tree, unit){
            var rect = tree._tmp_rect
                , spaceBlock = {}
                , extendRatio = 1
                ;

            spaceBlock.x = rect.x;
            spaceBlock.y = rect.y;
            if(tree._node_count > 1){
                // extendRatio = 1.2;
                extendRatio = 1;
            }

            // `extendRatio` is for reserved space for node-collision on boundaris
            spaceBlock.w = Math.ceil(rect.w * extendRatio / unit);
            spaceBlock.h = Math.ceil(rect.h * extendRatio / unit);

            if(spaceBlock.w * unit - rect.w < unit
                && tree._node_count > 1){
                spaceBlock.w++;
            }
            if(spaceBlock.h * unit - rect.h < unit
                && tree._node_count > 1){
                spaceBlock.h++;
            }

            return spaceBlock;
        }


    };





#### prepareAnimation

`prepareAnimation(options)`：完成`动画`开始执行前的`准备`工作，比如坐标的`标准化`等。

    @[data-script="javascript"]sigma.prototype.prepareAnimation
        = function(options){
        var me = this
            , opt = options || {}
            , prefix = opt.readPrefix || ''
            ;

        me.graph.nodes().forEach(function(node){
            if('undefined' == typeof node[prefix + 'x']){
                node[prefix + 'x'] = node.x;
                node[prefix + 'y'] = node.y;
            }
        });

        return me;
    };



#### initializeLayout

`initializeLayout(options)`: 初始化布局，执行一些`清理`工作。

    @[data-script="javascript"]sigma.prototype.initializeLayout
        = function( options ) {
        var me = this
            , opt = options || {}
            , tmpFields = [
                '_wt_children'
                , '_wt_leaves'
                , '_wt_maxlevel'
                , '_wt_height'
                , '_wt_level'
                , '_wt_dy'

                , 'hier_x'
                , 'hier_y'
                , 'yfh_x'
                , 'yfh_y'
                , 'circle_x'
                , 'circle_y'
                , 'grid_x'
                , 'grid_y'
                , 'resize_x'
                , 'resize_y'

                , 'fixed'
                , '_tmp_children'
                , '_loops'
                , '_circuit'
            ]
            ;

        me.graph.nodes().forEach( function( node ) {
            tmpFields.forEach ( function( field ) {
                delete node[ field ];
            } );
        } );

        return me;
    };







#### resizeOccupiedSpace


`resizeOccupiedSpace( nodes, ratio )`：调整图的空间占用大小。

    @[data-script="javascript"]sigma.utils.resizeOccupiedSpace 
        = function( nodes, ratio, options ) {
        var opt = options || {}
            , nodes = nodes || []
            , ratio = ratio || 1
            , center = opt.center
            , readPrefix = opt.readPrefix || ''
            , writePrefix = opt.writePrefix || ''
            , rect
            ;

        if ( nodes.length < 2 || ratio == 1 ) {
            return;
        }

        if ( !center ) {
            rect = sigma.utils.getNodesRect( nodes, opt );
            center = {
                x: rect.x + rect.w / 2
                , y: rect.y + rect.h / 2
            };
        }

        nodes.forEach( function( node ) {
            node[ writePrefix + 'x' ] = ratio * node[ readPrefix + 'x' ]
                + ( 1 - ratio ) * center.x;
            node[ writePrefix + 'y' ] = ratio * node[ readPrefix + 'y' ]
                + ( 1 - ratio ) * center.y;
        } );
    };

    sigma.prototype.resizeOccupiedSpace = function( ratio, options ) {
        var me = this
            , g = me.graph.getSubGraph( options )
            ;

        sigma.utils.resizeOccupiedSpace( g.nodes, ratio, options );
        return me;
    };



<div id="test_resizeOccupiedSpace" class="test">
<div class="test-container">
<div id="test_resizeOccupiedSpace_graph" class="test-graph">
</div>

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_resizeOccupiedSpace');
        var ratio = 20;
        var center = { x: 1.5, y: 1.5 };
        var center = null;
        var g1 = getRandomGraph( 15, 10, 8 ); 
        // var g1 = getLineGraph( 15, 10, {nodeSize: 8});
        var containerId = 'test_resizeOccupiedSpace_graph';
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

        var rect;
        var sm;

        g1.nodes.forEach(function(node){
            if ( Math.random() < 0.3 ) {
                node.color = '#aaa';
            }
            else {
                node.selected = true;
            }
        });

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

        sm.refresh()
            ;

        s.show( 'before resize: ' );

        rect = sigma.utils.getNodesRect( sm.graph.nodes() );
        s.append_show( 'rect', transformRect( rect ) );
        s.append_show( sm.graph.nodes().map( function( node ){
            return node.x.toPrecision( 3 ) + '_' 
                + node.y.toPrecision( 3 )
                ;
        } ) );

        sm.resizeOccupiedSpace( 
                ratio
                , { 
                    writePrefix: 'resize_' 
                    , filter: function( node ) { return node.selected; }
                    , center: center
                } 
            )
            .prepareAnimation( { readPrefix: 'resize_' } )
            ;

        setTimeout( function() {
            sigma.plugins.animate(
                sm
                , {
                    x: 'resize_x'
                    , y: 'resize_y'
                }
                , {
                    duration: 1000
                    , onComplete: function() {
                        s.append_show( 'after resize: ' )
                        rect = sigma.utils.getNodesRect( sm.graph.nodes() );
                        s.append_show( 'rect', transformRect( rect ) );
                        s.append_show( sm.graph.nodes().map( function( node ){
                            return node.x.toPrecision( 3 ) + '_' 
                                + node.y.toPrecision( 3 )
                                ;
                        } ) );
                    }
                }
            );
        }, 500 );

        function transformRect( rect ) {
            for ( var i in rect ) {
                rect[ i ] = rect[ i ].toPrecision( 3 );
            }
            return rect;
        }

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>





#### getDummyNode

`getDummyNode()`：获取虚拟节点。

    @[data-script="javascript"]sigma.utils.getDummyNode = function( options ) {
        var opt = options || {} 
            , node = {
                x: +opt.x === opt.x ? opt.x : null
                , y: +opt.y === opt.y ? opt.y : null
                , size: opt.size || 1
                , color: opt.color || '#f00'
                , _isdummy: 1
            };

        node.id = 'dummynode_' 
            + new Date().getTime()
            + '_' + ( Math.random() + '' ).substr( 2, 6 )
            ;

        node.label = node.id;

        return node;
    };



<div id="test_getDummyNode" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_getDummyNode');
        s.show( 'testing getDummyNode: \n' );
        s.append_show( sigma.utils.getDummyNode() );
        s.append_show( sigma.utils.getDummyNode( {
            size: 25
            , x: 0
            , y: 0
            , color: '#000'
        } ) );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>






#### getDummyEdges

`getDummyEdges( fromNode, toNodes )`: 获取从一个节点至一组节点的虚拟边。

    @[data-script="javascript"]sigma.utils.getDummyEdges 
        = function( fromNode, toNodes, options ) {
        var opt = options || {} 
            , edges = []
            , edge
            ;

        // assertions
        if ( !fromNode ) {
            throw new Error( 'sigma.utils.getDummyEdges: `fromNode` is undefined' );
        }
        if ( !toNodes ) {
            throw new Error( 'sigma.utils.getDummyEdges: `toNodes` is undefined' );
        }
        if ( !toNodes.length ) {
            throw new Error( 'sigma.utils.getDummyEdges: `toNodes.length` is zero' );
        }

        for ( var i = 0; i < toNodes.length; i++ ) {
            edge = {
                source: fromNode.id
                , target: toNodes[ i ].id
                , size: opt.size || 1
                , color: opt.color || '#0f0'
                , hover_color: opt.hover_color || '#f00'
                , _isdummy: 1
            };
            edge.id = 'dummyedge_' 
                + new Date().getTime()
                + '_' + ( Math.random() + '' ).substr( 2, 6 )
                ;
            edges.push( edge );
        }

        return edges;
    };




<div id="test_getDummyEdges" class="test">
<div class="test-container">

    @[data-script="javascript"](function(){

        var s = fly.createShow('#test_getDummyEdges');
        s.show( 'testing getDummyEdges: \n' );
        s.append_show( sigma.utils.getDummyEdges(
            sigma.utils.getDummyNode()
            , [
                { id: 'n1' }
                , { id: 'n2' }
                , { id: 'n3' }
            ]
        ) );

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>




### 常用方法验证 



#### 验证一

以下验证`sortByNodesDegree`, `getLayoutForest`, `computeLeaves`, `widthTravel`以及`depthTravel`等方法：

<div id="test_35" class="test">
<div class="test-console"></div>
<div class="test-container">
<div id="test_35_graph" class="test-graph"></div>

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_35');
        var g = getRandomGraph(5, 10, 18);
        // var g = getLineGraph(5, 10, {nodeSize: 18});
        var g = networkGraph_simpletree_0528;
        var color = fly.randomColor();
        var g1 = {
                nodes: [
                    {id: 'n2', x: 0.1, y: -0.1, size: 1, label: '(1000, -1000)', color: color}
                    , {id: 'n0', x: 0, y: 0, size: 1, label: '(0, 0)', color: color}
                    , {id: 'n1', x: 0.1, y: 0.1, size: 1, label: '(1000, 1000)', color: color}
                    , {id: 'n3', x: 0.2, y: 0, size: 1, label: '(2000, 0)', color: color}
                    , {id: 'n4', x: 0.1, y: 0, size: 1, label: '(1000, 0)', color: color}
                ]
                , edges: [
                    { id: 'e0', source: 'n0', target: 'n2' }
                    , { id: 'e1', source: 'n1', target: 'n3' }
                ]
            };
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
                , autoRescale: false
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
            .getLayoutForest({root: sm.graph.nodes('n0')})
            ;
        s.append_show(
            'layout forest has ' + forest.length + ' trees'
            , forest
        );

        s.append_show('');
        s.append_show('start computeLeaves: ');
        sigma.utils.computeLeaves(forest);
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
                                'visit'
                                , node.id 
                                    + ( 
                                        node._wt_maxlevel 
                                        ? ' ( tree root: ' + node._wt_maxlevel + ' levels )' 
                                        : '' 
                                    ) 
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

        var cam0 = sm.cameras[0];
        // solution 1
        // cam0.settings('autoRescale', true);
        // solution 2
        sigma.middlewares.rescale.call(
            sm
            , ''
            , ''
            , {
                width: sm.renderersPerCamera[cam0.id][0].width
                , height: sm.renderersPerCamera[cam0.id][0].height
                , autoRescale: ['nodePosition']
                , scalingMode: 'inside'
                , rescaleIgnoreSize: 0
            }
        );
        sm.refresh();

    })();

</div>
<div class="test-panel">
</div>
</div>




#### 验证二

以下验证`getMaxDegreeNode`, `getCircleForest`等方法：

<div id="test_35_5" class="test">
<div class="test-console"></div>
<div class="test-container">
<div id="test_35_5_graph" class="test-graph"></div>

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_35_5');
        var g = getRandomGraph(5, 10, 1);
        var g = networkGraph_2circles_0523;
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
        sigma.utils.computeLeaves(forest);

        // 控制台中验证
        // console.log(forest);

        s.append_show('start getMaxDegreeNode:');
        var maxDegreeNode = sm.graph.getMaxDegreeNode();
        s.append_show(maxDegreeNode.id);

    })();

</div>
<div class="test-panel">
</div>
</div>



#### 验证三

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
        var g1 = getRandomGraph(10, 10, 1);
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

        sigma.utils.computeLeaves(forest);
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







## 固定布局


### 矩阵布局


#### 算法描述

将节点按`方阵`排列。

todo:

1. `部分`节点按方阵排列
2. 对于`新加入`的节点按方阵排列



#### 算法实现

`矩阵布局`算法：

    @[data-script="javascript"]sigma.utils.getGridLayout
        = function(nodes, options){

        if(!nodes || !nodes.length){
            return;
        }

        var opt = options || {}
            , r = Math.ceil(Math.sqrt(nodes.length))
            , i = 0
            , j = 0
            , nodeSize = nodes[0].size || 1
            , step = opt.space || nodeSize  * 3 
            , center = opt.center
            , rect
            , ltPoint
            ;

        if(!center){
            rect = sigma.utils.getNodesRect(nodes, opt);
            center = {
                x: rect.x + rect.w / 2
                , y: rect.y + rect.h / 2
            };
        }

        ltPoint = {
            x: center.x - step * ( r - 1 ) / 2
            , y: center.y - step * ( r - 1 ) / 2
        };

        nodes.forEach(function(node){
            node.grid_x = j * step + ltPoint.x;
            node.grid_y = i * step + ltPoint.y; 
            j++;
            if(j >= r) {
                j = 0;
                i++;
            }
        });

        return nodes;
    };

    sigma.prototype.layoutGrid = function(options){
        var me = this
            , g = me.graph.getSubGraph(options)
            ;

        me.initializeLayout();
        sigma.utils.getGridLayout(
            g.nodes 
            , options
        );

        return me;
    }


<div id="test_39" class="test">
<div class="test-console"></div>
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_39');
        var g = getRandomGraph(4, 0, 1);
        // var g = getLineGraph(4, 0, {nodeSize: 1});
        // var g = networkGraph_forest_0527;
        var sm = getUniqueSigmaInstance('test_39');
        sm.graph
            .clear()
            .read(g)
            ;
        sm
            .layoutGrid({
                center: {x:100, y:100}
                , space: 10
            })
            ;
        s.show(sm.graph.nodes());

    })();

</div>
<div class="test-panel">
</div>
</div>



#### 算法演示

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
        var g1 = getRandomGraph(49, 100, 1);
        // var g1 = getLineGraph(49, 100, {nodeSize: 1});
        // var g1 = networkGraph_FR;
        // var g1 = networkGraph_ForceAtlas2;
        // var g1 = networkGraph_grid_0521; 
        // var g1 = networkGraph_tree_0521;
        // var g1 = networkGraph_2circles_0523;
        // var g1 = networkGraph_edges_between_the_same_level_nodes;
        // var g1 = networkGraph_edges_between_the_same_level_nodes_2;
        // var g1 = networkGraph_many_children_0526;
        // var g1 = networkGraph_forest_0527;
        var g1 = networkGraph_person_event_event_person_0729;;
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
                , drawLabels: false
            };
        var sigmaSettings = {
                // rescale settings 
                sideMargin: 10 

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
        sm2.layoutGrid();
        sm2.refresh();

        setTimeout(function(){
            sigma.plugins.animate(
                sm2
                , {
                    x: 'grid_x'
                    , y: 'grid_y'
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




### 层次布局

参考： <a href="./Hierarchy-layout.md.preview.html">Hierarchy layout</a>



### 环形布局

见`graph layout3`

<a href="./graph-layout3.md.preview.html">graph layout 3</a>




### 块布局

见`graph layout2`

<a href="./graph-layout2.md.preview.html">graph layout 2</a>





## 增量布局

见`graph layout2`

<a href="./graph-layout2.md.preview.html">graph layout2</a>




