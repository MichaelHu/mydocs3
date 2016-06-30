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
<script src="./js/network-grid-0612.js"></script>
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
<script src="./js/network-circle-0628.js"></script>

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
                // , color: '#ff7f0e' 
                , color: '#74c476' 
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
            , oldRect
            , oldCenter
            , selectedCenter
            , selectedRect
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
        oldRect = rect = gnr(nodes, opt);
        oldCenter = {
            x: rect.x + rect.w / 2
            , y: rect.y + rect.h / 2
        };

        selectedRect = rect = gnr(selectedNodes, opt);
        selectedCenter = {
            x: rect.x + rect.w / 2
            , y: rect.y + rect.h / 2
        };

        newCenter = _getNewCenter(oldRect, selectedRect, newWidth);

        // from selected nodes' center point 
        newNodes.forEach(function(node){
            node.x = selectedCenter.x; 
            node.y = selectedCenter.y;
        });

        // prepare for the next animation, preventing `undefined node.grid_*`
        nodes.forEach(function(node){
            node.grid_x = node.x;
            node.grid_y = node.y;
        });

        opt.center = newCenter;
        sigma.utils.getGridLayout(newNodes, opt);

        function _getNewCenter(oldRect, selectedRect, newSize){
            var x0 = oldRect.x + oldRect.w / 2
                , y0 = oldRect.y + oldRect.h / 2
                , w0 = oldRect.w
                , h0 = oldRect.h
                , x1 = selectedRect.x + selectedRect.w / 2
                , y1 = selectedRect.y + selectedRect.h / 2
                , k
                , x, y
                ;

            if(x1 - x0 != 0 && y1 - y0 != 0){
                k = (y1 - y0) / (x1 - x0);
                if(Math.abs(k) >= 1){
                    if(y1 - y0 > 0){
                        y = y0 + h0 / 2 + newSize; 
                    }
                    else{
                        y = y0 - h0 / 2 - newSize; 
                    }
                    x = (y - y0) / k + x0;
                }
                else {
                    if(x1 - x0 > 0){
                        x = x0 + w0 / 2 + newSize;
                    }
                    else {
                        x = x0 - w0 / 2 - newSize;
                    }
                    y = (x - x0) * k + y0;
                }
            }
            else if(x1 - x0 == 0 && y1 - y0 != 0){
                x = x0;
                if(y1 - y0 > 0){
                    y = y0 + h0 / 2 + newSize; 
                }
                else {
                    y = y0 - h0 / 2 - newSize; 
                }
            }
            else if(y1 - y0 == 0 && x1 - x0 != 0){
                y = y0;
                if(x1 - x0 > 0){
                    x = x0 + w0 / 2 + newSize;
                }
                else {
                    x = x0 - w0 / 2 - newSize;
                }
            }
            else {
                x = x0 + w0 / 2 + newSize;
                y = y0 + h0 / 3;
            }

            return {
                x: x
                , y: y
            };
        }
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
        var g1 = networkGraph_circle_0628;
        // var g1 = networkGraph_FR;
        // var g1 = networkGraph_ForceAtlas2;
        // var g1 = networkGraph0520_allEdges;
        // var g1 = networkGraph_grid_0521; 
        // var g1 = networkGraph_tree_0521;
        // var g1 = networkGraph_2circles_0523;
        // var g1 = networkGraph_edges_between_the_same_level_nodes;
        // var g1 = networkGraph_edges_between_the_same_level_nodes_2;
        // var g1 = networkGraph_many_children_0526;
        // var g1 = networkGraph_grid_0612; 
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

        g1.nodes.forEach(function(node){
            node.color = '#aaa';
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
                        _node.color = '#e6550d';
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


### 工具方法


以下提供一些方法，支持`复合`布局。


#### applyLayoutInstantly

`applyLayoutInstantly(options)`：立即应用新布局坐标。

    @[data-script="javascript"]sigma.utils.applyLayoutInstantly
        = function(nodes, options){
        var opt = options || {}
            , readPrefix = opt.readPrefix || ''
            , writePrefix = opt.writePrefix || ''
            , clearOld = opt.clearOld || 0
            ;

        if(!nodes || !nodes.length){
            return;
        }
        nodes.forEach(function(node){
            node[writePrefix + 'x'] = node[readPrefix + 'x'];
            node[writePrefix + 'y'] = node[readPrefix + 'y'];
            if(clearOld){
                delete node[readPrefix + 'x'];
                delete node[readPrefix + 'y'];
            }
        });
    };

    sigma.prototype.applyLayoutInstantly
        = function(options){
        sigma.utils.applyLayoutInstantly(
            this.graph.nodes()
            , options
        );
        return this;
    };





### 簇布局

`簇布局`作为一种`人工`布局，完全模拟力导向布局的效果还是有点困难。但是可以作为力导向布局的`前置`布局。

将簇布局作为力导向布局的前置布局，目前实验结果`未显示`明显优化。


#### 算法描述


1. 获取布局`森林`
2. 针对森林中的每一棵树`tree`，进行深度遍历，遍历过程中对每个节点`node`的处理如下：
    * 如果不存在孩子节点，不作处理
    * 如果存在孩子节点，则以`node`为中心，将孩子节点进行`簇布局`；并对`非叶子`的孩子节点进行`延伸`



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
                        , centerFirst: 1
                    }
                );

                // children.forEach(function(child){
                //     console.log(child.cluster_x + ', ' + child.cluster_y);
                // });

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






## 节点尺寸非线性变化


### 描述


`边长`与`缩放比例(ratio)`成正比例变化，节点尺寸变化要快于边长变化，可能是二次方或三次方变化。

* `ratio`: camera缩放比例，不同graph有不同的ratio范围，记为`[ratioMin, ratioMax]`
* `expandRatio`: 节点size变化比率，在camera计算得到的size基础上进行调整时的比率，随着ratio的变化呈`二次方`变化，其变化区间为：`[1, expandRatioMax]`
* `二次`变化函数：`f(t) = at^2 + b`
* `线性`变化函数：`f(t) = kt + c`

需要计算参数`a`, `b`以及`k`, `c`。如下所示：

 <img src="./img/node-size-expand-ratio.png">


### 实现

`sigma.utils.nodeSizeExpandRatio()`实现了这种变化速率的匹配：

    @[data-script="javascript"]sigma.utils.nodeSizeExpandRatio =
        function(sigInst, ratio, options){
        var opt = options || {} 
            , ratioMax = sigInst.settings('zoomMax')
            , ratioMin = sigInst.settings('zoomMin')
            , sizeExpandRatioMax = opt.sizeExpandRatioMax || 2.5
            , argA
            , argB
            , sizeExpandRatio
            ;

        if(!sigInst|| !ratioMax || !ratioMin || !ratio){
            sizeExpandRatio = 1;
        }
        else if(opt.type == 'ease-in'){
            argA = ( sizeExpandRatioMax - 1 ) 
                / ( Math.pow(ratioMax - ratioMin + 1, 2) - 1 )
                ;
            argB = 1 - argA;
            sizeExpandRatio
                = argA * Math.pow( ratioMax - ratio + 1, 2 ) + argB;
        }
        else if(opt.type == 'linear'){
            argA = (sizeExpandRatioMax - 1) / (ratioMax - ratioMin); 
            argB = 1 - argA;
            sizeExpandRatio = argA * ( ratioMax - ratio + 1 ) + argB;
        }
        else {
            sizeExpandRatio = 1;
        }
        return sizeExpandRatio;
    }




### 验证


<div id="test_60" class="test">
<div class="test-container">

    @[data-script="javascript editable"](function(){

        var s = fly.createShow('#test_60');
        var sigInst = {
                settings: function(name){
                    switch(name){
                        case 'zoomMax':
                            return 20;
                        case 'zoomMin':
                            return 0.125;
                    }
                }
            }
            , sizeExpandRatioMax = 3
            , testItems = [
                sigInst.settings('zoomMax')
                , 19
                , 18
                , 15
                , 10
                , 5
                , 2
                , 1
                , 0.5 
                , 0.1
                , sigInst.settings('zoomMin')
            ]
            ;
        s.show('start testing...');
        testItems.forEach(function(item){
            (function(types){
                types.forEach(function(type){
                    s.append_show(
                        'ratio ' + item
                        , 'type ' + type
                        , sigma.utils.nodeSizeExpandRatio(
                            sigInst
                            , item 
                            , {
                                sizeExpandRatioMax: sizeExpandRatioMax
                                , type: type 
                            }
                        )
                    );
                });
            })(['linear', 'quadratic']);
        });

    })();

</div>
<div class="test-console"></div>
<div class="test-panel">
</div>
</div>








## 布局方案比较


### 层次布局

`层次`布局适合树状结构的布局，`层次感`很清晰。

 <img src="./img/hier_n100_e50.png">

 <img src="./img/hier_tree.png">



但以下情况效果不好：

* `同层`孩子节点较多，但是总层次不多的情况，会出现`矮胖图`，两侧的子节点和父节点形成`超长边`；这种问题尚无较好解决办法，`块布局`可能解决方案，但它实现方案复杂，而且容易出现边和第三方节点交叉的问题。

    <img src="./img/hier_tree_many_children.png">

    <img src="./img/hier_cluster_n100.png">

    <img src="./img/hier_n1000_e1000.png">

    <img src="./img/hier_n1500_e1000.png">



* `边数`大于`节点数`的图，展示也不清晰

    <img src="./img/hier_n25_e50.png">

* 同层非相邻孩子节点间存在边的情况，容易出现连线穿过`第三个`节点的情况。不过这种问题也可以优化，调整节点顺序或者上下位置微调。

    <img src="./img/hier_edges_between_same_level.png">


* `网状`布局图显示不直观[`右侧`为布局结果]：

    <img src="./img/hier_mesh.png">



### 力导向布局

`力导向`布局是比较`普适`的布局算法，能`均衡`边的长度，整体形成`簇`的布局。层次布局所面临的问题都能很好的解决。

孩子节点数很多的情况：

 <img src="./img/yfh_cluster_n100.png.png">

 <img src="./img/yfh-big-cluster-layout.png">

节点和边都很多的情况：

 <img src="./img/yfh_n1000_e1000.png">

 <img src="./img/yfh_n1500_e1000.png">

其他情况：

 <img src="./img/yfh_n100_e50.png">

 <img src="./img/yfh_n25_e50.png">

 <img src="./img/yfh_tree.png">

 <img src="./img/yfh_tree_many_children.png">

`劣势`为计算量较大。

也有一些情况效果不好：

* `孤立节点`与其他簇或节点会`不断远离`，形成的整体效果空间上不均衡，如下所示。这种问题可以通过辅以`grid空间均衡`算法解决。

    <img src="./img/yfh_no_layoutBalanced.png">

* 受`前置布局`影响很大。特别是当前置布局为`线性`布局时，力导向布局表现就很差。这时可以通过修改`前置`布局来避免。 
    1. 比较理想的`前置`布局是`矩阵`布局
    2. `环形`前置布局也不是理想前置布局，因为存在不少距离很远的边，需要较长`演化`时间来拉近

