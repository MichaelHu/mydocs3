# graph layout 2


> 网络拓扑图布局算法研究2，续`graph layout`


<style type="text/css">
@import "http://258i.com/static/bower_components/snippets/css/mp/style.css";
.test-graph {
    height: 400px;
}
.test-graph div {
    float: left;
    height: 100%;
    width: 50%;
    border: 1px dotted #666;
}
</style>
<script src="http://258i.com/static/bower_components/snippets/js/mp/fly.js"></script>
<script src="http://258i.com/static/build/sigma/sigma.min.js"></script>
<script src="http://258i.com/static/build/sigma/plugins/sigma.plugins.animate.min.js"></script>

<script src="./js/graph-layout/utils.js"></script>
<script src="./js/graph-layout/Grid/grid.js"></script>
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
<script src="./js/network-edges-between-the-same-level-nodes-3-0531.js"></script>
<script src="./js/network-tree-0524.js"></script>
<script src="./js/network-edges-between-levels-0526.js"></script>
<script src="./js/network-many-children-0526.js"></script>
<script src="./js/network-forest-0527.js"></script>
<script src="./js/network-simpletree-0528.js"></script>
<script src="./js/network-simple-0604-1.js"></script>

## 增量布局


### 构建新节点

新节点的`特点`是`x`, `y`, `size`未设置确定的值，但不是`undefined`。

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
                // , color: fly.randomColor()
                , color: '#ff7f0e' 
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
                , color: '#cedb9c' 
                , hoverColor: '#c00'
            });
        }

        return graph;
    }


### 矩阵增量布局


`incLayoutGrid()`：矩阵增量布局，或者叫做网格增量布局。需提供参数：

* `nodes`：原有节点数组
* `newNodes`：新增节点数组。新节点需要确保`x, y`字段`存在`，即使其值是null
* `selectedNodes`：`选中`节点数组。新增节点初始会出现在选中节点的`中心处`。
* `options`：其他选项，同`getGridLayout()`方法的options


算法实现如下：

    @[data-script="javascript editable"]sigma.utils.incLayoutGrid
        = function(nodes, newNodes, selectedNodes, options){

        if(!newNodes || !newNodes.length
            || !nodes || !nodes.length){
            return;
        }

        var opt = options || {} 
            , rect
            , newCenter
            , newLen = newNodes.length
            , newWidth = ( Math.ceil(Math.sqrt(newNodes.length)) - 1 ) * ( opt.space || 50 ) 
                + ( newNodes[0].size || + 20 ) 
                + ( newLen < 2 ? ( opt.space || 50 ) : 0 )
            , gnr = sigma.utils.getNodesRect
            ;

        selectedNodes = selectedNodes || [];
        if(!selectedNodes.length){
            selectedNodes = nodes;
        }
        rect = gnr(nodes, opt);
        newCenter = {
            x: rect.x + rect.w + newWidth
            , y: rect.y + rect.h / 3
        };

        rect = gnr(selectedNodes, opt);
        // from selected nodes' center point 
        newNodes.forEach(function(node){
            node.x = rect.x + rect.w / 2; 
            node.y = rect.y + rect.h / 2;
        });

        // prepare for the next animation
        nodes.forEach(function(node){
            node.grid_x = node.x;
            node.grid_y = node.y;
        });

        opt.center = newCenter;
        sigma.utils.getGridLayout(newNodes, opt);

    };



    sigma.prototype.incLayoutGrid = function(
        newNodes, selectedNodes, options) {
        var me = this
            , nodes = me.graph.nodes()
            ;

        sigma.utils.incLayoutGrid(
            nodes
            , newNodes
            , selectedNodes
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

            function getRandomSelectedNodes(){
                var _nodes = sm.graph.nodes()
                    , len = _nodes.length
                    , retNodes = []
                    ;

                _nodes.forEach(function(_node){
                    if(Math.random() > 0.8){
                        _node.color = '#f00';
                        retNodes.push(_node);
                    }
                });
                return retNodes;
            }

            sm.incLayoutGrid(
                newNodes
                , getRandomSelectedNodes()
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

            setTimeout(function(){
                sigma.plugins.animate(
                    sm
                    , {
                        x: 'grid_x'
                        , y: 'grid_y'
                    }
                    , {
                        duration: 500
                        , onComplete: function(){
                            sm.graph.nodes().forEach(function(node){
                                delete node.grid_x;
                                delete node.grid_y;
                            });
                        }
                    }
                );
            }, 1000);

        }, 1000);

    })();

</div>
<div class="test-panel">
</div>
</div>





### 增量簇布局 


#### interpolatesAngle()

    @[data-script="javascript editable"]sigma.utils.interpolatesAngle
        = function(
            angleRange
            , numOfFirstLevel
            , levels
            , angleStart
        ) {
        var retArr = []
            , angleStart = angleStart || 0
            , numOfCurrentLevel
            , anglesOfCurrentLevel
            , stepOfCurrentLevel
            , angleOffset
            , i, j
            ;

        for(i=0; i<levels; i++){
            numOfCurrentLevel = ( i + 1 ) * numOfFirstLevel;
            anglesOfCurrentLevel = [];
            stepOfCurrentLevel = angleRange / numOfCurrentLevel;
            angleOffset = stepOfCurrentLevel * ( i == 0 ? 0 : 0.5 );
            angleOffset += angleStart;
                
            retArr.push(anglesOfCurrentLevel);
            for(j=0; j<numOfCurrentLevel; j++){
                anglesOfCurrentLevel.push(
                    stepOfCurrentLevel * j + angleOffset
                );
            }
        }

        return retArr;
    };



#### clustersNodes()

参数示意图：

<img src="./img/input-angle.png" width="550">

以下为实现代码：

    @[data-script="javascript editable"]sigma.utils.clustersNodes
        = function(
            nodes
            , options
        ) {

        var opt = options || {}
            , root = opt.root || {x: 0, y: 0}
            , len 
            , numOfFirstLevel
            , clusterLevels
            , angleRange = opt.angleRange || 2 * Math.PI
            , radiusStep = opt.radiusStep || 100
            , angleInput = opt.angleInput || 0
            , angleStart = angleInput
            , writePrefix = opt.writePrefix || ''
            , readPrefix = opt.readPrefix || ''
            , randomRadius = opt.randomRadius
            , radius = 0, _r
            , _rx, _ry 
            , i, j, k
            , angles
            , PI = Math.PI
            , alen, mid, left, right
            , retObj = null 
            ;

        if(!nodes || !nodes.length){
            return retObj;
        }

        len = nodes.length; 
        numOfFirstLevel = opt.numOfFirstLevel 
            || sigma.utils.getNumOfFirstClusterLevel(len, 15, 1);
        clusterLevels = sigma.utils.getClusterLevels(numOfFirstLevel, len); 

        if(angleRange < PI * 2){
            angleStart = ( 2 * PI - angleRange ) / 2 + angleInput;
        }

        retObj = {
            numOfFirstLevel: numOfFirstLevel
            , numOfNodes: len
            , clusterLevels: clusterLevels
            , angleInput: angleInput
            , angleRange: angleRange
            , angleStart: angleStart
            , radiusStep: radiusStep
        };

        angles = sigma.utils.interpolatesAngle(
            angleRange
            , numOfFirstLevel
            , clusterLevels 
            , angleStart
        );

        if(typeof root[writePrefix + 'x'] == 'undefined'){
            root[writePrefix + 'x'] = root.x;
            root[writePrefix + 'y'] = root.y;
        }

        k = 0;
        _rx = root[readPrefix + 'x'];
        _ry = root[readPrefix + 'y'];

        if(opt.centerFirst){
            for(i=0; i<angles.length && k < len; i++){
                radius += radiusStep;
                alen = angles[i].length;
                mid = Math.floor(alen / 2);
                for(j=0; j<=mid && k<len; j++, k++){
                    _r = _getRadius(radius);
                    nodes[k][writePrefix + 'x'] = _rx + _r * Math.cos(angles[i][mid - j]);
                    nodes[k][writePrefix + 'y'] = _ry + _r * Math.sin(angles[i][mid - j]);

                    _r = _getRadius(radius);
                    if(k + 1 < len && mid + j < alen && j != 0){
                        k++;
                        nodes[k][writePrefix + 'x'] = _rx + _r * Math.cos(angles[i][mid + j]);
                        nodes[k][writePrefix + 'y'] = _ry + _r * Math.sin(angles[i][mid + j]);
                    }
                }
            }
        }
        else if(opt.sidesFirst){
            for(i=0; i<angles.length && k < len; i++){
                radius += radiusStep;
                alen = angles[i].length;
                mid = Math.floor(alen / 2);
                for(j=0; j<=mid && k<len; j++, k++){
                    _r = _getRadius(radius);
                    left = j;
                    right = alen - 1 - j;
                    if(left > right) {
                        break;
                    }

                    nodes[k][writePrefix + 'x'] = _rx + _r * Math.cos(angles[i][left]);
                    nodes[k][writePrefix + 'y'] = _ry + _r * Math.sin(angles[i][left]);

                    if(k + 1 < len && left < right){
                        k++;
                        _r = _getRadius(radius);
                        nodes[k][writePrefix + 'x'] = _rx + _r * Math.cos(angles[i][right]);
                        nodes[k][writePrefix + 'y'] = _ry + _r * Math.sin(angles[i][right]);
                    }
                }
            }
        }
        else {
            for(i=0; i<angles.length && k < len; i++){
                radius += radiusStep;
                alen = angles[i].length;
                for(j=0; j<alen && k<len; j++, k++){
                    _r = _getRadius(radius);
                    nodes[k][writePrefix + 'x'] = _rx + _r * Math.cos(angles[i][j]);
                    nodes[k][writePrefix + 'y'] = _ry + _r * Math.sin(angles[i][j]);
                }
            }
        }

        return retObj;

        function _getRadius(radius){
            return radius 
                + ( randomRadius ? 0.5 * radiusStep * Math.random() : 0 );
        }

    };



#### getAngleInput()

`getAngleInput(fromNode, toNode, options)`：获取簇布局输入节点的角度。

    @[data-script="javascript"]sigma.utils.getAngleInput
        = function(fromNode, toNode, options){

        var opt = options || {} 
            , readPrefix = opt.readPrefix || ''
            , dy = fromNode[readPrefix + 'y'] - toNode[readPrefix + 'y']
            , dx = fromNode[readPrefix + 'x'] - toNode[readPrefix + 'x']
            , angleInput
            ;
        sin = dy / Math.sqrt( 
                Math.pow(dx, 2) + Math.pow(dy, 2) 
            );
        cos = dx / Math.sqrt(
                Math.pow(dx, 2) + Math.pow(dy, 2) 
            );

        if( sin >= 0 ) {
            angleInput = Math.acos(cos);
        }
        else {
            angleInput = 2 * Math.PI - Math.acos(cos);
        }

        return angleInput;
    };



#### getClusterLevels()

`getClusterLevels(numOfFirstLevel, totalNum)`：计算簇布局的最大层数。

    @[data-script="javascript"]sigma.utils.getClusterLevels
        = function(numOfFirstLevel, totalNum){

        var i = 1
            , step = numOfFirstLevel
            , all = 0
            ;

        do {
            all += i * step;
            i++;
        }
        while(all < totalNum);
        return i - 1; 
    }



#### getNumOfFirstClusterLevel()

`getNumOfFirstClusterLevel(totalNum, max, min)`：计算簇布局最里层节点数目。

    @[data-script="javascript"]sigma.utils.getNumOfFirstClusterLevel
        = function(totalNum, max, min){

        var max = max || 18 
            , min = min || 1
            , i = 1
            , t = 0
            , m
            ;
        while(1){
            t += i; 
            m = Math.ceil(totalNum / t);
            if(m >= min && m <= max){
                return m;
            }
            i++;
        }
    }






<div id="test_30" class="test">
<div class="test-container">
<div id="test_30_graph" class="test-graph">
</div>
<div class="test-console"></div>

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_30');
        var g1 = getClusterGraph(20, {xMax: 200, yMax: 200, nodeSize: 10});
        var root = g1.nodes[0];
        var fromNode = {
                id: 'n0'
                , label: '0'
                , x: 100
                , y: 100
                , size: 10
                , cluster_x: 100
                , cluster_y: 100
                , color: fly.randomColor()
            };
        var g2 = {
                nodes: [fromNode, root] 
                , edges: [{
                    id: 'e0'
                    , source: fromNode.id 
                    , target: root.id 
                    , color: '#ccc'
                }]
            };
        var g3 = {
                nodes: g1.nodes.slice(1)
                , edges: g1.edges
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
                , drawLabels: false
            };
        var sigmaSettings = {
                // rescale settings 
                sideMargin: 10 

                // instance global settings
                , enableEdgeHovering: true
                , edgeHoverPrecision: 5
                , autoRescale: false
            };

        var sm;

        if((sm = isSigmaInstanceExisted(containerId))){
            sm.kill();
        };

        root.cluster_x = root.x;
        root.cluster_y = root.y;
        root.x = fromNode.x;
        root.y = fromNode.y;

        angleInput = sigma.utils.getAngleInput(
            {x: root.x, y: root.y}
            , {x: root.cluster_x, y: root.cluster_y}
        );

        sm = getUniqueSigmaInstance(
                    containerId
                    , {
                        settings: sigmaSettings 
                        , graph: g2
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
        sm.camera.goTo({
            x: 100
            , y: 100
        });

        sigma.plugins.animate(
            sm
            , {
                x: 'cluster_x'
                , y: 'cluster_y'
            }
            , {
                duration: 500
                , onComplete: function(){
                    root = sm.graph.nodes('n1');

                    g3.nodes.forEach(function(node){
                        node.x = root.x;
                        node.y = root.y;
                    });

                    sigma.utils.clustersNodes(
                        g3.nodes 
                        , {
                            root: root  
                            , angleRange: 3 * Math.PI / 2
                            // , numOfFirstLevel: 8
                            , radiusStep: 60
                            , randomRadius: 1
                            // , angleInput: 3 * Math.PI / 2
                            , angleInput: angleInput 
                            , writePrefix: 'cluster_'
                            , centerFirst: 1
                        }
                    );

                    sm.graph
                        .read(g3)
                        ;

                    sm.refresh();

                    setTimeout(function(){
                        sigma.plugins.animate(
                            sm
                            , {
                                x: 'cluster_x'
                                , y: 'cluster_y'
                            }
                            , {
                                duration: 500
                            }
                        );
                    }, 500);
                }
            }
        );

    })();

</div>
<div class="test-panel">
</div>
</div>





## 复合布局

综合使用多种布局，以达到更好的布局效果。


### 簇布局

#### 算法描述

todo

#### 算法实现

`簇布局算法`：

    @[data-script="javascript"]sigma.prototype.layoutCluster
        = function(options){

        var opt = options || {} 
            , me = this
            , distanceCoefficient = opt.distanceCoefficient || 1.5 
            , forest = me.graph.getLayoutForest(opt)
            , edges = me.graph.edges()
            ;

        forest.forEach(function(tree){

            // temp
            tree.cluster_x = tree.x;
            tree.cluster_y = tree.y;

            depthTravel(tree);

            function depthTravel(node, angleInput){
                var children = node._wt_children
                    , angleInput = angleInput || Math.PI * 3 / 2
                    , nonLeafChildren
                    , clusterConfig
                    , ai
                    , distance
                    ;

                clusterConfig = sigma.utils.clustersNodes(
                    children
                    , {
                        angleInput: angleInput
                        , root: node
                        , readPrefix: 'cluster_'
                        , writePrefix: 'cluster_'
                        , angleRange: opt.angleRange 
                            || _getAngleRange(children.length) 
                            || Math.PI / 2
                        , radiusStep: opt.radiusStep
                        , randomRadius: opt.randomRadius || 0
                    }
                );

                children.forEach(function(child){
                    console.log(child.cluster_x + ', ' + child.cluster_y);
                });

                nonLeafChildren = _getNonLeafChildren(children);

                if(nonLeafChildren.length > 0){
                    nonLeafChildren.forEach(function(child){
                        distance = _getDistance(clusterConfig, child);
                        _stretchNode(child, node, distance);
                        ai = sigma.utils.getAngleInput(
                            node
                            , child
                            , {
                                readPrefix: 'cluster_'
                            }
                        );
                        depthTravel(child, ai);
                    }); 
                }
            }

        });

        function _getAngleRange(totalNum){
            var ret = 1;
            if(totalNum <= 2){
                ret = 0.5;
            }
            else if(totalNum <= 5){
                ret = 1;
            }
            else if(totalNum <= 8){
                ret = 1.5;
            }
            else {
                ret = 2;
            }
            return Math.PI * ret;
        }

        function _getDistance(clusterConfig, node){
            var c = clusterConfig
                , cl = c.clusterLevels
                , rs = c.radiusStep
                , distance
                , childrenCount = cl.numOfNodes
                , grandChildrenCount = node._wt_children.length
                , childrenRadiius
                , grandChildrenRadius
                ;

            childrenRadius = rs * cl;
            if(c.randomRadius){
                childrenRadius += radiusStep;
            }
            grandChildrenRadius = _getRadius(grandChildrenCount, rs); 

            distance = ( childrenRadius + grandChildrenRadius ) 
                * distanceCoefficient;

            return distance;
        }

        function _getRadius(nodesCount, radiusStep){
            var numOfFirstLevel = sigma.utils.getNumOfFirstClusterLevel(
                    nodesCount
                    , 15
                    , 1
                )
                , clusterLevels = sigma.utils.getClusterLevels(
                    numOfFirstLevel
                    , nodesCount
                ) 
                ;

            return radiusStep * clusterLevels;
        }

        function _stretchNode(node, fromNode, distance){
            var d = Math.sqrt(
                    Math.pow(node.cluster_x - fromNode.cluster_x, 2)
                    + Math.pow(node.cluster_y - fromNode.cluster_y, 2)
                )
                , scale = distance / d
                , newX, newY
                ;

            newX = fromNode.cluster_x 
                + scale * ( node.cluster_x - fromNode.cluster_x );
            newY = fromNode.cluster_y 
                + scale * ( node.cluster_y - fromNode.cluster_y );

            node.cluster_x = newX;
            node.cluster_y = newY;
        }

        function _getNonLeafChildren(children){
            var ret = [];
            children.forEach(function(child){
                if(child._wt_children
                    && child._wt_children.length > 0){
                    ret.push(child);
                }
            });
            return ret;
        }

        return this;
    };





#### 算法演示


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
        var g1 = getRandomGraph(20, 18, 8);
        var g1 = getClusterGraph(20, {xMax: 200, yMax: 200, nodeSize: 10});
        var g1 = networkGraph_edges_between_the_same_level_nodes_3;
        var g1 = networkGraph_FR;
        var g1 = networkGraph_ForceAtlas2;
        var g1 = networkGraph0520_allEdges;
        var g1 = networkGraph_grid_0521; 
        var g1 = networkGraph_tree_0521;
        var g1 = networkGraph_2circles_0523;
        var g1 = networkGraph_edges_between_the_same_level_nodes;
        var g1 = networkGraph_edges_between_the_same_level_nodes_2;
        var g1 = networkGraph_many_children_0526;

        var g2 = {
                nodes: g1.nodes.slice()
                , edges: g1.edges.slice()
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
                , autoRescale: 0
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

        sm1
            .normalizeSophonNodes()
            .alignCenter({rescaleToViewport: 1})
            .refresh()
            ;

        sm2
            .normalizeSophonNodes()
            .alignCenter({rescaleToViewport:1})
            .refresh() // note: must invoke `refresh()` to update coordinates

            .layoutCluster({
                distanceCoefficient: 1.1
                , radiusStep: 50
                , randomRadius: 1
            })
            .normalizeSophonNodes({
                readPrefix: 'cluster_'
            })
            .alignCenter({
                wholeView: 1
                , readPrefix: 'cluster_'
                , writePrefix: 'cluster_'
            })
            ;

        setTimeout(function(){
            sigma.plugins.animate(
                sm2
                , {
                    x: 'cluster_x'
                    , y: 'cluster_y'
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

